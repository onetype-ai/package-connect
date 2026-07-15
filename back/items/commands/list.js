import commands from '@onetype/framework/commands';
import connections from '#connect-back/connections/addon.js';

commands.Item({
	id: 'connect:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/connect/list',
	description: 'Lists the active connections of the signed in team.',
	metadata: { addon: 'connect' },
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
			description: 'The team connections, newest first.'
		}
	},
	callback: async function(properties, resolve)
	{
		const items = await connections.Find()
			.filter('team_id', this.http.state.user.team.id)
			.filter('deleted_at', null, 'NULL')
			.sort('created_at', 'DESC')
			.many();

		resolve({ connections: items.map((item) => item.Get(['id', 'team_id', 'provider', 'status', 'scopes', 'metadata', 'expires_at', 'created_at'])) });
	}
});
