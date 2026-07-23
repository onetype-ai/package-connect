onetype.AddonReady('admin.screens', (screens) =>
{
    screens.Item({
        id: 'connect',
        route: '/connect',
        app: 'connect',
        metadata: { addon: 'connect' }
    });
});
