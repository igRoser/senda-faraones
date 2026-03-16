import { GameEngine } from './engine'
import { Scene } from './story'

// Colores para cada personaje
const CHARACTER_COLORS: Record<string, string> = {
  'KEMI': '#d4af37',
  'NIA': '#003366',
  'BAKI': '#b22222',
  'FARAON': '#4b0082',
  'FARAÓN': '#4b0082',
  'VISIR': '#5d2e0a',
}

export class UIController {
  private engine: GameEngine
  private container: HTMLElement | null = null

  constructor(engine: GameEngine) {
    this.engine = engine
    this.engine.onSceneChange((scene) => this.render(scene))
  }

  mount(container: HTMLElement) {
    this.container = container
  }

  private formatContent(content: string): string {
    const lines = content.split('\n')
    return lines.map(line => {
      const trimmed = line.trim()
      if (!trimmed) return ''
      
      // Detectar si la linea empieza con un nombre de personaje (NOMBRE:)
      for (const [name, color] of Object.entries(CHARACTER_COLORS)) {
        if (trimmed.startsWith(name + ':')) {
          const dialogText = trimmed.substring(name.length + 1).trim()
          return `<p class="dialog"><span class="char-name" style="color:${color}">${name}:</span> ${dialogText}</p>`
        }
      }
      
      // Si es acotacion de narrador (entre parentesis o asteriscos)
      if (trimmed.startsWith('(') || trimmed.startsWith('*')) {
        return `<p class="stage-direction">${trimmed}</p>`
      }
      
      return `<p class="narration">${trimmed}</p>`
    }).filter(l => l).join('')
  }

  private render(scene: Scene) {
    if (!this.container) return
    if (!scene) {
      console.error('Escena no encontrada, reiniciando...')
      this.engine.goToScene('inicio')
      return
    }

    const isEnding = scene.isEnding
    const isSuccess = scene.isSuccess
    
    this.container.innerHTML = `
      <div class="game-wrapper">
        <header class="game-header">
          <h1 class="game-title">&#127981; Senda de los Faraones</h1>
          <p class="game-subtitle">Mensajeros del Faraón</p>
        </header>
        
        <main class="scene-container ${isEnding ? (isSuccess ? 'ending-success' : 'ending-fail') : ''}">
          <h2 class="scene-title">${scene.title}</h2>
          
          <div class="scene-content">
            ${this.formatContent(scene.content)}
          </div>
          
          <div class="choices-container">
            ${scene.choices.map((choice, index) => `
              <button class="choice-btn ${isEnding ? 'restart-btn' : ''}" data-index="${index}">
                ${isEnding ? '&#9654; ' : `${index + 1}. `}${choice.text}
              </button>
            `).join('')}
          </div>
        </main>
        
        <footer class="game-footer">
          <p>Una aventura educativa ambientada en el Antiguo Egipto</p>
        </footer>
      </div>
    `

    // Agregar eventos a los botones
    scene.choices.forEach((choice, index) => {
      const btn = this.container!.querySelector(`[data-index="${index}"]`)
      if (btn) {
        btn.addEventListener('click', () => {
          this.engine.goToScene(choice.nextScene)
        })
      }
    })
  }
}
