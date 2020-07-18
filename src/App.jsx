import React from 'react';
import CursorPaper from './components/CursorPaper'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.block = React.createRef()

        this.state = {
            inBlock: false
        }
    }

    enter = () => {
        this.setState({inBlock: true})
    }

    leave = () => {
        this.setState({inBlock: false})
    }
    
    render = () => {
        return (
            <div>
                <CursorPaper />

                <div className="block" ref={this.block} onMouseEnter={this.enter} onMouseLeave={this.leave}></div>
            </div>
        );
    }
}

export default App;
