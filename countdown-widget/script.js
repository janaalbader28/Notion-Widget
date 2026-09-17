/* =====================================================
   EVENTS — edit dates, ink colors and images here.
   `start`/`end` use (year, monthIndex 0-11, day, hour, minute).
   Events with no image just omit the `image` field.
   `end: null` means a single-day event (e.g. a Bank Holiday) —
   it still counts as "active" for that whole calendar day.
   ===================================================== */
const INK_BLUE = '#5b8fb3';
const INK_GREEN = '#8fb196';
const INK_ORANGE = '#d18c4b';
const INK_PINK = '#c97ea0';

const BORDER_BLUE = '#bcdcee';
const BORDER_GREEN = '#cfe3d2';
const BORDER_ORANGE = '#f3d3ac';
const BORDER_PINK = '#f0cddd';

const events = [
  {
    title: 'Christmas',
    start: new Date(2026, 11, 23, 17, 30),
    end: new Date(2027, 0, 4, 9, 0),
    ink: INK_BLUE,
    border: BORDER_BLUE,
    image: 'images/christmas.png',
  },
  {
    title: 'Easter',
    start: new Date(2027, 2, 25, 17, 30),
    end: new Date(2027, 3, 1, 9, 0),
    ink: INK_GREEN,
    border: BORDER_GREEN,
    image: 'images/easter.png',
  },
  {
    title: 'Reading Week 1',
    start: new Date(2026, 10, 9, 0, 0),
    end: new Date(2026, 10, 13, 0, 0),
    ink: INK_ORANGE,
    border: BORDER_ORANGE,
    image: 'images/reading-week-1.png',
  },
  {
    title: 'Reading Week 2',
    start: new Date(2027, 1, 15, 0, 0),
    end: new Date(2027, 1, 19, 0, 0),
    ink: INK_ORANGE,
    border: BORDER_ORANGE,
    image: 'images/reading-week-2.png',
  },
  {
    title: 'Bank Holiday 1',
    start: new Date(2027, 4, 3, 0, 0),
    end: null,
    ink: INK_PINK,
    border: BORDER_PINK,
    image: 'images/bank-holiday-1.png',
  },
  {
    title: 'Bank Holiday 2',
    start: new Date(2027, 4, 31, 0, 0),
    end: null,
    ink: INK_PINK,
    border: BORDER_PINK,
    image: 'images/bank-holiday-2.png',
  },
  {
    title: 'Bank Holiday 3',
    start: new Date(2027, 7, 30, 0, 0),
    end: null,
    ink: INK_PINK,
    border: BORDER_PINK,
    image: 'images/bank-holiday-3.png',
  },
].sort((a, b) => a.start - b.start);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_MS = 86400000;

function formatSingleDate(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatDateRange(event) {
  const { start, end } = event;

  if (!end) {
    return formatSingleDate(start);
  }

  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${start.getDate()} – ${end.getDate()} ${MONTHS[start.getMonth()]} ${start.getFullYear()}`;
  }

  return `${formatSingleDate(start)} – ${formatSingleDate(end)}`;
}

function effectiveEnd(event) {
  return event.end ? event.end.getTime() : event.start.getTime() + DAY_MS;
}

function getActiveEvent() {
  const now = Date.now();
  return events.find((event) => event.start.getTime() <= now && now < effectiveEnd(event));
}

function getNextUpcomingEvent() {
  const now = Date.now();
  return events.find((event) => event.start.getTime() > now);
}

const widget = document.getElementById('widget');
const infoPanel = document.getElementById('infoPanel');
const panelValue = document.getElementById('panelValue');
const panelLabel = document.getElementById('panelLabel');
const eventImageWrap = document.getElementById('eventImageWrap');
const eventImage = document.getElementById('eventImage');
const eventTitle = document.getElementById('eventTitle');

function setImage(event) {
  if (event.image) {
    eventImage.onerror = () => eventImageWrap.classList.add('is-empty');
    eventImage.src = event.image;
    eventImage.alt = event.title;
    eventImageWrap.classList.remove('is-empty');
  } else {
    eventImage.onerror = null;
    eventImage.removeAttribute('src');
    eventImageWrap.classList.add('is-empty');
  }
}

function tick() {
  const active = getActiveEvent();

  if (active) {
    widget.style.setProperty('--event-ink', active.ink);
    widget.style.setProperty('--event-border', active.border);
    eventTitle.textContent = active.title;
    setImage(active);

    infoPanel.classList.add('is-period');
    panelValue.classList.add('is-period');
    panelValue.textContent = formatDateRange(active);
    panelLabel.textContent = '';
    return;
  }

  const upcoming = getNextUpcomingEvent();

  if (!upcoming) {
    eventTitle.textContent = 'No upcoming events';
    infoPanel.classList.remove('is-period');
    panelValue.classList.remove('is-period');
    panelValue.textContent = '00';
    panelLabel.textContent = '';
    eventImageWrap.classList.add('is-empty');
    return;
  }

  widget.style.setProperty('--event-ink', upcoming.ink);
  widget.style.setProperty('--event-border', upcoming.border);
  eventTitle.textContent = upcoming.title;
  setImage(upcoming);

  infoPanel.classList.remove('is-period');
  panelValue.classList.remove('is-period');
  const days = Math.ceil((upcoming.start.getTime() - Date.now()) / DAY_MS);
  panelValue.textContent = String(days).padStart(2, '0');
  panelLabel.textContent = 'DAYS LEFT';
}

tick();
setInterval(tick, 1000);
