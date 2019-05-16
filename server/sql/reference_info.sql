/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306

Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-09 10:26:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for reference_info
-- ----------------------------
DROP TABLE IF EXISTS `reference_info`;
CREATE TABLE `reference_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `point_num` varchar(255) DEFAULT NULL,
  `reference_num` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reference_info
-- ----------------------------
INSERT INTO `reference_info` VALUES ('1', null, '17国标', 'ground', '7.000', '10.650', '0.077', '23.326', '21.230', '21.200', '0.323', '20.132', '5.136', '1.632', '3.210', '11.260', '13.200', '23.230', '3.260', '21.323', '13.200', '0.136');
INSERT INTO `reference_info` VALUES ('2', null, '18国标', 'ground', '7.800', '14.600', '0.308', '13.304', '12.928', '14.800', '1.292', '20.528', '8.544', '6.528', '12.840', '13.040', '12.800', '22.920', '13.040', '12.292', '12.800', '0.544');
INSERT INTO `reference_info` VALUES ('3', null, '17国标', 'water', '7.000', '0.050', '0.005', '0.050', '1.000', '0.050', '0.001', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `reference_info` VALUES ('4', null, '18国标', 'water', '7.000', '0.050', '0.005', '0.050', '1.000', '0.050', '0.001', null, null, null, null, null, null, null, null, null, null, null);
SET FOREIGN_KEY_CHECKS=1;
