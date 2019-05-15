const { tokenParser } = require('../src/token');
const stubValue = require('./stub.json');

describe('TokenSpec', function () {
    it('should verify the token', function () {
        const returnValue = tokenParser(stubValue, 'app-dev');
        expect(typeof returnValue["X-Hasura-User-Id"]).toBe('string');
        expect(returnValue["X-Hasura-User-Id"]).toBe('39306dc9-534b-43e0-ac3b-94ef9b50ccce');
        expect(returnValue["X-Hasura-Organization-Id"]).toBe('org');
    });
});
