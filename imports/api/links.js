import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const validUsers = new Mongo.Collection('validUsers')

if (Meteor.isServer) {
  Meteor.publish('valid', function () {
    return validUsers.find({})
  })
}
