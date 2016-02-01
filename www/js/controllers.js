angular.module('whatsapp.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.getUserChat = function(phone){
    // var chats = new
  }


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.data = {};

  $scope.chat = Chats.get($stateParams.chatId);

  $scope.getMessages = function(phone){
    var query = new CB.CloudQuery("Chat");
    query.equalTo('to',phone);
    query.find({
      success: function(list){
        console.log(list);
        $scope.messages = list;
      },
      error: function(err){
        console.log(err);
      }
    });
  }

  $scope.getMessages($stateParams.chatId);

   CB.CloudObject.on("Chat", "created", function(obj){
     $scope.getMessages($stateParams.chatId);
   });
  $scope.sendMessage = function(){
    var message = new CB.CloudObject("Chat");
    message.set('from', '0787075772');
    message.set('to',$stateParams.chatId);
    message.set('message', $scope.data.message);
    //sending message
    message.save({
      success: function(response){
        console.log(response);
        $scope.data.message = '';
      },
      error: function(err){
        console.log(err);
      }
    });
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('SettingsCtrl', function($scope, $state){
     $scope.logout = function(){
        $state.go('login');
     }
})
.controller('ProfileCtrl', function($scope, $state, $ionicPopup, $log, Camera){
  $scope.user = {};
     $scope.updateName = function(){
        var confirmPopup = $ionicPopup.confirm({
             title: 'Number confirmation',
             template: '<div>' + $scope.user.phone + '</div><div>Is your phone number above correct?</div>',
                cssClass: 'text-center',
                okText: 'Yes',
                okType: 'button-positive button-clear',
                cancelText: 'edit',
                cancelType: 'button-dark button-clear'
          });

          confirmPopup.then(function(res){
               if (!res) return;

               var profile = new CB.CloudObject('Profile');
               profile.set('username',$scope.user.name);
               profile.set('phone',$scope.user.phone);
               profile.save({
               success: function(user){
               console.log(user);
               localStorage.setItem('whatsappUser',JSON.stringify({username:$scope.user.name, phone:$scope.user.phone}));
               },
                  error: function(err){
                    console.log(err);
                  }
                });

          });



        $state.go('tab.chats');
     }
     $scope.updatePicture = function(){
        Camera.getPicture().then(function(imageURI){
          console.log(imageURI);
        }, function(err){
          console.log(err);
        });
     }
})
.controller('ConfirmationCtrl', function($scope, $state, $ionicPopup, $log){
    $scope.phone = $state.params.phone;
    $scope.confirm = confirm;

    $scope.confirm = function() {
    if ($scope.confirmation.code === '4444'){
      $state.go('profile');
    }else{
      return;
    }


  }

  function handleError(err) {
    $log.error('Verification error ', err);

    $ionicPopup.alert({
      title: err.reason || 'Verfication failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
});
