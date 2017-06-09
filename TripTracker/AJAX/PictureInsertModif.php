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

$id = uniqid("picture", true);
$id .= ".txt";

//idState

if (isset($_POST["insert"])) {
    $input = "picSelect" . $_POST["idState"];
    for ($index = 0; $index < count($_FILES[$input]["error"]); $index++) {
        try {
            $connection = getConnection();
            $connection->beginTransaction();

            if ($_FILES[$input]["error"][$index] == UPLOAD_ERR_OK) {
                $tmp_name = $_FILES[$input]["tmp_name"][$index];
                $name = $_FILES[$input]["name"][$index];
                $win = move_uploaded_file($tmp_name, "../usersRessources/image/$name");
                if (!$win) {
                    $stream = fopen("../log.txt", 'a');
                    fwrite($stream, "Erreur lors du dépaclement du fichier");
                    fclose($stream);
                    //echo json_encode("echec lors du chargement du fichier");
                } else {
                    $stream = fopen("../log.txt", 'a');
                    fwrite($stream, "Déplacement réussi");
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
            fwrite($stream, $ex->getTraceAsString());
            fclose($stream);
        }
    }
}

echo json_encode(array());

function AddPictureToWayPoint($wpId, $picName, $co) {
    
}

function wayPointExist($wpId, $co) {
    
}

function addPicture($picUrl) {
    
}
