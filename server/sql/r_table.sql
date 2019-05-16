/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : ceshi

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-04-23 18:45:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for r_table
-- ----------------------------
DROP TABLE IF EXISTS `r_table`;
CREATE TABLE `r_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample_num` varchar(255) DEFAULT NULL COMMENT '采样编号',
  `assess_type` int(11) DEFAULT NULL COMMENT '评估类型',
  `PH` varchar(30) DEFAULT NULL,
  `arsenic` varchar(30) DEFAULT NULL,
  `cadmium` varchar(30) DEFAULT NULL,
  `chromium` varchar(30) DEFAULT NULL,
  `copper` varchar(30) DEFAULT NULL,
  `lead` varchar(30) DEFAULT NULL,
  `mercury` varchar(30) DEFAULT NULL,
  `nickel` varchar(30) DEFAULT NULL,
  `antimony` varchar(30) DEFAULT NULL,
  `beryllium` varchar(30) DEFAULT NULL,
  `cobalt` varchar(30) DEFAULT NULL,
  `zinc` varchar(30) DEFAULT NULL,
  `silver` varchar(30) DEFAULT NULL,
  `thallium` varchar(30) DEFAULT NULL,
  `tin` varchar(30) DEFAULT NULL,
  `selenium` varchar(30) DEFAULT NULL,
  `molybdenum` varchar(30) DEFAULT NULL,
  `Alum` varchar(30) DEFAULT NULL,
  `count` int(11) DEFAULT NULL COMMENT '超标数目',
  `attention` varchar(255) DEFAULT NULL COMMENT '需要注意的元素',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of r_table
-- ----------------------------
INSERT INTO `r_table` VALUES ('1', null, null, '6.700', '0.165', '0.135', '29.000', '27.320', '22.200', '0.662', '21.000', '0.336', '1.236', '1.230', '3.320', '0.325', '0.500', '2.000', '3.260', '0.111', '0.451', null, null);
SET FOREIGN_KEY_CHECKS=1;
