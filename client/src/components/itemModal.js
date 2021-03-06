import React, { Component } from 'react';
 import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input


 } from 'reactstrap';
 import { connect } from 'react-redux';
 import { addItem } from '../actions/itemactions';
 import PropTypes from 'prop-types';

 //import uuid from 'uuid';

 class ItemModal extends Component {
      state = {
      	modal: false,
      	name: ''
      }


      static propTypes = {
    logout: PropTypes.func.isRequired
  };

      toggle = () => {
      	this.setState({
      		modal: !this.state.modal
      	});
      };

      onChange = (e) => {
      	  this.setState({ [e.target.name]: e.target.value });
      };

      onSubmit = e => {
      	  e.preventDefault ();

      	  const newItem = {
      	  	  name: this.state.name 
      	  }

      	  ///add item via action
      	  this.props.addItem(newItem);

      	  //cloase modal
      	  this.toggle();
      }

      render () {
      	return (
           <div>
              {
                this.props.isAuthenticated ? <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}


             >Add Todo Item </Button>



                  : 
                   <h4 className= "mb-3 ml-4">Please Login to manage Todo Item>
                   </h4>

                  }

             
              <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}


              >
              <ModalHeader toggle={this.toggle}>Add to Todolist</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="item"> Todo Item</Label>
                    <Input
                      type="text"
                      name="name"
                      id="item"
                      palceholder="Add Shopping item"
                      onChange={this.onChange}
                      />
                      <Button
                         color="dark"
                         style={{marginTop: '2rem'}}
                         block
                         >Add Item</Button>
                  </FormGroup>
                  </Form>
              </ModalBody>

              </Modal>
           </div>


      		);
      }
 }

const mapStateToProps = state => ({
	item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

 export default connect(mapStateToProps, {addItem})(ItemModal);