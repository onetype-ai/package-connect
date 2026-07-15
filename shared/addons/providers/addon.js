import onetype from '@onetype/framework';

const connectProviders = onetype.Addon('connect.providers', (addon) =>
{
	addon.Field('slug', {
		type: 'string',
		required: true,
		description: 'Stable text key of the provider, like slack or github.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Provider name shown in the catalog.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Short one line description of what the provider is.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Icon slug or Material Symbols name.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color as a hex or rgba string.'
	});

	addon.Field('auth', {
		type: 'string',
		value: 'oauth2',
		options: ['oauth2', 'api_key'],
		description: 'How the platform authenticates against the provider.'
	});

	addon.Field('oauth2', {
		type: 'object',
		config: {
			authorize: {
				type: 'string',
				description: 'URL the user is sent to in order to grant access.'
			},
			token: {
				type: 'string',
				description: 'URL the authorization code is exchanged for a token at.'
			},
			scopes: {
				type: 'string',
				description: 'Scopes requested when the user grants access.'
			},
			id: {
				type: 'string',
				description: 'Env key holding the OAuth client id.'
			},
			secret: {
				type: 'string',
				description: 'Env key holding the OAuth client secret.'
			},
			normalize: {
				type: 'function',
				description: 'Turns the raw token response into the stored credential shape.'
			}
		},
		description: 'OAuth2 configuration for the provider.'
	});

	addon.Field('base', {
		type: 'string',
		description: 'Base API url the actions call against.'
	});
});

import './schema.js';

export default connectProviders;
