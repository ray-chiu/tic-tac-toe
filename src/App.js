import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
    return (
        <div>
            <TableInput/>
        </div>
    );
}

function getWinner(fieldinputs) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (fieldinputs[a] && fieldinputs[a] === fieldinputs[b] && fieldinputs[a] === fieldinputs[c]) {
                return fieldinputs[a];
            }
        }
        return null;
    }


class FieldInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.setState({value: e.target.value});
        this.props.onFieldChange(this.props.idx);
    }

    render() {
        return (
            <button className="fiedinput" onClick={this.handleClick}>{this.props.value}</button>
        )
    }
}

class ResetInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.setState({value: e.target.value});
        this.props.onResetChange();
    }

    render() {
        return (
            <button onClick={this.handleClick}>Reset</button>
        )
    }
}

class TableInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fieldinputs: ['', '', '', '', '', '', '', '', ''], isNext:true};
        this.handleSuperClick = this.handleSuperClick.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleSuperClick(idx) {
        const fieldinputs = this.state.fieldinputs.slice();
        if (getWinner(fieldinputs) || fieldinputs[idx]){
            return;
        }
        fieldinputs[idx] = this.state.isNext?'x':'o';
        this.setState({fieldinputs: fieldinputs, isNext: !this.state.isNext});
    }

    handleReset() {
        this.setState({fieldinputs: ['', '', '', '', '', '', '', '', ''], isNext:true});
    }

    render() {
        const winner = getWinner(this.state.fieldinputs);
        let info = 'Next player : '+(this.state.isNext?'x':'o');
        if(winner){
            info = 'winner : '+winner;
        }
        return (
            <div>
                <div>{info}</div>
                <div className="board-row">
                    <FieldInput idx={0} value={this.state.fieldinputs[0]} onFieldChange={this.handleSuperClick}/>
                    <FieldInput idx={1} value={this.state.fieldinputs[1]} onFieldChange={this.handleSuperClick}/>
                    <FieldInput idx={2} value={this.state.fieldinputs[2]} onFieldChange={this.handleSuperClick}/>
                </div>
                <div className="board-row">
                    <FieldInput idx={3} value={this.state.fieldinputs[3]} onFieldChange={this.handleSuperClick}/>
                    <FieldInput idx={4} value={this.state.fieldinputs[4]} onFieldChange={this.handleSuperClick}/>
                    <FieldInput idx={5} value={this.state.fieldinputs[5]} onFieldChange={this.handleSuperClick}/>
                </div>
                <div className="board-row">
                    <FieldInput idx={6} value={this.state.fieldinputs[6]} onFieldChange={this.handleSuperClick}/>
                    <FieldInput idx={7} value={this.state.fieldinputs[7]} onFieldChange={this.handleSuperClick}/>
                    <FieldInput idx={8} value={this.state.fieldinputs[8]} onFieldChange={this.handleSuperClick}/>
                </div>
                <div>
                    <ResetInput onResetChange={this.handleReset}></ResetInput>
                </div>
            </div>
        )

    }
}

export default App;
