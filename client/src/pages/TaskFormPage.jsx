import { useForm } from 'react-hook-form'


export function TaskFormPage() {

    const { register, handleSubmit } = useForm()

    const onSubmit = handleSubmit(data => {
      console.log(data);
    })

    return (
      <div>
        <form onSubmit={onSubmit()}>
          <input type="text" name="title" id="title" placeholder="Title" {...register("title", {required: true})}/>
          <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" {...register("description", {required: true})}></textarea>
          <button>Save</button>
        </form>
      </div>
    )
  }
  
  