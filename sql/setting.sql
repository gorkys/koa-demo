/*
Navicat MySQL Data Transfer

Source Server         : koa
Source Server Version : 50162
Source Host           : 127.0.0.1:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50162
File Encoding         : 65001

Date: 2019-08-30 16:24:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(255) DEFAULT NULL,
  `resourceAddress` varchar(255) DEFAULT NULL,
  `switchEffects` varchar(255) DEFAULT NULL,
  `admissionEffect` varchar(255) DEFAULT NULL,
  `textContent` varchar(255) DEFAULT NULL,
  `textColor` varchar(255) DEFAULT NULL,
  `bgColor` varchar(255) DEFAULT NULL,
  `bold` tinyint(4) DEFAULT NULL,
  `italic` tinyint(4) DEFAULT NULL,
  `underline` tinyint(4) DEFAULT NULL,
  `align` varchar(255) DEFAULT NULL,
  `speed` int(11) DEFAULT NULL,
  `direction` int(11) DEFAULT NULL,
  `fontSize` int(11) DEFAULT NULL,
  `font` varchar(255) DEFAULT NULL,
  `templateId` int(11) DEFAULT NULL,
  `elementsId` bigint(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elementsId` (`elementsId`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;
