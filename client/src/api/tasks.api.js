import axios from 'axios'

export const getAllTask = () => {
    return axios.get('http://localhost:8000/tasks/api/v1/tasks/')
        
}