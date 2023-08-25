import { useEffect } from "react"
import { getAllTask } from "../api/tasks.api"

export function TasksList() {

    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTask()
            console.log(res);
        }
        loadTasks();
    }, [])
  return (
    <div>TasksList</div>
  )
}

