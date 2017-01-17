require('dotenv').config()
var request = require('request');
var fs = require('fs');


repoOwner = process.argv[2]
repoName = process.argv[3]


console.log('Github Avatar Downloader App');

var GITHUB_USER = "vixdug";

var GITHUB_TOKEN = process.env.key


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
        //  console.log("This is the login:", login);
        //  console.log("This is the avatar_url:", url);
         downloadImageByURL(url, login)
       });
     }
   });
}


getRepoContributors(repoOwner, repoName, function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);

})


var mkdirSync = function () {
  try {
    fs.mkdirSync("avatars");
  } catch(e) {
    if (e.code != 'EEXIST') throw e;
  }
}();

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Response Status Code: ', response.statusCode);
         })
         .pipe(fs.createWriteStream('./avatars/'+filePath+'.jpg'));
}
