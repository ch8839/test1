/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : 19t3w8

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-05-13 14:53:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_area` varchar(255) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `project_num` varchar(255) DEFAULT NULL,
  `project_type` int(11) DEFAULT NULL,
  `project_lng` double(30,10) DEFAULT NULL,
  `project_lat` double(30,10) DEFAULT NULL,
  `simple_count` int(255) DEFAULT NULL,
  `detail_count` int(255) DEFAULT NULL,
  `fixed_count` int(255) DEFAULT NULL,
  `all_count` int(255) DEFAULT NULL,
  `remarks` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_info
-- ----------------------------
INSERT INTO `project_info` VALUES ('1', '0001', '静安1号', '2019-0001-0001', '1', '121.4577310000', '31.2758960000', '6', '2', '2', '10', '无备注');
INSERT INTO `project_info` VALUES ('2', '0001', '静安2号', '2019-0001-0002', '1', '121.4439770000', '31.2807010000', '5', '1', '1', '7', '无备注');
INSERT INTO `project_info` VALUES ('3', '0001', '静安3号', '2019-0001-0003', '2', '121.4524350000', '31.2246300000', '20', '10', '5', '35', '无备注');
INSERT INTO `project_info` VALUES ('4', '0002', '长宁1号', '2019-0002-0001', '3', '121.4192810000', '31.2216430000', '20', '10', '5', '35', '无备注');
INSERT INTO `project_info` VALUES ('5', '0002', '长宁2号', '2019-0002-0001', '1', '121.4524690000', '31.2325880000', '6', '3', '2', '11', '无备注');
INSERT INTO `project_info` VALUES ('6', '0003', '宝山1号', '2019-0003-0001', '2', '121.4325690000', '31.2245880000', '20', '10', '5', '35', '无备注');
INSERT INTO `project_info` VALUES ('7', '0003', '宝山2号', '2019-0003-0002', '2', '121.4523690000', '31.2455880000', '20', '10', '5', '35', '无备注');
INSERT INTO `project_info` VALUES ('8', '0004', '长风4号', '31010720190001', '3', '121.3808788780', '31.2249518390', '20', '10', '5', '35', '无备注');
