
Meteor.subscribe('items');

Meteor.startup(function () {
  Deps.autorun(function () {
    Session.set('currentItem', Items.findOne());
  })
});
  
  Template.page.events({
    'click .button': function () {
      var ci = Session.get('currentItem');
      // template data, if any, is available in 'this'
      Items.update(ci._id, {$inc: {value: 1}, $set: {lastBidUser: Meteor.user().emails[0].address}});
      Session.set('currentItem', Items.findOne(ci._id));
    }
  });

  Template.navbar.events({
    'click #items-dropdown .dropdown li a': function() {
      Session.set('currentItem', Items.findOne(this._id));
    }
  })

  Template.navbar.items = function() {
    return Items.find();
  }

  Template.navbar.helpers({
    currentItem: function() {
      return Session.get('currentItem');
    }
  });

  Template.page.helpers({
    currentItem: function() {
      return  Session.get('currentItem');
    }
  });

  Template.audio.isIE = function() {
    return !Modernizr.audio;
  }
  
