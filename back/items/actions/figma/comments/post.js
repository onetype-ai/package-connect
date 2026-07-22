import connect from '#connect/addon.js';

connect.actions.Item({
    id: 'figma:comments:post',
    slug: 'figma:comments:post',
    provider: 'figma',
    name: 'Post Comment',
    description: 'Post a comment on a design file, optionally pinned to a node.',
    input: {
        key: {
            type: 'string',
            required: true,
            description: 'File key from the figma.com url.'
        },
        message: {
            type: 'string',
            required: true,
            description: 'Comment text.'
        },
        node: {
            type: 'string',
            description: 'Node id to pin the comment to. Empty pins it to the canvas origin.'
        }
    },
    output: {
        id: {
            type: 'string',
            description: 'Id of the created comment.'
        }
    },
    execute: async function({ token, input, provider }, resolve)
    {
        const body = { message: input.message };

        if(input.node)
        {
            body.client_meta = { node_id: input.node, node_offset: { x: 0, y: 0 } };
        }

        const response = await fetch(provider.Get('base') + '/files/' + input.key + '/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify(body)
        });

        if(!response.ok)
        {
            throw onetype.Error(502, 'Figma rejected the comment: ' + response.status);
        }

        const data = await response.json();

        resolve({ id: data.id });
    }
});
