import onetype from '@onetype/framework';

onetype.DataSchema('connect.provider', {
	slug: {
		type: 'string',
		description: 'Stable text key of the provider, like slack or github.'
	},
	name: {
		type: 'string',
		description: 'Provider name shown in the catalog.'
	},
	description: {
		type: 'string',
		description: 'Short one line description of what the provider is.'
	},
	icon: {
		type: 'string',
		description: 'Icon slug or Material Symbols name.'
	},
	color: {
		type: 'string',
		description: 'Accent color as a hex or rgba string.'
	},
	auth: {
		type: 'string',
		description: 'How the platform authenticates against the provider.'
	}
});
