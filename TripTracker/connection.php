<?php

/* 
 * SADEK Serena
 * Juin 2017
 * Page contenant les fonctions relative à la connection avec la base de donnée
 */

//Informations relative à la connexion
define("DBHOST", "127.0.0.1");
define("DBNAME", "triptrackerdb");
define("DBUSER", "admin");
define("DBPASS", "Super");

/**
 * Fonction mettant en place une connection à la base de donnée à l'aide d'un objet PDO
 * @staticvar type $dbb
 * @return \PDO
 */
function getConnection() {
    static $dbb = null;

    try {
        if ($dbb === NULL) {
            $connectionString = "mysql:host=" . DBHOST . ";dbname=" . DBNAME;
            $dbb = new PDO($connectionString, DBUSER, DBPASS);
            $dbb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    } catch (PDOException $e) {
        die("Erreur : " . $e->getMessage());
    }
    return $dbb;
}