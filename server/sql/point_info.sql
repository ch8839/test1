/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-23 11:30:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for point_info
-- ----------------------------
DROP TABLE IF EXISTS `point_info`;
CREATE TABLE `point_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `point_num` varchar(255) DEFAULT NULL,
  `project_num` varchar(255) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `point_address` varchar(255) DEFAULT NULL,
  `point_lng` double(30,10) DEFAULT NULL,
  `point_lat` double(30,10) DEFAULT NULL,
  `point_intro` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of point_info
-- ----------------------------
INSERT INTO `point_info` VALUES ('1', '2019-0001-0001-0001', '2019-0001-0001', '1', 'G2', '121.4576780000', '31.2738270000', '静安1号监测点0001', '无', '20');
INSERT INTO `point_info` VALUES ('2', '2019-0001-0001-0002', '2019-0001-0001', '3', 'B2', '121.4563690000', '31.2789250000', '静安1号监测点0002', '无', '20');
INSERT INTO `point_info` VALUES ('3', '2019-0001-0001-0003', '2019-0001-0001', '4', 'C4', '121.4569690000', '31.2793250000', '静安1号监测点0003', '无', '20');
INSERT INTO `point_info` VALUES ('4', '2019-0001-0002-0001', '2019-0001-0002', '5', 'B3', '121.4437520000', '31.2792370000', '静安2号监测点0001', '无', '20');
INSERT INTO `point_info` VALUES ('5', '2019-0001-0002-0002', '2019-0001-0002', '6', 'B2', '121.4432480000', '31.2821160000', '静安2号监测点0002', '无', '20');
INSERT INTO `point_info` VALUES ('6', '2019-0001-0003-0001', '2019-0001-0003', '7', 'A2', '121.4518030000', '31.2233540000', '静安3号监测点0001', '无', '20');
INSERT INTO `point_info` VALUES ('7', '2019-0001-0003-0002', '2019-0001-0003', '8', 'C1', '121.4529690000', '31.2389250000', '静安3号监测点0002', '无', '20');
SET FOREIGN_KEY_CHECKS=1;
