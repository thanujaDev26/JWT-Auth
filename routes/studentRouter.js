const express = require('express');
const router = express.Router();
const Student = require('../models/Paper');


router.get('/', async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied: You must be a student' });
        }

        const student = await Student.findOne({ studentID: req.studentID });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }


        const papersWithDetails = student.papers.map(paper => {

            const deadline = new Date();
            deadline.setDate(deadline.getDate() + 7);

            return {
                paperName: paper.paperName,
                marks: paper.marks,
                deadline: deadline,
                submitted: paper.submitted,
            };
        });

        res.json({
            message: `Welcome ${student.name}, you are a student!`,
            papers: papersWithDetails,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/paper', async (req, res) => {
    const { studentID, paperName, marks, deadline, submitted } = req.body;
    if (!studentID || !paperName || marks === undefined || !deadline) {
        return res.status(400).json({ message: 'StudentID, paperName, marks, and deadline are required' });
    }

    try {
        const student = await Student.findOne({ studentID });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        let paper = student.papers.find(p => p.paperName === paperName);

        if (paper) {
            paper.marks = marks;
            paper.deadline = deadline;
            paper.submitted = submitted;
        } else {
            student.papers.push({
                paperName,
                marks,
                deadline,
                submitted,
            });
        }

        await student.save();

        res.status(200).json({
            status: 'success',
            message: 'Test paper marks added successfully',
            data: student,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
