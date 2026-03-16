import { useEffect, useRef } from 'react'
import { GameEngine } from './engine'
import { StoryDB } from './story'
import { UIController } from './ui'
import './index.css'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const engine = new GameEngine(StoryDB)
    const ui = new UIController(engine)
    if (containerRef.current) {
      ui.mount(containerRef.current)
    }
    engine.start()
  }, [])

  return <div ref={containerRef} id="game-container"></div>
}

export default App
