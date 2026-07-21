import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:channels:topic',
	slug: 'slack:channels:topic',
	provider: 'slack',
	name: 'Set Channel Topic',
	description: 'Set the topic of a channel the app is in.',
	input: {
		channel: {
			type: 'string',
			required: true,
			description: 'Channel id to set the topic on.'
		},
		topic: {
			type: 'string',
			required: true,
			description: 'New topic text.'
		}
	},
	output: {
		ok: {
			type: 'boolean',
			description: 'Whether Slack accepted the topic.'
		},
		topic: {
			type: 'string',
			description: 'The topic as stored.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/conversations.setTopic', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ channel: input.channel, topic: input.topic })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the topic.');
		}

		resolve({ ok: data.ok, topic: data.channel && data.channel.topic ? data.channel.topic.value : input.topic });
	}
});
