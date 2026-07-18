onetype.AddonReady('connect', (connect) =>
{
	connect.actions.Fn('list', function(provider)
	{
		return Object.values(this.Items())
			.filter((item) => !provider || item.Get('provider') === provider)
			.map((item) => item.Get(['slug', 'provider', 'name', 'description', 'input', 'output']));
	});
});
