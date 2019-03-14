const {Observable} = require('rxjs');
const { map } = require('rxjs/operators');

//create observable object : encapsulates a producer function
const hello$ = Observable.create(function(observer) {
//emit Hello, World, wait 1s and emit Hi again then complete
          observer.next('Hello');
          observer.next('World');
          setTimeout(() => {
            observer.next('Hi again');
            observer.complete();
          }, 1000);
        }).pipe (map(x=> `${x} ${x}`));

//subscribe (every subscription triggers the producer function)
hello$.subscribe(x=>console.log(x) );
console.log("Just after the subscribe");

hello$.subscribe({
  next(x) {
    console.log(`got value ${x}`);
  },
  error(err) {
    console.error(`something went wrong:${err}`);
  },
  complete() {
    console.log(`done`);
  }
});

        
