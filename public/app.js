// Dữ liệu bộ câu hỏi chuyên sâu chuẩn y khoa (MBI, PSS-10, PSQI, GAD-7, PHQ-9, C-SSRS)
const quizData = {
    'hoc-tap': {
        title: 'Đánh Giá Căng Thẳng Học Tập & Kiệt Sức (Burnout)',
        questions: [
            { q: "1. Bạn cảm thấy kiệt sức về mặt tinh thần sau một ngày học tập / làm việc căng thẳng?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Gần như luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "2. Bạn cảm thấy mệt mỏi ngay từ buổi sáng khi nghĩ đến việc phải bắt đầu công việc/buổi học?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Gần như luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "3. Bạn cảm thấy bản thân ngày càng trở nên thờ ơ, thiếu quan tâm hoặc xa cách với việc học?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Gần như luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "4. Bạn hoài nghi về ý nghĩa hoặc giá trị thực sự của công việc/ngành học mình đang theo đuổi?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Gần như luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "5. Trong tháng qua, bạn có cảm thấy mình không thể kiểm soát được những việc quan trọng?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Đôi khi (2)", "Thường xuyên (3)", "Rất thường xuyên (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "6. Bạn có cảm thấy các khó khăn dồn dập đến mức bản thân không thể vượt qua nổi?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Đôi khi (2)", "Thường xuyên (3)", "Rất thường xuyên (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "7. Bạn có cảm thấy khó khăn trong việc duy trì sự tập trung khi nghe giảng hoặc làm bài tập?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Đôi khi (2)", "Thường xuyên (3)", "Rất thường xuyên (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "8. Bạn có cảm thấy áp lực thành tích hoặc điểm số đang đè nặng lên tâm trí mỗi ngày?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Đôi khi (2)", "Thường xuyên (3)", "Rất thường xuyên (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "9. Bạn có suy nghĩ muốn từ bỏ, buông xuôi hoặc trốn chạy khỏi nhiệm vụ học tập hiện tại?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Đôi khi (2)", "Thường xuyên (3)", "Rất thường xuyên (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "10. Bạn có từng mong muốn mình biến mất hoặc ước mình ngủ đi mà không cần thức dậy?", opts: ["Không", "Có, đôi lúc", "Có, rất thường xuyên"], danger: true }
        ]
    },
    'giac-ngu': {
        title: 'Khảo Sát Chất Lượng Giấc Ngủ & Rối Loạn Nhịp Sinh Học',
        questions: [
            { q: "1. Bạn thường mất bao lâu trằn trọc trên giường mới có thể đi vào giấc ngủ?", opts: ["Dưới 15 phút (0)", "16 - 30 phút (1)", "31 - 60 phút (2)", "Trên 60 phút (3)"], scores: [0, 1, 2, 3] },
            { q: "2. Tần suất bạn giật mình thức giấc giữa đêm hoặc tỉnh dậy quá sớm mà không ngủ lại được?", opts: ["Không bao giờ (0)", "1 - 2 lần/tuần (1)", "3 - 4 lần/tuần (2)", "Hầu như mỗi đêm (3)"], scores: [0, 1, 2, 3] },
            { q: "3. Bạn đánh giá chất lượng giấc ngủ tổng thể của mình trong 2 tuần qua như thế nào?", opts: ["Rất tốt (0)", "Khá tốt (1)", "Khá tồi (2)", "Rất tồi (3)"], scores: [0, 1, 2, 3] },
            { q: "4. Bạn có cảm thấy ngái ngủ, uể uải hoặc thiếu năng lượng nghiêm trọng vào ban ngày?", opts: ["Không bao giờ (0)", "Đôi khi (1)", "Thường xuyên (2)", "Rất nghiêm trọng (3)"], scores: [0, 1, 2, 3] },
            { q: "5. Tình trạng mất ngủ có làm ảnh hưởng tiêu cực đến tâm trạng và khả năng làm việc của bạn?", opts: ["Không ảnh hưởng (0)", "Ảnh hưởng ít (1)", "Ảnh hưởng nhiều (2)", "Ảnh hưởng rất nặng nề (3)"], scores: [0, 1, 2, 3] },
            { q: "6. Bạn có phải phụ thuộc vào thuốc ngủ, chất kích thích hoặc trà/cà phê để duy trì thức?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Thường xuyên (2)", "Luôn luôn (3)"], scores: [0, 1, 2, 3] },
            { q: "7. Bạn có hay gặp ác mộng, giật mình hoặc cảm thấy bồn chồn lo lắng trước khi đi ngủ?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Thường xuyên (2)", "Rất thường xuyên (3)"], scores: [0, 1, 2, 3] }
        ]
    },
    'lo-au': {
        title: 'Sàng Lọc Mức Độ Lo Âu (Thang Đo GAD-7)',
        questions: [
            { q: "1. Cảm thấy lo lắng, bồn chồn, căng thẳng hoặc luôn trong trạng thái bất an?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "2. Cảm thấy không thể ngừng lại hoặc không kiểm soát được sự lo lắng dồn dập?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "3. Lo lắng quá mức về nhiều chủ đề hoặc sự kiện khác nhau trong cuộc sống?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "4. Gặp khó khăn lớn trong việc thả lỏng hoặc thư giãn đầu óc?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "5. Bồn chồn đến mức đứng ngồi không yên, phải đi qua đi lại?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "6. Trở nên dễ cáu gắt, gắt gỏng hoặc bực bội vì những điều nhỏ nhặt?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "7. Cảm thấy sợ hãi như thể có điều gì đó cực kỳ tồi tệ sắp sửa xảy ra?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "8. Xuất hiện các triệu chứng thể chất như tim đập nhanh, nghẹt thở, đổ mồ hôi do lo âu?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] }
        ]
    },
    'tam-trang': {
        title: 'Đánh Giá Tâm Trạng & Sàng Lọc Trầm Cảm (PHQ-9 & C-SSRS)',
        questions: [
            { q: "1. Giảm hẳn hứng thú hoặc không còn tìm thấy niềm vui trong các hoạt động ưa thích?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "2. Cảm thấy buồn chán, nản lòng, tuyệt vọng hoặc trống rỗng nội tâm?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "3. Cảm thấy mệt mỏi, kiệt sức hoặc luôn trong tình trạng thiếu hụt năng lượng?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "4. Cảm thấy tồi tệ về bản thân — tự trách mình là người thất bại hoặc làm gia đình thất vọng?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "5. Khó tập trung khi đọc sách, làm việc hoặc theo dõi cuộc trò chuyện?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "6. Di chuyển hoặc nói năng chậm chạp hơn, hoặc ngược lại là bồn chồn không thể ngồi yên?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "7. Bạn có suy nghĩ về việc tự làm tổn thương bản thân hoặc tự sát?", opts: ["Không", "Có, đôi lúc", "Có, rất thường xuyên"], danger: true }
        ]
    }
};

let currentCategory = '';

// Chuyển đổi linh hoạt giữa các màn hình
function showSection(sectionId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Bắt đầu bài đánh giá
function startAssessment(category) {
    currentCategory = category;
    const quiz = quizData[category];
    if (!quiz) return;

    document.getElementById('quiz-title').innerText = quiz.title;
    
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    quiz.questions.forEach((item, index) => {
        const qBlock = document.createElement('div');
        qBlock.className = 'question-block';
        
        let optionsHtml = item.opts.map((opt, optIndex) => `
            <label class="option-label">
                <input type="radio" name="q_${index}" value="${optIndex}" required>
                <span>${opt}</span>
            </label>
        `).join('');

        qBlock.innerHTML = `
            <div class="question-title">${item.q}</div>
            <div class="options-group">${optionsHtml}</div>
        `;
        container.appendChild(qBlock);
    });

    showSection('quiz-section');
}

// Nộp bài & Tính điểm
function submitQuiz() {
    const quiz = quizData[currentCategory];
    if (!quiz) return;

    let totalScore = 0;
    let isEmergency = false;

    for (let i = 0; i < quiz.questions.length; i++) {
        const selected = document.querySelector(`input[name="q_${i}"]:checked`);
        if (!selected) {
            alert(`Bạn chưa hoàn thành câu hỏi số ${i + 1}. Vui lòng chọn đáp án trước khi nộp bài nhé!`);
            return;
        }

        const val = parseInt(selected.value);
        const questionObj = quiz.questions[i];

        // Nếu là câu có yếu tố nguy hiểm và chọn từ tùy chọn thứ 2 trở đi (index > 0)
        if (questionObj.danger && val > 0) {
            isEmergency = true;
        }

        if (questionObj.scores) {
            totalScore += questionObj.scores[val];
        }
    }

    if (isEmergency) {
        triggerEmergency();
        return;
    }

    renderResults(totalScore);
}

// Trả kết quả & Gợi ý bài tập
function renderResults(score) {
    const scoreElem = document.getElementById('score-text');
    if (scoreElem) scoreElem.innerText = score;

    const badge = document.getElementById('level-badge');
    const analysis = document.getElementById('score-analysis');
    const exercises = document.getElementById('exercise-list');
    exercises.innerHTML = '';

    let levelText = '', analysisText = '', listEx = [];

    if (score <= 5) {
        levelText = "Bình Thường / Ổn Định Nội Tại";
        if (badge) badge.style.background = "#4bd3c4";
        analysisText = "Tâm trí bạn đang giữ được trạng thái cân bằng rất tốt. Hãy tiếp tục duy trì lối sống lành mạnh và nuôi dưỡng niềm vui mỗi ngày!";
        listEx = [
            "🌿 Thực hành Thiền chánh niệm (Mindfulness) 5 phút mỗi sáng",
            "🏃 Bào chế Endorphin qua 20 phút vận động nhẹ nhàng",
            "📖 Viết 3 điều biết ơn vào sổ tay trước khi đi ngủ"
        ];
    } else if (score <= 12) {
        levelText = "Căng Thẳng Vừa / Cần Nghỉ Ngơi";
        if (badge) badge.style.background = "#ffb703";
        analysisText = "Bạn đang gánh chịu một số áp lực hoặc mệt mỏi tích tụ. Đã đến lúc tạm gạt bỏ bớt công việc để chăm sóc lại bản thân.";
        listEx = [
            "🌬️ Bài tập hít thở vuông (Box Breathing): Hít 4s - Giữ 4s - Thở 4s - Nghỉ 4s",
            "🎧 Bật nhạc sóng não Alpha/Theta thư giãn sâu",
            "☕ Ngừng sử dụng thiết bị điện tử 45 phút trước khi đi ngủ"
        ];
    } else {
        levelText = "Mức Độ Cao / Cần Hỗ Trợ Chuyên Môn";
        if (badge) badge.style.background = "#ff4d4f";
        analysisText = "Sức khỏe tinh thần của bạn đang chịu tổn thương khá lớn. Việc tìm kiếm sự trợ giúp từ chuyên gia hoặc tâm sự mở lòng với người thân là điều vô cùng cần thiết.";
        listEx = [
            "🧘 Thiền quét cơ thể (Body Scan Meditation) xoa dịu vùng cơ căng thẳng",
            "📝 Phương pháp Journaling - Viết ra toàn bộ luồng suy nghĩ rối bời",
            "🗣️ Mở lòng tâm sự với người đáng tin cậy hoặc hẹn lịch gặp bác sĩ tâm lý"
        ];
    }

    if (badge) badge.innerText = levelText;
    if (analysis) analysis.innerText = analysisText;

    listEx.forEach(ex => {
        const li = document.createElement('li');
        li.innerText = ex;
        exercises.appendChild(li);
    });

    showSection('result-section');
}

// Từ khóa nguy hiểm kích hoạt Cảnh báo đỏ
const dangerKeywords = ["tự sát", "tự tử", "muốn chết", "kết thúc cuộc đời", "reset cuộc đời", "chết đi", "tự làm tổn thương", "kết liễu", "chán sống"];

function triggerEmergency() {
    const banner = document.getElementById('emergency-banner');
    if (banner) banner.classList.remove('hidden');
    showSection('home-section');
}

// Chatbot AI Tư Vấn
function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    // Kiểm tra từ khóa nguy cơ
    const containsDanger = dangerKeywords.some(kw => text.toLowerCase().includes(kw));
    if (containsDanger) {
        triggerEmergency();
        appendMessage("⚠️ Hệ thống phát hiện tín hiệu nguy cơ cao. Chatbot đã ngưng để chuyển hướng bạn đến Banner cảnh báo đỏ phía trên!", 'bot');
        input.disabled = true;
        return;
    }

    // Trả lời dựa trên nguyên lý DSM-5-TR
    setTimeout(() => {
        let reply = "Cảm ơn bạn đã tin tưởng chia sẻ. Theo các nghiên cứu tâm lý học chuẩn DSM-5-TR, cảm xúc của bạn hoàn toàn xứng đáng được lắng nghe và tôn trọng. Bạn có muốn thử một bài tập hít thở ngắn cùng mình không?";
        
        const lower = text.toLowerCase();
        if (lower.includes("lo") || lower.includes("sợ") || lower.includes("căng thẳng")) {
            reply = "Sự lo âu lan tỏa là phản ứng tự nhiên khi hệ thần kinh bị quá tải. Bạn hãy đặt tay lên ngực và hít một hơi thật sâu cùng mình nhé!";
        } else if (lower.includes("ngủ") || lower.includes("mệt") || lower.includes("thức đêm")) {
            reply = "Giấc ngủ ảnh hưởng trực tiếp đến khả năng chữa lành của bộ não. Hãy thử thả lỏng vai và tắt bớt ánh sáng đèn xung quanh xem sao nhé.";
        } else if (lower.includes("buồn") || lower.includes("chán") || lower.includes("mất động lực")) {
            reply = "Cảm giác trống rỗng hay buồn chán là lời nhắc nhở cơ thể cần được nghỉ ngơi. Đừng quá khắt khe với bản thân hôm nay nhé!";
        }
        
        appendMessage(reply, 'bot');
    }, 700);
}

function appendMessage(msg, sender) {
    const box = document.getElementById('chat-messages');
    if (!box) return;

    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = msg;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}
