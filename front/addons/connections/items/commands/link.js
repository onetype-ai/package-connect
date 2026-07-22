commands.Item({
    id: 'connect:link',
    description: 'Starts a connection: sends the browser to the authorize url for oauth2 providers, or stores the credentials directly for api_key providers.',
    metadata: { addon: 'connect.connections' },
    in: {
        provider: {
            type: 'string',
            required: true,
            description: 'Slug of the provider to connect.'
        },
        credentials: {
            type: 'object',
            description: 'Credentials to store, only for api_key providers.'
        }
    },
    out: {
        authorize: {
            type: 'string',
            description: 'URL the browser was sent to, for oauth2 providers.'
        }
    },
    callback: async function(properties, resolve)
    {
        const result = await connect.connections.Fn('link', properties.provider);

        if(result.code !== 200)
        {
            return resolve(null, result.message, result.code);
        }

        resolve({ authorize: result.data.authorize }, result.message);
    }
});
