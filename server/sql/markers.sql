/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50561
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50561
File Encoding         : 65001

Date: 2019-03-29 10:10:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for markers
-- ----------------------------
DROP TABLE IF EXISTS `markers`;
CREATE TABLE `markers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lng` double(30,10) DEFAULT NULL,
  `lat` double(30,10) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `count` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of markers
-- ----------------------------
INSERT INTO `markers` VALUES ('1', '121.3887517300', '31.3178163500', '上海大学宝山校区', '20');
INSERT INTO `markers` VALUES ('2', '121.4533086200', '31.2785967500', '上海大学延长校区', '36');
INSERT INTO `markers` VALUES ('3', '121.2448369900', '31.3789684200', '上海大学嘉定校区', '162');
INSERT INTO `markers` VALUES ('4', '121.2331569500', '31.3917494600', '上海物联网中心', '83');
INSERT INTO `markers` VALUES ('5', '121.4439310000', '31.2807120000', '大宁音乐广场', '269');
INSERT INTO `markers` VALUES ('6', '121.3395220000', '31.1950500000', '上海虹桥国际机场', '18');
SET FOREIGN_KEY_CHECKS=1;
