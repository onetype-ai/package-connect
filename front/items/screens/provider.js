onetype.AddonReady('ui.screens', (screens) =>
{
    screens.Item({
        id: 'connect.provider',
        route: '/connect/providers/:slug',
        app: 'connect',
        metadata: { addon: 'connect' },
        data: function()
        {
            return { connectProvider: this.slug };
        }
    });
});
