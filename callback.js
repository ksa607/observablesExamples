function longAsyncOperation(callback) {
    setTimeout(function() {
        return callback("500 ms passed");
      }, 500);
  }

  function doSomethingWithResult(result){
      console.log(result)
  }

  function doOtherStuffThatDoesntNeedResult(){
      console.log("other stuff is done");
  }

   
  let result = longAsyncOperation(doSomethingWithResult);
 // doSomethingWithResult(result);
  doOtherStuffThatDoesntNeedResult();