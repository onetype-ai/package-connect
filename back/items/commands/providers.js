import commands from '@onetype/framework/commands';
import providers from '#connect/providers/addon.js';

commands.Item({
	id: 'connect:providers',
	exposed: true,
	method: 'GET',
	endpoint: '/api/connect/providers',
	description: 'Lists every provider in the catalog.',
	metadata: { addon: 'connect' },
	in: {},
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
		resolve({ providers: Object.values(providers.Items()).map((item) => item.Get(['slug', 'name', 'description', 'icon', 'color', 'auth'])) });
	}
});
