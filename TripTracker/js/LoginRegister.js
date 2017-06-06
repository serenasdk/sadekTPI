/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $("#login").click(function () {

        var username = $("#userNameLog").val();
        var pwd = $("#passLog").val();

        var valid = true;
        if (username.length == 0) {
            $("#userNameLogP").addClass("has-error");
            valid = false;
        }
        if (username.length == 0) {
            $("#passLogP").addClass("has-error");
            var valid = false;
        }

        if (valid) {
            $.ajax({
                type: 'post',
                url: 'dbRelation.php',
                data: {userName: username, password: pwd, login: true},
                success: function (response) {
                    if (response == "true") {
                        $('#errorSectionLog').addClass('alert');
                        $('#errorSectionLog').addClass('alert-danger');
                        $('#errorSectionLog').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>Le mot de passe est incorrect');

                    } else if (response == "false") {
                        $('#errorSectionLog').addClass('alert');
                        $('#errorSectionLog').addClass('alert-danger');
                        $('#errorSectionLog').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>L\'utilisateur n\'existe pas' );
                    } else {
                        $('#errorSectionLog').addClass('alert');
                        $('#errorSectionLog').removeClass('alert-danger');
                        $('#errorSectionLog').addClass('alert-success');
                        $('#errorSectionLog').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>Connexion réussie');
                        setTimeout(function () {
                            location.reload();
                        }, 1500);
                    }
                }
            });
        }
    });

    $('#register').click(function () {
        var username = $("#userNameReg").val();
        var pwd = $("#passReg").val();
        var confirm = $("#passConfirmReg").val();

        var valid = true;

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

        if (valid) {
            if (pwd == confirm) {
                $.ajax({
                    type: 'post',
                    url: 'dbRelation.php',
                    data: {userName: username, password: pwd, register: true},
                    success: function (response) {
                        console.log(response);
                        var result = JSON.parse(response);

                        if (result.ok) {
                            $('#errorSectionReg').addClass('alert');
                            $('#errorSectionReg').removeClass('alert-danger');
                            $('#errorSectionReg').addClass('alert-success');
                            $('#errorSectionReg').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>' + result.message);
                            setTimeout(function () {
                                location.reload();
                            }, 1500);
                        }
                        else {
                            $('#errorSectionReg').addClass('alert');
                            $('#errorSectionReg').removeClass('alert-success');
                            $('#errorSectionReg').addClass('alert-danger');
                            $('#errorSectionReg').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>' + result.message);
                        }
                        console.log(result);
                    }
                });
            } else {
                $('#errorSectionReg').addClass('alert');
                $('#errorSectionReg').removeClass('alert-success');
                $('#errorSectionReg').addClass('alert-danger');
                $('#errorSectionReg').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span>Les mots de passes ne correspondent pas');
            }
        }
    });
});



