<?php

/*
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * 
 * Cette page regroupe toute les fonctionalités retrounant les informations des 
 * voyages contenu dans la base. Elle est l'aboutissement des call AJAX contenu 
 * dans le fichier JavaScript tripNavigation
 */

if (!isset($_SESSION)) {//Le fichier étant lié à d'autre fichier utilisant une session
    session_start();
}

//Connection PDO nécessaire
require_once '../connection.php';

/**
 * Protocole retournant le nombre de pages de 5 voyage dont l'utilisateur a 
 * besoin pour afficher tout les siens
 */
if (isset($_POST["getPages"])) {
    try {
        $pages = getPageNumber();
        echo $pages;
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
}

/**
 * Protocole retournant les voyages ainsi que les information primaires de leurs
 * étapes. Le numéro de la page demandé est passé en paramètre dans $_POST
 */
if (isset($_POST["getPageContent"])) {
    try {

        $pages = getPageNumber();
        $pageNo = filter_input(INPUT_POST, "pageNo", FILTER_SANITIZE_NUMBER_INT);

        //Empécher la page d'être hors des limites
        if ($pageNo > $pages) {
            $pageNo = $pages;
        }
        if ($pageNo < 1) {
            $pageNo = 1;
        }
        
        //Récupération des voyages de la page
        $content = getPageContent($pageNo);

        //Récupération des étapes des voyages de la page
        for ($index = 0; $index < count($content); $index++) {
            $content[$index]["pathConstructor"] = getPath($content[$index]["pathObject"]);
            $content[$index]["waypoints"] = getTripContent($content[$index]["idTrip"]);
        }

        echo json_encode($content);
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
}

/**
 * Protocole visant à récupérer l'intégralité des informations d'une étape, 
 * média compris.
 */
if (isset($_POST["getWpDetails"])) {
    try {
        $wpId = filter_input(INPUT_POST, "wpId", FILTER_SANITIZE_NUMBER_INT);

        //Récupération des détails
        $details = getWpDetails($wpId)[0];
        
        //Le format de la date de la base de donnée est aaaa-mm-jj
        //Le format des input date est jj/mm/aaaa
        //On le fait dont passer de l'un à l'autre
        $details["wpDate"] = implode("/", array_reverse(explode("-", $details["wpDate"])));

        
        //Récupération des média
        $details["media"] = getMediaOfWp($wpId);


        echo json_encode($details);
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
}

/**
 * Protocole visant à charger toute les informations d'un voyage, du titre du 
 * voyage aux media.
 */
if (isset($_POST["loadTripModif"])) {
    try {
        $data = array();
        //Récupération du voyage
        $data["trip"] = getTrip($_POST["tripId"]);
        //Récupération des étapes
        $data["waypoints"] = getWps($_POST["tripId"]);

        //Récupération des étapes
        for ($index1 = 0; $index1 < count($data["waypoints"]); $index1++) {
            $media = getMediaOfWp($data["waypoints"][$index1]["idWaypoint"]);
            $mediaTitle = array();

            
            if (isset($_POST["getPreviewConfig"])) {
                $mediaConstruct = array();
                $_SESSION["picOnDelete"] = array();
            }

            //Récupération du nom des média
            for ($index2 = 0; $index2 < count($media); $index2++) {
                $filename = "usersRessources/image/" . $media[$index2]["mediaName"];
                array_push($mediaTitle, $filename);

                //Génération d'un constructeur pour la prévisualisation de l'input type file
                if (isset($_POST["getPreviewConfig"])) {
                    $construct = array();
                    $construct["type"] = "image";
                    $construct["caption"] = "";
                    $construct["url"] = './AJAX/PictureInsertModif.php';
                    $construct["key"] = $media[$index2]["idMedia"];
                    array_push($mediaConstruct, $construct);
                }
            }
            //Formatage de la date de aaaa-mm-jj à jj/mm/aaaa
            $data["waypoints"][$index1]["wpDate"] = implode("/", array_reverse(explode("-", $data["waypoints"][$index1]["wpDate"])));

            $data["waypoints"][$index1]["media"] = $mediaTitle;
            if (isset($_POST["getPreviewConfig"])) {
                $data["waypoints"][$index1]["mediaConstruct"] = $mediaConstruct;
            }
        }

        echo json_encode($data);
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
}

/**
 * Calcule le nombre de pages de cinq voyages dont l'utilisateur a besoin pour
 * contenir tout ses voyages
 * @return int : Nombre de pages
 */
function getPageNumber() {
    $co = getConnection();
    $req = $co->prepare("SELECT count(`idTrip`) FROM `trip` where `idUser`= :idUser");
    $req->bindParam(":idUser", $_SESSION["idUser"], PDO::PARAM_STR);
    $req->execute();
    $result = $req->fetch();
    if ($result !== 0) {
        if ($result["count(`idTrip`)"] % 5 == 0) { //La dernière page est remplie
            return ($result["count(`idTrip`)"] / 5);
        } else { //La dernière page n'est pas remplie
            return ($result["count(`idTrip`)"] / 5) + 1;
        }
    } else {
        return 0;
    }
}

/**
 * Retourne les cinq voyage contenu dans la page donnée
 * @param int $page : index de la page
 * @return array : détail des voyages
 */
function getPageContent($page) {
    $offset = ($page - 1) * 5;
    $co = getConnection();
    $req = $co->prepare("SELECT `idTrip`, `tpTitle`, `pathObject` FROM `trip` WHERE `idUser` = :idUser LIMIT  5 OFFSET :pageStart");
    $req->bindParam(":idUser", $_SESSION["idUser"], PDO::PARAM_INT);
    $req->bindParam(":pageStart", $offset, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

/**
 * Retourne les informations minimales (titre et position) des étapes contenu 
 * dans le voyage donné
 * @param type $idTrip 
 * @return array : détails des voyages
 */
function getTripContent($idTrip) {
    $co = getConnection();
    $req = $co->prepare("SELECT `idWaypoint`, `wpTitle`, `lat`, `lng` FROM `waypoint`where `idTrip`= :idTrip");
    $req->bindParam(":idTrip", $idTrip, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

/**
 * Retourne les informations complètes de l'étape donnée
 * @param type $idWp
 * @return type
 */
function getWpDetails($idWp) {
    $co = getConnection();
    $req = $co->prepare("SELECT `wpDate`, `wpComment`, `wpTitle`, `address` FROM `waypoint`where `idWaypoint`= :idWP");
    $req->bindParam(":idWP", $idWp, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
/**
 * Retourne les informations des média associés à l'étape donnée
 * @param type $idWp
 * @return type
 */
function getMediaOfWp($idWp) {
    $co = getConnection();
    $req = $co->prepare("SELECT `idMedia`, `mediaName`  FROM `media` where `idWaypoint`= :idWp");
    $req->bindParam(":idWp", $idWp, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
/**
 * Retourne les informations du tracé contenu dans le fichier donné
 * @param type $pathFileName
 * @return type
 */
function getPath($pathFileName) {
    $fileFullName = "../usersRessources/path/" . $pathFileName;
    $stream = fopen($fileFullName, 'r');
    $content = fread($stream, filesize($fileFullName));
    fclose($stream);

    return $content;
}

/**
 * Retounre toute les informations du voyage donné
 * @param type $idTrip
 * @return type
 */
function getTrip($idTrip) {
    $co = getConnection();
    $req = $co->prepare("SELECT * FROM trip WHERE idTrip = :idTrip");
    $req->bindParam(":idTrip", $idTrip, PDO::PARAM_INT);
    $req->execute();
    $response = $req->fetch(PDO::FETCH_ASSOC);
    return $response;
}

/**
 * Retourne toute les informations des étapes du voyage donné
 * @param type $idTrip
 * @return type
 */
function getWps($idTrip) {
    $co = getConnection();
    $req = $co->prepare("SELECT * FROM `waypoint` WHERE `idTrip`= :idTrip");
    $req->bindParam(":idTrip", $idTrip, PDO::PARAM_INT);
    $req->execute();
    $response = $req->fetchAll(PDO::FETCH_ASSOC);
    return $response;
}
