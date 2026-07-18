import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
	id: 'connect:unlink',
	exposed: true,
	method: 'POST',
	endpoint: '/api/connect/unlink',
	description: 'Revokes a connection and clears its credentials.',
	metadata: { addon: 'connect.connections' },
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
		const connection = await connect.connections.Find().filter('id', properties.id).filter('deleted_at', null, 'NULL').one();

		if(!connection)
		{
			return resolve(null, 'Connection not found.', 404);
		}

		await connect.connections.Fn('revoke', properties.id);

		resolve({ success: true }, 'Connection revoked.');
	}
});
