import './App.css';
import React from 'react';
import Matrix from './Matrix.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false
    }

    this.matrix = [[]]
  }

  onClearClicked = () => {
    console.log('Button clear clicked')
    this.setState({refresh: true})
  }

  onCalculateClicked = () => {
    // TODO: Calculate using this.matrix value
  }

  onUserInput = (matrix) => {
    this.matrix = matrix.map(val => val);
  }

  render = (props) => {
    return (
      <div className="App">
        <div className="container">
          <div className="white-block user-input-matrix">
              <Matrix size={5} onMatrixChanged={undefined} refresh={this.state.refresh} onMatrixChanged={this.onUserInput}/>
          </div>
          <div className="white-block button-panel">
            <button onClick={this.onClearClicked}>Limpar</button>
            <button onClick={this.onCalculateClicked}>Calcular</button>
          </div>
          <div className="white-block result-container">
            Passos:
          </div>
        </div>
      </div>
    );
  }
}

export default App;
