// Import express and request modules
import express = require('express');
import * as bodyParser from 'body-parser';
import { readdir } from 'fs';
import { resolve } from 'path';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Instantiates Express and assigns our app variable to it
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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

// Again, we define a port we want to listen to
const PORT = 4390;

export default app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
});
