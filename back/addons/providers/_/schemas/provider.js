onetype.SchemasRegister('connect.provider', {
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
    tags: {
        type: 'array',
        each: { type: 'string' },
        description: 'Category tags shown on the provider card and page.'
    },
    overview: {
        type: 'string',
        description: 'Markdown overview shown on the provider page.'
    },
    logo: {
        type: 'string',
        description: 'Url of the provider logo image.'
    },
    scopes: {
        type: 'array',
        each: {
            type: 'object',
            config: {
                name: {
                    type: 'string',
                    description: 'Scope name the provider understands.'
                },
                description: {
                    type: 'string',
                    description: 'What the scope allows.'
                }
            }
        },
        description: 'OAuth scopes the provider requests when connecting, with what each one is for.'
    },
    vault: {
        type: 'array',
        each: {
            type: 'string'
        },
        description: 'Vault key names the provider needs before it can connect.'
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
