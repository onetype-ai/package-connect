import connect from '#connect/addon.js';

connect.connections.Fn('encrypt', function(data)
{
    return onetype.crypto.encrypt(data, process.env.CONNECT_KEY);
});
