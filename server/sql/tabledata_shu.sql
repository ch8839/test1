/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-21 20:53:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tabledata_shu
-- ----------------------------
DROP TABLE IF EXISTS `tabledata_shu`;
CREATE TABLE `tabledata_shu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `DSNUM` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `equipmentType` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `place` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tabledata_shu
-- ----------------------------
INSERT INTO `tabledata_shu` VALUES ('13', '00000006', '2019-03-08 16:00:00', '0', '1', '0', '操场');
INSERT INTO `tabledata_shu` VALUES ('14', '00000009', '2019-03-04 16:01:09', '2', '0', '1', '111');
INSERT INTO `tabledata_shu` VALUES ('15', '00000001', '2019-03-02 18:05:06', '1', '2', '1', '位置2');
INSERT INTO `tabledata_shu` VALUES ('16', '00000033', '2019-03-19 12:02:02', '2', '1', '2', '位置3');
INSERT INTO `tabledata_shu` VALUES ('17', '00000088', '2019-03-22 01:01:04', '1', '0', '2', '哈哈');
SET FOREIGN_KEY_CHECKS=1;
