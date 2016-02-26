var express = require('express');
var app = express();
var GitHubApi = require("github");

app.post('/tag', function (req, res) {
  if (process.env.APP_ACCESS_TOKEN === req.query.token) {
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
      owner: req.query.owner,
      repo: req.query.repo,
      tag_name: req.query.tag + '_' + new Date().toISOString().replace(/[:.]/g,'_'),
      target_commitish: req.query.commit
    }, function(err, response) {
      res.send(JSON.stringify(response));
    });
  } else {
    res.send(JSON.stringify("Nice try. But nope."));
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
