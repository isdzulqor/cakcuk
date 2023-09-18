-- Table Creation
CREATE TABLE IF NOT EXISTS `SSH` (
  `id` char(36) NOT NULL,
  `teamID` char(36) DEFAULT NULL,
  `host` char(100) NOT NULL,
  `port` int NOT NULL,
  `username` char(100) NOT NULL,
  `password` char(100),
  `sshKey` text,
  `salt` char(100),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `CommandGroup` (
  `groupName` char(100) NOT NULL,
  `teamID` char(36) NOT NULL,
  `commandID` char(36) NOT NULL,
  `label` char(100) NULL,
  PRIMARY KEY (`groupName`, `commandID`)
);

CREATE TABLE IF NOT EXISTS `Command` (
  `id` char(36) NOT NULL,
  `teamID` char(36) DEFAULT NULL,
  `name` char(100) NOT NULL,
  `description` text,
  `example` text,
  `completeDescription` text,
  `groupName` char(100) NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `CommandDetail` (
  `id` char(36) NOT NULL,
  `scopeID` char(36) DEFAULT NULL,
  `commandID` char(36) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated` timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Option` (
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
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Bot` (
  `id` char(36) NOT NULL,
  `referenceID` char(20) NOT NULL,
  `teamID` char(36) NOT NULL,
  `name` text,
  `source` char(20),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Team` (
  `id` char(36) NOT NULL,
  `referenceID` char(36) NOT NULL,
  `referenceToken` text NOT NULL,
  `name` text,
  `domain` text,
  `emailDomain` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Scope` (
  `id` char(36) NOT NULL,
  `name` char(20) NOT NULL,
  `teamID` char(36) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated` timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `ScopeDetail` (
  `id` char(36) NOT NULL,
  `scopeID` char(36) NOT NULL,
  `userReferenceID` char(20) NOT NULL,
  `userReferenceName` char(40) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated` timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `User` (
  `id` char(36) NOT NULL,
  `name` char(100) NOT NULL,
  `referenceID` char(36) NOT NULL,
  `teamID` char(36) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated` timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Indexes
CREATE INDEX idx_createdBy_SSH ON SSH (createdBy);
CREATE INDEX idx_teamID_SSH ON SSH (teamID);
CREATE INDEX idx_groupName_Command ON Command (groupName);

-- Unique Constraints (excluding primary keys)
CREATE UNIQUE INDEX uniq_groupName_commandID ON CommandGroup (groupName, commandID);
CREATE UNIQUE INDEX uniq_teamIDNameGroupName ON Command (teamID, name, groupName);
CREATE UNIQUE INDEX uniq_scopeID_commandID ON CommandDetail (scopeID, commandID);
CREATE UNIQUE INDEX uniq_commandIDName ON `Option` (commandID, name);
CREATE UNIQUE INDEX uniq_commandIDShortName ON `Option` (commandID, shortName);
CREATE UNIQUE INDEX uniq_referenceIDTeamID ON Bot (referenceID, teamID);
CREATE UNIQUE INDEX uniq_referenceID_Team ON Team (referenceID);
CREATE UNIQUE INDEX uniq_nameTeamID ON Scope (name, teamID);
CREATE UNIQUE INDEX uniq_scopeIDUserReferenceID ON ScopeDetail (scopeID, userReferenceID);
CREATE UNIQUE INDEX uniq_teamIDreferenceID ON User (teamID, referenceID);
