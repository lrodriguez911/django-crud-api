import { useForm } from 'react-hook-form'
import { createTask } from '../api/tasks.api';
import { useNavigate } from 'react-router-dom';


export function TaskFormPage() {

    const { register, handleSubmit, formState: { errors} } = useForm()
    const navigate = useNavigate()
    const onSubmit =  handleSubmit(async data => {
      await createTask(data)
      navigate("/")
    })

    return (
      <div>
        <form onSubmit={onSubmit()}>
          <input type="text" name="title" id="title" placeholder="Title" {...register("title", {required: true})}/>
          {errors.title && <p>Title is required</p>}
          <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" {...register("description", {required: true})}></textarea>
          {errors.description && <p>Description is required</p>}
          <button>Save</button>
        </form>
      </div>
    )
  }
  
  