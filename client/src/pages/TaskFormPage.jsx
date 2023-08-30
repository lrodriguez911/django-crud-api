import { useForm } from "react-hook-form";
import { createTask, deleteTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit = handleSubmit(async (data) => {
    await createTask(data);
    navigate("/");
  });

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
