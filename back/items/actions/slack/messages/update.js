import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:messages:update',
	slug: 'slack:messages:update',
	provider: 'slack',
	name: 'Update Message',
	description: 'Edit the text of a message the app already sent.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id the message lives in.'
		},
		ts: {
			type: 'string',
			required: true,
			description: 'Timestamp id of the message to edit.'
		},
		text: {
			type: 'string',
			required: true,
			description: 'New message text.'
		}
	},
	output: {
		ok: {
			type: 'boolean',
			description: 'Whether Slack accepted the edit.'
		},
		ts: {
			type: 'string',
			description: 'Timestamp id of the edited message.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/chat.update', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ channel: input.channel, ts: input.ts, text: input.text })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the edit.');
		}

		resolve({ ok: data.ok, ts: data.ts });
	}
});
