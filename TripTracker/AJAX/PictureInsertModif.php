<?php

/*
 * SADEK Serena
 * Juin 2017
 * TripTracker
 * PictureInsertModif.php
 * 
 * Cette page contient toute les actions liées à la gestion d'image. Cette page 
 * est appellée via AJAX par tout les input de type file, lors de l'upload ou de
 * la suppression d'image.
 */

session_start();

if (!isset($_SESSION["visit"])) {
    $_SESSION["visit"] = array();
}

//Connection PDO requise
require '../connection.php';

/**
 * Protocole visant à indiquer qu'une image enregistrée devra être supprimée dès
 * l'update du voyage réceptionné par la page DataInsertModif.php
 */
if (isset($_POST["DeleteExisting"])) {
    //L'image est ajoutée aux suppressions en attente
    array_push($_SESSION["picOnDelete"], $_POST["key"]);
}

/**
 * Protocole visant à upload des images et les référencer dans la base de donnée
 */
if (isset($_POST["insert"]) && !empty($_FILES)) {
    $id = $_COOKIE["WP" . $_POST["idState"]];
    $input = "picSelect" . $_POST["idState"];
    for ($index = 0; $index < count($_FILES[$input]["error"]); $index++) {
        try {
            $connection = getConnection();
            $connection->beginTransaction();

            if ($_FILES[$input]["error"][$index] == UPLOAD_ERR_OK) {
                $tmp_name = $_FILES[$input]["tmp_name"][$index];
                $name = uniqid("picture", true);
                $ext = pathinfo($_FILES[$input]["name"][$index], PATHINFO_EXTENSION);
                $name .= "." . $ext;

                $win = move_uploaded_file($tmp_name, "../usersRessources/image/$name");
                if ($win) {
                    AddPictureToWayPoint($id, $name, $connection);
                }
            }

            $connection->commit();
        } catch (Exception $ex) {
            $connection->rollBack();
        }
    }
}

/**
 * Référence  une image dans la base de donnée
 * @param type $wpId
 * @param type $picName
 * @param type $co
 */
function AddPictureToWayPoint($wpId, $picName, $co) {
    $req = $co->prepare("INSERT INTO media (mediaName, idWaypoint) values (:mediaName, :idWp)");
    $req->bindParam(":idWp", $wpId, PDO::PARAM_INT);
    $req->bindParam(":mediaName", $picName, PDO::PARAM_STR);
    $req->execute();
}

//L'input de type file attend une réponse en format JSON. 
//Même s'il n'y a rien à traiter il faut retrouner un tableau vide
echo json_encode(array());
