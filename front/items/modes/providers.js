onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'providers',
		condition: { app: ['connect'] },
		isDefault: true,
		order: 1,
		icon: 'grid_view',
		name: 'Providers'
	});
});
