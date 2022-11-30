import React,{useState, Fragment,splice} from 'react';
import './App.css';
import data from './mock-data.json';
import { nanoid } from 'nanoid';
import ReadOnly from './components/ReadOnly';
import EditableRow from './components/EditableRow';
//import { Fragment } from 'react/cjs/react.production.min';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const FullName = /^[A-Za-z. ]{3,30}$/ ;
const mobileNumber= /^[789][0-9]{9}$/ ;



function App() {
  const [contacts,setContacts] =useState(data);

  const [addFormData,setAddFormData] = useState({
    fullName:'',
    address:'',
    phoneNumber:'',
    email:'',
  })
  //  console.log(contacts)
  //  console.log(addFormData)
  //  console.log(addFormData.fullName)
  const [editFormData, setEditFormData] =useState({   //---step 1
    fullName:'',
    address:'',
    phoneNumber:'',
    email:'',
  });console.log(editFormData);

  const [valid,setValid]=useState(false)
  const[nameError,setNameError] =useState()
   let firstNameError = "";
    const value1 = addFormData.fullName;
    if (!FullName.test(value1)) firstNameError = "**First Name is not valid";
    
    
    // else if(value1.trim() === "")firstNameError = ""

    // else if (!FullName.test(value))
    // firstNameError = "First Name is not valid";
    let firstNameErrors = "";
    const value2 = addFormData.phoneNumber;
    if (!mobileNumber.test(value2)) firstNameErrors = "**phone Number is not valid";
    // else if(value2 === "")firstNameErrors = ""

    let firstNameErrorss = "";
    const value3 = addFormData.email;
    if (!emailValidator.test(value3)) firstNameErrorss = "**Email is not valid";
    // else if(value3.trim() === "")firstNameErrors = ""



  const [editContactId, setEditContactId] = useState(null); console.log(editContactId); //---step 1
  
 
  

  const handleEditFormChange =(event)=>{
    event.preventDefault();

    const field = event.target.getAttribute('name');
    const fieldValue =event.target.value;
    const newFormData ={ ...editFormData,[field]:fieldValue };
    setEditFormData(newFormData)
  };

   

  
   const handleAddFormSubmit =(event) =>{
     event.preventDefault();
     const newContact ={
       id: nanoid(),
       fullName : addFormData.fullName,
       address:addFormData.address,
       phoneNumber:addFormData.phoneNumber,
       email:addFormData.email,
     };
     const newContacts =[...contacts, newContact];
     setContacts( newContacts);
     event.target.reset(setAddFormData({
      fullName:'',
      address:'',
      phoneNumber:'',
      email:'',
     }));
     
   };
   const handleAddFormChange =(event)=>{
    event.preventDefault();

    const field = event.target.getAttribute('name');
    const fieldValue =event.target.value;
    const newFormData ={ ...addFormData,[field]:fieldValue };
    setAddFormData(newFormData)
  
    // setValid(true)
    
  };

   
   const handleEditFormSubmit =(event) =>{
    event.preventDefault();

    const editedContact  ={
      id: editContactId ,
      fullName : editFormData.fullName,
      address:editFormData.address,
      phoneNumber:editFormData.phoneNumber,
      email:editFormData.email,
    };
    const newContacts =[...contacts];
    const index =contacts.findIndex((contact) =>contact.id===editContactId);
    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null)
  };

   const handleEditClick =(event,contact)=>{
     event.preventDefault();
     setEditContactId(contact.id);
     const formValues ={
      fullName : contact.fullName,
      address:contact.address,
      phoneNumber:contact.phoneNumber,
      email:contact.email,
     }
     setEditFormData(formValues);
   };

     const handleCancelClick=()=>{
      setEditContactId(null)
     };



    const handleDeleteClick =(contactId) =>{
      const newContacts=[...contacts];
      const index = contacts.findIndex((contant)=>contant.id === contactId);
      newContacts.splice(index, 1);
      setContacts(newContacts);

    };
    
    
  return (
    <div className="app-container">
     <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {contacts.map((contact)=>(
          <Fragment>
          
           {
            editContactId === contact.id?
            <EditableRow
             editFormData={editFormData}
             handleEditFormChange={handleEditFormChange}
             handleCancelClick={handleCancelClick}

             firstNameError={firstNameError}
             emailValidator={emailValidator}
             FullName={FullName}
             mobileNumber={mobileNumber} />

             : 


            <ReadOnly
            contact={contact} 
            handleEditClick={handleEditClick} 
            handleDeleteClick={handleDeleteClick}
            />
           }
           
           
           </Fragment>
        ))}
        </tbody>
        
        </table>
        </form>
        <h2>Add Member</h2>
        <form onSubmit= { handleAddFormSubmit}> 
          <input 
          type="text"
          name='fullName'
          onChange={handleAddFormChange}
          required
          placeholder='Enter your fullName..'
          />
            {(addFormData.fullName!=="")?<p style={{color:"red",fontSize:"17px"}}>{firstNameError}</p>:null}
            <br />
          <input 
          type="text"
          name='address'
          onChange={handleAddFormChange}
          required
          placeholder='Enter your address..'
          /><br />
          <input 
          type="text"
          name='phoneNumber'
          onChange={handleAddFormChange}
          required
          placeholder='Enter your phoneNumber..'
          />
            {(addFormData.phoneNumber!=="")?<p style={{color:"red",fontSize:"17px"}}>{firstNameErrors}</p>:null}
            <br />
          <input 
          type="text"
          name='email'
          onChange={handleAddFormChange}
          required
          placeholder='Enter your email..'
          />
           
          {(addFormData.email!=="")?<p style={{color:"red",fontSize:"17px"}}>{firstNameErrorss}</p>:null}
          <br /><button type='submit' >Add</button>
        </form>
    </div>
  );
}

export default App;
