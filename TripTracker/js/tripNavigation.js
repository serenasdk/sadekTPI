/* 
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * 
 * Les fonctions de cette page concernent la nagigation parmis les voyages, 
 * de l'affichage au chargement des données
 */

var NavPaths = [];
var NavMarkers = [];

$(document).ready(function () {
    //Chargement des lien de pagination
    generatePageLinks();
    //Chargement de la permière page
    loadPage(1);

    $("body").on('click', ".noPage", function () {
        var id = event.target.id;
        var noPage = id.slice(8, id.length);
        loadPage(noPage);
    });

    $('.collapse').on('show.bs.collapse', function () {
        if (!creating) {
            if (coll) {
                coll = false;
                var id = "#" + (this.id);
                $('#navTrips .collapse').not(id).collapse("hide");
                coll = true;
            }
        }
    });

    $("body").on("click", ".waypoitLink", function () {
        var id = event.target.id;
        var ref = id.slice(6, id.length);

        LoadDetails(ref);
        closeRight(true);
        openLeft();
    });
});

function loadPage(idPage) {
    unsetPageDisplay();
    $.ajax({
        type: 'post',
        url: './AJAX/navigationData.php',
        data: {getPageContent: true, pageNo: idPage},
        success: function (response) {
            var data = JSON.parse(response);
            generateTripPanels(data);
            drawNavPath(data);
            drawMarkers(data);
        }
    });
}
function generatePageLinks() {
    $.ajax({
        type: 'post',
        url: './AJAX/navigationData.php',
        data: {getPages: true},
        success: function (response) {
            for (i = 1; i <= Number(response); i++) {
                $("#pageNos").append('<button class="btn btn-link noPage" id="goToPage' + i + '">' + i + '</button>');
            }
        }
    });
}

function generateTripPanels(pageContent) {
    $("#TripPanels").html("");
    var count = 0;
    pageContent.forEach(function (trip) {
        var panel = '<div class="panel panel-default navPanelTrip" id="paneTrip' + count + '">\n\
                        <div class="panel-heading" role="tab" id="headingTrip' + count + '">\n\
                            <h4 class="panel-title">\n\
                                <a role="button" data-toggle="collapse" href="#collapseTrip' + count + '" aria-expanded="true" aria-controls="collapseTrip' + count + '" class="trigger collapsed">\n\
                                    ' + trip.tpTitle + '\n\
                                </a>\n\
                            </h4>\n\
                        </div>\n\
                        <div id="collapseTrip' + count + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTrip' + count + '">\n\
                            <div class="panel-body">';
        trip.waypoints.forEach(function (wp) {
            panel += '<button id="wpLink' + wp.idWaypoint + '" class="list-group-item col-lg-12 text-left waypoitLink">\n\
                                    <i class="fa fa-globe"></i> ' + wp.wpTitle + '\n\
                                </button>';
        });

        panel += '</div></div></div>';
        $("#TripPanels").append(panel);
        $("#navTrips .collapse").collapse({toggle: false});
        count++;
    });
}

function drawNavPath(pageFullData) {
    var count = 0;
    pageFullData.forEach(function (trip) {
        var pathConstructor = JSON.parse(trip.pathConstructor);
        NavPaths[count] = new google.maps.Polyline(pathConstructor[0]);
        NavPaths[count].setMap(map);
        count++;
    });
}

function drawMarkers(pageFullData) {
    var countA = 0;
    pageFullData.forEach(function (trip) {
        var countB = 0;
        NavMarkers[count] = [];
        trip.waypoints.forEach(function (wp) {

            NavMarkers[countA][countB] = new google.maps.Marker({position: new google.maps.LatLng(wp.lat, wp.lng)});
            countB++;
        });
        countA++;
    });
}

function unsetPageDisplay() {
    NavMarkers.forEach(function (markerGroup) {
        markerGroup.forEach(function (marker) {
            marker.setMap(null);
        });
    });
    NavPaths.forEach(function (path) {
        path.setMap(null);
    });
}

function LoadDetails(tripId) {
    $.ajax({
        type: 'post',
        url: './AJAX/navigationData.php',
        data: {getWpDetails: true, wpId: tripId},
        success: function (response) {
            var result = JSON.parse(response);
            $("#wpTitle").html(result.wpTitle);
            $("#wpDate").html(result.wpDate);
            $("#wpComment").html(result.wpComment);
            $("#wpAddress").html(result.address);
            
            $("#carouselSection .carousel-indicators").html("");
            $("#carouselSection .carousel-inner").html("");

            if (result.media.length == 0) {
                $("#carouselSection").hide();
            } else {
                $("#carouselSection").show();
                var inc = 0;
                result.media.forEach(function (media) {
                    if (inc == 0) {
                        $("#carouselSection .carousel-indicators").html('<li data-target="#carouselWP" data-slide-to="'+inc+'" class="active"></li>');
                        $("#carouselSection .carousel-inner").html('<div class="item active"><img src="./usersRessources/image/'+media.mediaName+'" alt=""/></div>');
                    } else {
                        $("#carouselSection .carousel-indicators").append('<li data-target="#carouselWP" data-slide-to="'+inc+'"></li>');
                        $("#carouselSection .carousel-inner").append('<div class="item"><img src="./usersRessources/image/'+media.mediaName+'" alt=""/></div>');
                    }
                    inc++;
                });
            }

            console.log(result);
        }
    });
}

