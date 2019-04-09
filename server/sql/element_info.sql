/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-09 14:32:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for element_info
-- ----------------------------
DROP TABLE IF EXISTS `element_info`;
CREATE TABLE `element_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `point_num` varchar(255) DEFAULT NULL,
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
  `date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of element_info
-- ----------------------------
INSERT INTO `element_info` VALUES ('1', '31010720190001001', '5.010', '6.810', '0.090', '29.000', '27.320', '22.200', '0.662', '21.000', '0.336', '1.236', null, '95.300', null, '0.300', '2.000', '3.260', null, '0.451', '2019.04.07');
INSERT INTO `element_info` VALUES ('2', '31010720190001001', '7.900', '6.200', '0.030', '31.000', '26.320', '26.200', '0.362', '31.000', '0.136', '1.236', '18.236', '95.300', '0.220', '0.300', '2.000', '2.480', '0.300', '0.451', '2019.04.09');
INSERT INTO `element_info` VALUES ('3', '31010720190001002', '4.600', '1.200', '0.070', '6.323', '21.236', '21.260', '0.125', '21.230', '0.265', '1.659', '13.201', '12.326', '0.456', '0.135', '3.000', '0.148', '0.135', '0.128', '2019.04.08');
INSERT INTO `element_info` VALUES ('4', '31010720190001003', '6.265', '18.260', '0.156', '12.265', '13.248', '2.660', '2.660', '0.156', '12.160', '6.218', '23.218', '31.254', '13.290', '2.546', '4.000', '2.118', '2.546', '2.156', '2019.04.08');
INSERT INTO `element_info` VALUES ('5', '31010720190001004', '4.265', '11.235', '0.196', '22.213', '16.226', '13.210', '0.956', '13.214', '0.962', '3.236', '13.208', '1.236', '33.215', '2.660', '5.000', '0.012', '2.660', '3.216', '2019.04.09');
INSERT INTO `element_info` VALUES ('6', '31010720190001005', '6.322', '13.264', '0.197', '2.660', '2.660', '0.163', '7.216', '6.213', '13.314', '1.326', '2.660', '21.221', '2.218', '6.654', '6.000', '6.213', '6.654', '1.238', '2019.04.08');
INSERT INTO `element_info` VALUES ('7', '31010720190001006', '4.216', '5.213', '16.214', '3.213', '4.213', '2.231', '3.216', '11.246', '7.265', '8.216', '9.213', '6.213', '2.300', '1.265', '7.000', '7.210', '1.265', '3.330', '2019.04.09');
INSERT INTO `element_info` VALUES ('8', '31010720190001007', '6.320', '3.210', '0.326', '1.236', '8.260', '6.310', '9.210', '12.300', '16.210', '6.210', '7.160', '4.210', '2.660', '3.210', '8.000', '3.150', '3.210', '15.210', '2019.04.08');
INSERT INTO `element_info` VALUES ('9', '31010720190001008', '6.210', '9.120', '9.130', '13.210', '10.260', '14.210', '21.160', '21.330', '2.660', '1.260', '1.560', '1.980', '1.320', '1.650', '9.000', '1.920', '1.650', '3.210', '2019.04.09');
INSERT INTO `element_info` VALUES ('10', '31010720190001009', '6.210', '9.120', '9.130', null, '10.260', null, '21.160', null, '2.660', '1.260', '1.560', null, '1.320', null, '9.000', '1.920', null, '3.210', '2019.04.09');
SET FOREIGN_KEY_CHECKS=1;
