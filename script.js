let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastDate = localStorage.getItem("lastDate") || "";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveData() {
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  localStorage.setItem("streak", streak);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTitle() {
  if (level < 3) return "Beginner";
  if (level < 5) return "Executor";
  if (level < 8) return "Warrior";
  return "Master";
}

function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
  document.getElementById("title").innerText = getTitle();
  document.getElementById("streak").innerText = streak;

  let percent = xp % 100;
  document.getElementById("xp-fill").style.width = percent + "%";

  renderTasks();
}

function checkLevel() {
  if (xp >= level * 100) {
    level++;
    alert("🎉 Level Up!");
  }
}

function updateStreak() {
  let today = new Date().toDateString();

  if (lastDate !== today) {
    if (lastDate === "") {
      streak = 1;
    } else {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate === yesterday.toDateString()) {
        streak++;
      } else {
        streak = 1;
      }
    }
    lastDate = today;
    localStorage.setItem("lastDate", lastDate);
  }
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ text: input.value, xp: 20 });
  input.value = "";

  saveData();
  updateUI();
}

function completeTask(index) {
  xp += tasks[index].xp;

  updateStreak();
  checkLevel();

  tasks.splice(index, 1);

  saveData();
  updateUI();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${task.text} (+${task.xp} XP)
      <button onclick="completeTask(${index})">✅</button>
    `;
    list.appendChild(li);
  });
}

updateUI();

const messages = [
  "You’re doing better than yesterday.",
  "Consistency > perfection.",
  "Just finish one task."
];