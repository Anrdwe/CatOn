'use strict';
 
var access = require('access-control');

var cors = access({
    origins: '*'
  });

var express = require("express");
var app = express();

const sstk = require("shutterstock-api");
const imagesApi = new sstk.ImagesApi();
const applicationClientId = "YpHu4EeFUnHGC8koPMA5C0FF20SfX1i1";
const applicationClientSecret = "yctx7ssKAZGJKTSL";
sstk.setBasicAuth(applicationClientId, applicationClientSecret);
const animalqueryParams = {
  "query": "cute animal",
  "image_type": "photo",
  "sort": "random"
};

app.use(cors);

var imageData;

const fs = require('fs');
const request = require('request');

app.get("/image", (req, res, next) => {
    imagesApi.searchImages(animalqueryParams)
        .then(({ data }) => {
            imageData = data;
            console.log(JSON.stringify(data));
            var download = function(uri, filename, callback){
              request.head(uri, function(err, res, body){    
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
              });
            };
            download(`${imageData[0].assets.preview.url}`, '../frontend/randomAnimal.jpg', function(){
              console.log('done');
            });
            res.json(imageData[0].assets.preview);
    })
    .catch((error) => {
        console.error(error);
    });
});



app.listen(3000, () => {
 console.log("Server running on port 3000");
});