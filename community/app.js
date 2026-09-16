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
  const creatorDialog = $('creator-dialog');
  let draft = '', savedIdea = '';
  for(const story of tvStories) {
    const card = document.createElement('a'); card.className = 'story-card'; card.href = story.url; card.setAttribute('aria-label', 'Watch ' + story.title + ' in Picsart TV');
    const img = document.createElement('img'); img.src = story.image; img.alt = story.alt; img.loading = 'lazy';
    const copy = document.createElement('div'); copy.className = 'card-copy';
    const action = text('div', 'Watch in Picsart TV', 'card-action'); action.append(arrow());
    copy.append(text('span', story.genre), text('h3', story.title), text('p', story.logline), action); card.append(img, copy); $('story-grid').append(card);
  }
  function updateDemo(index) {
    const branch = tvBranches[index];
    $('demo-result-label').textContent = branch.title;
    $('demo-result').textContent = branch.text;
    $('demo-credit').textContent = branch.credit;
    [...$('demo-choices').children].forEach((b,i) => b.setAttribute('aria-pressed',String(index===i)));
    if(!reduced.matches) $('demo-result').animate([{opacity:.35},{opacity:1}],{duration:250});
  }
  tvBranches.forEach((branch,index) => $('demo-choices').append(choice(branch.title,()=>updateDemo(index))));
  updateDemo(0);
  function openCreator(idea) {
    if(idea !== undefined) draft = idea;
    $('story-idea').value = draft; $('idea-count').textContent = `${draft.length} / 600`;
    $('idea-preview').hidden = true; $('story-idea').setCustomValidity(''); creatorDialog.showModal(); creatorDialog.scrollTop = 0;
  }
  document.querySelectorAll('[data-idea]').forEach(b => b.addEventListener('click', () => openCreator(b.dataset.idea)));
  $('story-idea').addEventListener('input', e => { draft = e.target.value; e.target.setCustomValidity(''); $('idea-count').textContent = `${draft.length} / 600`; $('idea-preview').hidden = true; });
  $('idea-form').addEventListener('submit', e => {
    e.preventDefault(); savedIdea = $('story-idea').value.trim();
    if(!savedIdea) { $('story-idea').setCustomValidity('Add a few words to begin your story.'); $('story-idea').reportValidity(); return; }
    $('idea-output').textContent = savedIdea; $('idea-preview').hidden = false;
    const content = 'PICSART TV — MY STORY BEGINNING\n\n' + savedIdea + '\n\nWhere would you take this?\n\nSaved from the Picsart TV concept preview. Nothing has been published.\n';
    $('download-idea').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    $('download-idea').focus({preventScroll:true}); $('idea-preview').scrollIntoView({block:'nearest',behavior:reduced.matches?'instant':'smooth'});
  });
  function selectScreen(index) {
    const screen = tvScreens[index];
    $('screen-heading').textContent = screen.title;
    $('screen-description').textContent = screen.description;
    for(const img of [$('open-map').querySelector('img'), $('map-dialog').querySelector('img')]) { img.src=screen.image; img.alt=screen.alt; }
    $('map-title').textContent=screen.title;
    [...$('screen-picker').children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
  }
  tvScreens.forEach((screen,index)=>$('screen-picker').append(choice(screen.label,()=>selectScreen(index))));
  selectScreen(0);
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
