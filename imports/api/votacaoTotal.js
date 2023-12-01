import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const votacaoTotal = new Mongo.Collection('votacaoTotal')

if (Meteor.isServer) {
    Meteor.publish('votacao', function () {
        return votacaoTotal.find({})
    })
}