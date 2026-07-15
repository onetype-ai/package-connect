onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'connect-connections',
		isActive: true,
		condition: { app: ['connect'], mode: ['connections'] },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `<e-connect-connections></e-connect-connections>`;
		}
	});
});
