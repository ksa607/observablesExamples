const { of } = require('rxjs');

// Create an observable that emits three values, will only do on subscription
const myObservable$ = of(1, 2, 3);

//subscribe
myObservable$.subscribe(x => console.log(`The value in the stream is ${x}`));

//subscribe (every time you subscribe you get the same stream of data)
myObservable$.subscribe(x => console.log(`Got value ${x}`));

//more examples on http://reactivex.io/ or  https://www.learnrxjs.io/


