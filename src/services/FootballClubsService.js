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
const getUser = (userId) => http.get(`/users/${userId}`)

//clubs
const createClub = ({ name, teamCountry, teamLeague, team, isOfficialClub, city }) =>
  http.post('/clubs', { name, teamCountry, teamLeague, team, isOfficialClub, city })
const getClub = (clubUsername) => http.get(`/clubs/${clubUsername}`)

const getClubs = () => http.get('/clubs').then(res => res.data)
const getMembers = (clubUsername) => http.get(`/clubs/${clubUsername}/users`)
  .then(users => users.data)

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
  getUser,
  createClub,
  getClubs,
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
