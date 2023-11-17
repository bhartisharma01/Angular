
CREATE TABLE `user` (
  `id` INT NOT NULL,
  `name` VARCHAR(250) NULL,
  `mobile` VARCHAR(20) NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(250) NULL,
  `status` VARCHAR(20) NULL,
  `role` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);



  INSERT INTO `user`
(`id`,
`name`,
`mobile`,
`email`,
`password`,
`status`,
`role`)
VALUES
('1','admin','8789898789','admin@gmail.com','admin', 'true','admin');


CREATE TABLE `cafesys`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `categoryId` INT NOT NULL,
  `description` VARCHAR(255) NULL,
  `price` INT NULL,
  `status` VARCHAR(20) NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `cafesys`.`bill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `paymentMethod` VARCHAR(50) NOT NULL,
  `total` INT NOT NULL,
  `productDetails` JSON NULL,
  `createdBy` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));