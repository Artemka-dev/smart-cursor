import React from 'react'
import { useMousePosition } from '../useMousePosition'
// Labs
import paper from 'paper'
import SimplexNoise from 'simplex-noise'

// export default class CursorPaper extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             clientX: 100,
//             clientY: 100,
//             lastX: 100,
//             lastY: 100
//         }

//         this.polygon = 0
//         this.cursor = React.createRef()
//         this.canvas = React.createRef()
//     }

//     componentDidMount() {
//         document.addEventListener('mousemove', this.onMouseMove)
//         this.renderCursor()

//         paper.setup(this.canvas.current)
//         this.renderPolygon()
//     }

//     // functions 
//     lerp = (a, b, n) => (1 - n) * a + n * b
//     map = (value, in_min, in_max, out_min, out_max) => ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        

//     // Get clientX, clientY
//     onMouseMove = evt => {
//         this.setState({
//             clientX: evt.clientX,
//             clientY: evt.clientY,
//         })
//     }

//     // Render Cursor and Polygon
//     renderCursor = () => {
//         const {clientX, clientY} = this.state
//         this.cursor.current.style.transform = `translate(${clientX}px, ${clientY}px)`
//         requestAnimationFrame(this.renderCursor);
//     }

//     renderPolygon = () => {
//         this.polygon = new paper.Path.RegularPolygon(new paper.Point(this.state.clientX, this.state.clientY), 8, 10)

//         this.polygon.strokeColor = 'rgba(255, 0, 0, 0.5)'
//         this.polygon.strokeWidth = 2
//         this.polygon.smooth()

//         const group = new paper.Group([this.polygon])
//         group.applyMatrix = false

//         this.renderNoise(group)
//     }

//     // Render Noise
//     renderNoise = (group) => {
//         this.polygon.segments.map(() => new SimplexNoise());
//         this.animation(group)
//     }

//     // requestAnimationFrame
//     animation = (group) => {
//         paper.view.onFrame = event => {

//             const {clientY, clientX, lastX, lastY} = this.state

//             this.setState({
//                 lastX: this.lerp(lastX, clientX, 0.2),
//                 lastY: this.lerp(lastY, clientY, 0.2)
//             })

//             group.position = new paper.Point(lastX, lastY)
//         }
//     }

//     render = () => {
//         return (
//             <div>
//                 <div className="cursor cursor--small" ref={this.cursor}></div>
//                 <canvas ref={this.canvas} className="cursor cursor--canvas" resize='true'></canvas>
//             </div>
//         )
//     }
// }


export default function CursorPaper() {
    const [state, setState] = React.useState({lastX: 100, lastY: 100})

    const cursor = React.useCallback(node => node && renderCursor(node))
    const canvas = React.useCallback(node => {
        if (node !== null) {
            paper.setup(node)
            renderPolygon()
        }
    })
    const position = useMousePosition()
    let polygon = 0
    
    function lerp(a, b, n) { return (1 - n) * a + n * b}
    function renderCursor(node) {
        node.style.transform = `translate(${position.x}px, ${position.y}px)`
        requestAnimationFrame(() => renderCursor);
    }

    function renderPolygon() {
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