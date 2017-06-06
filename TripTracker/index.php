<?php
session_start();

if (isset($_POST["deco"])) {
    session_destroy();
    Header('Location: ' . $_SERVER['PHP_SELF']);
}

if (isset($_POST["login"])) {
    $_SESSION["idUser"] = 1;
}
if (isset($_POST["register"])) {
    
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" />

    </head>
    <body>
        <script>
            $(document).keydown(function (event) {
                if (event.ctrlKey == true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109' || event.which == '187' || event.which == '189')) {
                    event.preventDefault();
                }
            });

            $(window).bind('mousewheel DOMMouseScroll', function (event) {
                if (event.ctrlKey == true) {
                    event.preventDefault();
                }
            });
        </script>
        <div class="container">
            <nav class="navbar navbar-fixed-top navbar-default" role="navigation">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">TripTracker</a>
                    </div>
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <form method="post" action="index.php" class="collapse navbar-collapse"
                          id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right">
                            <?php
                            if (isset($_SESSION["idUser"])) {
                                echo '<li><input type="submit" class="btn btn-link" name="deco" value="Déconnection" style="margin-top: 7px;"></li>';
                            } else {
                                echo '<li><a class="btn btn-link" data-toggle="modal" data-target="#login-modal">Connexion</a></li>';
                                echo '<li><a class="btn btn-link" data-toggle="modal" data-target="#register-modal">Inscription</a></li>';
                            }
                            ?>
                        </ul>
                    </form>
                    </form><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>
        </div>
        <div class="navbar-offset"></div>
        <div id="content">
            <?php
            if (isset($_SESSION["idUser"])) {
                include('contentUserMap.php');
            } else {
                include('contentFrontPage.php');
            }
            ?>
        </div>
    </body>
</html>
