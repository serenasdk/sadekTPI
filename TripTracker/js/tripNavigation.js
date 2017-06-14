/* 
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * 
 * Les fonctions de cette page concernent la nagigation parmis les voyages, 
 * de l'affichage au chargement des données
 */
var ActivePanelId = null;

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
        generatePageLinks();
    });

    //$("body").click();

    $("body").on('show.bs.collapse', '.collapse', function () {
        if (!creating) {
            if (typeof $($(event.target).parent()).attr("id") !== "undefined") {
                var id = $(event.target).parent().attr("id");
                var ref = id.slice(6, id.length);
                selectTab(ref);
            }

            if (coll) {
                if (typeof ref !== "undefined") {
                    ActivePanelId = ref;
                }
                coll = false;
                var id = "#" + (this.id);
                $('#navTrips .collapse').not(id).collapse("hide");
                coll = true;
            }
        }
    });

    $("body").on('hide.bs.collapse', '.collapse', function () {
        if (!creating) {
            ActivePanelId = null;
            showAllTrips();
            panOnAllTrips();
        }
    });

    $("body").on("click", ".waypoitLink", function () {
        var id = event.target.id;
        var ref = id.slice(6, id.length);
        findMarker(ref);
        LoadDetails(ref);
        closeRight(true);
        openLeft();
    });

    $("body").on("click", ".EditTrip", function () {
        var id = event.target.id;
        var ref = id.slice(4, id.length);
        if ((typeof NavPaths[ref]) !== "undefined") {
            OpenModif((NavPaths[ref].id));
        }
    });

    $("body").on("click", ".DeleteTrip", function () {
        var id = event.target.id;
        var ref = id.slice(6, id.length);
        var tripId = NavPaths[ref].id;
        var confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?");
        if (confirmation) {
            DeleteTrip(tripId);
        }
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
            panOnAllTrips();
        }
    });
}
function generatePageLinks() {
    $("#pageNos").html("");
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
    var panelClass = ["panel-default", "panel-success", "panel-info", "panel-warning", "panel-danger"];

    $("#TripPanels").html("");
    var count = 0;
    pageContent.forEach(function (trip) {
        var panel = '<div class="panel ' + panelClass[count] + ' navPanelTrip" id="paneTrip' + count + '">\n\
                        <div class="panel-heading" role="tab" id="headingTrip' + count + '">\n\
                            <h4 class="panel-title" id="Parent' + count + '">\n\
                                <a role="button" data-toggle="collapse" href="#collapseTrip' + count + '" aria-expanded="true" aria-controls="collapseTrip' + count + '" class="trigger collapsed">\n\
                                    ' + trip.tpTitle
                + '</a>\n\
                                <button type="button" id="Edit' + count + '" class="close pull-right EditTrip" aria-label="Edit" ' + count + '"><span  id="SEdi' + count + '" class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>\n\
                                <button type="button" id="Delete' + count + '" class="close pull-right DeleteTrip" aria-label="Delete" ' + count + '"><span  id="SDelet' + count + '" class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>\n\
                                </h4></div>\n\
                            </h4>\n\
                        </div>\n\
                        <div id="collapseTrip' + count + '" class="panel-collapse collapse navPanel" role="tabpanel" aria-labelledby="headingTrip' + count + '">\n\
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
    var color = ["#333333", "#3c763d", "#31708f", "#8a6d3b", "#a94442"];
    var inc = 0;
    pageFullData.forEach(function (trip) {
        var pathConstructor = JSON.parse(trip.pathConstructor);
        var Thiscolor = color[inc];
        NavPaths[inc] = new google.maps.Polyline(pathConstructor[0]);
        NavPaths[inc].setMap(map);
        NavPaths[inc].ref = inc;
        NavPaths[inc].id = trip.idTrip;
        NavPaths[inc].setOptions({strokeWeight: 7, strokeColor: Thiscolor});
        createPathClickEvent(inc);
        inc++;
    });
}

function createPathClickEvent(inc) {
    google.maps.event.addListener(NavPaths[inc], 'click', function () {
        selectTrip(inc);
    });
}

function drawMarkers(pageFullData) {
    var countA = 0;
    pageFullData.forEach(function (trip) {
        var countB = 0;
        NavMarkers[countA] = [];
        trip.waypoints.forEach(function (wp) {
            var position = new google.maps.LatLng(wp.lat, wp.lng);
            NavMarkers[countA][countB] = new google.maps.Marker({position: position});
            NavMarkers[countA][countB].ref = wp.idWaypoint;
            createMarkerClickEvent(wp.idWaypoint, countA, countB);
            countB++;
        });
        countA++;
    });
}

function createMarkerClickEvent(id, positionA, positionB) {
    google.maps.event.addListener(NavMarkers[positionA][positionB], 'click', function () {
        //alert(id);
        LoadDetails(id);
        closeRight(true);
        openLeft();
        panOnMarker(NavMarkers[positionA][positionB]);
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
    NavMarkers = [];
    NavPaths = [];
    $("#TripPanels").html("");
    $("#pageNos").html("");
}

function LoadDetails(tripId) {
    $("#carouselSection").html(
            '<div id="carouselWP" class="carousel slide" data-ride="carousel">\n\
                                <!-- Indicators -->\n\
                                <ol class="carousel-indicators">\n\
                                </ol>\n\
                                <!-- Wrapper for slides -->\n\
                                <div class="carousel-inner">\n\
                                    \n\
                                </div>\n\
                                <!-- Left and right controls -->\n\
                                <a class="left carousel-control" href="#carouselWP" data-slide="prev">\n\
                                    <span class="glyphicon glyphicon-chevron-left"></span>\n\
                                    <span class="sr-only">Previous</span>\n\
                                </a>\n\
                                <a class="right carousel-control" href="#carouselWP" data-slide="next">\n\
                                    <span class="glyphicon glyphicon-chevron-right"></span>\n\
                                    <span class="sr-only">Next</span>\n\
                                </a>\n\
                            </div>'
            );
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
                        $("#carouselSection .carousel-indicators").html('<li data-target="#carouselWP" data-slide-to="' + inc + '" class="active"></li>');
                        $("#carouselSection .carousel-inner").html('<div class="item active"><img src="./usersRessources/image/' + media.mediaName + '" alt=""/></div>');
                    } else {
                        $("#carouselSection .carousel-indicators").append('<li data-target="#carouselWP" data-slide-to="' + inc + '"></li>');
                        $("#carouselSection .carousel-inner").append('<div class="item"><img src="./usersRessources/image/' + media.mediaName + '" alt=""/></div>');
                    }
                    inc++;
                });
            }
        }
    });
    map.setZoom(10);
}

function selectTrip(tripPosition) {
    panOnTrip(tripPosition);
    ShowOnlyTrip(tripPosition);
    $("#collapseTrip" + tripPosition).collapse("show");
}

function selectTab(tripPosition) {
    panOnTrip(tripPosition);
    ShowOnlyTrip(tripPosition);
}

function panOnTrip(tripPosition) {
    var bounds = new google.maps.LatLngBounds();

    NavMarkers[tripPosition].forEach(function (marker) {
        bounds.extend(marker.getPosition());
    });
    map.fitBounds(bounds);

    var inc = 0;

    NavMarkers.forEach(function (markerGroup) {
        markerGroup.forEach(function (marker) {
            if (inc !== Number(tripPosition)) {
                marker.setMap(null);
            } else {
                marker.setMap(map);
            }

        });
        inc++;
    });
}

function panOnMarker(marker) {
    map.panTo(marker.position);
}

function ShowOnlyTrip(tripPosition) {
    var inc = 0;
    NavPaths.forEach(function (path) {
        if (inc == Number(tripPosition)) {

            path.setMap(map);
        } else {
            path.setMap(null);
        }
        inc++;
    });
}
function showAllTrips() {
    NavMarkers.forEach(function (markerGroup) {
        markerGroup.forEach(function (marker) {
            marker.setMap(null);
        });
    });

    NavPaths.forEach(function (path) {
        path.setMap(map);
    });
}

function panOnAllTrips(tripId) {
    var bounds = new google.maps.LatLngBounds();
    NavMarkers.forEach(function (markerGroup) {
        markerGroup.forEach(function (marker) {
            bounds.extend(marker.getPosition());
        });
    });
    map.fitBounds(bounds);
}

function findMarker(markerId) {
    NavMarkers.forEach(function (markerGroup) {
        markerGroup.forEach(function (marker) {
            if (Number(markerId) == Number(marker.ref)) {
                panOnMarker(marker);
            }
        });
    });
}

function DeleteTrip(tripId) {
    $.ajax({
        type: 'post',
        url: './AJAX/DataInsertModif.php',
        data: {deleteTrip: true, idToDelete: tripId},
        success: function (response) {
            console.log(response);
            generatePageLinks();
            loadPage(1);
        }
    });
}