function alterarTela(tipo) {
    let valorDoacao = document.getElementById('valorDoacao').value;
    let escolhaDoacao = document.getElementById('escolhaDoacao');
    let campoDinheiro = document.getElementById('campoDinheiro');
    let campoItemFisico = document.getElementById('campoItemFisico');
    let campoPix = document.getElementById('gerarPix');
    let campoItemFisico2 = document.getElementById('campoItemFisico2');
    let cartaoSelecionado = document.getElementById('pagamentoCartao').checked;
    let pixSelecionado = document.getElementById('pagamentoPix').checked;

    let valorNumerico = parseFloat(valorDoacao.replace(/\./g, '').replace(',', '.'));

    if (tipo === 'dinheiro') {
        escolhaDoacao.classList.remove('active');
        escolhaDoacao.classList.add('hidden');
        campoDinheiro.classList.remove('hidden');
        campoDinheiro.classList.add('active');
    } else if (tipo === 'itens') {
        escolhaDoacao.classList.remove('active');
        escolhaDoacao.classList.add('hidden');
        campoItemFisico.classList.remove('hidden');
        campoItemFisico.classList.add('active');
    } else if (tipo === 'finaliza') {
        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            if (cartaoSelecionado) {
                inserirValor(valorDoacao);
                $('#confirmacaoModal').modal('show');
            } else if (pixSelecionado) {
                inserirValor(valorDoacao);
                campoDinheiro.classList.remove('active');
                campoDinheiro.classList.add('hidden');
                campoPix.classList.remove('hidden');
                campoPix.classList.add('active');
            } else {
                window.alert("Selecione algum método de pagamento.");
            }
        } else {
            window.alert("Insira um valor para doar.");
        }
    } else if (tipo === "prosseguirFisico") {
        campoItemFisico.classList.remove('active');
        campoItemFisico.classList.add('hidden');
        campoItemFisico2.classList.remove('hidden');
        campoItemFisico2.classList.add('active');
    }
     else if (tipo === 'voltaCampanha') {
        location.href = "perfil.html";
    } else {
        campoPix.classList.remove('active');
        campoPix.classList.add('hidden');
        campoItemFisico.classList.remove('active');
        campoItemFisico.classList.add('hidden');
        campoItemFisico2.classList.remove('active');
        campoItemFisico2.classList.add('hidden');
        campoDinheiro.classList.remove('active');
        campoDinheiro.classList.add('hidden');
        escolhaDoacao.classList.add('active');
    }
}

document.getElementById('btnConfirmarDoacao').addEventListener('click', function () {
    alterarTela('finaliza');
});

document.getElementById('btnConfirmar').addEventListener('click', function () {
    $('#confirmacaoModal').modal('hide');
    setTimeout(function () {
        $('#sucessoModal').modal('show');
    }, 500);
});

document.getElementById('btnConfirmarPix').addEventListener('click', function () {
    $('#validacaoModal').modal('show');

    document.getElementById('btnConfirmarPix').style.display = 'none';

    setTimeout(function () {
        $('#validacaoModal').modal('hide');

        setTimeout(function () {
            $('#sucessoModalPix').modal('show');
        }, 500); 

    }, 3000);
});

document.getElementById('btnConfirmarFisico').addEventListener('click', function () {
    $('#solicitacaoPedido').modal('show');

    document.getElementById('btnConfirmarFisico').style.display = 'none';

    setTimeout(function () {
        $('#solicitacaoPedido').modal('hide');

        setTimeout(function () {
            $('#sucessoPedido').modal('show');
        }, 500); 

    }, 3000);
});


$(document).ready(function () {
    function aplicarMascaraCartao() {
        $("#numeroCartao").inputmask({
            mask: "9999 9999 9999 9999",
            placeholder: " ",
            showMaskOnHover: true,
            showMaskOnFocus: true,
        });
        $("#dataValidade").inputmask({
            mask: "99/99",
            placeholder: " ",
            showMaskOnHover: true,
            showMaskOnFocus: true,
        });
    }

    aplicarMascaraCartao();

    function ativaCartao() {
        let camposCartao = document.getElementById('dados-cartao');
        let cartaoSelecionado = document.getElementById('pagamentoCartao').checked;

        if (cartaoSelecionado) {
            camposCartao.style.display = 'block';
        } else {
            camposCartao.style.display = 'none';
        }
    }

    document.getElementById('pagamentoCartao').addEventListener('change', ativaCartao);
    document.getElementById('pagamentoPix').addEventListener('change', ativaCartao);
});

// Função de copiar chave pix
const textInput = document.getElementById('pixChave');
const copyButton = document.getElementById('copyPix');
const alertCopy = document.getElementById('alertCopy');

copyButton.addEventListener('click', () => {
    textInput.select();
    textInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(textInput.value).then(() => {
        alertCopy.classList.remove('d-none');

        setTimeout(() => {
            alertCopy.classList.add('d-none');
        }, 1500);
    });
});

function inserirValor(valorPagamento) {
    let colocarValorModal = document.getElementById('valorDoacaoModal');
    let colocarValorPix = document.getElementById('valorDoacaoPix');

    colocarValorPix.innerHTML = valorPagamento;
    colocarValorModal.innerHTML = valorPagamento;
}

$('#sucessoModal').on('hidden.bs.modal', function (e) {
    alterarTela('voltaCampanha');
});

$('#sucessoModalPix').on('hidden.bs.modal', function (e) {
    alterarTela('voltaCampanha');
});

// Função para adicionar um novo item de doação
function adicionarItem() {
    const itemOriginal = document.querySelector('#itemFisico');
    const novoItem = itemOriginal.cloneNode(true);

    novoItem.querySelectorAll('input, select, textarea').forEach(field => {
        if (field.type !== 'button') field.value = '';
    });

    document.getElementById('itensDoacao').appendChild(novoItem);
}

// Função para remover um item de doação
function removerItem(button) {
    const item = button.closest('.item');
    if (document.getElementsByClassName('item').length > 1) {
        item.remove();
    } else {
        window.alert("Precisa ter no mínimo 1 item para doação");
    }
}