import React, { useEffect } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';

import EditForm from './EditForm'

import { connect } from 'react-redux'
import { 
    GetDriver, 
    GetRider, 
    UpdateRider, 
    UpdateDriver, 
    DeleteRider, 
    DeleteDriver, 
    EditingUserStart,
    EditingUserStop
  } from '../State/actions/actions'
import "./Users.css"


//this component should show the user's own profile information.

const Profile = (props) => {

    const profileInfo = props.currentUser
    const editing = props.editingUser
    const user = props.user
    const userID = props.currentUser.id

    //setting strings to check against.
    const driverRole = "driver";
    const riderRole = "rider"; 
    
    console.log('profile props', props)

    const editButton = () => {
      editing === false
      ? props.EditingUserStart()
      : props.EditingUserStop()
    }

    // const deleteButton = () => {
    //   props.user.role === driverRole
    //   ? props.DeleteDriver(userID)
    //   : props.DeleteRider(userID)
    // }


    // const handleDelete = (e, userID) => {
    //   e.preventDefault()
    //   const confirmation = confirm('Are you sure you want to delete your account?')
    //   confirmation ? props.DeleteRider(userID) : null
    // }

    return (
      <>
      {editing 
        ? <div className="edit-form-container">
            <EditForm />
            <Button color="warning" className="edit" onClick={editButton}>I Changed My Mind</Button>
          </div> 

        : <div> 
          {profileInfo && (driverRole === user.role) 
          ? 
          <div className="profile">
              <div className="profile-card">
                  <Card id="profile-card">
                    <img src={props.currentUser.url} />
                    <div className = "text-container">
                    <CardTitle tag="h3">{profileInfo.name}</CardTitle>
                    <CardSubtitle>Location: {profileInfo.location}</CardSubtitle>
                    <CardSubtitle>Price: {profileInfo.price}</CardSubtitle>
                    <CardSubtitle>Bio: {profileInfo.bio}</CardSubtitle>
                    </div>
                  </Card>
              </div>

              <div className="profile-buttons">

                  <Button 
                    color="warning" 
                    className="edit" 
                    onClick={editButton}
                    >Edit
                  </Button>

                  <Button 
                    color="danger" 
                    className="delete"
                    onClick={() => window.confirm("Are you sure you want to delete your account?")
                  ? props.DeleteDriver(userID)
                  : null }
                    >Delete
                  </Button>
              </div>
            </div>
          
          : null}

          {profileInfo && (riderRole === props.user.role) 
          ? 
          <div className="profile">
              <div className="profile-card">
                  <Card id="profile-card">
                    <CardTitle tag="h3">{profileInfo.name}</CardTitle>
                    <CardSubtitle>Location: {profileInfo.location}</CardSubtitle>
                  </Card>
              </div>
              
              <div className="profile-buttons">
                  <Button 
                    color="warning" 
                    className="edit" 
                    onClick={editButton}
                    >Edit
                  </Button>
                  
                  <Button 
                    color="danger" 
                    className="delete"
                    onClick={() => window.confirm("Are you sure you want to delete your account?")
                  ? props.DeleteRider(userID)
                  : null }
                    >Delete
                  </Button>
              </div>
          </div>
          
          : null}




        </div>}

    </>
  )
}


const mapStateToProps = state => {
        return {
        user: state.user,
        currentUser: state.currentUser,
        updatingDriver: state.updatingDriver,
        updatingRider: state.updatingRider,
        editingUser: state.editingUser
    }
}

const mapDispatchToProps = {
   GetDriver,
   GetRider,
   UpdateRider,
   UpdateDriver,
   DeleteDriver,
   DeleteRider,
   EditingUserStart,
   EditingUserStop
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)