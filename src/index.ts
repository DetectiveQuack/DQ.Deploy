// Import express and request modules
import express = require('express');
import { readdir } from 'fs';
import * as bodyParser from 'body-parser';
import { resolve } from 'path';

// Instantiates Express and assigns our app variable to it
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Again, we define a port we want to listen to
const PORT = 4390;

// Include all commands
readdir(resolve(__dirname, './commands'), (err, files) => {
    if (err) {
        throw new Error(err.toString());
    }

    files.forEach(f => {
        const file = resolve(__dirname, `./commands/${f.slice(0, -3)}`);
        const { default: route } = require(file); // eslint-disable-line @typescript-eslint/no-var-requires

        app.use('/', route);
    });
});

export default app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
});
