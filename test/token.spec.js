const { tokenParser, parseGroup } = require('../src/utils/token');
const stubValue = require('./stub.json');

describe('TokenSpec', function () {
    it('should verify the token', function () {
        const returnValue = tokenParser(stubValue, 'app-dev');
        expect(typeof returnValue["X-Hasura-User-Id"]).toBe('string');
        expect(returnValue["X-Hasura-User-Id"]).toBe('39306dc9-534b-43e0-ac3b-94ef9b50ccce');
        expect(returnValue["X-Hasura-Organization-Id"]).toBe('org');

        for (const key in returnValue) {
            if (returnValue.hasOwnProperty(key)) {
                expect(typeof returnValue[key]).toBe('string');
            }
        }

    });

    it('should parse the group', function () {
        let organizationId = parseGroup(['/group'], 0);
        expect(organizationId['X-Hasura-Organization-Id']).toBe('group');
        organizationId = parseGroup(['/group/group'], 0);
        expect(organizationId['X-Hasura-Sub-Group-Id']).toBe('group');
    });
});
