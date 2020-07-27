import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import SearchComponent from '../productBrowser/SearchComponent'
import AddDiaryEntryComponent from './AddDiaryEntryComponent'

class AddDiaryEntryModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRows: []
    }
  }

  handleSelectedProductsChange = (selectedRows) => {
    this.setState({ selectedRows: selectedRows })
  }

  render () {
    return (
      <Modal
        {...this.props}
        size='xl'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add product to the diary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <SearchComponent onSelectedProductsChangeHandler={this.handleSelectedProductsChange}/>
            <AddDiaryEntryComponent selectedRow={this.state.selectedRows[0]}/>
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddDiaryEntryModal