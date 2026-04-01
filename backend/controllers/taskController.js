const Task = require('../models/Task');

const getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({user:req.user.id});
        res.json(tasks);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const createTask = async(req,res)=>{
    try{
        const {title,description,deadline,priority,status} = req.body;

        const task = await Task.create({
            title,
            description,
            deadline,
            priority,
            status,
            user:req.user.id
        });

        res.status(201).json(task);

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const updateTask = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        task.deadline = req.body.deadline || task.deadline;
task.priority = req.body.priority || task.priority;

        const updatedTask = await task.save();

        res.json(updatedTask);

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        await task.deleteOne();

        res.json({message:"Task removed"});

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = {getTasks,createTask,updateTask,deleteTask};