import connect from '#connect/addon.js';

connect.providers.Fn('merge', function(item)
{
	const oauth2 = item.Get('oauth2');
	const separator = oauth2 && oauth2.separator ? oauth2.separator : ',';

	return item.Get('scopes').map((scope) => scope.name).join(separator);
});
