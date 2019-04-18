/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-04-17 22:13:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `ground_name` varchar(255) DEFAULT NULL,
  `ground_num` varchar(255) DEFAULT NULL,
  `ground_type` int(11) DEFAULT NULL,
  `assess_type` int(11) DEFAULT NULL,
  `ground_lng` double(30,10) DEFAULT NULL,
  `ground_lat` double(30,10) DEFAULT NULL,
  `monitor_time` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_info
-- ----------------------------
INSERT INTO `project_info` VALUES ('3', '0001', '静安1号', '31010720190001', '1', '3', '121.4425690000', '31.2195880000', '2019.01.16', '无');
INSERT INTO `project_info` VALUES ('4', '0001', '静安2号', '31010720190002', '1', '2', '121.4553860000', '0.0000000000', '2019.01.12', '2');
INSERT INTO `project_info` VALUES ('5', '0001', '静安3号', '31010720190003', '2', '3', '121.4587540000', '31.2244260000', '2019.01.11', '1');
INSERT INTO `project_info` VALUES ('6', '0002', '长宁1号', '31110720190001', '3', '1', '121.4465690000', '31.2232880000', '2019.01.12', '3');
INSERT INTO `project_info` VALUES ('7', '0003', '宝山1号', '31210720190001', '2', '2', '121.4325690000', '31.2245880000', '2019.01.13', '1');
INSERT INTO `project_info` VALUES ('8', '0002', '长宁2号', '31110720190002', '1', '2', '121.4524690000', '31.2325880000', '2019.01.11', '2');
INSERT INTO `project_info` VALUES ('9', '0003', '宝山2号', '31210720190002', '2', '2', '121.4523690000', '31.2455880000', '2019.01.12', '1');
SET FOREIGN_KEY_CHECKS=1;
