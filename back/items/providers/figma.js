import connect from '#connect/addon.js';

connect.providers.Item({
	id: 'figma',
	slug: 'figma',
	name: 'Figma',
	description: 'Design files, components and comments.',
	tags: ['Design', 'Collaboration'],
	overview: `
## What it does

Figma connects the instance to your design files: read the full node tree of any file, render frames to images, browse components and variables, and post comments back — the raw material for design to code pipelines and agents that can see what they build.

## Getting credentials

Create an app at [figma.com/developers/apps](https://www.figma.com/developers/apps), copy the Client ID and Client Secret into the vault, and register the redirect url of this instance in the app before connecting.
	`,
	logo: 'https://cdn.simpleicons.org/figma',
	icon: 'design_services',
	color: 'rgba(162, 89, 255, 1)',
	vault: ['FIGMA_CLIENT_ID', 'FIGMA_CLIENT_SECRET'],
	auth: 'oauth2',
	oauth2: {
		authorize: 'https://www.figma.com/oauth',
		token: 'https://api.figma.com/v1/oauth/token',
		refresh: 'https://api.figma.com/v1/oauth/refresh',
		exchange: 'basic',
		scopes: 'file_content:read,file_metadata:read,file_comments:read,file_comments:write,library_content:read,current_user:read',
		id: 'FIGMA_CLIENT_ID',
		secret: 'FIGMA_CLIENT_SECRET',
		normalize: function(data)
		{
			return {
				access_token: data.access_token,
				refresh_token: data.refresh_token ? data.refresh_token : null,
				token_type: 'Bearer',
				expires_at: data.expires_in ? new Date(Date.now() + data.expires_in * 1000).toISOString() : null,
				scopes: null,
				metadata: { account: data.user_id ? String(data.user_id) : null }
			};
		}
	},
	base: 'https://api.figma.com/v1'
});
