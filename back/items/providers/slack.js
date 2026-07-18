import connect from '#connect/addon.js';

connect.providers.Item({
	id: 'slack',
	slug: 'slack',
	name: 'Slack',
	description: 'Team messaging and collaboration.',
	tags: ['Messaging', 'Team'],
	overview: `
## What it does

Slack connects the instance to a workspace, so packages can post where the team already talks: alerts from automations, audit notifications, form submissions, anything a command produces.

## Getting credentials

Create an app at [api.slack.com/apps](https://api.slack.com/apps), open **OAuth & Permissions** and copy the Client ID and Client Secret into the vault. Add the redirect url of this instance to the app before connecting.
	`,
	logo: 'https://cdn.simpleicons.org/slack',
	icon: 'forum',
	color: 'rgba(74, 21, 75, 1)',
	vault: ['SLACK_CLIENT_ID', 'SLACK_CLIENT_SECRET', 'SLACK_SIGNING_SECRET'],
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
