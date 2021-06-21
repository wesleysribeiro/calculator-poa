import React from 'react';
import {DataGrid} from '@material-ui/data-grid';

class Matrix extends React.Component {
	
	constructor(props) {
		super(props)

		this.size = props.size;
		this.userInputMatrix = new Array(this.size).fill(0).map(() => new Array(this.size).fill(0));
		this.notifyMatrixChanged = props.onMatrixChanged;
		this.notifyMatrixChanged(this.userInputMatrix)
		this.initializeEmptyMatrix()
		
		console.log(this.size);
	}

	initializeEmptyMatrix = () => {
		this.columns = []
		this.rows = []

		// Inicializa campos centrais para o input do usuário
		for(let i = 0; i < this.size; i++)
		{
			const numberStr = i.toString()
			this.columns.push(
				{
					field: 'col' + numberStr,
					headerName: ' ',
					width: 90,
					editable:true,
					type: 'number',
					sortable: false
				}
			)

			const rowObj = {id: i}

			for(let j = 0; j < this.size; j++)
			{
				const columnStr = 'col'+j.toString()
				Object.assign(rowObj, {[columnStr]: '0'})
			}
			
			this.rows.push(rowObj)
		}

		// 
		/* this.columns.push({
			field: 'demanda',
			headerName: 'Demanda',
			width: 140,
			editable: true,
			type: 'number',
			sortable: false
		})
 */
		//	
		/* this.rows.push({
			id: this.size,
			firstCol: 'Fornecimento'
		}) */
	}

	getColumnFromColumnField = (columnField) => {
		const re = /^col(\d)$/;
		const found = columnField.match(re)

		if(found == null || found.length < 2)
		{
			return undefined;
		}
		return found[1];
	}

	onCellEdited = (params) => {
		console.log(params)
		const row = params.id;
		let columnNumber = this.getColumnFromColumnField(params.field)

	/* 	if(columnNumber > this.size){
			this.size = columnNumber;
		} */

		if(columnNumber === undefined)
		{
			columnNumber = this.size;
		}
		
		this.userInputMatrix[row][columnNumber] = parseInt(params.props.value)
		this.notifyMatrixChanged(this.userInputMatrix)
	}

	render = () => {
		if(('refresh' in this.props) && this.props.refresh)
		{
			this.size = this.props.size;
			this.initializeEmptyMatrix();
			this.userInputMatrix = new Array(this.size).fill(0).map(() => new Array(this.size).fill(0));
			//this.userInputMatrix = new Array(this.size).map(() => new Array(this.size));
		}

		return (
				   <div style={{ height: '75vh', width: '100%' }}>
  						<DataGrid rows={this.rows} columns={this.columns} pageSize={20} 
  							hideFooterPagination
  							hideFooterSelectedRowCount
  							disableColumnMenu
  							isCellEditable={(params) => { 
  								return !(params.field === "demanda" && params.row.id === this.size) ;
  							}}
  							onEditCellChangeCommitted={this.onCellEdited}
						/>
					</div>
				)
	}
};

export default Matrix;