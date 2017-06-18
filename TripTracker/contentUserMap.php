<!-- Inclusions -->

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfv2UYZVSvgZdy3JX8p2r6sutqh2o_4Dg"></script>
<link href="./stylesheets/templateMap.css" rel="stylesheet" type="text/css"/>
<link href="ressources/kartik-v-bootstrap-fileinput-v4.4.1-15-g6a94917/kartik-v-bootstrap-fileinput-6a94917/css/fileinput.css" rel="stylesheet" type="text/css"/>
<link href="ressources/bootstrap-datetimepicker-master/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"/>
<script src="ressources/kartik-v-bootstrap-fileinput-v4.4.1-15-g6a94917/kartik-v-bootstrap-fileinput-6a94917/js/fileinput.min.js" type="text/javascript"></script>
<script src="ressources/bootstrap-datetimepicker-master/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="js/templateMap.js" type="text/javascript"></script>
<script src="js/insertInterface.js" type="text/javascript"></script>
<script src="js/inertsDataTreatment.js" type="text/javascript"></script>
<script src="js/tripNavigation.js" type="text/javascript"></script>
<script src="js/modifPlugin.js" type="text/javascript"></script>

<!-- Contenu de la page -->
<div id="map">
</div>
<div class="row main-row">
    <div class="col-sm-4 col-md-3 sidebar sidebar-left pull-left" id="navTrips">
        <div class="panel-group sidebar-body" id="accordion-left">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        Mes voyages
                        <span class="pull-right slide-submenu" id="collapseTrip">
                            <i class="fa fa-chevron-left"></i>
                        </span>
                    </h4>
                </div>
                <div class="panel-body list-group" id="TripPanels">

                </div>
                <div id="pageNos" class="text-center"></div>
            </div>
        </div>
    </div>
</div>
<div class="col-sm-4 col-md-6 mid"></div>
<div class="col-sm-4 col-md-5 sidebar sidebar-right pull-right"id="navDetails">
    <div class="panel-group sidebar-body" id="accordion-right">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    Détails du Voyage
                    <span class="pull-right slide-submenu"  id="collapseDetails">
                        <i class="fa fa-chevron-right"></i>
                    </span>
                </h4>
            </div>
            <div id="taskpane" class="panel-collapse collapse in">
                <div class="panel-body">
                    <button class="btn btn-default" id="BackToNav">
                        Retour
                    </button>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-group">
                                <i class="glyphicon glyphicon-flag col-lg-1"></i>
                                <div id="Ptitle" class="input-group col-lg-11">
                                    <h4 id="wpTitle">Titre de l'étape</h4>
                                </div>
                            </div>
                            <div class="form-group">
                                <i class="glyphicon glyphicon-map-marker col-lg-1"></i>
                                <div id="Padress" class="input-group col-lg-11">
                                    <h4 id="wpAddress">Addresse</h4>
                                </div>
                            </div>
                            <div class="form-group">
                                <i class="glyphicon glyphicon-time col-lg-1"></i>
                                <div id="Pdate" class="input-group col-lg-11">
                                    <h4 id="wpDate">06/11/2015</h4>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" id="carouselSection">
                            
                        </li>
                        <li class="list-group-item">
                            <div>
                                <p class="text-justify" id="wpComment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget nibh et nunc dignissim egestas ut in quam. Aliquam ultrices rutrum sem nec posuere. Ut turpis mi, pharetra sit amet pretium id, lacinia at nunc. Suspendisse gravida est nisi, id malesuada neque fermentum vitae. Phasellus sit amet nibh vestibulum turpis varius ullamcorper. Integer suscipit aliquam sapien, vitae vehicula eros. Ut tincidunt feugiat nisi a tristique. Duis vel justo pulvinar, ornare nulla vitae, sodales ligula. Suspendisse massa mauris, egestas nec eros sed, dignissim varius nisl. Fusce dapibus mollis justo, quis malesuada eros. Phasellus ut felis nisl. Aliquam eu vehicula urna, id tempus lectus. Integer sit amet ornare ipsum. Aliquam eget libero quis massa varius molestie a convallis nunc. Sed aliquet ultricies dolor.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="col-sm-4 col-md-5 sidebar sidebar-right pull-right"id="navInsert">
    <div class="panel-group sidebar-body" id="accordion-right">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    Ajout d'un Voyage
                    <span class="pull-right slide-submenu"  id="collapseDetails">
                        <i class="fa fa-chevron-right"></i>
                    </span>
                </h4>
            </div>
            <div class="panel-collapse collapse in">
                <div class="panel-body list-group insertPanel">
                    <div id="titleSection" class="form-group">
                        <input type="text"  maxlength="35" id="titleTrip" class="form-control col-lg-12" placeholder="Titre du Voyage">
                    </div>
                    <div>
                        <div id="InsertionContent">

                        </div>
                    </div>

                    <div id="InsertionErrorSection">

                    </div>
                    <div id="InsertionControls">
                        <input type="button" id="AddState" class="btn btn-default pull-left" value="Ajouter une étape">
                        <input type="button" id="SubmitNewTrip" class="btn btn-primary pull-right" value="Enregistrer mon voyage">
                        <input type="button" id="QuitCreation" class="btn btn-danger pull-right" value="Quitter">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="mini-submenu mini-submenu-left pull-left" id="cmdNavTrip">
    <i class="fa fa-list-alt"></i>
</div>
<div class="mini-submenu mini-submenu-right pull-right" id="cmdNavDetails">
    <i class="fa fa-tasks"></i>
</div>
<div class="mini-submenu mini-submenu-right pull-right" id="cmdInsert">
    <i class="fa fa-plus"></i>
</div>

