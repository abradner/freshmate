import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    acceptBarcode: function() {
      return true;
    }
  }
});
