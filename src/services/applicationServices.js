import {uploadApplicationRoute, getApplicationsRoute, getApplicationByIdRoute, updateApplicationRoute, deleteApplicationRoute, deleteAllApplicationsRoute,} from './routes.js'


const uploadApplication = async (formData) => {
    const res = await fetch(uploadApplicationRoute, {
        method: 'POST',
        body: formData,
        credentials: "include"
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Upload Application Failed")
    }
    const data = await res.json()
    return data
}

const fetchAllApplications = async () => {
    const res = await fetch(getApplicationsRoute, {
        credentials: "include"
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Fetch Applications Failed")
    }
    const data = await res.json()
    return data
}

const fetchApplicationById = async (id) => {    
    const res = await fetch(getApplicationByIdRoute(id), {
        credentials: "include"
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Fetch Application Failed")
    }
    const data = await res.json()
    return data
}

const updateApplication = async (id, data) => {
    const res = await fetch(updateApplicationRoute(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Update Application Failed")
    }
    const responseData = await res.json()
    return responseData
}   

const deleteApplication = async (id) => {
    const res = await fetch(deleteApplicationRoute(id), {
        method: 'DELETE',   
        credentials: "include"
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Delete Application Failed")
    }
    const data = await res.json()
    return data
}

const deleteAllApplications = async () => {
    const res = await fetch(deleteAllApplicationsRoute, {
        method: 'DELETE',
        credentials: "include"
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Delete All Applications Failed")
    }
    const data = await res.json()
    return data
}

export {
    uploadApplication,
    fetchAllApplications,
    fetchApplicationById,
    updateApplication,
    deleteApplication,
    deleteAllApplications,
}