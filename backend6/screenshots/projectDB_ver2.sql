-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: fullstack2022db1
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `fullstack2022db1`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `fullstack2022db1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `fullstack2022db1`;

--
-- Table structure for table `friendlist1`
--

DROP TABLE IF EXISTS `friendlist1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendlist1` (
  `row_id` int NOT NULL AUTO_INCREMENT,
  `user_uuid` varchar(36) DEFAULT NULL,
  `friend_uuid` varchar(36) DEFAULT NULL,
  `friend_description` varchar(300) DEFAULT NULL,
  `friend_is_blocked` tinyint DEFAULT NULL,
  `status` varchar(16) DEFAULT NULL,
  `request_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendlist1`
--

LOCK TABLES `friendlist1` WRITE;
/*!40000 ALTER TABLE `friendlist1` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendlist1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grouplist1`
--

DROP TABLE IF EXISTS `grouplist1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grouplist1` (
  `row_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) DEFAULT NULL,
  `group_description` varchar(300) DEFAULT NULL,
  `group_uuid` varchar(36) DEFAULT NULL,
  `member_uuid` varchar(36) DEFAULT NULL,
  `member_is_blocked` tinyint DEFAULT NULL,
  `status` varchar(16) DEFAULT NULL,
  `request_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grouplist1`
--

LOCK TABLES `grouplist1` WRITE;
/*!40000 ALTER TABLE `grouplist1` DISABLE KEYS */;
/*!40000 ALTER TABLE `grouplist1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message1`
--

DROP TABLE IF EXISTS `message1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message1` (
  `row_id` int NOT NULL AUTO_INCREMENT,
  `message_content` varchar(5000) DEFAULT NULL,
  `sender_uuid` varchar(36) DEFAULT NULL,
  `person_receiver_uuid` varchar(36) DEFAULT NULL,
  `group_receiver_uuid` varchar(36) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `message_receiver_type` varchar(16) DEFAULT NULL,
  `message_visible_status` tinyint DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message1`
--

LOCK TABLES `message1` WRITE;
/*!40000 ALTER TABLE `message1` DISABLE KEYS */;
INSERT INTO `message1` VALUES (1,'gorill love write messages yeahhhh',NULL,NULL,'empty','2023-01-07 05:14:32',NULL,1),(2,'gorilla write again, hohoho',NULL,NULL,'empty','2023-01-07 05:25:13',NULL,1),(3,'gorilla write again, hello everyone, this is another attempt to send message and check, if everything is saved right to database',' gorillauser','personal','empty','2023-01-07 05:30:52','personal',1),(4,'hello','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','empty','empty','2023-01-07 18:29:39','public',1),(5,'hello','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','empty','empty','2023-01-07 18:29:49','public',1),(6,'heheheh','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','empty','empty','2023-01-07 18:31:28','public',1),(7,'hello stanislav, it\'s 2nd attempt gorilla reach you with personal message, hope you find my messag!','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','720b1410-8c7e-11ed-984d-1528c4aecbd9','empty','2023-01-07 18:36:31','private',1),(8,'klölköl','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','empty','empty','2023-01-07 18:54:25','personal',1),(9,'klölköl','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','empty','empty','2023-01-07 18:54:30','personal',1),(10,'yes, personal message','720b1410-8c7e-11ed-984d-1528c4aecbd9','empty','empty','2023-01-07 19:01:28','personal',1),(11,'nice to see gorilla, thanks for message','720b1410-8c7e-11ed-984d-1528c4aecbd9','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','empty','2023-01-07 19:12:50','private',1),(12,'I am glad to write your message','720b1410-8c7e-11ed-984d-1528c4aecbd9','empty','empty','2023-01-07 19:13:18','personal',1),(13,'I am glad to write your message 4565','720b1410-8c7e-11ed-984d-1528c4aecbd9','empty','empty','2023-01-07 19:13:39','public',1),(14,'I am glad to write your message x<zx<z','720b1410-8c7e-11ed-984d-1528c4aecbd9','2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','empty','2023-01-07 19:13:57','private',1);
/*!40000 ALTER TABLE `message1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `msg1`
--

DROP TABLE IF EXISTS `msg1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `msg1` (
  `row_id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `msg1`
--

LOCK TABLES `msg1` WRITE;
/*!40000 ALTER TABLE `msg1` DISABLE KEYS */;
INSERT INTO `msg1` VALUES (1,'my test message'),(2,'another message for 2nd row');
/*!40000 ALTER TABLE `msg1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table1`
--

DROP TABLE IF EXISTS `user_table1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table1` (
  `row_id` int NOT NULL AUTO_INCREMENT,
  `user_uuid` varchar(36) DEFAULT NULL,
  `password_hash_sha256` varchar(64) DEFAULT NULL,
  `user_is_blocked` tinyint DEFAULT NULL,
  `user_permission_level` tinyint DEFAULT NULL,
  `user_is_online` tinyint DEFAULT NULL,
  `registered_date` datetime DEFAULT NULL,
  `last_online_date` datetime DEFAULT NULL,
  `user_maintenance_info` varchar(500) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table1`
--

LOCK TABLES `user_table1` WRITE;
/*!40000 ALTER TABLE `user_table1` DISABLE KEYS */;
INSERT INTO `user_table1` VALUES (1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','da548fcfd2c0d59e9137d950038a1ebf049276ee0eb1ebc65e5cd3efe31f6c4f',0,0,1,'2023-01-05 00:23:42','2023-01-07 18:55:14','default user, nothing to say','stanislav'),(2,'bff9d8a0-8c83-11ed-b080-c7bf91ae690d','4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4',0,0,0,'2023-01-05 01:01:40','2023-01-05 01:01:40','default user, nothing to say','monsteruser'),(3,'2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4',0,0,1,'2023-01-05 01:33:26','2023-01-07 21:32:07','default user, nothing to say','gorillauser');
/*!40000 ALTER TABLE `user_table1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-07 21:39:58
