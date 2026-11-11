/*
 * ÂM SẮC AN NAM
 * CÁCH CHÈN ẢNH/ÂM THANH:
 * 1) Tạo thư mục assets cạnh 3 file này.
 * 2) Đặt ảnh bìa và 10 ảnh trang (trang-01.jpg đến trang-10.jpg) vào assets/.
 * 3) Sửa COVER_IMAGE, pages[].image, pages[].audio và BACKGROUND_MUSIC bên dưới.
 * 4) Trang không có nhạc cụ thì bỏ audio hoặc để audio: "".
 */

const COVER_IMAGE = "assets/bia-sach.jpg";
const BACKGROUND_MUSIC = "assets/nhac-nen.mp3";
const PAGE_TURN_SOUND = true; // Âm lật giấy được tạo bằng Web Audio, không cần file riêng.

const pages = [
  {
    title: "Lời mở đầu",
    image: "assets/trang-01.jpg",
    text: "Chào mừng bạn đến với Âm Sắc An Nam."
  },
  {
    title: "Đàn tranh",
    image: "assets/trang-02.jpg",
    instrument: "Đàn tranh",
    audio: "assets/dan-tranh.mp3"
  },
  {
    title: "Đàn bầu",
    image: "assets/trang-03.jpg",
    instrument: "Đàn bầu",
    audio: "assets/dan-bau.mp3"
  },
  { title: "Trang 04", image: "assets/trang-04.jpg" },
  { title: "Trang 05", image: "assets/trang-05.jpg" },
  { title: "Trang 06", image: "assets/trang-06.jpg" },
  { title: "Trang 07", image: "assets/trang-07.jpg" },
  { title: "Trang 08", image: "assets/trang-08.jpg" },
  { title: "Trang 09", image: "assets/trang-09.jpg" },
  { title: "Trang 10", image: "assets/trang-10.jpg" }
];

const $ = (id) => document.getElementById(id);
const intro = $("intro");
const reader = $("reader");
const coverImage = $("coverImage");
const coverFallback = $("coverFallback");
const currentImage = $("currentImage");
const nextImage = $("nextImage");
const currentFallback = $("currentFallback");
const nextFallback = $("nextFallback");
const pageNext = $("pageNext");
const instrumentControl = $("instrumentControl");
const instrumentAudio = $("instrumentAudio");
const backgroundMusic = $("backgroundMusic");
const instrumentPlay = $("instrumentPlay");
const pageNumber = $("pageNumber");
const totalPages = $("totalPages");
const prevButton = $("prevButton");
const nextButton = $("nextButton");
const toast = $("toast");

let currentPage = 0;
let isAnimating = false;
let musicEnabled = false;
let audioContext;
let toastTimer;
let touchStartX = 0;

coverImage.src = COVER_IMAGE;
coverImage.addEventListener("error", () => {
  coverImage.style.display = "none";
  coverFallback.style.display = "flex";
});
coverFallback.style.display = "none";

backgroundMusic.src = BACKGROUND_MUSIC;
backgroundMusic.volume = 0.24;
backgroundMusic.addEventListener("error", () => {
  // Không làm gián đoạn trải nghiệm nếu chưa thêm file nhạc nền.
});

totalPages.textContent = pages.length;
intro.classList.add("reveal");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function playPageTurn() {
  if (!PAGE_TURN_SOUND) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext ||= new AudioCtx();
    if (audioContext.state === "suspended") audioContext.resume();
    const duration = 0.16;
    const bufferSize = Math.floor(audioContext.sampleRate * duration);
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const fade = 1 - i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * fade * 0.16;
    }
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    source.buffer = buffer;
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    gain.gain.value = 0.22;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.warn("Không thể phát âm thanh lật trang:", error);
  }
}

function setPageVisual(img, fallback, page) {
  img.style.display = "block";
  fallback.classList.remove("active");
  fallback.innerHTML = "";
  if (!page) {
    img.removeAttribute("src");
    img.style.display = "none";
    fallback.classList.add("active");
    fallback.innerHTML = "<h2>Hết trang</h2><p>Bạn đã đến cuối cuốn sách.</p>";
    return;
  }
  img.src = page.image || "";
  img.alt = page.title || "Trang sách";
  img.onerror = () => {
    img.style.display = "none";
    fallback.classList.add("active");
    fallback.innerHTML = <h2>${escapeHTML(page.title || "Trang sách")}</h2><p>${escapeHTML(page.text || "Hãy kiểm tra lại đường dẫn hình ảnh trong app.js.")}</p>;
  };
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function stopInstrument() {
  instrumentAudio.pause();
  instrumentAudio.currentTime = 0;
  instrumentPlay.classList.remove("playing");
  instrumentPlay.querySelector(".sound-label").textContent = "Nghe âm thanh";
}

function updateInstrumentControl() {
  stopInstrument();
  const page = pages[currentPage];
  if (page && page.audio) {
    instrumentControl.classList.remove("hidden");
    instrumentAudio.src = page.audio;
    instrumentPlay.querySelector(".sound-label").textContent = Nghe ${page.instrument || "nhạc cụ"};
  } else {
    instrumentControl.classList.add("hidden");
    instrumentAudio.removeAttribute("src");
  }
}

function updateReader() {
  const page = pages[currentPage];
  setPageVisual(currentImage, currentFallback, page);
  setPageVisual(nextImage, nextFallback, pages[currentPage + 1]);
  pageNumber.textContent = currentPage + 1;
  totalPages.textContent = pages.length;
  prevButton.disabled = currentPage === 0;
  $("prevTextButton").disabled = currentPage === 0;
  nextButton.disabled = currentPage >= pages.length - 1;
  $("nextTextButton").disabled = currentPage >= pages.length - 1;
  updateInstrumentControl();
}

function startReading() {
  intro.classList.add("leaving");
  reader.classList.remove("hidden");
  currentPage = 0;
  updateReader();
  if (musicEnabled) backgroundMusic.play().catch(() => {});
}

function changePage(direction) {
  if (isAnimating) return;
  const target = currentPage + direction;
  if (target < 0 || target >= pages.length) return;
  isAnimating = true;
  stopInstrument();
  playPageTurn();

  // Trang phía trên lật đi, sau đó cập nhật nội dung trang.
  pageNext.classList.remove("flipping");
  void pageNext.offsetWidth;
  if (direction > 0) {
    setPageVisual(nextImage, nextFallback, pages[target]);
    pageNext.classList.add("flipping");
  } else {
    // Lật ngược: dùng chuyển động tương ứng để tạo cảm giác lật về trước.
    pageNext.style.transformOrigin = "right center";
    pageNext.style.animation = "pageTurnBack .72s cubic-bezier(.65,0,.35,1) forwards";
    setPageVisual(nextImage, nextFallback, pages[target]);
  }

  setTimeout(() => {
    currentPage = target;
    pageNext.classList.remove("flipping");
    pageNext.style.animation = "";
    pageNext.style.transformOrigin = "left center";
    pageNext.style.transform = "";
    updateReader();
    isAnimating = false;
  }, 730);
}

const backStyle = document.createElement("style");
backStyle.textContent = "@keyframes pageTurnBack{0%{transform:rotateY(0)}45%{box-shadow:18px 0 25px #0002}100%{transform:rotateY(180deg);box-shadow:18px 0 25px #0000}}";
document.head.appendChild(backStyle);

$("startButton").addEventListener("click", startReading);
nextButton.addEventListener("click", () => changePage(1));
$("nextTextButton").addEventListener("click", () => changePage(1));
prevButton.addEventListener("click", () => changePage(-1));
$("prevTextButton").addEventListener("click", () => changePage(-1));

instrumentPlay.addEventListener("click", async () => {
  if (!instrumentAudio.src) return;
  if (!instrumentAudio.paused) {
    instrumentAudio.pause();
    instrumentPlay.classList.remove("playing");
    instrumentPlay.querySelector(".sound-label").textContent = "Nghe lại";
    return;
  }
  backgroundMusic.volume = 0.06;
  try {
    await instrumentAudio.play();
    instrumentPlay.classList.add("playing");
    instrumentPlay.querySelector(".sound-label").textContent = "Đang phát";
  } catch (error) {
    showToast("Chưa tìm thấy file âm thanh. Hãy kiểm tra đường dẫn trong app.js.");
    backgroundMusic.volume = musicEnabled ? 0.24 : 0;
  }
});

instrumentAudio.addEventListener("ended", () => {
  instrumentPlay.classList.remove("playing");
  instrumentPlay.querySelector(".sound-label").textContent = "Nghe lại";
  backgroundMusic.volume = musicEnabled ? 0.24 : 0;
});
instrumentAudio.addEventListener("pause", () => {
  if (instrumentAudio.currentTime === 0) backgroundMusic.volume = musicEnabled ? 0.24 : 0;
});

$("musicToggle").addEventListener("click", async () => {
  musicEnabled = !musicEnabled;
  $("musicToggle").classList.toggle("active", musicEnabled);
  if (musicEnabled) {
    try { await backgroundMusic.play(); }
    catch { showToast("Hãy thêm file nhạc nền vào thư mục assets."); }
    $("musicToggle").textContent = "♫";
  } else {
    backgroundMusic.pause();
    backgroundMusic.volume = 0;
    $("musicToggle").textContent = "♪";
  }
});

$("backCoverButton").addEventListener("click", () => {
  stopInstrument();
  backgroundMusic.pause();
  reader.classList.add("hidden");
  intro.classList.remove("leaving");
  intro.classList.add("reveal");
  currentPage = 0;
});

$("tocButton").addEventListener("click", () => {
  const panel = $("tocPanel");
  const list = $("tocList");
  list.innerHTML = "";
  pages.forEach((page, index) => {
    const button = document.createElement("button");
    button.className = "toc-item";
    button.textContent = ${String(index + 1).padStart(2, "0")} · ${page.title || Trang ${index + 1}`}`;
    button.addEventListener("click", () => {
      stopInstrument();
      currentPage = index;
      updateReader();
      panel.classList.add("hidden");
    });
    list.appendChild(button);
  });
  panel.classList.toggle("hidden");
});
$("closeTocButton").addEventListener("click", () => $("tocPanel").classList.add("hidden"));

// Vuốt trái/phải trên điện thoại.
$("book").addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
$("book").addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 45) changePage(delta < 0 ? 1 : -1);
}, { passive: true });

// Phím mũi tên trái/phải trên máy tính.
document.addEventListener("keydown", (event) => {
  if (reader.classList.contains("hidden")) return;
  if (event.key === "ArrowRight") changePage(1);
  if (event.key === "ArrowLeft") changePage(-1);
});

updateReader();
