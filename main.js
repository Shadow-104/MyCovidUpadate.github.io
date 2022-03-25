const URL = "https://api.rootnet.in/covid19-in/stats/latest";
// const URL = "https://covid.mathdro.id/api";

let app = angular.module("MyApp", []);
app.controller("MyCtrl", ($scope, $http) => {
  //this is contoller
  $scope.title = "Stay Home Stay Safe";

  //calling api
  $http.get(URL).then(
    (response) => {
      //success
      //console.log(response.data);
      $scope.allData = response.data.data.summary;
    },
    (error) => {
      //error
      console.log(error);
    }
  );

  //get state data
  $scope.get_state_data = () => {
    let state = $scope.state;
    if (state == "") {
      return;
    }

    $http.get(`${URL}/states/${state}`).then(
      (response) => {
        const arrayOfSatesData = response.data.data.regional;
        let stateInfo = "";
        for (let i = 0; i < arrayOfSatesData.length; i++) {
          const stateData = arrayOfSatesData[i];
          if (stateData.loc === `${state}`) {
            stateInfo = arrayOfSatesData[i];
          }
        }
        $scope.state_Data = stateInfo;
        // console.log($scope.state_Data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
});
