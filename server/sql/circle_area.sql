/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-22 21:16:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for circle_area
-- ----------------------------
DROP TABLE IF EXISTS `circle_area`;
CREATE TABLE `circle_area` (
  `id` int(11) NOT NULL,
  `project_num` varchar(255) DEFAULT NULL,
  `project_num_id` int(11) DEFAULT NULL,
  `lng` varchar(255) DEFAULT NULL,
  `log` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of circle_area
-- ----------------------------
INSERT INTO `circle_area` VALUES ('1', '2019-0001-0001', '1', '121.455874', '31.277175');
INSERT INTO `circle_area` VALUES ('2', '2019-0001-0001', '2', '121.456990', '31.272847');
INSERT INTO `circle_area` VALUES ('3', '2019-0001-0001', '3', '121.461067', '31.274553');
INSERT INTO `circle_area` VALUES ('4', '2019-0001-0001', '4', '121.458857', '31.278386');
INSERT INTO `circle_area` VALUES ('6', '2019-0001-0002', '1', '121.443062', '31.282669');
INSERT INTO `circle_area` VALUES ('7', '2019-0001-0002', '2', '121.446413', '31.283118');
INSERT INTO `circle_area` VALUES ('8', '2019-0001-0002', '3', '121.446595', '31.278985');
INSERT INTO `circle_area` VALUES ('9', '2019-0001-0002', '4', '121.444234', '31.278449');
INSERT INTO `circle_area` VALUES ('10', '2019-0001-0003', '1', '121.451802', '31.225795');
INSERT INTO `circle_area` VALUES ('11', '2019-0001-0003', '2', '121.454184', '31.225557');
INSERT INTO `circle_area` VALUES ('12', '2019-0001-0003', '3', '121.454227', '31.223832');
INSERT INTO `circle_area` VALUES ('13', '2019-0001-0003', '4', '121.45163', '31.223006');
INSERT INTO `circle_area` VALUES ('14', '2019-0003-0001', '1', '121.387013', '31.31997');
INSERT INTO `circle_area` VALUES ('15', '2019-0003-0001', '2', '121.401282', '31.32118');
INSERT INTO `circle_area` VALUES ('16', '2019-0003-0001', '3', '121.399566', '31.312216');
INSERT INTO `circle_area` VALUES ('17', '2019-0003-0001', '4', '121.38785', '31.311318');
INSERT INTO `circle_area` VALUES ('18', '2019-0003-0001', '1', '121.42038', '31.307115');
INSERT INTO `circle_area` VALUES ('19', '2019-0003-0002', '2', '121.423255', '31.306895');
INSERT INTO `circle_area` VALUES ('20', '2019-0003-0002', '3', '121.422547', '31.305209');
INSERT INTO `circle_area` VALUES ('21', '2019-0003-0002', '4', '121.42141', '31.304824');
INSERT INTO `circle_area` VALUES ('22', '2019-0003-0002', '5', '121.420487', '31.30618');
INSERT INTO `circle_area` VALUES ('23', '2019-0003-0002', '6', '121.420509', '31.30673');
INSERT INTO `circle_area` VALUES ('24', '2019-0002-0001', '1', '121.419721', '31.223359');
INSERT INTO `circle_area` VALUES ('25', '2019-0002-0001', '2', '121.420386', '31.223047');
INSERT INTO `circle_area` VALUES ('26', '2019-0002-0001', '3', '121.421931', '31.222386');
INSERT INTO `circle_area` VALUES ('27', '2019-0002-0001', '4', '121.422253', '31.219836');
INSERT INTO `circle_area` VALUES ('28', '2019-0002-0001', '5', '121.419742', '31.219028');
INSERT INTO `circle_area` VALUES ('29', '2019-0002-0001', '6', '121.418154', '31.221377');
INSERT INTO `circle_area` VALUES ('30', '2019-0002-0001', '7', '121.418047', '31.221946');
INSERT INTO `circle_area` VALUES ('31', '2019-0002-0001', '8', '121.41706', '31.221726');
INSERT INTO `circle_area` VALUES ('32', '2019-0002-0001', '9', '121.416931', '31.220478');
INSERT INTO `circle_area` VALUES ('33', '2019-0002-0001', '10', '121.416159', '31.220918');
INSERT INTO `circle_area` VALUES ('34', '2019-0002-0001', '11', '121.415558', '31.221047');
INSERT INTO `circle_area` VALUES ('35', '2019-0002-0001', '12', '121.415665', '31.223469');
INSERT INTO `circle_area` VALUES ('36', '2019-0002-0002', '1', '121.414479', '31.241922');
INSERT INTO `circle_area` VALUES ('37', '2019-0002-0002', '2', '121.417032', '31.242069');
INSERT INTO `circle_area` VALUES ('38', '2019-0002-0002', '3', '121.416496', '31.240565');
INSERT INTO `circle_area` VALUES ('39', '2019-0002-0002', '4', '121.414146', '31.240675');
INSERT INTO `circle_area` VALUES ('40', '31010720190001', null, null, null);
SET FOREIGN_KEY_CHECKS=1;