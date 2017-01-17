var request = require('request');
var fs = require('fs');

console.log('Github Avatar Downloader App');

var GITHUB_USER = "vixdug";
var GITHUB_TOKEN = "1f9205487148b285508f6bc7f6e5aa2642dd4ef9"


function getRepoContributors(repoOwner, repoName, cb) {

 var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN +  '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

 var requestOptions = {
   url: requestURL,
   headers: {
     'User-Agent': 'Github Avatar Project'
   },
 }

 request(requestOptions, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       var parsed = JSON.parse(body);
       parsed.forEach(function(value, index){
         var login = value.login;
         var url = value.avatar_url;
         console.log("This is the login:", login);
         console.log("This is the avatar_url:", url);
       });
     }
   });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
})

//         .on('error', function (err) {
//           throw err;
//           error = err;
//
//         })
//         .on('response', function (response) {
//
//         })
//         .on('end', function () {
//         cb(error, result);
//         console.log('the end of request');
//           })
//
//         .pipe(fs.createWriteStream('./contributors'));
