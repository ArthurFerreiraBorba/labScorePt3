var cpfValido = false

async function buscarEndereco() {

    let cep = document.getElementById("input-cep-aluno")

    await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
    .then((response) => {
        return response.json()
    })
    .then((endereco) => {
        cpfValido = true
        console.log(endereco)
        document.getElementById("input-rua-aluno").value = endereco.logradouro
        document.getElementById("input-cidade-aluno").value = endereco.localidade
        document.getElementById("input-estado-aluno").value = endereco.uf
    })
    .catch(() => {
        cpfValido = false
        document.getElementById("erroCpf").innerHTML = "Cpf invalido"
    })
}

function logar(e) {

    e.preventDefault()

    let nome = document.getElementById("input-nome-aluno")
    let idade = document.getElementById("input-idade-aluno")
    let serie = document.getElementById("input-serie-aluno")
    let escola = document.getElementById("input-escola-aluno")
    let materia = document.getElementById("input-materia-aluno")
    let cep = document.getElementById("input-cep-aluno")
    let rua = document.getElementById("input-rua-aluno")
    let cidade = document.getElementById("input-cidade-aluno")
    let estado = document.getElementById("input-estado-aluno")


    if (cpfValido && nome && idade && serie && escola && materia && cep && rua && cidade && estado) {
        localStorage.setItem("nome", nome.value)
        localStorage.setItem("idade", idade.value)
        localStorage.setItem("serie", serie.value)
        localStorage.setItem("escola", escola.value)
        localStorage.setItem("materiaFavorita", materia.value)
        localStorage.setItem("cep", cep.value)
        localStorage.setItem("rua", rua.value)
        localStorage.setItem("cidade", cidade.value)
        localStorage.setItem("estado", estado.value)

        window.location = "http://127.0.0.1:5500/index.html"
    }

    
}