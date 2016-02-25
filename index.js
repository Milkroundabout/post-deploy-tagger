var express = require('express');
var app = express();
var GitHubApi = require("github");

app.get('/', function (req, res) {
  if (process.env.APP_ACCESS_TOKEN === req.params.token) {
    var github = new GitHubApi({
      // required 
      version: "3.0.0",
      // optional 
      debug: true,
      protocol: "https",
      host: "api.github.com", // should be api.github.com for GitHub 
      pathPrefix: "", // for some GHEs; none for GitHub 
      timeout: 5000,
      headers: {
          "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent 
      }
    });
    github.authenticate({
      type: "oauth",
      token: process.env.GITHUB_ACCESS_TOKEN
    });
    github.releases.createRelease({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      tag_name: "TestTag",
      target_commitish: "3d9e9c311e55e0d7fab567ee4751ea9d02b31d56"
    }, function(err, response) {
      res.send(JSON.stringify(response));
    });
  } else {
    res.send(JSON.stringify("Nice try. But nope."));
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
