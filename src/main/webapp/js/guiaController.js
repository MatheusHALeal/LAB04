angular.module('guiaDeSeries').controller('guiaDeSeriesCtrl', function ($scope, $state, $mdDialog, $http, $timeout, $mdSidenav, $log, $localStorage) {
  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.serie  ="";
  $scope.catalogo = [];
  $scope.minhasSeries = [];
  $scope.exibicao = [];
  $scope.watchlist = [];
  $scope.inWatchlist = false;
  $scope.nadaEncontrado = false;
  $scope.episodio = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10"
  ];
  $scope.episodio = "";

  $scope.register = function(email, password, name){
    console.log("register");
    var url = "/register";
    var data = {
      name: name,
      email: email,
      password: password
    };

    $http.post(url, data).then(function (response) {
      $scope.postResultMessage = "Concluído";
      alert("Cadastro realizado com sucesso!");

    }, function (response) {
      $scope.postResultMessage = "Algo deu errado";

    });

  };

  $scope.login = function(cemail, cpassword){
    $scope.minhasSeries = [];
    $scope.exibicao = [];
    $scope.watchlist = [];
    var url = "/getin";
    var data = {
      email: cemail,
      password: cpassword

    };

    $http.post(url, data).then(function (response) {
      $scope.postResultMessage = "Olá";

      $scope.usuarioLogado = response.data.id;

      $scope.seriesDoUsuario();
      $scope.seriesDaWatchlist();
      $state.go('main.home');


    }, function (response) {
    });

  };


  $scope.logout = function(){
   $state.go('main.login');
 }

 $scope.seriesDoUsuario = function() {
  var url = '/getSeries/' + $scope.usuarioLogado;

  $http.get(url).then(function (response) {
    var seriesPerfil = response.data;
    for ( i = 0; i < seriesPerfil.length; i++)   {
      $http.get("https://omdbapi.com/?i="+ seriesPerfil[i].imdbID +"&apikey=93330d3c&type=series").then(function(response) {
        $scope.minhasSeries.push(response.data);
      })

    }

  })

}

$scope.seriesDaWatchlist = function() {
  var url = '/getSeriesWatchlist/' + $scope.usuarioLogado;

  $http.get(url).then(function (response) {
    var seriesWatchlist = response.data;
    for ( i = 0; i < seriesWatchlist.length; i++)   {
      $http.get("https://omdbapi.com/?i="+ seriesWatchlist[i].imdbID +"&apikey=93330d3c&type=series").then(function(response) {
        $scope.watchlist.push(response.data);
      })

    }

  })
}

$scope.pesquisarSeries = function(serie) {
  var pesquisa = serie.split(" ");
  var resultado = "https://omdbapi.com/?s=";
  for (i = 0; i < pesquisa.length; i++) {
    if (i == pesquisa.length -1) {
      resultado += pesquisa[i];
    } else {
      resultado += pesquisa[i] + "%20";
    }
  } resultado += "&apikey=93330d3c&type=series";

  $http.get(resultado).then(function(response){
    $scope.catalogo = response.data.Search;
    $scope.exibicao = $scope.catalogo;


    if (response.data.Response == "False") {
      $scope.nadaEncontrado = true;
    } else {
      $scope.nadaEncontrado = false;
    }
  })

}

$scope.adicionarMinhasSeries = function (serie) {
  if ($scope.serieExiste(serie, $scope.minhasSeries)) {
    alert("A série selecionada já está no seu perfil.")
  } else {
    if ($scope.serieExiste(serie, $scope.watchlist)) {
      $scope.inWatchlist = false;
      $scope.minhasSeries.push(serie);
      $scope.add(serie);
      $scope.removeDaWatchlist(serie);
    } else {
      $scope.minhasSeries.push(serie);
      $scope.add(serie);
      alert('"'+serie.Title+'" foi adicionada ao seu perfil')
    }

  }
}

$scope.add = function(serie) {
  $scope.inWatchlist = false;

  var data = {
    idUser: $scope.usuarioLogado,
    imdbID: serie.imdbID,
    title: serie.Title,
    inWatchlist: $scope.inWatchlist,
  };
  var url = "/save";
  $http.post(url, data).then(function (response) {
  }, function (response) {
  });
}

$scope.removeMinhaSerie = function (serie) {
  if (confirm('Tem certeza que deseja remover "'+serie.Title+'"?') === true) {
    var indice = $scope.minhasSeries.indexOf(serie);
    if (indice > -1) {
      $scope.minhasSeries.splice(indice, 1);
      $scope.removeSerie(serie);
      alert('"'+serie.Title+'" foi removida do seu perfil.')
    }
  }
};

$scope.removeSerie = function(serie){
  var url = "/remove/" + $scope.usuarioLogado;
  $http.post(url, serie.imdbID).then(function(response){

  }, function(response){
  });
};



$scope.adicionarWatchlist = function (serie) {
  if($scope.serieExiste(serie, $scope.watchlist)) {
    alert('"'+serie.Title+'" já está na sua Watchlist');
  } else if ($scope.serieExiste(serie, $scope.minhasSeries)) {
    alert('"'+serie.Title+'" já está no seu perfil.')
  } else {
    $scope.watchlist.push(serie);
    $scope.addWatchlist(serie);
    alert('"'+serie.Title+'" foi adicionada à sua Watchlist')

  }
}

$scope.addWatchlist = function(serie) {
  $scope.inWatchlist = true;
  var data = {
    idUser: $scope.usuarioLogado,
    imdbID: serie.imdbID,
    title: serie.Title,
    inWatchlist: $scope.inWatchlist,
  };
  var url = "/saveWatchlist";
  $http.post(url, data).then(function (response) {
  }, function (response) {
  });
}

$scope.removeDaWatchlist = function (serie) {
  var indice = $scope.watchlist.indexOf(serie);

  if (indice > -1) {
    $scope.removeSerieWatchlist(serie);
    $scope.watchlist.splice(indice, 1);

  }

  $scope.inWatchlist = false;
}

$scope.removeSerieWatchlist = function(serie){
  var url = "/removeWatchlist/" + $scope.usuarioLogado;
  $http.post(url, serie.imdbID).then(function(response){
  }, function(response){
  });
};

$scope.serieExiste = function (serie, list) {
  return (list.indexOf(serie) != -1);
}

$scope.verInfo = function (ev, serie) {
  $http.get("https://omdbapi.com/?i="+ serie.imdbID +"&apikey=93330d3c&type=series").then(function (response) {
    $scope.serieDialog = response.data;

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'info.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {
        serieDialog: $scope.serieDialog
      }
    });
  });


}

function DialogController($scope, $mdDialog, serieDialog) {
  $scope.serie = serieDialog;

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

function debounce(func, wait, context) {
  var timer;

  return function debounced() {
    var context = $scope,
    args = Array.prototype.slice.call(arguments);
    $timeout.cancel(timer);
    timer = $timeout(function() {
      timer = undefined;
      func.apply(context, args);
    }, wait || 10);
  };
}

function buildDelayedToggler(navID) {
  return debounce(function() {
    $mdSidenav(navID)
    .toggle()
    .then(function () {
      $log.debug("toggle " + navID + " is done");
    });
  }, 200);
}

function buildToggler(navID) {
  return function() {
    $mdSidenav(navID)
    .toggle()
    .then(function () {
      $log.debug("toggle " + navID + " is done");
    });
  };
}

})

.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('left').close()
    .then(function () {
      $log.debug("close LEFT is done");
    });

  };
})
