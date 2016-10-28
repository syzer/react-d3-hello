import React, {Component} from 'react';
import './App.css';
import ProgressArc from './ProgressArc';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {percentComplete: 0.9};
        this.togglePercent = this.togglePercent.bind(this);
    }

    togglePercent() {
        const percentage = this.state.percentComplete === 0.3 ? 0.7 : 0.3;
        this.setState({percentComplete: percentage});
    }

    render() {
        console.log(this.state.percentComplete);
        return (
            <div className="App">
                <a href="#" onClick={this.togglePercent}>Toggle Arc</a>
                <ProgressArc
                    height={300}
                    width={300}
                    innerRadius={100}
                    outerRadius={110}
                    id="d3-arc"
                    backgroundColor="#e6e6e6"
                    foregroundColor="#00ff00"
                    duration={4000}
                    percentComplete={this.state.percentComplete}
                />
            </div>
        );
    }
}

export default App;
