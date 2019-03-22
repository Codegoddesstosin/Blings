import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//import uuid from 'uuid';
import { connect } from 'react-redux';
import {getItems, deleteItem, updateItem } from '../actions/itemactions';
import PropTypes from 'prop-types';

class Todolist extends Component {
 
 componentDidMount () {

    this.props.getItems();
 }

 onDeleteClick = id => {
       this.props.deleteItem(id);
 };
  
    render () {

       const { items } = this.props.item;
       return (
         <Container>
              <ListGroup>
                  <TransitionGroup className="shopping-list">
                     { items.map (({ _id, name }) => (
                      <CSSTransition key={_id} timeout={500} classNames= "fade">
                       <ListGroupItem>
                        <Button 
                          className="remove-btn"
                          color= "danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                          >&times;</Button>
                          
                          <Button 
                          
                          color= "primary"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                          >Update</Button>
                       {name}
                       </ListGroupItem>


                       </CSSTransition>

                     ))}
                  </TransitionGroup>
              </ListGroup>
         </Container>

       	);

    }

}

Todolist.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, {getItems, deleteItem, updateItem })(Todolist);