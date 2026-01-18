import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, addTask, updateTask, deleteTask } from '../utils/storage';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
      showToast('Task updated successfully!');
    } else {
      addTask(taskData);
      showToast('Task added successfully!');
    }
    setTasks(getTasks());
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      setTasks(getTasks());
      showToast('Task deleted successfully!', 'info');
    }
  };

  const handleToggleStatus = (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    updateTask(task.id, { status: newStatus });
    setTasks(getTasks());
    showToast(`Task marked as ${newStatus}!`);
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="tasks-page">
      <Navbar />
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
      <div className="container">
        <TaskForm
          editingTask={editingTask}
          onSubmit={handleAddTask}
          onCancel={handleCancel}
        />
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default Tasks;
