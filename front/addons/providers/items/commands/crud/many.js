commands.Item({
	id: 'connect:providers:many',
	description: 'Reads the provider catalog from the front registry.',
	metadata: { addon: 'connect.providers' },
	out: {
		providers: {
			type: 'array',
			each: {
				type: 'object',
				config: 'connect.provider'
			},
			description: 'The provider catalog.'
		}
	},
	callback: function(properties, resolve)
	{
		resolve({ providers: connect.providers.Fn('list') });
	}
});
