function IOtipoConta() {
    const tipoConta = document.querySelector('input[name="tipoConta"]:checked').value;
    const nomePessoa = document.getElementById('divNomePessoa');
    const cpfCampo = document.getElementById('divCPFPessoa');
    const EmpresaCampo = document.getElementById('divNomeEmpresa');
    const cnpjCampo = document.getElementById('divCNPJEmpresa');
    const respEmpresa = document.getElementById('divResponsavelEmpresa');

    if (tipoConta === 'juridica') {
        document.getElementById('nomePessoa').value = "";
        document.getElementById('cpf').value = "";

        nomePessoa.style.display = 'none';
        cpfCampo.style.display = 'none';
        EmpresaCampo.classList.remove('d-none');
        cnpjCampo.classList.remove('d-none');
        respEmpresa.classList.remove('d-none');
    } else if (tipoConta === 'fisica') {
        document.getElementById('nomeEmpresa').value = "";
        document.getElementById('cnpj').value = "";
        document.getElementById('responsavelEmpresa').value = "";

        nomePessoa.style.display = 'block';
        cpfCampo.style.display = 'block';
        EmpresaCampo.classList.add('d-none');
        cnpjCampo.classList.add('d-none');
        respEmpresa.classList.add('d-none');
    }
}

$(document).ready(function () {
    $("#cnpj").inputmask("99.999.999/9999-99");
    $("#cpf").inputmask("999.999.999-99");
    $("#telefone").inputmask("(99) 99999-9999");
});

// https://www.youtube.com/watch?v=nJtwKUQkAGo - Preenchimento automático do endereço a partir do CEP usando HTML + JavaScript + BrasilAPI
function buscaCep(campo) {
    let cep = campo.value.replace(/\D/g, '');
    let mensagemErro = document.getElementById('cepErro');
    
    mensagemErro.innerHTML = "";
    limparCamposEndereco(campo);

    if (cep !== "" && cep.length === 8) {
        let urlapi = "https://brasilapi.com.br/api/cep/v1/" + cep;

        let request = new XMLHttpRequest();
        request.open("GET", urlapi);
        request.send();

        request.onload = function () {
            if (request.status === 200) {
                let endereco = JSON.parse(request.response);
                
                console.log(endereco);

                document.getElementById("ruaEndereco").value = endereco.street;
                document.getElementById("bairroEndereco").value = endereco.neighborhood;
                document.getElementById("cidadeEndereco").value = endereco.city;
                document.getElementById("ufEndereco").value = endereco.state;

                let estadoSelect = document.getElementById("ufEndereco");
                let estadoOptions = estadoSelect.options;
                let estadoEncontrado = false;

                for (let i = 0; i < estadoOptions.length; i++) {
                    if (estadoOptions[i].value === endereco.state) {
                        estadoSelect.selectedIndex = i;
                        estadoEncontrado = true;
                        break;
                    }
                }

                if (!estadoEncontrado) {
                    let optionEstado = document.createElement("option");
                    optionEstado.value = endereco.state;
                    optionEstado.textContent = endereco.state;
                    estadoSelect.appendChild(optionEstado);
                    estadoSelect.value = endereco.state;
                }

                let cidadeSelect = document.getElementById("cidadeEndereco");
                cidadeSelect.innerHTML = '';
                let optionCidade = document.createElement("option");
                optionCidade.value = endereco.city;
                optionCidade.textContent = endereco.city;
                cidadeSelect.appendChild(optionCidade);

                bloquearCampo("ruaEndereco");
                bloquearCampo("bairroEndereco");
                bloquearCampo("cidadeEndereco");
                bloquearCampo("ufEndereco");

                mensagemErro.innerHTML = "";

            } else if (request.status === 404) {
                mensagemErro.innerHTML = "CEP não encontrado. Verifique e tente novamente.";
            } else {
                mensagemErro.innerHTML = "Erro ao buscar o CEP. Tente novamente mais tarde.";
            }
        };
    } else if (cep.length !== 8) {
        mensagemErro.innerHTML = "O CEP deve ter 8 dígitos numéricos.";
    }
}

function bloquearCampo(idCampo) {
    let campo = document.getElementById(idCampo);
    campo.readOnly = true;
    campo.style.backgroundColor = "#e9ecef";
}

function limparCamposEndereco(campo) {
    document.getElementById("ruaEndereco").value = "";
    document.getElementById("bairroEndereco").value = "";
    document.getElementById("cidadeEndereco").value = "";
    document.getElementById("ufEndereco").value = "";
}

function desbloquearCampo(idCampo) {
    let campo = document.getElementById(idCampo);
    campo.readOnly = false;
    campo.style.backgroundColor = "#ffffff";
}

window.onload = function () {
    let cep = document.getElementById("cepEndereco");

    $(cep).inputmask("99999-999");

    cep.addEventListener("blur", function () { buscaCep(cep); });

    // Bloquear os campos de endereço ao carregar a página
    bloquearCampo("ruaEndereco");
    bloquearCampo("bairroEndereco");
    bloquearCampo("cidadeEndereco");
    bloquearCampo("ufEndereco");
};