-- MySQL dump 10.13  Distrib 5.7.20, for macos10.12 (x86_64)
--
-- Host: localhost    Database: smoky_truck
-- ------------------------------------------------------
-- Server version 5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actus`
--

DROP TABLE IF EXISTS `actus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(50) DEFAULT NULL,
  `titre` varchar(50) DEFAULT NULL,
  `sous_titre` varchar(50) DEFAULT NULL,
  `texte` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actus`
--

LOCK TABLES `actus` WRITE;
/*!40000 ALTER TABLE `actus` DISABLE KEYS */;
INSERT INTO `actus` VALUES (2,'news-2.jpg','Titre 2',NULL,'bla bla bla bla bla bla bla bla bla bla bla bla');
/*!40000 ALTER TABLE `actus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `idcategory` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idcategory`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'entree'),(2,'plat'),(3,'dessert');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `idmenu` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(60) NOT NULL,
  `price` int(11) NOT NULL,
  `pieces` varchar(10) NOT NULL,
  `image` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL,
  `category` int(11) NOT NULL,
  PRIMARY KEY (`idmenu`),
  KEY `category_idx` (`category`),
  CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `category` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (4,'Test entrée 2','<p>bla bla bla</p>',2,'2','entrée2.jpg','picto_vide.png',1),(5,'Entrée 3','<p>bla bla bla</p>',2,'2','entrée3.jpg','picto_vege.png',1),(7,'Pizza 1','<p>bla bla bla</p>',10,'1','pizza1.jpg','picto_gluten.png',2),(9,'Brushettas','<p>brushettes muy bonitas</p>',2,'2','entrée4.jpg','picto_gluten.png',1),(10,'Entrée 4','<p>dzzd</p>',2,'2','entrée1.jpg','picto_gluten.png',1),(11,'5555','<p>entr&eacute;e 5</p>',5,'2','news-3.jpg','picto_lactose.png',1),(12,'Pizza rica','<p>mas pizza rica</p>',4,'for two','pizza2.jpg','picto_lactose.png',2),(13,'Pizza mas rica','<p>rica pizza pizza</p>',5,'for one','pizza3.jpg','picto_gluten.png',2),(14,'veggie pizza','<p>veggie</p>',6,'for one','pizza4.jpg','picto_vege.png',2),(15,'carnivore','<p>carnivore</p>',8,'for one','pizza5.jpg','picto_vide.png',2),(16,'californienne','<p>jambon</p>',6,'for one','pizza6.jpg','picto_gluten.png',2),(17,'Chocobrownie','<p>chocolat</p>',10,'6','dessert1.jpg','picto_lactose.png',3),(18,'dessert2','<p>dessert2</p>',13,'for two','dessert2.jpg','picto_vide.png',3),(19,'dessert3','<p>dessert3</p>',15,'for one','dessert3.jpg','picto_vide.png',3),(20,'dessert4','<p>algomas</p>',3,'for one','dessert4.jpg','picto_vide.png',3);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `places` (
  `idplaces` int(11) NOT NULL AUTO_INCREMENT,
  `adresse` varchar(45) NOT NULL,
  PRIMARY KEY (`idplaces`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,'Smoky 104'),(2,'Smoky 104'),(3,'Smoky Rive Droite'),(4,'Smoky Rive Gauche'),(5,'Smoky 104'),(6,'Smoky 104'),(7,'Smoky Rive Gauche'),(8,'Smoky Rive Droite'),(9,'Smoky Rive Droite'),(10,'Smoky Rive Gauche');
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'alexis','deer');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-06 20:00:08
