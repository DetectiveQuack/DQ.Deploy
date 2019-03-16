import express from 'express';
import { validate } from '../helpers/command-validator';
import { jsonResponse } from '../helpers/response';
import { DQRequest } from '../models/request';

const router = express.Router();

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
router.post('/command', (req, res, next) => validate(req as DQRequest, res, next), async function(req, res) {
    (req as DQRequest).responseUrl = req.body.response_url;

    const response = jsonResponse({ text: 'build initiated' });

    res.json(response);

    // Initiate build
});

module.exports = router;
