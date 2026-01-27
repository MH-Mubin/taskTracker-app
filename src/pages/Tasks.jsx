import { useEffect, useRef, useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { addTask, deleteTask, getRegularTasks, updateTask } from '../utils/storage';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const formRef = useRef(null);

  const refreshTasks = () => {
    setTasks(getRegularTasks());
  };

  useEffect(() => {
    refreshTasks();
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
    refreshTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTask(taskToDelete);
    refreshTasks();
    showToast('Task deleted successfully!', 'info');
    setShowModal(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const handleToggleStatus = (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    updateTask(task.id, { status: newStatus });
    refreshTasks();
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
      <ConfirmModal
        isOpen={showModal}
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div className="container">
        <div ref={formRef}>
          <TaskForm
            editingTask={editingTask}
            onSubmit={handleAddTask}
            onCancel={handleCancel}
          />
        </div>
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          isRecurring={false}
          emptyMessage="No tasks yet. Add your first task above!"
        />
      </div>
    </div>
  );
}

export default Tasks;
