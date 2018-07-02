let myApp = angular.module('myApp', []);


myApp.controller('mainCtrl', function ($compile, $scope) {


  $scope.updateCartValue = function ($event) {

  }


  $scope.increaseValueCart = function ($event) {
    let quantCart = $event.target.previousSibling
    let precoProd = angular.element($event.target).attr('data-preco');
    prevSubTotal = document.querySelector(".subTotal")
    shipTotal = document.querySelector(".shipTotal");
    vTotal = document.querySelector(".vTotal");
    quantCart = quantCart.innerHTML;
    quantCart++;
    $event.target.previousSibling.innerHTML = `${quantCart}`
    let totalAdd = parseFloat(prevSubTotal.innerHTML) + parseFloat(precoProd);
    prevSubTotal.innerHTML = Math.round(totalAdd * 100) / 100;
    let vTotalPre = parseFloat(totalAdd) + parseFloat(shipTotal.innerHTML);
    vTotal.innerHTML = Math.round(vTotalPre * 100) / 100;
    
  };

  $scope.decreaseValueCart = function ($event) {
    let quantCart = angular.element($event.target).next();
    let precoProd = angular.element($event.target).attr('data-preco');
    let shipInd = angular.element($event.target).attr('data-shipping');
    prevSubTotal = document.querySelector(".subTotal");
    shipTotal = document.querySelector(".shipTotal");
    vTotal = document.querySelector(".vTotal");
    quantCart = quantCart[0].innerHTML;
    quantCart--;
    angular.element($event.target).next().text(`${quantCart}`)
    if(quantCart === 0){
      angular.element($event.target).parent().parent().parent().parent().remove();
      shipTotal2 = parseFloat(shipTotal.innerHTML) - parseFloat(shipInd);
      shipTotal.innerHTML = Math.round(shipTotal2 * 100) / 100;
    }
    let totalSub = parseFloat(prevSubTotal.innerHTML) - parseFloat(precoProd);
    prevSubTotal.innerHTML = Math.round(totalSub * 100) / 100;
    let vTotalPre = parseFloat(totalSub) + parseFloat(shipTotal.innerHTML);
    vTotal.innerHTML = Math.round(vTotalPre * 100) / 100;
    
  };

  $scope.cartPage2 = function(produto){
    let item =  `<tbody>
    <tr>
      <th scope="row">${produto.id}</th>
      <td>
          <img class="d-block displayImg " src="${produto.img}" alt="" style="height: 100px;">
      </td>
      <td>
          <h6 class="">${produto.nome}</h6>
      </td>
      <td>
      <h6 ng-controller="mainCtrl" class=""><button type="button" data-preco="${produto.precoDesc}" data-shipping="${produto.shipping}" ng-click="decreaseValueCart($event)">-</button><span class="quantCart">${produto.quantity}</span><button data-preco="${produto.precoDesc}" ng-click="increaseValueCart($event)" type="button">+</button></h6>
      </td>
      <td>
      <h6 class=""><strike>$ ${produto.preco}</strike></h6>
      <h5 class="">$ ${produto.precoDesc}</h6>
      </td>
      <td>
      <h6 class="">$ ${produto.shipping}</h6>
      </td>
    </tr>
   </tbody>`
   let tableCart = document.querySelector(".tableCart");
   angular.element(tableCart).append(item)
  };


  $scope.cartPage = function (){
    let cart = `<div class=" friz outside col-12 my-3">
    <table class="tableCart table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Name and Details</th>
            <th scope="col">Quant</th>
            <th scope="col">Price</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
      </table>
      <div class="row justify-content-end">
        <h6 class="col-3">Subtotal: $<span class="subTotal">${subTotal}</span></h6>
        <h6 class="col-2">Shipping: $<span class="shipTotal">${shipTotal}<span></h6>

      </div>
      <div class="row justify-content-end">
        <h6 class="col-2">Total: $<span class="vTotal">${vTotal}</span></h6>
      </div>
  </div>`
 angular.element(pageOne).html(cart);
 for(let produto of productsData){
  $scope.cartPage2(produto);
}
$compile(pageOne)($scope);
 }

  $scope.catPage2 = function (produto) {
    let catProd = `
    <div class="px-2 my-3 col-12">
    <div ng-controller="secCtrl" class="row px-4 py-4">
    <div class="col-4 mr-1 px-0">
    <img id="imageProd" ng-click="prodPage($event)" class="pointer imageProd d-block w-100 displayImg" src="${produto.img}" data-id-produto="${produto.id}" data-preco-produto="${produto.preco}"
    data-nome-produto="${produto.nome}" data-precoDisc-produto="${produto.precoDesc}" data-img-produto="${produto.img}" alt="Third slide" style="height: 250px;">
    </div>
    <div class="col-7 px-0">
    <h4 class="pointer friz col-12">${produto.nome}</h4>
    <h6 class="friz col-12" style="font-style: italic;">${produto.store}</h6>
    <h2 class="friz col-12 my-2">$ ${produto.precoDesc}</h2>
    </div>
    </div>
    </div>`;
    angular.element(pageTwoContent).append(catProd);
    $compile(pageTwoContent)($scope);
  };


  $scope.catPage = function (categoria) {
    counter = 0;
    let produtos = categorias[categoria];
    let crumbs = `<nav ng-controller="mainCtrl" aria-label="breadcrumb">
    <ol class="breadcrumb">
    <li class="pointer text-warning breadcrumb-item" ng-click="mainPage()">Home</li>
    <li class="pointer breadcrumb-item" ng-click="colPage()">Categories</li>
    <li class="pointer breadcrumb-item" aria-current="page" ng-click="catPage('${categoria}')">${categoria}</li>
    </ol>
    </nav>
    <div id="pageTwoContent" class=" .outside container my-3 px-0 mb-4">
    <h3 class="friz col-12 my-3 text-center">${categoria}</h3>
    </div>`;
    let target = document.querySelector("#pageOne");
    angular.element(target).html(crumbs);
    $compile(target)($scope);
    let pageTwoContent = document.querySelector("#pageTwoContent");
    for (let produto of produtos) {
      $scope.catPage2(produto);
      counter++;
      if (counter < 4) {
        pageTwoContent.innerHTML += "<hr/>";
      }
    }
  };


  $scope.colPage = function () {
    let crumbsColPage = `<nav ng-controller="mainCtrl" aria-label="breadcrumb">
    <ol class="breadcrumb">
    <li class="pointer text-warning breadcrumb-item" ng-click="mainPage()">Home</li>
    <li class="pointer breadcrumb-item">Categories</li>
    </ol>
    </nav>
    <div id="pageTwoContent" class=" .outside container my-3 px-0 mb-4">
    </div>`
    let target = document.querySelector("#pageOne");
    angular.element(target).html(crumbsColPage);
    $compile(target)($scope);
    let colPage =
      `<div ng-controller="mainCtrl" class=" .outside row my-3 mx-3 px-0 mb-4">
    <h3 class="friz col-12 text-warning my-3 text-center">Collections</h3>
    <div class="px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Arts')">
    <img class="d-block w-100 displayImg" src="imgs/art3.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h2>WallArt</h2>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    <div class="px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Device')">
    <img class="d-block w-100 displayImg" src="imgs/device1.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h3>Device Case</h3>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    <div class=" px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Shirts')">
    <img class="d-block w-100 displayImg" src="imgs/shirt1.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h2>Shirts</h2>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    <div class="px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Acessories')">
    <img class="d-block w-100 displayImg" src="imgs/wristband1.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h2>Acessories</h2>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    </div>`
    angular.element(pageTwoContent).append(colPage)
    $compile(pageTwoContent)($scope);
  };


  $scope.mainPage = function () {
    let mainPage =
      `<div class="row col-12 px-0 mx-0">
    <div id="carouselExampleIndicators" class="carousel slide col-12 px-0" data-ride="carousel">
    <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
    <div class="banner carousel-item active">
    <div class="gradientback">
    </div>
    <div class=" friz text-warning carousel-caption d-none d-block">
    <h2>Welcome to LoLStore!</h1>
    <p>Here you can buy anything related to League of Legends!</p>
    </div>
    <img class="banner d-block w-100 img-responsive" src="imgs/teste.jpg" alt="First slide">
    <div class="gradientback">
    </div>
    </div>
    <div class="banner carousel-item">
    <div class="gradientback">
    </div>
    <img class="banner d-block w-100 img-responsive" src="imgs/teste2.jpg" alt="Second slide">
    <div class="friz text-warning carousel-caption d-none d-block">
    <h2>Get the best arts on the market!</h5>
    <p>Or the best acessories for you buddies</p>
    </div>
    </div>
    <div class="banner carousel-item">
    <img class="banner d-block w-100" src="imgs/banner3.jpg" alt="Third slide">
    <div id="friz" class="friz text-warning carousel-caption d-none d-block">
    <h2>All on the same place</h5>
    <p>And for the best prices!</p>
    </div>
    <div class="gradientback"></div>
    </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
    </a>
    </div>
    </div>
    <div ng-controller="mainCtrl" class=" .outside row my-3 mx-3 px-0 mb-4">
    <h3 class="friz col-12 text-warning my-3 text-center">Collections</h3>
    <div class="px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Arts')">
    <img class="d-block w-100 displayImg" src="imgs/art3.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h2>WallArt</h2>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    <div class="px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Device')">
    <img class="d-block w-100 displayImg" src="imgs/device1.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h3>Device Case</h3>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    <div class=" px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Shirts')">
    <img class="d-block w-100 displayImg" src="imgs/shirt1.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h2>Shirts</h2>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    <div class="px-2 my-2 col-12 col-sm-6 col-lg-3">
    <div class="pointer col-12 px-0" ng-click="catPage('Acessories')">
    <img class="d-block w-100 displayImg" src="imgs/wristband1.jpg" alt="Third slide" style="height: 250px;">
    <div class="pb-0 friz text-warning carousel-caption d-none d-block">
    <h2>Acessories</h2>
    </div>
    <div class=" w-100 gradientback2"></div>
    </div>
    </div>
    </div>`;
    angular.element(pageOne).html(mainPage)
    $compile(pageOne)($scope);
  };


  $scope.search = function () {
    let input1 = document.querySelector("#input1");
    let input = input1.value
    let regex = new RegExp(`${input}.*`, 'i');
    let crumbsSearch = `<nav ng-controller="mainCtrl" aria-label="breadcrumb">
    <ol class="breadcrumb">
    <li class="pointer text-warning breadcrumb-item" ng-click="mainPage()">Home</li>
    <li class="pointer breadcrumb-item" ng-click="colPage()">Categories</li>
    <li class="breadcrumb-item" aria-current="page" >${input}</li>
    </ol>
    </nav>
    <div id="pageTwoContent" class=" .outside container my-3 px-0 mb-4">
    <h3 class="friz col-12 my-3 text-center">${input}</h3>
    </div>`;
    let target = document.querySelector("#pageOne");
    angular.element(target).html(crumbsSearch);
    $compile(target)($scope);
    let pageTwoContent = document.querySelector("#pageTwoContent");
    for (let categoria of Object.values(categorias)) {
      for (let produto of categoria) {
        if (regex.test(produto.nome)) {
          console.log("cheguei aqui")
          $scope.catPage2(produto)
          pageTwoContent.innerHTML += "<hr/>";
        }
      }
    }
    $compile(target)($scope);
  };


})



