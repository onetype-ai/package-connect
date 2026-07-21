onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'GITHUB_CLIENT_ID',
		name: 'GitHub Client ID',
		description: 'From your GitHub OAuth app settings.',
		category: 'connect',
		group: 'GitHub'
	});

	keys.Item({
		key: 'GITHUB_CLIENT_SECRET',
		name: 'GitHub Client Secret',
		description: 'From your GitHub OAuth app settings.',
		category: 'connect',
		group: 'GitHub',
		secret: true
	});
});
