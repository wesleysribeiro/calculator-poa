import React from 'react';
import {DataGrid} from '@material-ui/data-grid';

class Matrix extends React.Component {
	constructor(props) {
		super(props)

		this.size = props.size;

		console.log(props)

		this.columns = []
		this.rows = []

		this.columns.push({
			field: 'firstCol',
			headerName: ' ',
			width: 120,
			sortable: false
		})

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

		this.columns.push({
			field: 'demanda',
			headerName: 'Demanda',
			width: 140,
			editable: true,
			type: 'number',
			sortable: false
		})

		this.rows.push({
			id: this.size,
			firstCol: 'Fornecimento'
		})
		console.log(this.columns)
		console.log(this.rows)
	}

	render = () => {
		return (
				   <div style={{ height: 450, width: '100%' }}>
  						<DataGrid rows={this.rows} columns={this.columns} pageSize={20} 
  							hideFooterPagination
  							hideFooterSelectedRowCount
  							disableColumnMenu
  							isCellEditable={(params) => { 
  								return !(params.field === "demanda" && params.row.id === this.size) ;
  							}}
  							onEditCellChangeCommitted={(params) => {
  								console.log('Mexi na cel')
  								console.log(params)
  							}}
						/>
					</div>
				)
	}
};

export default Matrix;