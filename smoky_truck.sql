-- MySQL dump 10.13  Distrib 5.7.20, for macos10.12 (x86_64)
--
-- Host: localhost    Database: smoky_truck
-- ------------------------------------------------------
-- Server version	5.7.20

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
  `titre` varchar(100) DEFAULT NULL,
  `sous_titre` varchar(100) DEFAULT NULL,
  `texte` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actus`
--

LOCK TABLES `actus` WRITE;
/*!40000 ALTER TABLE `actus` DISABLE KEYS */;
INSERT INTO `actus` VALUES (2,'actu2.png','Festival FoodTruck','On est invités d\'honneur!','<p>Organis&eacute; au Carreau du Temple, ce festival de food truck accueille les meilleurs trucks de la m&eacute;tropole.&nbsp;</p>'),(3,'actu1.png','New place!!','Smoky Truck arrive à la Rive Gauche!','<p>Quelques fois par semaine le Smoky Truck passera de l\'autre c&ocirc;t&eacute; de la Seine, il commence &agrave; &eacute;largir peu &agrave; peu ses horizons.</p>'),(4,'news-2.jpg','Bienvenu au nouveau site!','Le site du Smoky Truck fait peau neuve!','Naviguez sur notre site, la team est heureuse de vous présenter notre nouvelle image sur le web.');
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
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
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
INSERT INTO `menu` VALUES (1,'Charcuterie du moment','Demander plus pour connaître nos sélections, des choix gourmands pour tous les goûts',12,'2pers.','entree3.jpg','picto_vide.png',1),(4,'Brushettas verde','<p>Poivre, pomme de terre, huile d\'olive, choux et sel.</p>\r\n<p>Avec une sauce aux courgettes et une fin touche d\'a&iuml;l.&nbsp;</p>',4,'2 pièces','entree4.jpg','picto_vege.png',1),(9,'Paname tortilla','<p>Chorizo, poivre, oeuf, pomme de terre, oignon classique, sel, herbes de provence et petit pos.</p>',4,'1 part','entree2.jpg','picto_vide.png',1),(10,'Smoky Brushettas','<p>Poivre, pain de campagne, tomates, huile d\'olive, gruy&egrave;re rap&eacute;.</p>\r\n<p>Et 5 minutes au four!</p>',6,'2 pièces','entree1.jpg','picto_vege.png',1),(11,'Smoky Tex','Tomate, viande de bœuf, fromage, oignons, haricots rouge, maïs, poivrons, sauce barbecue.',10,'tailleM','pizza2.jpg','picto_vide.png',2),(13,'Pizza Te quiero verde','<p>Pizza aux courgettes et &agrave; la feta,</p>\r\n<p>tomates et du thym.</p>',10,'taille M','pizza3.jpg','picto_vege.png',2),(14,'Extravaganza','Sauce tomate, mozzarella, saucisson  et pepperoni, champignons, oignons rouges, poivrons mélangés et olives noires.',12,'taille M','pizza4.jpg','picto_vide.png',2),(15,'Carnivore','<p>Tomate, burrata, roquette, jambon et huile d\'olive.</p>',10,'taille M','pizza6.jpg','picto_vide.png',2),(16,'La classique','<p>Pizza margherita traditionnelle &agrave; Naples.</p>',8,'taille M','pizza1.jpg','picto_gluten.png',2),(17,'Gauffre gourmande','<p>Nos sublime gauffres peuvent venir avec du chocolat, des fraises ou d\'autre fruits selon la saison.&nbsp; Le caf&eacute; est offert afin de parachever la gourmandise.</p>',5,'café inclu','dessert1.jpg','picto_vide.png',3),(18,'Tiramisu frutti di bosco','<p>Notre p&acirc;tisserie maison \"tire-moi vers le haut\" inspir&eacute; du chef p&acirc;tissier Loli du restaurant <em>Alle Beccherie&nbsp;</em>de Tr&eacute;vise.</p>',6,'2 pers.','dessert2.jpg','picto_vide.png',3),(19,'Smoky Brownie','<p>D&eacute;licieux brownie au chocolat sans lactose.&nbsp;</p>',5,'1 part','dessert3.jpg','picto_lactose.png',3),(20,'Smoothie Vitaminé','<p>Smoothie cr&eacute;e &agrave; partir d\'une vari&eacute;t&eacute; des fruits de la saison et l\'ajout des suppl&eacute;ments pour le bien &ecirc;tre de l\'organisme.</p>',5,'1 pers.','dessert4.jpg','picto_vide.png',3),(21,'Smoky Calzone','Pizza retournée et fourrée au mozzarella, tomates et jambon.',14,'2 pers.','pizza5.jpg','picto_vide.png',2);
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
INSERT INTO `places` VALUES (1,'4 Rue Eugène Spuller Paris, 75003'),(2,'104 Rue d\'Auberviliers Paris, 75019'),(3,'104 Rue d\'Auberviliers Paris, 75019'),(4,'11 Rue de Poissy Paris, 75005'),(5,'4 Rue Eugène Spuller Paris, 75003'),(6,'4 Rue Eugène Spuller Paris, 75003'),(7,'11 Rue de Poissy Paris, 75005'),(8,'104 Rue d\'Auberviliers Paris, 75019'),(9,'104 Rue d\'Auberviliers Paris, 75019'),(10,'4 Rue Eugène Spuller Paris, 75003');
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

-- Dump completed on 2017-11-07 13:53:08
