// Dữ liệu câu hỏi chuẩn khoa học tích hợp từ tài liệu chuyên môn (PHQ-9, GAD-7, PSS-10, MBI, C-SSRS)
const quizData = {
    'hoc-tap': {
        title: 'Đánh Giá Căng Thẳng Học Tập & Kiệt Sức (Burnout - MBI & PSS-10)',
        questions: [
            // C-SSRS Khẩn cấp Sàng lọc
            { q: "Bạn có từng mong muốn mình không còn sống nữa hoặc ước mình ngủ đi và không thức dậy?", opts: ["Không", "Có, đôi lúc", "Có, thường xuyên"], danger: true },
            { q: "Bạn có từng thực sự có suy nghĩ về việc tự sát / tự làm tổn thương mình?", opts: ["Không", "Có, đôi lúc", "Có, thường xuyên"], danger: true },
            // MBI & PSS-10 Khoa Học
            { q: "Bạn cảm thấy kiệt sức về mặt tinh thần sau một ngày học tập / làm việc căng thẳng?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "Bạn cảm thấy mệt mỏi ngay từ buổi sáng khi nghĩ đến việc phải bắt đầu công việc/buổi học?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "Bạn cảm thấy bản thân ngày càng trở nên thờ ơ, thiếu quan tâm hoặc chai sạn với việc học?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "Bạn nghi ngờ về ý nghĩa hoặc giá trị của việc học/công việc mà mình đang làm?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "Bạn cảm thấy mình học tập / làm việc kém hiệu quả hơn trước đây?", opts: ["Chưa bao giờ (0)", "Hiếm khi (1)", "Thỉnh thoảng (2)", "Thường xuyên (3)", "Luôn luôn (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "Trong 1 tháng qua, bạn có thường xuyên thấy mình không thể kiểm soát các việc quan trọng?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Đôi khi (2)", "Thường xuyên (3)", "Rất thường xuyên (4)"], scores: [0, 1, 2, 3, 4] },
            { q: "Bạn có thường cảm thấy các khó khăn dồn dập đến mức không thể vượt qua nổi?", opts: ["Không bao giờ (0)", "Hiếm khi (1)", "Đôi khi (2)", "Thường xuyên (3)", "Rất thường xuyên (4)"], scores: [0, 1, 2, 3, 4] }
        ]
    },
    'giac-ngu': {
        title: 'Đánh Giá Chất Lượng Giấc Ngủ (Rút gọn từ PSQI / ISI)',
        questions: [
            { q: "Thông thường, bạn mất bao lâu để bắt đầu đi vào giấc ngủ sau khi tắt đèn?", opts: ["Dưới 15 phút (0)", "16–30 phút (1)", "31–60 phút (2)", "Trên 60 phút (3)"], scores: [0, 1, 2, 3] },
            { q: "Bạn có thường xuyên bị thức giấc giữa đêm hoặc dậy quá sớm mà không ngủ lại được?", opts: ["Không bao giờ (0)", "1-2 lần/tuần (1)", "3-4 lần/tuần (2)", "Hầu như mỗi đêm (3)"], scores: [0, 1, 2, 3] },
            { q: "Bạn tự đánh giá chất lượng giấc ngủ của mình gần đây như thế nào?", opts: ["Rất tốt (0)", "Khá tốt (1)", "Khá tồi (2)", "Rất tồi (3)"], scores: [0, 1, 2, 3] },
            { q: "Việc thiếu ngủ / mất ngủ làm ảnh hưởng đến năng lượng và sự tập trung ban ngày ở mức nào?", opts: ["Không ảnh hưởng (0)", "Ảnh hưởng ít (1)", "Ảnh hưởng nhiều (2)", "Rất nghiêm trọng (3)"], scores: [0, 1, 2, 3] }
        ]
    },
    'lo-au': {
        title: 'Sàng Lọc Mức Độ Lo Âu (Thang Đo GAD-7 Khoa Học)',
        questions: [
            { q: "Cảm thấy lo lắng, bồn chồn, căng thẳng hoặc bất an?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Không thể ngừng hoặc không kiểm soát được sự lo lắng?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Lo lắng quá nhiều về nhiều thứ khác nhau trong cuộc sống?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Khó thư giãn hoặc đầu óc luôn trong trạng thái gồng căng?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Bồn chồn đến mức khó ngồi yên một chỗ?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Trở nên dễ cáu gắt hoặc bực mình vì những chuyện nhỏ?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Cảm thấy sợ hãi như thể có điều gì đó tồi tệ sắp xảy ra?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] }
        ]
    },
    'tam-trang': {
        title: 'Đánh Giá Tâm Trạng & Sàng Lọc Trầm Cảm (PHQ-9 & C-SSRS)',
        questions: [
            { q: "Bạn có từng suy nghĩ về việc tự làm tổn thương mình hoặc tự sát?", opts: ["Không", "Có, đôi lúc", "Có, thường xuyên"], danger: true },
            { q: "Ít hứng thú hoặc không còn niềm vui trong các hoạt động thường ngày?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Cảm thấy buồn chán, nản lòng, chán nản hoặc vô vọng?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Trằn trọc, khó ngủ, ngủ không sâu giấc hoặc ngủ quá nhiều?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Cảm thấy mệt mỏi, kiệt sức hoặc thiếu năng lượng?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Cảm thấy tồi tệ về bản thân — tự cho mình là người thất bại?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] },
            { q: "Khó tập trung vào công việc, việc học hoặc khi đọc sách, xem tivi?", opts: ["Không bao giờ (0)", "Vài ngày (1)", "Hơn một nửa số ngày (2)", "Hầu như mỗi ngày (3)"], scores: [0, 1, 2, 3] }
        ]
    }
};

let currentCategory = '';

function showSection(sectionId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0);
}

function startAssessment(category) {
    currentCategory = category;
    const quiz = quizData[category];
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
            <div class="question-title">Câu ${index + 1}: ${item.q}</div>
            <div class="options-group">${optionsHtml}</div>
        `;
        container.appendChild(qBlock);
    });

    showSection('quiz-section');
}

function submitQuiz() {
    const quiz = quizData[currentCategory];
    let totalScore = 0;
    let isEmergency = false;

    for (let i = 0; i < quiz.questions.length; i++) {
        const selected = document.querySelector(`input[name="q_${i}"]:checked`);
        if (!selected) {
            alert(`Vui lòng trả lời đầy đủ câu hỏi số ${i + 1}!`);
            return;
        }

        const val = parseInt(selected.value);
        const questionObj = quiz.questions[i];

        // Kiểm tra nguy cơ khẩn cấp C-SSRS
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

function renderResults(score) {
    document.getElementById('score-text').innerText = `${score} Điểm`;
    const badge = document.getElementById('level-badge');
    const analysis = document.getElementById('score-analysis');
    const exercises = document.getElementById('exercise-list');
    exercises.innerHTML = '';

    let levelText = '', analysisText = '', listEx = [];

    if (score <= 5) {
        levelText = "Bình Thường / Căng Thẳng Thấp";
        badge.style.background = "#52c41a";
        analysisText = "Sức khỏe tinh thần của bạn đang ở trạng thái tốt và ổn định. Hãy duy trì thói quen sống lành mạnh!";
        listEx = ["🌿 Thiền chánh niệm 5 phút mỗi sáng", "🏃 Bào chế hormone hạnh phúc bằng 20 phút chạy bộ", "📖 Đọc sách và thư giãn trước khi ngủ"];
    } else if (score <= 12) {
        levelText = "Mức Độ Nhẹ / Căng Thẳng Vừa";
        badge.style.background = "#faad14";
        analysisText = "Bạn đang trải qua một số áp lực hoặc mệt mỏi nhẹ[cite: 4]. Hãy cân bằng lại giữa học tập, làm việc và nghỉ ngơi[cite: 4].";
        listEx = ["🌬️ Bài tập hít thở sâu Box Breathing (Hít 4s - Giữ 4s - Thở 4s)", "🎧 Nghe nhạc sóng não Alpha/Theta thư giãn", "☕ Hạn chế Caffeine sau 3 giờ chiều[cite: 4]"];
    } else {
        levelText = "Mức Độ Cao / Cần Lắng Nghe & Hỗ Trợ";
        badge.style.background = "#ff4d4f";
        analysisText = "Tâm trạng hoặc giấc ngủ của bạn đang chịu áp lực lớn[cite: 4]. Bạn nên dành thời gian nghỉ ngơi ngắt kết nối và trao đổi thêm với chuyên gia[cite: 4].";
        listEx = ["🧘 Thiền quét cơ thể (Body Scan Meditation) giảm gồng căng", "📝 Viết nhật ký giải tỏa cảm xúc (Journaling)", "🗣️ Trò chuyện chia sẻ với người thân đáng tin cậy"];
    }

    badge.innerText = levelText;
    analysis.innerText = analysisText;
    listEx.forEach(ex => {
        const li = document.createElement('li');
        li.innerText = ex;
        exercises.appendChild(li);
    });

    showSection('result-section');
}

// Hệ thống phát hiện từ ngữ nguy hiểm & Cảnh báo đỏ
const dangerKeywords = ["tự sát", "tự tử", "muốn chết", "kết thúc cuộc đời", "reset cuộc đời", "chết đi", "tự làm tổn thương"];

function triggerEmergency() {
    document.getElementById('emergency-banner').classList.remove('hidden');
    showSection('home-section');
}

// Chatbot AI Tư Vấn Tinh Thần dựa trên tài liệu DSM-5-TR
function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    // Hiển thị tin nhắn người dùng
    appendMessage(text, 'user');
    input.value = '';

    // Kiểm tra từ ngữ nguy hiểm lập tức
    const containsDanger = dangerKeywords.some(kw => text.toLowerCase().includes(kw));
    if (containsDanger) {
        triggerEmergency();
        appendMessage("⚠️ Hệ thống phát hiện bạn đang gặp nguy cơ lớn. Chatbot đã ngưng để chuyển hướng bạn đến banner hỗ trợ khẩn cấp phía trên!", 'bot');
        document.getElementById('chat-input').disabled = true;
        return;
    }

    // Phản hồi tự động của AI dựa trên kiến thức DSM-5-TR
    setTimeout(() => {
        let reply = "Cảm ơn bạn đã chia sẻ. Theo chuẩn tâm lý lâm sàng DSM-5-TR, cảm xúc của bạn hoàn toàn đáng được lắng nghe[cite: 5]. Bạn có muốn thử một bài tập hít thở thư giãn cùng mình không?";
        if (text.includes("lo lắng") || text.includes("sợ")) {
            reply = "Sự lo lắng lan tỏa đôi khi xuất hiện khi tâm trí phải gồng căng quá mức[cite: 4]. Bạn hãy thử nhắm mắt lại và hít một hơi thật sâu nhé[cite: 4].";
        } else if (text.includes("mất ngủ") || text.includes("khó ngủ")) {
            reply = "Chất lượng giấc ngủ ảnh hưởng rất lớn đến năng lượng ban ngày[cite: 4]. Bạn nên tắt thiết bị điện tử trước khi ngủ 30 phút[cite: 4].";
        }
        appendMessage(reply, 'bot');
    }, 800);
}

function appendMessage(msg, sender) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = msg;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}
