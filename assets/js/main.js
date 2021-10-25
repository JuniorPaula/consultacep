const btn = document.querySelector('#btn');
const result = document.querySelector('.result');

btn.addEventListener('click', () => {
    result.innerHTML = '';
    const cep = document.querySelector('#cep').value;
    consultaCep(cep);
});

function consultaCep(cep) {
    const clearCep = cep.replace(/\D+/g, '');
    if(!clearCep) return false;
    if(clearCep.length !== 8) return false;
    
    const url = `https://viacep.com.br/ws/${clearCep}/json/`;
    fetch(url)
        .then(res => res.json())
        .then(data => carregaDados(data))
        .catch(e => console.log('Erros ao carregar os dados.')) 
}

function carregaDados(data) {
    if(data.erro) {
        result.innerHTML = 'Cep não encontrado!';   
        return;
    }
    
    const p = document.createElement('p');
    p.innerHTML += `
        <b>Bairro:</b> ${data.bairro} <br />
        <b>Cep:</b> ${data.cep} <br />
        <b>Localidade:</b> ${data.localidade} <br />
        <b>UF:</b> ${data.uf} <br />
        <b>Logradouro:</b> ${data.logradouro} <br />
        <b>Complemento:</b> ${data.complemento} <br />
        <b>DDD:</b> ${data.ddd} <br />
    `
    result.appendChild(p);
}
