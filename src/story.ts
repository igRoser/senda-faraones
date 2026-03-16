// Base de datos de la historia - Senda de los Faraones

export interface Choice {
  text: string
  nextScene: string
}

export interface Scene {
  id: string
  title: string
  content: string
  choices: Choice[]
  isEnding?: boolean
  isSuccess?: boolean
}

export const StoryDB: Record<string, Scene> = {
  inicio: {
    id: 'inicio',
    title: 'ESCENA 1: EL MENSAJE SECRETO',
    content: `KEMI: ¡Tenemos que llevar este mapa al Faraón rápido!
NIA: El cielo se está oscureciendo. Queda poco tiempo.
BAKI: El viaje es muy peligroso. ¿Por dónde empezamos?`,
    choices: [
      { text: 'Caminar por el desierto de arena', nextScene: 'desierto' },
      { text: 'Viajar por el gran río Nilo', nextScene: 'nilo' }
    ]
  },
  desierto: {
    id: 'desierto',
    title: 'ESCENA 2: EL DESIERTO',
    content: `KEMI: El sol quema mucho. Estoy muy cansado.
BAKI: Veo una cueva oscura allí. Podemos entrar a dormir.
NIA: Si dormimos, perderemos tiempo. Es mejor seguir caminando.`,
    choices: [
      { text: 'Entrar a la cueva a dormir', nextScene: 'final_cueva' },
      { text: 'Seguir caminando sin parar', nextScene: 'puertas' }
    ]
  },
  nilo: {
    id: 'nilo',
    title: 'ESCENA 3: EL RÍO NILO',
    content: `NIA: Necesitamos un barco para cruzar el agua.
BAKI: Un hombre que no conocemos nos invita a subir a su barco gratis.
KEMI: Ese hombre me da miedo. Prefiero pagar monedas y alquilar nuestro propio barco.`,
    choices: [
      { text: 'Subir al barco del hombre desconocido', nextScene: 'final_barco' },
      { text: 'Pagar y alquilar nuestro propio barco', nextScene: 'puertas' }
    ]
  },
  puertas: {
    id: 'puertas',
    title: 'ESCENA 4: LAS PUERTAS DE LA CIUDAD',
    content: `KEMI: Por fin llegamos a la ciudad del Faraón.
BAKI: ¡Oh, no! Los guardias de la puerta no nos dejan entrar.
NIA: Tengo dos planes. Podemos escondernos en las sombras para entrar en secreto, o podemos darles monedas de oro a los guardias.`,
    choices: [
      { text: 'Entrar en secreto por las sombras', nextScene: 'palacio' },
      { text: 'Dar monedas de oro a los guardias', nextScene: 'final_guardias' }
    ]
  },
  palacio: {
    id: 'palacio',
    title: 'ESCENA 5: DENTRO DEL PALACIO',
    content: `NIA: ¡Muy bien! Ya estamos dentro del gran palacio.
KEMI: Pero la puerta del salón principal está cerrada con llave.
BAKI: Podemos intentar escalar el muro alto de piedra, o caminar por la habitación oscura de las trampas.`,
    choices: [
      { text: 'Escalar el muro alto', nextScene: 'final_muro' },
      { text: 'Caminar por la habitación de las trampas', nextScene: 'puerta_faraon' }
    ]
  },
  puerta_faraon: {
    id: 'puerta_faraon',
    title: 'ESCENA 6: LA PUERTA DEL FARAÓN',
    content: `KEMI: Pasamos las trampas con cuidado. Aquí está la puerta final.
NIA: El ayudante principal del Faraón, el Visir, está esperando aquí.
BAKI: El Visir nos pide que le demos el mapa a él. ¿Qué hacemos?`,
    choices: [
      { text: 'Entregar el mapa al Visir', nextScene: 'final_visir' },
      { text: 'Decir que no y esperar a ver al Faraón', nextScene: 'final_bueno' }
    ]
  },
  final_cueva: {
    id: 'final_cueva',
    title: 'FINAL 1: La cueva',
    content: `KEMI: Entramos a la cueva y nos quedamos profundamente dormidos.
NIA: Cuando abrimos los ojos, ya era de noche.
BAKI: Llegamos tarde. Perdimos nuestra misión. (FRACASO)`,
    choices: [{ text: 'Volver a intentarlo', nextScene: 'inicio' }],
    isEnding: true,
    isSuccess: false
  },
  final_barco: {
    id: 'final_barco',
    title: 'FINAL 2: El barco',
    content: `BAKI: Subimos al barco del hombre desconocido.
KEMI: ¡Era un ladrón! Nos quitó el mapa y nos dejó solos en una isla.
NIA: No debimos confiar en él. Perdimos nuestra misión. (FRACASO)`,
    choices: [{ text: 'Volver a intentarlo', nextScene: 'inicio' }],
    isEnding: true,
    isSuccess: false
  },
  final_guardias: {
    id: 'final_guardias',
    title: 'FINAL 3: Los guardias',
    content: `NIA: Le dimos nuestras monedas de oro a los guardias.
BAKI: ¡Nos engañaron! Se quedaron con el oro y nos metieron en la cárcel.
KEMI: Ahora no podemos salir. Perdimos nuestra misión. (FRACASO)`,
    choices: [{ text: 'Volver a intentarlo', nextScene: 'inicio' }],
    isEnding: true,
    isSuccess: false
  },
  final_muro: {
    id: 'final_muro',
    title: 'FINAL 4: El muro',
    content: `BAKI: Intenté subir por el muro de piedra, pero me resbalé y caí.
KEMI: Al caer, hicimos mucho ruido.
NIA: Los soldados del palacio nos escucharon y nos atraparon. Perdimos nuestra misión. (FRACASO)`,
    choices: [{ text: 'Volver a intentarlo', nextScene: 'inicio' }],
    isEnding: true,
    isSuccess: false
  },
  final_visir: {
    id: 'final_visir',
    title: 'FINAL 5: El Visir',
    content: `KEMI: Le dimos el mapa secreto al Visir.
NIA: ¡El Visir era el enemigo secreto! Rompió nuestro mapa en pedazos.
BAKI: Le dimos el mapa a la persona equivocada. Perdimos nuestra misión. (FRACASO)`,
    choices: [{ text: 'Volver a intentarlo', nextScene: 'inicio' }],
    isEnding: true,
    isSuccess: false
  },
  final_bueno: {
    id: 'final_bueno',
    title: 'FINAL BUENO: La lealtad',
    content: `NIA: ¡No! Este mapa es solo para los ojos del Faraón.
BAKI: Nos quedamos parados aquí hasta que salga el rey.
KEMI: Gran Faraón, aquí tiene el mapa que salvará a Egipto.
FARAÓN (Voz desde adentro): Han sido valientes y muy listos. Gracias a ustedes, nuestro reino está a salvo. (¡ÉXITO! Misión cumplida)`,
    choices: [{ text: '¡Jugar de nuevo!', nextScene: 'inicio' }],
    isEnding: true,
    isSuccess: true
  }
}
