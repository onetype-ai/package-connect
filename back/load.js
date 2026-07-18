import connect from '#connect/addon.js';

/* Addons */
import '#connect/addons/providers/addon.js';
import '#connect/addons/actions/addon.js';
import '#connect/addons/connections/addon.js';

import '#connect/addons/connections/functions/encrypt.js';
import '#connect/addons/connections/functions/decrypt.js';
import '#connect/addons/connections/functions/token.js';
import '#connect/addons/connections/functions/refresh.js';
import '#connect/addons/connections/functions/callback.js';
import '#connect/addons/connections/functions/revoke.js';

import '#connect/addons/actions/item/functions/run.js';

/* Providers */
import '#connect/items/providers/slack.js';
import '#connect/items/providers/github.js';
import '#connect/items/providers/google.js';

/* Actions */
import '#connect/items/actions/slack/send.js';
import '#connect/items/actions/github/issue.js';

/* Vault */
import '#connect/items/categories/connect.js';
import '#connect/items/vault/connect.js';
import '#connect/items/vault/slack.js';
import '#connect/items/vault/github.js';
import '#connect/items/vault/google.js';

/* Commands */
import '#connect/items/commands/link.js';
import '#connect/items/commands/callback.js';
import '#connect/items/commands/list.js';
import '#connect/items/commands/unlink.js';
import '#connect/items/commands/providers.js';
import '#connect/items/commands/actions.js';
import '#connect/items/commands/run.js';

export default connect;
