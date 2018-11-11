let defaultService = (function(){
     var serviceUrl = 'http://192.168.10.109/api/default/';


     function isAlive(done,fail){
        requestData(done,fail,serviceUrl + 'isAlive');
     }

    function getProducts(done, fail){
       requestData(done, fail, serviceUrl+'get');
    }
    function getProductById(done,fail, id){
        let url = serviceUrl + "get/?id=" + id; 
        requestData(done, fail, url);
    }

    function requestData(done, fail, url){
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: done,
            error: fail,
            crossDomain: true,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },           
        });
    }    
    return {
        getProducts: getProducts,
        getProductById: getProductById,
        isAlive:isAlive,
    }
})();
