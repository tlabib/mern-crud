const User = require('../models/User');
const Task = require('../models/Task');

const getUsers = async(req,res)=>{

 try{

  const users = await User.find().select('-password');

  const usersWithTaskCount = await Promise.all(

   users.map(async(user)=>{

    const taskCount = await Task.countDocuments({
     user:user._id
    });

    return{
     ...user._doc,
     taskCount
    };

   })

  );

  res.json(usersWithTaskCount);   // ✅ ONLY ONE RESPONSE

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

const getAllTasks = async(req,res)=>{

 try{

  const tasks = await Task.find().populate(
   'user',
   'name email'
  );

  res.json(tasks);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};
const updateUser = async(req,res)=>{

 try{

  const user = await User.findById(req.params.id);

  if(!user){
   return res.status(404).json({
    message:"User not found"
   });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;

  const updatedUser = await user.save();

  res.json({
   id:updatedUser._id,
   name:updatedUser.name,
   email:updatedUser.email,
   role:updatedUser.role
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

const deleteTaskAdmin = async(req,res)=>{

 try{

  const task = await Task.findById(
   req.params.id
  );

  if(!task){

   return res.status(404).json({
    message:"Task not found"
   });

  }

  await task.deleteOne();

  res.json({
   message:"Task deleted by admin"
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

module.exports={
 getUsers,
 getAllTasks,
 deleteTaskAdmin,
 updateUser
};