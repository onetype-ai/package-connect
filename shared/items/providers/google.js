import connectProviders from '#connect/providers/addon.js';

connectProviders.Item({
	slug: 'google',
	name: 'Google',
	description: 'Gmail, Calendar and Drive by Google.',
	icon: 'google',
	color: 'rgba(66, 133, 244, 1)',
	auth: 'oauth2',
	oauth2: {
		authorize: 'https://accounts.google.com/o/oauth2/v2/auth',
		token: 'https://oauth2.googleapis.com/token',
		scopes: 'https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar',
		id: 'GOOGLE_CLIENT_ID',
		secret: 'GOOGLE_CLIENT_SECRET',
		normalize: function(data)
		{
			return {
				access_token: data.access_token,
				refresh_token: data.refresh_token,
				token_type: data.token_type,
				expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
				scopes: data.scope,
				metadata: {}
			};
		}
	},
	base: 'https://www.googleapis.com'
});
