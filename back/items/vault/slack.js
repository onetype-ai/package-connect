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

	keys.Item({
		key: 'SLACK_SIGNING_SECRET',
		name: 'Slack Signing Secret',
		description: 'From App Credentials, verifies that incoming Slack requests are genuine.',
		category: 'connect',
		group: 'Slack',
		secret: true
	});
});
