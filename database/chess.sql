-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 10 Janvier 2022 à 20:00
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `chess`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `image` text NOT NULL,
  `telephone` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `nom`, `prenom`, `image`, `telephone`, `email`, `password`) VALUES
(1, 'jihen', 'chaouch', '', 1, 'jihenechaouch@gmail.com', 'jiji123'),
(2, 'syrine', 'kha', '', 25364596, 'syrine@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Structure de la table `competition`
--

CREATE TABLE IF NOT EXISTS `competition` (
  `id_competition` int(11) NOT NULL AUTO_INCREMENT,
  `nb_competition` int(11) NOT NULL,
  `date_competition` date NOT NULL,
  `gagnant` varchar(20) NOT NULL,
  `looser` varchar(20) NOT NULL,
  PRIMARY KEY (`id_competition`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `competition`
--

INSERT INTO `competition` (`id_competition`, `nb_competition`, `date_competition`, `gagnant`, `looser`) VALUES
(1, 1, '2022-01-04', 'jihen', 'iheb');

-- --------------------------------------------------------

--
-- Structure de la table `email`
--

CREATE TABLE IF NOT EXISTS `email` (
  `id_msg` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `Objet` text NOT NULL,
  `Message` longtext NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`id_msg`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `email`
--

INSERT INTO `email` (`id_msg`, `nom`, `prenom`, `Objet`, `Message`, `Date`) VALUES
(1, 'raed', 'makhlouf', 'problem de connexion', 'blablabla', '2022-01-04');

-- --------------------------------------------------------

--
-- Structure de la table `joueur`
--

CREATE TABLE IF NOT EXISTS `joueur` (
  `id_joueur` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `nb_competition` int(11) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id_joueur`),
  UNIQUE KEY `nb_competition` (`nb_competition`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `joueur`
--

INSERT INTO `joueur` (`id_joueur`, `username`, `nb_competition`, `email`, `password`) VALUES
(1, 'jihene', 1, 'jihenechaouch@gmail.com', '0000'),
(2, '', NULL, 'contact@polytecsousse.tn', 'foufou'),
(3, '', NULL, 'souhir@gmail.com', 'dddd'),
(6, '', NULL, 'jamel@gmail.com', 'dddd'),
(8, '', NULL, 'haifa@gmail.com', 'hafhouf'),
(9, 'haifa', NULL, 'haifa@hotmail.com', 'haifa');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `joueur`
--
ALTER TABLE `joueur`
  ADD CONSTRAINT `fk_comp` FOREIGN KEY (`nb_competition`) REFERENCES `competition` (`id_competition`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
