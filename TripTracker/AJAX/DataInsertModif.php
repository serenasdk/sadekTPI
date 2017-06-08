<?php
session_start();

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (isset($_POST["insert"])) {
    
}

if (isset($_POST["update"])) {
    
}

function InsertTrip($title){
    $co = getConnection();
    $req = $co->prepare("INSERT INTO trip(idUser, title) values (:idUser, :title)");
    $req->bindParam(":idUser", $_SESSION["idUser"], PDO::PARAM_INT);
    $req->bindParam(":title", $title, PDO::PARAM_STR);
    $req->execute();
    return $co->lastInsertId();
}

function setPath($WpId, $pathLocation){
    $co = getConnection();
    $req = $co->prepare("UPDATE trip set pathObject = :path WHERE idWaypoint = :idWaypoint");
    $req->bindParam(":path", $pathLocation, PDO::PARAM_STR);
    $req->bindParam(":idWaypoint", $WpId, PDO::PARAM_INT);
    $req->execute();
}

function InsertWaypoint($idTrip, $title, $comment, $date, $lat, $lng, $address){
    $co = getConnection();
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

function CreatePathTextFile(){
    //Utiliser uniqid
    //utiliser fread, fwrite, fopen et fclose
}