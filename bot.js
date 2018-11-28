var twit = require("twit")
var config = require("./config.js")
var fetch = require("node-fetch")
var twitter = new twit(config)


var queryURL = "https://api.giphy.com/v1/gifs/search?q=BTS&api_key=dc6zaTOxFJmzC"
var getBois = function(){
    fetch(queryURL)
    .then((resp) => resp.json())
    .then(function(resp){
        console.log(resp.data[3])
    })
    .catch(function(error){
        console.log("oops, error. Here take this " + error)
    })
}


var newBois = function(gif){
    twitter.post('media/upload')
}


var retweet = function() {
    var params = {
      q: '#pokemon',
      result_type: 'recent',
      lang: 'en'    
    }
    
    twitter.get('search/tweets', params, function(err, data){
        if (!err){
            //grab ID of tweet
            var retweetId = data.statuses[0].id_str;
            //Tell TWITTER to retweet
            twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response){
                if (response){
                    console.log("retweeted the boys!")
                }
                if (err){
                    console.log(err)
                    console.log("uh-oh... error trying to post")
                }
            })
        }
        else {
            console.log(err)
        }
    })
}

retweet();
setInterval(retweet, 3000000)