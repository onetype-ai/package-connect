onetype.AddonReady('connect', (connect) =>
{
	connect.connections.Fn('link', async function(provider)
	{
		const result = await $ot.command('connect:link', { provider }, true);

		if(result.code === 200 && result.data.authorize)
		{
			window.location.href = result.data.authorize;
		}

		return result;
	});
});
