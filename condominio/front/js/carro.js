// Carregar e exibir carros

async function ocultar(id_morador){
    let tbody = document.getElementById(`tudo_carro_${id_morador}`);
    tbody.style.display = "none"
}

async function loadCarro(id_morador) {
    try {
    const response = await fetch(`http://localhost:3002/carros/${id_morador}`);
    const data = await response.json();
    let tbody = document.getElementById(`tudo_carro_${id_morador}`);
    tbody.innerHTML = '';


    function aparecer(){
        tbody.style.display = "block"
    }
    aparecer()



    if (data.success && data.data) {
        data.data.forEach(carros => {
            const linha = document.createElement('div');
            linha.classList.add('carro');
            linha.innerHTML = `
                    <div class="textos">
                        <h2 class="placa">Placa: ${carros.placa}</h2>
                        <h2 class="modelo">Modelo: ${carros.modelo}</h2>
                        <h2 class="cor">Cor: ${carros.cor}</h2>
                        <h2 class="box">Box: ${carros.box}</h2>
                    </div>
                    <div class="icones">
                        <i class="fa-solid fa-pen-to-square" onclick="editarCarro(${carros.id}, ${id_morador})"></i>
                        <i class="fa-solid fa-trash" onclick="deletarCarro(${carros.id}, ${id_morador})"></i>
                        <i class="fa-solid fa-arrow-up" onclick="ocultar(${id_morador})"></i>
                    </div>
            `;
            tbody.appendChild(linha);
        });
    }

} catch (error) {
    console.error("Erro ao carregar carros", error);
};



}


// editar carro

async function editarCarro(id, id_morador) {
    const placa = prompt("Nova placa");
    const modelo = prompt("Novo modelo");
    const cor = prompt("Nova cor");
    const box = prompt("Novo box");


    await fetch(`http://localhost:3002/carros/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placa, modelo, cor, box })
    });

    await loadCarro(id_morador);
}

// Deletar moradores

async function deletarCarro(id, id_morador) {
    await fetch(`http://localhost:3002/carros/${id}`, {
        method: 'DELETE'
    });
    await loadCarro(id_morador);
}

// loadCarro();