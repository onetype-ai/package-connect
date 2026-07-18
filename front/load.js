$ot.connect = {
	providers: () => connect.providers.Fn('list'),
	provider: (slug) => connect.providers.Fn('get', slug),
	actions: (provider) => connect.actions.Fn('list', provider),
	connections: () => connect.connections.Fn('list'),
	link: (provider) => connect.connections.Fn('link', provider),
	unlink: (id) => connect.connections.Fn('unlink', id)
};
