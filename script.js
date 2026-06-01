// 修改製作進度、預算比例、角色對話時，優先調整這個設定區。
const siteConfig = {
  production: {
    progressPercent: 41,
    currentStage: "企劃開發",
    nextStep: "視覺概念測試",
    progressMessage: "支持或贊助功能需建立會員登入、身分驗證與第三方金流後再開放。"
  },
  budget: {
    total: 12000000,
    marketingRatio: 0.24,
    items: [
      {
        label: "前期開發",
        ratio: 0.12,
        note: "劇本修訂、科學顧問、概念設計與視覺測試。"
      },
      {
        label: "拍攝製作",
        ratio: 0.38,
        note: "主要場景、美術、攝影、演員與現場製作。"
      },
      {
        label: "後期特效",
        ratio: 0.26,
        note: "高維摺疊、物質生成、城市異變與聲音設計。"
      },
      {
        label: "行銷宣傳",
        ratio: 0.24,
        note: "預告片、社群投放、互動解謎、影展曝光與上映活動。"
      }
    ]
  },
  characters: {
    linche: {
      name: "林澈",
      opening: "我是林澈。方舟能源的實驗資料顯示，生成物質不是單純的能量轉換，而是一次高維摺疊。",
      choices: [
        {
          text: "父親戒指代表什麼？",
          reply: "那枚戒指不是複製品。它像是被某個意識從高維推回來，提醒我第四層摺疊不能啟動。"
        },
        {
          text: "你會如何說服投資者？",
          reply: "我會說這不是一部只靠特效的科幻片。真正的核心，是人類得到創造物質的能力後，是否還能克制自己。"
        },
        {
          text: "電影最大場面是什麼？",
          reply: "第四層摺疊啟動時，實驗場、城市和記憶同時重疊。觀眾會看見現實像幾何紙面一樣被重新摺起。"
        }
      ]
    },
    baizhi: {
      name: "白芷",
      opening: "我能聽見摺疊空間裡的回聲。它們不像雜訊，更像是不斷尋找身體的名字。",
      choices: [
        {
          text: "高維回聲能做成互動嗎？",
          reply: "可以。網站、社群和預告片都能埋入訊息片段，讓觀眾像研究員一樣拼出真相。"
        },
        {
          text: "觀眾會害怕什麼？",
          reply: "不是怪物，而是不確定自己看到的物質是否真正屬於這個世界。恐懼會從理性開始裂開。"
        },
        {
          text: "你聽見林澈了嗎？",
          reply: "我聽見他說：別把希望做成武器。這句話也會成為行銷主軸之一。"
        }
      ]
    },
    shenyao: {
      name: "沈曜",
      opening: "世界缺能源，缺糧食，缺時間。若摺疊技術能救一座城市，我們真的有權停下嗎？",
      choices: [
        {
          text: "你代表什麼衝突？",
          reply: "我代表科技樂觀主義，也代表最危險的善意。這能讓電影不只是正邪對抗，而是價值觀的碰撞。"
        },
        {
          text: "觀眾關注的是什麼？",
          reply: "觀眾關注的是一部華語原創科幻的可行模型：集中場景、重點特效、強概念行銷，讓預算用在刀口上。"
        },
        {
          text: "行銷預算為何是 24%？",
          reply: "因為本片需要在上映前先建立世界觀討論。24% 會用於預告、社群、互動解謎、影展與上映活動。"
        }
      ]
    },
    linyu: {
      name: "林嶼",
      opening: "如果你讀到這段訊息，代表門又被打開了一點。記住，物質是高維意識固定自己的錨。",
      choices: [
        {
          text: "高維裡有什麼？",
          reply: "不是神，也不是惡魔。是無數尚未成形的可能性。它們沒有身體，所以渴望我們的現實。"
        },
        {
          text: "結尾為什麼留下戒指？",
          reply: "戒指證明裂縫沒有完全消失。它讓電影有完整結局，也保留續集與影集延展的入口。"
        },
        {
          text: "你想對觀眾說什麼？",
          reply: "不要只問科技能不能做到，也要問做到之後，誰會被迫承擔代價。"
        }
      ]
    }
  }
};

const state = {
  activeCharacter: "linche"
};

const formatter = new Intl.NumberFormat("zh-TW");

function formatCurrency(value) {
  return `NT$${formatter.format(value)}`;
}

function renderFunding() {
  const percent = Math.min(100, Math.max(0, Math.round(siteConfig.production.progressPercent)));
  document.getElementById("current-funding").textContent = siteConfig.production.currentStage;
  document.getElementById("funding-goal").textContent = siteConfig.production.nextStep;
  document.getElementById("funding-percent-label").textContent = `${percent}%`;
  document.getElementById("funding-progress").style.width = `${percent}%`;
  document.getElementById("funding-message").textContent = siteConfig.production.progressMessage;
}

function renderBudget() {
  const marketingPercent = Math.round(siteConfig.budget.marketingRatio * 100);
  const ring = document.getElementById("budget-ring");
  const label = document.getElementById("marketing-ratio-label");
  const list = document.getElementById("budget-list");
  const marketingDegrees = Math.round(siteConfig.budget.marketingRatio * 360);

  label.textContent = `${marketingPercent}%`;
  ring.style.background = `conic-gradient(var(--green) 0deg, var(--cyan) ${marketingDegrees}deg, rgba(255, 255, 255, 0.08) ${marketingDegrees}deg)`;

  list.innerHTML = siteConfig.budget.items.map((item) => {
    const amount = siteConfig.budget.total * item.ratio;
    const percent = Math.round(item.ratio * 100);
    return `
      <div class="budget-item">
        <strong>${item.label}</strong>
        <div>
          <div class="budget-meter" aria-label="${item.label} ${percent}%">
            <span style="--width: ${percent}%"></span>
          </div>
          <p>${item.note} 金額約 ${formatCurrency(amount)}。</p>
        </div>
        <b>${percent}%</b>
      </div>
    `;
  }).join("");
}

function addMessage(text, type = "character") {
  const stream = document.getElementById("message-stream");
  const bubble = document.createElement("div");
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  stream.appendChild(bubble);
  stream.scrollTop = stream.scrollHeight;
}

function renderCharacter(characterKey) {
  const character = siteConfig.characters[characterKey];
  state.activeCharacter = characterKey;
  document.getElementById("character-name").textContent = character.name;
  document.getElementById("message-stream").innerHTML = "";
  document.getElementById("choice-row").innerHTML = "";

  addMessage(character.opening);

  character.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      addMessage(choice.text, "user");
      window.setTimeout(() => addMessage(choice.reply), 220);
    });
    document.getElementById("choice-row").appendChild(button);
  });

  document.querySelectorAll(".character-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.character === characterKey);
  });
}

function setupInteractions() {
  document.querySelectorAll(".character-button").forEach((button) => {
    button.addEventListener("click", () => renderCharacter(button.dataset.character));
  });
}

function setupCanvas() {
  const canvas = document.getElementById("dimension-canvas");
  const ctx = canvas.getContext("2d");
  const points = Array.from({ length: 48 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0009,
    vy: (Math.random() - 0.5) * 0.0009
  }));

  function resize() {
    canvas.width = Math.floor(window.innerWidth * window.devicePixelRatio);
    canvas.height = Math.floor(window.innerHeight * window.devicePixelRatio);
  }

  function draw() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1 * window.devicePixelRatio;

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > 1) point.vx *= -1;
      if (point.y < 0 || point.y > 1) point.vy *= -1;
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const dx = (a.x - b.x) * width;
        const dy = (a.y - b.y) * height;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 190 * window.devicePixelRatio) {
          const opacity = 1 - distance / (190 * window.devicePixelRatio);
          ctx.strokeStyle = `rgba(105, 230, 255, ${opacity * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(a.x * width, a.y * height);
          ctx.lineTo(b.x * width, b.y * height);
          ctx.stroke();
        }
      }
    }

    points.forEach((point) => {
      ctx.fillStyle = "rgba(181, 244, 255, 0.62)";
      ctx.beginPath();
      ctx.arc(point.x * width, point.y * height, 1.7 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

renderFunding();
renderBudget();
renderCharacter(state.activeCharacter);
setupInteractions();
setupCanvas();
