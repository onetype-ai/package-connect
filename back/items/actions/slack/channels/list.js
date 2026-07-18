import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:channels:list',
	slug: 'slack:channels:list',
	provider: 'slack',
	name: 'List Channels',
	description: 'List the public channels of the workspace.',
	input: {
		limit: {
			type: 'number',
			value: 100,
			description: 'How many channels to return, up to 1000.'
		},
		archived: {
			type: 'boolean',
			value: false,
			description: 'Include archived channels.'
		}
	},
	output: {
		channels: {
			type: 'array',
			each: {
				type: 'object'
			},
			description: 'Channels with their id, name, topic, member count and archived state.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const query = new URLSearchParams({
			types: 'public_channel',
			limit: String(Math.min(input.limit, 1000)),
			exclude_archived: String(!input.archived)
		});

		const response = await fetch(provider.Get('base') + '/conversations.list?' + query, {
			headers: { 'Authorization': 'Bearer ' + token }
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the list.');
		}

		resolve({
			channels: data.channels.map((channel) => ({
				id: channel.id,
				name: channel.name,
				topic: channel.topic ? channel.topic.value : '',
				members: channel.num_members,
				archived: channel.is_archived
			}))
		});
	}
});
