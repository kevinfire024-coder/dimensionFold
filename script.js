// 修改募資、預算比例、角色對話時，優先調整這個設定區。
// 修改製作進度、預算比例、角色對話時，優先調整這個設定區。
const siteConfig = {
  funding: {
    goal: 12000000,
    current: 4860000,
    currency: "NT$",
    pledgeBoostMessage: "能量輸入已記錄。新的摺疊參數正在更新籌資模型。"
  production: {
    progressPercent: 41,
    currentStage: "企劃開發",
    nextStep: "視覺概念測試",
    progressMessage: "支持或贊助功能需建立會員登入、身分驗證與第三方金流後再開放。"
  },
  budget: {
    total: 12000000,
          reply: "我代表科技樂觀主義，也代表最危險的善意。這能讓電影不只是正邪對抗，而是價值觀的碰撞。"
        },
        {
          text: "募資者支持的是什麼？",
          reply: "支持的是一部華語原創科幻的可行模型：集中場景、重點特效、強概念行銷，讓預算用在刀口上。"
          text: "觀眾關注的是什麼？",
          reply: "觀眾關注的是一部華語原創科幻的可行模型：集中場景、重點特效、強概念行銷，讓預算用在刀口上。"
        },
        {
          text: "行銷預算為何是 24%？",
};

const state = {
  currentFunding: siteConfig.funding.current,
  activeCharacter: "linche"
};

const formatter = new Intl.NumberFormat("zh-TW");

function formatCurrency(value) {
  return `${siteConfig.funding.currency}${formatter.format(value)}`;
  return `NT$${formatter.format(value)}`;
}

function renderFunding() {
  const percent = Math.min(100, Math.round((state.currentFunding / siteConfig.funding.goal) * 100));
  document.getElementById("current-funding").textContent = formatCurrency(state.currentFunding);
  document.getElementById("funding-goal").textContent = formatCurrency(siteConfig.funding.goal);
  const percent = Math.min(100, Math.max(0, Math.round(siteConfig.production.progressPercent)));
  document.getElementById("current-funding").textContent = siteConfig.production.currentStage;
  document.getElementById("funding-goal").textContent = siteConfig.production.nextStep;
  document.getElementById("funding-percent-label").textContent = `${percent}%`;
  document.getElementById("funding-progress").style.width = `${percent}%`;
  document.getElementById("funding-message").textContent = siteConfig.production.progressMessage;
}

function renderBudget() {
}

function setupInteractions() {
  document.querySelectorAll(".pledge-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentFunding += Number(button.dataset.pledge);
      document.getElementById("funding-message").textContent = siteConfig.funding.pledgeBoostMessage;
      renderFunding();
    });
  });

  document.querySelectorAll(".character-button").forEach((button) => {
    button.addEventListener("click", () => renderCharacter(button.dataset.character));
  });
