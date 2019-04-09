/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-09 14:32:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ground_info
-- ----------------------------
DROP TABLE IF EXISTS `ground_info`;
CREATE TABLE `ground_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `point_num` varchar(255) DEFAULT NULL,
  `point_intro` varchar(255) DEFAULT NULL,
  `point_depth` double(30,3) DEFAULT NULL,
  `ground_num` varchar(255) DEFAULT NULL,
  `sampling_time` double(30,3) DEFAULT NULL,
  `point_address` varchar(255) DEFAULT NULL,
  `point_lng` double(30,10) NOT NULL,
  `point_lat` double(30,10) NOT NULL,
  `point_monitor_time` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ground_info
-- ----------------------------
INSERT INTO `ground_info` VALUES ('1', '31010720190001001', 'MW-2', '1.300', '31010720190001', '24.000', 'B3', '121.4425690000', '31.2295880000', '2019.01.16', '无');
INSERT INTO `ground_info` VALUES ('2', '31010720190001002', 'MW-2', '1.300', '31010720190001', '24.000', 'B1', '121.4425690000', '31.2295880000', '2019.01.17', '哈哈');
INSERT INTO `ground_info` VALUES ('3', '31010720190001003', 'MW-2', '1.500', '31010720190001', '24.000', 'A2', '121.4625690000', '31.2995880000', '2019.01.12', '哈哈2');
INSERT INTO `ground_info` VALUES ('4', '31010720190001004', 'MW-3', '1.900', '31010720190002', '24.000', 'B1', '121.4225690000', '31.2395880000', '2019.01.12', '哈哈3');
INSERT INTO `ground_info` VALUES ('5', '31010720190001009', 'MW-9', '1.900', '31010720190009', '24.000', 'B1', '121.4225690000', '31.2395880000', '2019.04.08', '哈哈3');
SET FOREIGN_KEY_CHECKS=1;
