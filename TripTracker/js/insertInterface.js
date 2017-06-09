/* 
 * SADEK Serena
 * Juin 2017
 * TripTracker
 * Toute les fonctions reliées à l'onglet permettant l'insertion de voyage
 */

var InsertionElements = [];
var count = 0;
var coll = true;
var focus = null;

$(document).ready(function () {

    $("#AddState").click(function () {
        creationMarkers.push("none");
        if (count > 0) {
            creationRoutes.push("none");
        }
        var nowDate = new Date();
        var date = nowDate.toLocaleDateString();
        var length = count;
        count++;
        $("#InsertionContent").append(
                '<div class="panel panel-default" id="insert' + length + '">'
                + '<div class="panel-heading" role="tab" id="headInsert' + length + '">'
                + '<h4 class="panel-title">'
                + '<a role="button" data-toggle="collapse" id="TripName' + length + '" href="#content' + length + '" aria-expanded="true" aria-controls="content' + length + '" class="trigger collapsed">[Insérer un titre]</a>'
                + '<button type="button" id="Close' + length + '" class="close pull-right closeInsertionPanel" aria-label="Close" ' + length + '">&times;</button></h4></div>'
                + '<div id="content' + length + '" class="panel-collapse collapse" role="tabpane' + length + '" aria-labelledby="headInsert' + length + '">'
                + '<div class="panel-body">'
                + '<ul class="list-group">'
                + '<li class="list-group-item">' //\n\
                + '<!-- Titre à modifier -->\n\
                        <div class="form-group">\n\
                            <i class="glyphicon glyphicon-flag col-lg-1"></i>\n\
                            <div id="Ptitle' + length + '" class="input-group col-lg-11">\n\
                                <input type="text" id="title' + length + '" class="form-control titleControl" placeholder="Titre de L\'étape">\n\
                            </div>\n\
                        </div>\n\
                        <!-- Recherche d\'adresse -->\n\
                        <div class="form-group">\n\
                            <i class="glyphicon glyphicon-map-marker col-lg-1"></i>\n\
                            <div id="Padress' + length + '" class="input-group col-lg-11">\n\
                                <input type="text" id="adress' + length + '" class="form-control" placeholder="Adresse de l\'étape">\n\
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
                                <input id="date' + length + '" type="text" value="' + date + '" readonly class="form_date col-lg-12 form-control">\n\
                            </div>\n\
                        </div>'
                + '</li>'
                + '<li class="list-group-item">'
                + '<p>Ici le composant pour ajouter les images</p>' //Ajout des images
                + '</li>'
                + '</ul>'
                + '<div id="Pcomment' + length + '" class="form-group"><textarea class="form-control col-lg-10" offset="" rows="15" id="comment' + length + '"></textarea></div>'
                + '</div></div></div>'
                );
        var name = '#content' + length;
        $(name).collapse({toggle: false});
        $("#date" + length).datetimepicker({format: 'dd/mm/yyyy', startView: 'month',
            minView: 'month',
            autoclose: true});
    });

    $('#QuitCreation').click(function () {
        alert("close");
        closeInsertInterface();
    });
    
    

    $('body').on('click', '.closeInsertionPanel', function () {
        var id = event.target.id;
        var position = id.substring(5, id.length);
        var DeleteItemID = "#insert" + position;
        $(DeleteItemID).remove();
        if (position == focus) {
            focus = null;
        }
        if (creationMarkers[position] !== "none" && creationMarkers[position] !== null) {
            creationMarkers[position].setMap(null);
        }
        creationMarkers[position] = null;

        suppressRoadsOfDot(position);
    });

    $('body').on('click', '.searchLoc', function () {
        var id = event.target.id;
        var ref = id.substring(7, id.length);
        var source = "#adress" + ref;
        var address = $(source).val();
        if (address.length > 0) {
            getPositionFromAdresse(address);
        }
    });

    $('body').on('click', '.searchMyLoc', function () {
        geoLocation();
    });

    $('body').on('show.bs.collapse', '#InsertionContent .collapse', function () {
        if (coll) {
            coll = false;
            var id = "#" + (this.id);
            $('#InsertionContent .collapse').not(id).collapse("hide");
            coll = true;
            focus = id.substring(8, id.length);
        }
    });

    $('body').on('hide.bs.collapse', '#InsertionContent .collapse', function () {
        if (coll) {
            focus = null;
        }
    });

    $('body').on('change', '.titleControl', function () {
        var id = event.target.id;
        var target = "#TripName" + id.substring(5, id.length);
        var value = event.target.value;
        if (value.length > 1) {
            $(target).html(value);
        }
        else {
            $(target).html("[Insérer un titre]");
        }
    });
});



function closeInsertInterface() {
        focus = null;
        var countA = 0;
        creationMarkers.forEach(function (element) {
            if (typeof element == "object") {
                element.setMap(null);
            }
            if (countA == creationMarkers.length - 1) {
                creationMarkers = [];
            }
            countA++;
        });
        var countB = 0;
        creationRoutes.forEach(function (element) {
            if (typeof element == "object") {
                element.display.setMap(null);
            }
            if (countB == creationRoutes.length - 1) {
                creationRoutes = [];
            }
            countB++;
        });

        $('#InsertionErrorSection').html('');
        $('#InsertionContent').html('');
        $('#InsertionErrorSection').removeClass('alert');
        $('#InsertionErrorSection').removeClass('alert-success');
        closeAdd(false);
        openRight();
    }