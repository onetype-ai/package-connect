onetype.AddonReady('connect', (connect) =>
{
	connect.connections.Fn('unlink', async function(id)
	{
		return await $ot.command('connect:unlink', { id }, true);
	});
});
