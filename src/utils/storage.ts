const TOKEN = 'token';
const storage = {
    setToken: (value: string): void => {
        value === "" ? sessionStorage.removeItem(TOKEN)
            : sessionStorage.setItem(TOKEN, value);
    },
    getToken: (): string | null => {
        return sessionStorage.getItem(TOKEN);
    }
}
export default storage
