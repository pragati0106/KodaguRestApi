const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Task = require('../models/tasks.js');


router.route('/').post(auth,async (req, res) => {
    const task = new Task(req.body)
    try {
      await task.save();
      res.status(201).send(task); // CREATED
    } catch (error) {
      res.status(400).send(error); // BAD REQUEST
    }
  })

  .get(auth,async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({
            Tasks: tasks
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
      
  })
 
  router.route('/:id').get(auth,async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const task = await Task.findOne({ _id: taskId });
  
      if (!task) {
        return res.status(404).json({
          message: "No task exists with this id"
        });
      }
  
      return res.status(200).json({
        Task: task
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  })
  .patch(auth,async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await Task.findOne({ _id: taskId });

      if (!task) {
        return res.status(404).json({
          message: "No task exists with this id"
        });
      }

      const { title, description, assigned_user, due_date, completionStatus,completionTime } = req.body;

      if (title) {
        task.title = title;
      }
      if (assigned_user) {
        task.assigned_user = assigned_user;
      }
      if (description) {
        task.description = description;
      }
      if (due_date) {
        task.due_date = due_date;
      }
      if (completionStatus===true || completionStatus===false) {
        task.completionStatus = completionStatus;
      }
      if (completionTime) {
        task.completionTime = completionTime;
      }

      await task.save();

      return res.status(201).json({
        message: "Task updated successfully"
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  })
  .delete(auth,async (req, res) => {
    const taskId = req.params.id;
    try {
      const result = await Task.deleteOne({ _id: taskId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: "No task exists with this id"
        });
      }
  
      return res.status(204).json({
        message: "Task deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  });

  router.route('/analytics/completed-last-days/:numberOfDays')
  .get(auth,async (req, res) => {
    try {
      const numberOfDays = parseInt(req.params.numberOfDays);

      if (isNaN(numberOfDays) || numberOfDays <= 0) {
        return res.status(400).json({
          error: "Invalid number of days provided"
        });
      }

      // Calculate the date based on the dynamic number of days
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - numberOfDays);

      // Count the number of completed tasks in the specified days
      const completedTasksCount = await Task.countDocuments({
        completionStatus: true,
        completionTime: { $gte: daysAgo }
      });

      return res.status(200).json({
        completedTasksCount: completedTasksCount
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  });

module.exports = router;