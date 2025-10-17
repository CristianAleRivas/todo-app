const API = 'http://localhost:3000';

async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();
  const ul = document.getElementById('tasks');
  ul.innerHTML = '';

  tasks.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task' + (t.completed ? ' completed' : '');
    li.innerHTML = `
      <span class="title">${escapeHtml(t.title)}</span>
      <input class="edit-input" style="display:none;" value="${escapeHtml(t.title)}" />
      <div>
        <button class="edit">✎</button>
        <button class="save" style="display:none;">💾</button>
        <button class="toggle">${t.completed ? '↺' : '✔'}</button>
        <button class="delete">Eliminar</button>
      </div>
    `;

    const titleSpan = li.querySelector('.title');
    const input = li.querySelector('.edit-input');
    const editBtn = li.querySelector('.edit');
    const saveBtn = li.querySelector('.save');

    editBtn.addEventListener('click', () => {
      titleSpan.style.display = 'none';
      input.style.display = 'inline-block';
      editBtn.style.display = 'none';
      saveBtn.style.display = 'inline-block';
    });

    saveBtn.addEventListener('click', async () => {
      const newTitle = input.value.trim();
      if (newTitle) {
        await updateTitle(t.id, newTitle);
        await loadTasks(); 
      }
    });

    li.querySelector('.toggle').addEventListener('click', () => toggleTask(t.id, !t.completed));
    li.querySelector('.delete').addEventListener('click', () => deleteTask(t.id));

    ul.appendChild(li);
  });
}

async function addTask(title) {
  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ title })
  });
  loadTasks();
}

async function toggleTask(id, completed) {
  await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ completed })
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

async function updateTitle(id, newTitle) {
  await fetch(`${API}/tasks/title/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle })
  });
}

document.getElementById('addBtn').addEventListener('click', () => {
  const v = document.getElementById('newTitle').value.trim();
  if (!v) return;
  addTask(v);
  document.getElementById('newTitle').value = '';
});

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

window.onload = loadTasks;

