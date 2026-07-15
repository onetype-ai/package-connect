import onetype from '@onetype/framework';
import connections from '#connect-back/connections/addon.js';

connections.Fn('decrypt', function(ciphertext)
{
	return onetype.Decrypt(ciphertext, process.env.CONNECT_KEY);
});
