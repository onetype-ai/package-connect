onetype.AddonReady('connect', (connect) =>
{
    connect.providers.Fn('list', function()
    {
        return Object.values(this.Items()).map((item) => item.Get(['slug', 'name', 'description', 'overview', 'tags', 'logo', 'icon', 'color', 'auth', 'scopes', 'vault']));
    });
});
