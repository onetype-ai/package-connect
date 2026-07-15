onetype.AddonReady('ui.screens', (screens) =>
{
	screens.Item({
		id: 'connect.providers',
		route: '/connect/providers',
		app: 'connect',
		mode: 'providers',
		isDefault: true,
		metadata: { addon: 'connect' }
	});
});
