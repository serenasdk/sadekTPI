<?php

/*
 * SADEK Serena
 * Juin 2017
 * TripTracker
 * 
 * Toute les fonctions de cette page sont dédiées à l'insertion des données dans 
 * le serveur et dans la base de donnée. Cette page fait également office de protail
 * pour les call AJAX commandant l'insertion et la modification d'éléments.
 */

session_start();

require_once '../connection.php';

/**
 * Procédure déclenchée par la présence de la variable insert dans le post
 * Récupère le path et les informations pour les insérer dans la base de donnée 
 * l'aide d'une transaction.
 */
if (isset($_POST["insert"])) {
    try {
        $ids = array();

        $connection = getConnection();
        $connection->beginTransaction();

        $title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);

        $tripId = InsertTrip($title, $connection);
        $fileId = CreatePathTextFile($_POST["path"]);
        setPath($tripId, $fileId, $connection);

        $path = filter_input(INPUT_POST, "path", FILTER_SANITIZE_STRING);

        //$content = filter_input(INPUT_POST, "content", FILTER_SANITIZE_STRING);
        $content = $_POST["content"];
        $content = json_decode($content);

        for ($index = 0; $index < count($content); $index++) {

            $title = $content[$index]->title;
            $comment = $content[$index]->comment;

            $date = $content[$index]->date;
            $date = str_replace('/', '-', $date);
            $date = date('Y-m-d', strtotime($date));

            $date = $content[$index]->date;
            $date = implode("-", array_reverse(explode("/", $date)));

            $lat = $content[$index]->lat;
            $lng = $content[$index]->lng;
            $address = $content[$index]->address;

            $wpId = InsertWaypoint($tripId, $title, $comment, $date, $lat, $lng, $address, $connection);
            setcookie("WP".$content[$index]->ref, $wpId, time()+10);
            //Cookie destiné au call AJAX d'insertion des media
            
            array_push($ids, $wpId);
        }

        $connection->commit();

        echo json_encode($ids);
    } catch (Exception $ex) {
        $connection->rollBack();
        if (isset($fileId)) {
            unlink("../usersRessources/path/" . $fileId);
        }

        echo json_encode($ex->getTraceAsString());
    }
}

if (isset($_POST["update"])) {
    
}

/**
 * 
 * @param type $title
 * @param type $co
 * @return type
 */
function InsertTrip($title, $co) {
    $req = $co->prepare("INSERT INTO trip(idUser, tpTitle) values (:idUser, :title)");
    $req->bindParam(":idUser", $_SESSION["idUser"], PDO::PARAM_INT);
    $req->bindParam(":title", $title, PDO::PARAM_STR);
    $req->execute();
    return $co->lastInsertId();
}

/**
 * 
 * @param type $idTrip
 * @param type $pathLocation
 * @param type $co
 */
function setPath($idTrip, $pathLocation, $co) {
    $req = $co->prepare("UPDATE trip set pathObject = :path WHERE idTrip = :idTrip");
    $req->bindParam(":path", $pathLocation, PDO::PARAM_STR);
    $req->bindParam(":idTrip", $idTrip, PDO::PARAM_INT);
    $req->execute();
}

/**
 * Ajoute un waypoint par le biais de la connexion donnée
 * @param int $idTrip
 * @param string $title
 * @param string $comment
 * @param string $date
 * @param double $lat
 * @param double $lng
 * @param string $address
 * @param PDO $co
 * @return int $idWp : id du Waypoint ajouté
 */
function InsertWaypoint($idTrip, $title, $comment, $date, $lat, $lng, $address, $co) {
    $req = $co->prepare("INSERT INTO waypoint(idTrip, wpTitle, wpComment, wpDate, lat, lng, address) values (:idTrip, :title, :comment, :date, :lat, :lng, :address)");
    $req->bindParam(":idTrip", $idTrip, PDO::PARAM_INT);
    $req->bindParam(":title", $title, PDO::PARAM_STR);
    $req->bindParam(":comment", $comment, PDO::PARAM_STR);
    $req->bindParam(":date", $date, PDO::PARAM_STR);
    $req->bindParam(":lat", $lat, PDO::PARAM_STR);
    $req->bindParam(":lng", $lng, PDO::PARAM_STR);
    $req->bindParam(":address", $address, PDO::PARAM_STR);
    $req->execute();
    return $co->lastInsertId();
}

/**
 * Genève un fichier au nom aléatoire pour stocker la variable passée en paramètre
 * @param string $content : contenu à insérer dans un fichier texte
 * @return string $id : shortName du fichier texte créé
 */
function CreatePathTextFile($content) {
    $id = uniqid("path", true);
    $id .= ".txt";

    $stream = fopen("../usersRessources/path/" . $id, 'a+');
    fwrite($stream, $content);
    fclose($stream);

    return $id;
}
