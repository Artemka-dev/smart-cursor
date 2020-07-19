import React from 'react'
import { useMousePosition } from '../useMousePosition'
// Labs
import paper from 'paper'
import SimplexNoise from 'simplex-noise'


export default function CursorPaper() {
    const cursor = React.useRef()
    const canvas = React.useRef()
    const [state, setState] = React.useState({lastX: 100, lastY: 100})
    const position = useMousePosition()

    let polygon = 0

    renderCursor()
    renderPolygon()
    
    function lerp(a, b, n) { return (1 - n) * a + n * b}
    function renderCursor() {
        if (cursor.current) {
            cursor.current.style.transform = `translate(${position.x}px, ${position.y}px)`
            requestAnimationFrame(() => renderCursor);
        }
    }

    function renderPolygon() {
        paper.setup(canvas.current)
        polygon = new paper.Path.RegularPolygon(new paper.Point(position.x, position.y), 8, 10)
    
        polygon.strokeColor = 'rgba(255, 0, 0, 0.5)'
        polygon.strokeWidth = 2
        polygon.smooth()

        const group = new paper.Group([polygon])
        group.applyMatrix = false
        
        renderNoise()
        animation(group)
    }

    function renderNoise() {
        polygon.segments.map(() => new SimplexNoise());
    }

    function animation(group) {
        paper.view.onFrame = event => {

            setState({
                lastX: lerp(state.lastX, position.x, 0.2),
                lastY: lerp(state.lastY, position.y, 0.2)
            })

            group.position = new paper.Point(state.lastX, state.lastY)
        }
    }

    return (
        <div>
            <div className="cursor cursor--small" ref={cursor}></div>
            <canvas ref={canvas} className="cursor cursor--canvas" resize='true'></canvas>
        </div>
    )
}