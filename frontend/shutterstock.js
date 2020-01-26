var getImage = function() {
  fetch("http://localhost:3000/image").then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data.url);
    return data.url;
  }).catch(function() {
    console.log("Booo");
  });
}