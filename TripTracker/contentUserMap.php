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
                    Task Pane
                    <span class="pull-right slide-submenu"  id="collapseDetails">
                        <i class="fa fa-chevron-right"></i>
                    </span>
                </h4>
            </div>
            <div id="taskpane" class="panel-collapse collapse in">
                <div class="panel-body">
                    <p>
                        Lorem ipsum dolor sit amet, vel an wisi propriae. Sea ut graece gloriatur. Per ei quando dicant vivendum. An insolens appellantur eos, doctus convenire vis et, at solet aeterno intellegebat qui.
                    </p>
                    <p>
                        Elitr minimum inciderint qui no. Ne mea quaerendum scriptorem consequuntur. Mel ea nobis discere dignissim, aperiam patrioque ei ius. Stet laboramus eos te, his recteque mnesarchum an, quo id adipisci salutatus. Quas solet inimicus eu per. Sonet conclusionemque id vis.
                    </p>
                    <p>
                        Eam vivendo repudiandae in, ei pri sint probatus. Pri et lorem praesent periculis, dicam singulis ut sed. Omnis patrioque sit ei, vis illud impetus molestiae id. Ex viderer assentior mel, inani liber officiis pro et. Qui ut perfecto repudiandae, per no hinc tation labores.
                    </p>
                    <p>
                        Pro cu scaevola antiopam, cum id inermis salutatus. No duo liber gloriatur. Duo id vitae decore, justo consequat vix et. Sea id tale quot vitae.
                    </p>
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
                        <input type="text" id="titleTrip" class="form-control col-lg-12" placeholder="Titre du Voyage">
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

