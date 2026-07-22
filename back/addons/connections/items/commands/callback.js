import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
    id: 'connect:callback',
    exposed: true,
    method: 'GET',
    endpoint: '/api/connect/callback',
    description: 'OAuth redirect target. Exchanges the authorization code for a token, saves the connection and sends the browser back to the provider page.',
    metadata: { addon: 'connect.connections' },
    in: {
        code: {
            type: 'string',
            required: true,
            description: 'Authorization code returned by the provider.'
        },
        state: {
            type: 'string',
            required: true,
            description: 'State parameter carrying the provider slug and a nonce.'
        }
    },
    out: {
        connection: {
            type: 'object',
            config: 'connect.connection',
            description: 'The created connection.'
        }
    },
    callback: async function(properties, resolve)
    {
        const redirect = (location) =>
        {
            this.http.response.writeHead(302, { Location: location });
            this.http.response.end();
        };

        try
        {
            const connection = await connect.connections.Fn('callback', properties.code, properties.state);

            redirect('/connect/providers/' + connection.Get('provider'));

            resolve({ connection: connection.Get(['id', 'provider', 'status', 'scopes', 'metadata', 'expires_at', 'created_at']) }, 'Connection linked.');
        }
        catch(error)
        {
            redirect('/connect/providers');

            resolve(null, error.message, typeof error.code === 'number' ? error.code : 500);
        }
    }
});
