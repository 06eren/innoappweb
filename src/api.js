const API_BASE_URL = 'http://localhost:3000/api'; 

/**
 * 
 * @param {string} prompt 
 * @param {string | null} imageData 
 * @returns {Promise<string>} 
 */
export async function callGeminiApi(prompt, imageData = null) {
    try {
        const response = await fetch(`${API_BASE_URL}/gemini/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({ prompt, imageData }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API isteği başarısız oldu.');
        }

        const result = await response.json();
        return result.text;

    } catch (error) {
        console.error('Gemini API Hatası:', error);
        return 'Yapay zeka asistanına bağlanırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.';
    }
}

/**
 * 
 * @param {object} formData  
 * @returns {Promise<object>} 
 */
export async function sendContactMessage(formData) {
     try {
        const response = await fetch(`${API_BASE_URL}/contact/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Mesaj gönderilemedi.');
        }

        return await response.json();

    } catch (error) {
        console.error('İletişim Formu Hatası:', error);
        throw error; 
    }
}
