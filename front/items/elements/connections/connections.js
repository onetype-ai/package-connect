elements.ItemAdd({
	id: 'connect-connections',
	icon: 'lan',
	name: 'Connect Connections',
	description: 'List of the active connections of the instance, each with its provider, connected account, status and a revoke action.',
	category: 'Connect',
	collection: 'Home',
	author: 'OneType',
	metadata: { addon: 'connect' },
	config: {},
	render: function()
	{
		this.rows = [];
		this.loading = true;

		this.provider = (slug) =>
		{
			const item = connectProviders.ItemGet(slug);

			return item ? item.Get(['name', 'icon', 'color']) : { name: slug, icon: 'link', color: 'var(--ot-text-3)' };
		};

		this.load = async () =>
		{
			const connections = await $ot.connect.connections();

			this.rows = connections.map((item) =>
			{
				const provider = this.provider(item.Get('provider'));
				const metadata = item.Get('metadata');

				return {
					id: item.Get('id'),
					provider: item.Get('provider'),
					name: provider.name,
					icon: provider.icon,
					color: provider.color,
					status: item.Get('status'),
					account: metadata && metadata.name ? metadata.name : '',
					created: item.Get('created_at')
				};
			});

			this.loading = false;
		};

		this.disconnect = async (row) =>
		{
			const ok = await $ot.float.confirm('Revoke the ' + row.name + ' connection?', { icon: 'link_off', confirm: 'Revoke', danger: true });

			if(ok)
			{
				await $ot.connect.unlink(row.id);
				await this.load();
			}
		};

		this.OnReady(() => this.load());

		return `
			<div class="box">
				<div class="head">
					<h1>Connections</h1>
					<p>Every provider this instance has authorized.</p>
				</div>

				<div ot-if="loading" class="loading"><i class="spin">progress_activity</i></div>

				<e-status-empty
					ot-if="!loading && !rows.length"
					icon="link_off"
					title="No connections yet"
					description="Head to Providers to connect your first service."
				></e-status-empty>

				<div ot-if="!loading && rows.length" class="list">
					<div ot-for="row in rows" :ot-key="row.id" class="row" :style="'--accent: ' + row.color">
						<span class="logo"><i>{{ row.icon }}</i></span>
						<span class="main">
							<span class="name">{{ row.name }}</span>
							<span ot-if="row.account" class="account">{{ row.account }}</span>
						</span>
						<span :class="'status ' + row.status">{{ row.status }}</span>
						<e-form-button icon="link_off" tone="ghost" color="red" :_click="() => disconnect(row)"></e-form-button>
					</div>
				</div>
			</div>
		`;
	}
});
