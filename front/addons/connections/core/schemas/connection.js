onetype.DataSchema('connect.connection', {
	id: {
		type: 'number',
		description: 'Connection id.'
	},
	provider: {
		type: 'string',
		description: 'Slug of the connected provider.'
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
		description: 'Metadata about the connected account.'
	},
	created_at: {
		type: 'string',
		description: 'When the connection was created.'
	}
});
