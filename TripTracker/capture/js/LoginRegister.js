/* 
 * SADEK Seren
 * Juin 2017
 * TripTracker
 * 
 * Cette page contient les fonctions relatives à la connexion et à l'inscriptions des utilisateur
 * Elle fait aussi office de "portail" pour les call AJAX relatifs à ces fonctionalités
 */
$(document).ready(function () {
    /**
     * Evènement click du bouton "valider" de la modale de connexion
     */
    $("#login").click(function () {
        //Récupération du contenu des champs
        var username = $("#userNameLog").val();
        var pwd = $("#passLog").val();

        //Flag indiquant que la totalité des champs sont complétés correctement
        var valid = true;

        //Vérification de la complétion des champs
        if (username.length == 0) {
            //Un champ vide est en surbrillance rouge
            $("#userNameLogP").addClass("has-error");
            valid = false;
        }
        if (username.length == 0) {
            $("#passLogP").addClass("has-error");
            var valid = false;
        }

        if (valid) { //Si tout les champs sont correctes
            $.ajax({//On demande à la base de donnée de vérifier les informations de l'utilisateur
                type: 'post', //La methode poste empèche l'utilisateur d'accéder lui-même au contenu de la base de donnée
                url: './AJAX/UserDbRelation.php',
                data: {userName: username, password: pwd, login: true},
                success: function (response) {
                    if (response == "true") { // True => l'utilisateur existe mais le mot de passe est incorrecte
                        $('#errorSectionLog').addClass('alert');
                        $('#errorSectionLog').addClass('alert-danger');
                        $('#errorSectionLog').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>Le mot de passe est incorrect');

                    } else if (response == "false") { // False => l'utilisasteur n'existe pas
                        $('#errorSectionLog').addClass('alert');
                        $('#errorSectionLog').addClass('alert-danger');
                        $('#errorSectionLog').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>L\'utilisateur n\'existe pas');
                    } else { // Valeur numérique => Les informations sont correctes
                        $('#errorSectionLog').addClass('alert');
                        $('#errorSectionLog').removeClass('alert-danger');
                        $('#errorSectionLog').addClass('alert-success');
                        $('#errorSectionLog').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>Connexion réussie');
                        setTimeout(function () {
                            //Lors du call, l'identifiant de l'utilisateur a été ajouté à la session
                            //La page principale se chargera donc lorsque la page sera rechargée
                            location.reload();
                        }, 1500);
                    }
                }
            });
        }
    });

    /**
     * Evènement click du bouton "valider" de la modale d'inscription
     */
    $('#register').click(function () {
        //Récupération du contenu des champs
        var username = $("#userNameReg").val();
        var pwd = $("#passReg").val();
        var confirm = $("#passConfirmReg").val();

        //Flag indiquant que la totalité des champs sont complétés correctement
        var valid = true;

        //Vérification de la complétion des champs
        if (username.length == 0) {
            $("#userNameRegP").addClass("has-error");
            valid = false;
        }
        if (username.length == 0) {
            $("#passRegP").addClass("has-error");
            valid = false;
        }

        if (username.length == 0) {
            $("#passConfirmRegP").addClass("has-error");
            valid = false;
        }

        if (valid) {//Si tout les champs sont correctes
            if (pwd == confirm) { //Si les mots de passe correspondent
                $.ajax({//On demande à la base de donnée d'ajouter l'utilisateur à la base
                    type: 'post',
                    url: './AJAX/UserDbRelation.php',
                    data: {userName: username, password: pwd, register: true},
                    success: function (response) {
                        var result = JSON.parse(response); //Les informations arrivent sous forme de string, qu'on va convertir en tableau

                        if (result.ok) {// Si l'inscription s'est passée correctement
                            $('#errorSectionReg').addClass('alert');
                            $('#errorSectionReg').removeClass('alert-danger');
                            $('#errorSectionReg').addClass('alert-success');
                            $('#errorSectionReg').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>' + result.message);
                            setTimeout(function () {
                                //L'identifiant de l'utilisateur se trouve déjà dans la session
                                //Il va être redirigé sur sa page personelle lors de l'actualisation de la page
                                //location.reload();
                            }, 1500);
                        }
                        else { //Si l'inscription ne s'est pas passée correctement
                            $('#errorSectionReg').addClass('alert');
                            $('#errorSectionReg').removeClass('alert-success');
                            $('#errorSectionReg').addClass('alert-danger');
                            //Le message indiquera à l'utilisateur ce qui est incorrecte avec ses informations
                            $('#errorSectionReg').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>' + result.message);
                        }
                        console.log(result);
                    }
                });
            } else { //Si le mot de passe et la confirmation ne correspondent pas
                $('#errorSectionReg').addClass('alert');
                $('#errorSectionReg').removeClass('alert-success');
                $('#errorSectionReg').addClass('alert-danger');
                $('#errorSectionReg').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>Les mots de passes ne correspondent pas');
            }
        }
    });
});



