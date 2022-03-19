import A11yDialog from 'a11y-dialog';

('use strict');

console.log('Does it work');

let selectAll = (e) => document.querySelectorAll(e);
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

/**
 * [add description]
 * @param   {[type]}  num1  [num1 description]
 * @param   {[type]}  num2  [num2 description]
 * @return  {[type]}        [return description]
 */

const container = selectAll('.dialog__container');
container.forEach((e) => {
	const dialog = new A11yDialog(e);
	dialog.on('show', function () {
		// eslint-disable-next-line indent
		console.log('modal is open');
	});
});

selectAll('[aria-disabled="true"]').forEach((e) => {
	e.addEventListener('change', (e) => {
		e.preventDefault();
		e.stopPropagation();
	});
});
