import Report from "../models/Report.js";
import ExcelJS from "exceljs";
// ✅ Add a report
export const addReport = async (req, res) => {
  try {
    const { student_id, document_id, total_percentage, result } = req.body;

    const newReport = new Report({
      student_id,
      document_id,
      total_percentage,
      result,
    });

    await newReport.save();
    res.status(201).json({ message: "Report created", report: newReport });
  } catch (error) {
    res.status(500).json({ message: "Failed to create report", error: error.message });
  }
};

// ✅ Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("student_id", "name email")
      .populate("document_id", "name");

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
};

// ✅ Get report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("student_id", "name email")
      .populate("document_id", "name");

    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error: error.message });
  }
};

// ✅ Get reports by student
export const getReportsByStudent = async (req, res) => {
  try {
    const reports = await Report.find({ student_id: req.params.studentId })
      .populate("document_id", "name");

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student's reports", error: error.message });
  }
};

// ✅ Delete report
export const deleteReport = async (req, res) => {
  try {
    const deleted = await Report.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};



// ✅ Update a report
export const updateReport = async (req, res) => {
    try {
      const { total_percentage, result } = req.body;
  
      const updated = await Report.findByIdAndUpdate(
        req.params.id,
        { total_percentage, result },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Report not found" });
  
      res.status(200).json({ message: "Report updated", report: updated });
    } catch (error) {
      res.status(500).json({ message: "Update failed", error: error.message });
    }
  };

  export const getStudentStats = async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const reports = await Report.find({ student_id: studentId });
  
      const total = reports.length;
      const passed = reports.filter((r) => r.result === "Pass").length;
      const failed = total - passed;
      const avgPercent =
        reports.reduce((sum, r) => sum + r.total_percentage, 0) / (total || 1);
  
      res.status(200).json({
        total_reports: total,
        passed,
        failed,
        average_percentage: avgPercent.toFixed(2),
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats", error: error.message });
    }
  };

  export const exportReportsToExcel = async (req, res) => {
    try {
      const reports = await Report.find().populate("student_id document_id");
  
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Reports");
  
      sheet.columns = [
        { header: "Student", key: "student", width: 25 },
        { header: "Document", key: "document", width: 25 },
        { header: "Percentage", key: "percent", width: 15 },
        { header: "Result", key: "result", width: 10 },
      ];
  
      reports.forEach((r) =>
        sheet.addRow({
          student: r.student_id?.name || "N/A",
          document: r.document_id?.name || "N/A",
          percent: r.total_percentage,
          result: r.result,
        })
      );
  
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=reports.xlsx");
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      res.status(500).json({ message: "Failed to export", error: error.message });
    }
  };
  
