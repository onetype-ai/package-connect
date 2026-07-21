import crypto from 'crypto';
import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
	id: 'connect:link',
	exposed: true,
	method: 'POST',
	endpoint: '/api/connect/link',
	description: 'Starts a connection: returns the OAuth authorize url for oauth2 providers, or stores the credentials directly for api_key providers.',
	metadata: { addon: 'connect.connections' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to connect a provider.';
		}
	},
	in: {
		provider: {
			type: 'string',
			required: true,
			description: 'Slug of the provider to connect.'
		},
		credentials: {
			type: 'object',
			value: {},
			config: {
				token: {
					type: 'string',
					description: 'API key or token, for api_key providers.'
				}
			},
			description: 'Credentials to store, only for api_key providers.'
		}
	},
	out: {
		authorize: {
			type: 'string',
			description: 'URL the user is sent to in order to grant access, for oauth2 providers.'
		},
		connection: {
			type: 'object',
			config: 'connect.connection',
			description: 'The created connection, for api_key providers.'
		}
	},
	callback: async function(properties, resolve)
	{
		const provider = connect.providers.ItemGet(properties.provider);

		if(!provider)
		{
			return resolve(null, 'Provider ' + properties.provider + ' not found.', 404);
		}

		if(provider.Get('auth') === 'oauth2')
		{
			const oauth2 = provider.Get('oauth2');
			const client = await $ot.vault.get(oauth2.id);

			if(!client)
			{
				return resolve(null, provider.Get('name') + ' is not configured yet. Add its credentials in the vault.', 400);
			}

			const nonce = crypto.randomBytes(16).toString('hex');

			const params = new URLSearchParams({
				client_id: client,
				redirect_uri: await $ot.vault.get('CONNECT_REDIRECT'),
				scope: connect.providers.Fn('merge', provider),
				state: properties.provider + ':' + nonce,
				response_type: 'code'
			});

			return resolve({ authorize: oauth2.authorize + '?' + params.toString() }, 'Redirecting to ' + provider.Get('name') + '.');
		}

		if(provider.Get('auth') === 'api_key')
		{
			if(!properties.credentials.token)
			{
				return resolve(null, 'A token is required for this provider.', 400);
			}

			const connection = connect.connections.Item({
				provider: properties.provider,
				status: 'active',
				credentials: connect.connections.Fn('encrypt', properties.credentials),
				scopes: '',
				metadata: {}
			});

			await connection.Create();

			return resolve({ connection: connection.Get(['id', 'provider', 'status', 'scopes', 'metadata', 'expires_at', 'created_at']) }, provider.Get('name') + ' connected.');
		}

		resolve(null, 'Unsupported auth type.', 400);
	}
});
