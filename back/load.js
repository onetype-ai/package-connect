import connect from '#connect/addon.js';

/* Addons */
import '#connect/addons/providers/load.js';
import '#connect/addons/actions/load.js';
import '#connect/addons/connections/load.js';

/* Providers */
import '#connect/items/providers/slack.js';
import '#connect/items/providers/github.js';
import '#connect/items/providers/google.js';
import '#connect/items/providers/figma.js';

/* Actions */
import '#connect/items/actions/slack/messages/send.js';
import '#connect/items/actions/slack/messages/update.js';
import '#connect/items/actions/slack/messages/delete.js';
import '#connect/items/actions/slack/messages/schedule.js';
import '#connect/items/actions/slack/channels/list.js';
import '#connect/items/actions/slack/channels/join.js';
import '#connect/items/actions/slack/channels/info.js';
import '#connect/items/actions/slack/channels/create.js';
import '#connect/items/actions/slack/channels/invite.js';
import '#connect/items/actions/slack/channels/archive.js';
import '#connect/items/actions/slack/channels/topic.js';
import '#connect/items/actions/github/issue.js';
import '#connect/items/actions/figma/files/get.js';
import '#connect/items/actions/figma/files/nodes.js';
import '#connect/items/actions/figma/files/render.js';
import '#connect/items/actions/figma/comments/list.js';
import '#connect/items/actions/figma/comments/post.js';

/* Vault */
import '#connect/items/categories/connect.js';
import '#connect/items/vault/connect.js';
import '#connect/items/vault/slack.js';
import '#connect/items/vault/github.js';
import '#connect/items/vault/google.js';
import '#connect/items/vault/figma.js';

export default connect;
