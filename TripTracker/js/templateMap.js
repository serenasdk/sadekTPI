/* 
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * templateMap.js
 * 
 * Les fonctions de cette page concernent l'essenciel de ce qui concerne Google
 * Map API. Elle initialise la map et contient les fonctions faisant appel au 
 * Serveur Google Map API. 
 * Cette page contient également les fonctionalités développée lors de la préparation,
 * c'est à dire celle donc l'action est purement cosmétique
 */

var coll = true;
var creating = false;
var editing = null;

var creationMarkers = [];
var creationRoutes = [];

$(document).ready(function () {
    //Chargement de la carte
    initMap();

    //Tout les panneaux sont ouverts par défaut. Il faut donc les fermer manuellement
    $('#navDetails .slide-submenu').closest('.sidebar-body').hide();
    $('#navInsert .slide-submenu').closest('.sidebar-body').hide();
    $('#cmdInsert').show();

    //Lorsqu'on click sur une étape, le panneau de gauche doit se fermer et celui de droite s'ouvrir
    $('.list-group-item').click(function () {
        closeRight(true);
        $('#navDetails').show();
        openLeft();
    });

    //Lorsqu'on ouvre un panneau, on ferme l'autre

    $('.sidebar-left .slide-submenu').on('click', function () {
        closeRight(true);
    });

    $('.mini-submenu-left').on('click', function () {
        openRight();
        closeLeft(false);
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
        $('#navInsert .insertPanel').css("max-height", height);
        window.setTimeout(function () {
            openAdd();
        }, 400);
    });

    $('#navInsert .slide-submenu').on('click', function () {
        closeAdd(true);
    });

    $('body').on('show.bs.collapse', "#navTrips .collapse", function () {
        if (coll) {
            coll = false;
            var id = "#" + (this.id);
            $('#navTrips .collapse').not(id).collapse("hide");
            coll = true;
        }
    });

    //Lorsqu'on est en mode création, l'évènement click de la map déclenche une
    //Recherche d'adresse
    google.maps.event.addListener(map, 'click', function (event) {
        if (focus !== null) { //Si l'utilisateur a son focus sur une étape
            getAdresseFromPosition(event.latLng);
        }
    });

    /**
     * Lorsque la position de la map change (que ce soit le zoom ou le pan), on
     * vérifie si le limite de la map ne dépassent pas le lite du pôle nord et 
     * du pôle sud. Si c'est le cas, on décale le centre de manière à ce que la 
     * map soit de nouveau dans les limites.
     */
    google.maps.event.addListener(map, 'center_changed', function (event) {
        var boundHeight = map.getBounds().f; // Limite haute et basse de la map
        var initalCentre = map.getCenter();

        if (boundHeight.b < -85) { //Limite basse de la map hors champ
            var ecart = -(boundHeight.b + 85);
            var centre = new google.maps.LatLng(
                    initalCentre.lat() + ecart,
                    initalCentre.lng()
                    );
            map.setCenter(centre);
        } else if (boundHeight.f > 85) { //Limite haute de la map hors champ
            var ecart = boundHeight.f - 85;
            var centre = new google.maps.LatLng(
                    initalCentre.lat() - ecart,
                    initalCentre.lng()
                    );
            map.setCenter(centre);
        }
    });
});

/**
 * Ouvre le panneau de droite
 * @returns {undefined}
 */
function openLeft() {
    if ($('#navDetails .sidebar-body').is(":visible") == false) {
        window.setTimeout(function () {
            var height = $(window).height() - 50 - 37 - 7;
            $('#navDetails .panel-body').css("max-height", height);

            $('#navDetails .sidebar-body').toggle();
            $('#cmdNavDetails').hide();
        }, 450);
    }
}

/**
 * Ouvre le panneau de gauche
 * @returns {undefined}
 */
function openRight() {
    if ($('.sidebar-left .sidebar-body').is(":visible") == false) {
        if (ActivePanelId !== null && ActivePanelId < 5 && ActivePanelId >= 0) {
            panOnTrip(ActivePanelId);
        }
        window.setTimeout(function () {
            $('.sidebar-left .sidebar-body').toggle();
            $('.mini-submenu-left').hide();
        }), 450;
    }
}

/**
 * Ferme le panneau de gauche
 * @param {type} reopen : La miniature doit-elle s'affiche pour permettre une réouverture ?
 * @returns {undefined}
 */
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

/**
 * Ferme le panneau de droite
 * @param {type} reopen : La miniature doit-elle s'affiche pour permettre une réouverture ?
 * @returns {undefined}
 */
function closeLeft(reopen) {
    if ($('#navDetails .sidebar-body').is(":visible") == true) {
        $('#navDetails .slide-submenu').closest('.sidebar-body').fadeOut('slide');
        if (reopen) {
            $('#cmdNavDetails').fadeIn();
        }
    } else {
        if (!reopen) {
            $('#cmdNavDetails').hide();
        }
    }
}

/**
 * Ouvre la panneau d'ajout
 * @returns {undefined}
 */
function openAdd() {
    if ($('#navInsert .sidebar-body').is(":visible") == false) {
        window.setTimeout(function () {
            $('#navInsert .sidebar-body').toggle();
            $('#cmdInsert').hide();
        }), 400;
    }
    if (!creating) {
        unsetPageDisplay();
        creating = true;
        ActivePanelId = null;
        creationMarkers = [];
        creationRoutes = [];
        count = 0;
    }
}
/**
 * Ferme le panneau d'ajout, avec la possibilité ou non de l'ouvrir à nouveau
 * @param {type} reopen
 * @returns {undefined}
 */
function closeAdd(reopen) {
    if ($('#navInsert .sidebar-body').is(":visible") == true) {
        $('#navInsert .slide-submenu').closest('.sidebar-body').fadeOut('slide');
        $('#cmdInsert').fadeIn();
    } else {
        if (!reopen) {
            $('#cmdInsert').hide();
            creating = false;
            creationMarkers = [];
            creationRoutes = [];
            count = 0;
            openRight();
        }
    }
}

/**
 * Inistalise la map principale
 * @returns {undefined}
 */
function initMap() {
    var mapOptions = {
        zoom: 5,
        center: {lat: -34.397, lng: 150.644},
        mapTypeControl: false,
        streetViewControl: false,
        minZoom: 2,
        sensor: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        styles: [{"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#e0efef"}]}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"hue": "#1900ff"}, {"color": "#c0e8e8"}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 100}, {"visibility": "simplified"}]}, {"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}]}, {"featureType": "transit.line", "elementType": "geometry", "stylers": [{"visibility": "on"}, {"lightness": 700}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#7dcdcd"}]}]
    };
    var mapElement = document.getElementById('map');

    map = new google.maps.Map(mapElement, mapOptions);
}


/**
 * Récupère les informations complètes liée à la position et complète les 
 * informations du panel sélectionné
 * @param {type} Position
 * @returns {undefined}
 */
function getAdresseFromPosition(Position) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': Position}, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                placeMarker(Position, results[0].formatted_address);
                var id = "#adress" + focus;
                $(id).val(results[1].formatted_address);
            }
        } else if (status == "ZERO_RESULTS") {
            alert("Pas d'adresse référencée pour cette position");
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

/**
 * Récupère les informations complètes liée à l'adresse et complète les 
 * informations du panel sélectionné
 * @param {type} Adresse
 * @returns {undefined}
 */
function getPositionFromAdresse(Adresse) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': Adresse}, function (results, status) {
        if (status === 'OK') {
            var id = "#adress" + focus;
            $(id).val(results[0].formatted_address);
            placeMarker(new google.maps.LatLng(
                    results[0].geometry.location.lat(),
                    results[0].geometry.location.lng()),
                    results[0].formatted_address);
        } else if (status == "ZERO_RESULTS") {
            alert("Cette adresse n'existe pas");
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

/**
 * Géolocalise l'utilisateur, obtient les informations complète de cette 
 * localisation et complète les informations du panel sélectionné
 * @returns {undefined}
 */
function geoLocation() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            getAdresseFromPosition(pos);
        }, function () {
            alert("Une erreur est survenue lors de la géolocalisation");
        });
    } else {
        alert("La géolocalisation n'est pas autorisée par votre navigateur.");
    }
}

/**
 * Place un marqueur sur la map en le stockang à la position correspondant au 
 * focus.
 * @param {LatLng} location
 * @param {string} address
 * @returns {undefined}
 */
function placeMarker(location, address) {
    if (focus !== null) {
        var id = null;
        if (creationMarkers[focus] !== "none" && creationMarkers[focus] !== null) {
            creationMarkers[focus].setMap(null);
            if (typeof creationMarkers[focus].id !== "undefined") {
                id = creationMarkers[focus].id;
            }
        }
        creationMarkers[focus] = new google.maps.Marker({
            position: location,
            map: map
        });


        if (id !== null) {
            creationMarkers[focus].id = id;
        }

        creationMarkers[focus].address = address;

        TraceRoute(focus);

        PanOnCreationTrip();
    }
}

/**
 * Tente de traces les deux routes auxquelles le marqueur pourrait être relié
 * @param {int} PlaceId
 * @returns {undefined}
 */
function TraceRoute(PlaceId) {
    TracePreviousRoad(PlaceId);
    TraceNextRoad(PlaceId);
}

/**
 * Tente de tracer la route entre le marqueur et l'emplacement précédent
 * @param {int} PlaceId
 * @returns {undefined}
 */
function TracePreviousRoad(PlaceId) {
    if (PlaceId - 1 >= 0) {
        var negaArray = creationMarkers.slice(0, PlaceId).reverse();
        var count = PlaceId - 1;
        var flag = true;
        negaArray.forEach(function (element) {
            if (flag) {
                if (creationMarkers[count] !== null) {
                    if (creationMarkers[count] == "none") {
                        flag = false;
                    } else {
                        if (typeof creationRoutes[PlaceId - 1] == "object") {
                            creationRoutes[PlaceId - 1].display.setMap(null);
                        }
                        setPath(creationMarkers[count], creationMarkers[PlaceId], PlaceId - 1);
                        flag = false;
                    }
                }
            }

            count--;
        });
    }
}

/**
 * Tente de tracer la route entre le marqueur et l'emplacement suivant
 * @param {int} PlaceId
 * @returns {undefined}
 */
function TraceNextRoad(PlaceId) {
    if (Number(PlaceId) + 1 < creationMarkers.length) {
        var posiArray = creationMarkers.slice(Number(PlaceId) + 1, creationMarkers.length);
        var count = Number(PlaceId) + 1;
        var flag = true;
        posiArray.forEach(function (element) {
            if (flag) {
                if (creationMarkers[count] !== null) {
                    if (creationMarkers[count] == "none") {
                        flag = false;
                    } else {
                        if (typeof creationRoutes[count - 1] == "object") {
                            creationRoutes[count - 1].display.setMap(null);
                        }
                        setPath(creationMarkers[PlaceId], creationMarkers[count], count - 1);
                        flag = false;
                    }
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
    creationRoutes[StoragePosition].display = new google.maps.DirectionsRenderer({suppressMarkers: true, preserveViewport: true});

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
            //Informations complètes concernant la route trouveée
            creationRoutes[StoragePosition].route = response;
            //Connecteur entre la réponse et la map
            creationRoutes[StoragePosition].display.setDirections(response);
        }
        if (status === "ZERO_RESULTS") {
            creationRoutes[StoragePosition].display.setMap(null);
            drawFlight(dep, arr, StoragePosition);
        }
    });
}

function storeRoute(response, sp) {

}

/**
 * Dessine une ligne droite entre deux point ne pouvant pas être reliés par la terre
 * @returns {undefined}
 */
function drawFlight(position1, position2, StoragePosition) {
    creationRoutes[StoragePosition];
    creationRoutes[StoragePosition].display = new google.maps.Polyline({
        path: [position1, position2],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });
    //creationRoutes[StoragePosition].display.setMap(map);
    creationRoutes[StoragePosition].route = "polyline";
    showFligh(StoragePosition);
}

function showFligh(StoragePosition) {
    creationRoutes[StoragePosition].display.setMap(map);
}

/**
 * Supprime les routes auxquel un point est lié
 * @param {int} dotId
 * @returns {undefined}
 */
function suppressRoadsOfDot(dotId) {
    var dot1 = null;

    if (typeof creationRoutes[Number(dotId) - 1] !== "string") {
        creationRoutes[Number(dotId) - 1].display.setMap(null);
    }

    var negaArray = creationMarkers.slice(0, Number(dotId)).reverse();
    dot1 = Number(dotId) - 1;
    var count = Number(dotId) - 1;
    negaArray.forEach(function (element) {
        if (creationMarkers[count] !== null) {
            dot1 = count;
            return;
        }
        count--;
    });

    if (true) {
        creationRoutes[Number(dotId) - 1] = null;
    }

    if (Number(dotId) + 1 < creationMarkers.length) {
        var posiArray = creationMarkers.slice(Number(dotId) + 1, creationMarkers.length);
        var count = Number(dotId) + 1;
        var flag = true;
        posiArray.forEach(function (element) {
            if (flag) {
                if (creationMarkers[count] !== null) {
                    if (creationMarkers[count] == "none") {
                        flag = false;
                    } else {
                        if (creationRoutes[count - 1] !== "none") {
                            creationRoutes[count - 1].display.setMap(null);
                            creationRoutes[count - 1] = null;
                        }

                        if (dot1 !== null) {
                            setPath(creationMarkers[dot1], creationMarkers[count], count - 1);
                        }
                        flag = false;
                    }
                }
            }
            count++;
        });
    }
}


