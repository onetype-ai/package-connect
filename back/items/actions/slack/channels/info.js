import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:channels:info',
	slug: 'slack:channels:info',
	provider: 'slack',
	name: 'Channel Info',
	description: 'Read the details of a single channel.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id to read.'
		}
	},
	output: {
		id: {
			type: 'string',
			description: 'Channel id.'
		},
		name: {
			type: 'string',
			description: 'Channel name.'
		},
		topic: {
			type: 'string',
			description: 'Channel topic.'
		},
		purpose: {
			type: 'string',
			description: 'Channel purpose.'
		},
		members: {
			type: 'number',
			description: 'Member count.'
		},
		archived: {
			type: 'boolean',
			description: 'Whether the channel is archived.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const query = new URLSearchParams({ channel: input.channel, include_num_members: 'true' });

		const response = await fetch(provider.Get('base') + '/conversations.info?' + query, {
			headers: { 'Authorization': 'Bearer ' + token }
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the read.');
		}

		resolve({
			id: data.channel.id,
			name: data.channel.name,
			topic: data.channel.topic ? data.channel.topic.value : '',
			purpose: data.channel.purpose ? data.channel.purpose.value : '',
			members: data.channel.num_members,
			archived: data.channel.is_archived
		});
	}
});
