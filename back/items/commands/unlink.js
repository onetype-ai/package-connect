import commands from '@onetype/framework/commands';
import connections from '#connect-back/connections/addon.js';

commands.Item({
	id: 'connect:unlink',
	exposed: true,
	method: 'POST',
	endpoint: '/api/connect/unlink',
	description: 'Revokes a connection and clears its credentials.',
	metadata: { addon: 'connect' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to unlink a connection.';
		}
	},
	in: {
		id: {
			type: 'number',
			required: true,
			description: 'Id of the connection to revoke.'
		}
	},
	out: {
		success: {
			type: 'boolean',
			description: 'Whether the connection was revoked.'
		}
	},
	callback: async function(properties, resolve)
	{
		const connection = await connections.Find().filter('id', properties.id).filter('deleted_at', null, 'NULL').one();

		if(!connection)
		{
			return resolve(null, 'Connection not found.', 404);
		}

		await connections.Fn('revoke', properties.id);

		resolve({ success: true }, 'Connection revoked.');
	}
});
