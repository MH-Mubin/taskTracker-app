# Task Tracker App

A modern, feature-rich task management application built with React and Vite. Track your daily routines, manage regular tasks, and visualize your productivity with advanced analytics.

## Live Checkout :

https://task-tracker-browser.vercel.app/tasks

## Features

### 📋 Task Management

- **Regular Tasks**: Create, edit, and manage one-time or project-based tasks
- **Priority Levels**: Organize tasks by Low, Medium, or High priority
- **Due Dates**: Set deadlines and track task completion
- **Status Tracking**: Mark tasks as Pending or Completed
- **Rich Descriptions**: Add detailed descriptions with expandable view for long content

### 🔄 Daily Routines

- **Recurring Tasks**: Set up tasks that reset every day at midnight
- **Daily Progress**: Visual progress ring showing completion status
- **Completion History**: Track your daily routine completion over time
- **Auto-Reset**: Tasks automatically reset at midnight for a fresh start

### 📊 Advanced Analytics Dashboard

- **Completion Statistics**: View total completions and success rates
- **Streak Tracking**: Monitor current and all-time best streaks
- **Heatmap Calendar**: GitHub-style activity visualization
- **Trend Analysis**: Visual trend lines showing productivity patterns
- **Period Comparison**: Compare current performance with previous periods
- **Task Efficiency**: Individual task completion rates
- **Multiple Time Ranges**: Weekly, monthly, quarterly, semi-annual, and yearly views

### 🎨 User Experience

- **Modern UI**: Beautiful gradient-based design with glassmorphism effects
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Toast Notifications**: Real-time feedback for all actions
- **Confirmation Modals**: Prevent accidental deletions
- **Smooth Animations**: Polished transitions and hover effects
- **Protected Routes**: Secure authentication system

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.12.0
- **Styling**: Custom CSS with modern design patterns
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: LocalStorage for data persistence
- **Code Quality**: ESLint with React-specific rules

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd taskTracker-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
taskTracker-app/
├── public/
│   └── task.png              # App icon
├── src/
│   ├── components/
│   │   ├── ConfirmModal.jsx  # Deletion confirmation dialog
│   │   ├── DailyProgress.jsx # Circular progress indicator
│   │   ├── Navbar.jsx        # Navigation bar with routing
│   │   ├── TaskForm.jsx      # Task creation/editing form
│   │   ├── TaskItem.jsx      # Individual task card
│   │   └── TaskList.jsx      # Task grid container
│   ├── pages/
│   │   ├── Dashboard.jsx     # Analytics and statistics
│   │   ├── Login.jsx         # Authentication page
│   │   ├── Repetitive.jsx    # Daily routines management
│   │   └── Tasks.jsx         # Regular tasks management
│   ├── styles/
│   │   └── main.css          # Global styles and themes
│   ├── utils/
│   │   ├── auth.js           # Authentication utilities
│   │   └── storage.js        # LocalStorage management
│   ├── App.jsx               # Main app component with routing
│   └── main.jsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── eslint.config.js          # ESLint configuration
```

## Key Features Explained

### Authentication System

Simple email-based authentication with protected routes. User sessions are maintained using LocalStorage tokens.

### Task Types

- **Regular Tasks**: Standard tasks with title, description, due date, priority, and status
- **Recurring Tasks**: Daily routines that automatically reset at midnight, tracking completion history

### Analytics Engine

The dashboard provides comprehensive insights:

- **Daily Statistics**: Completion counts and rates per day
- **Streak Calculation**: Consecutive days with all tasks completed
- **Heatmap Visualization**: 365-day activity calendar with intensity levels
- **Trend Analysis**: Visual representation of productivity patterns
- **Comparative Metrics**: Period-over-period performance comparison

### Data Persistence

All data is stored in browser LocalStorage with the following structure:

- `taskTracker_token`: Authentication token
- `taskTracker_user`: User email
- `taskTracker_tasks`: Array of all tasks (regular and recurring)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Performance

- Fast initial load with Vite's optimized bundling
- Efficient re-renders with React's virtual DOM
- Smooth animations with CSS transitions
- Minimal bundle size with tree-shaking

## Future Enhancements

Potential features for future releases:

- Backend integration with REST API
- User accounts with cloud sync
- Task categories and tags
- Collaborative task sharing
- Mobile app (React Native)
- Dark mode theme
- Export/import functionality
- Reminders and notifications
- Task templates
- Advanced filtering and search

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Design inspiration from modern productivity apps

---

**Built with ❤️ using React and Vite**
