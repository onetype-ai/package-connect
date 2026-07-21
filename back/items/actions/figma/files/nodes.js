import connect from '#connect/addon.js';

connect.actions.Item({
	id: 'figma:files:nodes',
	slug: 'figma:files:nodes',
	provider: 'figma',
	name: 'Get Nodes',
	description: 'Read specific nodes of a design file by their ids.',
	input: {
		key: {
			type: 'string',
			required: true,
			description: 'File key from the figma.com url.'
		},
		ids: {
			type: 'array',
			required: true,
			each: {
				type: 'string'
			},
			description: 'Node ids to read, like 1:2.'
		}
	},
	output: {
		nodes: {
			type: 'object',
			description: 'The requested nodes keyed by id, each with its document subtree.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const query = new URLSearchParams({ ids: input.ids.join(',') });

		const response = await fetch(provider.Get('base') + '/files/' + input.key + '/nodes?' + query, {
			headers: { 'Authorization': 'Bearer ' + token }
		});

		if(!response.ok)
		{
			throw onetype.Error(502, 'Figma rejected the read: ' + response.status);
		}

		const data = await response.json();

		resolve({ nodes: data.nodes });
	}
});
