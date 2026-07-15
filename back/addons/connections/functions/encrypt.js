import onetype from '@onetype/framework';
import connections from '#connect-back/connections/addon.js';

connections.Fn('encrypt', function(data)
{
	return onetype.Encrypt(data, process.env.CONNECT_KEY);
});
