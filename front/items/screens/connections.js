onetype.AddonReady('ui.screens', (screens) =>
{
	screens.Item({
		id: 'connect.connections',
		route: '/connect/connections',
		app: 'connect',
		mode: 'connections',
		isDefault: true,
		metadata: { addon: 'connect' }
	});
});
