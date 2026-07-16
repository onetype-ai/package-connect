import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';
import connections from '#connect-back/connections/addon.js';

commands.Item({
	id: 'connect:callback',
	exposed: true,
	method: 'GET',
	endpoint: '/api/connect/callback',
	description: 'OAuth redirect target. Exchanges the authorization code for a token, saves the connection and returns it.',
	metadata: { addon: 'connect' },
	in: {
		code: {
			type: 'string',
			required: true,
			description: 'Authorization code returned by the provider.'
		},
		state: {
			type: 'string',
			required: true,
			description: 'State parameter carrying the provider slug and a nonce.'
		}
	},
	out: {
		connection: {
			type: 'object',
			config: 'connect.connection',
			description: 'The created connection.'
		}
	},
	callback: async function(properties, resolve)
	{
		const connection = await connections.Fn('callback', properties.code, properties.state);

		resolve({ connection: connection.Get(['id', 'provider', 'status', 'scopes', 'metadata', 'expires_at', 'created_at']) }, 'Connection linked.');
	}
});
