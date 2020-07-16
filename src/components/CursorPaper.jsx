import React from 'react'
// Labs
import paper from 'paper'
import SimplexNoise from 'simplex-noise'

export default class CursorPaper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            clientX: 100,
            clientY: 100,
            lastX: 100,
            lastY: 100,
            radius: 10
        }
        this.cursor = React.createRef()
        this.canvas = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove)
        this.renderCursor()

        paper.setup(this.canvas.current)
        this.renderPolygon()
    }

    // functions 
    lerp = (a, b, n) => (1 - n) * a + n * b
    map = (value, in_min, in_max, out_min, out_max) => ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        
    // Get clientX, clientY
    onMouseMove = evt => {
        this.setState({
            clientX: evt.clientX,
            clientY: evt.clientY,
        })
    }

    // Render Cursor and Polygon
    renderCursor = () => {
        const {clientX, clientY} = this.state
        this.cursor.current.style.transform = `translate(${clientX}px, ${clientY}px)`
        requestAnimationFrame(this.renderCursor);
    }

    renderPolygon = () => {
        const polygon = new paper.Path.RegularPolygon(new paper.Point(this.state.clientX, this.state.clientY), 8, this.state.radius)

        polygon.strokeColor = 'rgba(255, 0, 0, 0.5)'
        polygon.strokeWidth = 2
        polygon.smooth()

        const group = new paper.Group([polygon])
        group.applyMatrix = false

        this.renderNoise(group, polygon)
    }

    // Render Noise
    renderNoise = (group, polygon) => {
        polygon.segments.map(() => new SimplexNoise());
        this.animation(group)
    }

    // requestAnimationFrame
    animation = (group) => {
        paper.view.onFrame = event => {

            const {clientY, clientX, lastX, lastY} = this.state

            this.setState({
                lastX: this.lerp(lastX, clientX, 0.2),
                lastY: this.lerp(lastY, clientY, 0.2)
            })

            group.position = new paper.Point(lastX, lastY)
        }
    }

    render = () => {
        return (
            <div>
                <div className="cursor cursor--small" ref={this.cursor}></div>
                <canvas ref={this.canvas} className="cursor cursor--canvas" resize='true'></canvas>
            </div>
        )
    }
}