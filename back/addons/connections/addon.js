import onetype from '@onetype/framework';

onetype.AddonReady('connect', (connect) =>
{
	connect.connections = onetype.Addon('connect.connections', (addon) =>
	{
		addon.Table('connections');

		addon.Field('id', {
			type: 'number',
			description: 'Unique connection id.'
		});

		addon.Field('provider', {
			type: 'string',
			required: true,
			description: 'Slug of the provider this connection authenticates against.'
		});

		addon.Field('status', {
			type: 'string',
			value: 'active',
			options: ['active', 'expired', 'revoked'],
			description: 'State of the connection.'
		});

		addon.Field('credentials', {
			type: 'string',
			description: 'Encrypted OAuth or API key credentials. Never leaves the back.'
		});

		addon.Field('scopes', {
			type: 'string',
			description: 'Scopes granted to the connection.'
		});

		addon.Field('metadata', {
			type: 'object',
			value: {},
			config: {
				account: {
					type: 'string',
					description: 'Identifier of the connected account or workspace.'
				},
				name: {
					type: 'string',
					description: 'Human readable name of the connected account.'
				}
			},
			description: 'Provider specific metadata about the connected account.'
		});

		addon.Field('expires_at', {
			type: 'string',
			description: 'Timestamp after which the access token must be refreshed.'
		});

		addon.Field('updated_at', {
			type: 'string',
			description: 'Timestamp of the last change.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'Timestamp of when the connection was created.'
		});

		addon.Field('deleted_at', {
			type: 'string',
			description: 'Timestamp of a soft delete, null while the connection is alive.'
		});

		addon.Schema('id bigserial primary key');
		addon.Schema('provider varchar(255) not null');
		addon.Schema('status varchar(50) not null default \'active\'');
		addon.Schema('credentials text');
		addon.Schema('scopes text');
		addon.Schema('metadata jsonb not null default \'{}\'');
		addon.Schema('expires_at timestamptz');
		addon.Schema('updated_at timestamptz not null default now()');
		addon.Schema('created_at timestamptz not null default now()');
		addon.Schema('deleted_at timestamptz');
		addon.Schema('index (provider)');
	});
});

