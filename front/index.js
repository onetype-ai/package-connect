const connect = onetype.Addon('connect', (addon) =>
{
	addon.list = onetype.Addon('connect.list', (addon) =>
	{
		addon.Field('id', {
			type: 'number',
			description: 'Connection id.'
		});

		addon.Field('provider', {
			type: 'string',
			description: 'Slug of the connected provider.'
		});

		addon.Field('status', {
			type: 'string',
			description: 'State of the connection.'
		});

		addon.Field('metadata', {
			type: 'object',
			value: {},
			description: 'Metadata about the connected account.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'When the connection was created.'
		});
	});
});

connect.Fn('providers', function()
{
	return Object.values(connectProviders.Items()).map((item) => item.Get(['slug', 'name', 'description', 'icon', 'color', 'auth']));
});

connect.Fn('connections', async function()
{
	const result = await $ot.command('connect:list', {}, true);

	connect.list.ItemsRemove();

	if(result.code === 200)
	{
		connect.list.ItemsAdd(result.data.connections);
	}

	return Object.values(connect.list.Items());
});

connect.Fn('link', async function(provider)
{
	const result = await $ot.command('connect:link', { provider }, true);

	if(result.code === 200 && result.data.authorize)
	{
		window.location.href = result.data.authorize;
	}

	return result;
});

$ot.connect = {
	providers: () => connect.Fn('providers'),
	connections: () => connect.Fn('connections'),
	link: (provider) => connect.Fn('link', provider),
	unlink: (id) => $ot.command('connect:unlink', { id }, true)
};
