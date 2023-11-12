import axios from "axios";

axios.defaults.url = process.env.BACK_SERVER

interface FetchCodeParams {
    template?: string;
    prompt: string;
    color?: string;
    name?: string;
    imagePrompts?: string
}

export default {
    fetchCode: (params: FetchCodeParams) => {
        return axios.post('/api/fetchCode', params)
    },
    login: (loginData: any) => {
        return axios.post('/api/login', loginData)
    },
    logout: () => {
        return axios.get('/api/logout')
    },
    register: (registerData: any) => {
        return axios.post('/api/register', registerData)
    },
    getHistory: () => {
        return axios.get('/api/getHistory')
    },
    editCode: (codePart: any) => {
        return axios.put('/api/code/edit', codePart)
    }
}