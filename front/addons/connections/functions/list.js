onetype.AddonReady('connect', (connect) =>
{
	connect.connections.Fn('list', async function()
	{
		const result = await $ot.command('connect:list', {}, true);

		this.ItemsRemove();

		if(result.code === 200)
		{
			this.ItemsAdd(result.data.connections);
		}

		return Object.values(this.Items());
	});
});
