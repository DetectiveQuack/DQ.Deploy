# DQ.Deploy

## Slack slack command for deploying from bitbucket

### Required Environment Variables to be able to run slack bot

These need to be in a file called **_.env_** located in **_root_**

**Bitbucket variables**

-   GIT_USER = bibucket email address used to login
-   GIT_PASS = bibucket password used to login
-   GIT_USERNAME = bibucket username or team name
-   GIT_CLIENT_REPO_NAME = client repository name
-   GIT_API_REPO_NAME = api repository name

**Slack variables**

-   SLACK_TOKEN = slack oauth token starting with xoxp

**App Specific variables**

-   PORT = Optional defaults to 4390
