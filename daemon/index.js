const feathers = require('feathers')
const configuration = require('feathers-configuration')
const createService = require('feathers-mongoose')

const mongoose = require('../server/mongoose')

const timelinesModel = require('../server/models/timelines.model')
const sourcesModel = require('../server/models/sources.model')
const postsModel = require('../server/models/posts.model')

const checkSources = require('./checkSources')

const app = feathers()
  .configure(configuration())
  .configure(mongoose)

// skip all hooks, filters and authentication
// DO NOT LISTEN FOR REQUESTS
app.use('/timelines', createService({Model: timelinesModel(app)}))
app.use('/services', createService({Model: sourcesModel(app)}))
app.use('/posts', createService({Model: postsModel(app)}))

const timelines = app.service('/timelines')
const sources = app.service('/sources')
const posts = app.service('/posts')

async function run() {
  while (true) {
    await checkSources(sources, posts)
  }
}

run()
