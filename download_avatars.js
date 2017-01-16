var request = require('request');

console.log('Github Avatar Downloader App');

var GITHUB_USER = "vixdug";
var GITHUB_TOKEN = "****************"


function getRepoContributors(repoOwner, repoName, cb) {

 var requestURL = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

 var requestOptions = {
   url: requestURL,
   headers: {
     'User-Agent': 'Github Avatar Project'
   },
   bearer: GITHUB_TOKEN
 }

 var fs = require('fs');

 request.get(requestOptions)
        .on('error', function (err) {
          throw err;
        })
        .on('response', function (response) {
          console.log('Response Status Code: ', response.statusCode, response.statusMessage, response.headers['content-type']);

        })
        .pipe(fs.createWriteStream('./contributors.js'));
        console.log(requestURL);
}




getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
