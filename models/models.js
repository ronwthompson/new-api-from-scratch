const uuid = require('uuid/v4')
const butts = []

function getAll(){
    return butts
}

function getOne(id){
    const errors = []
    let response
    const butt = butts.find(butt => butt.id === id)
    if (!butt) errors.push('butt not found')
    if (errors.length!=0) {
        response = { errors } 
    } else {
        response = butt
    }
    return response
}

function create (body) {
    const errors = []
    const name = body.name
    const type = body.type
    const roundness = body.roundness
    let response
    if (!name || !type || !roundness) {
        errors.push('all fields are required')
        response = { errors }
    } else {
    const butt = { id: uuid(), name, type, roundness }
        butts.push(butt)
        response = butt
    }
    return response
}

function update (id, body){
    const errors = []
    let response
    const butt = butts.find(butt => butt.id === id)
    if (!butt) {
        errors.push('butt not found')
    } else {
        butt.name = body.name
        butt.type = body.type
        butt.roundness = body.roundness
    }
    (errors.length!=0) ? response = { errors } : response = butt
    return response
}

function deleteOne(id){
    const errors = []
    let response
    const butt = butts.find(butt => butt.id === id)
    if (!butt) {
        errors.push('butt not found')
    }
    (errors.length!=0) ? response = { errors } : response = butt
    const index = butts.indexOf(butt)
    butts.splice(index, 1)
    return response
}

module.exports = { getAll, getOne, create, update, deleteOne }