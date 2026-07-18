commands.Item({
	id: 'connect:actions',
	description: 'Reads the action catalog from the front registry, optionally filtered by provider.',
	metadata: { addon: 'connect' },
	in: {
		provider: {
			type: 'string',
			description: 'Slug of a provider to filter by.'
		}
	},
	out: {
		actions: {
			type: 'array',
			each: {
				type: 'object',
				config: 'connect.action'
			},
			description: 'The matching actions.'
		}
	},
	callback: function(properties, resolve)
	{
		resolve({ actions: connect.actions.Fn('list', properties.provider) });
	}
});
