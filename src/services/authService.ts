import { ref } from 'vue';
import type { User } from '../types';

// სადემონსტრაციო მომხმარებლის მონაცემები
const user = ref<User | null>(null);

const testUser = {
  username: 'admin',
  password: 'admin',
  firstName: 'სახელი',
  lastName: 'გვარი',
  role: 'admin',
};


function login(username: string, password: string) {

  if (username === testUser.username && password === testUser.password) {
    user.value = { ...testUser };
    sessionStorage.setItem('user', JSON.stringify(user.value));
    return true;
  }
  return false;
}


const initUser = () => {
  const getUser = sessionStorage.getItem('user');
  if (getUser) {
    user.value = JSON.parse(getUser);
  }
};


function logout() {
  user.value = null;
  sessionStorage.removeItem('user');
}


export default function authService() {  
  return {
    user,
    login,
    initUser,
    logout
  };
}
