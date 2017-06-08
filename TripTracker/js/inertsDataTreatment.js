/* 
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * Les fonctions de cette page concernent le traitement, le formatage et l'envoi
 * des informations rentrées par l'utilsiateur dans le formulaire d'ajour de 
 * voyage.
 */

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
            for(var flag = 0; flag < Number(count); flag++) {
                console.log(flag + " < " + count);
                if ($("#insert" + flag).length !== 0) {
                    content.push([]);
                    content[content.length - 1].ref = "#insert" + flag;
                    content[content.length - 1].title = $("#title" + flag).val();
                    content[content.length - 1].adress = $("#adress" + flag).val();
                    content[content.length - 1].date = $("#date" + flag).val();
                    content[content.length - 1].comment = $("#comment" + flag).val();
                }
                if (count == flag+1) {
                    console.log(content);
                    checkInformations(content);
                    break;
                }
            }
        }
    }
    
    function checkInformations(content){
        content.forEach(function(element){
            var hasError = false;
            
        });
    }
});


