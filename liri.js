var keys = require('./keys.js');
var request = require('request');

var twitter = require('twitter');
var client = new twitter(keys.twitterKeys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: 'fa2cd1357b544c70bb45cc07a2c8d168',
  secret: '81c3fb2726a247439132429abb1abf16'
});

var fs = require('fs');
var command=process.argv[2];

var input="";
for (var i=3; i<process.argv.length; i++){

	if(i<process.argv.length&&i>3){
		  input+=' ';
	}
	  input+=process.argv[i]
}

//console.log(input);

if (command==="my-tweets"){
	  var screenName = {screen_name: 'VairyAwesome'};
	  client.get('statuses/user_timeline', screenName, function(err, data){
	    if(err){
	    	console.log(err);	      
	    }
	    else{	      
	    	  console.log(data);
		    }
	    
	  });
}

else if (command==="spotify-this-song"){

	spotify.search({ type: 'track', query: input}, function(err, data){
	    if(err){
	    	console.log('Error occurred.');
	    }

	    else{
	     console.log(JSON.stringify(data.artist));
		} 
	});	
}

else if(command==="movie-this"){
	var omdbURL = 'http://www.omdbapi.com/?t=' + input + '&plot=short&tomatoes=true';

	  request(omdbURL, function (err, data){
	    if(err){
	      console.log(err);
	    } 
	    else{
	     console.log(data);
	    }
	  
	  });

}

else if(command==="do-what-it-says"){
	var fs = require("fs");
		fs.readFile("./random.txt", function(err, text){
			if(err){
				console.log(err);
			}
			else{
			    console.log(text);
			}
		});

}

else{
	console.log("Sorry, I didn't understand that.");
}

