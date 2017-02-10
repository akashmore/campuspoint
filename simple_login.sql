-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 10.10.13.13
-- Generation Time: Apr 07, 2016 at 12:24 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `simple_login`
--

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `mem_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`mem_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`mem_id`, `username`, `password`) VALUES
(1, 'sait', 'sait123'),
(2, 'access', 'access123'),
(3, 'wlug', 'wlug123'),
(4, 'eesa', 'eesa123'),
(5, 'elesa', 'elesa123'),
(6, 'rotract', 'rotract123'),
(7, 'pace', 'pace123'),
(8, 'mesa', 'mesa123'),
(9, 'artcircle', 'artcircle123'),
(10, 'cesa', 'cesa123'),
(11, 'softa', 'softa123'),
(12, 'it', 'it123'),
(13, 'cse', 'cse123'),
(14, 'electronics', 'electronics123'),
(15, 'electrical', 'electrical123'),
(16, 'mechanical', 'mechanical123'),
(17, 'civil', 'civil123');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE IF NOT EXISTS `video` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `link` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `fid`, `type`, `link`) VALUES
(1, 's', 'mp4', 'abc.mp4');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
