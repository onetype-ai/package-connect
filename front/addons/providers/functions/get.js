onetype.AddonReady('connect', (connect) =>
{
	connect.providers.Fn('get', function(slug)
	{
		return Object.values(this.Items()).find((item) => item.Get('slug') === slug) || null;
	});
});
