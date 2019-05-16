/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : ceshi

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-04-23 10:12:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for reference_info
-- ----------------------------
DROP TABLE IF EXISTS `reference_info`;
CREATE TABLE `reference_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `point_num` int(11) DEFAULT NULL,
  `reference_num` varchar(255) DEFAULT NULL COMMENT '参考编号',
  `type` varchar(255) DEFAULT NULL,
  `PH` double(30,3) DEFAULT NULL,
  `arsenic` double(30,3) DEFAULT NULL,
  `cadmium` double(30,3) DEFAULT NULL,
  `chromium` double(30,3) DEFAULT NULL,
  `copper` double(30,3) DEFAULT NULL,
  `lead` double(30,3) DEFAULT NULL,
  `mercury` double(30,3) DEFAULT NULL,
  `nickel` double(30,3) DEFAULT NULL,
  `antimony` double(30,3) DEFAULT NULL,
  `beryllium` double(30,3) DEFAULT NULL,
  `cobalt` double(30,3) DEFAULT NULL,
  `zinc` double(30,3) DEFAULT NULL,
  `silver` double(30,3) DEFAULT NULL,
  `thallium` double(30,3) DEFAULT NULL,
  `tin` double(30,3) DEFAULT NULL,
  `selenium` double(30,3) DEFAULT NULL,
  `molybdenum` double(30,3) DEFAULT NULL,
  `Alum` double(30,3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reference_info
-- ----------------------------
INSERT INTO `reference_info` VALUES ('1', null, '17国标', 'ground', '6.700', '0.165', '0.135', '29.000', '27.320', '22.200', '0.662', '21.000', '0.336', '1.236', '1.230', '3.320', '0.325', '0.500', '2.000', '3.260', '0.111', '0.451');
INSERT INTO `reference_info` VALUES ('2', null, '18国标', 'water', null, null, null, null, '6.700', '0.165', '0.135', '29.000', '27.320', '22.200', null, null, null, null, null, null, null, null);
INSERT INTO `reference_info` VALUES ('3', null, '17国标', 'water', null, '0.300', '0.210', '21.230', '20.100', '20.100', '0.310', '21.030', null, '20.100', '2.200', '2.300', '0.100', null, null, '2.123', '0.123', '0.365');
INSERT INTO `reference_info` VALUES ('4', null, '18国标', 'ground', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `reference_info` VALUES ('5', '1001', null, 'ground', null, null, '0.662', '21.000', '0.336', null, null, null, null, '27.320', '22.200', null, null, null, null, null, null, null);
SET FOREIGN_KEY_CHECKS=1;
