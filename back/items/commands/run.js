import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
	id: 'connect:run',
	exposed: true,
	method: 'POST',
	endpoint: '/api/connect/run',
	description: 'Runs an action against one of the instance connections, returning the action output.',
	metadata: { addon: 'connect' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to run an action.';
		}
	},
	in: {
		action: {
			type: 'string',
			required: true,
			description: 'Slug of the action to run.'
		},
		connection: {
			type: 'number',
			required: true,
			description: 'Id of the connection the action runs against.'
		},
		input: {
			type: 'object',
			value: {},
			description: 'Parameters passed to the action, validated against its input schema.'
		}
	},
	out: {
		result: {
			type: 'object',
			description: 'Data returned by the action.'
		}
	},
	callback: async function(properties, resolve)
	{
		const action = connect.actions.ItemGet(properties.action);

		if(!action)
		{
			return resolve(null, 'Action ' + properties.action + ' not found.', 404);
		}

		const connection = await connect.connections.Find().filter('id', properties.connection).filter('deleted_at', null, 'NULL').one();

		if(!connection)
		{
			return resolve(null, 'Connection not found.', 404);
		}

		const result = await connect.actions.Fn('item.run', action, properties.connection, properties.input);

		resolve({ result }, 'Action ran.');
	}
});
