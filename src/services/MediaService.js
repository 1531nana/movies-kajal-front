import { axiosConfig } from "../configuration/axiosConfig";

const obtenerMedias = () => {
    return axiosConfig.get('media', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const obtenerMediaPorId = (id) => {
    return axiosConfig.get(`media/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const creaMedia = (data = {}) => {
    return axiosConfig.post('media', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const editarMedia = (id, data = {}) => {
    return axiosConfig.put(`media/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const eliminarMedia = (id) => {
    return axiosConfig.delete(`media/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export {
    obtenerMedias,
    obtenerMediaPorId,
    creaMedia,
    editarMedia,
    eliminarMedia
}