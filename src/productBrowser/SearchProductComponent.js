import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './Browser.css'
import { searchProducts } from '../util/APIUtils'
import DataTable from 'react-data-table-component'
import Card from '@material-ui/core/Card'

class SearchProductComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      products: [],
      selectedProducts: [],
      loading: false,
      totalRows: 0,
      perPage: 10
    }
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.getColumnsForSearchComponent = this.getColumnsForSearchComponent.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this)
  }

  handleSearchTermChange (newTerm) {
    this.setState({ searchTerm: newTerm.target.value })
  }

  handleSearchButtonClick () {
    const searchTerm = this.state.searchTerm
    const perPage = this.state.perPage
    searchProducts(searchTerm, 1, perPage).then(
      response => {
        this.setState({
          searchTerm: searchTerm,
          products: response.products,
          totalRows: response.totalNumberOfProducts
        })
      }
    )
  }

  async handlePageChange (page) {
    const { perPage } = this.state
    const searchTerm = this.state.searchTerm

    this.setState({ loading: true })

    searchProducts(searchTerm, page, perPage).then(
      response => {
        this.setState({
          products: response.products,
          loading: false,
          totalRows: response.totalNumberOfProducts
        })
      }
    )
  }

  async handlePerRowsChange (perPage, page) {
    this.setState({ loading: true })
    const searchTerm = this.state.searchTerm

    searchProducts(searchTerm, page, perPage).then(
      response => {
        this.setState({
          products: response.products,
          loading: false,
          perPage: perPage,
          totalRows: response.totalNumberOfProducts
        })
      }
    )
  }

  getColumnsForSearchComponent () {
    return [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        grow: 2.5,
        wrap: true,
        center: true
      },
      {
        name: 'Default portion',
        selector: row => row.defaultValue + ' ' + row.unit,
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.defaultValue - rowB.defaultValue
      },
      {
        name: 'Calories',
        selector: row => row.calories + ' kcal',
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.calories - rowB.calories
      }]
  }

  handleSelectChange (state) {
    this.setState({ selectedProducts: state.selectedRows })
    this.props.onSelectedProductsChangeHandler(state.selectedRows)
  }

  isRowUnselected (row) {
    return !this.state.selectedProducts.some(e => e.id === row.id)
  }

  render () {
    return (
      <Card className='search_component_container' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h1 className='search_for_products_title'>Search for products</h1>
        <InputGroup className='search-term'>
          <FormControl
            className=''
            id='search-term'
            onChange={this.handleSearchTermChange}
            placeholder='Product name'
            aria-label='Product name'
          />
          <InputGroup.Append>
            <Button
              id='search-button'
              variant='dark'
              onClick={this.handleSearchButtonClick}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <DataTable
          className='items-datatable'
          data={this.state.products}
          columns={this.getColumnsForSearchComponent()}
          onSelectedRowsChange={this.handleSelectChange}
          selectableRows
          progressPending={this.state.loading}
          pagination
          theme='dark'
          paginationServer
          paginationTotalRows={this.state.totalRows}
          paginationRowsPerPageOptions={[10]}
          onChangeRowsPerPage={this.handlePerRowsChange}
          onChangePage={this.handlePageChange}
          selectableRowDisabled={row => this.props.isAnyRowSelected() && this.isRowUnselected(row)}
          selectableRowsNoSelectAll
          selectableRowsHighlight
        />
      </Card>
    )
  }
}

export default SearchProductComponent
