-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 08 Juin 2017 à 22:09
-- Version du serveur :  5.6.15-log
-- Version de PHP :  5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `triptrackerdb`
--
CREATE DATABASE IF NOT EXISTS `triptrackerdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `triptrackerdb`;

-- --------------------------------------------------------

--
-- Structure de la table `media`
--

CREATE TABLE IF NOT EXISTS `media` (
  `idMedia` int(11) NOT NULL AUTO_INCREMENT,
  `mediaName` varchar(100) NOT NULL,
  `idWaypoint` int(11) NOT NULL,
  PRIMARY KEY (`idMedia`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `trip`
--

CREATE TABLE IF NOT EXISTS `trip` (
  `idTrip` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `tpTitle` varchar(256) NOT NULL,
  `pathObject` varchar(256) NOT NULL,
  PRIMARY KEY (`idTrip`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(257) NOT NULL,
  `userPwd` varchar(55) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`idUser`, `userName`, `userPwd`) VALUES
(2, 'MrSecond', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');

-- --------------------------------------------------------

--
-- Structure de la table `waypoint`
--

CREATE TABLE IF NOT EXISTS `waypoint` (
  `idWaypoint` int(11) NOT NULL AUTO_INCREMENT,
  `idTrip` int(11) NOT NULL,
  `wpDate` date NOT NULL,
  `wpComment` text NOT NULL,
  `wpTitle` varchar(256) NOT NULL,
  `lat` decimal(10,0) NOT NULL,
  `lng` decimal(10,0) NOT NULL,
  `address` varchar(256) NOT NULL,
  PRIMARY KEY (`idWaypoint`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
