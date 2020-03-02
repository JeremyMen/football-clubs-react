import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign('/login')
    }

    return Promise.reject(error)
  }
)

//base
const login = ({ email, password }) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

//users
const createUser = (data) => http.post('/create', data)
const getUser = (data) => http.get(`/users/${data}`)
const updateUser = (userUsername, data) => http.patch(`/users/${userUsername}`, data)
const deleteUser = (userUsername) => http.delete(`/users/${userUsername}`)

//clubs
const createClub = (data) => http.post('/clubs', data)
const getClub = (clubUsername) => http.get(`/clubs/${clubUsername}`)
const getClubs = () => http.get('/clubs').then(res => res.data)
const getMembers = (clubUsername) => http.get(`/clubs/${clubUsername}/users`).then(users => users.data)
const updateClub = (clubUsername, data) => http.patch(`/clubs/${clubUsername}`, data)
const deleteClub = (clubUsername) => http.delete(`/clubs/${clubUsername}`)


//apiFootball
const getTeam = (teamName) => http.get(`/teams/${teamName}`)
const getLeague = (leagueName) => http.get(`/teams/${leagueName}`)
const getCountries = () => http.get('/countries')
const getLeagueFromCountry = (countryName) => http.get(`/countries/${countryName}/leagues`)
const getTeamsByLeagueId = (leagueId) => http.get(`/league/${leagueId}/teams`)
const getLeagueTable = (leagueName, countryName) => http.get(`/leagueTable/${leagueName}/countries/${countryName}`)
const getNextMatch = (teamName, numberOfMatches) => http.get(`/matches/team/${teamName}/next/${numberOfMatches}`)
const getPrevioustMatch = (teamName, numberOfMatches) => http.get(`/matches/team/${teamName}/last/${numberOfMatches}`)

export default {
  login,
  logout,
  createUser,
  updateUser,
  getUser,
  deleteUser,
  createClub,
  getClubs,
  updateClub,
  deleteClub,
  getMembers,
  getTeam,
  getLeague,
  getCountries,
  getLeagueFromCountry,
  getTeamsByLeagueId,
  getLeagueTable,
  getClub,
  getNextMatch,
  getPrevioustMatch
}
