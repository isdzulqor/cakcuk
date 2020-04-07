CREATE TABLE `Command` (
  `id` char(36) NOT NULL,
  `teamID` char(36) DEFAULT NULL,
  `name` char(20) NOT NULL,
  `description` text,
  `example` text,
  `completeDescription` text,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`)
);

-- TODO: CommandScope
CREATE TABLE `CommandDetail` (
  `id` char(36) NOT NULL,
  `scopeID` char(36) DEFAULT NULL,
  `commandID` char(36) DEFAULT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `scopeIDCommandID` (`scopeID`, `commandID`)
);

CREATE TABLE `Option` (
  `id` char(36) NOT NULL,
  `commandID` char(36) DEFAULT NULL,
  `name` char(20) NOT NULL,
  `value` text,
  `defaultValue` text,
  `shortName` char(10),
  `description` text,
  `isSingleOption` boolean DEFAULT false,
  `isMandatory` boolean DEFAULT false,
  `isMultipleValue` boolean DEFAULT false,
  `isDynamic` boolean DEFAULT false,
  `isEncrypted` boolean DEFAULT false,
  `isCustom` boolean DEFAULT false,
  `isHidden` boolean DEFAULT false,
  `example` text,
  `optionAlias` char(20) DEFAULT NULL,
  `valueDynamic` text DEFAULT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `commandIDName` (`commandID`,`name`),
  UNIQUE `commandIDShortName` (`commandID`,`shortName`)
);

CREATE TABLE `Slackbot` (
  `id` char(36) NOT NULL,
  `slackID` char(20) NOT NULL,
  `name` text,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`slackID`)
);

CREATE TABLE `Team` (
  `id` char(36) NOT NULL,
  `slackID` char(36) NOT NULL,
  `name` text,
  `domain` text,
  `emailDomain` text,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`slackID`)
);

CREATE TABLE `Scope` (
  `id` char(36) NOT NULL,
  `name` char(20) NOT NULL,
  `teamID` char(36) NOT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `nameTeamID` (`name`,`teamID`)
);

-- TODO: ScopeUser
-- TODO: user reference?
CREATE TABLE `ScopeDetail` (
  `id` char(36) NOT NULL,
  `scopeID` char(36) NOT NULL,
  `userSlackID` char(20) NOT NULL,
  `userSlackName` char(40) NOT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `scopeIDUserSlackID` (`scopeID`,`userSlackID`)
);

CREATE TABLE `User` (
  `id` char(36) NOT NULL,
  `name` char(40) NOT NULL,
  `referenceID` char(20) NOT NULL,
  `teamID` char(20) NOT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `teamIDreferenceID` (`teamID`,`referenceID`)
);
