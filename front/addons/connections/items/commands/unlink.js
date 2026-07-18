commands.Item({
	id: 'connect:unlink',
	description: 'Revokes a connection on the instance and refreshes the front registry.',
	metadata: { addon: 'connect.connections' },
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
		const result = await connect.connections.Fn('unlink', properties.id);

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		await connect.connections.Fn('list');

		resolve({ success: true }, result.message);
	}
});
