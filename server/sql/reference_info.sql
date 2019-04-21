/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-21 20:53:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for reference_info
-- ----------------------------
DROP TABLE IF EXISTS `reference_info`;
CREATE TABLE `reference_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reference_info
-- ----------------------------
INSERT INTO `reference_info` VALUES ('1', '6.200', '3.650', '0.077', '23.326', '21.230', '21.200', '0.323', '20.132', '0.136', '1.632', '3.210', '32.260', '13.200', '23.230', '3.260', '21.323', '13.200', '0.136');
INSERT INTO `reference_info` VALUES ('2', '24.800', '14.600', '0.308', '93.304', '92.928', '84.800', '1.292', '80.528', '0.544', '6.528', '12.840', '131.040', '52.800', '92.920', '13.040', '85.292', '52.800', '0.544');
SET FOREIGN_KEY_CHECKS=1;
