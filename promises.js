const Promise = require('promise');

const longOperationPromise = new Promise(function(resolve, reject){
    setTimeout(function() {        
        resolve ("500 ms passed");
      }, 500);
});


  function doSomethingWithResult(result){
      console.log(result)
  }

  function doOtherStuffThatDoesntNeedResult(){
      console.log("other stuff is done");
  }

  longOperationPromise.then(result => doSomethingWithResult(result));
  longOperationPromise.catch(error => console.log("error"))
 // doSomethingWithResult(result);
  doOtherStuffThatDoesntNeedResult();
  