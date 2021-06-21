import './App.css';
import React from 'react';
import Matrix from './Matrix.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false,
      size: 2
    }

    this.matrix = undefined
    this.size = 2
    
  }

  onClearClicked = () => {
    console.log('Button clear clicked')
    this.setState({refresh: true})
    this.matrix = undefined
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
      
      var print_res = ''
      for (var i = 0; i < this.size; i++){
        for (var j = 0; j < this.size; j++){
          print_res += result[i][j] + '  ';
        }
        print_res+= '\n';
      }

      print_res+= '\n\nCusto: ' + total;
      window.alert(print_res)
    

  }

  on2sizeClicked = () => {
    this.size = 2;
    this.setState({size: 2});
    this.setState({refresh: true})
    
  }

  on3sizeClicked = () => {
    this.size = 3;
    this.setState({size: 3});
    this.setState({refresh: true})
    
  }

  on4sizeClicked = () => {
    this.size = 4;
    this.setState({size: 4});
    this.setState({refresh: true})
  }

  on5sizeClicked = () => {
    this.size = 5;
    this.setState({size: 5});
    this.setState({refresh: true})
  }

  onUserInput = (matrix) => {
    this.matrix = matrix.map(val => val);
    
  }

  render = (props) => {
    
    return (


      <div className="App">
        <div className="container">
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
            Resultado:
          </div>
        </div>
      </div>
    );
  }
}

export default App;
