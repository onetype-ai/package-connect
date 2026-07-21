onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'FIGMA_CLIENT_ID',
		name: 'Figma Client ID',
		description: 'From your Figma app settings.',
		category: 'connect',
		group: 'Figma'
	});

	keys.Item({
		key: 'FIGMA_CLIENT_SECRET',
		name: 'Figma Client Secret',
		description: 'From your Figma app settings.',
		category: 'connect',
		group: 'Figma',
		secret: true
	});
});
