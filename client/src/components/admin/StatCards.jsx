import { FaFolderOpen, FaCheckCircle, FaClock } from "react-icons/fa";

const StatCards = () => {
  const stats = [
    {
      label: "Total Files",
      value: 10,
      icon: <FaFolderOpen className="text-white text-3xl" />,
      bg: "bg-yellow-400",
    },
    {
      label: "Completed",
      value: 5,
      icon: <FaCheckCircle className="text-white text-3xl" />,
      bg: "bg-green-500",
    },
    {
      label: "In Process",
      value: 5,
      icon: <FaClock className="text-white text-3xl" />,
      bg: "bg-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex items-center justify-between ${stat.bg} text-white p-6 rounded-xl shadow-lg transition-transform duration-200 hover:scale-105`}
        >
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold">{stat.value}</span>
            <span className="text-sm font-medium">{stat.label}</span>
          </div>
          <div>{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
