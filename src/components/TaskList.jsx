import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggleStatus, isRecurring = false, emptyMessage = "No tasks yet. Add your first task above!" }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">{emptyMessage}</p>;
  }

  // For recurring tasks, sort completed ones to the bottom
  const sortedTasks = isRecurring 
    ? [...tasks].sort((a, b) => {
        if (a.status === 'Completed' && b.status !== 'Completed') return 1;
        if (a.status !== 'Completed' && b.status === 'Completed') return -1;
        return 0;
      })
    : tasks;

  return (
    <div className={`task-list ${isRecurring ? 'recurring-list' : ''}`}>
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          isRecurring={isRecurring}
        />
      ))}
    </div>
  );
}

export default TaskList;
