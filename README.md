# Connect

**External providers as first-class citizens.** Packages declare providers and typed actions, admins connect accounts through OAuth or an API key, and anything on the platform runs those actions with a live token — without ever seeing a credential.

Slack, GitHub and Google ship in the catalog. A provider is one declaration, an action is one file, and the whole flow — credentials, authorization, token refresh, execution — is handled by the package.

## How it works

- A package declares a **provider**: identity, auth kind, OAuth endpoints, scopes and the vault keys it needs
- Admins fill the credentials in the vault, connect the account on the provider page, and the encrypted token lands in the `connections` table
- **Actions** are typed operations against the provider api — input and output schemas, executed with a live token that refreshes itself before it expires
- Any package or automation runs an action through one command, against the active connection

## Declaring a provider

```js
connect.providers.Item({
	id: 'slack',
	slug: 'slack',
	name: 'Slack',
	description: 'Team messaging and collaboration.',
	tags: ['Messaging', 'Team'],
	logo: 'https://cdn.simpleicons.org/slack',
	color: 'rgba(74, 21, 75, 1)',
	vault: ['SLACK_CLIENT_ID', 'SLACK_CLIENT_SECRET', 'SLACK_SIGNING_SECRET'],
	auth: 'oauth2',
	oauth2: {
		authorize: 'https://slack.com/oauth/v2/authorize',
		token: 'https://slack.com/api/oauth.v2.access',
		scopes: 'chat:write,channels:read,channels:manage,channels:join',
		id: 'SLACK_CLIENT_ID',
		secret: 'SLACK_CLIENT_SECRET',
		normalize: (data) => ({ ... })
	},
	base: 'https://slack.com/api'
});
```

Providers with `auth: 'api_key'` skip the OAuth block — the key is stored directly on link.

## Declaring an action

```js
connect.actions.Item({
	id: 'slack:messages:send',
	slug: 'slack:messages:send',
	provider: 'slack',
	name: 'Send Message',
	description: 'Send a message to a Slack channel.',
	input: {
		channel: { type: 'string', required: true, description: 'Channel id the message is sent to.' },
		text: { type: 'string', required: true, description: 'Message text.' }
	},
	output: {
		ok: { type: 'boolean', description: 'Whether Slack accepted the message.' },
		ts: { type: 'string', description: 'Timestamp id of the sent message.' }
	},
	execute: async function({ token, input, provider }, resolve)
	{
		// call provider.Get('base') with the live token, resolve the typed output
	}
});
```

Input validates before the call, output validates after — an action can never return a shape it did not declare.

## Running actions

```js
await $ot.connect.actions.run('slack:messages:send', { channel: 'C01PSUYF08N', text: 'Hello from OneType 👋' });
```

The connection resolves automatically to the active one of the action provider — pass `connection` only to target a specific account.

## Commands

| Command | What it does |
| --- | --- |
| `connect:providers:many` | The provider catalog with tags, vault keys and overviews |
| `connect:actions:many` | The action catalog with input and output schemas |
| `connect:link` | Starts a connection — an authorize url for oauth2, direct storage for api_key |
| `connect:callback` | OAuth redirect target, saves the connection and returns to the provider page |
| `connect:connections:many` | Active connections of the instance |
| `connect:unlink` | Revokes a connection and clears its credentials |
| `connect:run` | Runs an action against a connection |

## Requirements

- `CONNECT_KEY` environment variable — a 32-byte hex key the connection credentials encrypt with
- The `onetype/vault` package — provider credentials live there
- Providers with OAuth need the instance callback url (`/api/connect/callback`) registered in their app settings, over https
