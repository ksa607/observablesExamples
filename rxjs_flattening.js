// make sure you did an 'npm install' in this folder
// and then see this in action using
//    $ node rxjs_flattening.js
//
const { Observable, of, from, interval } = require('rxjs');
const {
  pipe,
  map,
  mergeAll,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
  delay,
  take,
  timeInterval,
  tap
} = require('rxjs/operators');

const names = ['Destiny', 'Melody', 'Candy'];

// 1
// basic observables to which you subscribe, logging the values
console.log('==== 1 ====');
const greetPeople$ = of(...names);

greetPeople$
  .pipe(map(name => `hi ${name}, nice to meet you!`))
  .subscribe(result => console.log(`${result}`));

// 2
// functino returning an observable, still nothing new or special
console.log('==== 2 ====');
const http = {
  talkToMe$(name) {
    return of(
      `Hi ${name}, nice to meet you!`,
      `Is ${name} your real name or your stripper name?`
    );
  }
};

http.talkToMe$('Shaniah').subscribe(console.log);

// 3
// previous two combined, loggin the value now gives [Object object]
console.log('==== 3 ====');
greetPeople$
  .pipe(map(name => http.talkToMe$(name)))
  .subscribe(result => console.log(`${result}`));

// 4
// explicitly subscribing solves this (but creates difficulties in itself, not covered here)
console.log('==== 4 ====');
greetPeople$
  .pipe(map(name => http.talkToMe$(name)))
  .subscribe(resultObservable =>
    resultObservable.subscribe(result => console.log(`${result}`))
  );

// 5
// better to use the built in flattening operators, e.g. merge
console.log('==== 5 ====');
greetPeople$
  .pipe(
    map(name => http.talkToMe$(name)),
    mergeAll()
  )
  .subscribe(result => console.log(`${result}`));

// 6
// or combined into one mergeMap
console.log('==== 6 ====');
greetPeople$
  .pipe(mergeMap(name => http.talkToMe$(name)))
  .subscribe(result => console.log(`${result}`));

// 7
// when observables have delays, switch / merge / ... behave differently
// illustrated here using interval()
console.log('==== 7 ====');

const greetings = [
  name => `Hi ${name}, nice to meet you!`,
  name => `Is ${name} your real name or your stripper name?`
];

const greetingObservable = name => {
  return interval(100).pipe(
    take(greetings.length),
    map(i => greetings[i](name))
  );
};

// (uncomment one of the four -map flattening functions)
interval(200)
  .pipe(
    take(names.length),
    // mergeMap(i => greetingObservable(names[i]))
    // switchMap(i => greetingObservable(names[i]))
    concatMap(i => greetingObservable(names[i]))
    // exhaustMap(i => greetingObservable(names[i]))
  )
  .subscribe(console.log);

//=============================
// the following code does the same but with custom delays between different stream values
// (unlike interval which has a constant delay)
//
//  if you want to play around with the flattening operators
//=============================

// const slow = {
//   down$(items, delays) {
//     let inc = -1;
//     return from(items).pipe(
//       concatMap(item => {
//         inc = inc + 1;
//         return of(item).pipe(delay(delays[inc % delays.length]));
//       })
//     );
//   }
// };

// const delayedHttp = {
//   talkToMe$(name, delays) {
//     let inc = -1;
//     return of(
//       `Hi ${name}, nice to meet you!`,
//       `Is ${name} your real name or your stripper name?`
//     ).pipe(
//       concatMap(item => {
//         inc = inc + 1;
//         return of(item).pipe(delay(delays[inc % delays.length]));
//       })
//     );
//   }
// };

// const talkDelays = [50, 150];
// slow
//   .down$(names, [100, 60, 250])
//   .pipe(
//     // switchMap(name => delayedHttp.talkToMe$(`switchMap ${name}`, talkDelays)),
//     // mergeMap(name => delayedHttp.talkToMe$(`mergeMap ${name}`, talkDelays)),
//     // concatMap(name => delayedHttp.talkToMe$(`concatMap ${name}`, talkDelays)),
//     exhaustMap(name => delayedHttp.talkToMe$(`exhaustMap ${name}`, talkDelays)),
//     timeInterval()
//   )
//   .subscribe(result => console.log(`${result.interval}: ${result.value}`));
