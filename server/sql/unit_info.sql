/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-22 21:17:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for unit_info
-- ----------------------------
DROP TABLE IF EXISTS `unit_info`;
CREATE TABLE `unit_info` (
  `id` varchar(255) NOT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of unit_info
-- ----------------------------
INSERT INTO `unit_info` VALUES ('1', '', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg');
INSERT INTO `unit_info` VALUES ('2', 'PH值', '砷', '镉', '铬', '铜', '铅', '汞', '镍', '锑', '铍', '钴', '锌', '银', '铊', '锡', '硒', '矾', '钼');
SET FOREIGN_KEY_CHECKS=1;
