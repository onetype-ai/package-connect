import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:messages:schedule',
	slug: 'slack:messages:schedule',
	provider: 'slack',
	name: 'Schedule Message',
	description: 'Schedule a message to post in a channel at a future time.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id the message posts to.'
		},
		text: {
			type: 'string',
			required: true,
			description: 'Message text.'
		},
		at: {
			type: 'number',
			required: true,
			description: 'Unix timestamp in seconds when the message posts, up to 120 days ahead.'
		}
	},
	output: {
		ok: {
			type: 'boolean',
			description: 'Whether Slack scheduled the message.'
		},
		id: {
			type: 'string',
			description: 'Id of the scheduled message, used to cancel it.'
		},
		at: {
			type: 'number',
			description: 'Unix timestamp the message posts at.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/chat.scheduleMessage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ channel: input.channel, text: input.text, post_at: input.at })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the schedule.');
		}

		resolve({ ok: data.ok, id: data.scheduled_message_id, at: data.post_at });
	}
});
