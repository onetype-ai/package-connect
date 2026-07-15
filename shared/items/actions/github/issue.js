import onetype from '@onetype/framework';
import connectActions from '#connect/actions/addon.js';

connectActions.Item({
	id: 'github:issues:create',
	slug: 'github:issues:create',
	provider: 'github',
	name: 'Create Issue',
	description: 'Create a new issue in a GitHub repository.',
	input: {
		owner: {
			type: 'string',
			required: true,
			description: 'Repository owner.'
		},
		repo: {
			type: 'string',
			required: true,
			description: 'Repository name.'
		},
		title: {
			type: 'string',
			required: true,
			description: 'Issue title.'
		},
		body: {
			type: 'string',
			description: 'Issue body in markdown.'
		},
		labels: {
			type: 'array',
			value: [],
			each: {
				type: 'string',
				description: 'A label to attach.'
			},
			description: 'Labels to attach to the issue.'
		}
	},
	output: {
		number: {
			type: 'number',
			description: 'Number of the created issue.'
		},
		url: {
			type: 'string',
			description: 'Web url of the created issue.'
		}
	},
	execute: async function({ token, input, provider }, resolve)
	{
		const response = await fetch(provider.Get('base') + '/repos/' + input.owner + '/' + input.repo + '/issues', {
			method: 'POST',
			headers: { 'Accept': 'application/vnd.github+json', 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: input.title, body: input.body ? input.body : '', labels: input.labels })
		});

		if(!response.ok)
		{
			throw onetype.Error(502, 'GitHub rejected the issue.');
		}

		const data = await response.json();

		resolve({ number: data.number, url: data.html_url });
	}
});
