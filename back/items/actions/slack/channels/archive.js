import connect from '#connect/addon.js';

connect.actions.Item({
    id: 'slack:channels:archive',
    slug: 'slack:channels:archive',
    provider: 'slack',
    name: 'Archive Channel',
    description: 'Archive a channel the app is in.',
    input: {
        channel: {
            type: 'string',
            required: true,
            description: 'Channel id to archive.'
        }
    },
    output: {
        ok: {
            type: 'boolean',
            description: 'Whether Slack archived the channel.'
        }
    },
    execute: async function({ token, input, provider }, resolve)
    {
        const response = await fetch(provider.Get('base') + '/conversations.archive', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ channel: input.channel })
        });

        const data = await response.json();

        if(!data.ok)
        {
            throw onetype.Error(502, data.error ? data.error : 'Slack rejected the archive.');
        }

        resolve({ ok: data.ok });
    }
});
