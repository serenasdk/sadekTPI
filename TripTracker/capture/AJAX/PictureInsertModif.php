<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

session_start();

if (!isset($_SESSION["visit"])) {
    $_SESSION["visit"] = array();
}

require '../connection.php';


if (isset($_POST["DeleteExisting"])) {
    $stream = fopen("../log.txt", 'a');
    fwrite($stream, "Delete Tentative on ".$_POST["key"]."\n");
    fclose($stream);
    
    array_push($_SESSION["picOnDelete"], $_POST["key"]);
}

if (isset($_POST["update"]) && !empty($_FILES)) {
    require_once './navigationData.php';

    $stream = fopen("../log.txt", 'a');
    
    $wpId = $_POST["idWp"];
    fwrite($stream, count($_FILES) . " \n");
    $initalMedia = getMediaOfWp($wpId);
   
    $input = "picSelect" . $_POST["idState"];

    for ($index = 0; $index < count($_FILES[$input]["error"]); $index++) {

        try {
            $connection = getConnection();
            $connection->beginTransaction();

            fwrite($stream, $_FILES[$input]["tmp_name"][$index] . " \n");


            $connection->commit();
        } catch (Exception $exc) {
            fwrite($stream, $exc->getMessage() . " \n");
            $connection->rollBack();
        }
    }

    fclose($stream);
}

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
                if (!$win) {
                    $stream = fopen("../log.txt", 'a');
                    fwrite($stream, "Erreur lors du dépaclement du fichier\n");
                    fclose($stream);
                    //echo json_encode("echec lors du chargement du fichier");
                } else {
                    $stream = fopen("../log.txt", 'a');
                    fwrite($stream, "Déplacement réussi\n");
                    fclose($stream);

                    AddPictureToWayPoint($id, $name, $connection);
                    //echo json_encode(array());

                    $stream = fopen("../log.txt", 'a');
                    fwrite($stream, "Ajout du nom à la base de données\n");
                    fclose($stream);
                }
            }
            if (!isset($win)) {
                echo error;
            }

            $connection->commit();
        } catch (Exception $ex) {
            $connection->rollBack();
            //echo json_encode($ex->getTraceAsString());

            $stream = fopen("../log.txt", 'a');
            fwrite($stream, $ex->getTraceAsString() . "\n");
            fclose($stream);
        }
    }
}

function AddPictureToWayPoint($wpId, $picName, $co) {
    $req = $co->prepare("INSERT INTO media (mediaName, idWaypoint) values (:mediaName, :idWp)");
    $req->bindParam(":idWp", $wpId, PDO::PARAM_INT);
    $req->bindParam(":mediaName", $picName, PDO::PARAM_STR);
    $req->execute();
}

echo json_encode(array());
