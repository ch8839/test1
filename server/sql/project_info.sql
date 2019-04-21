/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-21 20:53:06
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
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_info
-- ----------------------------
INSERT INTO `project_info` VALUES ('3', '0001', '静安1号', '31010720190001', '1', '1', '121.4577310000', '31.2758960000', '2019.01.16', '无', '35');
INSERT INTO `project_info` VALUES ('4', '0001', '静安2号', '31010720190002', '1', '2', '121.4439770000', '31.2807010000', '2019.01.12', '2', '8');
INSERT INTO `project_info` VALUES ('5', '0001', '静安3号', '31010720190003', '2', '3', '121.4524350000', '31.2246300000', '2019.01.11', '1', '7');
INSERT INTO `project_info` VALUES ('6', '0002', '长宁1号', '31110720190001', '3', '1', '121.4192810000', '31.2216430000', '2019.01.12', '3', '4');
INSERT INTO `project_info` VALUES ('7', '0003', '宝山1号', '31210720190001', '2', '2', '121.4325690000', '31.2245880000', '2019.01.13', '1', '20');
INSERT INTO `project_info` VALUES ('8', '0002', '长宁2号', '31110720190002', '1', '2', '121.4524690000', '31.2325880000', '2019.01.11', '2', '5');
INSERT INTO `project_info` VALUES ('9', '0003', '宝山2号', '31210720190002', '2', '2', '121.4523690000', '31.2455880000', '2019.01.12', '1', '10');
SET FOREIGN_KEY_CHECKS=1;
