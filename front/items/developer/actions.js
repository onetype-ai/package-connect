onetype.AddonReady('developer.addons', (developer) =>
{
	developer.Item({
		id: 'connect.actions',
		group: 'connect',
		name: 'Actions',
		description: 'Typed operations against a provider api, executed with a live token that refreshes itself.',
		content: `
## What it does

An action is one operation against a provider api — send a message, create an issue, list channels. Input validates before the call, output validates after, and the execute function receives a live token without ever touching stored credentials.

## Declaring an action

Actions are declared on the back only, one file per action.

\`\`\`js
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
		const response = await fetch(provider.Get('base') + '/chat.postMessage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify(input)
		});

		resolve(await response.json());
	}
});
\`\`\`

Throw inside execute to fail the run — the provider error message travels back to the caller.

## Running

\`\`\`js
await $ot.command('connect:run', {
	action: 'slack:messages:send',
	input: { channel: 'C01PSUYF08N', text: 'Hello 👋' }
});
\`\`\`

The connection resolves automatically to the active one of the action provider — pass \`connection\` only to target a specific account. The catalog reads through \`$ot.connect.actions('slack')\`.
		`
	});
});
