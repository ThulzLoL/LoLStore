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




let categorias = {
    Acessories: [
        {
            nome:"Debossed Silicon Rare Glow Bracelet Wrist",
            store:"WSFashion Store",
            preco: "3.16",
            precoDesc: "2.95",
            img: "imgs/wristband1.jpg",
            id: 1
        },
        {
            nome:"Cool Stainless Steel Men Ring",
            store:"Ching-Jry Store",
            preco: "2.50",
            precoDesc: "2.25",
            img: "imgs/ring1.jpg",
            id: 2
        },
        {
            nome:"5PCS Mens Team Game Rings Stainless Steel",
            store:"Amy1986 Store",
            preco: "12.50",
            precoDesc: "10.75",
            img: "imgs/ring2.jpg",
            id: 3
        },
        {
            nome:"Xayah and Rakan Couples Necklace",
            store:"Yamily Store",
            preco: "4.00",
            precoDesc: "3.25",
            img: "imgs/necklace1.jpg",
            id: 4
        },
    ],
    
    Shirts: [
        {
            nome:"Eat Sleep League Shirt",
            store:"Yamily Store",
            preco: "25.00",
            precoDesc: "22.25",
            img: "imgs/shirt1.jpg",
            id: 5
        },
        {
            nome:"Support Only Shirt",
            store:"Amy1986 Store",
            preco: "25.00",
            precoDesc: "22.25",
            img: "imgs/shirt2.jpg",
            id: 6
        },
        {
            nome:"Kindred Never One Shirt",
            store:"Ching-Jry Store",
            preco: "25.00",
            precoDesc: "22.25",
            img: "imgs/shirt3.jpg",
            id: 7
        },
        {
            nome:"Kindred Without the Other Shirt",
            store:"WSFashion Store",
            preco: "25.00",
            precoDesc: "22.25",
            img: "imgs/shirt4.jpg",
            id: 8
        },
    ],

    Arts: [
        {
            nome:"Jhin the Virtuoso Poster Art",
            preco: "20.00",
            store:"Amy1986 Store",
            precoDesc: "12.25",
            img: "imgs/art1.jpg",
            id: 9
        },
        {
            nome:"Canvas Living Room Wall Art Frames",
            store:"Yamily Store",
            preco: "98.00",
            precoDesc: "84.25",
            img: "imgs/art2.jpg",
            id: 10
        },
        {
            nome:"Living Room Udyr Wall Art Frames",
            store:"WSFashion Store",
            preco: "91.00",
            precoDesc: "75.75",
            img: "imgs/art3.jpg",
            id: 11
        },
        {
            nome:"Kindred Silk Poster Art",
            store:"Ching-Jry Store",
            preco: "10.00",
            precoDesc: "8.55",
            img: "imgs/art4.jpg",
            id: 12
        },
    ],

    Device: [
        {
            nome:"LoL Player Notebook Skin",
            store:"Ching-Jry Store",
            preco: "10.12",
            precoDesc: "9.25",
            img: "imgs/device1.jpg",
            id: 13
        },
        {
            nome:"Jhin Mask Case/Skin Samsung Galaxy",
            store:"WSFashion Store",
            preco: "5.00",
            precoDesc: "4.45",
            img: "imgs/device2.jpg",
            id: 14
        },
        {
            nome:"Gamers Dont Die Notebook Sleeve",
            store:"Yamily Store",
            preco: "10.00",
            precoDesc: "7.55",
            img: "imgs/device3.jpg",
            id: 15
        },
        {
            nome:"Welcome to Summoners Rift Ipad Case/Skin",
            store:"Amy1986 Store",
            preco: "10.00",
            precoDesc: "7.55",
            img: "imgs/device4.jpg",
            id: 16
        },
    ],
}
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