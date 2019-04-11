/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-04-11 10:52:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for location_ph
-- ----------------------------
DROP TABLE IF EXISTS `location_ph`;
CREATE TABLE `location_ph` (
  `id` varchar(255) NOT NULL,
  `locaton_number` varchar(255) DEFAULT NULL,
  `PH` varchar(255) DEFAULT NULL,
  `arsenic` varchar(255) DEFAULT NULL,
  `cadmium` varchar(255) DEFAULT NULL,
  `chromium` varchar(255) DEFAULT NULL,
  `copper` varchar(255) DEFAULT NULL,
  `lead` varchar(255) DEFAULT NULL,
  `mercury` varchar(255) DEFAULT NULL,
  `nickel` varchar(255) DEFAULT NULL,
  `antimony` varchar(255) DEFAULT NULL,
  `beryllium` varchar(255) DEFAULT NULL,
  `cobalt` varchar(255) DEFAULT NULL,
  `zinc` varchar(255) DEFAULT NULL,
  `silver` varchar(255) DEFAULT NULL,
  `thallium` varchar(255) DEFAULT NULL,
  `tin` varchar(255) DEFAULT NULL,
  `selenium` varchar(255) DEFAULT NULL,
  `molybdenum` varchar(255) DEFAULT NULL,
  `Alum` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of location_ph
-- ----------------------------
INSERT INTO `location_ph` VALUES ('2', '31010720190001001', '7.9', '6.2', '0.03', '31', '26.32', '26.2', '0.362', '31', '0.136', '1.236', '18.236', '95.3', '0.22', '0.3', '2', 'ND', '0.3', '0.451', '2019.2.1');
INSERT INTO `location_ph` VALUES ('3', '31010720190001002', '4.6', '1.2', '0.07', '6.323', '21.236', '21.26', '0.125', '21.23', '0.265', '1.659', '13.201', '12.326', '0.456', '0.135', '3', '0.148', '0.135', '0.128', '2019.1.16');
INSERT INTO `location_ph` VALUES ('4', '31010720190001003', '6.265', '18.26', '0.156', '12.265', '13.248', 'ND', 'ND', '0.156', '12.16', '6.218', '23.218', '31.254', '13.29', '2.546', '4', '2.118', '2.546', '2.1564', '2019.3.1');
INSERT INTO `location_ph` VALUES ('5', '31010720190001004', '4.265', '11.235', '0.196', '22.213', '16.226', '13.21', '0.956', '13.214', '0.9623', '3.2365', '13.208', '1.236', '33.215', 'ND', '5', '0.01156', 'ND', '3.2156', '2019.3.21');
INSERT INTO `location_ph` VALUES ('6', '31010720190001005', '6.3216', '13.264', '0.1966', 'ND', 'ND', '0.1632', '7.216', '6.2134', '13.314', '1.326', 'ND', '21.221', '2.218', '6.654', '6', '6.213', '6.654', '1.238', '2019.2.26');
INSERT INTO `location_ph` VALUES ('7', '31010720190001006', '4.216', '5.213', '16.214', '3.213', '4.213', '2.231', '3.216', '11.246', '7.265', '8.216', '9.213', '6.213', '2.3', '1.265', '7', '7.21', '1.265', '3.33', '2019.2.23');
INSERT INTO `location_ph` VALUES ('8', '31010720190001007', '6.32', '3.21', '0.326', '1.236', '8.26', '6.31', '9.21', '12.3', '16.21', '6.21', '7.16', '4.21', 'ND', '3.21', '8', '3.15', '3.21', '15.21', '2019.1.16');
INSERT INTO `location_ph` VALUES ('9', '31010720190001008', '6.21', '9.12', '9.13', '13.21', '10.26', '14.21', '21.16', '21.33', 'ND', '1.26', '1.56', '1.98', '1.32', '1.65', '9', '1.92', '1.65', '3.21', '2019.1.19');
SET FOREIGN_KEY_CHECKS=1;
