angular.module('app.dayController', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('DayCtrl', function ($scope, $ionicModal, $storageServices) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Day Ctrl List')
    }
    $scope.currentModal = null;
    $scope.currentModals = [];

    $scope.openSpecialModal = function (subtopic, branch) {
      if (typeof analytics !== 'undefined') {
        analytics.startTrackerWithId('UA-71907748-1');
        analytics.trackView('modal ' + subtopic + ' ' + branch)
      }
      $ionicModal.fromTemplateUrl('templates/modal/' + subtopic + '/' + branch + '.html', {
        id: subtopic + '-' + branch,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });
    };

    $scope.closeSpecialModal = function () {
      $scope.currentModal.hide();
    };

    $scope.getSkill = function (subtopic) {
      $scope.devList = [];
      var devLists = AllSkills[subtopic];

      angular.forEach(devLists, function (skill) {
        $storageServices.get(skill.text, function (value) {
          var rating = parseInt(value);
          $scope.devList.push({
            rating: rating,
            max: 5,
            text: skill.text
          });
        });
      });

      $ionicModal.fromTemplateUrl('templates/skills/skill.html', {
        id: subtopic,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });

      $scope.submitSkill = function () {
        angular.forEach($scope.devList, function (skill) {
          $storageServices.set(skill.text, skill.rating);
        });
      }
    };

    $scope.$on('modal.shown', function (event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function (event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals
    $scope.$on('$destroy', function () {
      angular.forEach($scope.currentModals, function (modal) {
        modal.remove();
      });
    });
  });
