import onetype from '@onetype/framework';
import connections from '#connect-back/connections/addon.js';
import providers from '#connect/providers/addon.js';

connections.Fn('token', async function(id)
{
	const connection = await connections.Find().filter('id', id).filter('deleted_at', null, 'NULL').one();

	if(!connection)
	{
		throw onetype.Error(404, 'Connection :id: not found.', { id });
	}

	if(connection.Get('status') !== 'active')
	{
		throw onetype.Error(400, 'Connection :id: is not active.', { id });
	}

	const provider = providers.ItemGet(connection.Get('provider'));
	const credentials = this.Fn('decrypt', connection.Get('credentials'));

	if(provider.Get('auth') === 'api_key')
	{
		return credentials.token;
	}

	const expires = connection.Get('expires_at');

	if(expires && new Date(expires).getTime() - 5 * 60 * 1000 < Date.now())
	{
		const refreshed = await this.Fn('refresh', connection);

		return refreshed.access_token;
	}

	return credentials.access_token;
});
