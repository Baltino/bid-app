Items = new Meteor.Collection('items');
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Items.remove({});
    Items.insert({
      id: 'i1',
      src: 'notebook',
      name: 'notebook 1',
      info: 'very good notebook',
      initValue: 45,
      lastBidUser: 'initial',
      value: 45
    });
    Items.insert({
      id: 'i2',
      src: 'sundae',
      name: 'icecream 1',
      info: 'Tasty icecream',
      initValue: 5,
      lastBidUser: 'initial',
      value: 5
    });
  });


}

if(Meteor.isClient) {
  $(document).ready(function(){
    var query = Items.find({}),
      audioTag = document.getElementById('kick'),
      handle = query.observe({
        changed: function(item) {
          
          audioTag.play();
        }
      });

    $(this).foundation();
      
  });

}







