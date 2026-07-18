import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:channels:join',
	slug: 'slack:channels:join',
	provider: 'slack',
	name: 'Join Channel',
	description: 'Join the app to a public channel so it can post there.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id to join.'
		}
	},
	output: {
		ok: {
			type: 'boolean',
			description: 'Whether Slack joined the channel.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/conversations.join', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ channel: input.channel })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the join.');
		}

		resolve({ ok: data.ok });
	}
});
