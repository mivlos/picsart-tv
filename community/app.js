(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const arrow = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(svg.namespaceURI, 'use'); use.setAttribute('href', '#arrow'); svg.append(use); return svg;
  };
  function text(tag, value, className) { const node = document.createElement(tag); node.textContent = value; if(className) node.className = className; return node; }
  function choice(label, action) { const b = text('button', label, 'choice'); b.type = 'button'; b.append(arrow()); b.addEventListener('click', action); return b; }
  const storyDialog = $('story-dialog'), creatorDialog = $('creator-dialog');
  let activeStory = tvStories[0], path = [], draft = '', sourceContext = '', savedIdea = '';
  for(const story of tvStories) {
    const card = document.createElement('button'); card.className = 'story-card'; card.dataset.story = story.id;
    const img = document.createElement('img'); img.src = story.image; img.alt = story.alt; img.loading = 'lazy';
    const copy = document.createElement('div'); copy.className = 'card-copy';
    const action = text('div', 'Explore this story', 'card-action'); action.append(arrow());
    copy.append(text('span', story.genre), text('h3', story.title), text('p', story.logline), action); card.append(img, copy); $('story-grid').append(card);
  }
  let demoIndex = 0;
  function updateDemo(index) {
    demoIndex = index; $('demo-result').textContent = tvStories[0].choices[index].text;
    [...$('demo-choices').children].forEach((b, i) => b.setAttribute('aria-pressed', String(index === i)));
    if(!reduced.matches) $('demo-result').animate([{opacity:.35},{opacity:1}],{duration:250});
  }
  tvStories[0].choices.forEach((branch,index) => $('demo-choices').append(choice(branch.label, () => updateDemo(index))));
  updateDemo(0);
  function renderStory() {
    $('story-path').replaceChildren(...path.map(item => text('p', item.text)));
    $('story-choices').hidden = path.length === 2; $('story-next').hidden = path.length !== 2; $('restart-story').hidden = path.length === 0;
    const choices = path.length ? path[0].next : activeStory.choices;
    $('story-choice-buttons').replaceChildren();
    if(path.length < 2) for(const branch of choices) $('story-choice-buttons').append(choice(branch.label, () => {
      path.push(branch); renderStory();
      const target = path.length === 2 ? $('add-next') : $('story-choice-buttons').firstElementChild;
      target.focus({preventScroll:true}); target.scrollIntoView({block:'nearest',behavior:reduced.matches?'instant':'smooth'});
    }));
  }
  function openStory(id, branchIndex) {
    activeStory = tvStories.find(story => story.id === id) || tvStories[0]; path = branchIndex === undefined ? [] : [activeStory.choices[branchIndex]];
    $('story-title').textContent = activeStory.title; $('story-image').src = activeStory.image; $('story-image').alt = activeStory.alt;
    $('story-genre').textContent = activeStory.genre; $('story-opening').textContent = activeStory.opening; renderStory(); storyDialog.showModal(); storyDialog.scrollTop = 0;
  }
  document.querySelectorAll('[data-story]').forEach(b => b.addEventListener('click', () => openStory(b.dataset.story)));
  $('continue-demo').addEventListener('click', () => openStory('midnight',demoIndex));
  $('restart-story').addEventListener('click', () => { path = []; renderStory(); $('story-choice-buttons').firstElementChild.focus(); });
  function openCreator(idea, context = '') {
    if(storyDialog.open) storyDialog.close(); sourceContext = context;
    if(idea !== undefined) draft = idea;
    $('story-idea').value = draft; $('idea-count').textContent = `${draft.length} / 600`;
    $('idea-preview').hidden = true; $('story-idea').setCustomValidity(''); creatorDialog.showModal(); creatorDialog.scrollTop = 0;
  }
  document.querySelectorAll('[data-create]').forEach(b => b.addEventListener('click', () => openCreator()));
  document.querySelectorAll('[data-idea]').forEach(b => b.addEventListener('click', () => openCreator(b.dataset.idea)));
  $('add-next').addEventListener('click', () => openCreator(`In ${activeStory.title}, what if…`, [activeStory.title, activeStory.opening, ...path.map(p=>p.text)].join('\n\n')));
  $('story-idea').addEventListener('input', e => { draft = e.target.value; e.target.setCustomValidity(''); $('idea-count').textContent = `${draft.length} / 600`; $('idea-preview').hidden = true; });
  $('idea-form').addEventListener('submit', e => {
    e.preventDefault(); savedIdea = $('story-idea').value.trim();
    if(!savedIdea) { $('story-idea').setCustomValidity('Add a few words to begin your story.'); $('story-idea').reportValidity(); return; }
    $('idea-output').textContent = savedIdea; $('idea-preview').hidden = false;
    const content = 'PICSART TV — MY STORY BEGINNING\n\n' + (sourceContext ? 'THE STORY SO FAR\n' + sourceContext + '\n\nMY NEXT SCENE\n' : '') + savedIdea + '\n\nWhere would you take this?\n\nSaved from the Picsart TV concept preview. Nothing has been published.\n';
    $('download-idea').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    $('download-idea').focus({preventScroll:true}); $('idea-preview').scrollIntoView({block:'nearest',behavior:reduced.matches?'instant':'smooth'});
  });
  $('open-map').addEventListener('click', () => $('map-dialog').showModal());
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('.close-button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click',e => { if(e.target !== dialog) return; const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); });
  });
  if(!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); } }),{threshold:.08});
    document.querySelectorAll('.welcome,.section-heading,.story-card,.branch-showcase,.simple-steps,.start-layout,.closing').forEach(el => { if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal','reveal-pending');observer.observe(el);} });
  }
})();
