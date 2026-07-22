onetype.AddonReady('ui.apps', (apps) =>
{
    apps.Item({
        id: 'connect',
        name: 'Connect',
        icon: 'link',
        color: 'rgba(56, 189, 248, 1)',
        description: 'Connect external providers like Slack, GitHub and Google, then run their actions from anywhere in the platform.',
        order: 3
    });
});
