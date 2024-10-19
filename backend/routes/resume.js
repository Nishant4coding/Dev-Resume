const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Resume = require("../models/Resume");

// Route 1: Get All Resumes for the Logged-In User: GET "/api/resume/fetchEntries". Login required
router.get("/fetchEntries", fetchUser, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a New Resume: POST "/api/resume/addResume". Login required
router.post(
  "/addResume",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new Resume object
      const resume = new Resume({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedResume = await resume.save();
      res.json(savedResume);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update an Existing Resume: PUT "/api/resume/updateResume/:id". Login required
router.put("/updateResume/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create an object for the updated resume
    const updatedResume = {};
    if (title) updatedResume.title = title;
    if (description) updatedResume.description = description;
    if (tag) updatedResume.tag = tag;

    // Find the resume to be updated
    let resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send("Resume Not Found");
    }

    // Allow updates only if the logged-in user owns this resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update the resume
    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: updatedResume },
      { new: true }
    );
    res.json(resume);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Delete an Existing Resume: DELETE "/api/resume/deleteResume/:id". Login required
router.delete("/deleteResume/:id", fetchUser, async (req, res) => {
  try {
    // Find the resume to be deleted
    let resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send("Resume Not Found");
    }

    // Allow deletion only if the user owns this resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the resume
    resume = await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume Deleted Successfully", resume });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
