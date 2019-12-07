import { tokenParser, parseGroup } from '../src/utils/TokenParser';
import stubValue from './stub.json';

type tDict = {
  [key: string]: any;
};

describe('TokenSpec', function() {
  it('should verify the token', function() {
    const returnValue: tDict = tokenParser(stubValue, 'app-dev');
    expect(typeof returnValue['X-Hasura-User-Id']).toBe('string');
    expect(returnValue['X-Hasura-User-Id']).toBe('39306dc9-534b-43e0-ac3b-94ef9b50ccce');
    expect(returnValue['X-Hasura-Organization-Id']).toBe('org');

    for (const key in returnValue) {
      if (returnValue.hasOwnProperty(key)) {
        expect(typeof returnValue[key]).toBe('string');
      }
    }
  });

  it('should parse the group', function() {
    let organizationId: tDict = parseGroup(['/group'], 0);
    expect(organizationId['X-Hasura-Organization-Id']).toBe('group');
    organizationId = parseGroup(['/group/group'], 0);
    expect(organizationId['X-Hasura-Sub-Group-Id']).toBe('group');
  });
});