const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const stories = {
  'after-hours': { title: 'After hours', genre: 'Romance / Thriller', image: 'assets/after-hours.jpg', description: 'A message sent to the wrong number pulls Maya into a midnight rendezvous above the city. The stranger knows her name. She has never seen him before. At least, that’s what she tells him.', line: 'He says, “I’ve been waiting for you.”', prompt: 'She takes his phone. And calls his wife.' },
  'last-signal': { title: 'The last signal', genre: 'Sci-fi / Thriller', image: 'assets/last-signal.jpg', description: 'Alone at a listening station on a silent planet, Commander Ada receives a transmission in her own voice. It is dated tomorrow. It tells her not to open the door.', line: 'The voice on the radio sounds exactly like hers.', prompt: 'She opens the door before the message ends.' },
  'plus-one': { title: 'The plus one', genre: 'Romance / Mystery', image: 'assets/plus-one.jpg', description: 'An invitation. A destination wedding. An envelope that could ruin everything. Eleanor came as someone’s plus one, but by midnight, everyone will know her name.', line: '“Whatever you do, don’t let the bride see this.”', prompt: 'She hands the envelope to the bride.' },
  'glasshouse': { title: 'The glasshouse', genre: 'Fantasy / Adventure', image: 'assets/glasshouse.png', description: 'A botanist finds a flower glowing inside an abandoned conservatory. A fox blocks the path. Outside, the sun has stopped moving. Something is waiting for the flower to open.', line: 'The fox is watching the flower. The flower is watching you.', prompt: 'The flower opens and whispers her name.' },
};
let activeStory = 'after-hours';
let remixStory = 'after-hours';
let mode = 'redirect';
let saved;
try { const stored = JSON.parse(localStorage.getItem('picsart-tv-saved') || '[]'); saved = new Set(Array.isArray(stored) ? stored.filter(id => stories[id]) : []); } catch { saved = new Set(); }
let toastTimer;
function toast(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3200); }
function showDialog(dialog) { dialog.showModal(); document.body.style.overflow = 'hidden'; }
$$('dialog').forEach(dialog => {
  $('.close-dialog', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close(); });
});
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  $$('[data-filter]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  $$('.story-card').forEach(card => { card.hidden = filter !== 'all' && !card.dataset.genres.split(' ').includes(filter); if (!card.hidden) count++; });
  $('#story-count').textContent = `${count} ${count === 1 ? 'story' : 'stories'}. Endless possibilities.`;
}));
function updateSave() { $('#save-story').textContent = saved.has(activeStory) ? 'Saved ✓' : 'Save story'; $('#save-story').setAttribute('aria-pressed', String(saved.has(activeStory))); }
$$('[data-story]').forEach(button => button.addEventListener('click', () => {
  activeStory = button.dataset.story;
  const story = stories[activeStory];
  $('#dialog-title').textContent = story.title;
  $('#dialog-genre').textContent = story.genre;
  $('#dialog-description').textContent = story.description;
  $('#dialog-image').src = story.image;
  $('#dialog-image').alt = `${story.title} concept artwork`;
  updateSave();
  showDialog($('#story-dialog'));
}));
$('#save-story').addEventListener('click', () => {
  if (saved.has(activeStory)) saved.delete(activeStory); else saved.add(activeStory);
  updateSave();
  try { localStorage.setItem('picsart-tv-saved', JSON.stringify([...saved])); } catch { toast('Saved for this visit. Browser storage is unavailable.'); return; }
  toast(saved.has(activeStory) ? 'Story saved on this device.' : 'Story removed from your saved collection.');
});
function selectMode(value) {
  mode = value;
  $$('[data-mode]').forEach(button => { const on = button.dataset.mode === mode; button.setAttribute('aria-selected', String(on)); button.tabIndex = on ? 0 : -1; });
  $('#remix-panel').setAttribute('aria-labelledby', `tab-${mode}`);
  const config = { redirect: ['What happens next?', stories[remixStory].prompt], cast: ['Who would you be in this scene?', 'Me. The stranger with something to hide.'], remix: ['What’s your version of the scene?', 'An old-school noir. Rain, secrets, and a double-cross.'] }[mode];
  $('#prompt-label').textContent = config[0]; $('#direction').value = config[1];
  $('#twist-result').hidden = true; $('#reset-twist').hidden = true;
}
$$('[data-mode]').forEach(button => { button.addEventListener('click', () => selectMode(button.dataset.mode)); button.addEventListener('keydown', event => { const tabs = $$('[data-mode]'); const index = tabs.indexOf(button); let next; if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectMode(tabs[next].dataset.mode); } }); });
function previewTwist() { const direction = $('#direction').value.trim(); if (!direction) { $('#direction').focus(); $('#direction').setCustomValidity('Add your idea to preview it.'); $('#direction').reportValidity(); return; } $('#twist-result').textContent = `${{ redirect: 'Your next beat', cast: 'Your casting direction', remix: 'Your scene treatment' }[mode]}: ${direction}`; $('#twist-result').hidden = false; $('#reset-twist').hidden = false; }
$('#preview-twist').addEventListener('click', previewTwist);
$('#direction').addEventListener('input', () => $('#direction').setCustomValidity(''));
$('#direction').addEventListener('keydown', event => { if (event.key === 'Enter') previewTwist(); });
$('#reset-twist').addEventListener('click', () => selectMode(mode));
$('#dialog-remix').addEventListener('click', () => { remixStory = activeStory; const story = stories[remixStory]; $('#story-dialog').close(); $('#remix-image').src = story.image; $('#remix-image').alt = `${story.title} scene preview`; $('.scene-caption>span').textContent = story.title; $('#scene-line').textContent = story.line; selectMode('redirect'); $('#your-cut').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); $('#direction').focus({ preventScroll: true }); });
// Feedback for user-initiated changes. Section entrances live in reveals.js.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
function animateChange(element) { if (!motionPreference.matches) element.animate([{opacity:.3,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'cubic-bezier(.25,.1,.25,1)'}); }
$$('[data-mode]').forEach(button => button.addEventListener('click', () => animateChange($('.prompt-area'))));
$('#preview-twist').addEventListener('click', () => { if (!$('#twist-result').hidden) animateChange($('#twist-result')); });

// Product screenshots are inspectable examples, separate from live app actions.
const tourScreens = {
  studios: { image: 'assets/tv-studios.png', alt: 'Picsart TV Create page with story studios including Dracula and The Odyssey', caption: 'The studio collection · Unfold product walkthrough' },
  watch: { image: 'assets/tv-watch.png', alt: 'Dracula scene with controls to continue, create another version or redo a scene', caption: 'Give the next scene your direction · Unfold product walkthrough' },
  preview: { image: 'assets/tv-preview.png', alt: 'Welcome to Transylvania take review with publish, revise and story sequence controls', caption: 'Review your take before publishing · Unfold product walkthrough' },
  map: { image: 'assets/tv-story-map.png', alt: 'Dracula story map with branching scenes, contributor paths and open endings', caption: 'One story, many possible paths · Unfold product walkthrough' },
};
let selectedTour = 'studios';
function selectTour(key) {
  selectedTour = key;
  const screen = tourScreens[key];
  $$('[data-tour]').forEach(button => { const selected = button.dataset.tour === key; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
  $('#tour-panel').setAttribute('aria-labelledby', `tour-tab-${key}`);
  $('#tour-image').src = screen.image; $('#tour-image').alt = screen.alt;
  $('#tour-caption').textContent = screen.caption;
}
$$('[data-tour]').forEach(button => {
  button.addEventListener('click', () => selectTour(button.dataset.tour));
  button.addEventListener('keydown', event => {
    const tabs = $$('[data-tour]'); const index = tabs.indexOf(button); let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectTour(tabs[next].dataset.tour); }
  });
});
const studioScreens = {
  characters: { image: 'assets/studio-characters.png', alt: 'After hours character dossiers for Julian Croft and Elara Vance, with motivations, flaws and world-building controls', caption: 'Characters & universe · After hours studio preview' },
  season: { image: 'assets/studio-season.png', alt: 'After hours season map with episode arcs, opening hooks and access to beats, scripts and storyboards', caption: 'Season arcs & episode hooks · After hours studio preview' },
  storyboard: { image: 'assets/studio-storyboard.png', alt: 'After hours episode storyboard with shot images and editable camera, action, dialogue and sound directions', caption: 'Shot-by-shot storytelling · After hours studio preview' },
  spark: { image: 'assets/studio-spark.png', alt: 'Spark AI showrunner conversation developing the After hours cast and suggesting the next creative steps', caption: 'Meet Spark, your AI showrunner · Studio conversation preview' },
};
let selectedStudio = 'characters';
function selectStudio(key) {
  selectedStudio = key;
  const screen = studioScreens[key];
  $$('[data-studio]').forEach(button => { const selected = button.dataset.studio === key; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
  $('#studio-panel').setAttribute('aria-labelledby', `studio-tab-${key}`);
  $('#studio-image').src = screen.image; $('#studio-image').alt = screen.alt;
  $('#studio-caption').textContent = screen.caption;
}
$$('[data-studio]').forEach(button => {
  button.addEventListener('click', () => selectStudio(button.dataset.studio));
  button.addEventListener('keydown', event => {
    const tabs = $$('[data-studio]'); const index = tabs.indexOf(button); let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectStudio(tabs[next].dataset.studio); }
  });
});

$$('[data-screenshot]').forEach(button => button.addEventListener('click', () => {
  const screen = button.dataset.screenshot === 'tour' ? tourScreens[selectedTour] : button.dataset.screenshot === 'studio' ? studioScreens[selectedStudio] : { image: 'assets/newsdesk-review.png', alt: 'Picsart News Desk show review with Aura, scene details and the running order', caption: 'Picsart News Desk · Show review' };
  $('#screenshot-title').textContent = screen.caption;
  $('#expanded-screenshot').src = screen.image; $('#expanded-screenshot').alt = screen.alt;
  showDialog($('#screenshot-dialog'));
}));
