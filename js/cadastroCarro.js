async function cadastrarCarro(id_morador) {

    const placa = prompt('Placa: ');
    const modelo = prompt('Modelo: ');
    const cor = prompt('Cor: ');
    const box = prompt('Box: ');

    const data = {
        placa,
        modelo,
        cor,
        box,
        id_morador
    }

    try {
        const response = await fetch('http://localhost:3002/cadastroCarro', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })


        const results = await response.json();


        if (results.success) {
            console.log(results)
            alert(results.message)
            window.location.assign('moradores.html')
        } else {
            alert(results.message)
        }
    }
    catch (error) {
        console.log(error);
    }
};

// loadCarro();