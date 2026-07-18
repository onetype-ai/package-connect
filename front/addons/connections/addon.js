onetype.AddonReady('connect', (connect) =>
{
	connect.connections = onetype.Addon('connect.connections', (addon) =>
	{
		addon.Field('id', {
			type: 'number',
			description: 'Connection id.'
		});

		addon.Field('provider', {
			type: 'string',
			description: 'Slug of the connected provider.'
		});

		addon.Field('status', {
			type: 'string',
			description: 'State of the connection.'
		});

		addon.Field('scopes', {
			type: 'string',
			description: 'Scopes granted to the connection.'
		});

		addon.Field('metadata', {
			type: 'object',
			value: {},
			description: 'Metadata about the connected account.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'When the connection was created.'
		});
	});
});
