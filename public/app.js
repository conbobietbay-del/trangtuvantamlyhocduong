// app.js — logic phía trình duyệt cho trang "Lối Về"
// Trang chủ có 4 chủ đề: HỌC TẬP / GIẤC NGỦ / LO ÂU / TÂM TRẠNG
// Mỗi chủ đề có bộ 7 câu hỏi riêng, thang điểm 0-3 mỗi câu, tổng nhân 2 (giống cách quy đổi DASS-21)
// LƯU Ý: đây là công cụ sàng lọc tham khảo, KHÔNG phải công cụ chẩn đoán y khoa.

(function () {
  "use strict";

  /* ---------------- Dữ liệu 4 chủ đề ---------------- */

  const TOPICS = {
    hoctap: {
      label: "Học tập",
      questions: [
        "Tôi cảm thấy áp lực nặng nề mỗi khi nghĩ đến bài kiểm tra hoặc kỳ thi sắp tới.",
        "Tôi khó tập trung khi ngồi vào bàn học, dù đã cố gắng.",
        "Tôi lo mình sẽ làm bố mẹ hoặc thầy cô thất vọng vì kết quả học tập.",
        "Tôi thấy khối lượng bài vở hiện tại vượt quá khả năng của mình.",
        "Tôi hay so sánh thành tích của mình với bạn bè và cảm thấy thua kém.",
        "Tôi mất hứng thú với việc học, kể cả những môn mình từng thích.",
        "Tôi thức khuya học bài đến mức ảnh hưởng đến sức khỏe.",
      ],
      thresholds: [ [14, "normal"], [18, "mild"], [25, "moderate"], [33, "severe"], [Infinity, "extreme"] ],
    },
    giacngu: {
      label: "Giấc ngủ",
      questions: [
        "Tôi mất nhiều thời gian mới có thể chìm vào giấc ngủ mỗi tối.",
        "Tôi hay tỉnh giấc giữa đêm và khó ngủ lại.",
        "Tôi thức dậy vào buổi sáng mà vẫn cảm thấy mệt mỏi, không tỉnh táo.",
        "Suy nghĩ về bài vở hoặc lo lắng khiến tôi khó thư giãn trước khi ngủ.",
        "Tôi thường ngủ ít hơn 6 tiếng mỗi đêm vì bận học hoặc dùng điện thoại.",
        "Giờ giấc ngủ của tôi thất thường, không theo một nhịp cố định.",
        "Tôi cảm thấy buồn ngủ hoặc uể oải vào ban ngày, ảnh hưởng đến việc học.",
      ],
      thresholds: [ [10, "normal"], [14, "mild"], [20, "moderate"], [28, "severe"], [Infinity, "extreme"] ],
    },
    loau: {
      label: "Lo âu",
      questions: [
        "Tôi thấy tim đập nhanh hoặc hồi hộp dù không vận động hay gặp nguy hiểm gì.",
        "Tôi hay cảm thấy lo sợ vô cớ, dù không có lý do rõ ràng nào cả.",
        "Tay chân tôi run hoặc đổ mồ hôi khi phải đối mặt với một tình huống áp lực.",
        "Tôi từng cảm thấy khó thở hoặc nghẹn ở ngực khi lo lắng, dù không bị bệnh về hô hấp.",
        "Tôi dễ hoảng hốt hoặc lo lắng quá mức trước những việc bình thường.",
        "Tôi lo sợ mình sẽ bị đánh giá, chê cười hoặc thất bại trước mặt người khác.",
        "Tôi cảm nhận rõ cơ thể mình phản ứng (tim đập, đổ mồ hôi, run) khi chỉ mới nghĩ đến việc gì đó.",
      ],
      thresholds: [ [7, "normal"], [9, "mild"], [14, "moderate"], [19, "severe"], [Infinity, "extreme"] ],
    },
    tamtrang: {
      label: "Tâm trạng",
      questions: [
        "Gần đây tôi thấy khó tìm được điều gì khiến mình thật sự vui hay hứng thú.",
        "Tôi cảm thấy mình chẳng còn gì để mong đợi trong những ngày sắp tới.",
        "Tôi thấy uể oải, không có động lực để bắt đầu làm bất cứ việc gì.",
        "Tôi cảm thấy bản thân không có nhiều giá trị hoặc không giỏi giang như người khác.",
        "Tôi cảm thấy buồn và chán nản mà không rõ vì sao.",
        "Tôi thấy khó vực dậy tinh thần, kể cả khi có người động viên.",
        "Tôi cảm thấy cuộc sống hiện tại khá vô nghĩa hoặc tẻ nhạt.",
      ],
      thresholds: [ [9, "normal"], [13, "mild"], [20, "moderate"], [27, "severe"], [Infinity, "extreme"] ],
    },
  };

  const OPTIONS = [
    { value: 0, label: "Không đúng với tôi chút nào" },
    { value: 1, label: "Đúng một phần, thỉnh thoảng" },
    { value: 2, label: "Đúng khá nhiều, khá thường xuyên" },
    { value: 3, label: "Hoàn toàn đúng, hầu như luôn vậy" },
  ];

  const LEVEL_LABEL = {
    normal: "Bình thường",
    mild: "Nhẹ",
    moderate: "Vừa phải",
    severe: "Khá cao",
    extreme: "Rất cao",
  };

  const SCORE_MAX = 42; // 7 câu x 3 điểm x 2

  /* ---------------- State ---------------- */

  let currentTopic = null;
  let answers = [];
  let currentQ = 0;

  /* ---------------- Helpers điều hướng màn hình ---------------- */

  const screens = ["home", "quiz", "loading", "result", "solution", "final"];
  function showScreen(name) {
    screens.forEach((s) => {
      document.getElementById("screen-" + s).classList.toggle("active", s === name);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------- Trang chủ: chọn chủ đề ---------------- */

  document.querySelectorAll(".category-start").forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-topic");
      startQuiz(topic);
    });
  });

  function startQuiz(topicKey) {
    currentTopic = topicKey;
    answers = new Array(TOPICS[topicKey].questions.length).fill(null);
    currentQ = 0;
    showScreen("quiz");
    renderQuestion();
  }

  /* ---------------- Nhạc nền ---------------- */

  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle");
  let musicOn = false;

  musicBtn.addEventListener("click", () => {
    musicOn = !musicOn;
    if (musicOn) {
      music.play().catch(() => {
        // Nếu chưa có file nhạc trong /public/audio/nhac-nen.mp3, trình duyệt sẽ báo lỗi im lặng
        console.warn("Chưa tìm thấy file nhạc nền. Hãy thêm file vào public/audio/nhac-nen.mp3");
      });
      musicBtn.classList.add("playing");
    } else {
      music.pause();
      musicBtn.classList.remove("playing");
    }
  });

  /* ---------------- Bài kiểm tra ---------------- */

  const qCategoryEl = document.getElementById("q-category");
  const qTextEl = document.getElementById("q-text");
  const qOptionsEl = document.getElementById("q-options");
  const qCurrentEl = document.getElementById("q-current");
  const qTotalEl = document.getElementById("q-total");
  const progressFill = document.getElementById("progress-fill");
  const btnBack = document.getElementById("btn-back");
  const btnNext = document.getElementById("btn-next");

  function renderQuestion() {
    const topic = TOPICS[currentTopic];
    qTotalEl.textContent = topic.questions.length;
    qCategoryEl.textContent = topic.label;
    qTextEl.textContent = topic.questions[currentQ];
    qCurrentEl.textContent = currentQ + 1;
    progressFill.style.width = (((currentQ + 1) / topic.questions.length) * 100).toFixed(1) + "%";

    qOptionsEl.innerHTML = "";
    OPTIONS.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "q-option" + (answers[currentQ] === opt.value ? " selected" : "");
      btn.innerHTML = `<span class="dot"></span><span>${opt.label}</span>`;
      btn.addEventListener("click", () => {
        answers[currentQ] = opt.value;
        renderQuestion();
        setTimeout(() => { if (currentQ < topic.questions.length - 1) goNext(); else updateNavState(); }, 260);
      });
      qOptionsEl.appendChild(btn);
    });

    btnBack.style.visibility = currentQ === 0 ? "hidden" : "visible";
    updateNavState();
  }

  function updateNavState() {
    const topic = TOPICS[currentTopic];
    btnNext.disabled = answers[currentQ] === null;
    btnNext.textContent = currentQ === topic.questions.length - 1 ? "Xem kết quả" : "Tiếp theo";
  }

  function goNext() {
    const topic = TOPICS[currentTopic];
    if (answers[currentQ] === null) return;
    if (currentQ < topic.questions.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  btnNext.addEventListener("click", goNext);
  btnBack.addEventListener("click", () => {
    if (currentQ > 0) { currentQ--; renderQuestion(); }
  });

  /* ---------------- Tính điểm & kết quả ---------------- */

  function computeScore() {
    const raw = answers.reduce((sum, v) => sum + (v || 0), 0);
    // Quy đổi: nhân đôi tổng điểm (giống cách tính thang 21 câu gốc)
    return raw * 2;
  }

  function levelFor(topicKey, score) {
    for (const [max, level] of TOPICS[topicKey].thresholds) {
      if (score <= max) return level;
    }
    return "extreme";
  }

  function finishQuiz() {
    showScreen("loading");
    setTimeout(() => {
      const score = computeScore();
      renderResults(score);
      showScreen("result");
    }, 1300);
  }

  const resultCardsEl = document.getElementById("result-cards");
  const alertBanner = document.getElementById("alert-banner");
  let lastLevel = "normal";

  function renderResults(score) {
    resultCardsEl.innerHTML = "";
    const topic = TOPICS[currentTopic];
    const level = levelFor(currentTopic, score);
    lastLevel = level;
    const hasAlert = level === "severe" || level === "extreme";

    const pct = Math.min(100, (score / SCORE_MAX) * 100);
    const card = document.createElement("div");
    card.className = `result-card level-${level}`;
    card.innerHTML = `
      <p class="rc-label">${topic.label}</p>
      <div class="rc-bar-track"><div class="rc-bar-fill" style="width:${pct}%"></div></div>
      <p class="rc-level">${LEVEL_LABEL[level]}</p>
      <p class="rc-score">${score} / ${SCORE_MAX} điểm</p>
    `;
    resultCardsEl.appendChild(card);

    alertBanner.classList.toggle("hidden", !hasAlert);

    if (hasAlert) {
      // Ghi nhận (phía server) khi phát hiện điểm số ở mức cần quan tâm — không lưu danh tính học sinh
      fetch("/api/canh-bao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chuDe: currentTopic, mucDo: level, thoiGian: new Date().toISOString() }),
      }).catch(() => {});
    }
  }

  /* ---------------- Trang giải pháp ---------------- */

  const SOLUTION_CONTENT = {
    normal: {
      title: "Bạn đang giữ cân bằng khá tốt — hãy tiếp tục nuôi dưỡng điều đó",
      intro: "Không có dấu hiệu đáng lo ngại rõ rệt. Đây là lúc phù hợp để xây những thói quen giúp bạn duy trì trạng thái ổn định này.",
      tips: [
        { icon: "🌿", title: "Giữ nhịp sinh hoạt đều", body: "Ngủ đủ giấc, ăn đúng bữa và dành thời gian cho việc mình thích mỗi ngày." },
        { icon: "🤝", title: "Kết nối với bạn bè", body: "Duy trì những cuộc trò chuyện, chia sẻ nhỏ với người bạn tin tưởng." },
        { icon: "📓", title: "Ghi lại điều tích cực", body: "Mỗi tối viết ra một điều khiến bạn thấy ổn trong ngày hôm đó." },
      ],
    },
    mild: {
      title: "Bạn đang có một vài dấu hiệu căng thẳng nhẹ — hoàn toàn có thể điều chỉnh được",
      intro: "Những cảm xúc này khá phổ biến ở lứa tuổi học sinh, đặc biệt trong giai đoạn thi cử. Một vài thay đổi nhỏ có thể giúp ích rất nhiều.",
      tips: [
        { icon: "🧘", title: "Dành 10 phút mỗi ngày để thở chậm", body: "Thử bài tập thở bên dưới, đều đặn mỗi tối trước khi ngủ." },
        { icon: "📵", title: "Giảm thời gian trên màn hình trước giờ ngủ", body: "Thử tắt điện thoại sớm hơn 30 phút mỗi tối." },
        { icon: "🚶", title: "Vận động nhẹ ngoài trời", body: "Một đoạn đi bộ 15–20 phút có thể giúp đầu óc dễ chịu hơn." },
      ],
    },
    moderate: {
      title: "Cảm xúc của bạn đang khá nặng — bạn xứng đáng được hỗ trợ nhiều hơn",
      intro: "Đây là mức độ nên được quan tâm nghiêm túc. Bên cạnh việc tự chăm sóc bản thân, hãy cân nhắc trò chuyện với người bạn tin tưởng hoặc thầy cô tư vấn.",
      tips: [
        { icon: "💬", title: "Chia sẻ với người bạn tin tưởng", body: "Không cần kể hết mọi chuyện — chỉ cần bắt đầu bằng một câu 'Dạo này mình không ổn lắm'." },
        { icon: "🏫", title: "Gặp phòng tư vấn tâm lý của trường", body: "Đây là nơi được lập ra chính vì những lúc như thế này." },
        { icon: "🛌", title: "Ưu tiên giấc ngủ", body: "Cơ thể mệt mỏi khiến cảm xúc khó ổn định hơn — hãy cố ngủ đủ 7–8 tiếng." },
      ],
    },
    severe: {
      title: "Bạn đang trải qua một giai đoạn khó khăn thật sự",
      intro: "Những gì bạn đang cảm nhận là có thật và quan trọng. Bạn không cần phải tự mình vượt qua tất cả — hãy tìm đến một người lớn đáng tin cậy hoặc chuyên gia càng sớm càng tốt.",
      tips: [
        { icon: "📞", title: "Liên hệ đường dây hỗ trợ", body: "Các số điện thoại ở trang kết quả luôn sẵn sàng lắng nghe, miễn phí và bảo mật." },
        { icon: "👨‍👩‍👧", title: "Nói với người thân hoặc giáo viên chủ nhiệm", body: "Bạn không cần giải thích hoàn hảo — chỉ cần cho họ biết bạn đang cần được giúp đỡ." },
        { icon: "🕊️", title: "Cho phép bản thân nghỉ ngơi", body: "Tạm gác lại kỳ vọng về thành tích trong lúc này — sức khoẻ tinh thần được ưu tiên trước." },
      ],
    },
    extreme: {
      title: "Bạn đang cần được hỗ trợ ngay lúc này",
      intro: "Cảm ơn bạn đã trung thực với chính mình. Đây là lúc rất cần có người đồng hành trực tiếp — hãy liên hệ ngay với đường dây hỗ trợ hoặc người lớn bạn tin tưởng nhất, ngay hôm nay nếu có thể.",
      tips: [
        { icon: "📞", title: "Gọi ngay 111 hoặc 1900 9204", body: "Luôn có người trực để lắng nghe bạn, 24/7, hoàn toàn miễn phí." },
        { icon: "🚪", title: "Đừng ở một mình lúc này", body: "Hãy tìm đến bố mẹ, thầy cô, hoặc một người bạn thân để ở cạnh bạn." },
        { icon: "🏥", title: "Tìm đến chuyên gia tâm lý càng sớm càng tốt", body: "Phòng tư vấn trường học hoặc bệnh viện gần nhất đều có thể giúp bạn." },
      ],
    },
  };

  document.getElementById("btn-see-solution").addEventListener("click", () => {
    const content = SOLUTION_CONTENT[lastLevel] || SOLUTION_CONTENT.normal;

    document.getElementById("solution-title").textContent = content.title;
    document.getElementById("solution-intro").textContent = content.intro;

    const tipsGrid = document.getElementById("solution-tips");
    tipsGrid.innerHTML = content.tips.map((t) => `
      <div class="tip-card">
        <span class="tip-icon">${t.icon}</span>
        <h4>${t.title}</h4>
        <p>${t.body}</p>
      </div>
    `).join("");

    showScreen("solution");
  });

  /* ---------------- Bài tập thở ---------------- */

  const btnBreathe = document.getElementById("btn-breathe");
  const exerciseCircle = document.getElementById("exercise-circle");
  const exerciseCaption = document.getElementById("exercise-caption");
  let breatheTimer = null;

  btnBreathe.addEventListener("click", () => {
    if (breatheTimer) { clearInterval(breatheTimer); breatheTimer = null; }
    const steps = [
      { text: "Hít vào chậm rãi...", dur: 4000 },
      { text: "Giữ hơi thở...", dur: 7000 },
      { text: "Thở ra thật chậm...", dur: 8000 },
    ];
    let i = 0;
    exerciseCircle.style.animationDuration = "19s";
    const run = () => {
      exerciseCaption.textContent = steps[i].text;
      breatheTimer = setTimeout(() => {
        i = (i + 1) % steps.length;
        run();
      }, steps[i].dur);
    };
    run();
  });

  document.getElementById("btn-see-final").addEventListener("click", () => {
    const finalMsgEl = document.getElementById("final-message");
    const finalSubEl = document.getElementById("final-sub");

    if (lastLevel === "severe" || lastLevel === "extreme") {
      finalMsgEl.textContent = "Bạn đã rất dũng cảm khi đối diện với cảm xúc của mình hôm nay.";
      finalSubEl.textContent = "Hãy để ai đó đồng hành cùng bạn trong những bước tiếp theo — bạn không cần phải một mình.";
    } else {
      finalMsgEl.textContent = "Cảm ơn bạn đã dành thời gian cho chính mình hôm nay.";
      finalSubEl.textContent = "Dù kết quả hôm nay là gì, việc bạn quan tâm đến cảm xúc của mình đã là một điều đáng quý.";
    }
    showScreen("final");
  });

  document.getElementById("btn-restart").addEventListener("click", () => {
    currentTopic = null;
    answers = [];
    currentQ = 0;
    lastLevel = "normal";
    showScreen("home");
  });

})();
