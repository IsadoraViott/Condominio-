document.getElementById("cadastroPessoa").addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const bloco = document.getElementById('bloco').value;
    const apartamento = document.getElementById('apartamento').value;
    const tipo = document.getElementById('tipo').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    await fetch('http://localhost:3002/cadastroPessoa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, bloco, apartamento, tipo, telefone, email})
    });

    document.getElementById('cadastroPessoa').reset(); 
    loadMorador(); 
    
});