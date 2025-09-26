import { axiosConfig } from "../configuration/axiosConfig";

const obtenerGeneros = () => {
    return axiosConfig.get('generos', {
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    })
}

const creaGenero = (data = {}) => {
    return axiosConfig.post('generos', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    })
}

const obtenerGeneroPorId = (id) => {
    return axiosConfig.get(`generos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const editarGenero = (id, data = {}) => {
    return axiosConfig.put(`generos/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const eliminarGenero = (id) => {
    return axiosConfig.delete(`generos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export {
    obtenerGeneros,
    creaGenero,
    obtenerGeneroPorId,
    editarGenero,
    eliminarGenero  
}


