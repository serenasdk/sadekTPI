/* 
 * SADEK Serena
 * Juin 2017
 * TripTracker
 * modifPlugin.js
 * 
 * Ces fonctionalité s'ajoutent à celles du fichier insertInterface. Les 
 * fonctionalité ajoutée permettent le chargement et la modification des 
 * fichiers ajoutés
 */


/**
 * Ouvre l'interface de cération en mode modification.
 * @param {type} tripId
 * @returns {undefined}
 */
function OpenModif(tripId) {
    var height = $(window).height() - 50 - 37 - 7;
    $('#navInsert .insertPanel').css("max-height", height);
    LoadModifTrip(tripId);

}

/**
 * Charge les informations complètes du voyage 
 * @param {type} tripId
 * @returns {undefined}
 */
function LoadModifTrip(tripId) {
    $.ajax({
        type: 'post',
        url: './AJAX/navigationData.php',
        data: {loadTripModif: true, tripId: tripId, getPreviewConfig: true},
        success: function (response) {
            if (response !== "noResult") {
                editing = tripId;
                closeRight(false);
                openAdd();
                var data = JSON.parse(response);
                generateContent(data);
            }
        }
    });
}

/**
 * Gènère des panneaux dans l'ingerface de modification avec les informations données
 * @param {type} data
 * @returns {undefined}
 */
function generateContent(data) {
    $("#titleTrip").val(data.trip.tpTitle);

    var inc = 0;
    data.waypoints.forEach(function (waypoint) {
        createPanelWithData(waypoint);
        PlaceWaypoint(waypoint, inc);
        inc++;
    });
    
    var inc2 = 0;
    creationMarkers.forEach(function(wp){
        TracePreviousRoad(inc2);
        inc2++;
    });
    
    PanOnCreationTrip();
}

function createPanelWithData(wpData) {
    //Crée un marqueueur non défini
    creationMarkers.push("none");

    //Crée une route non défini
    if (count > 0) { //Si ce n'est pas le premier marqueur
        creationRoutes.push("none");
    }

    var length = count;

    //Incrémente le compteur
    count++;

    //Code du pannel
    $("#InsertionContent").append(
            '<div class="panel panel-default" id="insert' + length + '">'
            + '<div class="panel-heading" role="tab" id="headInsert' + length + '">'
            + '<h4 class="panel-title">'
            + '<a role="button" data-toggle="collapse" id="TripName' + length + '" href="#content' + length + '" aria-expanded="true" aria-controls="content' + length + '" class="trigger collapsed">' + wpData.wpTitle + '</a>'
            + '<button type="button" id="Close' + length + '" class="close pull-right closeInsertionPanel" aria-label="Close" ' + length + '">&times;</button></h4></div>'
            + '<div id="content' + length + '" class="panel-collapse collapse" role="tabpane' + length + '" aria-labelledby="headInsert' + length + '">'
            + '<div class="panel-body">'
            + '<ul class="list-group">'
            + '<li class="list-group-item">' //\n\
            + '<!-- Titre à modifier -->\n\
                        <div class="form-group">\n\
                            <i class="glyphicon glyphicon-flag col-lg-1"></i>\n\
                            <div id="Ptitle' + length + '" class="input-group col-lg-11">\n\
                                <input type="text" maxlength="30" id="title' + length + '" value="' + wpData.wpTitle + '" class="form-control titleControl" placeholder="Titre de L\'étape">\n\
                            </div>\n\
                        </div>\n\
                        <!-- Recherche d\'adresse -->\n\
                        <div class="form-group">\n\
                            <i class="glyphicon glyphicon-map-marker col-lg-1"></i>\n\
                            <div id="Padress' + length + '" class="input-group col-lg-11">\n\
                                <input type="text" value="' + wpData.address + '" id="adress' + length + '" class="form-control" placeholder="Adresse de l\'étape">\n\
                                <div class="input-group-btn">\n\
                                    <button class="btn btn-default searchLoc" id="secfind' + length + '"><i id="findLoc' + length + '" class="glyphicon glyphicon-search col-lg-1"></i></button>\n\
                                    <button class="btn btn-default searchMyLoc" id="secMyLc' + length + '"><i  id="MyLoc' + length + '" class="glyphicon glyphicon-screenshot col-lg-1"></i></button>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <!-- Selection de la date -->\n\
                        <div class="form-group">\n\
                            <i class="glyphicon glyphicon-time col-lg-1"></i>\n\
                            <div id="Pdate' + length + '" class="input-group col-lg-11">\n\
                                <input id="date' + length + '" type="text" value="' + wpData.wpDate + '" readonly class="form_date col-lg-12 form-control">\n\
                            </div>\n\
                        </div>'
            + '</li>'
            + '<li class="list-group-item">'
            + '<input id="picSelect' + length + '" name="picSelect' + length + '[]" type="file" multiple class="file-loading">' //Ajout des images
            + '</li>'
            + '</ul>'
            + '<div id="Pcomment' + length + '" class="form-group"><textarea class="form-control col-lg-10" offset="" rows="15" id="comment' + length + '">' + wpData.wpComment + '</textarea></div>\n\
                </div></div></div>');
    var name = '#content' + length;
    //Initialise la variable définissant l'ouverture du panel
    $(name).collapse({toggle: false});

    //Initialise le DateTimePicker avec la date du jour
    $("#date" + length).datetimepicker({format: 'dd/mm/yyyy', startView: 'month',
        minView: 'month',
        autoclose: true});

    var dataLength = wpData.media.length;
    var showDelete = dataLength > 0;
    //Initialise le fileINput
    $("#picSelect" + length).fileinput({
        previewFileType: "image",
        browseClass: "btn btn-default custom",
        browseLabel: "",
        browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
        removeClass: "btn btn-default customRem",
        removeLabel: "",
        removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
        uploadUrl: './AJAX/PictureInsertModif.php',
        uploadExtraData: {
            idState: length,
            insert: true,
            idWp: wpData.idWaypoint
        }, // server upload action ?idState=' + length+"&insert=true"
        deleteUrl: './AJAX/PictureInsertModif.php',
        deleteExtraData: {
            idState: length,
            DeleteExisting: true,
            idWp: wpData.idWaypoint
        },
        uploadAsync: false,
        showUpload: false,
        initialPreview: wpData.media,
        initialPreviewConfig: wpData.mediaConstruct,
        initialPreviewAsData: true,
        append: true,
        overwriteInitial: false,
        initialPreviewCount: dataLength,
        initialPreviewShowDelete: true,
        showRemove: showDelete,
        maxFileSize: 700.0,
        maxFileCount: 9,
        validateInitialCount: true,
        msgFilesTooMany: "Vous ne pouvez pas insérer plus de {n} images par étape",
        msgSizeTooLarge: "L'image {name} dépasse la limite de taille autorisée ({maxSize}Ko)",
        allowedFileTypes: ["image"],
        msgInvalidFileType: "Le fichier {name} n'est pas une image"
    });
}

/**
 * Genère les marqueurs dans l'interface selon les informations données.
 * @param {type} wpData
 * @param {type} inc
 * @returns {undefined}
 */
function PlaceWaypoint(wpData, inc) {
    var location = new google.maps.LatLng(wpData.lat, wpData.lng);

    creationMarkers[inc] = new google.maps.Marker({
        position: location,
        map: map
    });

    creationMarkers[inc].address = wpData.address;
    creationMarkers[inc].id = wpData.idWaypoint;

    //TracePreviousRoad(inc);
}