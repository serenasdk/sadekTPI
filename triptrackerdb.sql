-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 09 Juin 2017 à 16:33
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=83 ;

--
-- Contenu de la table `trip`
--

INSERT INTO `trip` (`idTrip`, `idUser`, `tpTitle`, `pathObject`) VALUES
(38, 2, 'titre', 'path593a49891037d2.47306369.txt'),
(39, 2, 'titre', 'path593a50226f9827.45526826.txt'),
(40, 2, 'titre', 'path593a51ae8e51b9.66948982.txt'),
(41, 2, 'titre', 'path593a5237aa0293.19865754.txt'),
(42, 2, 'titre', 'path593a529245d7c8.94326497.txt'),
(43, 2, 'titre', 'path593a5386029253.04762342.txt'),
(44, 2, 'titre', 'path593a53bd937a91.60230761.txt'),
(45, 2, 'titre', 'path593a55f71f01a8.12110812.txt'),
(46, 2, 'titre', 'path593a56824665f3.28952720.txt'),
(47, 2, 'titre', 'path593a56cd5c3d65.24546930.txt'),
(48, 2, 'qwerqwer', 'path593a5d9867b814.15855207.txt'),
(49, 2, 'qwerqwer', 'path593a5dcdc71032.77744284.txt'),
(50, 2, 'qwerqwer', 'path593a5de4af2ec7.98218420.txt'),
(51, 2, 'sdfsdfgsdfg', 'path593a85f2612116.60361838.txt'),
(52, 2, 'dfghdfgh', 'path593a8abfd20015.28399636.txt'),
(53, 2, 'asdfasdf', 'path593a8b6a1e7e45.34724820.txt'),
(54, 2, 'asdf', 'path593a8be43eb764.41096567.txt'),
(55, 2, 'asdf', 'path593a8f804d15b4.71603263.txt'),
(56, 2, 'asdf', 'path593a8f83a92c47.14786308.txt'),
(57, 2, 'asdf', 'path593a8f83cf42d2.71309976.txt'),
(58, 2, 'asdf', 'path593a8f8a331997.88998063.txt'),
(59, 2, 'asdf', 'path593a8f8a593027.14378684.txt'),
(60, 2, 'asdf', 'path593a8f8a7dcfa6.52707368.txt'),
(61, 2, 'asdf', 'path593a8f8ac6d036.81003040.txt'),
(62, 2, 'asdf', 'path593a8f8b010fe4.64729991.txt'),
(63, 2, 'asdf', 'path593a8f8b4ef285.36285183.txt'),
(64, 2, 'asdf', 'path593a8f8b6f2d01.86135929.txt'),
(65, 2, 'asdf', 'path593a8f8b9bdb24.21421481.txt'),
(66, 2, 'asdf', 'path593a8f8bc2ebc4.58904919.txt'),
(67, 2, 'asdf', 'path593a8f8be4dbb2.29723746.txt'),
(68, 2, 'asdf', 'path593a8f8c1d2760.38489203.txt'),
(69, 2, 'asdf', 'path593a8f8c4243f7.75671350.txt'),
(70, 2, 'asdf', 'path593a8f8c656c78.16862723.txt'),
(71, 2, 'asdf', 'path593a8f8c8e7104.26235938.txt'),
(72, 2, 'asdfasdf', 'path593aa44de569a8.54687840.txt'),
(73, 2, 'asdfasdf', 'path593aa4bc042996.01106339.txt'),
(74, 2, 'asdfasdf', 'path593aa4e6af2ce7.37108237.txt'),
(75, 2, 'asfdasdf', 'path593aa51216dc23.31253530.txt'),
(76, 2, 'dfgdfg', 'path593aa567678465.68805941.txt'),
(77, 2, 'sdfgsdfg', 'path593aaa66451639.44452427.txt'),
(78, 2, 'qwerqwer', 'path593aac21506512.23963914.txt'),
(79, 2, 'wertwert', 'path593aac94706867.71497819.txt'),
(80, 2, 'qwerqwer', 'path593aad07805293.54601925.txt'),
(81, 2, 'qwer', 'path593aad50dc8100.09676989.txt'),
(82, 2, 'qwerqwer', 'path593aaf599d6a03.69337076.txt');

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
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `address` varchar(256) NOT NULL,
  PRIMARY KEY (`idWaypoint`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=183 ;

--
-- Contenu de la table `waypoint`
--

INSERT INTO `waypoint` (`idWaypoint`, `idTrip`, `wpDate`, `wpComment`, `wpTitle`, `lat`, `lng`, `address`) VALUES
(46, 38, '2017-06-09', 'asdfsdf', 'asdf', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(47, 38, '2017-06-09', 'wertwert', 'wertwert', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(48, 38, '2017-06-09', 'wert', 'wertwert', 46.204112903798, 6.1412099003792, 'Quai de la Poste 12, 1204 GenÃ¨ve, Suisse'),
(49, 38, '2017-06-09', 'asdf', 'asdf', 46.204092484124, 6.1409282684326, 'Quai de la Poste 12, 1204 GenÃ¨ve, Suisse'),
(50, 38, '2017-06-09', 'sdfg', 'sdfgsdfg', 46.204090627789, 6.1405366659164, 'Quai de la Poste 10, 1204 GenÃ¨ve, Suisse'),
(51, 39, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.204098053127, 6.1407727003098, 'Quai de la Poste 12, 1204 GenÃ¨ve, Suisse'),
(52, 39, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(53, 39, '2017-06-09', '<yxcy<xc', 'yxcy<xc', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(54, 40, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(55, 40, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(56, 40, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.204159312121, 6.1419260501862, 'Quai de la Poste 12, 1204 GenÃ¨ve, Suisse'),
(57, 41, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(58, 41, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(59, 41, '2017-06-09', 'ASDasd', 'ASDasd', 46.204127754466, 6.1416390538216, 'Quai de la Poste 12, 1204 GenÃ¨ve, Suisse'),
(60, 42, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(61, 42, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(62, 42, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.204133323465, 6.1415626108646, 'Quai de la Poste 12, 1204 GenÃ¨ve, Suisse'),
(63, 43, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(64, 43, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(65, 43, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.204146317794, 6.1416538059711, 'Quai de la Poste 12, 1204 GenÃ¨ve, Suisse'),
(66, 44, '2017-06-09', 'asdf', 'asdfsadf', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(67, 44, '2017-06-09', 'asf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(68, 44, '2017-06-09', 'sdfgsdfg', 'sdfgsdfg', 46.204055357424, 6.1435769498348, 'Passage de la Monnaie 6, 1204 GenÃ¨ve, Suisse'),
(69, 45, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(70, 45, '2017-06-09', 'qwer', 'qwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(71, 45, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.204243775167, 6.143434792757, 'Passage de la Monnaie 4, 1204 GenÃ¨ve, Suisse'),
(72, 46, '2017-06-09', 'qwer', 'qwerqwer', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(73, 46, '2017-06-09', 'qwreqwer', 'qwerwqer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(74, 46, '2017-06-09', 'wert', 'wert', 46.204140748796, 6.143511235714, 'Passage de la Monnaie 4, 1204 GenÃ¨ve, Suisse'),
(75, 47, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2039204, 6.1418335, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(76, 47, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(77, 47, '2017-06-09', 'qwerqwer', 'qwerqwr', 46.204093412291, 6.143516600132, 'Passage de la Monnaie 6, 1204 GenÃ¨ve, Suisse'),
(78, 48, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(79, 48, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(80, 48, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.203791757131, 6.1429372429848, 'Rue de la Corraterie 6, 1204 GenÃ¨ve, Suisse'),
(81, 49, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(82, 49, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(83, 49, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.203791757131, 6.1429372429848, 'Rue de la Corraterie 6, 1204 GenÃ¨ve, Suisse'),
(84, 50, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(85, 50, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(86, 50, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.203791757131, 6.1429372429848, 'Rue de la Corraterie 6, 1204 GenÃ¨ve, Suisse'),
(87, 51, '2017-06-09', 'sdfgsdfg', 'sdfgsdfg', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(88, 51, '2017-06-09', 'sdfgsdfg', 'wertwert', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(89, 51, '2017-06-09', 'wertwert', 'wertwert', 46.203448332318, 6.1425268650055, 'Rue FranÃ§ois-Diday 3, 1204 GenÃ¨ve, Suisse'),
(90, 52, '2017-06-09', 'sadf', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(91, 52, '2017-06-09', 'dfgh', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(92, 52, '2017-06-09', 'sdfgsdfg', 'sdfgsdfg', 46.203702652521, 6.1429935693741, 'Rue de la Corraterie 6, 1204 GenÃ¨ve, Suisse'),
(93, 53, '2017-06-09', 'asdf', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(94, 53, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.43407119943, 5.9353637695312, 'Ã€ la Pelaisse, 39400 Longchaumois, France'),
(95, 53, '2017-06-09', 'wertewrtwert', 'asdfasdf', 46.20264638061, 5.6607055664062, 'D95, 01100 Apremont, France'),
(96, 54, '2017-06-09', 'asdf', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(97, 54, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(98, 54, '2017-06-09', 'asdfasdf', 'asdfasdfasdf', 46.203632111269, 6.1412823200226, 'Rue du GrÃ¼tli 4, 1204 GenÃ¨ve, Suisse'),
(99, 55, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(100, 55, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(101, 55, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(102, 56, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(103, 56, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(104, 56, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(105, 57, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(106, 57, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(107, 57, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(108, 58, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(109, 58, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(110, 58, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(111, 59, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(112, 59, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(113, 59, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(114, 60, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(115, 60, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(116, 60, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(117, 61, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(118, 61, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(119, 61, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(120, 62, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(121, 62, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(122, 62, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(123, 63, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(124, 63, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(125, 63, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(126, 64, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(127, 64, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(128, 64, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(129, 65, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(130, 65, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(131, 65, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(132, 66, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(133, 66, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(134, 66, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(135, 67, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(136, 67, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(137, 67, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(138, 68, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(139, 68, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(140, 68, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(141, 69, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(142, 69, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(143, 69, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(144, 70, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(145, 70, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(146, 70, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(147, 71, '2017-06-09', 'qwerqwer', 'qwerwqer', 46.203886430621, 6.142438352108, 'Place de Hollande 2, 1204 GenÃ¨ve, Suisse'),
(148, 71, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(149, 71, '2017-06-09', 'asdfa', 'asdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(150, 72, '2017-06-09', 'qwer', 'qwer', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(151, 72, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(152, 72, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.203240420036, 6.1426019668579, 'Rue Jean-Petitot 12, 1204 GenÃ¨ve, Suisse'),
(153, 73, '2017-06-09', 'qwer', 'qwer', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(154, 73, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(155, 73, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.203240420036, 6.1426019668579, 'Rue Jean-Petitot 12, 1204 GenÃ¨ve, Suisse'),
(156, 74, '2017-06-09', 'qwer', 'qwer', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(157, 74, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(158, 74, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.203240420036, 6.1426019668579, 'Rue Jean-Petitot 12, 1204 GenÃ¨ve, Suisse'),
(159, 75, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2039066, 6.1410441, 'Place de la Poste 3, 1204 GenÃ¨ve, Suisse'),
(160, 75, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(161, 75, '2017-06-09', 'asdfasdf', 'asdfasdf', 46.203724928687, 6.1423337459564, 'Rue du Stand 59, 1204 GenÃ¨ve, Suisse'),
(162, 76, '2017-06-09', 'wertwert', 'wert', 46.203923, 6.1393435, 'Rue de l''Arquebuse 3, 1204 GenÃ¨ve, Suisse'),
(163, 76, '2017-06-09', 'wertwert', 'dgdfg', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(164, 76, '2017-06-09', 'dfgdfg', 'dfgdfg', 46.203476177653, 6.1431840062141, 'Rue de la Corraterie 3, 1204 GenÃ¨ve, Suisse'),
(165, 77, '2017-06-09', 'qwer', 'qwer', 46.203923, 6.1393435, 'Rue de l''Arquebuse 3, 1204 GenÃ¨ve, Suisse'),
(166, 77, '2017-06-09', 'wertwert', 'ertzertz', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(167, 77, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.202577694387, 6.1434146761894, 'Rue de la Corraterie 17, 1204 GenÃ¨ve, Suisse'),
(168, 78, '2017-06-09', 'wertwert', 'wertwert', 46.202997235923, 6.1454558372498, 'Rue Frank-Martin 10, 1204 GenÃ¨ve, Suisse'),
(169, 78, '2017-06-09', 'wertwert', 'wertwert', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(170, 78, '2017-06-09', 'wert', 'wertwert', 46.203923, 6.1393435, 'Rue de l''Arquebuse 3, 1204 GenÃ¨ve, Suisse'),
(171, 79, '2017-06-09', 'sdfgsdfg', 'sdfg', 46.203923, 6.1393435, 'Rue de l''Arquebuse 3, 1204 GenÃ¨ve, Suisse'),
(172, 79, '2017-06-09', 'sdfgsdfg', 'sdfgdfg', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(173, 79, '2017-06-09', 'wertwert', 'wertwret', 46.203639536668, 6.1412903666496, 'Rue du Stand 64, 1204 GenÃ¨ve, Suisse'),
(174, 80, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.203923, 6.1393435, 'Rue de l''Arquebuse 3, 1204 GenÃ¨ve, Suisse'),
(175, 80, '2017-06-09', 'wertwertwert', 'wertwert', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(176, 80, '2017-06-09', 'wertwert', 'wertwert', 46.203578277094, 6.1430311203003, 'Rue Firmin-Abauzit 2, 1204 GenÃ¨ve, Suisse'),
(177, 81, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.203923, 6.1393435, 'Rue de l''Arquebuse 3, 1204 GenÃ¨ve, Suisse'),
(178, 81, '2017-06-09', 'qwer', 'qwer', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(179, 81, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.203637680318, 6.1413010954857, 'Rue du Stand 64, 1204 GenÃ¨ve, Suisse'),
(180, 82, '2017-06-09', 'qwerqwer', 'qwerqwer', 46.203923, 6.1393435, 'Rue de l''Arquebuse 3, 1204 GenÃ¨ve, Suisse'),
(181, 82, '2017-06-09', 'qwerqwer', 'qwre', 46.2043907, 6.1431577, 'GenÃ¨ve, Suisse'),
(182, 82, '2017-06-09', 'qwerqwer', 'ertzertz', 46.20366181286, 6.1413440108299, 'Rue du Stand 59, 1204 GenÃ¨ve, Suisse');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
