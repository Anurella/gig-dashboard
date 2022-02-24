import A11yDialog from 'a11y-dialog';

('use strict');

console.log('Does it work');

// let selectAll = (e) => document.querySelectorAll(e);
let select = (e) => document.querySelector(e);

select('.menu-hamburger').addEventListener('click', (e) => {
  e.stopPropagation();
  e.preventDefault();
  select('.nav').classList.add('isOpen');
});

select('.nav').addEventListener('click', (e) => {
  e.stopPropagation();
  select('.nav').classList.remove('isOpen');
});

const container = select('#withdrawals');
const dialog = new A11yDialog(container);

dialog.on('show', function () {
  console.log('Hello modal is open');
});
