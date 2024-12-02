-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_blindtest
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question_title` varchar(255) DEFAULT NULL,
  `question_url` varchar(255) DEFAULT NULL,
  `question_answer` varchar(255) DEFAULT NULL,
  `question_type` varchar(255) DEFAULT NULL,
  `question_options` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (2,'D\'où vient cette musique ?','https://www.youtube.com/watch?v=yu0HjPzFYnY&ab_channel=Crunchyroll','My hero academia','anime','[\"Option 1\", \"Option 2\", \"Option 3\"]','2024-10-16 14:16:14','2024-10-16 14:16:14'),(3,'D\'où vient cette musique ?','https://www.youtube.com/watch?v=2upuBiEiXDk&ab_channel=Crunchyroll','Naruto','anime','[\"Option 1\", \"Option 2\", \"Option 3\"]','2024-10-16 14:18:45','2024-10-16 14:18:45'),(4,'D\'où vient cette musique ?','https://www.youtube.com/watch?v=Oo52vQyAR6w&ab_channel=Crunchyroll','One piece','anime','[\"Option 1\", \"Option 2\", \"Option 3\"]','2024-10-16 17:48:45','2024-10-16 17:48:45'),(5,'D\'où vient cette musique ?','https://www.youtube.com/watch?v=FJqGirLjQn4&ab_channel=YuusukeTakahashi','Dragon ball','anime','[\"Option 1\", \"Option 2\", \"Option 3\"]','2024-10-16 17:49:24','2024-10-16 17:49:24'),(6,'D\'où vient cette musique ?','https://www.youtube.com/watch?v=tul6zYBp9tA&ab_channel=NiskaOfficiel','Niska','rapFr','Réseaux, Option2, Option3, Option4','2024-10-20 11:57:12','2024-10-20 11:57:12');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-11 12:04:42
