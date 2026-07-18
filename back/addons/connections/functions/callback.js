import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.connections.Fn('callback', async function(code, state)
{
	const [slug] = String(state).split(':');

	if(!slug)
	{
		throw onetype.Error(400, 'Invalid state parameter.');
	}

	const provider = connect.providers.ItemGet(slug);

	if(!provider)
	{
		throw onetype.Error(404, 'Provider :slug: not found.', { slug });
	}

	const oauth2 = provider.Get('oauth2');
	const client = await $ot.vault.get(oauth2.id);
	const secret = await $ot.vault.get(oauth2.secret);

	const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' };
	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: await $ot.vault.get('CONNECT_REDIRECT')
	});

	if(oauth2.exchange === 'basic')
	{
		headers['Authorization'] = 'Basic ' + Buffer.from(client + ':' + secret).toString('base64');
	}
	else
	{
		body.set('client_id', client);
		body.set('client_secret', secret);
	}

	const response = await fetch(oauth2.token, { method: 'POST', headers, body });

	if(!response.ok)
	{
		throw onetype.Error(502, 'Token exchange failed for provider :slug:.', { slug });
	}

	const normalized = oauth2.normalize(await response.json());

	const connection = connect.connections.Item({
		provider: slug,
		status: 'active',
		credentials: this.Fn('encrypt', {
			access_token: normalized.access_token,
			refresh_token: normalized.refresh_token,
			token_type: normalized.token_type
		}),
		scopes: normalized.scopes ? normalized.scopes : connect.providers.Fn('merge', provider),
		metadata: normalized.metadata ? normalized.metadata : {},
		expires_at: normalized.expires_at
	});

	await connection.Create();

	return connection;
});
