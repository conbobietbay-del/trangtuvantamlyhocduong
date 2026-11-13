/* ===== CẤU HÌNH — chỉnh ở đây ===== */
const TOTAL = 27;
const EXT = 'png';                                   // đuôi ảnh: png / jpg / webp
const imgSrc = n => `images/trang-${String(n).padStart(2, '0')}.${EXT}`; // images/trang-01.png ... trang-27.png

// Mục lục: [tên, số trang]. Tổng = 27 (1+4+4+4+4+4+6)
const SECTIONS = [['Bìa sách', 1], ['Mở đầu', 4], ['Đàn bầu', 4], ["Đàn t'rưng", 4], ['Đàn nhị', 4], ['Trống đồng', 4], ['Đàn tranh', 6]];

// Nút phát âm thanh: { số trang: { src, x, y } } — x, y là % vị trí trên trang (gần hình nhạc cụ)
const SOUNDS = {
  6:  { src: 'audio/dan-bau.mp3',   x: 82, y: 72 },
  10: { src: 'audio/dan-trung.mp3', x: 82, y: 72 },
  14: { src: 'audio/dan-nhi.mp3',   x: 82, y: 72 },
  18: { src: 'audio/trong-dong.mp3', x: 82, y: 72 },
  22: { src: 'audio/dan-tranh.mp3', x: 82, y: 72 },
};
const BG_VOL = 0.45, DUCK_VOL = 0.1;                 // âm lượng nhạc nền: bình thường / khi phát nhạc cụ
/* ================================== */

const $ = s => document.querySelector(s);
const bgm = $('#bgm'), flipSnd = $('#flip');
let pf, cur = 0, started = false, inst = null, instBtn = null, fv;
bgm.volume = BG_VOL;

/* --- Âm thanh --- */
function fade(to) {
  clearInterval(fv);
  fv = setInterval(() => {
    const d = to - bgm.volume;
    if (Math.abs(d) < 0.02) { bgm.volume = to; clearInterval(fv); } else bgm.volume += d * 0.2;
  }, 40);
}
function stopInst() {
  const a = inst, b = instBtn;
  inst = instBtn = null;
  if (a) { a.onpause = a.onended = null; a.pause(); }
  if (b) b.classList.remove('on');
  fade(BG_VOL);
}
function toggleInst(src, btn) {
  if (inst && instBtn === btn) { inst.paused ? inst.play() : inst.pause(); return; } // tạm dừng / phát lại
  stopInst();
  const a = inst = new Audio(src); instBtn = btn;
  const sync = () => { const on = !a.paused; btn.classList.toggle('on', on); fade(on ? DUCK_VOL : BG_VOL); };
  a.onplay = sync; a.onpause = sync; a.onended = stopInst;
  a.play().catch(stopInst);
}
function sfx() {
  const a = flipSnd.cloneNode(); a.volume = 0.7; a.play().catch(() => {});
}

/* --- Dựng sách --- */
function build(startPage = 0) {
  if (pf) pf.destroy();
  const stage = $('#stage');
  stage.innerHTML = '<div id="book"></div>';
  const book = $('#book');
  const w = Math.min(innerWidth * 0.96, (innerHeight - 90) * 1.4142);   // A4 ngang: 297 x 210
  book.style.width = w + 'px';
  book.style.height = w / 1.4142 + 'px';

  for (let n = 1; n <= TOTAL; n++) {
    const p = document.createElement('div');
    p.className = 'page';
    if (n === 1 || n === TOTAL) p.dataset.density = 'hard';
    p.innerHTML = `<img src="${imgSrc(n)}" alt="Trang ${n}" draggable="false" decoding="async">`;
    const s = SOUNDS[n];
    if (s) {
      const b = document.createElement('button');
      b.className = 'snd'; b.style.left = s.x + '%'; b.style.top = s.y + '%';
      b.setAttribute('aria-label', 'Nghe âm thanh nhạc cụ');
      b.innerHTML = '<em>🔊</em><u><i></i><i></i><i></i></u>';
      ['mousedown', 'touchstart', 'pointerdown'].forEach(t => b.addEventListener(t, e => e.stopPropagation(), { passive: true }));
      b.addEventListener('click', e => { e.stopPropagation(); toggleInst(s.src, b); });
      p.append(b);
    }
    book.append(p);
  }

  pf = new St.PageFlip(book, {
    width: 1123, height: 794, size: 'stretch',
    minWidth: Math.ceil(w / 2) + 10, maxWidth: 4000, minHeight: 100, maxHeight: 4000,
    showCover: true, usePortrait: true,          // mỗi lần hiện 1 trang A4 ngang
    maxShadowOpacity: 0.45, flippingTime: 800, mobileScrollSupport: false, swipeDistance: 20,
  });
  pf.loadFromHTML(book.querySelectorAll('.page'));
  pf.on('flip', e => { cur = e.data; stopInst(); update(); });
  pf.on('changeState', e => { if (e.data === 'flipping' && started) { stopInst(); sfx(); } });
  if (startPage) pf.turnToPage(startPage);
  update();
}

function update() {
  $('#count').textContent = `${cur + 1} / ${TOTAL}`;
  $('#prev').disabled = cur === 0;
  $('#next').disabled = cur === TOTAL - 1;
  document.querySelectorAll('#toc button').forEach(b => b.classList.toggle('cur', +b.dataset.p <= cur && cur < +b.dataset.p + +b.dataset.n));
}

/* --- Mục lục --- */
(() => {
  let p = 1; const ul = $('#toc ul');
  SECTIONS.forEach(([name, n]) => {
    const li = document.createElement('li');
    li.innerHTML = `<button data-p="${p - 1}" data-n="${n}">${name}<span>tr. ${p}</span></button>`;
    li.firstChild.onclick = e => { $('#toc').hidden = true; pf.flip(+e.currentTarget.dataset.p); };
    ul.append(li); p += n;
  });
})();

/* --- Điều khiển --- */
$('#prev').onclick = () => pf.flipPrev();
$('#next').onclick = () => pf.flipNext();
$('#home').onclick = () => { $('#toc').hidden = true; if (cur) pf.flip(0); };
$('#tocBtn').onclick = () => { $('#toc').hidden = !$('#toc').hidden; };
$('#music').onclick = e => {
  const off = !bgm.paused; off ? bgm.pause() : bgm.play().catch(() => {});
  e.currentTarget.classList.toggle('off', off);
};
$('#full').onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
document.addEventListener('keydown', e => {
  if (!started) return;
  if (e.key === 'ArrowRight') pf.flipNext();
  if (e.key === 'ArrowLeft') pf.flipPrev();
  if (e.key === 'Escape') $('#toc').hidden = true;
});
document.addEventListener('click', e => { if (!e.target.closest('#toc,#tocBtn')) $('#toc').hidden = true; });

/* --- Mở đầu: mây tách ra, bấm "Bắt đầu" --- */
build();
setTimeout(() => {
  document.querySelectorAll('.cloud').forEach(c => c.classList.add('open'));
  setTimeout(() => { $('#start').hidden = false; }, 1800);
}, 1500);

$('#start').onclick = () => {
  started = true;
  bgm.play().catch(() => {});
  $('#intro').classList.add('done');
  document.body.classList.add('ready');
  setTimeout(() => pf.flipNext(), 300);          // mở sách sang trang đầu tiên
};

/* --- Đổi kích thước / xoay màn hình: dựng lại cho vừa khung --- */
let lw = innerWidth, lh = innerHeight, rt;
addEventListener('resize', () => {
  clearTimeout(rt);
  rt = setTimeout(() => {
    if (Math.abs(innerWidth - lw) < 40 && Math.abs(innerHeight - lh) < 120) return;
    lw = innerWidth; lh = innerHeight;
    stopInst(); build(cur);
  }, 300);
});
