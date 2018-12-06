import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})


const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  loginGoogle() {
    return service
    .get('/auth/google')
  },

  loginGoogleNow() {
    localStorage.setItem('user', true)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  getPlants() {
    return service
      .get('/plant/collection')
      .then(res => res.data)
      .catch(errHandler)
  },

  getPlantDetail(id) {
    return service
    .get(`/plant/${id}`)
    .then(res => res.data)
    .catch(errHandler)
  },


  deletePlant(id) {
    return service
    .delete(`/plant/${id}`)
    .then(res => res.data)
    .catch(errHandler)
  },

  addPlant(plantData) {
    console.log("Api", plantData)
    return service
    .post("/plant", plantData)
    .then (res => res.data) 
  },

  editPlant(plantData, id) {
    console.log("Api",id )
    return service
    .put(`/plant/${id}`, plantData)
    .then (res => res.data)
    .catch(errHandler)
  },

  addPicture(file, id) {
    const formData = new FormData();
    formData.append("picture", file)
    console.log('DEBUG formData', formData.get("picture"));
    return service
      .post(`/plant/picture/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  getFarmboxPlants(searchWord){
    console.log("API")
    axios.get(`https://openfarm.cc/api/v1/crops?filter=${searchWord}`)
    .then(plant => plant.data)
  },

  mailNotification(email, dates) {
    return service
    .post(`/mail-notification/`, {email, dates})
    .then (res => res)
    .catch(errHandler)
  },



}

