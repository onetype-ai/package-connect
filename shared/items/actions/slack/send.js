import onetype from '@onetype/framework';
import connectActions from '#connect/actions/addon.js';

connectActions.Item({
	id: 'slack:messages:send',
	slug: 'slack:messages:send',
	provider: 'slack',
	name: 'Send Message',
	description: 'Send a message to a Slack channel.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id the message is sent to.'
		},
		text: {
			type: 'string',
			required: true,
			description: 'Message text.'
		}
	},
	output: {
		ok: {
			type: 'boolean',
			description: 'Whether Slack accepted the message.'
		},
		ts: {
			type: 'string',
			description: 'Timestamp id of the sent message.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/chat.postMessage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ channel: input.channel, text: input.text })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the message.');
		}

		resolve({ ok: data.ok, ts: data.ts });
	}
});
