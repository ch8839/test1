/*
Navicat MySQL Data Transfer

Source Server         : tank
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-05-26 13:32:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sample_type2_ground_statistic_value
-- ----------------------------
DROP TABLE IF EXISTS `sample_type2_ground_statistic_value`;
CREATE TABLE `sample_type2_ground_statistic_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statistic_value` varchar(255) DEFAULT NULL,
  `assess_type` int(11) DEFAULT NULL,
  `point_num` varchar(255) NOT NULL,
  `sample_depth` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sample_type2_ground_statistic_value
-- ----------------------------
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('1', 'max_value', '2', '31010720190001001', '0.2', '9.54', '1.1', '3.5', '41.9', '23.4', '95.1', '29.9', '89', '0.2', '8.9', '0.579', '0', '0.63', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('2', 'max_value', '2', '31010720190001001', '0.8', '9.26', '1', '2.5', '37.1', '29.5', '91.2', '27.6', '79.2', '0.16', '8.2', '0.262', '0', '0.57', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('3', 'max_value', '2', '31010720190001001', '2.2', '9', '0.59', '2.3', '36.3', '17.8', '76.6', '19.8', '91.9', '0.08', '7.7', '0.034', '0', '0.51', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('4', 'max_value', '2', '31010720190001001', '3.7', '8.88', '0.4', '2.4', '32.8', '14.8', '65.9', '16.9', '73.4', '0.09', '6.5', '0.064', '0', '0.43', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('5', 'max_value', '2', '31010720190001003', '0.2', '9.34', '0.94', '2', '41.9', '23.5', '95.1', '31.9', '89', '0.55', '8.9', '0.339', '0', '0.59', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('6', 'max_value', '2', '31010720190001003', '0.8', '9.92', '0.53', '2.5', '33.8', '18.2', '65.3', '23.7', '79.2', '0.2', '6.3', '0.232', '0', '0.44', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('7', 'max_value', '2', '31010720190001003', '2.2', '9', '0.4', '2.3', '33.1', '15.3', '67.9', '17.9', '76.5', '0.08', '6.7', '0.029', '0', '0.48', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('8', 'max_value', '2', '31010720190001003', '3.7', '9.12', '0.36', '2.4', '27.6', '13.1', '59.2', '14.8', '70.3', '0.04', '4.8', '0.05', '0', '0.37', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('9', 'max_value', '2', '31010720190001004', '0.2', '9.72', '1.1', '3.4', '34.4', '36.7', '87.3', '44.3', '72.3', '0.55', '8.2', '0.793', '0', '0.47', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('10', 'max_value', '2', '31010720190001004', '0.8', '9.92', '1.1', '2', '32.3', '25.8', '82.1', '28.3', '65.2', '0.26', '6.3', '0.279', '0', '0.43', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('11', 'max_value', '2', '31010720190001004', '2.2', '9.02', '0.48', '2.1', '37.1', '18.3', '78.8', '18.3', '83.9', '0.09', '7.8', '0.05', '0', '0.47', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('12', 'max_value', '2', '31010720190001004', '3.7', '9.12', '0.41', '2.3', '33.5', '16.3', '80.3', '18.6', '67.8', '0.17', '5.3', '0.097', '0', '0.47', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('13', 'max_value', '2', '31010720190001007', '0.2', '9.72', '1.1', '2.1', '34.5', '36.7', '74.3', '44.3', '79.9', '0.37', '8.4', '0.793', '0', '0.44', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('14', 'max_value', '2', '31010720190001007', '0.8', '9.72', '1.1', '2.3', '37.1', '25.8', '77.5', '28.3', '66.6', '0.26', '7', '0.279', '0', '0.5', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('15', 'max_value', '2', '31010720190001007', '2.2', '8.92', '0.48', '2.1', '37.1', '18.3', '78.8', '18.3', '91.9', '0.09', '7.8', '0.033', '0', '0.47', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('16', 'max_value', '2', '31010720190001007', '3.7', '8.86', '0.35', '2.2', '32.1', '14.8', '65.7', '16.9', '70', '0.09', '5.8', '0.064', '0', '0.42', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('17', 'max_value', '2', '31010720190001009', '0.2', '9.72', '1.1', '2.1', '34.1', '36.7', '174', '44.3', '72.9', '0.37', '8.4', '0.793', '0', '0.44', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('18', 'max_value', '2', '31010720190001009', '0.8', '9.72', '1.1', '2.3', '30', '25.8', '82.1', '28.3', '66.6', '0.26', '6.5', '0.279', '0', '0.5', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('19', 'max_value', '2', '31010720190001009', '2.2', '8.8', '0.48', '1.6', '37.1', '18.3', '78.8', '18.3', '83.9', '0.09', '7.8', '0.05', '0', '0.47', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('20', 'max_value', '2', '31010720190001009', '3.7', '8.86', '0.35', '1.6', '26', '13.3', '59.8', '14.9', '59.7', '0.09', '5', '0.035', '0', '0.37', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('21', 'mean_value', '2', '31010720190001001', '0.2', '9.06', '0.82', '2.67', '39.17', '21.98', '86.15', '26.43', '84.68', '0.15', '8.15', '0.31', '0.00', '0.57', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('22', 'mean_value', '2', '31010720190001001', '0.8', '9.03', '0.70', '2.25', '35.05', '22.70', '81.30', '22.95', '83.80', '0.12', '7.02', '0.15', '0.00', '0.48', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('23', 'mean_value', '2', '31010720190001001', '2.2', '8.86', '0.45', '2.00', '34.10', '15.58', '70.00', '18.38', '81.97', '0.08', '7.15', '0.03', '0.00', '0.46', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('24', 'mean_value', '2', '31010720190001001', '3.7', '8.70', '0.33', '2.00', '31.32', '13.95', '63.63', '16.27', '71.78', '0.06', '5.63', '0.05', '0.00', '0.41', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('25', 'mean_value', '2', '31010720190001003', '0.2', '9.34', '0.94', '2.00', '34.65', '23.50', '102.05', '31.90', '76.35', '0.55', '7.55', '0.34', '0.00', '0.46', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('26', 'mean_value', '2', '31010720190001003', '0.8', '9.92', '0.53', '1.85', '29.90', '18.20', '87.15', '23.70', '70.70', '0.20', '6.30', '0.23', '0.00', '0.39', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('27', 'mean_value', '2', '31010720190001003', '2.2', '9.00', '0.33', '2.20', '28.65', '13.90', '63.50', '16.10', '66.55', '0.08', '5.75', '0.03', '0.00', '0.41', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('28', 'mean_value', '2', '31010720190001003', '3.7', '9.12', '0.36', '1.90', '25.60', '13.10', '59.20', '14.45', '62.55', '0.04', '4.80', '0.05', '0.00', '0.34', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('29', 'mean_value', '2', '31010720190001004', '0.2', '9.37', '0.89', '1.94', '30.88', '28.60', '135.82', '34.48', '67.60', '0.41', '7.30', '0.49', '0.00', '0.41', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('30', 'mean_value', '2', '31010720190001004', '0.8', '9.53', '0.77', '1.49', '28.07', '20.98', '95.55', '23.73', '62.52', '0.19', '6.13', '0.20', '0.00', '0.38', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('31', 'mean_value', '2', '31010720190001004', '2.2', '8.86', '0.35', '1.61', '31.07', '15.88', '95.18', '16.45', '71.00', '0.09', '6.38', '0.04', '0.00', '0.40', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('32', 'mean_value', '2', '31010720190001004', '3.7', '8.89', '0.27', '1.60', '25.98', '13.68', '86.27', '15.13', '58.15', '0.08', '4.60', '0.05', '0.00', '0.35', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('33', 'mean_value', '2', '31010720190001007', '0.2', '9.33', '1.03', '1.66', '33.17', '32.83', '117.43', '40.17', '73.20', '0.31', '8.33', '0.64', '0.00', '0.43', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('34', 'mean_value', '2', '31010720190001007', '0.8', '9.23', '0.87', '1.81', '31.63', '22.73', '85.80', '24.40', '65.57', '0.22', '6.60', '0.20', '0.00', '0.46', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('35', 'mean_value', '2', '31010720190001007', '2.2', '8.81', '0.41', '1.35', '33.07', '16.73', '73.07', '16.90', '78.77', '0.09', '7.17', '0.03', '0.00', '0.45', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('36', 'mean_value', '2', '31010720190001007', '3.7', '8.81', '0.29', '1.63', '26.97', '13.37', '60.03', '14.63', '61.80', '0.08', '4.67', '0.04', '0.00', '0.36', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('37', 'mean_value', '2', '31010720190001009', '0.2', '9.38', '0.87', '1.49', '31.93', '30.30', '173.67', '35.33', '69.10', '0.30', '7.73', '0.55', '0.00', '0.42', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('38', 'mean_value', '2', '31010720190001009', '0.8', '9.33', '0.85', '1.68', '28.00', '21.90', '91.07', '23.73', '63.10', '0.19', '6.13', '0.20', '0.00', '0.41', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('39', 'mean_value', '2', '31010720190001009', '2.2', '8.74', '0.38', '1.28', '33.37', '17.00', '107.20', '17.17', '75.80', '0.09', '6.90', '0.04', '0.00', '0.43', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('40', 'mean_value', '2', '31010720190001009', '3.7', '8.73', '0.22', '1.43', '24.27', '12.87', '88.47', '14.23', '56.57', '0.07', '4.43', '0.03', '0.00', '0.32', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('41', 'max_value', '2', '31010720190002001', '0.2', '9.190', '2.160', '0', '0', '0', '0', '0', '4.690', '0', '0', '0', '12.360', '0', '0', '0', '4.960', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('42', 'max_value', '2', '31010720190002001', '0.8', '8.190', '1.160', '0', '0', '0', '0', '0', '25.690', '0', '0', '0', '11.360', '0', '0', '0', '2.960', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('43', 'max_value', '2', '31010720190002001', '2.2', '7.190', '1.160', '0', '0', '0', '0', '0', '6.690', '0', '0', '0', '27.360', '0', '0', '0', '3.960', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('44', 'max_value', '2', '31010720190002001', '3.7', '8.7', '0.48', '1.3', '26', '25.8', '174', '31.9', '72.9', '0.18', '8.4', '0.34', '0.026', '0', '0.47', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('45', 'max_value', '2', '31010720190002002', '0.2', '9.190', '1.160', '0', '0', '0', '0', '0', '24.690', '0', '0', '0', '12.360', '0', '0', '0', '24.960', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('46', 'max_value', '2', '31010720190002002', '0.8', '8.190', '1.160', '0', '0', '0', '0', '0', '5.690', '0', '0', '0', '11.360', '0', '0', '0', '2.960', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('47', 'max_value', '2', '31010720190002002', '2.2', '7.190', '1.160', '0', '0', '0', '0', '0', '6.690', '0', '0', '0', '27.360', '0', '0', '0', '3.960', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('48', 'max_value', '2', '31010720190002002', '3.7', '9.6', '0.16', '1.6', '30.9', '18.3', '82.1', '16.6', '66.6', '0.14', '6.5', '0.034', '0.024', '0', '0.29', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('49', 'mean_value', '2', '31010720190002001', '0.2', '9.19', '2.16', '0.00', '0.00', '0.00', '0.00', '0.00', '4.69', '0.00', '0.00', '0.00', '12.36', '0.00', '0.00', '0.00', '4.96', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('50', 'mean_value', '2', '31010720190002001', '0.8', '8.19', '1.16', '0.00', '0.00', '0.00', '0.00', '0.00', '25.69', '0.00', '0.00', '0.00', '11.36', '0.00', '0.00', '0.00', '2.96', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('51', 'mean_value', '2', '31010720190002001', '2.2', '7.19', '1.16', '0.00', '0.00', '0.00', '0.00', '0.00', '6.69', '0.00', '0.00', '0.00', '27.36', '0.00', '0.00', '0.00', '3.96', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('52', 'mean_value', '2', '31010720190002001', '3.7', '8.70', '0.48', '1.30', '26.00', '25.80', '174.00', '31.90', '72.90', '0.18', '8.40', '0.34', '0.03', '0.00', '0.47', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('53', 'mean_value', '2', '31010720190002002', '0.2', '9.19', '1.16', '0.00', '0.00', '0.00', '0.00', '0.00', '24.69', '0.00', '0.00', '0.00', '12.36', '0.00', '0.00', '0.00', '24.96', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('54', 'mean_value', '2', '31010720190002002', '0.8', '8.19', '1.16', '0.00', '0.00', '0.00', '0.00', '0.00', '5.69', '0.00', '0.00', '0.00', '11.36', '0.00', '0.00', '0.00', '2.96', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('55', 'mean_value', '2', '31010720190002002', '2.2', '7.19', '1.16', '0.00', '0.00', '0.00', '0.00', '0.00', '6.69', '0.00', '0.00', '0.00', '27.36', '0.00', '0.00', '0.00', '3.96', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('56', 'mean_value', '2', '31010720190002002', '3.7', '9.60', '0.16', '1.60', '30.90', '18.30', '82.10', '16.60', '66.60', '0.14', '6.50', '0.03', '0.02', '0.00', '0.29', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('57', 'max_value', '3', '31010720190001004', '0', '0', '0', '0', '28', '53.2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_type2_ground_statistic_value` VALUES ('58', 'mean_value', '3', '31010720190001004', '0', '0.00', '0.00', '0.00', '25.50', '29.13', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null);
SET FOREIGN_KEY_CHECKS=1;
