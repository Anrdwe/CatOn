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

app.get("/image", (req, res, next) => {
    imagesApi.searchImages(animalqueryParams)
        .then(({ data }) => {
            imageData = data;
            console.log(JSON.stringify(data));
            res.json(imageData[0].assets.preview);
    })
    .catch((error) => {
        console.error(error);
    });
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});