import { Scene } from './story'

export interface GameState {
  currentSceneId: string
  history: string[]
}

const SAVE_KEY = 'senda_faraones_save'

export class GameEngine {
  private storyDB: Record<string, Scene>
  private state: GameState
  private listeners: Array<(scene: Scene) => void> = []

  constructor(storyDB: Record<string, Scene>) {
    this.storyDB = storyDB
    this.state = { currentSceneId: 'inicio', history: [] }
  }

  start() {
    const saved = this.loadAutoSave()
    if (saved) {
      this.state = saved
    }
    this.emit()
  }

  getCurrentScene(): Scene | undefined {
    return this.storyDB[this.state.currentSceneId]
  }

  goToScene(sceneId: string) {
    if (!this.storyDB[sceneId]) {
      console.error('Escena no encontrada:', sceneId)
      this.state.currentSceneId = 'inicio'
    } else {
      this.state.history.push(this.state.currentSceneId)
      this.state.currentSceneId = sceneId
    }
    this.autoSave()
    this.emit()
  }

  onSceneChange(listener: (scene: Scene) => void) {
    this.listeners.push(listener)
  }

  private emit() {
    const scene = this.getCurrentScene()
    if (scene) {
      this.listeners.forEach(l => l(scene))
    }
  }

  private autoSave() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.state))
    } catch (e) {
      // ignorar errores de localStorage
    }
  }

  private loadAutoSave(): GameState | null {
    try {
      const raw = localStorage.getItem(SAVE_KEY)
      if (!raw) return null
      const saved: GameState = JSON.parse(raw)
      if (this.storyDB[saved.currentSceneId]) {
        return saved
      } else {
        localStorage.removeItem(SAVE_KEY)
        return null
      }
    } catch (e) {
      return null
    }
  }
}
