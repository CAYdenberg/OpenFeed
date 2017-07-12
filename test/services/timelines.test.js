const assert = require('assert');
const app = require('../../src/app');

describe('\'timelines\' service', () => {
  it('registered the service', () => {
    const service = app.service('timelines');

    assert.ok(service, 'Registered the service');
  });
});
