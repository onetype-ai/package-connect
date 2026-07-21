import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'slack:channels:create',
	slug: 'slack:channels:create',
	provider: 'slack',
	name: 'Create Channel',
	description: 'Create a public channel in the workspace.',
	input: {
		name: {
			type: 'string',
			required: true,
			description: 'Channel name: lowercase, no spaces, up to 80 characters.'
		}
	},
	output: {
		id: {
			type: 'string',
			description: 'Id of the created channel.'
		},
		name: {
			type: 'string',
			description: 'Name of the created channel.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/conversations.create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({ name: input.name })
		});

		const data = await response.json();

		if(!data.ok)
		{
			throw onetype.Error(502, data.error ? data.error : 'Slack rejected the create.');
		}

		resolve({ id: data.channel.id, name: data.channel.name });
	}
});
