// 2c = two of clubs
// 2d = two of diaminds
// 2h = two of hearts
// 2s = two of spades

let deck = [];
const tipos = [ 'C', 'D', 'H', 'S'];
const especiales = [ 'A', 'J', 'Q', 'K'];

let puntosJugador = 0;
    puntosComputadora =0;

//referencia 
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas');


const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for( let tipo of tipos){
        deck.push( i + tipo);

        }
    }
    for( let tipo of tipos){
        for( let esp of especiales){
        deck.push( esp + tipo);

        }
    }

    console.log(deck);
    deck = _.shuffle(  deck )
    console.log(deck);
    return deck;
}
crearDeck()

// esta funcion me permite tomar una carta

const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta);
    return carta;

}
// for( let i = 0; i <= 100; i++ ){
// pedirCarta();
// }
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN(valor)) ?
            ( valor === 'A') ? 11: 10
            : valor * 1
    // let puntos = 0
    // console.log({valor});
    // if( isNaN( valor ) ){

    //     puntos = ( valor === 'A' ) ? 11 : 10;

    // } else {

    //     // console.log('Es un numero');

    //     puntos = valor * 1;
    // }

    // console.log(puntos);


}

// const valor = valorCarta(pedirCarta());
// console.log( { valor } );

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
    
        // console.log(puntosComputadora); 
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if(puntosMinimos > 21){
            break;
        }

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout( () => {

        if( puntosComputadora === puntosMinimos ){
            alert('Nadie gana')
    
        } else if(puntosMinimos > 21){
            alert('computadora gana')
        } else if( puntosComputadora > 21){
            alert('jugador gana')
        } else{
            alert('Computadora Gana')
        }
        

    }, 10);

}


// eventos

btnPedir.addEventListener('click', () => {


    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    console.log(puntosJugador); 

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if(puntosJugador > 21){
        console.log('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador );

    } else if( puntosJugador === 21){
        console.log('ganaste!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    }

})

//Todo: borrar
// console.log(15);
// turnoComputadora( 15 );

btnDetener.addEventListener( 'click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );



});

btnNuevo.addEventListener( 'click', () => {
    
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0
    puntosComputadora = 0
    // puntosHTML = 0

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    


})
