import React from 'react'

export const useMousePosition = () => {
    const [position, setPosition] = React.useState({x: 100, y: 100})

    React.useEffect(() => {
        const onMouseMove = event => setPosition({x: event.clientX, y: event.clientY})
        window.addEventListener('mousemove', onMouseMove)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
        }
    }, [])

    return position
}