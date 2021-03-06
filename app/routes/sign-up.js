import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  model () {
    return RSVP.Promise.resolve({})
  },

  actions: {
    signUp (credentials) {
      this.get('auth').signUp(credentials)
        .then(() => this.get('auth').signIn(credentials))
        .then(() => this.transitionTo('application'))
        .then(() => {
          this.get('flashMessages')
            .success('Successfully signed-up! You have also been signed-in.');
        })
        .catch(() => {
          this.get('flashMessages')
            .danger('There was a problem. Please try again.');
        });
    },
  },
});
