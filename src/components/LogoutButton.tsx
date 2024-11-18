export default function LogoutButton() {
    async function handleLogout() {
      try {
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        if (response.ok) {
          console.log('Logout successful. Redirecting to login...');
          window.location.href = '/login'; // Redirect after logout
        } else {
          console.error('Logout failed:', await response.json());
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  
    return <button onClick={handleLogout}>Logout</button>;
  }
  