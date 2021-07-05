/*
 Navicat Premium Data Transfer

 Source Server         : guojufeng
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : company

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 17/01/2021 15:12:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for buy_relation
-- ----------------------------
DROP TABLE IF EXISTS `buy_relation`;
CREATE TABLE `buy_relation` (
  `relation_id` int NOT NULL AUTO_INCREMENT COMMENT '关系数据id',
  `user_id` int NOT NULL COMMENT '购买商品的用户',
  `products_id` int NOT NULL COMMENT '购买的商品',
  PRIMARY KEY (`relation_id`),
  KEY `user_id` (`user_id`),
  KEY `products_id` (`products_id`),
  CONSTRAINT `buy_relation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_buy_car` (`id`),
  CONSTRAINT `buy_relation_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of buy_relation
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT COMMENT '产品id',
  `product_name` varchar(255) NOT NULL COMMENT '产品名称',
  `product_company` varchar(255) NOT NULL COMMENT '产品厂家-外键',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of products
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user_buy_car
-- ----------------------------
DROP TABLE IF EXISTS `user_buy_car`;
CREATE TABLE `user_buy_car` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `car_name` varchar(255) DEFAULT NULL COMMENT '购物车虚拟名字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_buy_car
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(10) NOT NULL COMMENT '昵称',
  `age` int DEFAULT NULL COMMENT '年龄',
  `sex` bit(1) DEFAULT NULL COMMENT '年龄',
  `phone` varchar(11) NOT NULL COMMENT '电话号',
  PRIMARY KEY (`id`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user_login` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_info
-- ----------------------------
BEGIN;
INSERT INTO `user_info` VALUES (1, 'xing.org1', 12, b'1', '14127243361');
INSERT INTO `user_info` VALUES (2, '小石头', 23, b'0', '17212327384');
COMMIT;

-- ----------------------------
-- Table structure for user_login
-- ----------------------------
DROP TABLE IF EXISTS `user_login`;
CREATE TABLE `user_login` (
  `userid` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(20) NOT NULL COMMENT '用户登录名',
  `password` varchar(20) NOT NULL COMMENT '登录密码',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_login
-- ----------------------------
BEGIN;
INSERT INTO `user_login` VALUES (1, 'xing.org1', '123123');
INSERT INTO `user_login` VALUES (2, 'xiaoshitou', '333333');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
