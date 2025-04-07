async function cadastrar(event) {
    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const bloco = document.getElementById('bloco').value;
    const apartamento = document.getElementById('apartamento').value;
    const tipo = document.getElementById('tipo').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;



    const data = {
        nome,
        bloco, 
        apartamento,
        tipo,
        telefone,
        email
    }


    try {
        const response = await fetch('http://localhost:3002/cadastroPessoa', {
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