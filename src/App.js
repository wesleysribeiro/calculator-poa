import './App.css';
import React from 'react';
import Matrix from './Matrix.js';
import ResultTable from './ResultTable.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false,
      size: 2,
      cost: undefined,
      resultMatrix: undefined
    }

    this.matrix = undefined
    this.size = 2
    
  }

  onClearClicked = () => {
    console.log('Button clear clicked')
    this.setState({refresh: true, cost: undefined, resultMatrix: undefined})
    //this.matrix = undefined
  }

  onCalculateClicked = () => {

    var munkres = require('munkres-js');

    var m = new munkres.Munkres();
    var indices = m.compute(this.matrix);
    console.log(munkres.format_matrix(this.matrix));
    var total = 0;

    var result = new Array(this.size).fill(0).map(() => new Array(this.size).fill(0));

    for (var i = 0; i < indices.length; ++i) {
          
          var row = indices[i][0], col = indices[i][1];
          var value = this.matrix[row][col];
          result[row][col] = this.matrix[row][col]
          total += value;
      
          console.log('(' + row + ', ' + col + ') -> ' + value);
    }
      
    console.log('total cost:', total);

    this.setState({cost: total, resultMatrix: result})
  }

  on2sizeClicked = () => {
    this.onSizeChanged(2);
  }

  on3sizeClicked = () => {
    this.onSizeChanged(3);
  }

  on4sizeClicked = () => {
    this.onSizeChanged(4);
  }

  on5sizeClicked = () => {
    this.onSizeChanged(5);
  }

  onSizeChanged = (size) => {
    this.size = size;
    this.setState({size: size, refresh: true})
    this.matrix = new Array(this.size).fill(0).map(() => new Array(this.size).fill(0));;
  }

  onUserInput = (matrix) => {
    this.matrix = matrix.map(val => val); 
  }

  render = (props) => {

    let cost = null;

    if(this.state.cost !== undefined)
    {
      cost = (<div>
        <strong>Custo</strong>: {this.state.cost}
      </div>)
    }
    
    return (
      <div className="App">
        <div className="container">
          <div className="white-block header">
              <h1> Calculadora de Problema de Transporte - Método Húngaro </h1>
              <p> Desenvolvido para a disciplina de Pesquisa Operacional A </p>
          </div>
          <div className="white-block user-input-matrix">
              <Matrix size={this.size} refresh={this.state.refresh} onMatrixChanged={this.onUserInput}/>
          </div>
          <div className="white-block button-panel">

            <button onClick={this.on2sizeClicked}>2x2</button>
            <button onClick={this.on3sizeClicked}>3x3</button>
            <button onClick={this.on4sizeClicked}>4x4</button>
            <button onClick={this.on5sizeClicked}>5x5</button>
            
            <button onClick={this.onClearClicked}>Limpar</button>
            <button onClick={this.onCalculateClicked}>Calcular</button>
          </div>
          
          <div className="white-block result-container">
            <strong>Resultado:</strong>
            <ResultTable matrix={this.state.resultMatrix}/>
            {cost}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
