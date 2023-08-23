import { useEffect } from "react"
import { getAllTask } from "../api/tasks.api"

export function TasksList() {

    useEffect(() => {
        function loadTasks() {
            const res = getAllTask()
            console.log(res);
        }
        loadTasks();
    }, [])
  return (
    <div>TasksList</div>
  )
}

