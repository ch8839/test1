/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-21 20:53:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for real_time_element
-- ----------------------------
DROP TABLE IF EXISTS `real_time_element`;
CREATE TABLE `real_time_element` (
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
  `count` int(11) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of real_time_element
-- ----------------------------
INSERT INTO `real_time_element` VALUES ('1', '31010720190001', '31010720190001001', '0-10', '5.010', '6.810', '0.090', '29.000', '27.320', '22.200', '0.662', '21.000', '0.336', '1.236', null, '95.300', null, '0.500', '2.000', '3.260', null, '0.451', null, '2019-04-15 10:34:55');
INSERT INTO `real_time_element` VALUES ('2', '31010720190001', '31010720190001001', '10-20', '7.260', null, null, null, null, null, null, null, '0.600', null, null, null, null, null, '2.530', null, null, null, null, '2019-04-17 21:59:19');
INSERT INTO `real_time_element` VALUES ('4', '31010720190001', '31010720190001002', '20-30', '5.630', null, '2.990', null, '2.390', null, null, '5.980', null, null, null, null, '2.150', null, null, null, '2.630', null, null, '2019-04-17 22:00:44');
INSERT INTO `real_time_element` VALUES ('6', '31010720190002', '31010720190002001', '0-10', '8.260', null, null, '2.390', null, '5.360', null, null, '8.960', '2.690', null, null, null, null, null, null, null, null, '4', '2019-04-18 11:08:17');
INSERT INTO `real_time_element` VALUES ('7', '31010720190002', '31010720190002002', '10-20', '9.090', '2.630', null, null, '5.630', null, null, '5.720', null, null, '2.360', null, '8.640', null, '8.140', '2.980', null, '2.630', '4', '2019-04-18 11:08:17');
INSERT INTO `real_time_element` VALUES ('8', '31010720190003', '31010720190003001', '0-10', '3.080', null, '2.960', null, null, '19.250', null, null, '2.360', null, null, null, null, '5.260', null, null, '2.970', '5.810', null, '2019-04-17 22:00:51');
INSERT INTO `real_time_element` VALUES ('11', '31110720190001', '31110720190001002', '20-30', '5.260', null, null, '6.260', '2.960', null, null, null, null, '7.250', '7.520', null, null, null, '2.390', '2.860', '2.960', null, null, '2019-04-17 22:00:38');
INSERT INTO `real_time_element` VALUES ('12', '31110720190002', '31110720190002001', '10-20', '6.630', null, null, null, null, null, null, '5.120', null, null, null, '8.360', null, null, null, null, null, null, null, '2019-04-17 21:57:24');
INSERT INTO `real_time_element` VALUES ('13', '31110720190001', '31110720190001001', '0-10', '6.010', null, null, null, null, null, null, '5.990', null, '9.360', null, '8.990', null, null, null, null, null, null, null, '2019-04-17 21:57:21');
INSERT INTO `real_time_element` VALUES ('14', '31210720190001', '31210720190001002', '0-10', '8.090', null, null, null, null, null, null, '8.880', '8.220', '6.390', null, null, null, '5.660', '2.930', null, null, null, '7', '2019-04-18 11:08:17');
INSERT INTO `real_time_element` VALUES ('15', '31210720190001', '31210720190001002', '0-10', '4.080', null, '7.890', null, '5.860', '5.360', null, null, null, null, '6.480', null, null, null, null, '2.960', '5.960', null, '7', '2019-04-18 11:08:17');
INSERT INTO `real_time_element` VALUES ('16', '31210720190002', '31210720190002001', '20-30', '8.760', null, null, '8.990', null, null, '6.320', '8.360', null, '9.250', null, '2.560', '4.820', null, null, null, null, '9.180', null, '2019-04-17 22:01:01');
INSERT INTO `real_time_element` VALUES ('17', '31210720190001', '31210720190001001', '10-20', '3.260', '5.990', '3.560', '7.250', '5.360', null, '7.880', null, null, null, '8.150', '8.820', '5.360', null, null, null, '8.270', '9.380', '6', '2019-04-18 11:08:17');
INSERT INTO `real_time_element` VALUES ('18', '31210720190002', '31210720190002001', '10-20', '9.580', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2019-04-17 21:55:03');
SET FOREIGN_KEY_CHECKS=1;
