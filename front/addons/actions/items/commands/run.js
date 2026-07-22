commands.Item({
    id: 'connect:run',
    description: 'Runs an action on the instance, against the active connection of the action provider.',
    metadata: { addon: 'connect.actions' },
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
        const result = await connect.actions.Fn('run', properties.action, properties.input, properties.connection);

        resolve({ result }, 'Action ran.');
    }
});
