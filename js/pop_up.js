/* =========================
   SELETORES
========================= */

// popup
const heroBuyButton = document.getElementById('heroBuyButton')
const popUpOverlay = document.querySelector('.popup-overlay')
const closeBtns = document.querySelectorAll('.popup-close')
const form = document.querySelector('.popup-form')

// produto
const produto = document.getElementById('produto')
const quantidade = document.getElementById('quantidade')
const dataEntrega = document.getElementById('data')

// campos condicionais
const eggsBoxInput = document.getElementById('eggsBoxInput')
const ovosCaixa = document.getElementById('ovos-caixa')

const diaSemanaGroup = document.getElementById('diaSemana').parentElement
const diaSemanaSelect = document.getElementById('diaSemana')

const subscriptionInput = document.getElementById('subscriptionInput')
const assinaturaSemanas = document.getElementById('assinatura')

const subscriptionTypeInput = document.getElementById('subscriptionTypeInput')
const tipoAssinatura = document.getElementById('tipoAssinatura')

// endereço
const rua = document.getElementById('rua')
const numero = document.getElementById('numero')
const bairro = document.getElementById('bairro')

// observações e total
const observacoes = document.getElementById('obs')
const totalText = document.getElementById('total')

// botão comprar
const pedidoBtn = document.querySelector('.btn-buy')

/* =========================
   PREÇOS
========================= */

const PRECOS = new Map([
    ['duzia', 15],
    ['pente', 33],
    ['caixa', 1.1]
])

/* =========================
   EVENTOS
========================= */

heroBuyButton?.addEventListener('click', () => showPopUp())

closeBtns.forEach(btn =>
    btn.addEventListener('click', closePopUp)
)

produto.addEventListener('change', () => {
    updateConditionalFields()
    updatePrice()
})

popUpOverlay.addEventListener('click', (e) => {
    if (e.target === popUpOverlay) {
        closePopUp()
    }
})

quantidade.addEventListener('input', updatePrice)
ovosCaixa.addEventListener('input', updatePrice)
tipoAssinatura.addEventListener('change', updatePrice)

pedidoBtn.addEventListener('click', pedirWhats)

/* =========================
   FUNÇÕES DE UI
========================= */

function showPopUp(type = 'normal') {
    popUpOverlay.classList.remove('hidden')

    if (type !== 'normal') {
        produto.value = type
    }

    updateConditionalFields()
    updatePrice()
}

function closePopUp() {
    popUpOverlay.classList.add('hidden')
}

function updateConditionalFields() {
    dataEntrega.classList.remove('hidden')
    eggsBoxInput.classList.add('hidden')
    subscriptionInput.classList.add('hidden')
    subscriptionTypeInput.classList.add('hidden')
    diaSemanaGroup.classList.add('hidden')

    if (produto.value === 'caixa') {
        eggsBoxInput.classList.remove('hidden')
    }

    if (produto.value === 'assinatura') {
        subscriptionInput.classList.remove('hidden')
        subscriptionTypeInput.classList.remove('hidden')
        diaSemanaGroup.classList.remove('hidden')
        dataEntrega.classList.add('hidden')
    }
}

/* =========================
   REGRA DE NEGÓCIO
========================= */

function updatePrice() {
    const product = produto.value
    const qty = Number(quantidade.value) || 1
    let total = 0

    if (product === 'caixa') {
        const ovos = Number(ovosCaixa.value) || 60

        if (ovos > 90) {
            totalText.innerText = 'Total: A negociar'
            return
        }

        if (ovos < 60) {
            totalText.innerText = 'Mínimo de 60 ovos por caixa'
            return
        }

        total = ovos * qty * PRECOS.get('caixa')
        totalText.innerText = `Total: R$${total.toFixed(2)}`
        return
    }

    if (product === 'assinatura') {
        const tipo = tipoAssinatura.value
        const precoBase = PRECOS.get(tipo) + 3

        total = precoBase * qty
        totalText.innerText = `Total: R$${total.toFixed(2)} / semana`
        return
    }

    total = (PRECOS.get(product) || 0) * qty
    totalText.innerText = `Total: R$${total.toFixed(2)}`
}

/* =========================
   WHATSAPP
========================= */

function pedirWhats() {


    const phone = '553196605864'
    const product = produto.value
    const dataEntregaInput = document.querySelector('#data input')
    const dataFormatada = formatarDataBR(dataEntregaInput.value)
    let mensagem = ''

    if (product === 'duzia' || product === 'pente') {
        mensagem = `Olá, gostaria de fazer o pedido:

Produto: ${quantidade.value}x ${product === 'duzia' ? 'Dúzia' : 'Pente'} de ovos
Entrega: ${dataFormatada}
Endereço: ${bairro.value}, ${rua.value} ${numero.value}

${totalText.innerText}`
    }

    if (product === 'caixa') {
        mensagem = `Olá, gostaria de fazer o pedido:

Produto: ${quantidade.value}x Caixa de ovos (${ovosCaixa.value} ovos)
Entrega: ${dataFormatada}
Endereço: ${bairro.value}, ${rua.value} ${numero.value}

${totalText.innerText}`
    }

    if (product === 'assinatura') {
        const tipoTexto = tipoAssinatura.value === 'duzia'
            ? 'Dúzia semanal'
            : 'Pente semanal (30 ovos)'

        mensagem = `Olá, gostaria de fazer uma assinatura:

Plano: ${tipoTexto}
Tempo de Assinatura: ${assinatura.value} semana(s)
Quantidade: ${quantidade.value}
Dia da semana: ${diaSemanaSelect.value}
Endereço: ${bairro.value}, ${rua.value} ${numero.value}

${totalText.innerText}`
    }



    if (observacoes.value.trim() !== '') {
        mensagem += `

Observações: ${observacoes.value.trim()}`
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`

    if (formValido()) { window.open(url, '_blank') }

}

/* Validar Form */

function formValido() {
    if (!produto.value) return false

    if (produto.value !== 'assinatura') {
        const data = dataEntrega.querySelector('input').value
        if (!data) return false
    }

    if (produto.value === 'caixa') {
        if (!ovosCaixa.value || ovosCaixa.value < 60) return false
    }

    if (produto.value === 'assinatura') {
        if (!tipoAssinatura.value) return false
        if (!diaSemanaSelect.value) return false
    }

    if (!rua.value || !numero.value || !bairro.value) return false

    return true
}

/* Formatar Data */

function formatarDataBR(dataISO) {
    if (!dataISO) return ''

    const [ano, mes, dia] = dataISO.split('-')
    return `${dia}/${mes}/${ano}`
}
