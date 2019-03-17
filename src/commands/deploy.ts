import express = require('express');
import parseCommand from '../helpers/command-parser';
import validate from '../helpers/command-validator';
import jsonResponse from '../helpers/response';
import makeSlackResponse from '../helpers/response-request';
import DQRequest from '../models/request';

const router = express.Router();

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
router.post('/command', parseCommand, async function(req) {
    const responseUrl = req.body.response_url;
    const validatedBranches = await validate((req as DQRequest).commands);

    if (validatedBranches.error) {
        const body = jsonResponse({ text: validatedBranches.error });
        return await makeSlackResponse(responseUrl, body);
    }

    const body = jsonResponse({ text: 'Hooray!! Built and deployed to https://example.com' });
    await makeSlackResponse(responseUrl, body);
});

export default router;
