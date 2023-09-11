CREATE TABLE `ChannelScope` (
  `scopeID` char(36) NOT NULL,
  `channelRef` char(50) NOT NULL,
  `created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` char(36) NOT NULL,
  `updated`  timestamp NULL,
  `updatedBy` char(36) DEFAULT NULL,
  PRIMARY KEY (`scopeID`, `channelRef`)
);