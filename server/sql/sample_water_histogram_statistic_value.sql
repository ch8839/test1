/*
Navicat MySQL Data Transfer

Source Server         : tank
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-05-26 13:32:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sample_water_histogram_statistic_value
-- ----------------------------
DROP TABLE IF EXISTS `sample_water_histogram_statistic_value`;
CREATE TABLE `sample_water_histogram_statistic_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statistic_value` varchar(255) NOT NULL COMMENT '统计类型',
  `point_num` varchar(255) NOT NULL COMMENT '监测点位',
  `assess_type` int(255) NOT NULL COMMENT '调查类型',
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
-- Records of sample_water_histogram_statistic_value
-- ----------------------------
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('1', 'mean_value', '31010720190001001', '1', '7.3000', '9.0000', '0.3000', '2.0000', '3.0000', '1.0000', '0.2000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('2', 'mean_value', '31010720190001002', '1', '7.4000', '0.0000', '0.0000', '2.0000', '2.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('3', 'mean_value', '31010720190001003', '1', '7.6000', '0.0000', '0.0000', '3.0000', '5.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('4', 'mean_value', '31010720190001004', '1', '10.1000', '23.0000', '0.2000', '0.0000', '1.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('5', 'mean_value', '31010720190001005', '1', '11.5000', '7.0000', '0.0000', '1.0000', '2.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('6', 'mean_value', '31010720190001006', '1', '9.2000', '21.0000', '0.2000', '0.0000', '1.0000', '2.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('7', 'mean_value', '31010720190001001', '2', '7.5800', '0.0052', '0.0000', '0.0000', '0.0019', '0.0004', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('8', 'mean_value', '31010720190001003', '2', '9.4100', '0.0087', '0.0000', '0.0000', '0.0028', '0.0001', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('9', 'mean_value', '31010720190001004', '2', '9.9700', '0.0086', '0.0000', '0.0000', '0.0046', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('10', 'mean_value', '31010720190001007', '2', '7.4600', '0.0104', '0.0000', '0.0000', '0.0007', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('11', 'mean_value', '31010720190001009', '2', '9.9700', '0.0095', '0.0000', '0.0000', '0.0046', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('12', 'max_value', '31010720190001001', '1', '7.3', '9', '0.3', '2', '3', '1', '0.2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('13', 'max_value', '31010720190001002', '1', '7.4', '0', '0', '2', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('14', 'max_value', '31010720190001003', '1', '7.6', '0', '0', '3', '5', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('15', 'max_value', '31010720190001004', '1', '10.1', '23', '0.2', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('16', 'max_value', '31010720190001005', '1', '11.5', '7', '0', '1', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('17', 'max_value', '31010720190001006', '1', '9.2', '21', '0.2', '0', '1', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('18', 'max_value', '31010720190001001', '2', '7.8700', '0.0059', '0.0002', '0.0000', '0.0024', '0.0021', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('19', 'max_value', '31010720190001003', '2', '9.1000', '0.0107', '0.0000', '0.0000', '0.0044', '0.0002', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('20', 'max_value', '31010720190001004', '2', '9.97', '0.00865', '0', '0', '0.00462', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('21', 'max_value', '31010720190001007', '2', '7.46', '0.0104', '0', '0', '0.00069', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('22', 'max_value', '31010720190001009', '2', '9.9700', '0.0104', '0.0000', '0.0000', '0.0046', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('47', 'mean_value', '31010720190002001', '1', '6.8880', '21.0600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '15.6900', '0.0000', '0.0000', '0.0000', '14.5900', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('48', 'mean_value', '31010720190002002', '1', '9.1900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '24.6900', '0.0000', '0.0000', '0.0000', '12.3600', '0.0000', '0.0000', '0.0000', '24.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('49', 'mean_value', '31010720190002001', '2', '8.1900', '15.8267', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '13.0233', '0.0000', '0.0000', '0.0000', '22.0267', '0.0000', '0.0000', '0.0000', '3.6267', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('50', 'mean_value', '31010720190002002', '2', '8.1900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '6.3567', '0.0000', '0.0000', '0.0000', '15.3600', '0.0000', '0.0000', '0.0000', '3.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('51', 'max_value', '31010720190002001', '1', '6.888', '21.060', '0', '0', '0', '0', '0', '15.690', '0', '0', '0', '14.590', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('52', 'max_value', '31010720190002002', '1', '9.190', '1.160', '0', '0', '0', '0', '0', '24.690', '0', '0', '0', '12.360', '0', '0', '0', '24.960', '0', '0', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('53', 'max_value', '31010720190002001', '2', '9.1900', '23.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '6.6900', '0.0000', '0.0000', '0.0000', '27.3600', '0.0000', '0.0000', '0.0000', '3.9600', '0.0000', '0.0000', null);
INSERT INTO `sample_water_histogram_statistic_value` VALUES ('54', 'max_value', '31010720190002002', '2', '9.1900', '1.1600', '0.0000', '0.0000', '0.0000', '0.0000', '0.0000', '6.6900', '0.0000', '0.0000', '0.0000', '17.3600', '0.0000', '0.0000', '0.0000', '4.9600', '0.0000', '0.0000', null);
SET FOREIGN_KEY_CHECKS=1;
