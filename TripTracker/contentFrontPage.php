<!-- Inclusion -->

<script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<link href="../Documents/NetBeansProjects/TemplateTripTracker/stylesheets/templateMap.css" rel="stylesheet" type="text/css"/>
<link href="stylesheets/frontPage.css" rel="stylesheet" type="text/css"/>
<script src="js/LoginRegister.js" type="text/javascript"></script>
<!-- Contenu de la page -->

<div class="background-image"></div>
<div class="content" style="margin: 100px;">
    <div class="row" style="margin-bottom: 50px;">
        <div class="container col-md-12">
            <h1 class="text-center">«Rester, c’est exister. Voyager, c’est vivre.»</h1>
        </div>
    </div>
    <div class="row">
        <div class="container col-md-8">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                    <div class="item active">
                        <img src="69893140-hd-1920x1080-wallpapers.jpg" alt=""/>
                    </div>

                    <div class="item">
                        <img src="28RFhA.jpg" alt=""/>
                    </div>
                </div>

                <!-- Left and right controls -->
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        <div class="container col-md-4 col-xs-12 col-sm-12 col-lg-4" >
            <div class="row" style="margin-top: 100px; margin-bottom: 100px;">
                <div class="container col-md-12">
                    <div class="col-md-12"><h2 class="text-center">Déjà membre ?</h2></div>
                </div>
                <div class="container col-md-12">
                    <div class="col-md-12 text-center"><input type="button" href="#" data-toggle="modal" class="btn btn-outline-primary btn-lg" data-target="#login-modal" value="Connectez-vous"></div>
                </div>
            </div>
            <div class="row" style="margin: 100px; margin-bottom: 100px;">
                <div class="container col-md-12">
                    <div class="col-md-12"><h2 class="text-center">Pas encore inscrit ?</h2></div>
                </div>
                <div class="container col-md-12">
                    <div class="col-md-12 text-center"><input type="button" href="#" data-toggle="modal" class="btn btn-outline-primary btn-lg" data-target="#register-modal" value="Inscrivez-vous"></div>
                </div>
            </div>  
        </div>
    </div>
    <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="loginmodal-container">
                <h1>Connexion</h1><br>
                <form method="post" action="index.php">
                    <div class="form-group" id="userNameLogP"><input type="text" id="userNameLog" class="form-control" name="user" placeholder="Nom d'utilisateur"> </div>
                    <div class="form-group" id="passLogP"><input type="password" id="passLog" class="form-control" name="pass" placeholder="Mot de passe"> </div>
                    <div id="errorSectionLog"></div>
                    <input type="button" name="login" id="login" class="login loginmodal-submit" value="Valider">
                </form>

                <div class="login-help">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="register-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="loginmodal-container">
                <h1>Inscription</h1><br>
                <form method="post" action="index.php">
                    <div id="userNameRegP" class="form-group">
                        <input type="text" class="form-control" maxlength="30"  name="user" id="userNameReg" placeholder="Nom d'utilisateur">
                    </div>
                    <div id="passRegP" class="form-group"><input class="form-control" type="password" name="pass"  id="passReg" placeholder="Mot de passe"></div>
                    <div id="passConfirmRegP" class="form-group"><input type="password" class="form-control" name="passConf" id="passConfirmReg" placeholder="Confirmation du mot de passe"></div>
                    <div id="errorSectionReg"></div>
                    <input type="button" name="register"   id="register" class="login loginmodal-submit" value="Valider">
                </form>

                <div class="login-help">
                </div>
            </div>
        </div>
    </div>
</div
