var coll = true;
var creating = false;

var creationMarkers = [];
var creationRoutes = [];

$(document).ready(function () {
    initMap();
    $("#navTrips .collapse").collapse({toggle: false});

    $('#navDetails .slide-submenu').closest('.sidebar-body').hide();

    $('#navInsert .slide-submenu').closest('.sidebar-body').hide();
    $('#cmdInsert').show();

    $('.list-group-item').click(function () {
        closeRight(true);
        $('#navDetails').show();
        openLeft();
    });

    $('.sidebar-left .slide-submenu').on('click', function () {
        closeRight(true);
    });

    $('.mini-submenu-left').on('click', function () {
        openRight();
        closeLeft(true);
    });

    $('#navDetails .slide-submenu').on('click', function () {
        closeLeft(true);
    });

    $('#cmdNavDetails').on('click', function () {
        openLeft();
        closeRight(true);
    });

    $('#cmdInsert').on('click', function () {
        closeLeft(false);
        closeRight(false);
        var height = $(window).height() - 50 - 37 - 7;
        $('#navInsert #insertPanel').css("height", height);
        window.setTimeout(function () {
            openAdd();
        }, 400);
    });

    $('#navInsert .slide-submenu').on('click', function () {
        closeAdd(true);
    });

    /* $('.collapsed').click(function(){
     var id = event.target.id;
     console.log(this.id);
     $('.collapse').not(this).collapse("hide");
     });*/

    $('#navTrips .collapse').on('show.bs.collapse', function () {
        if (coll) {
            coll = false;
            var id = "#" + (this.id);
            //console.log($('#navTrips .collapse').not(id));
            $('#navTrips .collapse').not(id).collapse("hide");
            coll = true;
        }
    });

    google.maps.event.addListener(map, 'click', function (event) {
        if (focus !== null) {
            getAdresseFromPosition(event.latLng);
        }
    });
});

function openLeft() {
    if ($('#navDetails .sidebar-body').is(":visible") == false) {
        $('#navDetails .sidebar-body').toggle();
        $('#cmdNavDetails').hide();
    }
}
function openRight() {
    if ($('.sidebar-left .sidebar-body').is(":visible") == false) {
        $('.sidebar-left .sidebar-body').toggle();
        $('.mini-submenu-left').hide();
    }
}
function closeRight(reopen) {
    if ($('.sidebar-left .sidebar-body').is(":visible") == true) {
        $('.sidebar-left .slide-submenu').closest('.sidebar-body').fadeOut('slide');
        if (reopen) {
            $('.mini-submenu-left').fadeIn();
        }
    } else {
        if (!reopen) {
            $('.mini-submenu-left').hide();
        }
    }

}
function closeLeft(reopen) {
    if ($('#navDetails .sidebar-body').is(":visible") == true) {
        $('#navDetails .slide-submenu').closest('.sidebar-body').fadeOut('slide');
        if (reopen) {
            $('#cmdNavDetails').fadeIn();
        }
    }
    else {
        if (!reopen) {
            $('#cmdNavDetails').hide();
        }
    }
}
function openAdd() {
    if ($('#navInsert .sidebar-body').is(":visible") == false) {
        $('#navInsert .sidebar-body').toggle();
        $('#cmdInsert').hide();
    }
    creating = true;
    creationMarkers = [];
    creationRoutes = [];
    count = 0;

}
function closeAdd(reopen) {
    if ($('#navInsert .sidebar-body').is(":visible") == true) {
        $('#navInsert .slide-submenu').closest('.sidebar-body').fadeOut('slide');
        if (reopen) {
            $('#cmdInsert').fadeIn();
        }
    } else {
        if (!reopen) {
            $('#cmdInsert').hide();
            creating = false;
            creationMarkers = [];
            creationRoutes = [];
            count = 0;
        }
    }
}

/**
 * Inistalise la map principale
 * @returns {undefined}
 */
function initMap() {
    var mapOptions = {
        zoom: 2,
        center: {lat: -34.397, lng: 150.644},
        mapTypeControl: false,
        streetViewControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        styles: [{"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#e0efef"}]}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"hue": "#1900ff"}, {"color": "#c0e8e8"}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 100}, {"visibility": "simplified"}]}, {"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}]}, {"featureType": "transit.line", "elementType": "geometry", "stylers": [{"visibility": "on"}, {"lightness": 700}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#7dcdcd"}]}]
    };
    var mapElement = document.getElementById('map');

    map = new google.maps.Map(mapElement, mapOptions);
}

function getAdresseFromPosition(Position) {

    //var input = document.getElementById('latlng').value;
    //var latlngStr = input.split(',', 2);
    //var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': Position}, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                placeMarker(Position);
                var id = "#adress" + focus;
                $(id).val(results[1].formatted_address);
            } else {
                alert('Pas d\'adresse réferencée pour cette position');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function getPositionFromAdresse() {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': Position}, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                var id = "#adress" + focus;
                $(id).val(results[1].formatted_address);

            } else {
                alert('Nous n\'avons rien trouvé pour cette adresse');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function placeMarker(location) {
    if (focus !== null) {
        if (creationMarkers[focus] !== "none" && creationMarkers[focus] !== null) {
            creationMarkers[focus].setMap(null);
        }
        //console.log(creationMarkers[focus]);
        creationMarkers[focus] = new google.maps.Marker({
            position: location,
            map: map
        });

        TraceRoute(focus);
    }
}

function TraceRoute(PlaceId) {
    TracePreviousRoad(PlaceId);
    TraceNextRoad(PlaceId);
}

function TracePreviousRoad(PlaceId) {
    if (PlaceId - 1 >= 0) {
        var negaArray = creationMarkers.slice(0, PlaceId).reverse();
        var count = PlaceId - 1;
        //console.log(negaArray);
        negaArray.forEach(function (element) {
            if (creationMarkers[count] !== null) {
                if (creationMarkers[count] == "none") {
                    //console.log("no route");
                    return;
                } else {
                    if (typeof creationRoutes[PlaceId-1] == "object") {
                        creationRoutes[PlaceId-1].display.setMap(null);
                    }
                    if (true) {
                        setPath(creationMarkers[PlaceId], creationMarkers[count], PlaceId-1);
                    }
                    //console.log(count);
                }
            }
        });
    }
}

function TraceNextRoad(PlaceId) {
    
    if (Number(PlaceId) + 1 < creationMarkers.length) {
        //console.log("in");
        var posiArray = creationMarkers.slice(Number(PlaceId) + 1, creationMarkers.length);
        //console.log(posiArray);
        var count = Number(PlaceId) + 1;
        posiArray.forEach(function (element) {
            if (creationMarkers[count] !== null) {
                if (creationMarkers[count] == "none") {
                    //console.log("no route");
                    return;
                } else {
                    creationRoutes[count-1].display.setMap(null);
                    if (true) {
                        setPath(creationMarkers[PlaceId], creationMarkers[count], count-1);
                    }
                    //console.log(count);
                }
            }
            count++;
        });
    }
}

/**
 * Prépare les paramètres de la fonction de géocodage, pour éviter 
 * que son caractère asyncrone lui fasse perdre des informaitons.
 * @param {type} position1
 * @param {type} position2
 * @returns {undefined}
 */
function setPath(position1, position2, StoragePosition) {
    creationRoutes[StoragePosition] = [];
    creationRoutes[StoragePosition].display = new google.maps.DirectionsRenderer({suppressMarkers: true});
    
    var dep = new google.maps.LatLng(position1.position.lat(), position1.position.lng());
    var arr = new google.maps.LatLng(position2.position.lat(), position2.position.lng());

    var directionsService = new google.maps.DirectionsService();
    
    creationRoutes[StoragePosition].display.setMap(map);

    var request = {
        origin: dep,
        destination: arr,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: false
    };
    
    
    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            creationRoutes[StoragePosition].route = response;
            creationRoutes[StoragePosition].display.setDirections(response);
        }
        else {
            alert('Directions request failed due to ' + status);
        }
    });
}

function drawFlight() {

}
