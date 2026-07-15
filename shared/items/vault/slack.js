import onetype from '@onetype/framework';
onetype.AddonReady('vault', (vault) =>
{
	vault.Item({
		key: 'SLACK_CLIENT_ID',
		name: 'Slack Client ID',
		description: 'From your Slack app OAuth settings.',
		provider: 'slack'
	});

	vault.Item({
		key: 'SLACK_CLIENT_SECRET',
		name: 'Slack Client Secret',
		description: 'From your Slack app OAuth settings.',
		provider: 'slack',
		secret: true
	});
});
