/* ==========================================================
   ÂM SẮC AN NAM – CẤU HÌNH NỘI DUNG
   Thêm ảnh vào assets/pages và sửa danh sách pages bên dưới.
   Mỗi trang là một ảnh thiết kế hoàn chỉnh (JPG/PNG/WebP).
   ========================================================== */
const pages = [
  { image: 'assets/pages/cover.jpg', title: 'Bìa sách' },
  { image: 'assets/pages/page-01.jpg', title: 'Lời mở đầu' },
  { image: 'assets/pages/page-02.jpg', title: 'Đàn tranh', instrument: 'Đàn tranh', audio: 'assets/audio/dan-tranh.mp3' },
  { image: 'assets/pages/page-03.jpg', title: 'Đàn bầu', instrument: 'Đàn bầu', audio: 'assets/audio/dan-bau.mp3' },
  { image: 'assets/pages/page-04.jpg', title: 'Sáo trúc', instrument: 'Sáo trúc', audio: 'assets/audio/sao-truc.mp3' },
  { image: 'assets/pages/page-05.jpg', title: 'Nhạc cụ dân tộc' }
];

const $ = (id) => document.getElementById(id);
const intro = $('intro'), reader = $('reader'), bookElement = $('book');
const backgroundMusic = $('backgroundMusic'), paperSound = $('paperSound'), instrumentSound = $('instrumentSound');
let pageFlip = null;
let soundEnabled = true;
let musicEnabled = false;
let currentInstrumentButton = null;

function buildPages() {
  bookElement.innerHTML = '';
  pages.forEach((page, index) => {
    const article = document.createElement('article');
    article.className = 'page';
    article.dataset.index = String(index);
    const img = document.createElement('img');
    img.src = page.image;
    img.alt = page.title || Trang ${index + 1};
    img.loading = index < 2 ? 'eager' : 'lazy';
    img.onerror = () => {
      img.remove();
      const fallback = document.createElement('div');
      fallback.className = 'page-fallback';
      fallback.innerHTML = <div><h3>${escapeHTML(page.title || Trang ${index + 1}`)}</h3><p>Thêm ảnh thiết kế vào <b>${escapeHTML(page.image)}</b></p></div>`;
      article.prepend(fallback);
    };
    article.appendChild(img);
    if (page.instrument && page.audio) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'instrument-control';
      button.innerHTML = '<span class="sound-wave"><i></i><i></i><i></i></span> Nghe âm thanh';
      button.setAttribute('aria-label', Phát âm thanh ${page.instrument});
      button.addEventListener('click', () => toggleInstrument(page, button));
      article.appendChild(button);
    }
    bookElement.appendChild(article);
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function initReader() {
  if (pageFlip) return;
  buildPages();
  if (!window.St || !window.St.PageFlip) {
    alert('Không tải được thư viện lật trang. Vui lòng kiểm tra kết nối Internet rồi tải lại trang.');
    return;
  }
  pageFlip = new St.PageFlip(bookElement, {
    width: 550, height: 720, size: 'stretch', minWidth: 280, maxWidth: 1100,
    minHeight: 360, maxHeight: 1450, drawShadow: true, flippingTime: 850,
    usePortrait: true, startPage: 0, autoSize: true, maxShadowOpacity: 0.28,
    showCover: true, mobileScrollSupport: false, clickEventForward: true,
    useMouseEvents: true, swipeDistance: 30, showPageCorners: true
  });
  pageFlip.loadFromHTML(bookElement.querySelectorAll('.page'));
  pageFlip.on('flip', event => {
    stopInstrument();
    if (soundEnabled) playPaperSound();
    updatePageCounter(event.data);
  });
  pageFlip.on('changeState', event => {
    if (event.data === 'flipping') stopInstrument();
  });
  $('totalPages').textContent = String(pages.length);
  updatePageCounter(0);
  buildContents();
}

function updatePageCounter(index) {
  $('currentPage').textContent = String(Number(index) + 1);
  $('prevButton').disabled = Number(index) <= 0;
  $('nextButton').disabled = Number(index) >= pages.length - 1;
  $('prevButton').style.opacity = $('prevButton').disabled ? '.4' : '1';
  $('nextButton').style.opacity = $('nextButton').disabled ? '.4' : '1';
}

function playPaperSound() {
  paperSound.currentTime = 0;
  paperSound.volume = 0.45;
  paperSound.play().catch(() => {});
}

function stopInstrument() {
  instrumentSound.pause();
  instrumentSound.currentTime = 0;
  if (currentInstrumentButton) currentInstrumentButton.classList.remove('playing');
  currentInstrumentButton = null;
  restoreMusicVolume();
}

function toggleInstrument(page, button) {
  if (!soundEnabled) return;
  if (currentInstrumentButton === button && !instrumentSound.paused) {
    stopInstrument();
    return;
  }
  stopInstrument();
  instrumentSound.src = page.audio;
  instrumentSound.volume = 1;
  instrumentSound.currentTime = 0;
  currentInstrumentButton = button;
  button.classList.add('playing');
  lowerMusicVolume();
  instrumentSound.play().catch(() => {
    button.classList.remove('playing');
    currentInstrumentButton = null;
    alert(Chưa tìm thấy tệp âm thanh: ${page.audio});
    restoreMusicVolume();
  });
}

function lowerMusicVolume() {
  backgroundMusic.volume = 0.12;
}
function restoreMusicVolume() {
  backgroundMusic.volume = 0.32;
}
instrumentSound.addEventListener('ended', stopInstrument);

function buildContents() {
  const list = $('contentsList');
  list.innerHTML = '';
  pages.forEach((page, index) => {
    const button = document.createElement('button');
    button.className = 'contents-item';
    button.type = 'button';
    button.innerHTML = ${escapeHTML(page.title || Trang ${index + 1}`)} <small>${index + 1}</small>`;
    button.addEventListener('click', () => {
      if (pageFlip) pageFlip.flip(index);
      closeContents();
    });
    list.appendChild(button);
  });
}
function closeContents() {
  $('contentsPanel').classList.remove('open');
  $('contentsPanel').setAttribute('aria-hidden', 'true');
}

$('startButton').addEventListener('click', () => {
  intro.classList.add('reveal');
  $('startButton').disabled = true;
  window.setTimeout(() => {
    intro.classList.add('hidden');
    reader.classList.remove('hidden');
    initReader();
    if (musicEnabled) backgroundMusic.play().catch(() => {});
  }, 1500);
});
$('prevButton').addEventListener('click', () => pageFlip && pageFlip.flipPrev());
$('nextButton').addEventListener('click', () => pageFlip && pageFlip.flipNext());
$('homeButton').addEventListener('click', () => {
  stopInstrument();
  if (pageFlip) pageFlip.flip(0);
  closeContents();
});
$('musicToggle').addEventListener('click', () => {
  musicEnabled = !musicEnabled;
  $('musicToggle').classList.toggle('active', musicEnabled);
  if (musicEnabled && soundEnabled) backgroundMusic.play().catch(() => {});
  else backgroundMusic.pause();
});
$('soundToggle').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  $('soundToggle').textContent = soundEnabled ? '🔊' : '🔇';
  if (!soundEnabled) {
    stopInstrument();
    paperSound.pause();
    backgroundMusic.pause();
  } else if (musicEnabled) backgroundMusic.play().catch(() => {});
});
$('contentsToggle').addEventListener('click', () => {
  $('contentsPanel').classList.add('open');
  $('contentsPanel').setAttribute('aria-hidden', 'false');
});
$('closeContents').addEventListener('click', closeContents);
