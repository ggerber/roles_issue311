import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

import Systems from '../../collections/server/Systems';

import {ajvMethods} from '../../../startup/server/security';
import {authenticateSubscription} from '../../utils/server/authenticate';

const insert = args => {
  try {
    const {name, memberId} = args;
    const newSystem = {name, createdBy: memberId, createdAt: new Date().getTime()};
    const systemId = Systems.insert(newSystem);
    Roles.addUsersToRoles(memberId, ['manage', 'edit', 'control', 'view'], systemId); // needs to be called after Systems.insert; otherwise publication wont update
  } catch (err) {
    console.error('insert err', err);
  }
};

// ========

export function systemsinsert(args) {
  const valid = ajvMethods.validate('Systems', {insert: args});
  const roles = ['manage'];
  if (authenticateSubscription(this.userId, valid, roles)) insert({memberId: this.userId, ...args});
  else throw new Meteor.Error('systems.insert'); // , ajvMethods.errorsText());
}
