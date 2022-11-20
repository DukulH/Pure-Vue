import axios from 'axios';
class AuthService {
    async login(payload) {
    const response = await axios.post('/api/token/', {
            username: payload.username,
            password: payload.password
        });
        const data = response.config.data;
        console.log(JSON.parse(data));
        const results = response.data;
        if (results.access) {
            localStorage.setItem('access_token', JSON.stringify(results.access));
            localStorage.setItem('refresh_token', JSON.stringify(results.refresh));
            localStorage.setItem('isLoggedIn', 'true') 
        }
        return await Promise.resolve(response);

}

logout() {
    localStorage.clear();
}
async refreshToken() {
  const refresh_token = await JSON.parse(localStorage.getItem('refresh_token'));
  return await axios.post('api/token/refresh/', {"refresh": refresh_token})
    .then(response => {
      if (response.data.access) {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', JSON.stringify(response.data.access));
      }
      return Promise.resolve(response);
    });
}
}
export default new AuthService();