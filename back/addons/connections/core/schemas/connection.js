import onetype from '@onetype/framework';

onetype.DataSchema('connect.connection', {
	id: {
		type: 'number',
		description: 'Unique connection id.'
	},
	provider: {
		type: 'string',
		description: 'Slug of the provider this connection authenticates against.'
	},
	status: {
		type: 'string',
		description: 'State of the connection.'
	},
	scopes: {
		type: 'string',
		description: 'Scopes granted to the connection.'
	},
	metadata: {
		type: 'object',
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
	},
	expires_at: {
		type: 'string',
		description: 'Timestamp after which the access token must be refreshed.'
	},
	created_at: {
		type: 'string',
		description: 'Timestamp of when the connection was created.'
	}
});
