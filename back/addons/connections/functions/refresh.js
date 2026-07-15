import onetype from '@onetype/framework';
import connections from '#connect-back/connections/addon.js';
import providers from '#connect/providers/addon.js';

connections.Fn('refresh', async function(connection)
{
	const provider = providers.ItemGet(connection.Get('provider'));
	const oauth2 = provider.Get('oauth2');
	const credentials = this.Fn('decrypt', connection.Get('credentials'));

	if(!credentials.refresh_token)
	{
		connection.Set('status', 'expired');

		await connection.Update();

		throw onetype.Error(400, 'Connection :id: has no refresh token, re-authorization required.', { id: connection.Get('id') });
	}

	const response = await fetch(oauth2.token, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: credentials.refresh_token,
			client_id: await $ot.vault.get(oauth2.id),
			client_secret: await $ot.vault.get(oauth2.secret)
		})
	});

	if(!response.ok)
	{
		connection.Set('status', 'expired');

		await connection.Update();

		throw onetype.Error(502, 'Token refresh failed for connection :id:.', { id: connection.Get('id') });
	}

	const data = await response.json();

	const updated = {
		access_token: data.access_token,
		refresh_token: data.refresh_token ? data.refresh_token : credentials.refresh_token,
		token_type: data.token_type ? data.token_type : 'Bearer'
	};

	connection.Set('credentials', this.Fn('encrypt', updated));
	connection.Set('status', 'active');

	if(data.expires_in)
	{
		connection.Set('expires_at', new Date(Date.now() + data.expires_in * 1000).toISOString());
	}

	await connection.Update();

	return updated;
});
