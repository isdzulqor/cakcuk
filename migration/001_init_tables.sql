CREATE TABLE `Command` (
  `id` char(36) NOT NULL,
  `teamID` char(36) DEFAULT NULL,
  `name` char(20) NOT NULL,
  `description` text,
  `example` text,
  `completeDescription` text,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`),
  UNIQUE `teamIDName` (`teamID`, `name`)
);

CREATE TABLE `Option` (
  `id` char(36) NOT NULL,
  `commandID` char(36) DEFAULT NULL,
  `name` char(20) NOT NULL,
  `value` text,
  `shortName` char(10),
  `description` text,
  `isSingleOption` boolean DEFAULT false,
  `isMandatory` boolean DEFAULT false,
  `isMultipleValue` boolean DEFAULT false,
  `isDynamic` boolean DEFAULT false,
  `isEncrypted` boolean DEFAULT false,
  `isCustom` boolean DEFAULT false,
  `example` text,
  `optionAlias` char(20) DEFAULT NULL,
  `valueDynamic` text DEFAULT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `commandIDName` (`commandID`,`name`),
  UNIQUE `commandIDShortName` (`commandID`,`shortName`)
);

CREATE TABLE `Slackbot` (
  `id` char(36) NOT NULL,
  `slackID` char(20) NOT NULL,
  `name` text,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`slackID`)
);

CREATE TABLE `Team` (
  `id` char(36) NOT NULL,
  `slackID` char(20) NOT NULL,
  `name` text,
  `domain` text,
  `emailDomain` text,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`slackID`)
);