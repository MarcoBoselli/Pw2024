export const checkAuth = async () => {
    const token = sessionStorage.getItem('token');

    if (token) {
        try {
            const response = await fetch('https://wpschool.it/clinica/clinica-Boselli/api/token.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (data.success) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    } else {
        return false;
    }
};