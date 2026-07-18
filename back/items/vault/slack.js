import onetype from '@onetype/framework';
onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'SLACK_CLIENT_ID',
		name: 'Slack Client ID',
		description: 'From your Slack app OAuth settings.',
		category: 'connect',
		group: 'Slack'
	});

	keys.Item({
		key: 'SLACK_CLIENT_SECRET',
		name: 'Slack Client Secret',
		description: 'From your Slack app OAuth settings.',
		category: 'connect',
		group: 'Slack',
		secret: true
	});
});
