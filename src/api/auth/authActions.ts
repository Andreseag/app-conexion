import Cookies from 'js-cookie';

async function apiLogin(body: { username: string; password: string; }) {
  const API_URL = process.env.API;
  const loginUrl = `${API_URL}/login`;
  const res = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  Cookies.set('currentUser', JSON.stringify(data));
  

  return data;
}

export default apiLogin;