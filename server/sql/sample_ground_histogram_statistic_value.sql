/*
Navicat MySQL Data Transfer

Source Server         : tank
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-05-26 13:31:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sample_ground_histogram_statistic_value
-- ----------------------------
DROP TABLE IF EXISTS `sample_ground_histogram_statistic_value`;
CREATE TABLE `sample_ground_histogram_statistic_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statistic_value` varchar(255) NOT NULL,
  `point_num` varchar(255) NOT NULL,
  `assess_type` int(255) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sample_ground_histogram_statistic_value
-- ----------------------------
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('1', 'mean_value', '31010720190001001', '1', '8.53', '8.13', '0.60', '37.60', '110.67', '901.33', '86.47', '57.33', '9.17', '7.63', '1.96', '0.53', '0.07', '0.10', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('2', 'mean_value', '31010720190001002', '1', '8.53', '0.33', '0.47', '25.13', '40.17', '100.00', '57.90', '25.40', '0.40', '5.90', '0.47', '0.60', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('3', 'mean_value', '31010720190001003', '1', '8.27', '8.17', '0.47', '21.80', '25.37', '76.07', '65.83', '31.50', '0.34', '6.57', '1.32', '1.27', '0.00', '0.20', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('4', 'mean_value', '31010720190001004', '1', '8.37', '8.37', '0.53', '463.40', '696.77', '80.73', '34.87', '23.87', '0.14', '5.30', '0.17', '0.40', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('5', 'mean_value', '31010720190001005', '1', '8.50', '8.50', '0.50', '22.53', '28.60', '164.87', '36.70', '23.67', '1.38', '6.17', '0.24', '0.50', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('6', 'mean_value', '31010720190001006', '1', '8.63', '8.63', '0.40', '22.67', '17.13', '56.27', '22.47', '23.37', '0.51', '3.47', '0.14', '0.47', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('7', 'mean_value', '31010720190001007', '1', '8.25', '3.70', '0.50', '22.10', '48.05', '358.00', '92.10', '32.25', '1.80', '6.45', '1.25', '0.00', '0.15', '0.75', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('8', 'mean_value', '31010720190001008', '1', '8.85', '0.00', '0.65', '22.30', '30.30', '177.00', '33.00', '26.50', '0.80', '5.40', '0.36', '1.00', '0.15', '0.50', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('9', 'mean_value', '31010720190001009', '1', '8.10', '2.20', '0.60', '27.20', '49.90', '155.90', '73.35', '31.70', '0.65', '7.90', '0.94', '0.35', '0.40', '0.30', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('10', 'mean_value', '31010720190001010', '1', '8.75', '0.00', '0.70', '21.90', '19.70', '54.70', '26.80', '23.70', '0.24', '6.20', '0.44', '1.10', '0.10', '0.60', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('11', 'mean_value', '31010720190001011', '1', '5.65', '0.00', '0.60', '21.40', '30.30', '105.00', '33.00', '41.50', '0.34', '8.60', '0.10', '0.90', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('12', 'mean_value', '31010720190001012', '1', '9.15', '0.40', '0.80', '26.10', '46.60', '146.85', '111.00', '28.20', '0.48', '7.10', '0.53', '1.00', '0.10', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('13', 'mean_value', '31010720190001013', '1', '8.65', '0.00', '0.70', '21.10', '17.95', '60.70', '26.00', '22.90', '0.23', '4.65', '0.22', '1.20', '0.05', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('14', 'mean_value', '31010720190001001', '2', '8.88', '0.54', '2.08', '34.57', '18.18', '74.29', '20.54', '78.55', '0.10', '6.79', '0.12', '0.00', '0.48', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('15', 'mean_value', '31010720190001003', '2', '9.22', '0.51', '2.05', '29.70', '16.51', '77.70', '20.66', '69.04', '0.20', '5.76', '0.13', '0.00', '0.40', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('16', 'mean_value', '31010720190001004', '2', '9.11', '0.52', '1.61', '28.66', '18.87', '101.39', '21.68', '63.97', '0.18', '6.01', '0.18', '0.00', '0.38', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('17', 'mean_value', '31010720190001007', '2', '8.97', '0.58', '1.59', '31.36', '20.45', '83.51', '23.24', '73.78', '0.15', '6.58', '0.21', '0.00', '0.42', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('18', 'mean_value', '31010720190001009', '2', '8.92', '0.50', '1.46', '28.63', '19.36', '105.08', '21.23', '65.11', '0.15', '6.13', '0.18', '0.00', '0.39', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('19', 'mean_value', '31010720190001004', '3', '0.00', '0.00', '0.00', '25.50', '29.13', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('20', 'max_value', '31010720190001001', '1', '8.9', '12.2', '0.6', '44.2', '46', '277', '39.2', '35', '12.8', '5.2', '2.83', '0.8', '0.1', '0.1', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('21', 'max_value', '31010720190001002', '1', '8.8', '0.5', '0.5', '26.9', '54.4', '45', '34.9', '26.9', '0.57', '6.5', '0.65', '0.6', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('22', 'max_value', '31010720190001003', '1', '8.5', '8.2', '0.6', '22.3', '32.1', '59.6', '67.1', '42.1', '0.58', '8.3', '1.91', '1.8', '0', '0.3', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('23', 'max_value', '31010720190001004', '1', '8.7', '8.7', '0.6', '25.1', '21.9', '64.7', '42', '24.2', '0.19', '5.4', '0.28', '0.6', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('24', 'max_value', '31010720190001005', '1', '8.8', '8.8', '0.6', '22.9', '35.5', '70.8', '46.1', '24.7', '1.95', '6.9', '0.34', '1', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('25', 'max_value', '31010720190001006', '1', '8.9', '8.9', '0.4', '22.7', '18.6', '60.4', '24.1', '23.6', '0.72', '3.7', '0.18', '0.7', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('26', 'max_value', '31010720190001007', '1', '8.5', '3.7', '1', '22.9', '67.9', '612', '58.2', '36.4', '3.36', '7.4', '1.25', '0', '0.3', '1.1', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('27', 'max_value', '31010720190001008', '1', '9.2', '0', '0.7', '22.3', '31.9', '177', '33', '26.5', '0.8', '5.4', '0.36', '1.1', '0.2', '0.5', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('28', 'max_value', '31010720190001009', '1', '8.2', '2.2', '0.6', '27.2', '49.9', '79.8', '22.7', '35.2', '0.65', '7.9', '0.94', '0.7', '0.4', '0.4', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('29', 'max_value', '31010720190001010', '1', '8.8', '0', '0.7', '21.9', '22.7', '54.7', '28.8', '23.7', '0.35', '6.2', '0.79', '1.1', '0.1', '0.6', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('30', 'max_value', '31010720190001011', '1', '9.2', '0', '0.6', '21.4', '30.3', '105', '33.2', '41.5', '0.54', '8.6', '0.1', '0.9', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('31', 'max_value', '31010720190001012', '1', '9.4', '0.4', '0.8', '26.1', '46.6', '98.7', '114', '28.2', '0.48', '7.1', '1.02', '1', '0.1', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('32', 'max_value', '31010720190001013', '1', '9', '0', '0.7', '21.1', '18.7', '60.7', '29.3', '22.9', '0.23', '5.5', '0.34', '1.3', '0.1', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('33', 'max_value', '31010720190001001', '2', '9.54', '1.1', '3.5', '41.9', '29.5', '95.1', '29.9', '91.9', '0.2', '8.9', '0.579', '0', '0.63', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('34', 'max_value', '31010720190001003', '2', '9.92', '0.94', '2.5', '41.9', '23.5', '95.1', '31.9', '89', '0.55', '8.9', '0.339', '0', '0.59', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('35', 'max_value', '31010720190001004', '2', '9.92', '1.1', '3.4', '37.1', '36.7', '87.3', '44.3', '83.9', '0.55', '8.2', '0.793', '0', '0.47', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('36', 'max_value', '31010720190001007', '2', '9.72', '1.1', '2.3', '37.1', '36.7', '78.8', '44.3', '91.9', '0.37', '8.4', '0.793', '0', '0.5', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('37', 'max_value', '31010720190001009', '2', '9.72', '1.1', '2.3', '37.1', '36.7', '82.1', '44.3', '83.9', '0.37', '8.4', '0.793', '0', '0.5', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('38', 'max_value', '31010720190001004', '3', '0', '0', '0', '28', '53.2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('39', 'mean_value', '31010720190002001', '1', '8.52', '1.41', '0.00', '0.00', '0.00', '0.00', '0.00', '9.36', '0.00', '0.00', '0.00', '12.36', '0.00', '0.00', '0.00', '16.29', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('40', 'mean_value', '31010720190002002', '1', '8.19', '1.16', '0.00', '0.00', '0.00', '0.00', '0.00', '6.36', '0.00', '0.00', '0.00', '15.36', '0.00', '0.00', '0.00', '10.63', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('41', 'mean_value', '31010720190002001', '2', '8.19', '1.49', '0.00', '0.00', '0.00', '0.00', '0.00', '13.02', '0.00', '0.00', '0.00', '22.03', '0.00', '0.00', '0.00', '3.96', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('42', 'mean_value', '31010720190002002', '2', '8.19', '1.16', '0.00', '0.00', '0.00', '0.00', '0.00', '6.36', '0.00', '0.00', '0.00', '22.03', '0.00', '0.00', '0.00', '3.63', '0.00', '0.00', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('43', 'max_value', '31010720190002001', '1', '9.190', '3.060', '0', '0', '0', '0', '0', '6.690', '0', '0', '0', '12.360', '0', '0', '0', '22.960', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('44', 'max_value', '31010720190002002', '1', '9.190', '1.160', '0', '0', '0', '0', '0', '6.690', '0', '0', '0', '17.360', '0', '0', '0', '4.960', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('45', 'max_value', '31010720190002001', '2', '9.190', '2.160', '0', '0', '0', '0', '0', '6.690', '0', '0', '0', '27.360', '0', '0', '0', '4.960', '0', '0', null);
INSERT INTO `sample_ground_histogram_statistic_value` VALUES ('46', 'max_value', '31010720190002002', '2', '9.190', '1.160', '0', '0', '0', '0', '0', '6.690', '0', '0', '0', '27.360', '0', '0', '0', '3.960', '0', '0', null);
SET FOREIGN_KEY_CHECKS=1;
