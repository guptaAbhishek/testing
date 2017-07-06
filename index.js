var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');

const CatchPointAPI = require('catchpoint-api');
const catchPoint = new CatchPointAPI();




app.set('views',__dirname+'/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));
app.use('/pages',express.static(__dirname+'/public/pages'));
app.use('/img',express.static(__dirname+'/public/img'));


app.set('port',(process.env.PORT || "8080"));

app.get('*',function(req,res){
    res.render('index.html')
});

var gKey = "AIzaSyDFJ46AyYHdr1VbttLQrY5-2R2nmkGLEc";
// var google_pagespeed_insights_url = "https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=http://hindustantimes.com&filter_third_party_resources=true&key=AIzaSyDFJ46AyYHdr1VbttLQrY5-2R2nmkGLEcw";

app.post('/getGooglePageSpeedInsights',function(req,res){
    var params = req.body.params;

    if(params != "undefined" && params != undefined && params != null){
        console.log(params);
        var google_pagespeed_insights_url = "https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url="+params.url+"&filter_third_party_resources=false&local=en_US&strategy=desktop&key="+gKey;
        var desktop_mobile = [];


        request.get({
            url:google_pagespeed_insights_url
        },function(err,body,response){
            if(err) throw err;
            desktop_mobile.push({desktop:JSON.parse(response)});
            request.get({
                url:"https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url="+params.url+"&filter_third_party_resources=false&local=en_US&strategy=mobile&key=AIzaSyDFJ46AyYHdr1VbttLQrY5-2R2nmkGLEcw"
            },function(err,body,response){
                if(err) throw err;
                desktop_mobile.push({mobile:JSON.parse(response)});
                res.send(desktop_mobile);
            });
        });




    }else{
        console.log('getGooglePageSpeedInsights params not defined');
    }
});


app.post('/getBigQueryData',function(req,res){
    // get the data from the database and send the repsonse


});


app.listen(app.get('port'),function(){
    console.log('Magic happens on port',app.get('port'));
});
