import connect from '#connect/addon.js';

connect.providers.Item({
	id: 'github',
	slug: 'github',
	name: 'GitHub',
	description: 'Code hosting and collaboration.',
	tags: ['Code', 'Issues'],
	overview: `
## What it does

GitHub connects the instance to your repositories, so packages can open issues from the workspace: bug reports from forms, escalations from automations, tasks born anywhere on the platform.

## Getting credentials

Create an OAuth app under **Settings → Developer settings → OAuth Apps**, copy the Client ID and Client Secret into the vault, and set the authorization callback url to this instance before connecting.
	`,
	logo: 'https://cdn.simpleicons.org/github/ffffff',
	icon: 'code',
	color: 'rgba(36, 41, 47, 1)',
	vault: ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET'],
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
