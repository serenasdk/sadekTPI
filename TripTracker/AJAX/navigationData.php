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

session_start();

require_once '../connection.php';

if (isset($_POST["getPages"])) {
    try {
        $pages = getPageNumber();
        echo $pages;
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
}

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

        $content = getPageContent($pageNo);

        for ($index = 0; $index < count($content); $index++) {
            $content[$index]["pathConstructor"] = getPath($content[$index]["pathObject"]);
            $content[$index]["waypoints"] = getTripContent($content[$index]["idTrip"]);
        }

        echo json_encode($content);
        
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
}

if (isset($_POST["getWpDetails"])) {
    try {
        $wpId = filter_input(INPUT_POST, "wpId", FILTER_SANITIZE_NUMBER_INT);
        
        $details = getWpDetails($wpId);
        
        echo json_encode($details);
        
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }

}

function getPageNumber() {
    $co = getConnection();
    $req = $co->prepare("SELECT count(`idTrip`) FROM `trip` where `idUser`= :idUser");
    $req->bindParam(":idUser", $_SESSION["idUser"], PDO::PARAM_STR);
    $req->execute();
    $result = $req->fetch();
    if ($result !== 0) {
        if ($result["count(`idTrip`)"] % 5 == 0) {
            return ($result["count(`idTrip`)"] / 5);
        } else {
            return ($result["count(`idTrip`)"] / 5) + 1;
        }
    } else {
        return 0;
    }
}

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

function getTripContent($idTrip) {
    $co = getConnection();
    $req = $co->prepare("SELECT `idWaypoint`, `wpTitle`, `lat`, `lng` FROM `waypoint`where `idTrip`= :idTrip");
    $req->bindParam(":idTrip", $idTrip, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getWpDetails($idWp) {
    $co = getConnection();
    $req = $co->prepare("SELECT `wpDate`, `wpComment`, `wpTitle`, `address` FROM `waypoint`where `idWaypoint`= :idWP");
    $req->bindParam(":idWP", $idWp, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getMediaOfWp($idWp) {
    $co = getConnection();
    $req = $co->prepare("SELECT `idMedia`, `mediaName`  FROM `media` where `idWaypoint`= :idWp");
    $req->bindParam(":idWp", $idWp, PDO::PARAM_INT);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getPath($pathFileName){
    $fileFullName = "../usersRessources/path/" . $pathFileName;
    $stream = fopen($fileFullName, 'r');
    $content = fread($stream, filesize($fileFullName));
    fclose($stream);
    
    return $content;
}