import onetype from '@onetype/framework';

onetype.AddonReady('connect', (connect) =>
{
	connect.actions = onetype.Addon('connect.actions', (addon) =>
	{
		addon.Field('id', {
			type: 'string',
			required: true,
			description: 'Unique id of the action, the same as its slug.'
		});

		addon.Field('slug', {
			type: 'string',
			required: true,
			description: 'Stable text key of the action, like slack:messages:send.'
		});

		addon.Field('provider', {
			type: 'string',
			required: true,
			description: 'Slug of the provider the action runs against.'
		});

		addon.Field('name', {
			type: 'string',
			required: true,
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

		addon.Field('execute', {
			type: 'function',
			description: 'Runs the action with a live token, validated input and the provider, then resolves the output.'
		});
	});
});

import './schema.js';
