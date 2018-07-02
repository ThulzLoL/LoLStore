let productsData = []
let idUm = 1;
let subTotal = 0
let shipTotal = 0
let vTotal = 0

myApp.controller('secCtrl', function ($compile, $scope){

    $scope.first = 1;

    $scope.totalValue = function () {
        let valorProd = parseFloat(document.querySelector(".priceDiscProd").innerHTML.substr(1));
        let ship = parseFloat(document.querySelector(".randomShip").innerHTML.substr(1));
        total = $scope.first * valorProd + ship;
        total2 = "$" + Math.round(total * 100) / 100
        totalPrice = document.querySelector(".totalPrice");
        totalPrice.innerHTML = total2;
      };


      $scope.increaseValue = function () {
        if ($scope.first < 8) {
          $scope.first++;
        }
      };
    
    
      $scope.decreaseValue = function () {
        if ($scope.first > 1) {
          $scope.first--;
          let randomShip = document.querySelector(".randomShip")
          console.log(randomShip.innerHTML)
        }
      };


      $scope.percentage = function (first, second) {
        let decreaseValue = first - second;
        return Math.ceil((decreaseValue / first) * 100);
      };
    
    
      $scope.random = function () {
        return parseFloat(Math.random() * 9 + 1).toFixed(2);
      };


      $scope.prodPage = function ($event) {
        fullPrice = angular.element($event.target).attr('data-preco-produto');
        priceDiscount = angular.element($event.target).attr('data-precoDisc-produto');
        imageDispay = angular.element($event.target).attr('data-img-produto');
        nameDisplay = angular.element($event.target).attr('data-nome-produto');
        shipDisplay = $scope.random();
        let prodPage =
        `<div ng-controller="secCtrl" class="friz px-2 my-3 col-12">
        <div class="row px-4 py-4">
        <div ng-controller="secCtrl" class="col-5 mr-1 px-0">
        <img class="imageProd d-block w-100 displayImg" src="n" style="height: 300px;">
        </div>
        <div class="col-6 px-0">
        <h4 class="friz col-12 my-2 text-center nameProd"></h4>
        <hr/>
        <h6 class="friz col-12 my-2" style="font-style: italic;">Price: <span class="priceProd"></span> </h6>
        <h5 class="friz col-12 my-2">Discount Price: <span class="priceDiscProd"></span> <span class="discount"></span></h5>
        <h6 class="friz col-12 my-2" style="font-style: italic;">Shipping: <span class="randomShip"></span> </h6>
        <div class="col-12" ng-controller="secCtrl">
        <button type="button" ng-click="decreaseValue(); totalValue()">-</button><span ng-model="first" class="quantity">{{first}}</span><button ng-click="increaseValue(); totalValue()" type="button">+</button>
        </div>
        <h5 class="friz col-12 my-2">Total Price: <span class="totalPrice"></span></h5>
        <div class="row justify-content-end">
        <button type="button" data-preco-produto="${fullPrice}" data-precoDisc-produto="${priceDiscount}" data-img-produto="${imageDispay}"
        data-nome-produto="${nameDisplay}" data-ship-produto="${shipDisplay}" class="frizB btn btn-warning" ng-click="cart($event)">Add to Cart!</button>
        </div>
        </div>
        </div>
        </div>`;
        angular.element(pageTwoContent).html(prodPage);
        let priceDiscProd = document.querySelector(".priceDiscProd");
        let nameProd = document.querySelector(".nameProd");
        let imageProd = document.querySelector(".imageProd");
        console.log(imageProd);
        let priceProd = document.querySelector(".priceProd");
        let discount = document.querySelector(".discount");
        let randomShip = document.querySelector(".randomShip");
        let totalPrice = document.querySelector(".totalPrice");
        randomShip.innerHTML = "$" + shipDisplay;
        discount.innerHTML = "-" + $scope.percentage(Number.parseInt(fullPrice), Number.parseInt(priceDiscount)) + "%";
        priceDiscProd.innerHTML = '$' + priceDiscount;
        let totalPrice1 = parseFloat(priceDiscProd.innerHTML.substr(1)) + parseFloat(randomShip.innerHTML.substr(1))
        totalPrice.innerHTML = "$" + Math.round(totalPrice1 * 100) / 100;
        priceProd.innerHTML = '<strike>' + '$' + fullPrice + '</strike>';
        imageProd.src = angular.element($event.target).attr('data-img-produto');
        nameProd.innerHTML = angular.element($event.target).attr('data-nome-produto');
        $compile(pageTwoContent)($scope);
      };

      $scope.cart = function ($event) {
        quantity = document.querySelector(".quantity").innerHTML
        productsData.push({
          id: idUm,
          nome: angular.element($event.target).attr('data-nome-produto'),
          preco: angular.element($event.target).attr('data-preco-produto'),
          precoDesc: angular.element($event.target).attr('data-precoDisc-produto'),
          img: angular.element($event.target).attr('data-img-produto'),
          quantity: quantity,
          shipping: angular.element($event.target).attr('data-ship-produto')
        })
        idUm++
        subTotal += angular.element($event.target).attr('data-precoDisc-produto') * quantity;
        subTotal = Math.round(subTotal * 100) / 100
        shipTotal += parseFloat(angular.element($event.target).attr('data-ship-produto'));
        shipTotal = Math.round(shipTotal * 100) / 100
        vTotal = (parseFloat(subTotal) + parseFloat(shipTotal));
        vTotal = Math.round(vTotal * 100) / 100
      }
})