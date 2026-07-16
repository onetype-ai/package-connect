onetype.AddonReady('vault.categories', (categories) =>
{
	categories.Item({
		id: 'connect',
		name: 'Connect',
		description: 'Credentials the provider connections use.',
		icon: 'cable',
		order: 10,
		metadata: { addon: 'connect' }
	});
});
