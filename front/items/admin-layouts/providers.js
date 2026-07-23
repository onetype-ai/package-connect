onetype.AddonReady('admin.layouts', (layouts) =>
{
    layouts.Item({
        id: 'connect-providers',
        isActive: true,
        screen: ['connect.providers'],
        zone: 'root',
        slot: 'center',
        render: function()
        {
            return `<e-connect-providers></e-connect-providers>`;
        }
    });
});
