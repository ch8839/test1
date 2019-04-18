/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-04-17 22:13:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for element_info
-- ----------------------------
DROP TABLE IF EXISTS `element_info`;
CREATE TABLE `element_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ground_num` varchar(255) DEFAULT NULL,
  `point_num` varchar(255) DEFAULT NULL,
  `point_depth` varchar(255) DEFAULT NULL,
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
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of element_info
-- ----------------------------
INSERT INTO `element_info` VALUES ('1', '31010720190001', '31010720190001001', '0-10', '5.010', '6.810', '0.090', '29.000', '27.320', null, '0.662', '21.000', null, '1.236', null, '95.300', null, '0.300', null, '3.260', null, '0.451', '2019-04-15 22:06:44');
INSERT INTO `element_info` VALUES ('2', '31010720190001', '31010720190001001', '10-20', '7.900', null, '0.030', '31.000', '26.320', null, null, null, null, '1.236', '18.236', '95.300', '0.220', '0.300', null, '2.480', '0.300', '0.451', '2019-04-15 16:25:44');
INSERT INTO `element_info` VALUES ('4', '31010720190001', '31010720190001002', '20-30', '6.265', '18.260', null, null, '13.248', null, null, null, null, '6.218', null, null, null, '2.546', null, '2.118', null, '2.156', '2019-04-15 22:06:44');
INSERT INTO `element_info` VALUES ('6', '31010720190002', '31010720190002001', '0-10', '6.322', '13.264', null, null, '2.660', null, null, null, null, null, null, null, null, null, null, '6.213', null, null, '2019-04-15 22:06:44');
INSERT INTO `element_info` VALUES ('7', '31010720190002', '31010720190002002', '10-20', '4.216', null, null, null, null, null, null, null, null, null, null, null, null, null, '7.000', '7.210', null, null, '2019-04-15 22:06:44');
INSERT INTO `element_info` VALUES ('8', '31010720190003', '31010720190003001', '0-10', '6.320', null, null, null, null, '6.310', null, null, null, null, null, null, '2.660', null, '8.000', null, null, null, '2019-04-15 22:06:44');
INSERT INTO `element_info` VALUES ('9', '31010720190001', '31010720190001001', '0-10', '5.010', '5.010', '0.090', null, null, '22.200', null, null, null, '1.236', null, null, null, null, null, null, null, null, '2019-04-16 22:06:44');
INSERT INTO `element_info` VALUES ('10', '31010720190001', '31010720190001001', '10-20', '7.900', '7.900', '0.030', null, null, null, '0.362', null, null, null, '18.236', null, '0.220', null, null, null, null, null, '2019-04-16 16:25:44');
INSERT INTO `element_info` VALUES ('11', '31010720190001', '31010720190001002', '20-30', '6.265', '6.265', null, '12.265', null, null, null, null, null, null, null, null, null, '2.546', '4.000', null, null, '2.156', '2019-04-16 22:06:44');
INSERT INTO `element_info` VALUES ('12', '31010720190002', '31010720190002001', '0-10', '6.322', '6.322', null, '2.660', null, null, null, null, null, null, null, null, null, '6.654', null, null, null, '1.238', '2019-04-16 22:06:44');
INSERT INTO `element_info` VALUES ('13', '31010720190002', '31010720190002002', '10-20', '4.216', '4.216', null, '3.213', null, null, null, '11.246', null, null, null, null, null, '1.265', null, null, null, null, '2019-04-16 22:06:44');
INSERT INTO `element_info` VALUES ('14', '31010720190003', '31010720190003001', '0-10', '6.320', '6.320', null, '1.236', '8.260', null, null, '12.300', null, null, null, '4.210', '2.660', '3.210', null, '3.150', '3.210', null, '2019-04-16 22:06:44');
INSERT INTO `element_info` VALUES ('15', '31110720190001', '31110720190001001', '0-10', '5.010', '5.010', null, '6.265', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('16', '31110720190001', '31110720190001002', '20-30', '7.900', '7.900', null, '6.322', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('17', '31110720190002', '31110720190002001', '10-20', '6.265', '6.265', '6.265', '4.216', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('18', '31110720190001', '31110720190001001', '0-10', '6.322', '6.322', '6.322', '6.320', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
INSERT INTO `element_info` VALUES ('19', '31110720190001', '31110720190001002', '20-30', '4.216', '4.216', '4.216', '5.010', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
INSERT INTO `element_info` VALUES ('20', '31110720190002', '31110720190002001', '10-20', '6.320', '6.320', '6.320', '7.900', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
INSERT INTO `element_info` VALUES ('21', '31210720190001', '31210720190001002', '0-10', '7.900', null, '7.900', '6.322', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('22', '31210720190001', '31210720190001002', '0-10', '6.265', null, '6.265', '4.216', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('23', '31210720190002', '31210720190002001', '20-30', '6.322', null, '6.322', '6.320', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('24', '31210720190002', '31210720190002001', '10-20', '4.216', null, '4.216', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('25', '31210720190001', '31210720190001001', '10-20', '5.010', null, '5.010', '6.265', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-15 00:00:00');
INSERT INTO `element_info` VALUES ('27', '31210720190001', '31210720190001001', '10-20', '6.320', null, '6.320', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
INSERT INTO `element_info` VALUES ('28', '31210720190001', '31210720190001002', '0-10', null, null, '5.010', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
INSERT INTO `element_info` VALUES ('29', '31210720190001', '31210720190001002', '0-10', null, null, '7.900', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
INSERT INTO `element_info` VALUES ('30', '31210720190002', '31210720190002001', '20-30', null, null, '6.265', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
INSERT INTO `element_info` VALUES ('31', '31210720190002', '31210720190002001', '10-20', null, null, '6.322', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-16 00:00:00');
SET FOREIGN_KEY_CHECKS=1;
