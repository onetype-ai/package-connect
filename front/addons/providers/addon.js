onetype.AddonReady('connect', (connect) =>
{
	connect.providers = onetype.Addon('connect.providers', (addon) =>
	{
		addon.Field('slug', {
			type: 'string',
			required: true,
			description: 'Stable text key of the provider, like slack.'
		});

		addon.Field('name', {
			type: 'string',
			description: 'Provider name shown in the catalog.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'Short one line description of what the provider is.'
		});

		addon.Field('tags', {
			type: 'array',
			value: [],
			description: 'Category tags shown on the provider card and page.'
		});

		addon.Field('overview', {
			type: 'string',
			description: 'Markdown overview shown on the provider page.'
		});

		addon.Field('logo', {
			type: 'string',
			description: 'Url of the provider logo image.'
		});

		addon.Field('icon', {
			type: 'string',
			description: 'Material Symbols icon name.'
		});

		addon.Field('color', {
			type: 'string',
			description: 'Accent color as a hex or rgba string.'
		});

		addon.Field('auth', {
			type: 'string',
			description: 'How the platform authenticates against the provider.'
		});

		addon.Field('vault', {
			type: 'array',
			value: [],
			description: 'Vault key names the provider needs before it can connect.'
		});
	});
});
