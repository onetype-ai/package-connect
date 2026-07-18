import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

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
		const providers = Object.values(connect.providers.Items()).map((item) =>
		{
			const oauth2 = item.Get('oauth2');

			return {
				...item.Get(['slug', 'name', 'description', 'overview', 'tags', 'logo', 'icon', 'color', 'auth']),
				keys: [oauth2 ? oauth2.id : null, oauth2 ? oauth2.secret : null].filter(Boolean)
			};
		});

		resolve({ providers });
	}
});
