import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Task updated successfully", {position: "bottom-right", style: {
        background: "#101010",
        color: "#fff"
      }})
    } else {
      await createTask(data);
      toast.success("Task created successfully", {position: "bottom-right", style: {
        background: "#101010",
        color: "#fff"
      }})
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
          const {data: {title, description}} = await getTask(params.id);
          
          setValue("title",title)
          setValue("description",description)
      } 
    }
    loadTask();
  }, [])

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit()}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          {...register("title", { required: true })}
        />
        {errors.title && <p>Title is required</p>}
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Description"
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <p>Description is required</p>}
        <button className="bg-indigo-500 p-3 rounded-lg text-white block w-full mt-3" value="Save Task">Save</button>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <button
        className="bg-red-500 p-3 rounded-lg w-48 mt-3"
          onClick={async () => {
            const accepted = window.confirm("Are you sure?");
            if (accepted) {
              await deleteTask(params.id);
              toast.success("Task deleted successfully", {position: "bottom-right", style: {
                background: "#101010",
                color: "#fff"
              }})
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
        </div>
      )}
    </div>
  );
}
