onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'connect-providers',
		isActive: true,
		condition: { app: ['connect'], mode: ['providers'] },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `<e-connect-providers></e-connect-providers>`;
		}
	});
});
