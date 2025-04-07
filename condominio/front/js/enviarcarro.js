document.getElementById("cadastroCarro").addEventListener('submit', async (e) => {
    e.preventDefault();

    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modelo').value;
    const cor = document.getElementById('cor').value;
    const box = document.getElementById('box').value;

    await fetch('http://localhost:3002/cadastroCarro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({placa, modelo, cor, box})
    });

    document.getElementById('cadastroPessoa').reset(); 
    // loadCarro(); 
    
});