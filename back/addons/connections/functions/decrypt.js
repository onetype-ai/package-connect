import connect from '#connect/addon.js';

connect.connections.Fn('decrypt', function(ciphertext)
{
    return onetype.crypto.decrypt(ciphertext, process.env.CONNECT_KEY);
});
