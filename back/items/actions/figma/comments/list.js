import connect from '#connect/addon.js';

connect.actions.Item({
    id: 'figma:comments:list',
    slug: 'figma:comments:list',
    provider: 'figma',
    name: 'List Comments',
    description: 'Read the comments of a design file.',
    input: {
        key: {
            type: 'string',
            required: true,
            description: 'File key from the figma.com url.'
        }
    },
    output: {
        comments: {
            type: 'array',
            each: {
                type: 'object'
            },
            description: 'Comments with their id, author, message, resolved state and timestamp.'
        }
    },
    execute: async function({ token, input, provider }, resolve)
    {
        const response = await fetch(provider.Get('base') + '/files/' + input.key + '/comments', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if(!response.ok)
        {
            throw onetype.Error(502, 'Figma rejected the read: ' + response.status);
        }

        const data = await response.json();

        resolve({
            comments: data.comments.map((comment) => ({
                id: comment.id,
                author: comment.user ? comment.user.handle : '',
                message: comment.message,
                resolved: !!comment.resolved_at,
                created: comment.created_at
            }))
        });
    }
});
