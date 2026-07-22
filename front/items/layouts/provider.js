onetype.AddonReady('ui.layouts', (layouts) =>
{
    layouts.Item({
        id: 'connect-provider',
        isActive: true,
        screen: ['connect.provider'],
        zone: 'root',
        slot: 'center',
        render: function()
        {
            return `<e-connect-provider :slug="connectProvider"></e-connect-provider>`;
        }
    });
});
