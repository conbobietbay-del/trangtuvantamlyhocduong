/* BỘ CÂU HỎI CHUẨN Y KHOA DỰA TRÊN TÀI LIỆU CÂU HỎI WEB.DOCX */

// 1. Dữ liệu câu hỏi cho từng Mục
const QUIZ_DATA = {
  // MỤC HỌC TẬP & CÔNG VIỆC (MBI - Kiệt sức / Burnout)
  study: {
    title: "Đánh Giá Mức Độ Kiệt Sức trong Học Tập & Công Việc (MBI)",
    questions: [
      {
        q: "Bạn cảm thấy kiệt sức về mặt tinh thần sau một ngày làm việc / học tập?",
        options: [
          { text: "Chưa bao giờ", score: 0 },
          { text: "Hiếm khi", score: 1 },
          { text: "Thỉnh thoảng", score: 2 },
          { text: "Thường xuyên", score: 3 },
          { text: "Luôn luôn", score: 4 }
        ]
      },
      {
        q: "Bạn cảm thấy mệt mỏi ngay từ buổi sáng khi nghĩ đến việc phải bắt đầu một ngày mới?",
        options: [
          { text: "Chưa bao giờ", score: 0 },
          { text: "Hiếm khi", score: 1 },
          { text: "Thỉnh thoảng", score: 2 },
          { text: "Thường xuyên", score: 3 },
          { text: "Luôn luôn", score: 4 }
        ]
      },
      {
        q: "Bạn cảm thấy bản thân ngày càng trở nên thờ ơ, thiếu quan tâm hoặc chai sạn với công việc/học tập?",
        options: [
          { text: "Chưa bao giờ", score: 0 },
          { text: "Hiếm khi", score: 1 },
          { text: "Thỉnh thoảng", score: 2 },
          { text: "Thường xuyên", score: 3 },
          { text: "Luôn luôn", score: 4 }
        ]
      },
      {
        q: "Bạn nghi ngờ về ý nghĩa hoặc giá trị công việc / việc học mà mình đang làm?",
        options: [
          { text: "Chưa bao giờ", score: 0 },
          { text: "Hiếm khi", score: 1 },
          { text: "Thỉnh thoảng", score: 2 },
          { text: "Thường xuyên", score: 3 },
          { text: "Luôn luôn", score: 4 }
        ]
      },
      {
        q: "Bạn cảm thấy mình làm việc / học tập kém hiệu quả hơn trước đây?",
        options: [
          { text: "Chưa bao giờ", score: 0 },
          { text: "Hiếm khi", score: 1 },
          { text: "Thỉnh thoảng", score: 2 },
          { text: "Thường xuyên", score: 3 },
          { text: "Luôn luôn", score: 4 }
        ]
      }
    ]
  },

  // MỤC GIẤC NGỦ (PSQI / ISI Rút gọn)
  sleep: {
    title: "Đánh Giá Chất Lượng Giấc Ngủ (PSQI)",
    questions: [
      {
        q: "Thông thường, bạn mất bao lâu để bắt đầu đi vào giấc ngủ sau khi tắt đèn?",
        options: [
          { text: "Dưới 15 phút", score: 0 },
          { text: "16 – 30 phút", score: 1 },
          { text: "31 – 60 phút", score: 2 },
          { text: "Trên 60 phút", score: 3 }
        ]
      },
      {
        q: "Bạn có thường xuyên bị thức giấc giữa đêm hoặc dậy quá sớm mà không ngủ lại được không?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "1 - 2 lần/tuần", score: 1 },
          { text: "3 - 4 lần/tuần", score: 2 },
          { text: "Hầu như mỗi đêm", score: 3 }
        ]
      },
      {
        q: "Bạn tự đánh giá chất lượng giấc ngủ của mình gần đây như thế nào?",
        options: [
          { text: "Rất tốt", score: 0 },
          { text: "Khá tốt", score: 1 },
          { text: "Khá tồi", score: 2 },
          { text: "Rất tồi", score: 3 }
        ]
      },
      {
        q: "Việc thiếu ngủ / mất ngủ làm ảnh hưởng đến năng lượng và sự tập trung ban ngày của bạn ở mức nào?",
        options: [
          { text: "Không ảnh hưởng", score: 0 },
          { text: "Ảnh hưởng ít", score: 1 },
          { text: "Ảnh hưởng nhiều", score: 2 },
          { text: "Rất nghiêm trọng", score: 3 }
        ]
      }
    ]
  },

  // MỤC LO ÂU & STRESS (GAD-7 & PSS-10 Chuẩn)
  anxiety: {
    title: "Đánh Giá Căng Thẳng & Lo Âu (GAD-7 & PSS-10)",
    questions: [
      {
        q: "Cảm thấy lo lắng, bồn chồn, căng thẳng hoặc bất an trong 2 tuần qua?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Vài ngày", score: 1 },
          { text: "Hơn một nửa số ngày", score: 2 },
          { text: "Hầu như mỗi ngày", score: 3 }
        ]
      },
      {
        q: "Không thể ngừng hoặc không kiểm soát được sự lo lắng?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Vài ngày", score: 1 },
          { text: "Hơn một nửa số ngày", score: 2 },
          { text: "Hầu như mỗi ngày", score: 3 }
        ]
      },
      {
        q: "Bạn có thường xuyên cảm thấy bực bội vì những điều xảy ra ngoài dự kiến không?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Hiếm khi", score: 1 },
          { text: "Đôi khi", score: 2 },
          { text: "Thường xuyên", score: 3 },
          { text: "Rất thường xuyên", score: 4 }
        ]
      },
      // Câu hỏi đảo (PSS-10): Bạn có thường cảm thấy tự tin vào khả năng xử lý vấn đề cá nhân?
      {
        q: "Bạn có thường cảm thấy tự tin vào khả năng xử lý các vấn đề cá nhân của mình không?",
        options: [
          { text: "Không bao giờ", score: 4 }, // Đảo điểm
          { text: "Hiếm khi", score: 3 },
          { text: "Đôi khi", score: 2 },
          { text: "Thường xuyên", score: 1 },
          { text: "Rất thường xuyên", score: 0 }
        ]
      },
      {
        q: "Bạn có thường cảm thấy các khó khăn dồn dập đến mức không thể vượt qua nổi không?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Hiếm khi", score: 1 },
          { text: "Đôi khi", score: 2 },
          { text: "Thường xuyên", score: 3 },
          { text: "Rất thường xuyên", score: 4 }
        ]
      }
    ]
  },

  // MỤC TÂM TRẠNG (PHQ-9 & C-SSRS Khẩn Cấp)
  mood: {
    title: "Đánh Giá Cảm Xúc & Tâm Trạng (PHQ-9 & C-SSRS)",
    questions: [
      // C-SSRS: Câu sàng lọc an toàn khẩn cấp
      {
        q: "[Sàng Lọc An Toàn] Bạn có từng suy nghĩ về việc tự làm tổn thương mình hoặc ước mình không còn thức dậy?",
        isSafetyCheck: true,
        options: [
          { text: "Không", score: 0, isDanger: false },
          { text: "Có, đôi lúc", score: 1, isDanger: true },
          { text: "Có, thường xuyên", score: 2, isDanger: true }
        ]
      },
      {
        q: "Ít hứng thú hoặc không còn niềm vui trong các hoạt động thường ngày?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Vài ngày", score: 1 },
          { text: "Hơn một nửa số ngày", score: 2 },
          { text: "Hầu như mỗi ngày", score: 3 }
        ]
      },
      {
        q: "Cảm thấy buồn chán, nản lòng, chán nản hoặc vô vọng?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Vài ngày", score: 1 },
          { text: "Hơn một nửa số ngày", score: 2 },
          { text: "Hầu như mỗi ngày", score: 3 }
        ]
      },
      {
        q: "Cảm thấy mệt mỏi, kiệt sức hoặc thiếu năng lượng?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Vài ngày", score: 1 },
          { text: "Hơn một nửa số ngày", score: 2 },
          { text: "Hầu như mỗi ngày", score: 3 }
        ]
      },
      {
        q: "Cảm thấy tồi tệ về bản thân — cảm thấy mình là người thất bại?",
        options: [
          { text: "Không bao giờ", score: 0 },
          { text: "Vài ngày", score: 1 },
          { text: "Hơn một nửa số ngày", score: 2 },
          { text: "Hầu như mỗi ngày", score: 3 }
        ]
      }
    ]
  }
};

// STATE MANAGEMENT
let currentCategory = null;
let currentQuestionIdx = 0;
let userAnswers = [];
let redirectTimer = null;

// CHUYỂN ĐỔI SECTION
function showSection(sectionId) {
  document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden-section'));
  document.getElementById(sectionId).classList.remove('hidden-section');

  // Cập nhật nút Nav active
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  if (sectionId === 'categories-section') document.getElementById('nav-categories-btn').classList.add('active');
  if (sectionId === 'chat-section') document.getElementById('nav-chat-btn').classList.add('active');
}

// BẮT ĐẦU BÀI ĐÁNH GIÁ
function startAssessment(categoryKey) {
  currentCategory = categoryKey;
  currentQuestionIdx = 0;
  userAnswers = [];
  document.getElementById('emergency-banner').classList.add('hidden');

  showSection('quiz-section');
  renderQuestion();
}

function renderQuestion() {
  const catData = QUIZ_DATA[currentCategory];
  const qData = catData.questions[currentQuestionIdx];

  document.getElementById('quiz-title').innerText = catData.title;
  document.getElementById('question-text').innerText = `${currentQuestionIdx + 1}. ${qData.q}`;
  
  // Update progress
  const progressPercent = ((currentQuestionIdx + 1) / catData.questions.length) * 100;
  document.getElementById('quiz-progress').style.width = `${progressPercent}%`;

  // Render options
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  qData.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt.text;
    btn.onclick = () => handleSelectOption(opt, qData);
    container.appendChild(btn);
  });
}

// XỬ LÝ CHỌN CÂU TRẢ LỜI
function handleSelectOption(option, questionData) {
  // Kiểm tra C-SSRS Nguy cơ khẩn cấp
  if (questionData.isSafetyCheck && option.isDanger) {
    document.getElementById('emergency-banner').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  userAnswers.push(option.score);

  const catData = QUIZ_DATA[currentCategory];
  if (currentQuestionIdx < catData.questions.length - 1) {
    currentQuestionIdx++;
    renderQuestion();
  } else {
    finishAssessment();
  }
}

function cancelQuiz() {
  showSection('categories-section');
}

// HOÀN THÀNH & TÍNH ĐIỂM
function finishAssessment() {
  const totalScore = userAnswers.reduce((sum, val) => sum + val, 0);
  const maxScore = QUIZ_DATA[currentCategory].questions.reduce((sum, q) => sum + (q.options.length - 1), 0);

  document.getElementById('total-score-display').innerText = totalScore;
  document.getElementById('max-score-display').innerText = `/${maxScore}`;

  // Đánh giá dựa trên tổng điểm
  let title = "";
  let desc = "";
  let exercises = [];

  if (totalScore <= maxScore * 0.3) {
    title = "Tình Trạng: Tốt & Ổn Định 🌿";
    desc = "Bạn đang kiểm soát tốt tinh thần và cảm xúc của mình. Hãy tiếp tục duy trì lối sống lành mạnh này nhé!";
    exercises = [
      { name: "Thiền Hít Thở 4-7-8", duration: "5 phút", desc: "Giúp duy trì sự bình tĩnh và tập trung nhẹ nhàng." },
      { name: "Nhật Ký Biết Ơn", duration: "10 phút", desc: "Ghi lại 3 điều tích cực diễn ra trong ngày." }
    ];
  } else if (totalScore <= maxScore * 0.6) {
    title = "Tình Trạng: Căng Thẳng Nhẹ / Cần Chú Ý ⚠️";
    desc = "Bạn đang trải qua một chút áp lực hoặc mệt mỏi. Đã đến lúc dành thêm thời gian nghỉ ngơi và thư giãn.";
    exercises = [
      { name: "Thiền Quét Cơ Thể (Body Scan)", duration: "10 phút", desc: "Giải tỏa căng thẳng tích tụ ở cổ, vai, gáy." },
      { name: "Đi Bộ Thả Lỏng Mindful Walking", duration: "15 phút", desc: "Kết nối lại với thiên nhiên và điều hòa nhịp thở." }
    ];
  } else {
    title = "Tình Trạng: Quá Tải / Cần Hỗ Trợ 🧡";
    desc = "Điểm số cho thấy bạn đang chịu áp lực khá lớn. Đừng ngần ngại chia sẻ với người thân hoặc tìm kiếm tư vấn từ chuyên gia.";
    exercises = [
      { name: "Thiền Định Hướng Cảm Xúc", duration: "15 phút", desc: "Xoa dịu sự lo âu và lắng nghe những tổn thương nội tâm." },
      { name: "Bài Tập Thả Lỏng Cơ Tiến Triển (PMR)", duration: "12 phút", desc: "Giảm gồng căng cơ thể cực kỳ hiệu quả." }
    ];
  }

  document.getElementById('result-title').innerText = title;
  document.getElementById('result-description').innerText = desc;

  // Render bài tập thiền
  const exContainer = document.getElementById('meditation-recommendations');
  exContainer.innerHTML = '';
  exercises.forEach(ex => {
    exContainer.innerHTML += `
      <div class="ex-card">
        <h4><i class="fa-solid fa-spa"></i> ${ex.name} (${ex.duration})</h4>
        <p style="font-size: 0.85rem; color: #555; margin-top: 5px;">${ex.desc}</p>
      </div>
    `;
  });

  showSection('result-section');

  // Đếm ngược 5s chuyển sang Chatbot
  startCountdownToChat(totalScore, title);
}

// ĐẾM NGƯỢC CHUYỂN SANG CHATBOT AI
function startCountdownToChat(score, resultTitle) {
  let timeLeft = 5;
  const timerElem = document.getElementById('countdown-timer');
  timerElem.innerText = timeLeft;

  if (redirectTimer) clearInterval(redirectTimer);

  redirectTimer = setInterval(() => {
    timeLeft--;
    timerElem.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(redirectTimer);
      goToChatWithContext(score, resultTitle);
    }
  }, 1000);
}

function goToChatNow() {
  if (redirectTimer) clearInterval(redirectTimer);
  const totalScore = document.getElementById('total-score-display').innerText;
  const resultTitle = document.getElementById('result-title').innerText;
  goToChatWithContext(totalScore, resultTitle);
}

function goToChatWithContext(score, resultTitle) {
  showSection('chat-section');
  const chatMessages = document.getElementById('chat-messages');

  // Tạo lời chào cá nhân hóa dựa trên kết quả đánh giá vừa hoàn thành
  const initialBotMsg = `Xin chào! Mình đã nhận được kết quả bài đánh giá vừa rồi của bạn: **"${resultTitle}"** (${score} điểm).\n\nMình ở đây để lắng nghe bạn tâm sự sâu hơn hoặc gợi ý thêm các bài tập thư giãn. Hôm nay bạn thấy thế nào?`;

  chatMessages.innerHTML = `<div class="msg bot">${initialBotMsg.replace(/\n/g, '<br>')}</div>`;
}

// XỬ LÝ TRÒ CHUYỆN CHATBOT AI
function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const chatMessages = document.getElementById('chat-messages');

  // User Message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'msg user';
  userMsgDiv.innerText = text;
  chatMessages.appendChild(userMsgDiv);

  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Bot Phản hồi tự động (Phản hồi thông minh, ấm áp)
  setTimeout(() => {
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'msg bot';
    botMsgDiv.innerHTML = getAIResponse(text);
    chatMessages.appendChild(botMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

function getAIResponse(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes('mệt') || lower.includes('áp lực') || lower.includes('stress')) {
    return "Mình cảm nhận được sự mệt mỏi của bạn. Hãy thử hít một hơi thật sâu, thả lỏng đôi vai nhé. Bạn có muốn chia sẻ cụ thể hơn điều gì đang làm bạn bận tâm không?";
  } else if (lower.includes('ngủ') || lower.includes('mất ngủ')) {
    return "Giấc ngủ rất quan trọng đối với năng lượng của bạn. Trước khi ngủ 30 phút, bạn thử tắt điện thoại và nghe một bản nhạc không lời nhẹ nhàng xem sao nhé!";
  } else {
    return "Cảm ơn bạn đã mở lòng chia sẻ. Mình luôn ở đây để đồng hành và lắng nghe bạn. Bạn có muốn mình gợi ý thêm một bài tập thiền nhẹ nhàng không?";
  }
}
