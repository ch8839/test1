/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50561
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50561
File Encoding         : 65001

Date: 2019-03-10 21:54:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for list2
-- ----------------------------
DROP TABLE IF EXISTS `list2`;
CREATE TABLE `list2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `number` int(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list2
-- ----------------------------
INSERT INTO `list2` VALUES ('1', '刚', '19951030', '男');
INSERT INTO `list2` VALUES ('2', 'admin', '123456', '男');
INSERT INTO `list2` VALUES ('3', 'tourist', '111', '女');
INSERT INTO `list2` VALUES ('4', '谢晋飞', '1001', '女');
INSERT INTO `list2` VALUES ('5', '吴迪嘉', '1002', '男');
INSERT INTO `list2` VALUES ('6', '王妍', '1003', '女');
INSERT INTO `list2` VALUES ('7', '刘千红', '1004', '女');
INSERT INTO `list2` VALUES ('8', '陈刚', '1005', '男');
SET FOREIGN_KEY_CHECKS=1;
