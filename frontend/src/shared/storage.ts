// Maneja el token JWT de forma centralizada
export const saveToken = (token: string) => {
    localStorage.setItem('gavac_token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('gavac_token');
};

export const clearToken = () => {
    localStorage.removeItem('gavac_token');
};