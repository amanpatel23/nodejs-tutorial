console.log('Client side javascript file.');

const weatherForm = document.getElementsByTagName('form')[0];
const search = document.getElementsByTagName('input')[0];
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.innerHTML = 'Loading...';
  messageTwo.innerHTML = '';

  fetch(
    'http://localhost:3000/weather?address=' + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error_msg) {
        console.log(data.error_msg);
        messageOne.innerHTML = data.error_msg;
      } else {
        console.log(data);
        messageOne.innerHTML = 'Location: ' + data.location;
        messageTwo.innerHTML = 'Temperatur: ' + data.temperature;
      }
    });
  });

  search.value = '';
});
