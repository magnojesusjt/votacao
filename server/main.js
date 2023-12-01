import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import "./methods/getCPf";

import "../imports/api/votacaoTotal";

Meteor.startup(async () => {
  process.env.ROOT_URL = "http://10.91.16.136:3000/";
});
