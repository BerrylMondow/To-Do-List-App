// Panggil semua elemen yang diperlukan dari DOM

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const completedCountEl = document.getElementById("completed-count");
const pendingCountEl = document.getElementById("pending-count");
const taskForm = document.getElementById("task-form");

// Fungsi untuk memperbarui jumlah status tugas
function updateStatusCount() {
  const totalTasks = taskList.querySelectorAll(".task-item").length;
  const completedTasks = taskList.querySelectorAll(".task-item.completed").length;
  const pendingTasks = totalTasks - completedTasks;

  completedCountEl.textContent = completedTasks;
  pendingCountEl.textContent = pendingTasks;
}

// Fungsi untuk membuat elemen HTML task-actions berdasarkan status completed
function renderTaskActions(isCompleted) {
  if (isCompleted) {
    // Jika selesai: Hanya tampilkan ikon centang hijau
    return `<i class="bi bi-check-circle-fill" style="color: #10b981; font-size: 1.2rem;"></i>`;
  }
  // Jika belum selesai: Tampilkan tombol complete dan delete
  return `
    <button class="complete-btn"><i class="bi bi-check-circle-fill"></i></button>
    <button class="delete-btn"><i class="bi bi-trash-fill"></i></button>
  `;
}

// Fungsi untuk menambahkan tugas baru ke daftar
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="task-actions">
        ${renderTaskActions(false)}
      </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = "";
    updateStatusCount();
  }
}

// Event Delegation untuk menangani aksi pada task list
taskList.addEventListener("click", function (event) {
  const target = event.target;
  const taskItem = target.closest(".task-item");

  if (!taskItem) return;

  // Fitur Hapus Tugas
  if (target.closest(".delete-btn")) {
    taskItem.remove();
    updateStatusCount();
    return;
  }

  // Fitur Tandai Selesai
  if (target.closest(".complete-btn")) {
    taskItem.classList.add("completed");
    
    // Ganti area tombol dengan ikon centang hijau saja
    const actionsContainer = taskItem.querySelector(".task-actions");
    actionsContainer.innerHTML = renderTaskActions(true);

    updateStatusCount();
  }
});

// Event listener untuk tombol "Add Task"
addTaskBtn.addEventListener("click", addTask);

// Event listener untuk menambahkan tugas saat menekan tombol Enter
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Hitung status awal saat aplikasi pertama dibuka
updateStatusCount();