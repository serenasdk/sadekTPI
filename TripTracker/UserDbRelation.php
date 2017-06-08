<?php

session_start();

/*
 * SADEK Serena
 * Juin 2017
 * TripTracker
 * Cette page contient toute les fonction interéagissant avec la base de donnée,
 * en ce qui concerne la table des utilisateur
 * Elle est utilisée pour la connexion et l'inscription
 */

require_once 'connection.php';

if (isset($_POST["register"])) {
    $result = [];
    $username = filter_input(INPUT_POST, "userName", FILTER_SANITIZE_STRING);
    $pwd = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
    if (userExist($username)) {
        $result["ok"] = false;
        $result["message"] = "Le nom d'utilisateur que vous avez choisi existe déjà.";
    } else {
        try {
            $_SESSION["idUser"] = registerUser($username, $pwd);
            $result["ok"] = true;
            $result["message"] = "Vous avez été inscrit avec succès.";
        } catch (Exception $exc) {
            $result["ok"] = false;
            $result["message"] = $exc->getTraceAsString();
        }
    }
    //var_dump($result);
    echo json_encode($result);
}

if (isset($_POST["login"])) {
    $username = filter_input(INPUT_POST, "userName", FILTER_SANITIZE_STRING);
    $pwd = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
    $result = connectUser($username, $pwd);
    if (is_numeric($result)) {
        $_SESSION["idUser"] = $result;
    }
    echo json_encode($result);
}

function userExist($username) {
    $co = getConnection();
    $req = $co->prepare("SELECT * FROM user WHERE `userName` LIKE :userName");
    $req->bindParam(":userName", $username, PDO::PARAM_STR);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) > 0) {
        return TRUE;
    } else {
        return FALSE;
    }
}

/**
 * 
 * @param string $username : Nom d'utilisateur
 * @param string $pwd : Mot de passe non crypté
 */
function registerUser($username, $pwd) {
    $crypt = sha1($pwd);
    $co = getConnection();
    $req = $co->prepare("INSERT INTO user(`userName`, `password`) values (:userName, :password)");
    $req->bindParam(":userName", $username, PDO::PARAM_STR);
    $req->bindParam(":password", $crypt, PDO::PARAM_STR);
    $req->execute();
    return $co->lastInsertId();
}

/**
 * Vérifie les informations que l'utilisateur a entré lors de sa tentative de connexion
 * @param string $username : Nom d'utilisateur
 * @param string $pwd : Mot de passe non crypté
 * @return int idUser si les informations sont correctes
 * @return TRUE si l'utilisateur existe mais que le mot de passe est incorrecte
 * @return FALSE si l'utilisateur n'existe pas
 */
function connectUser($username, $pwd) {
    $co = getConnection();
    $req = $co->prepare("SELECT * FROM user WHERE `userName` LIKE :userName");
    $req->bindParam(":userName", $username, PDO::PARAM_STR);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) > 0) {
        if ($result[0]["password"] === sha1($pwd)) {
            return $result[0]["idUser"];
        } else {
            return TRUE;
        }
    } else {
        return FALSE;
    }
}
