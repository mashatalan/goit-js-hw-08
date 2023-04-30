import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  messageTextarea: document.querySelector('textarea[name="message"]'),
};
const STORAGE_KEY = 'feedback-form-state';


refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();


function onFormSubmit(event) {
  event.preventDefault();
  console.log({
    email: refs.emailInput.value,
    message: refs.messageTextarea.value,
  });
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

}

function onTextareaInput() {

  const state = {
    email: refs.emailInput.value, message: refs.messageTextarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsSavedMessage = JSON.parse(savedMessage);

  if (parsSavedMessage) {
    refs.emailInput.value = parsSavedMessage.email;
    refs.messageTextarea.value = parsSavedMessage.message;

  }
}







