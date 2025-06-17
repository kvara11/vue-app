import { ref } from 'vue';

const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

const testUser = {
  username: 'admin',
  password: 'admin',
};


function login(username: string, password: string) {

  if (username === testUser.username && password === testUser.password) {
    user.value = { username };
    localStorage.setItem('user', JSON.stringify(user.value));
    return true;
  }
  return false;
}

function logout() {
  user.value = null;
  localStorage.removeItem('user');
}

function isLoggedIn() {
  return !!user.value;
}

export function authService() {
  return {
    user,
    login,
    logout,
    isLoggedIn,
  };
}
