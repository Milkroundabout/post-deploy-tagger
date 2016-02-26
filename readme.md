# Post Deploy Git Tagger

Consumes webhooks, creates git tags on github. 

## Setup

You'll need two env variables:

- `GITHUB_ACCESS_TOKEN` - A personal access token from github, which has permissions to tag on the repos you're going to target.
- `APP_ACCESS_TOKEN` - A token to verify the requests you send to this app.

## How to use

When this is up and running send requests to `/tag` with the following parameters:

- `token` - The `APP_ACCESS_TOKEN` from above
- `owner` - The owner of the git repo on github
- `repo` - The name of the repo on github
- `commit` - The 40 character sha of the commit you want to tag
- `tag` - The tag string you want to use. This will be appended with the timestamp of the tag
