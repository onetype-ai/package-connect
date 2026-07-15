onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'connections',
		condition: { app: ['connect'] },
		order: 2,
		icon: 'lan',
		name: 'Connections'
	});
});
