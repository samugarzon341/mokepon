
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonTierra = document.getElementById('boton-amuleto')
const botonFuego = document.getElementById('boton-aguijon')
const botonAgua = document.getElementById('boton-hechizo')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const imputHipodoge = document.getElementById('caballerito')  
const inputCapipepo = document.getElementById('hornet')
const inputRatigueya = document.getElementById('vasija')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
 
let cargasCompletasEnemigo = 0
let cargasCompletasJugador = 0
const NECESARIAS = 3
let mokepones = []
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 5
 let vidasEnemigo = 5
const MAX_VIDAS = 9

let almaJugador = 0
let almaEnemigo = 0
const MAX_ALMA = 2

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let  caballerito = new Mokepon('caballerito' , './assets/f594b0a2-3ebb-442c-a0b4-ceceb4ffbcbc.png' ,5)

let hornet = new Mokepon('hornet', './assets/29150342-dbb7-4ff2-af7b-5c5bec191901.png', 5)

let vasija = new Mokepon('vasija', './assets/37a81172-5db1-49b0-a30b-5f4ca7133f95.png', 5)
caballerito.ataques.push(
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '⚔️', id: 'boton-aguijon' },
    { nombre: '🔮', id: 'boton-hechizo' },
    { nombre: '📿', id: 'boton-amuleto' },
   
)


function iniciarJuego() {

sectionSeleccionarAtaque.style.display = 'none'
sectionReiniciar.style.display = 'none'
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
botonFuego.addEventListener('click', ataqueFuego)
 botonAgua.addEventListener('click', ataqueAgua)
 botonTierra.addEventListener('click', ataqueTierra)
 botonReiniciar.addEventListener('click', reiniciarJuego)

}

function seleccionarMascotaJugador() {

sectionSeleccionarMascota.style.display = 'none'



sectionSeleccionarAtaque.style.display = 'flex'



if (imputHipodoge.checked){
    spanMascotaJugador.innerHTML = 'caballerito'
} else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = 'hornet'
} else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = 'vasija'
} else {
    alert('selecciona una mascota porfavor')
}

seleccionarMascotaEnemigo()

}

function seleccionarMascotaEnemigo() {
let mascotaAleatoria = aleatorio(1,3)

if (mascotaAleatoria == 1){
    spanMascotaEnemigo.innerHTML = 'caballerito'
} else if (mascotaAleatoria == 2) {
    spanMascotaEnemigo.innerHTML = 'hornet'
} else {
    spanMascotaEnemigo.innerHTML = 'vasija'}

}

function ataqueFuego() {
ataqueJugador = 'AGUIJON'
ataqueAleatorioEnemigo()
}
function ataqueAgua() {
ataqueJugador = 'HECHIZO'
ataqueAleatorioEnemigo()
}
function ataqueTierra() {
ataqueJugador = 'AMULETO'
ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
let ataqueAleatorio = aleatorio(1,3)

if (ataqueAleatorio == 1) {
ataqueEnemigo = 'AGUIJON'
} else if (ataqueAleatorio == 2) {
ataqueEnemigo = 'HECHIZO'
} else {
ataqueEnemigo = 'AMULETO'
}

combate()
}

function guardarAlma() {
    almaJugador++

    const barraAlmaJugador = document.getElementById('barra-alma-jugador')
    let porcentaje = (almaJugador / MAX_ALMA) * 100
    barraAlmaJugador.style.width = porcentaje + "%"

    if (almaJugador >= MAX_ALMA) {
        almaJugador = 0
        barraAlmaJugador.style.width = "0%"

        cargasCompletasJugador++

        if (cargasCompletasJugador === NECESARIAS) {
            cargasCompletasJugador = 0

            vidasJugador = Math.min(vidasJugador + 2, MAX_VIDAS)
            spanVidasJugador.innerHTML = vidasJugador

            crearMensaje("🔥 ¡VAMOS! +2 vidas")
        } else {
            vidasJugador = Math.min(vidasJugador + 1, MAX_VIDAS)
            spanVidasJugador.innerHTML = vidasJugador

            crearMensaje("vamos una vida +1 vida (" + cargasCompletasJugador + "/" + NECESARIAS + ")")
        }
    }
}
function guardarAlmaEnemigo() {
    almaEnemigo++

    const barraAlmaEnemigo = document.getElementById('barra-alma-enemigo')
    let porcentaje = (almaEnemigo / MAX_ALMA) * 100
    barraAlmaEnemigo.style.width = porcentaje + "%"

    if (almaEnemigo >= MAX_ALMA) {
        almaEnemigo = 0
        barraAlmaEnemigo.style.width = "0%"

        cargasCompletasEnemigo++

        if (cargasCompletasEnemigo === NECESARIAS) {
            cargasCompletasEnemigo = 0

            vidasEnemigo = Math.min(vidasEnemigo + 2, MAX_VIDAS)
            spanVidasEnemigo.innerHTML = vidasEnemigo

            crearMensaje(" ¡COMBO del enemigo! +2 vidas")
        } else {
            vidasEnemigo = Math.min(vidasEnemigo + 1, MAX_VIDAS)
            spanVidasEnemigo.innerHTML = vidasEnemigo

            crearMensaje("☠️ Enemigo gana +1 vida (" + cargasCompletasEnemigo + "/" + NECESARIAS + ")")
        }
    }
}
function combate() {

if(ataqueEnemigo == ataqueJugador) {
    crearMensaje("AMBOS EMPATARON EN ESTA RONDA")
} else if(ataqueJugador == 'AGUIJON' && ataqueEnemigo == 'AMULETO') {
    crearMensaje("GANASTE ESTA RONDA :D")
    guardarAlma()
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
} else if(ataqueJugador == 'HECHIZO' && ataqueEnemigo == 'AGUIJON') {
    crearMensaje("GANASTE ESTA RONDA :D")
    guardarAlma()
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
}  else if(ataqueJugador == 'AMULETO' && ataqueEnemigo == 'HECHIZO') {
   crearMensaje("GANASTE ESTA RONDA :D")
   guardarAlma()
   vidasEnemigo--
   spanVidasEnemigo.innerHTML = vidasEnemigo
} else { 
    crearMensaje("SORRY PERDISTE")
    
    vidasJugador = Math.max(vidasJugador - 1, 0)
    spanVidasJugador.innerHTML = vidasJugador

    guardarAlmaEnemigo()
}
revisarVidas()

}

function revisarVidas() {
if (vidasEnemigo == 0){
crearMensajeFinal("FELICITACIONES! Ganaste :D")
} else if (vidasJugador == 0) {
crearMensajeFinal('Lo siento, pero perdiste :/')
}
}

function crearMensaje(resultado) {

let nuevoAtaqueDelJugador = document.createElement('p')
let nuevoAtaqueDelEnemigo = document.createElement('p')

sectionMensajes.innerHTML = resultado
nuevoAtaqueDelJugador.innerHTML = ataqueJugador
nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo


ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal) {


sectionMensajes.innerHTML =resultadoFinal

 
botonFuego.disabled = true

 botonAgua.disabled = true

 botonTierra.disabled = true

sectionReiniciar.style.display = 'block'

}

function reiniciarJuego(){
location.reload()
}

function aleatorio(min, max) {
return Math.floor(Math.random() * (max-min + 1) + min)
}

window.addEventListener('load',iniciarJuego)
