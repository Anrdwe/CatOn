'use strict';

async function detectstress() {

  // Basic imports
  const webcam = require('camera-capture');
  const fs = require('fs');
  const vision = require('@google-cloud/vision');
  var sleep = require('sleep');

  const c = new webcam.VideoCapture({mime: 'image/png'});
  await c.initialize();
  const client = new vision.ImageAnnotatorClient();

  while (true) {
    // Take a photo using webcom
    let f = await c.readFrame('image/jpeg');
    fs.writeFileSync('./resources/face.jpg', f.data);

    // Predict stress level using Google Cloud Vision API
    const [result] = await client.faceDetection('./resources/face.jpg');
    const faces = result.faceAnnotations;
    console.log('Faces:');
    faces.forEach((face, i) => {
      console.log(`  Face #${i + 1}:`);
      console.log(`    Joy: ${face.joyLikelihood}`);
      console.log(`    Anger: ${face.angerLikelihood}`);
      console.log(`    Sorrow: ${face.sorrowLikelihood}`);
      console.log(`    Surprise: ${face.surpriseLikelihood}`);
    });

    // Sleep for 1 second
    sleep.sleep(1);
  }
}

detectstress().catch(console.error);