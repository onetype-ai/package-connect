import onetype from '@onetype/framework';
onetype.AddonReady('vault', (vault) =>
{
	vault.Item({
		key: 'GITHUB_CLIENT_ID',
		name: 'GitHub Client ID',
		description: 'From your GitHub OAuth app settings.',
		group: 'GitHub'
	});

	vault.Item({
		key: 'GITHUB_CLIENT_SECRET',
		name: 'GitHub Client Secret',
		description: 'From your GitHub OAuth app settings.',
		group: 'GitHub',
		secret: true
	});
});
