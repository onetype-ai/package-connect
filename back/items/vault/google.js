onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'GOOGLE_CLIENT_ID',
		name: 'Google Client ID',
		description: 'From your Google Cloud OAuth credentials.',
		category: 'connect',
		group: 'Google'
	});

	keys.Item({
		key: 'GOOGLE_CLIENT_SECRET',
		name: 'Google Client Secret',
		description: 'From your Google Cloud OAuth credentials.',
		category: 'connect',
		group: 'Google',
		secret: true
	});
});
