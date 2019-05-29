$(document).ready(function(){

var granimInstance = new Granim({
  element: '#canvas-image-blending',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image : {
      source: 'assets/images/mountains.png',
      blendingMode: 'multiply'
  },
  states : {
      "default-state": {
          gradients: [
              ['#29323c', '#485563'],
              ['#FF6B6B', '#556270'],
              ['#80d3fe', '#7ea0c4'],
              ['#f0ab51', '#eceba3']
          ],
          transitionSpeed: 7000
      }
  }
});



var gifQuery = function () {
    var apiKey = "3fb6e10a90808f0d";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.getPostalData?postal_code=55436&country=US&api_key="
        + apiKey
       
    console.log(queryURL);

    $.ajax({
        method: "GET",
        url: queryURL,
    }).then(function (result) {
        console.log(result);

    });
}

gifQuery();

});
