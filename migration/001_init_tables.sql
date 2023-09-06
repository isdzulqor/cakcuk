CREATE TABLE `SSH` (
  `id` char(36) NOT NULL,
  `teamID` char(36) DEFAULT NULL,
  `host` char(100) NOT NULL,
  `port` int NOT NULL,
  `username` char(100) NOT NULL,
  `password` char(100),
  `sshKey` text,
  `salt` char(100),
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `createdBy` (`createdBy`),
  INDEX `teamID` (`teamID`)
);

CREATE TABLE `CommandSSH` (
  `commandID` char(36) NOT NULL,
  `sshID` char(36) NOT NULL,
  PRIMARY KEY (`sshID`, `commandID`)
);

CREATE TABLE `Command` (
  `id` char(36) NOT NULL,
  `teamID` char(36) DEFAULT NULL,
  `name` char(100) NOT NULL,
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
  `updated`  timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `scopeIDCommandID` (`scopeID`, `commandID`)
);

CREATE TABLE `Option` (
  `id` char(36) NOT NULL,
  `commandID` char(36) DEFAULT NULL,
  `name` char(100) NOT NULL,
  `value` text,
  `defaultValue` text,
  `shortName` char(100),
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

CREATE TABLE `Bot` (
  `id` char(36) NOT NULL,
  `referenceID` char(20) NOT NULL,
  `teamID` char(36) NOT NULL,
  `name` text,
  `source` char(20),
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `referenceIDTeamID` (`referenceID`, `teamID`)
);

CREATE TABLE `Team` (
  `id` char(36) NOT NULL,
  `referenceID` char(36) NOT NULL,
  `referenceToken` text NOT NULL,
  `name` text,
  `domain` text,
  `emailDomain` text,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`referenceID`)
);

CREATE TABLE `Scope` (
  `id` char(36) NOT NULL,
  `name` char(20) NOT NULL,
  `teamID` char(36) NOT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `nameTeamID` (`name`,`teamID`)
);

CREATE TABLE `ScopeDetail` (
  `id` char(36) NOT NULL,
  `scopeID` char(36) NOT NULL,
  `userReferenceID` char(20) NOT NULL,
  `userReferenceName` char(40) NOT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `scopeIDUserReferenceID` (`scopeID`,`userReferenceID`)
);

-- TODO: role
CREATE TABLE `User` (
  `id` char(36) NOT NULL,
  `name` char(100) NOT NULL,
  `referenceID` char(36) NOT NULL,
  `teamID` char(36) NOT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE `teamIDreferenceID` (`teamID`,`referenceID`)
);
