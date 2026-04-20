import { motion } from 'framer-motion';

const FilterTabs = ({ filter, setFilter }) => {
  const tabs = [
    { id: 'all', label: 'All Tasks', icon: '📋' },
    { id: 'personal', label: 'Personal', icon: '👤' },
    { id: 'assigned', label: 'Assigned by Me', icon: '📤' },
    { id: 'received', label: 'Assigned to Me', icon: '📥' },
    { id: 'todo', label: 'Todo', icon: '⏳' },
    { id: 'in-progress', label: 'In Progress', icon: '🔄' },
    { id: 'done', label: 'Done', icon: '✅' },
  ];

  return (
    <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(tab.id)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-xs sm:text-sm ${
              filter === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-sm sm:text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
