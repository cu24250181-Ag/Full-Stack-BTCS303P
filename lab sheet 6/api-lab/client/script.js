const taskList = document.getElementById('taskList');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('error');

async function loadTasks() {
  loading.textContent = 'Loading...';
  errorBox.textContent = '';
  taskList.innerHTML = '';

  try {
    const response = await fetch('http://localhost:5000/api/tasks');

    if (!response.ok) {
      throw new Error('Failed to load tasks');
    }

    const tasks = await response.json();

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.title;
      taskList.appendChild(li);
    });

    loading.textContent = '';
  } catch (err) {
    loading.textContent = '';
    errorBox.textContent = 'Error loading tasks. The server may be down.';
    console.error(err);
  }
}

loadTasks();
