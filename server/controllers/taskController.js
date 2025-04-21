import Task from "../models/Task.js";
import User from "../models/User.js";
// ✅ Assign a new task
export const createTask = async (req, res) => {
  try {
    const { student_id, document_id, status } = req.body;

    const newTask = new Task({
      student_id,
      document_id,
      status,
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};
// ✅ Assign task to all students
export const assignTaskToAllStudents = async (req, res) => {
  try {
    const { document_id, status = "pending" } = req.body;

    // Get all student users
    const students = await User.find({ role: "student" });

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    const createdTasks = [];

    for (const student of students) {
      const task = new Task({
        student_id: student._id,
        document_id,
        status,
      });

      await task.save();
      createdTasks.push(task);
    }

    res.status(201).json({
      message: `${createdTasks.length} tasks assigned successfully`,
      tasks: createdTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign tasks", error: error.message });
  }
};

// ✅ Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("student_id", "name email")
      .populate("document_id", "name");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// ✅ Get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("student_id", "name email")
      .populate("document_id", "name");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error: error.message });
  }
};

// ✅ Update task status
export const updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// ✅ Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
export const getDistinctTaskDocuments = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate({
        path: "document_id",
        populate: { path: "created_by", select: "name" },
      })
      .select("document_id");

    const seen = new Set();
    const uniqueDocs = [];

    tasks.forEach((t) => {
      const doc = t.document_id;
      if (doc && !seen.has(doc._id.toString())) {
        seen.add(doc._id.toString());
        uniqueDocs.push(doc);
      }
    });

    res.status(200).json(uniqueDocs);
  } catch (error) {
    console.error("Task fetch error:", error);
    res.status(500).json({ message: "Failed to fetch distinct documents", error: error.message });
  }
};