import commands from '@onetype/framework/commands';
import connect from '#connect/addon.js';

commands.Item({
    id: 'connect:providers:many',
    exposed: true,
    method: 'GET',
    endpoint: '/api/connect/providers',
    description: 'Lists every provider in the catalog.',
    metadata: { addon: 'connect.providers' },
    condition: function()
    {
        if(!this.http || !this.http.state.user)
        {
            return 'Sign in to browse the catalog.';
        }
    },
    in: {},
    out: {
        providers: {
            type: 'array',
            each: {
                type: 'object',
                config: 'connect.provider'
            },
            description: 'The provider catalog.'
        }
    },
    callback: function(properties, resolve)
    {
        resolve({ providers: Object.values(connect.providers.Items()).map((item) => item.Get(['slug', 'name', 'description', 'overview', 'tags', 'scopes', 'vault', 'logo', 'icon', 'color', 'auth'])) });
    }
});
