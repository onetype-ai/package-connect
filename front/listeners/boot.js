onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	const providers = await $ot.command('connect:providers:many', {}, true);

	if(providers.code === 200)
	{
		connect.providers.ItemsAdd(providers.data.providers);
	}

	const actions = await $ot.command('connect:actions:many', {}, true);

	if(actions.code === 200)
	{
		connect.actions.ItemsAdd(actions.data.actions);
	}

	await middleware.next();
});
