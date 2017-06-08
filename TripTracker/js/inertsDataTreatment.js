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
                    console.log(content);
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
                console.log(element.date);
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
            }
            else {
                $("#insert" + element.ref).addClass("panel-default");
                $("#insert" + element.ref).removeClass("panel-danger");
            }
            i++;
        });

        if (ok) {
            areAllPointSet(content);
        }
    }

    /**
     * Vérifie si un tracé a pu être trouvé entre tout les points
     * @returns {undefined}
     */
    function areAllPointSet() {
        console.log("Ravioli Ravioli, give me the formuoli");
    }

});


