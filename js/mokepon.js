const sectionInstrucciones = document.getElementById('instrucciones')
const botonInstrucciones = document.getElementById('las-instrucciones')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques= document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let cargasCompletasEnemigo = 0
let cargasCompletasJugador = 0
let mokepones = []
let ataqueJugador=[]
let ataqueEnemigo= [] 
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego  
let botonAgua 
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 5
let vidasEnemigo = 5
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/hollow2.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 800

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
                this.ancho = 70 
        this.alto = 70
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
     lienzo.drawImage(
    this.mapaFoto,
    this.x,
    this.y,
    this.ancho,
    this.alto,
   )
 }
}

let  caballerito = new Mokepon('caballerito' , './assets/caballerito2.png', 5, './assets/caballerito2.png')

let hornet = new Mokepon('hornet', './assets/hornet.png', 5, './assets/hornet.png')

let vasija = new Mokepon('vasija', './assets/vasija.png', 5, './assets/vasija.png')

let  caballeritoEnemigo= new Mokepon('caballerito' , './assets/caballerito2.png', 5, './assets/caballerito2.png')

let hornetEnemigo = new Mokepon('hornet', './assets/hornet.png', 5, './assets/hornet.png')

let vasijaEnemigo = new Mokepon('vasija', './assets/vasija.png', 5, './assets/vasija.png')

caballerito.ataques.push(
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '📿', id: 'boton-amuleto' },

)

    caballeritoEnemigo.ataques.push(
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '📿', id: 'boton-amuleto' },

)

hornet.ataques.push(
    { nombre: '📿', id: 'boton-amuleto' },
    { nombre: '📿', id: 'boton-amuleto' },
    { nombre: '📿', id: 'boton-amuleto' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '🔮', id: 'boton-hechizo' },
  
)

hornetEnemigo.ataques.push(
    { nombre: '📿', id: 'boton-amuleto' },
    { nombre: '📿', id: 'boton-amuleto' },
    { nombre: '📿', id: 'boton-amuleto' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '🔮', id: 'boton-hechizo' },
  
)

vasija.ataques.push(
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '📿', id: 'boton-amuleto' },  
)

vasijaEnemigo.ataques.push(
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '📿', id: 'boton-amuleto' },  
)

mokepones.push(caballerito, hornet, vasija)

function iniciarJuego() {

sectionInstrucciones.style.display = 'block'

sectionSeleccionarMascota.style.display = 'none'

sectionSeleccionarAtaque.style.display = 'none'

sectionVerMapa.style.display = 'none'

mokepones.forEach((mokepon) => {
    opcionDeMokepones = `   
     <input type="radio" name="mascota" id=${mokepon.nombre} />
                  <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                  </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputHipodoge = document.getElementById('caballerito')  
     inputCapipepo = document.getElementById('hornet')
     inputRatigueya = document.getElementById('vasija')
})

botonInstrucciones.addEventListener('click',comenzarJuego)

sectionReiniciar.style.display = 'none'

botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

 botonReiniciar.addEventListener('click', reiniciarJuego)

}

function comenzarJuego() {
    sectionInstrucciones.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'block'
}

function seleccionarMascotaJugador() {

sectionSeleccionarMascota.style.display = 'none'

if (inputHipodoge.checked){
    spanMascotaJugador.innerHTML = inputHipodoge.id
    mascotaJugador = inputHipodoge.id
} else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id
    mascotaJugador = inputCapipepo.id
} else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id
    mascotaJugador = inputRatigueya.id
} else {
    alert('selecciona una mascota porfavor')
    return
}

extraerAtaques(mascotaJugador)
sectionVerMapa.style.display = 'flex'
iniciarMapa()
}

function extraerAtaques(){
    let ataques
     for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones [i].ataques
        }
        
     }
mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
ataques.forEach((ataque) =>{
    ataquesMokepon = `
    <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML+=ataquesMokepon
    })

 botonFuego = document.getElementById('boton-aguijon')
 botonAgua = document.getElementById('boton-hechizo')
 botonTierra = document.getElementById('boton-amuleto')
 botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque(){

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
           if (e.target.textContent=== '🔮') {
            ataqueJugador.push('HECHIZO')
            console.log(ataqueJugador)
            boton.style.background = '#1572A1'
            boton.disabled = true
           }else if (e.target.textContent==='📿') {
             ataqueJugador.push('AMULETO')
            console.log(ataqueJugador)
            boton.style.background = '#1572A1'
            boton.disabled = true           
           }else {
             ataqueJugador.push('AGUIJON')
            console.log(ataqueJugador)
            boton.style.background = '#1572A1'
            boton.disabled = true
           }
           ataqueAleatorioEnemigo()
        })
    })
    

}
   


function seleccionarMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques

    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo',ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push ('AGUIJON')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio== 4) {
    ataqueEnemigo.push ('HECHIZO')
    } else {
    ataqueEnemigo.push ('AMULETO')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
       combate()
       revisarVidas() 
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo] 
}

function combate() {

  for (let index = 0; index < ataqueJugador.length; index++) {
       if(ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponentes(index, index)
        crearMensaje("AMBOS EMPATARON EN ESTA RONDA :o") 
       } else if(ataqueJugador [index] === 'AGUIJON' && ataqueEnemigo[index] === 'AMULETO') {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE ESTA RONDA CON :)")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador 
      }   else if(ataqueJugador [index] === 'HECHIZO' && ataqueEnemigo[index] === 'AGUIJON') {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE ESTA RONDA =D")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      }  else if(ataqueJugador [index] === 'AMULETO' && ataqueEnemigo[index] === 'HECHIZO') {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE ESTA RONDA :D")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      } else {
        indexAmbosOponentes(index, index)
        crearMensaje("EL ENEMIGO GANO ESTA RONDA =(")
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
      }
    }
}


function revisarVidas() {
if (victoriasJugador === victoriasEnemigo){
crearMensajeFinal("Dio' mio un empate :O!!")
} else if (victoriasJugador > victoriasEnemigo) {
crearMensajeFinal('uff que crack')    
} else {
crearMensajeFinal('no me la creo ¿te vas a dejar?')
}
}

function crearMensaje(resultado) {

let nuevoAtaqueDelJugador = document.createElement('p')
let nuevoAtaqueDelEnemigo = document.createElement('p')

sectionMensajes.innerHTML = resultado
nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo


ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal) {


sectionMensajes.innerHTML =resultadoFinal


sectionReiniciar.style.display = 'block'

}

function reiniciarJuego(){
location.reload()
}

function aleatorio(min, max) {
return Math.floor(Math.random() * (max-min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.clientWidth,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    caballeritoEnemigo.pintarMokepon()
    hornetEnemigo.pintarMokepon()
    vasijaEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(caballeritoEnemigo)
        revisarColision(hornetEnemigo)
        revisarColision(vasijaEnemigo)
    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5

}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5

}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5

}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5

}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break  
        default:
            break               
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    lienzo = mapa.getContext("2d")
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(mascotaJugador) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
       return 
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load',iniciarJuego)