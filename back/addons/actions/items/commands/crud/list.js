import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
	id: 'connect:actions',
	exposed: true,
	method: 'GET',
	endpoint: '/api/connect/actions',
	description: 'Lists the available actions, optionally filtered by provider.',
	metadata: { addon: 'connect.actions' },
	condition: function()
	{
		if(!this.http || !this.http.state.user)
		{
			return 'Sign in to browse the catalog.';
		}
	},
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
		let items = Object.values(connect.actions.Items());

		if(properties.provider)
		{
			items = items.filter((item) => item.Get('provider') === properties.provider);
		}

		resolve({ actions: items.map((item) => item.Get(['slug', 'provider', 'name', 'description', 'input', 'output'])) });
	}
});
