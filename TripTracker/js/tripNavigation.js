/* 
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * tripNaviagtion.js
 * 
 * Les fonctions de cette page concernent la nagigation parmis les voyages, 
 * de l'affichage au chargement des données
 */

//Voyage actif lors de l'apperçu
var ActivePanelId = null;

//
var NavPaths = [];
var NavMarkers = [];

$(document).ready(function () {
    //Chargement des lien de pagination
    generatePageLinks();
    //Chargement de la permière page
    loadPage(1);

    $("#BackToNav").click(function(){
        closeLeft(false);
        openRight();
    });

    /*
     * Évènement click sur un lien (numéro de page), généré automatiquement
     */
    $("body").on('click', ".noPage", function () {
        var id = event.target.id;
        var noPage = id.slice(8, id.length);
        if (!isNaN(noPage)) {
            loadPage(noPage);
            generatePageLinks();
        }
    });

    /*
     * Évènement à l'ouverture des paneaux dynamiques de navigation
     */
    $("body").on('show.bs.collapse', '.collapse', function () {
        if (!creating) {
            if (typeof $($(event.target).parent()).attr("id") !== "undefined") {
                var id = $(event.target).parent().attr("id");
                var ref = id.slice(6, id.length);
                if (!isNaN(ref) && ref >= 0 && ref < 5) {
                    selectTab(ref);
                }
            }

            if (coll) { //Si l'évènement n'est pas lui-même appellé par un évènement collapse
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

    /*
     * Évènement à la fermeture des paneaux dynamiques de navigation
     */
    $("body").on('hide.bs.collapse', '.collapse', function () {
        if (!creating) {
            ActivePanelId = null;
            showAllTrips();
            panOnAllTrips();
        }
    });

    /**
     * Évènement lors de la sélécation d'un lien désignant une étape
     */
    $("body").on("click", ".waypoitLink", function () {
        var id = event.target.id;
        var ref = id.slice(6, id.length);
        if (!isNaN(ref)) {
            LoadDetails(ref);
        }
    });

    /**
     * Évènement click des icone de stylo présents à droite des panneau de navigation
     */
    $("body").on("click", ".EditTrip", function () {
        var id = event.target.id;
        var ref = id.slice(4, id.length);
        if (!isNaN(ref)) {
            if (ref >= 0 && ref < 5) {
                if ((typeof NavPaths[ref]) !== "undefined") {
                    OpenModif((NavPaths[ref].id));
                }
            }
        }
    });

    /**
     * Évènement click des icone de boubelle présents à droite des panneaux de navigation
     */
    $("body").on("click", ".DeleteTrip", function () {
        var id = event.target.id;
        var ref = id.slice(6, id.length);
        if (!isNaN(ref)) {
            if (ref >= 0 && ref < 5) {
                if (typeof NavPaths[ref] !== "undefined") {
                    var tripId = NavPaths[ref].id;
                    var confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?");
                    if (confirmation) {
                        DeleteTrip(tripId);
                    }
                }
            }
        }
    });
});

/**
 * Charge et génère le contenu d'une nouvelle page
 * @param {type} idPage
 * @returns {undefined}
 */
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
/**
 * Charge et génère les liens menant aux différentes pages
 * @returns {undefined}
 */
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

/**
 * Génère les panneaux de navigation avec un code de couleur, à partir des informations passées en paramètre
 * @param {type} pageContent
 * @returns {undefined}
 */
function generateTripPanels(pageContent) {
    //Gris, vert, bleu, jaune, rouge 
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

/*
 * Génère les tracés des informations passées en paramètres, avec un code de couleur 
 */
function drawNavPath(pageFullData) {
    //Gris, vert, bleu, jaune, rouge 
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

/**
 * Rend le tracé d'index donné clickable
 * @param {type} inc
 * @returns {undefined}
 */
function createPathClickEvent(inc) {
    google.maps.event.addListener(NavPaths[inc], 'click', function () {
        selectTrip(inc);
    });
}

/**
 * Crée des marqueurs cachés pour chaque étape des informations données
 * @param {type} pageFullData
 * @returns {undefined}
 */
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

/**
 * Rend les marqueur de l'étape donnée, du voyage donné, clickable.
 * @param {type} id
 * @param {type} positionA : Index du voyage
 * @param {type} positionB : Index de l'étape
 * @returns {undefined}
 */
function createMarkerClickEvent(id, positionA, positionB) {
    google.maps.event.addListener(NavMarkers[positionA][positionB], 'click', function () {
        LoadDetails(id);
        panOnMarker(NavMarkers[positionA][positionB]);
    });
}

/**
 * Réinitialise l'affichage de la navigation
 * @returns {undefined}
 */
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

/**
 * Charge le contenu détaillé de l'étape dans le panneau de droite. Génère 
 * également le carousel si le voyage contient une image
 * @param {type} tripId
 * @returns {undefined}
 */
function LoadDetails(tripId) {
    $.ajax({
        type: 'post',
        url: './AJAX/navigationData.php',
        data: {getWpDetails: true, wpId: tripId},
        success: function (response) {
            if (response !== "noResult") {
                var currentZoom = map.getZoom();
                if (currentZoom>=10) {
                    map.setZoom(17);
                }else{
                    map.setZoom(10);
                }
                
                closeRight(true);
                openLeft();
                findMarker(tripId);
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
        }
    });
}

/**
 * Met le focus le voyage à l'index donné lorsque c'est l'évènement click du tracé
 * qui le déclenche
 * @param {type} tripPosition
 * @returns {undefined}
 */
function selectTrip(tripPosition) {
    panOnTrip(tripPosition);
    ShowOnlyTrip(tripPosition);
    $("#collapseTrip" + tripPosition).collapse("show");
}

/**
 * Met le focus le voyage à l'index donné lorsque c'est l'évènement click de 
 * l'onglet qui le déclenche
 * @param {type} tripPosition
 * @returns {undefined}
 */
function selectTab(tripPosition) {
    panOnTrip(tripPosition);
    ShowOnlyTrip(tripPosition);
}

/**
 * Règle le zoom et le centre de la map de telle sorte à ce qu'elle contienne tout juste tout les marqueurs de la map
 * @param {type} tripPosition
 * @returns {undefined}
 */
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

/**
 * Centre la map sur le marque donné
 * @param {type} marker
 * @returns {undefined}
 */
function panOnMarker(marker) {
    map.panTo(marker.position);
}

/**
 * Cache les tracés de tout les voyage sauf celui du voyage à l'index donné
 * @param {type} tripPosition
 * @returns {undefined}111
 */
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
/**
 * Montre tout les tracés et cache tout les marqueurs
 * @returns {undefined}
 */
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

/**
 * Règele le zoom et le centre de la map de telle sorte à ce qu'elle puisse tout
 * juste contenir tout les voyage de la page
 * @param {type} tripId
 * @returns {undefined}
 */
function panOnAllTrips(tripId) {
    var bounds = new google.maps.LatLngBounds();
    NavMarkers.forEach(function (markerGroup) {
        markerGroup.forEach(function (marker) {
            bounds.extend(marker.getPosition());
        });
    });
    map.fitBounds(bounds);
}

/**
 * Cherche parmi tout les marqueur de tout les voyages de la page celui qui 
 * correspond à l'id sélectionné.
 * @param {type} markerId
 * @returns {undefined}
 */
function findMarker(markerId) {
    NavMarkers.forEach(function (markerGroup) {
        markerGroup.forEach(function (marker) {
            if (Number(markerId) == Number(marker.ref)) {
                panOnMarker(marker);
            }
        });
    });
}

/**
 * Supprime le voyage de l'id sélectionné.
 * @param {type} tripId
 * @returns {undefined}
 */
function DeleteTrip(tripId) {
    $.ajax({
        type: 'post',
        url: './AJAX/DataInsertModif.php',
        data: {deleteTrip: true, idToDelete: tripId},
        success: function (response) {
            generatePageLinks();
            loadPage(1);
        }
    });
}