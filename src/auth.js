const API_BASE_URL = 'http://localhost:3000/api/auth'; 

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} 
 */
export async function registerUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} 
 */
export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();

    //Token saklama test
    if (data.token) {
        localStorage.setItem('authToken', data.token);
    }
    
    return data;
}

//OTURUM SONLARNDIRMA
export function logoutUser() {
    localStorage.removeItem('authToken');
    console.log('Kullanıcı çıkış yaptı.');
}

/**
 * 
 * @returns {Promise<object|null>} 
 */
export async function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/status`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            logoutUser();
            return null;
        }
        
        return await response.json(); 
    } catch (error) {
        console.error('Auth status check failed:', error);
        return null;
    }
}
