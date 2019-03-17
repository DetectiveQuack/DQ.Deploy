# DQ.Deploy

## Slack slack command for deploying from bitbucket

### Required Environment Variables to be able to run slack bot

These need to be in a file called **_.env_** located in **_root_**

**Bitbucket variables**

-   USER = bibucket email address used to login
-   PASS = bibucket password used to login
-   USERNAME = bibucket username or team name

**App Specific variables**

-   CLIENT_REPO_NAME = client repository name
-   API_REPO_NAME = api repository name
-   PORT = Optional defaults to 4390
