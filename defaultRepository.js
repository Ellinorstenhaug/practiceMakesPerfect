let defaultRepository = (function(DefaultService){
    function init() {
        serviceIsAlive = false;
      $.when(isAlive()).done(function(){
        if(serviceIsAlive){
            getAllProducts();
        }
        else{
            doneAllProducts(jsonProducts.products);
        }        
      })       
    };

    function getAllProducts(){                  
         DefaultService.getAllProducts(doneAllProducts, fail);
    }

    function initGetProduct(){

        $('.show-product').on('click',function(){
            var Id = $(this).val();
            if(serviceIsAlive){
                DefaultService.getProductById(doneProduct,fail,Id);
            }
            else{
                doneProduct(jsonProducts.products[Id]);
            }
        })
    }
   
    function doneAllProducts(response){
        let productWrapper = $('#product-wrapper');
        
        for (let i = 0; i < response.length; i++) {
            let title = response[i].Name;
            let Category = response[i].Category;
            let Price = response[i].Price;
            let image = response[i].ImageUrl;
            let Id = response[i].Id;

            let btnModal = `<button class="btn btn-default show-product" value="${Id}" text="text" data-toggle="modal" data-target="#product">Read more</button>`
            let product = `<div class='col-sm-4 product'> <h1>${title}</h1>  <span>Price: ${Price}$</span> <p class="Category">${Category}</p> <img style="height:auto; wIdth:200px;" src="${image}"> ${btnModal}</div>`;

            productWrapper.append(product);
        }

        initGetProduct();
    }

function isAlive(){
    return DefaultService.isAlive(isAliveDone,fail);
}

    function doneProduct(response){
        $('.product-title').html(response.Name);
        $('.product-body').html(response.Price);
    }

    function isAliveDone(response){
        serviceIsAlive = true;
    }

    function fail(response){ 
        serviceIsAlive = false;     
        console.log('Fel ', response.statusText);
    }

    return {
        init:init,
    }
})(defaultService);

jsonProducts =
{
    "products" :[
       { 
            "Id": 0,
            "Name": "Hammer",
             "Price": 10.10,
            "Category": "Hardware",
            "ImageUrl": "https://www.w3schools.com/w3css/img_lights.jpg"
        },
        {
            "Id": 1,
            "Name": "Yo-yo",
             "Price": 59.30,
            "Category": "Toys",
            "ImageUrl": "https://www.w3schools.com/w3css/img_lights.jpg"
        },
        {
            "Id": 2,
            "Name": "Tomato Soup",
             "Price": 90,
            "Category": "Groceries",
            "ImageUrl": "https://www.w3schools.com/w3css/img_lights.jpg"
        },
        {
            "Id": 3,
            "Name": "Dog",
             "Price": 950,
            "Category": "Pets",
            "ImageUrl": "https://www.w3schools.com/w3css/img_lights.jpg"
        }]
          
}
