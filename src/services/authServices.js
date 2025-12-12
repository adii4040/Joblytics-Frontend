import { registerUserRoute, loginUserRoute, getCurrentUserRoute, logoutUserRoute } from './routes.js'

const registerUser = async (formData) => {
    const res = await fetch(registerUserRoute, {
        method: 'POST',
        body: formData,
        credentials: "include"
    })

    const contentType = res.headers.get("content-type")
    if (!res.ok) {
        const errorData = contentType && contentType.includes('application/json') ? await res.json() : { error: await res.text() }
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Login Failed")
    }

    const data = await res.json()
    return data
}

const loginUser = async (formData) => {
    const res = await fetch(loginUserRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
    })

    const contentType = res.headers.get('content-type')

    if (!res.ok) {
        const errorData = contentType && contentType.includes('application/json') ? await res.json() : { error: await res.text() }
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Login Failed")
    }

    const data = await res.json()

    return data
}

const fetchCurrentUser = async () => {
    const res = await fetch(getCurrentUserRoute, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Not authenticated");
    }

    return await res.json();
}

const logoutUser = async () => {
    const res = await fetch(logoutUserRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData)
        throw new Error(errorData.message || "Failed to logout current user!!")
    }

    const data = await res.json()

    return data
}

export { registerUser, loginUser, fetchCurrentUser, logoutUser }