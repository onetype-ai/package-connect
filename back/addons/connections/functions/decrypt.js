import onetype from '@onetype/framework';
import connect from '#connect/addon.js';

connect.connections.Fn('decrypt', function(ciphertext)
{
	return onetype.Decrypt(ciphertext, process.env.CONNECT_KEY);
});
