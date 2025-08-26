// Replace the ENTIRE content with this:
let authState = {
  token: null,
  user: null
};

export function saveAuth({ token, user }) {
  authState.token = token;
  authState.user = user;
  // Also save to localStorage if you want persistence
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch {
    console.warn('localStorage not available');
  }
}

export function clearAuth() {
  authState.token = null;
  authState.user = null;
  // Also clear from localStorage
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch {
    console.warn('localStorage not available');
  }
}

export function getUser() {
  if (authState.user) return authState.user;
  // Fallback to localStorage
  try {
    const u = localStorage.getItem('user');
    if (u) {
      authState.user = JSON.parse(u);
      return authState.user;
    }
  } catch {
    console.warn('localStorage not available');
  }
  return null;
}

export function isAuthed() {
  if (authState.token) return true;
  // Fallback to localStorage
  try {
    const token = localStorage.getItem('token');
    if (token) {
      authState.token = token;
      return true;
    }
  } catch {
    console.warn('localStorage not available');
  }
  return false;
}

export function getToken() {
  if (authState.token) return authState.token;
  try {
    const token = localStorage.getItem('token');
    if (token) {
      authState.token = token;
      return token;
    }
  } catch {
    console.warn('localStorage not available');
  }
  return null;
}