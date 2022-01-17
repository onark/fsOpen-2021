import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const setAuthConfig = (token) => ({
    headers: {
        Authorization: token,
    },
})

const clearToken = () => (token = null)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newBlogObject => {
    const response = await axios.post(baseUrl, newBlogObject, setAuthConfig(token))
    return response.data
}

const update = async (blogObject) => {
    const response = await axios.put(
        `${baseUrl}/${blogObject.id}`,

        blogObject,
        setAuthConfig(token)
    )
    return response.data
}

const deleteBlog = async (blogId) => {
    return await axios.delete(`${baseUrl}/${blogId}`, setAuthConfig(token))
}

const comment = async (blogObject) => {
    const response = await axios.post(
        `${baseUrl}/${blogObject.id}/comments`,

        blogObject,
        setAuthConfig(token)
    )
    return response.data
}

export default { getAll, create, update, deleteBlog, comment, setToken, clearToken }
