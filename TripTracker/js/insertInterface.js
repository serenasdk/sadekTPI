/* 
 * SADEK Serena
 * Juin 2017
 * TripTracker
 * 
 * Toute les fonctions reliées à l'onglet permettant l'insertion de voyage
 */

var InsertionElements = [];

//Compteur d'onglet générés
var count = 0;

//Indique si on est en train de fermer manuellement un panel
var coll = true;

//Valeur numérique ou nulle indiquant l'onglet qui est ouvert
var focus = null;

$(document).ready(function () {

    /**
     * Evenèement click du bouton "Ajouter une étape"
     * Genère un onglet pré-fabriqué, mais unique grâce à la variable count
     */
    $("#AddState").click(function () {
        //Crée un marqueueur non défini
        creationMarkers.push("none");

        //Crée une route non défini
        if (count > 0) { //Si ce n'est pas le premier marqueur
            creationRoutes.push("none");
        }

        var nowDate = new Date();
        var date = nowDate.toLocaleDateString();
        var length = count;

        //Incrémente le compteur
        count++;

        //Code du pannel
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
                + '<input id="picSelect' + length + '" name="picSelect' + length + '[]" type="file" multiple class="file-loading">' //Ajout des images
                + '</li>'
                + '</ul>'
                + '<div id="Pcomment' + length + '" class="form-group"><textarea class="form-control col-lg-10" offset="" rows="15" id="comment' + length + '"></textarea></div>'
                + '</div></div></div>'
                );
        var name = '#content' + length;
        //Initialise la variable définissant l'ouverture du panel
        $(name).collapse({toggle: false});

        //Initialise le DateTimePicker avec la date du jour
        $("#date" + length).datetimepicker({format: 'dd/mm/yyyy', startView: 'month',
            minView: 'month',
            autoclose: true});

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
                insert: true
            }, // server upload action ?idState=' + length+"&insert=true"
            uploadAsync: false,
            showUpload: false
        });
        $('#insert' + length +" .collapse").collapse("show");
    });

    //Défini l'évènement de suppression commandé par la croix
    $('#QuitCreation').click(function () {
        var confirmation = confirm("Voulez-vous vraiment quitter l'interface de création ?");
        if (confirmation) {
            closeInsertInterface();
        }
    });


    /**
     * Evènement déclenché par la croix d'un panel dynamique
     * Commande la suppression de ce panel
     */
    $('body').on('click', '.closeInsertionPanel', function () {
        var confirmation = confirm("Voulez-vous vraiment supprimer cette étape ?");
        if (confirmation) {
            //Récupèration de l'id de la cible
        var id = event.target.id;
        //Récupèraction du numéro du panel
        var position = id.substring(5, id.length);
        //Génération de l'id du panel
        var DeleteItemID = "#insert" + position;
        //Suppression du panel
        $(DeleteItemID).remove();
        if (position == focus) {
            //Le focus ne doit pas rester sur un panel supprimé
            focus = null;
        }
        //Masquer le marqueur si il est défini
        if (creationMarkers[position] !== "none" && creationMarkers[position] !== null) {
            creationMarkers[position].setMap(null);
        }
        //Supprimer le marqueur
        creationMarkers[position] = null;

        //Supprimer les routes liées à cette étape
        suppressRoadsOfDot(position);
        }
    });

    /**
     * Évenement généré par l'évènement click du bouton loupe, à droite du champ
     * d'adresse.
     * Cherche la position corespondant à l'adresse, et si elle existe, génère
     * un marqueur, corrige l'addresse et trace les éventuelles route qui le
     * relie aux autres marqueurs.
     */
    $('body').on('click', '.searchLoc', function () {
        var id = event.target.id;
        var ref = id.substring(7, id.length);
        var source = "#adress" + ref;
        var address = $(source).val();
        if (address.length > 0) {
            getPositionFromAdresse(address);
        }
    });

    /**
     * Évenement généré par l'évènement click du bouton cible, à droite du champ
     * d'adresse.
     * Géolocalise l'utilisateur et genère le marqueur, l'adresse et les 
     * éventuelles routes liés à cette localisation.
     */
    $('body').on('click', '.searchMyLoc', function () {
        geoLocation();
    });

    /**
     * Empêche l'utilisateur d'avoir plus d'un onglet ouver à la fois
     */
    $('body').on('show.bs.collapse', '#InsertionContent .collapse', function () {
        /*Vu que l'évènement se déclenche lui-même, il a le potentiel de 
         * Déclencher une boucle infini. La variable coll est donc nécessaire 
         * pour que l'évenement agisse différement s'il est appellé par une 
         * action de l'utilisateur ou s'il est appelé par lui même*/
        if (creating) {
            if (coll) { //L'évenèment est-il appelé par une action ?
                //Le prochain ne le sera pas
                coll = false;
                var id = "#" + (this.id);
                //Fermer tout les onglets qui ne sont pas la target.
                $('#InsertionContent .collapse').not(id).collapse("hide");

                //Les prochain evènement seront une action
                coll = true;

                //Changement de focus
                focus = id.substring(8, id.length);
            }
        }

    });

    /**
     * met le focus à null si une autre fenêtre n'est pas ouverte à la vollée.
     */
    $('body').on('hide.bs.collapse', '#InsertionContent .collapse', function () {
        if (coll) {
            focus = null;
        }
    });

    /**
     * Met à jour l'entête du paneau par raport à son champ de titre
     */
    $('body').on('change', '.titleControl', function () {
        var id = event.target.id;
        var target = "#TripName" + id.substring(5, id.length);
        var value = event.target.value;
        if (value.length > 1) {
            $(target).html(value);
        }
        else {
            //Si le champ titre est vide, on remet l'entête par défaut
            $(target).html("[Insérer un titre]");
        }
    }
    );
});


/**
 * Ferme correctement l'interface de création, en supprimant son contenu et en
 * réinitialisant les variables qui lui sont liés.
 * @returns {undefined}
 */
function closeInsertInterface() {
    //Réinitalisation du focus
    focus = null;
    var countA = 0;

    //Suppression et annulation de l'affichage de chaque marqueur 
    creationMarkers.forEach(function (element) {
        if (typeof element == "object" && element !== null) {
            element.setMap(null);
        }
        if (countA == creationMarkers.length - 1) {
            creationMarkers = [];
        }
        countA++;
    });
    var countB = 0;
    //Suppression et annulation de l'affichage de chaque route
    creationRoutes.forEach(function (element) {
        if (typeof element == "object" && element !== null) {
            element.display.setMap(null);
        }
        if (countB == creationRoutes.length - 1) {
            creationRoutes = [];
        }
        countB++;
    });

    //Vides les champs qui ne sont pas supprimés
    $('#titleTrip').val('');
    $('#InsertionErrorSection').html('');
    $('#InsertionContent').html('');
    $('#InsertionErrorSection').removeClass('alert');
    $('#InsertionErrorSection').removeClass('alert-success');

    //Fermeture de l'interface de création
    closeAdd(false);
    creating = false;
    editing = null;
    
    //Rechargement des numéro de page
    generatePageLinks();
    
    //Rechargement de la première page
    loadPage(1);

    //Réouverture de la navigation
    openRight();
}