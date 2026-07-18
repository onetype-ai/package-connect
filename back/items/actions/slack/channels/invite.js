import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:channels:invite',
	slug: 'slack:channels:invite',
	provider: 'slack',
	name: 'Invite to Channel',
	description: 'Invite users to a channel the app is in.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id to invite into.'
		},
		users: {
			type: 'array',
			required: true,
			each: {
				type: 'string'
			},
			description: 'User ids to invite, up to 1000.'
		}
	},
	output: {
		ok: {
			type: 'boolean',
			description: 'Whether Slack accepted the invite.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/conversations.invite', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ channel: input.channel, users: input.users.join(',') })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the invite.');
		}

		resolve({ ok: data.ok });
	}
});
