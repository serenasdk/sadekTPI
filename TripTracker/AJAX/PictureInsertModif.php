<?php

session_start();

if (!isset($_SESSION["visit"])) {
    $_SESSION["visit"] = array();
}

$_SESSION["visit"] = var_export($_FILES, true);

require '../connection.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//idState

if (isset($_POST["insert"])) {
    $input = "picSelect" . $_POST["idState"];
    for ($index = 0; $index < count($_FILES[$input]["error"]); $index++) {
        try {
            $connection = getConnection();
            $connection->beginTransaction();

            if ($_FILES[$input]["error"][$index] == UPLOAD_ERR_OK) {
                $tmp_name = $_FILES[$input]["tmp_name"][$index];
                $name = uniqid("picture", true);
                $name .= ".txt";

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
                    //echo json_encode(array());
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
            fwrite($stream, $ex->getTraceAsString()."\n");
            fclose($stream);
        }
    }
}

echo json_encode(array());

function AddPictureToWayPoint($wpId, $picName, $co) {
    $req = $co->prepare("INSERT INTO media (mediaName, idWaypoint) values (:mediaName, :idWp)");
    $req->bindParam($picName, ":mediaName", PDO::PARAM_STR);
    $req->bindParam($wpId, ":idWp", PDO::PARAM_INT);
    $req->execute();
}
