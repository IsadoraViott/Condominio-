// Carregar e exibir morador

async function loadMorador(event) {
    try {
    const response = await fetch('http://localhost:3002/moradores');
    const data = await response.json();
    const tbody = document.getElementById('tudo');
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(moradores => {
            const linha = document.createElement('div');
            linha.classList.add('card');
            linha.innerHTML = `
            <div class="textos">
                <h2 class="nome">Morador: ${moradores.nome} </h2>
                <h2 class="bloco">Bloco:  ${moradores.bloco} </h2>
                <h2 class="apartamento">Apartamento:  ${moradores.apartamento} </h2>
                <h2 class="tipo">Status:  ${moradores.tipo} </h2>
                <h2 class="telefone">Telefone:  ${moradores.telefone} </h2>
                <h2 class="email">E-mail: ${moradores.email}  </h2>
            </div>
            <div class="icones">
                <i class="fa-solid fa-pen-to-square" onclick="editarMorador(${moradores.id})"></i>
                <i class="fa-solid fa-trash" onclick="deletarMorador(${moradores.id})"></i>
                <i class="fa-solid fa-car" onclick="loadCarro(${moradores.id})"></i>
                <i class="fa-solid fa-plus" onclick="cadastrarCarro(${moradores.id})"></i>
            </div>
            <div id="tudo_carro_${moradores.id}"></div>
            `;
            tbody.appendChild(linha);
        });
    }
} catch (error) {
    console.error("Erro ao carregar carros", error);
};

}

async function editarMorador(id) {
    const nome = prompt("Novo nome");
    const bloco = prompt("Novo bloco");
    const apartamento = prompt("Novo apartamento");
    const tipo = prompt("Novo tipo")
    const telefone = prompt("Novo telefone")
    const email = prompt("Novo email")

    await fetch(`http://localhost:3002/moradores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, bloco, apartamento, tipo, telefone, email })
    });

    await loadMorador();
}

// Deletar moradores

async function deletarMorador(id) {
    await fetch(`http://localhost:3002/moradores/${id}`, {
        method: 'DELETE'
    });
    await loadMorador();
}

loadMorador();