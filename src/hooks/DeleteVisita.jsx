export const DeleteVisita = (id) => {

    return fetch('https://wpschool.it/clinica/clinica-Boselli/api/deleteVisita.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Visita eliminata con successo');
            
        } else {
            console.error("Errore nell'eliminazione della visita:", data.error);
           
        }
    })
    .catch(error => {
        console.error("Errore nell'eliminazione della visita:", error);
    });

};