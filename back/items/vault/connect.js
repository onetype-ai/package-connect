import onetype from '@onetype/framework';
onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'CONNECT_REDIRECT',
		name: 'Redirect URL',
		description: 'The public callback URL, like https://your-domain.com/api/connect/callback. Register it in every provider OAuth app.',
		category: 'connect'
	});
});
