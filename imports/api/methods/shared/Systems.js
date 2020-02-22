/* eslint import/no-duplicates: 0 */

import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

export const systemsInsert = new ValidatedMethod({
  name: 'systems.insert',
  validate: null,
  run(args) {
    if (Meteor.isServer) {
      import {systemsinsert} from '../server/Systems'; // keep import within server block

      systemsinsert.call(this, args);
    }
  }
});
