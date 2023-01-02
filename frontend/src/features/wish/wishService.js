import axios from 'axios'

const API_URL = '/api/wish/'

// Create new wish
const createWish = async (wishData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, wishData, config)

  return response.data
}

// Get user wish
const getWish = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user wish
const deleteWish = async (wishId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + wishId, config)

  return response.data
}

const wishService = {
  createWish,
  getWish,
  deleteWish,
}

export default wishService