// Initializes the `timelines` service on path `/timelines`
const createService = require('feathers-mongoose');
const createModel = require('../../models/timelines.model');
const hooks = require('./timelines.hooks');
const filters = require('./timelines.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'timelines',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/timelines', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('timelines');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
