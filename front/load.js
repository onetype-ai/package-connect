$ot.connect = {
    providers: {
        list: () => connect.providers.Fn('list'),
        get: (slug) => connect.providers.Fn('get', slug)
    },
    actions: {
        list: (provider) => connect.actions.Fn('list', provider),
        run: (action, input, connection) => connect.actions.Fn('run', action, input, connection)
    },
    connections: {
        list: () => connect.connections.Fn('list'),
        link: (provider) => connect.connections.Fn('link', provider),
        unlink: (id) => connect.connections.Fn('unlink', id)
    }
};
