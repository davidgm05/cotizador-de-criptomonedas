
import '../scss/style.scss';

const form = document.querySelector('#form-search');
const moneda = document.querySelector('#moneda');
const criptomoneda = document.querySelector('#criptomonedas');
const containerAnswer = document.querySelector('.container-answer');
const containerForm = document.querySelector('.form-side');
const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

document.addEventListener('DOMContentLoaded', () => {
    consultarCripto();

    form.addEventListener('submit', submitForm);
    moneda.addEventListener('change', getValue);
    criptomoneda.addEventListener('change', getValue);
})

function getValue(e){
    objBusqueda[e.target.name] = e.target.value;
}

function submitForm(e){
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda;
    if(moneda === ''|| criptomoneda === ''){
        showError('seleccione ambas casillas');
        return;
    }
    consultApi(moneda, criptomoneda);
    
}

function consultApi(moneda, criptomoneda){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuestaJson => {
        mostrarValores(respuestaJson.DISPLAY[criptomoneda][moneda]);
    })
    .catch(error => console.log(error));
}

function cleanHtml(){
    containerAnswer.innerHTML = '';
}

function mostrarValores(data){
    cleanHtml();
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = data;
    const answer = document.createElement('div');
    answer.classList.add('display-info');
    answer.innerHTML = `<p class="main-price">Precio: <span>${PRICE}</span></p>
    <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
    <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
    <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}</span></p>
    <p>Última Actualización: <span>${LASTUPDATE}</span></p>`
    containerAnswer.appendChild(answer);

}

function showError(mensage){
    const errorMensage = document.createElement('p');
    errorMensage.classList.add('error');
    errorMensage.textContent = mensage;
    containerForm.appendChild(errorMensage);
    setTimeout(() => {
        errorMensage.remove()
    }, 3000)
}

function consultarCripto(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuestaJson => {
        selectCripto(respuestaJson.Data);
    })
    .catch(error => console.log(error));
}

function selectCripto(criptos){
    criptos.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomoneda.appendChild(option);
    });
}

