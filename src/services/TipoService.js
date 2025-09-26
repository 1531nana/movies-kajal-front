import { axiosConfig } from "../configuration/axiosConfig";

const obtenerTipos = () => {
    return axiosConfig.get('tipos', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const creaTipo = (data = {}) => {
    return axiosConfig.post('tipos', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export {
    obtenerTipos,
    creaTipo
}