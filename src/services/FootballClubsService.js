import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

//base
const login = ({ email, password }) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

//users
const createUser = ({ fullName, username, email, password }) => 
  http.post('/create', { fullName, username, email, password })

//clubs
const createClub = ({ name, teamCountry, teamLeague, team, isOfficialClub, city }) =>
  http.post('/clubs', { name, teamCountry, teamLeague, team, isOfficialClub, city })

const getClubs = () => http.get('/clubs').then(res => res.data)
const getMembers = (clubUsername) => http.get(`/clubs/${clubUsername}/users`)
  .then(users => users.data)

//apiFootball
const getTeam = (teamName) => http.get(`/teams/${teamName}`)
const getLeague = (leagueName) => http.get(`/teams/${leagueName}`)
const getCountries = () => http.get('/countries')
const getLeagueFromCountry = (countryName) => http.get(`/countries/${countryName}/leagues`)
const getTeamsByLeagueId = (leagueId) => http.get(`/league/${leagueId}/teams`)

export default {
  login,
  logout,
  createUser,
  createClub,
  getClubs,
  getMembers,
  getTeam,
  getLeague,
  getCountries,
  getLeagueFromCountry,
  getTeamsByLeagueId
}
