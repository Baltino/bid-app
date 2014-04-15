
Meteor.subscribe('items');

Meteor.startup(function () {
  Deps.autorun(function () {
    Session.set('currentItem', Items.findOne());
  })
});
  
  Template.page.events({
    'click .button': function () {
//      var ci = Session.get('currentItem');
      // template data, if any, is available in 'this'
      Items.update(this._id, {$inc: {value: 1}, $set: {lastBidUser: Meteor.user().emails[0].address}});
  
      Session.set('currentItem', this._id);
      
    }
  });

  Template.navbar.events({
    'click #items-dropdown .dropdown li a': function() {
      Session.set('currentItem', this._id);
    }
  })

  Template.navbar.items = function() {
    return Items.find();
  }

  Template.navbar.helpers({
    currentItem: function() {
      return Items.findOne(Session.get('currentItem'));
    }
  });

  Template.page.helpers({
    currentItem: function() {
      return Items.findOne(Session.get('currentItem'));
    }
  });

  Template.audio.isIE = function() {
    return !Modernizr.audio;
  }

  Template.audio.play = function() {
    var ci = Items.findOne(Session.get('currentItem')), /* reactive */
      audioTag = (document) ? document.getElementById('kick') : null;
    if(!audioTag) {
      return null; /* dom not ready, go out*/
    }
    //debugger;
    if(Meteor.user().emails[0].address !== ci.lastBidUser || ci.lastBidUser === 'initial') {/* only play if it is a change from another user */
      audioTag.play();  
      console.log('someone has put more money!');
    }
  }
  
