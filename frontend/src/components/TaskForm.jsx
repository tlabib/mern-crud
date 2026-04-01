import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title:'',
    description:'',
    deadline:'',
    priority:'Medium',
    status:'Pending'
  });

  const [message,setMessage] = useState('');

  useEffect(()=>{

    if(editingTask){

      setFormData({
        title:editingTask.title || '',
        description:editingTask.description || '',
        deadline:editingTask.deadline?.substring(0,10) || '',
        priority:editingTask.priority || 'Medium',
        status:editingTask.status || 'Pending'
      });

    }else{

      setFormData({
        title:'',
        description:'',
        deadline:'',
        priority:'Medium',
        status:'Pending'
      });

    }

  },[editingTask]);



  const handleSubmit = async(e)=>{

    e.preventDefault();

    if(!formData.title){
      alert("Title is required");
      return;
    }

    try{

      if(editingTask){

        const response = await axiosInstance.put(

          `/api/tasks/${editingTask._id}`,
          formData,

          {
            headers:{
              Authorization:`Bearer ${user.token}`
            }
          }

        );

        setTasks(

          tasks.map(task=>
            task._id===response.data._id
            ? response.data
            : task
          )

        );

        setMessage("Task updated successfully");

      }else{

        const response = await axiosInstance.post(

          '/api/tasks',
          formData,

          {
            headers:{
              Authorization:`Bearer ${user.token}`
            }
          }

        );

        setTasks([...tasks,response.data]);

        setMessage("Task created successfully");

      }

      setEditingTask(null);

      setFormData({
        title:'',
        description:'',
        deadline:'',
        priority:'Medium',
        status:'Pending'
      });

      setTimeout(()=>{
        setMessage('');
      },2000);


    }catch(error){

      console.log(error.response?.data);

      alert(
        error.response?.data?.message
        || "Failed to save task"
      );

    }

  };



  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mb-6"
    >

      <h1 className="text-2xl font-bold mb-4">

        {editingTask
          ? 'Edit Task'
          : 'Create Task'
        }

      </h1>


      {message && (

        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">

          {message}

        </div>

      )}


      <input

        type="text"
        placeholder="Title"

        value={formData.title}

        onChange={(e)=>
          setFormData({
            ...formData,
            title:e.target.value
          })
        }

        className="w-full mb-4 p-2 border rounded"

      />


      <input

        type="text"
        placeholder="Description"

        value={formData.description}

        onChange={(e)=>
          setFormData({
            ...formData,
            description:e.target.value
          })
        }

        className="w-full mb-4 p-2 border rounded"

      />


      <input

        type="date"

        value={formData.deadline}

        onChange={(e)=>
          setFormData({
            ...formData,
            deadline:e.target.value
          })
        }

        className="w-full mb-4 p-2 border rounded"

      />


      <select

        value={formData.priority}

        onChange={(e)=>
          setFormData({
            ...formData,
            priority:e.target.value
          })
        }

        className="w-full mb-4 p-2 border rounded"

      >

        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>

      </select>



      <select

        value={formData.status}

        onChange={(e)=>
          setFormData({
            ...formData,
            status:e.target.value
          })
        }

        className="w-full mb-4 p-2 border rounded"

      >

        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>

      </select>



      <button

        type="submit"

        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"

      >

        {editingTask
          ? 'Update Task'
          : 'Create Task'
        }

      </button>


    </form>

  );

};

export default TaskForm;