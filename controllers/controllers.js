const model = require('../models/models')

function getAll (req, res, next) {
  const result = model.getAll()
  res.json({ data: result })
}

function getOne (req, res, next) {
  const result = model.getOne(req.params.id)
  if (result.errors) return next({ status: 404, message: `Could not find the butt with an id of ${req.params.id}` })
  res.json({ data: result })
}

function create (req, res, next) {
  const result = model.create(req.body)
  if (result.errors) {
    return next({ status: 400, message: `Fields name, type, and roundness are required`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}

function update (req, res, next) {
  const result = model.update(req.params.id, req.body)
  
  if (result.errors) return next({ status: 404, message: `Could not find the butt with an id of ${req.params.id}` })

  if (!req.body.name || !req.body.type || !req.body.roundness) return next({ status: 400, message: `Fields name, type, and roundness are required` })

  res.status(200).json({ data: result })
}

function deleteOne (req, res, next) {
  const result = model.deleteOne(req.params.id)
  if (result.errors) return next({ status: 404, message: `Could not find the butt with an id of ${req.params.id}` })
  res.status(204).json()
}

module.exports = { getAll, getOne, create, update, deleteOne }