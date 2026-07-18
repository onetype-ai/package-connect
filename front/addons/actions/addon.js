onetype.AddonReady('connect', (connect) =>
{
	connect.actions = onetype.Addon('connect.actions', (addon) =>
	{
		addon.Field('slug', {
			type: 'string',
			required: true,
			description: 'Stable text key of the action, like slack:messages:send.'
		});

		addon.Field('provider', {
			type: 'string',
			description: 'Slug of the provider the action runs against.'
		});

		addon.Field('name', {
			type: 'string',
			description: 'Action name shown in the catalog.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'Short one line description of what the action does.'
		});

		addon.Field('input', {
			type: 'object',
			value: {},
			description: 'Typed schema of the parameters the action accepts.'
		});

		addon.Field('output', {
			type: 'object',
			value: {},
			description: 'Typed schema of the data the action returns.'
		});
	});
});
