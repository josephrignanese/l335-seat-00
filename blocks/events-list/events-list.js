import ffetch from "../../scripts/ffetch.js";

/**
 * Fetches events data from the events index
 * @returns {Promise<Array>} The events data
 */
async function fetchEvents() {
  try {
    const events = await ffetch('/events-index.json').all();
    return events || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading events:', error);
    return [];
  }
}

/**
 * Creates an event list item element
 * @param {Object} event The event data
 * @returns {HTMLElement} The event list item
 */
function createEventElement(event) {
  const li = document.createElement("li");
  li.classList.add("event");

  // Create title with optional link
  const title = document.createElement("h3");
  if (event.path) {
    const link = document.createElement("a");
    link.href = event.path;
    link.textContent = event.title;
    title.append(link);
  } else {
    title.textContent = event.title;
  }
  li.append(title);

  // Add date if available
  if (event.date) {
    const date = document.createElement("p");
    date.classList.add("event-date");
    date.textContent = new Date(event.date).toLocaleDateString();
    li.append(date);
  }

  // Add description if available
  if (event.description) {
    const desc = document.createElement("p");
    desc.classList.add("event-description");
    desc.textContent = event.description;
    li.append(desc);
  }

  return li;
}

/**
 * Decorates the events list block
 * @param {HTMLElement} block The events list block element
 */
export default async function decorate(block) {
  try {
    const events = await fetchEvents();

    const ul = document.createElement('ul');
    ul.classList.add('events-list');
    events.forEach((event) => {
      const li = createEventElement(event);
      ul.append(li);
    });

    block.textContent = '';
    block.append(ul);
  } catch (error) {
    block.textContent = 'Unable to load events';
  }
}
