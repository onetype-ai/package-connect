import providers from '#connect/providers/addon.js';

providers.Item({
	slug: 'slack',
	name: 'Slack',
	description: 'Team messaging and collaboration.',
	icon: 'slack',
	color: 'rgba(74, 21, 75, 1)',
	auth: 'oauth2',
	oauth2: {
		authorize: 'https://slack.com/oauth/v2/authorize',
		token: 'https://slack.com/api/oauth.v2.access',
		scopes: 'chat:write,channels:read,channels:manage',
		id: 'SLACK_CLIENT_ID',
		secret: 'SLACK_CLIENT_SECRET',
		normalize: function(data)
		{
			return {
				access_token: data.access_token,
				refresh_token: null,
				token_type: data.token_type,
				expires_at: null,
				scopes: data.scope,
				metadata: { account: data.team?.id, name: data.team?.name }
			};
		}
	},
	base: 'https://slack.com/api'
});
