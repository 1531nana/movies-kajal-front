import { axiosConfig } from "../configuration/axiosConfig";

const obtenerDirectores = (estado = '') => {
    const params = estado ? { estado } : {};
    return axiosConfig.get('directores', {
        params,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const creaDirector = (data = {}) => {
    return axiosConfig.post('directores', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const editarDirector = (id, data = {}) => {
    return axiosConfig.put(`directores/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export {
    obtenerDirectores,
    creaDirector,
    editarDirector
}