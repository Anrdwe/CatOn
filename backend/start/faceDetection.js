'use strict';

const vision = require('@google-cloud/vision');
const fs = require('fs');
const webcam = require('camera-capture');

const c = new webcam.VideoCapture({mime: 'image/png'});
const client = new vision.ImageAnnotatorClient();

// Detect faces in the image.
async function detectFaces(inputFile) {
  // Make a call to the Google Cloud Vision API to detect the faces
  const request = {image: {source: {filename: inputFile}}};
  const results = await client.faceDetection(request);
  const faces = results[0].faceAnnotations;
  if (faces.length > 0) {
    console.log(`Detect a face.`);
  }
  return faces;
}

// Crop a polygon around the face, then saves to local.
async function highlightFaces(inputFile, face) {
  const Canvas = require('canvas');
  const {promisify} = require('util');
  const readFile = promisify(fs.readFile);
  const image = await readFile(inputFile);
  const Image = Canvas.Image;
  const img = new Image();
  img.src = image;

  // Cropping the polygon area of the face detected in the image
  let vertices = face.boundingPoly.vertices;
  let origX = vertices[0].x;
  let origY = vertices[0].y;
  let width = vertices[2].x - vertices[0].x;
  let height = vertices[2].y - vertices[0].y;
  const canvas = new Canvas.Canvas(width, height);
  const context = canvas.getContext('2d');
  context.drawImage(img, origX, origY, width, height, 0, 0, width, height);

  // Write the result to a file
  console.log(`Cropped the face in ${inputFile}`);
  const writeStream = fs.createWriteStream(inputFile);
  const pngStream = canvas.pngStream();

  await new Promise((resolve, reject) => {
    pngStream
      .on('data', chunk => writeStream.write(chunk))
      .on('error', reject)
      .on('end', resolve);
  });
}

async function main() {
  var counter = 1;
  while (true) {
    let filePath = './resources/face' + counter++ + '.jpg';
    // Take a photo using webcom
    await c.initialize();
    let f = await c.readFrame('image/jpeg');
    fs.writeFileSync(filePath, f.data);
    // Crop out the polygon around any face detected in the photo above
    const faces = await detectFaces(filePath);
    if (faces !== undefined && faces.length > 0) {
      await highlightFaces(filePath, faces[0]);
    }
  }
}

main().catch(console.error);