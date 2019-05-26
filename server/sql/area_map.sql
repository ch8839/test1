/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-26 13:40:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for area_map
-- ----------------------------
DROP TABLE IF EXISTS `area_map`;
CREATE TABLE `area_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_num` varchar(255) DEFAULT NULL,
  `area_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of area_map
-- ----------------------------
INSERT INTO `area_map` VALUES ('1', '0001', '静安区');
INSERT INTO `area_map` VALUES ('2', '0002', '长宁区');
INSERT INTO `area_map` VALUES ('3', '0003', '宝山区');
INSERT INTO `area_map` VALUES ('4', '0004', '普陀区');
SET FOREIGN_KEY_CHECKS=1;
