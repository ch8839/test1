/*
Navicat MySQL Data Transfer

Source Server         : tank
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-05-26 13:32:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sample_type2_water_statistic_value
-- ----------------------------
DROP TABLE IF EXISTS `sample_type2_water_statistic_value`;
CREATE TABLE `sample_type2_water_statistic_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statistic_value` varchar(255) DEFAULT NULL COMMENT '统计类型',
  `assess_type` int(11) DEFAULT NULL COMMENT '调查类型',
  `point_num` varchar(255) NOT NULL COMMENT '监测点位',
  `sample_depth` varchar(255) DEFAULT NULL COMMENT '采样深度',
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
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sample_type2_water_statistic_value
-- ----------------------------
INSERT INTO `sample_type2_water_statistic_value` VALUES ('1', 'max_value', '2', '31010720190001001', '4', '7.7900', '0.0059', '0.0002', '0.0000', '0.0023', '0.0021', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('2', 'max_value', '2', '31010720190001001', '6', '7.8700', '0.0049', '0.0000', '0.0000', '0.0024', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('3', 'max_value', '2', '31010720190001003', '4', '9.1000', '0.0089', '0.0000', '0.0000', '0.0037', '0.0001', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('4', 'max_value', '2', '31010720190001003', '6', '8.9900', '0.0107', '0.0000', '0.0000', '0.0044', '0.0002', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('5', 'max_value', '2', '31010720190001004', '4', '9.97', '0.00865', '0', '0', '0.00462', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('6', 'max_value', '2', '31010720190001004', '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('7', 'max_value', '2', '31010720190001009', '4', '9.9700', '0.0104', '0.0000', '0.0000', '0.0046', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('8', 'max_value', '2', '31010720190001009', '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('9', 'mean_value', '2', '31010720190001001', '4', '7.5867', '0.0054', '0.0001', '0.0000', '0.0020', '0.0007', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('10', 'mean_value', '2', '31010720190001001', '6', '7.5300', '0.0049', '0.0000', '0.0000', '0.0024', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('11', 'mean_value', '2', '31010720190001003', '4', '9.7333', '0.0087', '0.0000', '0.0000', '0.0029', '0.0001', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('12', 'mean_value', '2', '31010720190001003', '6', '9.4600', '0.0100', '0.0000', '0.0000', '0.0034', '0.0001', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('13', 'mean_value', '2', '31010720190001004', '4', '9.9700', '0.0086', '0.0000', '0.0000', '0.0046', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('15', 'mean_value', '2', '31010720190001009', '4', '9.9700', '0.0095', '0.0000', '0.0000', '0.0046', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('16', 'mean_value', '2', '31010720190001009', '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('17', 'max_value', '2', '31010720190002001', '4', '9.1900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '4.6900', '0.0000', '0.0000', '0.0000', '12.3600', '0.0000', '0.0000', '0.0000', '24.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('18', 'max_value', '2', '31010720190002001', '6', '7.190', '23.160', '0', '0', '0', '0', '0', '6.690', '0', '0', '0', '27.360', '0', '0', '0', '3.960', '0', '0', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('19', 'max_value', '2', '31010720190002002', '4', '9.190', '1.160', '0', '0', '0', '0', '0', '24.690', '0', '0', '0', '12.360', '0', '0', '0', '4.960', '0', '0', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('20', 'max_value', '2', '31010720190002002', '6', '8.1900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '6.6900', '0.0000', '0.0000', '0.0000', '17.3600', '0.0000', '0.0000', '0.0000', '3.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('21', 'mean_value', '2', '31010720190002001', '4', '8.6900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '15.1900', '0.0000', '0.0000', '0.0000', '11.8600', '0.0000', '0.0000', '0.0000', '13.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('22', 'mean_value', '2', '31010720190002001', '6', '7.1900', '23.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '6.6900', '0.0000', '0.0000', '0.0000', '27.3600', '0.0000', '0.0000', '0.0000', '3.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('23', 'mean_value', '2', '31010720190002002', '4', '9.1900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '24.6900', '0.0000', '0.0000', '0.0000', '12.3600', '0.0000', '0.0000', '0.0000', '4.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('24', 'mean_value', '2', '31010720190002002', '6', '7.6900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '6.6900', '0.0000', '0.0000', '0.0000', '17.3600', '0.0000', '0.0000', '0.0000', '3.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('50', 'mean_value', '2', '31010720190001004', '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('51', 'max_value', '2', '31010720190001007', '4', '7.46', '0.0104', '0', '0', '0.00069', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('52', 'max_value', '2', '31010720190001007', '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('53', 'mean_value', '2', '31010720190001007', '4', '7.4600', '0.0104', '0.0000', '0.0000', '0.0007', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_type2_water_statistic_value` VALUES ('54', 'mean_value', '2', '31010720190001007', '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
SET FOREIGN_KEY_CHECKS=1;
