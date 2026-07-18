import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
	id: 'connect:connections:many',
	exposed: true,
	method: 'GET',
	endpoint: '/api/connect/connections',
	description: 'Lists the active connections of the instance.',
	metadata: { addon: 'connect.connections' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to list connections.';
		}
	},
	in: {},
	out: {
		connections: {
			type: 'array',
			each: {
				type: 'object',
				config: 'connect.connection'
			},
			description: 'The instance connections, newest first.'
		}
	},
	callback: async function(properties, resolve)
	{
		const items = await connect.connections.Find()
			.filter('deleted_at', null, 'NULL')
			.sort('created_at', 'DESC')
			.many();

		resolve({ connections: items.map((item) => item.Get(['id', 'provider', 'status', 'scopes', 'metadata', 'expires_at', 'created_at'])) });
	}
});
