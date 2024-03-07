export const checkAuth = () => {
    const token = sessionStorage.getItem('token');

    if (token) {
        return fetch('https://wpschool.it/clinica/boselli/api/token.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.log(error);
            return false;
        });
    } else {
        return Promise.resolve(false);
    }
};