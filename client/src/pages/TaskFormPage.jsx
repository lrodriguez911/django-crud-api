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
    <div>
      <form onSubmit={onSubmit()}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <p>Title is required</p>}
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <p>Description is required</p>}
        <button>Save</button>
      </form>
      {params.id && (
        <button
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
      )}
    </div>
  );
}
