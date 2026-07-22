onetype.AddonReady('developer.addons', (developer) =>
{
    developer.Item({
        id: 'connect.connections',
        group: 'connect',
        name: 'Connections',
        description: 'Authorized accounts of the instance: encrypted credentials, token refresh and the link and unlink lifecycle.',
        content: `
## What it does

A connection is one authorized account against a provider. Credentials store encrypted with the instance \`CONNECT_KEY\` and never leave the back — actions receive a live token that refreshes itself five minutes before it expires.

## Lifecycle

1. **Link** — \`$ot.connect.connections.link('slack')\` sends the browser to the provider authorize page; api_key providers store the key directly
2. **Callback** — the provider redirects back, the code exchanges for a token and the browser returns to the provider page
3. **Run** — actions execute against the active connection of their provider
4. **Unlink** — \`$ot.connect.connections.unlink(id)\` revokes the connection and clears its credentials

## Facade

\`\`\`js
await $ot.connect.connections.list();
await $ot.connect.connections.link('slack');
await $ot.connect.connections.unlink(1);
\`\`\`

## Requirements

The instance needs a \`CONNECT_KEY\` environment variable — a 32-byte hex key the credentials encrypt with. OAuth providers need the callback url \`/api/connect/callback\` registered in their app settings, over https.
        `
    });
});
