import onetype from '@onetype/framework';
import connections from '#connect-back/connections/addon.js';

connections.Fn('revoke', async function(id)
{
	const connection = await connections.Find().filter('id', id).filter('deleted_at', null, 'NULL').one();

	if(!connection)
	{
		throw onetype.Error(404, 'Connection :id: not found.', { id });
	}

	connection.Set('status', 'revoked');
	connection.Set('credentials', this.Fn('encrypt', {}));
	connection.Set('deleted_at', new Date().toISOString());

	await connection.Update();

	return true;
});
