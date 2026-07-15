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
		this.loading = true;

		this.load = async () =>
		{
			this.providers = $ot.connect.providers();

			const connections = await $ot.connect.connections();
			const linked = {};

			for(const connection of connections)
			{
				linked[connection.Get('provider')] = connection.Get(['id', 'status', 'metadata']);
			}

			this.linked = linked;
			this.loading = false;
		};

		this.connect = (provider) =>
		{
			$ot.connect.link(provider.slug);
		};

		this.disconnect = async (provider) =>
		{
			const ok = await $ot.float.confirm('Disconnect ' + provider.name + '?', { icon: 'link_off', confirm: 'Disconnect', danger: true });

			if(ok)
			{
				await $ot.connect.unlink(this.linked[provider.slug].id);
				await this.load();
			}
		};

		this.OnReady(() => this.load());

		return `
			<div class="box">
				<div class="head">
					<h1>Providers</h1>
					<p>Connect an external service to run its actions from anywhere in the platform.</p>
				</div>

				<div ot-if="loading" class="loading"><i class="spin">progress_activity</i></div>

				<div ot-if="!loading" class="grid">
					<div
						ot-for="provider in providers"
						:ot-key="provider.slug"
						:class="linked[provider.slug] ? 'card linked' : 'card'"
						:style="'--accent: ' + provider.color"
					>
						<div class="top">
							<span class="logo"><i>{{ provider.icon }}</i></span>
							<span ot-if="linked[provider.slug]" class="badge"><i>check_circle</i>Connected</span>
						</div>
						<div class="body">
							<span class="name">{{ provider.name }}</span>
							<span class="description">{{ provider.description }}</span>
						</div>
						<div class="foot">
							<e-form-button
								ot-if="!linked[provider.slug]"
								text="Connect"
								icon="add_link"
								tone="solid"
								:stretch="true"
								:_click="() => connect(provider)"
							></e-form-button>
							<e-form-button
								ot-if="linked[provider.slug]"
								text="Disconnect"
								icon="link_off"
								color="red"
								tone="soft"
								:stretch="true"
								:_click="() => disconnect(provider)"
							></e-form-button>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
