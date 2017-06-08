/* 
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * Les fonctions de cette page concernent le traitement, le formatage et l'envoi
 * des informations rentrées par l'utilsiateur dans le formulaire d'ajour de 
 * voyage.
 */
var regExpDate = new RegExp(/^(((0[1-9]|[12][0-9]|30)[-\/]?(0[13-9]|1[012])|31[-\/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-\/]?02)[-\/]?[0-9]{4}|29[-\/]?02[-\/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/);

$(document).ready(function () {

    $("#SubmitNewTrip").click(function () {
        getInformations();
    });

    /**
     * Récupère les informations rentrée par l'utilisateur 
     * dans le formulaire d'ajout de voyage
     * @returns {undefined}
     */
    function getInformations() {
        if (count >= 2) {
            var name = "#insert";
            var content = [];
            for (var flag = 0; flag < Number(count); flag++) {
                if ($("#insert" + flag).length !== 0) {
                    content.push([]);
                    content[content.length - 1].ref = flag;
                    content[content.length - 1].title = $("#title" + flag).val();
                    content[content.length - 1].adress = $("#adress" + flag).val();
                    content[content.length - 1].date = $("#date" + flag).val();
                    content[content.length - 1].comment = $("#comment" + flag).val();
                }
                if (count == flag + 1) {
                    checkInformations(content);
                    break;
                }
            }
        }
    }

    /**
     * Véfifie la validité des informations contenues dans le paramètre
     * @param {type} content
     * @returns {undefined}
     */
    function checkInformations(content) {
        var i = 0;

        var ok = true;

        content.forEach(function (element) {
            var hasError = false;

            ///     VERIFICATION DE LA DATE

            if (!regExpDate.test(element.date)) {
                //Si le format de la date n'est pas correcte;
                $("#Pdate" + element.ref).addClass("has-error");
                hasError = true;
            } else if (i > 0 && regExpDate.test(content[i - 1].date)) {
                //Si la date de l'étape est antérieure à celle de la précédente
                var dateComponent1 = content[i - 1].date.split('/', 3);
                var dateComponent2 = element.date.split('/', 3);

                var date1 = new Date(dateComponent1[2], dateComponent1[1], dateComponent1[0]);
                var date2 = new Date(dateComponent2[2], dateComponent2[1], dateComponent2[0]);

                if (date1 > date2) {
                    $("#Pdate" + element.ref).addClass("has-error");
                    hasError = true;
                } else {
                    $("#Pdate" + element.ref).removeClass("has-error");
                }
            } else {
                $("#Pdate" + element.ref).removeClass("has-error");
            }


            ///     VERIFICATION DU COMMENTAIRE

            if (element.comment.length == 0) {
                hasError = true;
                $("#Pcomment" + element.ref).addClass("has-error");
            } else {
                $("#Pcomment" + element.ref).removeClass("has-error");
            }

            ///     VERIFICATION DU TITRE

            if (element.title.length == 0) {
                hasError = true;
                $("#Ptitle" + element.ref).addClass("has-error");
            } else {
                $("#Ptitle" + element.ref).removeClass("has-error");
            }

            if (hasError) {
                $("#insert" + element.ref).removeClass("panel-default");
                $("#insert" + element.ref).addClass("panel-danger");
                ok = false;
            } else {
                $("#insert" + element.ref).addClass("panel-default");
                $("#insert" + element.ref).removeClass("panel-danger");
            }
            i++;
        });
        areAllPointSet(content, ok, 0);
    }

    /**
     * Vérifie si un tracé a pu être trouvé entre tout les points
     * @returns {undefined}
     */
    function areAllPointSet(content, ok, inc) {
        creationMarkers.forEach(function (element) {
            if ($("#insert" + inc).length !== 0) {
                if (element == "none") {
                    $("#Padress" + inc).addClass("has-error");
                    ok = false;

                } else {
                    $("#Padress" + inc).removeClass("has-error");
                }
            }
            if (inc == creationMarkers.length - 1 && ok) {
                renderDirectionsPolylines(content);
            }
            inc++;
        });
    }

    /*
     * Genère le constructeur d'une Polyline devant correspondre au tracé de 
     * l'utilisateur
     */
    function renderDirectionsPolylines(content) {
        var points = [];
        var inc = 0;
        creationRoutes.forEach(function (response) {
            if (typeof response == "object") {
                if (points.length != 0) {
                    points = points.concat(response.route.routes[0].legs[0].steps);
                    if (inc == creationRoutes.length - 1) {
                        serializePath(points, content);
                    }
                } else {
                    points = response.route.routes[0].legs[0].steps;
                }
            } else {
                if (inc == creationRoutes.length - 1) {
                    serializePath(points, content);
                }
            }
            inc++;
        });
    }

    function serializePath(Polylines, content) {
        var PathString = "[";

        var countA = 0;
        Polylines.forEach(function (polyline) {

            if (countA !== 0) {
                PathString += ",";
            }

            PathString += "{\"map\": null,\"paths\": [";
            countA++;

            var countB = 0;
            var path = polyline.path;

            path.forEach(function (point) {

                if (countB !== 0) {
                    PathString += ",";
                }

                countB++;

                PathString += "{\"lat\": " + point.lat() + ",\"lng\": " + point.lng() + "}";
            });
            PathString += "]}";
        });
        PathString += "]";
        SaveInformations(PathString, content);
    }

    /*
     * Enregistre les informations dans la base de donnée et enregistre le chemin
     * dans un fichier texte, stocké sur le serveur. Toute ses oppérations se font
     * sous forme de transaction : si une étape n'est pas effectuée correctement, 
     * rien ne sera enregistré ni sur le serveur, ni sur la base de donnée
     */
    function SaveInformations(path, content) {
        console.log(content);
        console.log(JSON.stringify(content));
        console.log(JSON.parse(content));
        $.ajax({//On demande à la base de donnée de vérifier les informations de l'utilisateur
            type: 'post', //La methode poste empèche l'utilisateur d'accéder lui-même au contenu de la base de donnée
            url: './AJAX/DataInsertModif.php',
            data: {path: path, content: JSON.stringify(content), insert: true},
            success: function (response) {
                console.log(response);
            }
        });
    }
});


