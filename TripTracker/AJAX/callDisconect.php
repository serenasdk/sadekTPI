<?php

/*
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * 
 * Cette page, lorsqu'elle est appellée via AJAX, déconecte l'utilisateur.
 */

session_start();
session_destroy();

