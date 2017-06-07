var coll = true;
var creating = false;

var creationMarkers = [];
var créationRoutes = [];

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