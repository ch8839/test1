/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-22 21:17:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sample_lab_water_info
-- ----------------------------
DROP TABLE IF EXISTS `sample_lab_water_info`;
CREATE TABLE `sample_lab_water_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample_num` varchar(255) DEFAULT NULL,
  `assess_type` int(11) DEFAULT NULL,
  `point_num` varchar(255) DEFAULT NULL,
  `project_num` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `sample_depth` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `PH` varchar(255) DEFAULT '-1',
  `arsenic` varchar(255) DEFAULT '-1',
  `cadmium` varchar(255) DEFAULT '-1',
  `chromium` varchar(255) DEFAULT '-1',
  `copper` varchar(255) DEFAULT '-1',
  `lead` varchar(255) DEFAULT '-1',
  `mercury` varchar(255) DEFAULT '-1',
  `nickel` varchar(255) DEFAULT '-1',
  `antimony` varchar(255) DEFAULT '-1',
  `beryllium` varchar(255) DEFAULT '-1',
  `cobalt` varchar(255) DEFAULT '-1',
  `zinc` varchar(255) DEFAULT '-1',
  `silver` varchar(255) DEFAULT '-1',
  `thallium` varchar(255) DEFAULT '-1',
  `tin` varchar(255) DEFAULT '-1',
  `selenium` varchar(255) DEFAULT '-1',
  `molybdenum` varchar(255) DEFAULT '-1',
  `Alum` varchar(255) DEFAULT '-1',
  `attention` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sample_lab_water_info
-- ----------------------------
INSERT INTO `sample_lab_water_info` VALUES ('1', 'L-W-S-0001-0001-0001-0001', '1', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-23', '4.5', '18', '6.888', '21.060', '-1', '0', '-1', '-1', '-1', '15.690', '-1', '-1', '-1', '14.590', '-1', '-1', '-1', '-1', '-1', '-1', 'arsenic,zinc', '无');
INSERT INTO `sample_lab_water_info` VALUES ('4', 'L-W-S-0001-0001-0002-0001', '1', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', '4.5', '3', '9.190', '1.160', '0', '-1', '-1', '-1', '-1', '24.690', '-1', '0', '-1', '12.360', '-1', '0', '-1', '24.960', '-1', '-1', 'nickel,zinc,selenium', '无');
INSERT INTO `sample_lab_water_info` VALUES ('7', 'L-W-D-0001-0001-0001-0001', '2', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-22', '4', '3', '9.190', '1.160', '-1', '-1', '-1', '-1', '-1', '4.690', '-1', '0', '-1', '12.360', '-1', '-1', '-1', '24.960', '-1', '0', 'zinc,selenium', '无');
INSERT INTO `sample_lab_water_info` VALUES ('8', 'L-W-D-0001-0001-0001-0002', '2', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-22', '4', '5', '8.190', '1.160', '0', '0', '0', '-1', '-1', '25.690', '-1', '-1', '-1', '11.360', '-1', '0', '-1', '2.960', '0', '-1', 'nickel,zinc', '无');
INSERT INTO `sample_lab_water_info` VALUES ('9', 'L-W-D-0001-0001-0001-0003', '2', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-22', '6', '1', '7.190', '23.160', '-1', '-1', '-1', '0', '-1', '6.690', '0', '-1', '0', '27.360', '-1', '-1', '-1', '3.960', '-1', '-1', 'arsenic,zinc', '无');
INSERT INTO `sample_lab_water_info` VALUES ('10', 'L-W-D-0001-0001-0002-0001', '2', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', '4', '3', '9.190', '1.160', '-1', '-1', '-1', '-1', '-1', '24.690', '-1', '-1', '-1', '12.360', '-1', '-1', '-1', '4.960', '-1', '-1', 'nickel,zinc', '无');
INSERT INTO `sample_lab_water_info` VALUES ('11', 'L-W-D-0001-0001-0002-0002', '2', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', '6', '5', '8.190', '1.160', '-1', '-1', '0', '-1', '-1', '5.690', '0', '-1', '-1', '11.360', '-1', '-1', '-1', '2.960', '-1', '0', 'zinc', '无');
INSERT INTO `sample_lab_water_info` VALUES ('12', 'L-W-D-0001-0001-0002-0003', '2', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', '6', '1', '7.190', '1.160', '-1', '0', '-1', '-1', '-1', '6.690', '-1', '-1', '-1', '17.360', '-1', '-1', '-1', '3.960', '-1', '-1', 'zinc', '无');
INSERT INTO `sample_lab_water_info` VALUES ('13', 'MW-1-S', '1', '31010720190001001', '31010720190001', '0000-00-00', '4.5', null, '7.3', '9', '0.3', '2', '3', '1', '0.2', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'cadmium', '1001');
INSERT INTO `sample_lab_water_info` VALUES ('14', 'MW-2-S', '1', '31010720190001002', '31010720190001', '0000-00-00', '4.5', null, '7.4', '0', '0', '2', '2', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '1002');
INSERT INTO `sample_lab_water_info` VALUES ('15', 'MW-3-S', '1', '31010720190001003', '31010720190001', '0000-00-00', '4.5', null, '7.6', '0', '0', '3', '5', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '1003');
INSERT INTO `sample_lab_water_info` VALUES ('16', 'MW-4-S', '1', '31010720190001004', '31010720190001', '0000-00-00', '4.5', null, '10.1', '23', '0.2', '0', '1', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'arsenic,cadmium', '1004');
INSERT INTO `sample_lab_water_info` VALUES ('17', 'MW-5-S', '1', '31010720190001005', '31010720190001', '0000-00-00', '4.5', null, '11.5', '7', '0', '1', '2', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '1005');
INSERT INTO `sample_lab_water_info` VALUES ('18', 'MW-6-S', '1', '31010720190001006', '31010720190001', '0000-00-00', '4.5', null, '9.2', '21', '0.2', '0', '1', '2', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'arsenic,cadmium', '1006');
INSERT INTO `sample_lab_water_info` VALUES ('20', 'W1-1-S', '2', '31010720190001001', '31010720190001', '0000-00-00', '4', null, '7.38', '0.00139', '0.00021', '0', '0.00101', '0.00212', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2001');
INSERT INTO `sample_lab_water_info` VALUES ('21', 'W2-1-S', '2', '31010720190001001', '31010720190001', '0000-00-00', '4', null, '7.79', '0.00435', '0', '0', '0.00123', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2002');
INSERT INTO `sample_lab_water_info` VALUES ('22', 'W2-2-S', '2', '31010720190001001', '31010720190001', '0000-00-00', '6', null, '7.87', '0.0049', '0', '0', '0.0013', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2002');
INSERT INTO `sample_lab_water_info` VALUES ('23', 'W3-1-S', '2', '31010720190001001', '31010720190001', '0000-00-00', '4', null, '7.18', '0.00589', '0', '0', '0.00233', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2003');
INSERT INTO `sample_lab_water_info` VALUES ('24', 'W3-2-S', '2', '31010720190001001', '31010720190001', '0000-00-00', '6', null, '7.19', '0.00488', '0', '0', '0.00235', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2003');
INSERT INTO `sample_lab_water_info` VALUES ('25', 'W2-1-S', '2', '31010720190001003', '31010720190001', '0000-00-00', '4', null, '7.79', '0.00435', '0', '0', '0.00123', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2004');
INSERT INTO `sample_lab_water_info` VALUES ('26', 'W2-2-S', '2', '31010720190001003', '31010720190001', '0000-00-00', '6', null, '7.87', '0.0049', '0', '0', '0.0013', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2004');
INSERT INTO `sample_lab_water_info` VALUES ('27', 'W4-1-S', '2', '31010720190001003', '31010720190001', '0000-00-00', '4', null, '9.1', '0.00886', '0', '0', '0.00136', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2005');
INSERT INTO `sample_lab_water_info` VALUES ('28', 'W4-2-S', '2', '31010720190001003', '31010720190001', '0000-00-00', '6', null, '8.99', '0.0107', '0', '0', '0.00148', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2005');
INSERT INTO `sample_lab_water_info` VALUES ('29', 'W7-1-S', '2', '31010720190001003', '31010720190001', '0000-00-00', '4', null, '11', '0.00849', '0', '0', '0.00366', '0.00015', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2006');
INSERT INTO `sample_lab_water_info` VALUES ('30', 'W7-2-S', '2', '31010720190001003', '31010720190001', '0000-00-00', '6', null, '10.4', '0.00849', '0', '0', '0.00439', '0.00016', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2006');
INSERT INTO `sample_lab_water_info` VALUES ('31', 'W6-1-S', '2', '31010720190001004', '31010720190001', '0000-00-00', '4', null, '9.97', '0.00865', '0', '0', '0.00462', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2007');
INSERT INTO `sample_lab_water_info` VALUES ('32', 'W5-1-S', '2', '31010720190001007', '31010720190001', '0000-00-00', '4', null, '7.46', '0.0104', '0', '0', '0.00069', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2008');
INSERT INTO `sample_lab_water_info` VALUES ('33', 'W5-1-S', '2', '31010720190001009', '31010720190001', '0000-00-00', '4', null, '7.46', '0.0104', '0', '0', '0.00069', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2009');
INSERT INTO `sample_lab_water_info` VALUES ('34', 'W6-1-S', '2', '31010720190001009', '31010720190001', '0000-00-00', '4', null, '9.97', '0.00865', '0', '0', '0.00462', '0', '0', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', null, '2010');
SET FOREIGN_KEY_CHECKS=1;