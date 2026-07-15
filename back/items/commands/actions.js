import commands from '@onetype/framework/commands';
import actions from '#connect/actions/addon.js';

commands.Item({
	id: 'connect:actions',
	exposed: true,
	method: 'GET',
	endpoint: '/api/connect/actions',
	description: 'Lists the available actions, optionally filtered by provider.',
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
		let items = Object.values(actions.Items());

		if(properties.provider)
		{
			items = items.filter((item) => item.Get('provider') === properties.provider);
		}

		resolve({ actions: items.map((item) => item.Get(['slug', 'provider', 'name', 'description'])) });
	}
});
