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
                <CursorPaper inBlock={this.state.inBlock} />
            </div>
        );
    }
}

export default App;
