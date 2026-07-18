elements.ItemAdd({
	id: 'connect-provider',
	icon: 'hub',
	name: 'Connect Provider',
	description: 'Single provider page: header with the connect action, a section sidebar, overview, the setup state of its vault keys and the catalog of actions it offers.',
	category: 'Connect',
	collection: 'Home',
	author: 'OneType',
	metadata: { addon: 'connect' },
	config: {
		slug: {
			type: 'string',
			description: 'Slug of the provider the page shows.'
		}
	},
	render: function()
	{
		this.provider = null;
		this.connection = null;
		this.connections = [];
		this.actions = [];
		this.keys = [];
		this.section = 'overview';

		this.load = async () =>
		{
			const item = $ot.connect.providers.get(this.slug);

			if(!item)
			{
				return;
			}

			this.provider = item.Get(['slug', 'name', 'description', 'overview', 'tags', 'logo', 'icon', 'color', 'auth', 'vault']);
			this.actions = $ot.connect.actions.list(this.slug);

			const wanted = this.provider.vault;
			this.keys = (await $ot.vault.list()).filter((key) => wanted.includes(key.key));

			const connections = await $ot.connect.connections.list();

			this.connections = connections
				.filter((entry) => entry.Get('provider') === this.slug)
				.map((entry) => entry.Get(['id', 'status', 'scopes', 'metadata', 'created_at']));

			const active = this.connections.find((entry) => entry.status === 'active');

			this.connection = active || null;
		};

		this.ready = () => this.keys.every((key) => key.filled);

		this.sections = () => [
			{ id: 'overview', label: 'Overview', icon: 'info' },
			{ id: 'credentials', label: 'Credentials', icon: 'key', hint: this.keys.filter((key) => key.filled).length + ' of ' + this.keys.length + ' stored' },
			{ id: 'actions', label: 'Actions', icon: 'bolt', hint: this.actions.length + (this.actions.length === 1 ? ' action' : ' actions') },
			{ id: 'connection', label: 'Connection', icon: 'lan', hint: this.connection ? 'active' : 'none' }
		];

		this.jump = ({ value }) =>
		{
			this.section = value.id;

			const target = this.Element.querySelector('[data-section="' + value.id + '"]');

			target && target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		};

		this.credentials = () =>
		{
			return this.keys.map((key) => ({
				name: key.key,
				type: key.filled ? 'stored' : 'empty',
				required: true,
				description: key.name + (key.filled ? '' : ' — fill it in through the vault.')
			}));
		};

		this.fields = () => [
			{ key: 'account', label: 'Account', type: 'text', width: '1.5fr' },
			{ key: 'status', label: 'Status', type: 'status', width: '140px' },
			{ key: 'scopes', label: 'Scopes', type: 'text', width: '2fr' },
			{ key: 'created', label: 'Connected', type: 'date', align: 'right' }
		];

		this.rows = () =>
		{
			return this.connections.map((entry) => ({
				id: entry.id,
				account: entry.metadata && entry.metadata.name ? entry.metadata.name : (entry.metadata && entry.metadata.account ? entry.metadata.account : '—'),
				status: { label: entry.status, color: entry.status === 'active' ? 'green' : 'orange' },
				scopes: entry.scopes || '—',
				created: new Date(entry.created_at).toLocaleDateString()
			}));
		};

		this.crumbs = () => [
			{ label: 'Connect', icon: 'hub', onClick: () => $ot.ui.apps.open('connect') },
			{ label: 'Providers', onClick: () => $ot.ui.screens.open('connect.providers') },
			{ label: this.provider.name }
		];

		this.parameters = (schema) =>
		{
			return Object.entries(schema || {}).map(([name, config]) => ({ name, ...config }));
		};

		this.connect = () => $ot.connect.connections.link(this.slug);

		this.disconnect = async () =>
		{
			const ok = await $ot.float.confirm('Disconnect ' + this.provider.name + '?', { icon: 'link_off', confirm: 'Disconnect', danger: true });

			if(ok)
			{
				await $ot.connect.connections.unlink(this.connection.id);
				await this.load();
			}
		};

		this.OnReady(() => this.load());

		return /* html */ `
			<div ot-if="provider" class="box">
				<e-global-header
					:icon="provider.icon"
					:image="provider.logo"
					:accent="provider.color"
					eyebrow="Provider"
					:title="provider.name"
					:description="provider.description"
					:badge="connection ? 'Connected' : ''"
					:meta="[provider.auth === 'oauth2' ? 'OAuth' : 'API key', actions.length + (actions.length === 1 ? ' action' : ' actions')]"
					:background="1"
					container="m"
					pattern="dots"
				>
					<div slot="top">
						<e-navigation-breadcrumbs :items="crumbs()"></e-navigation-breadcrumbs>
					</div>
					<div slot="actions">
						<e-form-button ot-if="!connection" text="Connect" icon="add_link" tone="solid" :disabled="!ready()" :_click="() => connect()"></e-form-button>
						<e-form-button ot-if="connection" text="Disconnect" icon="link_off" color="red" tone="soft" :_click="() => disconnect()"></e-form-button>
					</div>
					<div slot="bottom" class="ot-flex-vertical ot-gap-s">
						<e-global-tags :items="provider.tags.map((tag) => ({ id: tag, label: tag }))" :background="3"></e-global-tags>
						<e-global-notice ot-if="!ready()" title="Setup required" text="Fill in the missing credentials in the vault before connecting." color="orange"></e-global-notice>
					</div>
				</e-global-header>

				<div class="columns ot-container-m ot-py-l">
					<aside class="side">
						<e-views-sidebar :items="sections()" :active="section" :_select="jump"></e-views-sidebar>
					</aside>

					<div class="content">
						<div class="block" data-section="overview">
							<e-global-markdown ot-if="provider.overview" :content="provider.overview" :background="0"></e-global-markdown>
						</div>

						<div class="block" data-section="credentials">
							<e-global-heading title="Credentials" description="Keys this provider reads from the vault." element="h3" :border="true">
								<div slot="right">
									<e-form-button text="Open Vault" icon="lock" tone="soft" :_click="() => $ot.ui.apps.open('vault')"></e-form-button>
								</div>
							</e-global-heading>
							<e-global-parameters ot-if="keys.length" :items="credentials()" :background="1"></e-global-parameters>
							<e-status-empty ot-if="!keys.length" icon="key" title="No credentials" description="This provider does not read any keys from the vault."></e-status-empty>
						</div>

						<div class="block" data-section="actions">
							<e-global-heading title="Actions" description="What this provider can do once connected." element="h3" :border="true"></e-global-heading>
							<e-status-empty ot-if="!actions.length" icon="bolt" title="No actions" description="This provider does not register any actions yet."></e-status-empty>
							<div ot-for="action in actions" :ot-key="action.slug">
								<e-core-section :title="action.name" :description="action.description" icon="bolt" :collapsible="true" :collapsed="true">
									<div slot="content" class="ot-flex-vertical ot-gap-m">
										<div ot-if="parameters(action.input).length" class="ot-flex-vertical ot-gap-s">
											<e-global-heading title="Input" element="h3"></e-global-heading>
											<e-global-parameters :items="parameters(action.input)" :background="2"></e-global-parameters>
										</div>
										<div ot-if="parameters(action.output).length" class="ot-flex-vertical ot-gap-s">
											<e-global-heading title="Output" element="h3"></e-global-heading>
											<e-global-parameters :items="parameters(action.output)" :background="2"></e-global-parameters>
										</div>
									</div>
								</e-core-section>
							</div>
						</div>

						<div class="block" data-section="connection">
							<e-global-heading title="Connection" description="How this instance is linked to the provider." element="h3" :border="true"></e-global-heading>
							<e-views-table ot-if="connections.length" :fields="fields()" :items="rows()" :background="1"></e-views-table>
							<e-status-empty ot-if="!connections.length" icon="link_off" title="Not connected" description="Connect the provider to start running its actions."></e-status-empty>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
