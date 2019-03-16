// Import express and request modules
import express from 'express';
import { readdir } from 'fs';
import bodyParser from 'body-parser';

// Instantiates Express and assigns our app variable to it
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Again, we define a port we want to listen to
const PORT = 4390;

// Lets start our server
app.listen(process.env.PORT || PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log('Example app listening on port ' + PORT);
});

// Include all commands
readdir('./src/commands', (err, files) => {
    if (err) {
        throw new Error(err.toString());
    }

    files.forEach(f => app.use('/', require(`./src/commands/${f.slice(0, -3)}`)));
});
