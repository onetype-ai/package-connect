import connect from '#connect/addon.js';

connect.actions.Item({
    id: 'figma:files:get',
    slug: 'figma:files:get',
    provider: 'figma',
    name: 'Get File',
    description: 'Read the node tree of a design file, with the depth controlling how far it unfolds.',
    input: {
        key: {
            type: 'string',
            required: true,
            description: 'File key from the figma.com url.'
        },
        depth: {
            type: 'number',
            description: 'How many levels of the tree to return. Empty returns the whole document.'
        }
    },
    output: {
        name: {
            type: 'string',
            description: 'File name.'
        },
        version: {
            type: 'string',
            description: 'Current version id of the file.'
        },
        modified: {
            type: 'string',
            description: 'Timestamp of the last modification.'
        },
        document: {
            type: 'object',
            description: 'The node tree of the document.'
        }
    },
    execute: async function({ token, input, provider }, resolve)
    {
        const query = input.depth ? '?depth=' + input.depth : '';

        const response = await fetch(provider.Get('base') + '/files/' + input.key + query, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if(!response.ok)
        {
            throw onetype.Error(502, 'Figma rejected the read: ' + response.status);
        }

        const data = await response.json();

        resolve({ name: data.name, version: data.version, modified: data.lastModified, document: data.document });
    }
});
