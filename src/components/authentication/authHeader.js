export default function authHeader() {
    let user_access_token = JSON.parse(localStorage.getItem('access_token'));
  
    if (user_access_token) {
      return { Authorization: 'Bearer ' + user_access_token }; // for Spring Boot
      // back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }
  