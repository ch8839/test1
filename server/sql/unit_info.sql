/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-04-14 22:40:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for unit_info
-- ----------------------------
DROP TABLE IF EXISTS `unit_info`;
CREATE TABLE `unit_info` (
  `id` varchar(255) NOT NULL,
  `locaton_number` varchar(255) DEFAULT NULL,
  `PHֵ` varchar(255) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of unit_info
-- ----------------------------
INSERT INTO `unit_info` VALUES ('1', '31010720190001001', '', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg');
SET FOREIGN_KEY_CHECKS=1;
