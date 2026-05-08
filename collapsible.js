(function () {
  const container = document.querySelector('.content');
  if (!container) return;

  const sections = Array.from(container.children).filter((child) => {
    if (!(child instanceof HTMLElement)) return false;
    if (!child.classList.contains('section')) return false;
    return !!child.querySelector(':scope > h2');
  });

  sections.forEach((section) => {
    const heading = section.querySelector(':scope > h2');
    if (!heading || section.querySelector(':scope > details.collapsible-section')) return;

    const details = document.createElement('details');
    details.className = 'collapsible-section';
    details.open = true;

    const summary = document.createElement('summary');
    summary.className = 'collapsible-summary';

    const title = document.createElement('span');
    title.className = 'collapsible-title';
    title.innerHTML = heading.innerHTML;

    const chevron = document.createElement('span');
    chevron.className = 'collapsible-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '>';

    summary.append(title, chevron);

    const body = document.createElement('div');
    body.className = 'collapsible-body';

    Array.from(section.childNodes).forEach((node) => {
      if (node === heading) return;
      body.appendChild(node);
    });

    section.replaceChildren(details);
    details.append(summary, body);
  });
})();
