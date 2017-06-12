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
});

function loadPage(idPage) {
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
            panel += '<a href="#" class="list-group-item">\n\
                                    <i class="fa fa-globe"></i> ' + wp.wpTitle + '\n\
                                </a>';
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

function drawMarkers(pageFullData){
     var countA = 0;
    pageFullData.forEach(function (trip) {
        var countB = 0;
        NavMarkers[count] = [];
        trip.waypoints.forEach(function(wp){
            NavMarkers[countA][countB] = new google.maps.Marker({position: new google.maps.LatLng(wp.lat, wp.lng)});
            countB++;
        });
        countA++;
    });
}
