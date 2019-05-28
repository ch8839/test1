/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-14 14:39:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fix_reference_info
-- ----------------------------
DROP TABLE IF EXISTS `fix_reference_info`;
CREATE TABLE `fix_reference_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_num` varchar(255) DEFAULT NULL COMMENT '参考编号',
  `sample_num` varchar(255) DEFAULT NULL,
  `point_num` int(11) DEFAULT NULL COMMENT '监测点位编号',
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fix_reference_info
-- ----------------------------
INSERT INTO `fix_reference_info` VALUES ('1', '17国标', 'B-D-G-001002-1', '1001', '6.700', '0.165', '0.135', '29.000', '27.320', '22.200', '0.662', '21.000', '0.336', '1.236', '1.230', '3.320', '0.325', '0.500', '2.000', '3.260', '0.111', '0.451');
SET FOREIGN_KEY_CHECKS=1;
