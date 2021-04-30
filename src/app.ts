import { Observable } from 'rxjs';

const sub = document.querySelector('#sub');
const unsub = document.querySelector('#unsub');
const output = document.querySelector('#output');

let counter = 0;

const observable = Observable.create((observer: any) => {
  setInterval(function () { observer.next() }, 2000)
});

let subscriber: any = null;

sub.addEventListener("click", () => {
  if (subscriber === null || subscriber.closed) {
    sub.classList.add('active');

    subscriber = observable.subscribe(() => {
      addItem();
      counter++;
    });
  }
});

unsub.addEventListener("click", () => {
  subscriber.unsubscribe();

  if (subscriber.closed) {
    sub.classList.remove('active');
  }
})

function addItem() {
  const li = document.createElement('li');
  const node = document.createTextNode(`Item №${counter}`);
  
  li.appendChild(node);
  output.appendChild(li);
}