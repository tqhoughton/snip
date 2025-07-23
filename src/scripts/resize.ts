// TODO: figure out if we can replace this with hyperscript
console.log("resize.js script loaded");
const sidenav = document.getElementById('nav');
const resizer = document.getElementById('nav-border');
const minSideNavWidthPx = 238;
const expireCookieSecs = 86400; // 1 day

if (!sidenav || !resizer) {
  console.error('Sidenav or resizer element not found');
  throw new Error('Sidenav or resizer element not found');
}

let isResizing = false;
let initialX: number;
let initialWidth: number;

resizer.addEventListener('mousedown', (e) => {
  console.debug('mousedown on resizer');
  e.preventDefault();
  isResizing = true;
  console.debug('e', e)
  initialX = e.clientX;
  initialWidth = sidenav.offsetWidth;

  document.addEventListener('mousemove', resizeSidenav);
  document.addEventListener('mouseup', stopResizing);
});

function resizeSidenav(e: MouseEvent) {
  console.debug('resizing sidenav');
  if (!isResizing || !sidenav) return;

  const deltaX = e.clientX - initialX;
  const newWidth = initialWidth + deltaX;
  const browserWidth = document.documentElement.clientWidth;
  sidenav.style.minWidth = Math.max(Math.min(newWidth, browserWidth), minSideNavWidthPx) + 'px';
  document.cookie = `sideNavWidth=${sidenav.style.minWidth}; path=/; max-age=${expireCookieSecs}`;
}

function stopResizing() {
  console.debug('stop resizing');
  isResizing = false;
  document.removeEventListener('mousemove', resizeSidenav);
  document.removeEventListener('mouseup', stopResizing);
}
