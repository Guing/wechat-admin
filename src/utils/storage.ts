const TOKEN = 'token';
interface storage {
    [key: string]: (value?: string) => string | null
}
const storage = {
    setToken: (value: string): void => {
        value === "" ? localStorage.removeItem(TOKEN)
            : localStorage.setItem(TOKEN, value);
    },
    getToken: (): string | null => {
        return localStorage.getItem(TOKEN);
    }
}
export default storage
