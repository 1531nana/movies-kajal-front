import { axiosConfig } from "../configuration/axiosConfig";

const obtenerProductoras = (estado = '') => {
    const params = estado ? { estado } : {};
    return axiosConfig.get('productoras', {
        params,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const obtenerProductoraPorId = (id) => {
    return axiosConfig.get(`productoras/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const creaProductora = (data = {}) => {
    return axiosConfig.post('productoras', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const editarProductora = (id, data = {}) => {
    return axiosConfig.put(`productoras/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export {
    obtenerProductoras,
    obtenerProductoraPorId,
    creaProductora,
    editarProductora
}