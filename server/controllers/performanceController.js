import Performance from "../models/Performance.js";

// 📥 Create or update performance for a student
export const upsertPerformance = async (req, res) => {
  try {
    const { student_id, total_tasks, completed_tasks, pending_tasks, failed_tasks, average_time_taken } = req.body;

    const update = {
      total_tasks,
      completed_tasks,
      pending_tasks,
      failed_tasks,
      average_time_taken,
    };

    const performance = await Performance.findOneAndUpdate(
      { student_id },
      update,
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Performance saved", performance });
  } catch (error) {
    res.status(500).json({ message: "Failed to save performance", error: error.message });
  }
};

// 📊 Get performance for a student
export const getPerformanceByStudent = async (req, res) => {
  try {
    const performance = await Performance.findOne({ student_id: req.params.studentId }).populate("student_id", "name email");
    if (!performance) return res.status(404).json({ message: "No performance data found" });

    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching performance", error: error.message });
  }
};
