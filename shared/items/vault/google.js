import onetype from '@onetype/framework';
onetype.AddonReady('vault', (vault) =>
{
	vault.Item({
		key: 'GOOGLE_CLIENT_ID',
		name: 'Google Client ID',
		description: 'From your Google Cloud OAuth credentials.',
		provider: 'google'
	});

	vault.Item({
		key: 'GOOGLE_CLIENT_SECRET',
		name: 'Google Client Secret',
		description: 'From your Google Cloud OAuth credentials.',
		provider: 'google',
		secret: true
	});
});
