const url = window.location.href;
const title = window.document.title;
const apiUrl = 'http://localhost:8001';

window.events = window.events || [];

const tracker = {
  track: (event, ...tags) => {
    const eventObject = {
      event,
      tags,
      url,
      title,
      ts: new Date(),
    };
    window.events.push(eventObject);
    if (window.events.length >= 3) {
      sendEvents();
    }
  },
};

function sendEvents() {
  if (window.events.length > 0) {
    console.log('Send events...');
    fetch(`${apiUrl}/track`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ events: window.events }),
    })
      .then(() => (window.events = []))
      .catch((err) => console.error(err));
  }
}

window.addEventListener('beforeunload', () => sendEvents());

setInterval(() => {
  if (window.events.length > 0) {
    sendEvents();
  }
}, 1000);
