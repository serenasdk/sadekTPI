<?php

/*
 * SADEK Serena 
 * Juin 2017
 * TripTracker
 * callDisconect.php
 * 
 * Cette page, lorsqu'elle est appellée via AJAX, déconnecte l'utilisateur.
 */

session_start();
session_destroy();

