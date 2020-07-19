import React from 'react'
import paper from 'paper'
import SimplexNoise from 'simplex-noise'

export default class CursorPaper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {lastX: 100, lastY: 100, x: 100, y: 100}
        this.cursor = React.createRef()
        this.canvas = React.createRef()
        this.block = React.createRef()
        this.polygon = 0

    }

    lerp = (a, b, n) => (1 - n) * a + n * b
    componentDidMount() {
        document.addEventListener('mousemove', event => this.setState({x: event.clientX, y: event.clientY}))

        this.renderCursor()
        this.renderPolygon()
    }

    enter = () => this.polygon.scale(1.08)
    leave = () => this.polygon.scale(0.92)
    

    renderCursor = () => {
        this.cursor.current.style.transform = `translate(${this.state.x}px, ${this.state.y}px)`
        requestAnimationFrame(this.renderCursor)
    }

    renderPolygon = () => {
        paper.setup(this.canvas.current)
        this.polygon = new paper.Path.RegularPolygon(new paper.Point(this.state.x, this.state.y), 8, 10)
    
        this.polygon.strokeColor = 'rgba(255, 0, 0, 0.5)'
        this.polygon.strokeWidth = 2
        this.polygon.smooth()

        const group = new paper.Group([this.polygon])
        group.applyMatrix = false

        this.polygon.segments.map(() => new SimplexNoise());
        this.animation(group)
    }

    animation = (group) => {
        paper.view.onFrame = () => {

            this.setState({
                lastX: this.lerp(this.state.lastX, this.state.x, 0.2),
                lastY: this.lerp(this.state.lastY, this.state.y, 0.2)
            })

            group.position = new paper.Point(this.state.lastX, this.state.lastY)
        }
    }

    render = () => {
        return (
            <div>
                <div className="cursor cursor--small" ref={this.cursor}></div>
                <canvas ref={this.canvas} className="cursor cursor--canvas" resize='true'></canvas>

                <div className="block" ref={this.block} onMouseEnter={this.enter} onMouseLeave={this.leave}></div>

            </div>
        )
    }
}