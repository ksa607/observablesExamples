const { Subject } = require('rxjs');

//create Subject
const hello$ = new Subject();
hello$.subscribe(x => console.log(`first subscription ${x}`));

hello$.next('Hi');

hello$.next('World');
hello$.next('Hi again');

//more on Subject later, executed once, multicast 