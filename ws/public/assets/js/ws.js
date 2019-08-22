/* global location, WebSocket */
const host = location.origin.replace(/^http/, 'ws');
const client = new WebSocket(host);

if (client) {
    console.log('global location, WebSocket');
}

let textbox = document.getElementsByTagName('input')[0];
let button = document.getElementsByTagName('button')[0];

client.onmessage = function (message) {
  if (message.data === 'loginSuccess') {
    button.innerHTML = 'Send';
    textbox.placeholder = 'Write message';
    textbox.parentElement.className += ' has-success';
    return;
  } else if (message.data === 'loginFailed') {
    textbox.parentElement.className += ' has-error';
    textbox.placeholder = 'Username is already used by another user';
    return;
  }

  let chatbox = document.getElementById('chatbox');
  let div = document.createElement('div');
  div.className = 'col-xs-12 nopadding';
  div.innerHTML = '<span class="col-xs-11 nopadding">' +
    message.data.replace(/(@\w+)/ig, '<b>$1</b>') +
    '</span><span class="col-xs-1 text-right nopadding">' +
    new Date().toTimeString().split(' ')[0] + '</span>';

  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function send () {
  if (!textbox.value) return;

  var message = {
    type: 'message',
    data: textbox.value
  }

  if (button.innerHTML === 'Login') {
    message.type = 'login';
  }

  client.send(JSON.stringify(message));
  textbox.value = '';
}

button.onclick = send;

textbox.onkeypress = function (event) {
  if (event.charCode === 13) send();
}
