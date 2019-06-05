/*
Navicat MySQL Data Transfer

Source Server         : tank
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-06-05 22:41:24
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
  `arsenic` double(30,3) DEFAULT NULL COMMENT '砷',
  `cadmium` double(30,3) DEFAULT NULL COMMENT '镉',
  `chromium` double(30,3) DEFAULT NULL COMMENT '铬',
  `copper` double(30,3) DEFAULT NULL COMMENT '铜',
  `lead` double(30,3) DEFAULT NULL COMMENT '铅',
  `mercury` double(30,3) DEFAULT NULL COMMENT '汞',
  `nickel` double(30,3) DEFAULT NULL COMMENT '镍',
  `antimony` double(30,3) DEFAULT NULL COMMENT '锑',
  `beryllium` double(30,3) DEFAULT NULL COMMENT '铍',
  `cobalt` double(30,3) DEFAULT NULL COMMENT '钴',
  `zinc` double(30,3) DEFAULT NULL COMMENT '锌',
  `silver` double(30,3) DEFAULT NULL COMMENT '银',
  `thallium` double(30,3) DEFAULT NULL COMMENT '铊',
  `tin` double(30,3) DEFAULT NULL COMMENT '锡',
  `selenium` double(30,3) DEFAULT NULL COMMENT '硒',
  `molybdenum` double(30,3) DEFAULT NULL COMMENT '钼',
  `Alum` double(30,3) DEFAULT NULL COMMENT '矾',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reference_info
-- ----------------------------
INSERT INTO `reference_info` VALUES ('1', null, '17国标', 'ground', '7.000', '10.650', '0.077', '23.326', '21.230', '21.200', '0.323', '20.132', '5.136', '1.632', '3.210', '11.260', '13.200', '23.230', '3.260', '21.323', '13.200', '0.136');
INSERT INTO `reference_info` VALUES ('2', null, '18国标', 'ground', '7.800', '14.600', '0.308', '13.304', '12.928', '14.800', '1.292', '20.528', '8.544', '6.528', '12.840', '13.040', '12.800', '22.920', '13.040', '12.292', '12.800', '0.544');
INSERT INTO `reference_info` VALUES ('3', null, '17国标', 'water', '7.000', '0.050', '0.005', '0.050', '1.000', '0.050', '0.001', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000');
INSERT INTO `reference_info` VALUES ('4', null, '18国标', 'water', '7.000', '0.050', '0.005', '0.050', '1.000', '0.050', '0.001', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000', '1.000');
INSERT INTO `reference_info` VALUES ('5', null, 'max', 'ground', '70.000', '106.000', '0.700', '233.260', '212.300', '212.000', '3.230', '201.320', '51.360', '16.320', '32.100', '112.600', '132.000', '232.300', '32.600', '213.230', '132.000', '1.360');
INSERT INTO `reference_info` VALUES ('6', null, 'max', 'water', '70.000', '146.000', '3.080', '133.040', '129.280', '148.000', '12.920', '20.528', '82.440', '65.280', '128.400', '130.400', '128.000', '229.200', '130.400', '122.920', '128.000', '5.440');
SET FOREIGN_KEY_CHECKS=1;
