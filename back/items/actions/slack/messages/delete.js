import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:messages:delete',
	slug: 'slack:messages:delete',
	provider: 'slack',
	name: 'Delete Message',
	description: 'Delete a message the app already sent.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id the message lives in.'
		},
		ts: {
			type: 'string',
			required: true,
			description: 'Timestamp id of the message to delete.'
		}
	},
	output: {
		ok: {
			type: 'boolean',
			description: 'Whether Slack deleted the message.'
		},
		ts: {
			type: 'string',
			description: 'Timestamp id of the deleted message.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/chat.delete', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ channel: input.channel, ts: input.ts })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the delete.');
		}

		resolve({ ok: data.ok, ts: data.ts });
	}
});
