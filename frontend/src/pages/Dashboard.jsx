import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getTasks, clearError, clearSuccess } from '../store/slices/taskSlice';
import { getAllUsers } from '../store/slices/authSlice';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterTabs from '../components/FilterTabs';
import { FiPlus } from 'react-icons/fi';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const dispatch = useDispatch();
  const { tasks, loading, error, success } = useSelector((state) => state.tasks);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'personal') return !task.assignee;
    if (filter === 'assigned') return task.assignee && task.creator._id === userInfo._id;
    if (filter === 'received') return task.assignee && task.assignee._id === userInfo._id;
    if (filter === 'todo') return task.status === 'Todo';
    if (filter === 'in-progress') return task.status === 'In Progress';
    if (filter === 'done') return task.status === 'Done';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              My Tasks
            </h1>
            <p className="text-gray-600">
              Manage your tasks and track your progress
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
          >
            <FiPlus className="text-xl" />
            Create Task
          </motion.button>
        </motion.div>

        <FilterTabs filter={filter} setFilter={setFilter} />

        {loading ? (
          <LoadingSpinner />
        ) : filteredTasks.length === 0 ? (
          <EmptyState filter={filter} onCreateTask={() => setIsModalOpen(true)} />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
