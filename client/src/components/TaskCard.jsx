import { useNavigate } from "react-router-dom"

export function TaskCard({ task }) {
  
  const navigate = useNavigate()


  return (
    <div onClick={() => navigate(`/tasks/${task.id}`)} className="bg-zinc-800 p-3 hover:bg-zinc-600 hover:cursor-pointer">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <hr />
    </div>
  )
}
