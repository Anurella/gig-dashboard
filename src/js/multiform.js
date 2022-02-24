function MultiForm(form) {
  if (!(form instanceof Element)) {
    throw new Error('No form passed in');
  }
  let currentField = 0,
    isFilled,
    filledOut;

  const completeForm = form.querySelector('form');
  const fieldSets = Array.from(form.querySelectorAll('fieldset'));
  const fieldCount = fieldSets.length;
  const allInputs = Array.from(form.querySelectorAll('[data-input]'));
  const progress = form.querySelectorAll('.progress__item');
  const prevButton = document.querySelector('.prev__arrow');

  function init() {
    console.log('Initializing Form');
    showNext(currentField);
    addEvents();
  }
  function showNext(n) {
    if (n == 0) {
      prevButton.classList.remove('visible');
    } else {
      prevButton.classList.add('visible');
    }
    fieldSets[n].classList.add('current');
    updateProgress(n);
  }
  function addEvents() {
    for (let i = 0; i < fieldCount - 1; i++) {
      fieldSets[i]
        .querySelector('button')
        .addEventListener('click', validateForm);
    }
    allInputs.forEach((input) =>
      input.addEventListener('keyup', function (e) {
        clearErrors(e);
        clearTimeout(filledOut);
        filledOut = setTimeout(() => {
          checkFilled();
        }, 250);
      })
    );
    allInputs.forEach((input) =>
      input.addEventListener('change', function (e) {
        clearErrors(e);
        clearTimeout(filledOut);
        filledOut = setTimeout(() => {
          checkFilled();
        }, 250);
      })
    );
    prevButton.addEventListener('click', prevQuestion);
    completeForm.addEventListener('submit', formSubmit);
  }
  function validateForm() {
    console.log('Validating');
    let valid = true;
    let inputs = fieldSets[currentField].querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      if (checkFields()) {
        inputs[i].classList.remove('invalid');
        break;
      } else {
        if (inputs[i].classList.contains('invalid')) {
          console.log('Hello');
        } else {
          inputs[i].classList.add('invalid');
        }
        inputs[i].closest('fieldset').classList.add('has-error');
        valid = false;
      }
    }
    stage(valid);
  }
  function stage(n) {
    if (n) {
      fieldSets[currentField].classList.remove('current');
      progress[currentField].classList.add('finished');
      ++currentField;
    } else {
      console.log('Hello I have not moved');
    }
    showNext(currentField);
  }
  function updateProgress(n) {
    for (let i = 0; i < progress.length; i++) {
      progress[i].className = progress[i].className.replace(' active', ' ');
    }
    progress[n].className += ' active';
  }
  function checkFields() {
    let temp = true,
      mailFormat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let inputs = fieldSets[currentField].querySelectorAll('input');
    // let selects = fieldSets[currentField].querySelectorAll('select');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type === 'radio') {
        if (inputs[i].checked) {
          temp = true;
          break;
        } else {
          temp = false;
        }
      } else if (inputs[i].type === 'email') {
        if (inputs[i].value.match(mailFormat)) {
          temp = true;
        } else {
          temp = false;
        }
      } else {
        if (inputs[i].value === '') {
          temp = false;
        }
      }
    }
    return temp;
  }
  function checkFilled() {
    if (checkFields()) {
      fieldSets[currentField]
        .querySelector('button')
        .setAttribute('aria-disabled', 'false');
    } else {
      fieldSets[currentField]
        .querySelector('button')
        .setAttribute('aria-disabled', 'true');
      return false;
    }
  }
  function clearErrors(e) {
    if (e.target.closest('input')) {
      e.target.closest('input').classList.remove('invalid');
    } else {
      e.target.closest('select').classList.remove('invalid');
    }
    e.target.closest('fieldset').classList.remove('has-error');
  }
  function prevQuestion(e) {
    fieldSets[currentField].classList.remove('current');
    currentField = currentField - 1;
    showNext(currentField);
  }
  function formSubmit(event) {
    event.preventDefault();
    console.log('Submitting');
    completeForm.parentElement.classList.add('done');
    document.querySelector('.success').classList.add('visible');
  }
  init();
}

window.MultiForm = MultiForm;
