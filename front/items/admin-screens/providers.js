onetype.AddonReady('admin.screens', (screens) =>
{
    screens.Item({
        id: 'connect.providers',
        route: '/connect/providers',
        app: 'connect',
        isDefault: true,
        metadata: { addon: 'connect' }
    });
});
