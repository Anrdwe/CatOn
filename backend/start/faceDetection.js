'use strict';

const vision = require('@google-cloud/vision');
const fs = require('fs');
const webcam = require('camera-capture');
const {PredictionServiceClient} = require(`@google-cloud/automl`).v1;

const c = new webcam.VideoCapture({mime: 'image/png'});
const client = new vision.ImageAnnotatorClient();

// Detect faces in the image.
async function detectFaces(inputFile) {
  // Make a call to the Google Cloud Vision API to detect the faces
  const request = {image: {source: {filename: inputFile}}};
  const results = await client.faceDetection(request);
  const faces = results[0].faceAnnotations;
  return faces;
}

// Crop a polygon around the face, then saves to local.
async function cropFaceAndPredict(inputFile, face) {
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
  var buf = canvas.toBuffer();
  fs.writeFileSync(inputFile, buf);
}

async function predictEmotion (inputFile) {
  /**
   * TODO(developer): Uncomment these variables before running the sample.
  */
  const projectId = 'caton-266221';
  const location = 'us-central1';
  const modelId = 'ICN9155620130351218688';

  // Instantiates a client
  const client = new PredictionServiceClient();

  // Read the file content for translation.
  const content = fs.readFileSync(inputFile);

  async function predict() {
    // Construct request
    // params is additional domain-specific parameters.
    // score_threshold is used to filter the result
    const request = {
      name: client.modelPath(projectId, location, modelId),
      payload: {
        image: {
          imageBytes: content,
        },
      },
    };

    const [response] = await client.predict(request);

    for (const annotationPayload of response.payload) {
      console.log(`Predicted class name: ${annotationPayload.displayName}`);
      console.log(
        `Predicted class score: ${annotationPayload. classification.score}`
      );
    }
  }

  predict();
}

async function main() {
  var sleep = require('sleep');
  let filePath = './resources/face.jpg';
  while (true) {
    // Take a photo using webcom
    await c.initialize();
    let f = await c.readFrame('image/jpeg');
    fs.writeFileSync(filePath, f.data);
    // Crop out the polygon around any face detected in the photo above
    const faces = await detectFaces(filePath);
    if (faces !== undefined && faces.length > 0) {
      console.log(`Detected a face.`);
      await cropFaceAndPredict(filePath, faces[0]);
      await predictEmotion(filePath);
    }
    sleep.sleep(1);
  }
}

main().catch(console.error);