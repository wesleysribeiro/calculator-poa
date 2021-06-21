import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './ResultTable.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});	



class ResultTable extends React.Component {
	constructor(props) {
		super(props)
	}

	constructTableFromMatrix = (matrix) => {
		if(!matrix || matrix.length === 0)
			return null;

		let ret = (
			<div className="result-table-container" style={{width: "70%"}}>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{
								matrix.map(item => {
									return (
										<TableRow key={item}>
											{item.map(number => <TableCell>{number}</TableCell>)}
										</TableRow>
									)
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div> 
		);
		return ret;
	} 

	render = () => {
		const table = this.constructTableFromMatrix(this.props.matrix);

		return table;
		
		return (
			<div className="result-table-container" style={{width: "70%"}}>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Test</TableCell>
								<TableCell>Test2</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow key={"tessting"}>
								<TableCell>Col1</TableCell>
								<TableCell>Col2</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		)
	}
};

export default ResultTable;