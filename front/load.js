$ot.connect = {
	providers: () => connect.providers.Fn('list'),
	provider: (slug) => connect.providers.Fn('get', slug),
	actions: (provider) => connect.actions.Fn('list', provider),
	run: (action, input, connection) => connect.actions.Fn('run', action, input, connection),
	connections: () => connect.connections.Fn('list'),
	link: (provider) => connect.connections.Fn('link', provider),
	unlink: (id) => connect.connections.Fn('unlink', id)
};
