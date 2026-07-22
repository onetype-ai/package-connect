onetype.AddonReady('connect', (connect) =>
{
    connect.actions.Fn('run', async function(action, input = {}, connection = null)
    {
        const properties = connection ? { action, input, connection } : { action, input };
        const { data, message, code } = await $ot.command('connect:run', properties, true);

        if(code !== 200)
        {
            throw onetype.Error(code, message);
        }

        return data.result;
    });
});
