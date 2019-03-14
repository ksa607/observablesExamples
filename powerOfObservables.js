const {BehaviorSubject, combineLatest} = require('rxjs');

let a = 1;
let b = 1;
let c = a + b;
console.log(`imperative programming  ${c}`);
a = 5;
console.log(`imperative programming  ${c}`);


const a$ = new BehaviorSubject(1);
a$.subscribe(x=>console.log("value on a " + x));
const b$ = new BehaviorSubject(1);
const c$ = combineLatest(a$, b$, (a$, b$) => a$ + b$);
c$.subscribe(x => console.log(`reactive programming: ${x}`));
a$.next(5);
