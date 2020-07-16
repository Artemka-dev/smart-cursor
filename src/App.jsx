import React from 'react';
import CursorPaper from './components/CursorPaper'
import Block from './components/Block'

class App extends React.Component {


    render = () => {
        return (

            <div>
                <CursorPaper />

                <Block />
            </div>
        );
    }
    
}

export default App;
