elements.ItemAdd({
	id: 'connect-providers',
	icon: 'grid_view',
	name: 'Connect Providers',
	description: 'Grid of every available provider with its accent, description and a connect action that starts the OAuth flow.',
	category: 'Connect',
	collection: 'Home',
	author: 'OneType',
	metadata: { addon: 'connect' },
	config: {},
	render: function()
	{
		this.providers = [];
		this.linked = {};
		this.stored = {};
		this.tag = 'all';

		this.load = async () =>
		{
			this.providers = $ot.connect.providers();

			const keys = await $ot.vault.list();
			const stored = {};

			for(const key of keys)
			{
				stored[key.key] = key.filled;
			}

			this.stored = stored;

			const connections = await $ot.connect.connections();
			const linked = {};

			for(const connection of connections)
			{
				linked[connection.Get('provider')] = connection.Get(['id', 'status', 'metadata']);
			}

			this.linked = linked;
		};

		this.state = (provider) =>
		{
			const connection = this.linked[provider.slug];

			if(connection)
			{
				return connection.metadata && connection.metadata.name ? 'Connected as ' + connection.metadata.name : 'Connected';
			}

			return provider.vault.every((key) => this.stored[key]) ? 'Ready to connect' : 'Setup needed';
		};

		this.filters = () =>
		{
			const counts = {};

			this.providers.forEach((provider) => provider.tags.forEach((tag) => counts[tag] = (counts[tag] || 0) + 1));

			return [
				{ id: 'all', label: 'All', count: this.providers.length },
				...Object.entries(counts).map(([tag, count]) => ({ id: tag, label: tag, count }))
			];
		};

		this.filter = ({ value }) => this.tag = value;

		this.filtered = () =>
		{
			return this.tag === 'all' ? this.providers : this.providers.filter((provider) => provider.tags.includes(this.tag));
		};

		this.open = (provider) =>
		{
			$ot.ui.screens.open('connect.provider', { slug: provider.slug });
		};

		this.OnReady(() => this.load());

		return /* html */ `
			<div class="ot-flex-vertical ot-gap-m ot-container-m ot-py-l">
				<e-global-heading title="Providers" description="Connect an external service to run its actions from anywhere in the platform." :border="true"></e-global-heading>
				<e-global-tags :items="filters()" :active="tag" :background="3" :_change="filter"></e-global-tags>
				<div class="ot-grid-auto-m">
					<e-cards-extension
						ot-for="provider in filtered()"
						:ot-key="provider.slug"
						:icon="provider.icon"
						:image="provider.logo"
						:accent="provider.color"
						eyebrow="Provider"
						:title="provider.name"
						:description="provider.description"
						:badge="linked[provider.slug] ? 'Connected' : ''"
						:isActive="!!linked[provider.slug]"
						:tags="[...provider.tags, provider.auth === 'oauth2' ? 'OAuth' : 'API key']"
						:meta="[$ot.connect.actions(provider.slug).length + ($ot.connect.actions(provider.slug).length === 1 ? ' action' : ' actions'), state(provider)]"
						action="Open"
						:_click="() => open(provider)"
					></e-cards-extension>
				</div>
			</div>
		`;
	}
});
