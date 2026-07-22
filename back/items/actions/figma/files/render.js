import connect from '#connect/addon.js';

connect.actions.Item({
    id: 'figma:files:render',
    slug: 'figma:files:render',
    provider: 'figma',
    name: 'Render Images',
    description: 'Render nodes of a design file to images, so anything can see the design.',
    input: {
        key: {
            type: 'string',
            required: true,
            description: 'File key from the figma.com url.'
        },
        ids: {
            type: 'array',
            required: true,
            each: {
                type: 'string'
            },
            description: 'Node ids to render, like 1:2.'
        },
        format: {
            type: 'string',
            value: 'png',
            options: ['png', 'svg', 'jpg', 'pdf'],
            description: 'Image format.'
        },
        scale: {
            type: 'number',
            value: 1,
            description: 'Render scale between 0.01 and 4.'
        }
    },
    output: {
        images: {
            type: 'object',
            description: 'Image urls keyed by node id, valid for 30 days.'
        }
    },
    execute: async function({ token, input, provider }, resolve)
    {
        const query = new URLSearchParams({ ids: input.ids.join(','), format: input.format, scale: String(input.scale) });

        const response = await fetch(provider.Get('base') + '/images/' + input.key + '?' + query, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if(!response.ok)
        {
            throw onetype.Error(502, 'Figma rejected the render: ' + response.status);
        }

        const data = await response.json();

        if(data.err)
        {
            throw onetype.Error(502, String(data.err));
        }

        resolve({ images: data.images });
    }
});
