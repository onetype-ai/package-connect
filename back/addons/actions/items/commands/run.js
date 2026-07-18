import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
	id: 'connect:run',
	exposed: true,
	method: 'POST',
	endpoint: '/api/connect/run',
	description: 'Runs an action against a connection, defaulting to the active connection of the action provider, and returns the action output.',
	metadata: { addon: 'connect.actions' },
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
			description: 'Id of the connection the action runs against. Empty uses the active connection of the action provider.'
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

		const find = connect.connections.Find().filter('deleted_at', null, 'NULL');

		properties.connection
			? find.filter('id', properties.connection)
			: find.filter('provider', action.Get('provider')).filter('status', 'active');

		const connection = await find.one();

		if(!connection)
		{
			return resolve(null, properties.connection ? 'Connection not found.' : 'Provider ' + action.Get('provider') + ' is not connected.', 404);
		}

		const result = await connect.actions.Fn('item.run', action, connection.Get('id'), properties.input);

		resolve({ result }, 'Action ran.');
	}
});
