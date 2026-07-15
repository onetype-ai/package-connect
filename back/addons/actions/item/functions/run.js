import onetype from '@onetype/framework';
import actions from '#connect/actions/addon.js';
import connections from '#connect-back/connections/addon.js';
import providers from '#connect/providers/addon.js';

actions.Fn('item.run', async function(action, connection, input = {})
{
	const provider = providers.ItemGet(action.Get('provider'));

	if(!provider)
	{
		throw onetype.Error(404, 'Provider :provider: not found for action :action:.', { provider: action.Get('provider'), action: action.Get('slug') });
	}

	const schema = action.Get('input');
	const validated = schema && Object.keys(schema).length ? onetype.DataDefine(input, schema) : input;
	const token = await connections.Fn('token', connection);

	return new Promise((resolve) =>
	{
		const done = (data) =>
		{
			const output = action.Get('output');

			resolve(output && Object.keys(output).length ? onetype.DataDefine(data, output) : data);
		};

		action.Get('execute')({ token, input: validated, provider }, done);
	});
});
