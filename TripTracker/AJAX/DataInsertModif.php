<?php

session_start();

/*
 * SADEK Serena
 * Juin 2017
 * TripTracker
 * 
 * Toute les fonctions de cette page sont dédiées à l'insertion des données dans 
 * le serveur et dans la base de donnée. Cette page fait également office de protail
 * pour les call AJAX commandant l'insertion et la modification d'éléments.
 */

if (isset($_POST["insert"])) {
    
    $_POST["content"] = json_decode($_POST["content"]);
    try {
        $connection = getConnexion();
        $connection->beginTransaction();

        $tripId = InsertTrip("titre", $connection);
        $fileId = CreatePathTextFile($_POST["path"]);

        for ($index = 0; $index < count($_POST["content"]); $index++) {
            $title = $_POST["content"]["title"];
            $comment = $_POST["content"]["comment"];
            $date = $_POST["content"]["date"];
            $lat = $_POST["content"]["lat"];
            $lng = $_POST["content"]["lng"];
            $address = $_POST["content"]["address"];
            InsertWaypoint($tripId, $title, $comment, $date, $lat, $lng, $address, $connection);
        }

        $connection->commit();

        echo "1";
    } catch (Exception $ex) {
        $connection->rollBack();
        echo "0";
    }
}

if (isset($_POST["update"])) {
    
}

function InsertTrip($title, $co) {
    $req = $co->prepare("INSERT INTO trip(idUser, title) values (:idUser, :title)");
    $req->bindParam(":idUser", $_SESSION["idUser"], PDO::PARAM_INT);
    $req->bindParam(":title", $title, PDO::PARAM_STR);
    $req->execute();
    return $co->lastInsertId();
}

function setPath($idTrip, $pathLocation, $co) {
    $req = $co->prepare("UPDATE trip set pathObject = :path WHERE idTrip = :idTrip");
    $req->bindParam(":path", $pathLocation, PDO::PARAM_STR);
    $req->bindParam(":idTrip", $idTrip, PDO::PARAM_INT);
    $req->execute();
}

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

function CreatePathTextFile($content) {
    $id = uniqid("path", true);
    $id .= ".txt";

    $stream = fopen("../userRessources/" . $id, 'a+');
    fwrite($stream, $content);
    fclose($stream);

    return $id;
}
