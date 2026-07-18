onetype.AddonReady('developer.addons', (developer) =>
{
	developer.Item({
		id: 'connect.providers',
		group: 'connect',
		name: 'Providers',
		description: 'The catalog of external services: identity, auth kind, scopes and the vault keys each one needs.',
		content: `
## What it does

A provider describes one external service — who it is, how the platform authenticates against it and which vault keys it reads. Declaring one puts it in the catalog, on the providers grid and on its own page at \`/connect/providers/:slug\`.

## Declaring a provider

Providers are declared on the back only — the front reads the catalog from the instance.

\`\`\`js
connect.providers.Item({
	id: 'slack',
	slug: 'slack',
	name: 'Slack',
	description: 'Team messaging and collaboration.',
	tags: ['Messaging', 'Team'],
	logo: 'https://cdn.simpleicons.org/slack',
	color: 'rgba(74, 21, 75, 1)',
	vault: ['SLACK_CLIENT_ID', 'SLACK_CLIENT_SECRET'],
	auth: 'oauth2',
	oauth2: {
		authorize: 'https://slack.com/oauth/v2/authorize',
		token: 'https://slack.com/api/oauth.v2.access',
		scopes: 'chat:write,channels:read',
		id: 'SLACK_CLIENT_ID',
		secret: 'SLACK_CLIENT_SECRET',
		normalize: (data) => ({ ...credential })
	},
	base: 'https://slack.com/api'
});
\`\`\`

The \`vault\` list drives the credentials section of the provider page and the ready state of the connect button. Providers with \`auth: 'api_key'\` skip the oauth2 block — the key stores directly on link.

## Facade

\`\`\`js
$ot.connect.providers();
$ot.connect.provider('slack');
\`\`\`

Both read the front registry the boot listener fills — no request per call.
		`
	});
});
