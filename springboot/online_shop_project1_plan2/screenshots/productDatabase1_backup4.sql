-- MySQL dump 10.13  Distrib 5.7.42, for Linux (x86_64)
--
-- Host: localhost    Database: fullstack2022db1
-- ------------------------------------------------------
-- Server version	5.7.42

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
-- Current Database: `fullstack2022db1`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `fullstack2022db1` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `fullstack2022db1`;

--
-- Table structure for table `message1`
--

DROP TABLE IF EXISTS `message1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message1` (
  `row_id` int(11) NOT NULL AUTO_INCREMENT,
  `message_content` varchar(5000) DEFAULT NULL,
  `sender_uuid` varchar(36) DEFAULT NULL,
  `person_receiver_uuid` varchar(36) DEFAULT NULL,
  `group_receiver_uuid` varchar(36) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `message_receiver_type` varchar(16) DEFAULT NULL,
  `message_visible_status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message1`
--

LOCK TABLES `message1` WRITE;
/*!40000 ALTER TABLE `message1` DISABLE KEYS */;
INSERT INTO `message1` VALUES (1,'Hello everyone !','1211d320-791b-11ee-a1be-5bbb0db80c9e','empty','empty','2023-11-02 03:00:51','public',1),(2,'hello stanislav ! only you can view this message','1211d320-791b-11ee-a1be-5bbb0db80c9e','720b1410-8c7e-11ed-984d-1528c4aecbd9','empty','2023-11-02 03:01:17','private',1);
/*!40000 ALTER TABLE `message1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `row_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type` int(11) DEFAULT NULL,
  `product_category_name` varchar(500) DEFAULT NULL,
  `product_parrent_type` int(11) DEFAULT NULL,
  `product_parrent_category_name` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,300,'Soffa',300,'Furniture'),(2,101,'Desktops',100,'Computers'),(3,102,'Laptops',100,'Computers'),(4,103,'Tablet PC',100,'Computers'),(5,104,'MacBooks',100,'Computers'),(6,105,'iPads',100,'Computers'),(7,302,'Chair',300,'Furniture'),(8,303,'Table',300,'Furniture'),(9,304,'Shelf',300,'Furniture'),(10,305,'Wardrobe',300,'Furniture'),(11,306,'Clothers warddrobe',300,'Furniture'),(12,307,'Bed',300,'Furniture'),(13,308,'Kids bed',300,'Furniture'),(14,401,'Aloe vera',400,'Plants'),(15,402,'Cactus',400,'Plants'),(16,403,'Polyscians',400,'Plants'),(17,403,'Carnivorous plant',400,'Plants');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopProduct1`
--

DROP TABLE IF EXISTS `shopProduct1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopProduct1` (
  `rowId` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(500) DEFAULT NULL,
  `productType` int(11) DEFAULT NULL,
  `productImageURL` varchar(500) DEFAULT NULL,
  `productDescription` varchar(10000) DEFAULT NULL,
  `productPricePerUnit` double DEFAULT NULL,
  `productQuantity` smallint(6) DEFAULT NULL,
  `productQuantityOption` varchar(500) DEFAULT NULL,
  `shippingInfo` varchar(500) DEFAULT NULL,
  `shippingPriceSameCountry` double DEFAULT NULL,
  `shippingPriceEurope` double DEFAULT NULL,
  `shippingPriceWorld` double DEFAULT NULL,
  `sellerUUID` varchar(36) DEFAULT NULL,
  `sellerQualityScore` double DEFAULT NULL,
  `productQualityScore` double DEFAULT NULL,
  `productFeedback` varchar(10000) DEFAULT NULL,
  `buyerUUID` varchar(36) DEFAULT NULL,
  `buyerQualityScore` double DEFAULT NULL,
  `buyerQualityInfoVSProduct` varchar(500) DEFAULT NULL,
  `productCreated` datetime DEFAULT NULL,
  `productClosed` datetime DEFAULT NULL,
  `productWarrantyAndRefund` varchar(500) DEFAULT NULL,
  `productPublicVisible` tinyint(4) DEFAULT NULL,
  `adminInfo` varchar(500) DEFAULT NULL,
  `productUUID` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`rowId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopProduct1`
--

LOCK TABLES `shopProduct1` WRITE;
/*!40000 ALTER TABLE `shopProduct1` DISABLE KEYS */;
INSERT INTO `shopProduct1` VALUES (1,'Computer',100,NULL,'10 years old, but working',35.8,1,NULL,'I trade EU or schengen contries only, please check...',20.4,20.4,NULL,NULL,NULL,NULL,NULL,'720b1410-8c7e-11ed-984d-1528c4aecbd9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `shopProduct1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_product1`
--

DROP TABLE IF EXISTS `shop_product1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop_product1` (
  `row_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_info` varchar(255) DEFAULT NULL,
  `buyer_quality_infovsproduct` varchar(255) DEFAULT NULL,
  `buyer_quality_score` double DEFAULT NULL,
  `buyeruuid` varchar(255) DEFAULT NULL,
  `product_closed` datetime DEFAULT NULL,
  `product_created` datetime DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_feedback` varchar(255) DEFAULT NULL,
  `product_imageurl` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_price_per_unit` double DEFAULT NULL,
  `product_public_visible` int(11) DEFAULT NULL,
  `product_quality_score` double DEFAULT NULL,
  `product_quantity` int(11) DEFAULT NULL,
  `product_quantity_option` varchar(255) DEFAULT NULL,
  `product_type` int(11) DEFAULT NULL,
  `productuuid` varchar(255) DEFAULT NULL,
  `product_warranty_and_refund` varchar(255) DEFAULT NULL,
  `seller_quality_score` double DEFAULT NULL,
  `selleruuid` varchar(255) DEFAULT NULL,
  `shipping_info` varchar(255) DEFAULT NULL,
  `shipping_price_europe` double DEFAULT NULL,
  `shipping_price_same_country` double DEFAULT NULL,
  `shipping_price_world` double DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_product1`
--

LOCK TABLES `shop_product1` WRITE;
/*!40000 ALTER TABLE `shop_product1` DISABLE KEYS */;
INSERT INTO `shop_product1` VALUES (1,NULL,NULL,1,NULL,NULL,NULL,'for comfort sitting',NULL,'productimages/soffa1.jpeg','Soffa',300.5,1,1,5,NULL,300,'uuid-1',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',120.4,120.4,-1),(2,NULL,NULL,1,NULL,NULL,NULL,'it is just plant',NULL,'productimages/aloe_vera1.jpg','Aloe vera',72.8,1,1,20,NULL,401,'uuid-2',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',56.8,56.8,-1),(3,NULL,NULL,1,NULL,NULL,NULL,'old laptop computer, very cheap now',NULL,'productimages/laptop1.png','hp compaq nc6220',35,1,1,2,NULL,102,'uuid-3',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',80.75,80.75,-1),(4,NULL,NULL,1,NULL,NULL,NULL,'it is just plant',NULL,'productimages/aloe_vera1.jpg','Aloe vera',72.8,1,1,20,NULL,401,'uuid-4',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',56.8,56.8,-1),(5,NULL,NULL,1,NULL,NULL,NULL,'it is just plant',NULL,'productimages/aloe_vera1.jpg','Aloe vera',72.8,1,1,20,NULL,401,'uuid-5',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',56.8,56.8,-1),(6,NULL,NULL,1,NULL,NULL,NULL,'old laptop computer, very cheap now',NULL,'productimages/laptop1.png','hp compaq nc6220',35,1,1,2,NULL,102,'uuid-6',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',80.75,80.75,-1),(7,NULL,NULL,1,NULL,NULL,NULL,'it is just plant',NULL,'productimages/aloe_vera1.jpg','Aloe vera',72.8,1,1,20,NULL,401,'uuid-7',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',56.8,56.8,-1),(8,NULL,NULL,1,NULL,NULL,NULL,'for comfort sitting',NULL,'productimages/soffa1.jpeg','Soffa',300.5,1,1,5,NULL,300,'uuid-8',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',120.4,120.4,-1),(9,'',NULL,1,NULL,NULL,NULL,'2222',NULL,'/productimages/placeholder1.png','11111',3333,1,1,10,NULL,999,'7fa7a533-79a8-40fb-8224-fd12e7a017d5',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',56.75,56.75,56.75),(10,'',NULL,1,NULL,NULL,NULL,'new product at 7th November 2023',NULL,'/productimages/placeholder1.png','Classic soffa',500.75,1,1,10,NULL,300,'302ce442-d8a5-4db3-bd25-2a4e34b7a16b',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',56.75,56.75,56.75),(11,'',NULL,1,NULL,NULL,NULL,'CPU: Intel Core i5, 4GB(GDDR3 800Mhz)',NULL,'/productimages/placeholder1.png','HP ProBook 6550b',1200.8,1,1,10,NULL,102,'e1890fe0-c025-4e2f-8dc6-ebfb7d291268',NULL,1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','I trade EU or schengen contries only, please check...',56.75,56.75,56.75);
/*!40000 ALTER TABLE `shop_product1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table1`
--

DROP TABLE IF EXISTS `user_table1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_table1` (
  `row_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_uuid` varchar(36) DEFAULT NULL,
  `password_hash_sha256` varchar(64) DEFAULT NULL,
  `user_is_blocked` tinyint(4) DEFAULT NULL,
  `user_permission_level` tinyint(4) DEFAULT NULL,
  `user_is_online` tinyint(4) DEFAULT NULL,
  `registered_date` datetime DEFAULT NULL,
  `last_online_date` datetime DEFAULT NULL,
  `user_maintenance_info` varchar(500) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table1`
--

LOCK TABLES `user_table1` WRITE;
/*!40000 ALTER TABLE `user_table1` DISABLE KEYS */;
INSERT INTO `user_table1` VALUES (1,'720b1410-8c7e-11ed-984d-1528c4aecbd9','da548fcfd2c0d59e9137d950038a1ebf049276ee0eb1ebc65e5cd3efe31f6c4f',0,0,0,'2023-01-05 00:23:42','2023-11-02 03:02:03','default user, nothing to say','stanislav'),(2,'bff9d8a0-8c83-11ed-b080-c7bf91ae690d','4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4',0,0,0,'2023-01-05 01:01:40','2023-01-05 01:01:40','default user, nothing to say','monsteruser'),(3,'2fb47570-8c88-11ed-ab2a-7d1fd7b8db62','4f9f10b304cfe9b2b11fcb1387f694e18f08ea358c7e9f567434d3ad6cbd7fc4',0,0,1,'2023-01-05 01:33:26','2023-11-02 04:16:29','default user, nothing to say','gorillauser'),(4,'1211d320-791b-11ee-a1be-5bbb0db80c9e','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',0,0,0,'2023-11-02 02:59:26','2023-11-02 03:01:27','default user, nothing to say','user1');
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

-- Dump completed on 2023-11-07 16:29:27
