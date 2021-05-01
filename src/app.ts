import { Observable, Subject } from 'rxjs';

const sub = document.querySelector('#sub');
const unsub = document.querySelector('#unsub');
const addBtn = document.querySelector('#add');
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

  counter++;
}

const subject = new Subject();

subject.subscribe(
  () => addItem(),
  (error) => console.error(error),
  () => {
    alert('Completed!');
  },
)

addBtn.addEventListener('click', () => {
  subject.next();
})