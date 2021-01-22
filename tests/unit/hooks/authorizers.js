'use strict';

const assert = require('assert').strict;

const { authorizers } = require('../../..');

describe('Hooks', () => {

	describe('Authorizers', () => {

		const accountId = '012345678910';

		const expectedAuthorizers = {
			FullAuthorizer: {
				name: 'FullAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-FullAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-client,method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			NoClientAuthorizer: {
				name: 'NoClientAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-NoClientAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			LoggedAuthorizer: {
				name: 'LoggedAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-LoggedAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			ApiKeyAuthorizer: {
				name: 'ApiKeyAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-ApiKeyAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			UserAuthorizer: {
				name: 'UserAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-UserAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			DevUserAuthorizer: {
				name: 'DevUserAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-DevUserAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			ServiceAuthorizer: {
				name: 'ServiceAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-ServiceAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-client,method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			ServiceNoClientAuthorizer: {
				name: 'ServiceNoClientAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-ServiceAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret',
				type: 'request'
			},

			ClientAuthorizer: {
				name: 'ClientAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-ClientAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-client',
				type: 'request'
			},

			ImportExportAuthorizer: {
				name: 'ImportExportAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-ImportExportAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret,method.request.header.janis-entity',
				type: 'request'
			},

			ImportAuthorizer: {
				name: 'ImportAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-ImportAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret,method.request.header.janis-service,method.request.header.janis-entity', // eslint-disable-line max-len
				type: 'request'
			},

			ExportAuthorizer: {
				name: 'ExportAuthorizer',
				arn: `arn:aws:lambda:us-east-1:${accountId}:function:JanisAuthorizerService-\${self:custom.stage}-ExportAuthorizer`,
				resultTtlInSeconds: 300,
				identitySource: 'method.request.header.janis-api-key,method.request.header.janis-api-secret,method.request.header.janis-entity',
				type: 'request'
			}
		};

		it('Should throw if accountId is not passed', () => {

			assert.throws(() => authorizers({}, {}));
		});

		it('Should return the authorizers service configuration', () => {

			const serviceConfig = authorizers({}, { accountId });

			assert.deepStrictEqual(serviceConfig, {
				custom: {
					authorizers: { ...expectedAuthorizers }
				}
			});
		});

		it('Should return the authorizers service configuration maintaining previous authorizers', () => {

			const serviceConfig = authorizers({
				custom: {
					authorizers: {
						MyCustomAuthorizer: {}
					}
				}
			}, { accountId });

			assert.deepStrictEqual(serviceConfig, {
				custom: {
					authorizers: {
						MyCustomAuthorizer: {},
						...expectedAuthorizers
					}
				}
			});
		});

		it('Should not override other configurations', () => {

			const serviceConfig = authorizers({
				custom: {
					foo: 'bar'
				}
			}, { accountId });

			assert.deepStrictEqual(serviceConfig, {
				custom: {
					authorizers: { ...expectedAuthorizers },
					foo: 'bar'
				}
			});
		});
	});

});
