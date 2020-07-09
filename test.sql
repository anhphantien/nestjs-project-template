/*
 Navicat Premium Data Transfer

 Source Server         : DATN
 Source Server Type    : MariaDB
 Source Server Version : 100322
 Source Host           : 127.0.0.1:3306
 Source Schema         : test

 Target Server Type    : MariaDB
 Target Server Version : 100322
 File Encoding         : 65001

 Date: 30/04/2020 18:29:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for template
-- ----------------------------
DROP TABLE IF EXISTS `template`;
CREATE TABLE `template` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `languageCode` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `templateCode` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationTime` bigint(20) unsigned DEFAULT NULL,
  `updateTime` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `templateCode` (`templateCode`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of template
-- ----------------------------
BEGIN;
INSERT INTO `template` VALUES (1, NULL, 'TWO_FACTOR_AUTHENTICATION', 'LOGIN_ALERT', 'Your OTP is {{OTP}}. This OTP is valid for {{OTP_TIME_TO_LIVE}} minutes.', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `passwordHash` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `role` tinyint(4) DEFAULT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `languageCode` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `temporaryPassword` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationTime` bigint(20) unsigned DEFAULT NULL,
  `updateTime` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (2, 'anhphan', '$2b$12$F1s1/n494GrvvnERzoKROO0RY689DQu9jstsKL6sVP1FQgSPjN9FW', 1, 1, 'phanlong315@gmail.com', NULL, NULL, NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
