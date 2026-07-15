import connectProviders from '#connect/providers/addon.js';

connectProviders.Item({
	slug: 'github',
	name: 'GitHub',
	description: 'Code hosting and collaboration.',
	icon: 'github',
	color: 'rgba(36, 41, 47, 1)',
	auth: 'oauth2',
	oauth2: {
		authorize: 'https://github.com/login/oauth/authorize',
		token: 'https://github.com/login/oauth/access_token',
		scopes: 'repo,read:user',
		id: 'GITHUB_CLIENT_ID',
		secret: 'GITHUB_CLIENT_SECRET',
		normalize: function(data)
		{
			return {
				access_token: data.access_token,
				refresh_token: null,
				token_type: data.token_type,
				expires_at: null,
				scopes: data.scope,
				metadata: {}
			};
		}
	},
	base: 'https://api.github.com'
});
