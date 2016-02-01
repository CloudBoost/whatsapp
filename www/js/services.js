angular.module('whatsapp.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    phone: '0704877121',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    timestamp: moment().subtract(1, 'hours').toDate()
  }, {
    id: 1,
    name: 'Max Lynx',
    phone: '0704877122',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    timestamp: moment().subtract(2, 'hours').toDate()
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    phone: '0704877123',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    timestamp: moment().subtract(1, 'days').toDate()
  }, {
    id: 3,
    name: 'Perry Governor',
    phone: '0704877124',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    timestamp: moment().subtract(4, 'days').toDate()
  }, {
    id: 4,
    name: 'Mike Harrington',
    phone: '0704877125',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    timestamp: moment().subtract(2, 'weeks').toDate()
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(phone) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].phone === phone) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('Camera', function($q){
  return {
    getPicture: function(options){
      var q = $q.defer();
      console.log(navigator.camera);
      navigator.camera.getPicture(function(result){
        //DO any magic you need
        q.resolve(result);
      }, function(err){
        q.reject(err);
      }, options);
      return q.promise;
    }
  };
});
