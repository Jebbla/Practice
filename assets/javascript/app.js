$(document).ready(function () {

    var granimInstance = new Granim({
        element: '#canvas-image-blending',
        direction: 'diagonal',
        isPausedWhenNotInView: true,
        image: {
            source: 'assets/images/mountain2.jpg',
            blendingMode: 'hue',
        },
        states: {
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


    var materialsArr = [
        "Appliances & Equipment",
        "Asphalt",
        "Automobiles",
        "Batteries",
        "Bottles & Cans",
        "Bricks, Masonry, & Stone",
        "Cardboard & Paper",
        "Carpet Padding/Foam",
        "Ceiling Tiles",
        "Concrete", "Construction & Demolition Debris",
        "Deconstructed & Salvaged Items",
        "Dirt- Clean Fill",
        "Donations",
        "Drums, Barrels, & Buckets",
        "Drywall- Clean/Unpainted",
        "Drywall- Demo & Painted",
        "eWaste- Electronics/TVs/Computers",
        "Glass- Plate or Tempered",
        "Green Waste- Yard/Landscape",
        "Hauling Services",
        "Hazardous Waste & Materials",
        "Mattress",
        "Metals- Ferrous",
        "Metals- Non Ferrous",
        "Oil- Commercial Grade",
        "Oil- Food Grade",
        "Paint",
        "Plastics- Consumer Grade",
        "Plastics- Industrial Grade",
        "Porcelain",
        "Rock, Sand, & Gravel",
        "Roofing Asphalt",
        "Tires",
        "Trash",
        "Wood- Clean Lumber/Pallets",
        "Wood- Treated/Painted"
    ]

    materialsArr.forEach(function (element) {
        var optionTag = $("<option>")
        optionTag.text(element)
        $("#materials").append(optionTag)
    });

    var radiusArr = [
        "5", "10", "15", "25", "50"
    ]
    radiusArr.forEach(function (element) {
        var optionTag = $("<option>")
        optionTag.text(element)
        $("#radius").append(optionTag)
    });

    var zipCode = "55407";
    var materialID = 1;
    var latitude, longitude;

    var earthQuery = function () {
        var apiKey = "3fb6e10a90808f0d";
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.getPostalData?postal_code=" + zipCode + "&country=US&api_key="
            + apiKey

        console.log(queryURL);

        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (response) {
            console.log(response);
            var parsedResponse = JSON.parse(response);
            latitude = parsedResponse.result.latitude;
            longitude = parsedResponse.result.longitude;
            console.log("https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.searchLocations?api_key=3fb6e10a90808f0d"
            +"&latitude="+latitude
            +"&longitude="+longitude
            +"&material_id="+materialID);
            $.ajax({
                method: "GET", 
                url: "https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.searchLocations?api_key=3fb6e10a90808f0d"
                +"&latitude="+latitude
                +"&longitude="+longitude
                +"&material_id="+materialID,
                
            }).then(function(result){
                //logic for actual location data
                console.log(result);
            })

        });
    }
    earthQuery();




});

