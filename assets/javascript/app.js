$(document).ready(function() {

    var radius;
    var zipCode;

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
    $("#selectID").change(function() {
        var selected = $(this).find('option:selected');
    })
    var materialsArr = [
        { name: "Air-Conditioners", id: 591 },
        { name: "Aluminum-Cans", id: 70 },
        { name: "Asphalt", id: 212 },
        { name: "Batteries", id: 104 },
        { name: "Cardboard", id: 40 },
        { name: "Construction-Debris", id: 385 },
        { name: "Latex-Paint", id: 418 },
        { name: "Adult-Toys", id: 353 },
        { name: "Mattresses", id: 226 },
        { name: "Paint-Thinners", id: 191 },
        { name: "Plastic-Bottle", id: 60 },
        { name: "Porcelain-Products", id: 214 },
        { name: "Sand", id: 386 },
        { name: "Small-Appliances", id: 362 },
        { name: "Tires", id: 5 },
        { name: "Truck-Tires", id: 633 },
        { name: "Vehicles", id: 267 },
        { name: "Washer/Dryers", id: 573 },
    ]

    materialsArr.forEach(function(element) {
        var optionTag = $("<option>")
        optionTag.text(element.name)
        optionTag.attr('id', element.name)
        optionTag.attr("materialId", element.id);
        $("#materials").append(optionTag)
    });

    var radiusArr = [
        "5", "10", "15", "25", "50"
    ]
    radiusArr.forEach(function(element) {
        var optionTag = $("<option>")
        optionTag.text(element)
        $("#radius").append(optionTag)
    });

    // var zipCode = "55407";
    // var materialID ="104";
    var latitude, longitude;

    var earthQuery = function(materialIdfromPage) {
        var apiKey = "3fb6e10a90808f0d";
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.getPostalData?postal_code=" + zipCode + "&country=US&api_key=" +
            apiKey

        console.log(queryURL);

        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function(response) {
            console.log(response);
            var parsedResponse = JSON.parse(response);
            latitude = parsedResponse.result.latitude;
            longitude = parsedResponse.result.longitude;
            console.log("https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.searchLocations?api_key=3fb6e10a90808f0d" +
                "&latitude=" + latitude +
                "&longitude=" + longitude +
                "&material_id=" + materialIdfromPage);
            $.ajax({
                method: "GET",
                url: "https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.searchLocations?api_key=3fb6e10a90808f0d" +
                    "&latitude=" + latitude +
                    "&longitude=" + longitude +
                    "&material_id=" + materialIdfromPage +
                    "&max_distance=" + radius,

            }).then(function(resultA) {
                //logic for actual location data
                console.log(resultA);
                var resultB = JSON.parse(resultA)
                console.log(resultB);
                console.log(resultB.result[0].longitude)
                console.log(resultB.result[0].latitude)
                var longitude = resultB.result[0].longitude;
                var latitude = resultB.result[0].latitude;
                drawMap(longitude, latitude, markers);
                if (typeof resultB.result !== typeof undefined) {
                    var resultDiv = $('<div>');
                    resultDiv.append("Name:", resultB.result[0].description, "<br>");
                    resultDiv.append("Distance:", resultB.result[0].distance);
                    $('#list').append(resultDiv)
                }
            })
        });
    }

    // earthQuery();
    $("#submit").click(function(event) {
        event.preventDefault();
        var val = $('#materials').val();
        var option = $('#' + val);
        var materialID = option.attr('materialId');
        console.log(materialID)
        zipCode = $('#inlineFormInputName2').val()
        console.log('zipCode====', zipCode)
        earthQuery(materialID);
        $('#inlineFormInputName2').val('')
        radius = $('#radius').val();

    })

    // // Initialize and add the map
    function drawMap(longitude, latitude, markers) {
        //     // The location of target destination
        var targetLocation = {
            lat: latitude,
            lng: longitude
        };
        //     // The map, centered at target locations
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 8,
                center: targetLocation
            });
        //     // The marker, positioned at target locations
        var marker = new google.maps.Marker({
            position: targetLocation,
            map: map
        });

    }
    // Initialize and add the map


});

function initMap(longitude, latitude) {
    // The location of target destination
    var targetLocation = {
        lat: -93.2980409363637,
        lng: 44.830624313775154
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: targetLocation
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        position: targetLocation,
        map: map
    });
}