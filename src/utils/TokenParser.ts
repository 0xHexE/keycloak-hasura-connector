import config from '../config';
import logger from './Logger';

const userFieldName = config.get('UserIdField');

type tDict = {
  [key: string]: any;
};

export const parseGroup = (group: any, defaultGroup?: number): tDict => {
  const parsedGroup: tDict = {};

  const rootGroups = group
    .map((res: string) => res.split('/')[1])
    .filter((item: any, index: number, self: any) => self.indexOf(item) === index);

  if (rootGroups.length === 1) {
    [parsedGroup['X-Hasura-Organization-Id']] = rootGroups;
  } else if (defaultGroup) {
    parsedGroup['X-Hasura-Organization-Id'] = rootGroups[defaultGroup];
  } else {
    logger.log({
      level: 'info',
      message: 'Default organization assigned as first',
    });
    [parsedGroup['X-Hasura-Organization-Id']] = rootGroups;
  }

  // TODO: IMPROVE THIS FUNCTION
  const subGroup = group
    .map((res: string) => res.split('/')[2])
    .filter((res: string) => !!res)
    .filter((item: any, index: number, self: any) => self.indexOf(item) === index);

  if (subGroup[0]) {
    [parsedGroup['X-Hasura-Sub-Group-Id']] = subGroup;
  }

  return parsedGroup;
};

export const tokenParser = (content: any, clientId: string, debugMode?: boolean): tDict => {
  const accessToken = content.access_token;
  const userId = accessToken.content[userFieldName];

  let group = {};

  const role: tDict = {
    'X-Hasura-Realm-Role': (accessToken.content.realm_access.roles || []).join(','),
  };

  if (accessToken.content && Array.isArray(accessToken.content.group)) {
    group = parseGroup(accessToken.content.group);
  }

  const clientResource = accessToken.content.resource_access[clientId];

  if (
    accessToken.content &&
    accessToken.content.resource_access &&
    clientResource &&
    Array.isArray(clientResource.roles) &&
    clientResource.roles.length !== 0
  ) {
    [role['X-Hasura-Role']] = clientResource.roles;
  } else {
    logger.log({
      level: 'warn',
      message:
        'Role not found in the token please verify the client ID is valid or the role scope is enabled',
    });
  }

  return {
    'X-Hasura-User-Id': userId,
    'X-Debug-Mode-Enabled': (debugMode || false).toString(),
    ...group,
    ...role,
  };
};
