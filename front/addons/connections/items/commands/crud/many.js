commands.Item({
    id: 'connect:connections:many',
    description: 'Reads the instance connections and refreshes the front registry.',
    metadata: { addon: 'connect.connections' },
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
        const items = await connect.connections.Fn('list');

        resolve({ connections: items.map((item) => item.Get(['id', 'provider', 'status', 'scopes', 'metadata', 'created_at'])) });
    }
});
