onetype.SchemasRegister('connect.action', {
    slug: {
        type: 'string',
        description: 'Stable text key of the action, like slack:messages:send.'
    },
    provider: {
        type: 'string',
        description: 'Slug of the provider the action runs against.'
    },
    name: {
        type: 'string',
        description: 'Action name shown in the catalog.'
    },
    description: {
        type: 'string',
        description: 'Short one line description of what the action does.'
    },
    input: {
        type: 'object',
        description: 'Typed schema of the parameters the action accepts.'
    },
    output: {
        type: 'object',
        description: 'Typed schema of the data the action returns.'
    }
});
