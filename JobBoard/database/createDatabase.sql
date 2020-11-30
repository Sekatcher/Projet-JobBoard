CREATE DATABASE  IF NOT EXISTS `job_advertisements` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `job_advertisements`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: job_advertisements
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `advertisements`
--

DROP TABLE IF EXISTS `advertisements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertisements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `idcompany` int DEFAULT NULL,
  `idpeople` int DEFAULT NULL,
  `wages` varchar(45) DEFAULT NULL,
  `workingTime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcompany_idx` (`idcompany`),
  KEY `idpeople_idx` (`idpeople`),
  CONSTRAINT `idcompany` FOREIGN KEY (`idcompany`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idpeople` FOREIGN KEY (`idpeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertisements`
--

LOCK TABLES `advertisements` WRITE;
/*!40000 ALTER TABLE `advertisements` DISABLE KEYS */;
INSERT INTO `advertisements` VALUES (57,'Alternance','Venez travaillez avec nous vous ne serez pas déçu','France',1,28,'900€','35h'),(58,'Web Designer','We have a good atmosphere in our company','USA',2,28,'2000$','36h');
/*!40000 ALTER TABLE `advertisements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Tech & Co'),(2,'Blob Enterprise');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_application`
--

DROP TABLE IF EXISTS `job_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_application` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idprovider` int DEFAULT NULL,
  `idapplier` int DEFAULT NULL,
  `idadvertisement` int DEFAULT NULL,
  `jobApplicationMessage` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idapplier_idx` (`idapplier`),
  KEY `idprovider_idx` (`idprovider`),
  KEY `idadvertisements_idx` (`idadvertisement`),
  CONSTRAINT `idadvertisements` FOREIGN KEY (`idadvertisement`) REFERENCES `advertisements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idapplier` FOREIGN KEY (`idapplier`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idprovider` FOREIGN KEY (`idprovider`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_application`
--

LOCK TABLES `job_application` WRITE;
/*!40000 ALTER TABLE `job_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `admin` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (28,'admin',NULL,'$2a$10$PRKbVWN1KFN6PEmXC6PzCOAj8jrIOwyTHgOF9VzuU/OE085fqsmRy',NULL,1);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-18 19:39:23
