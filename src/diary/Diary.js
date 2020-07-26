import { Card } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker'
import { getRecentProductsForDate } from '../util/APIUtils'
import AddDiaryEntryModal from './AddDiaryEntryModal'
import './Diary.css'
import { Add, Delete } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import memoize from 'memoize-one'

const selectProps = { indeterminate: isIndeterminate => isIndeterminate }

const actions = (
  <IconButton
    color="primary"
  >
    <Add/>
  </IconButton>
)

const contextActions = memoize(deleteHandler => (
  <IconButton
    color="secondary"
    onClick={deleteHandler}
  >
    <Delete/>
  </IconButton>
))

const columns = memoize(() => [
  {
    name: 'Meal Type',
    selector: 'mealType',
    sortable: true,
  },
  {
    name: 'Meal Time',
    selector: 'mealTime',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Amount of portions',
    selector: 'amount',
    sortable: true,
    maxWidth: '50px'
  },
  {
    name: 'Portion',
    selector: 'portion',
    sortable: true,
    maxWidth: '50px'
  },
  {
    name: 'Meal unit',
    selector: 'mealUnit',
    sortable: true,
    maxWidth: '50px'
  },
  {
    name: 'Product name',
    selector: 'productName',
    sortable: true,
  },
  {
    name: 'Calories',
    selector: 'caloriesEaten',
    sortable: true,
  },
  {
    name: 'Proteins',
    selector: 'proteinsEaten',
    sortable: true,
  },
  {
    name: 'Fat',
    selector: 'fatEaten',
    sortable: true,
  },
  {
    name: 'Carbohydrates',
    selector: 'carbohydratesEaten',
    sortable: true,
  }
])

class Diary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      tableData: '',
      date: moment().valueOf(),
      selectedRows: [],
      open: false
    }
  }

  handleGetRecentProductsByDate = (date) => {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentProductsForDate(dateString)
      .then(res => {
        console.log(res)
        this.setState({ tableData: res })
      })
  }

  render () {
    return (
      <div>
        <Card style={{ height: '100%', width: '80%'}}> //TODO center card in componend
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={this.state.date}
            onChange={date => {
              this.setState({ date: date })
              this.handleGetRecentProductsByDate(date)
            }}/>

          <Button style={{ alignRight: true }}
                  variant="primary" onClick={() => this.setState({ open: true })}>
            Add product to diary
          </Button>

          <DataTable
            columns={columns()}
            data={this.state.tableData.recentProducts}
            defaultSortField="title"
            wrap
            highlightOnHover
            pointerOnHover
            pagination
            selectableRows
          />
        </Card>

        <AddDiaryEntryModal show={this.state.open} onHide={() => this.setState({ open: false })}/>
      </div>
    )
  }

}

export default Diary