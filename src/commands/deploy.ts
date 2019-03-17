import express = require('express');
import { WebClient } from '@slack/client';
import SlackDialog from '../services/dialog';

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const router = express.Router();

router.post('/command', async function(req) {
    web.chat.postEphemeral({
        text: 'Retrieving branches...',
        channel: req.body.channel_id,
        user: req.body.user_id,
    });

    const elements = await SlackDialog.createElements();

    web.dialog.open({
        dialog: {
            title: 'Lets get deploying!!!',
            callback_id: 'build_deploy', // eslint-disable-line @typescript-eslint/camelcase
            elements,
            team: {
                id: req.body.team_id,
                domain: req.body.team_domain,
            },
            channel: {
                id: req.body.channel_id,
                name: req.body.channel_name,
            },
            user: {
                id: req.body.user_id,
                name: req.body.user_name,
            },
        },
        trigger_id: req.body.trigger_id, // eslint-disable-line @typescript-eslint/camelcase
    });
});

export default router;
