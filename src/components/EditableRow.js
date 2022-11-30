import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick, emailValidator, FullName, mobileNumber }) => {
  let firstNameError = "";
  const value1 = editFormData.fullName;
  if (!FullName.test(value1)) firstNameError = "**First Name is not valid";

  let firstNameErrors = "";
  const value2 = editFormData.phoneNumber;
  if (!mobileNumber.test(value2)) firstNameErrors = "**phone Number is not valid";
  // else if(value2 === "")firstNameErrors = ""

  let firstNameErrorss = "";
  const value3 = editFormData.email;
  if (!emailValidator.test(value3)) firstNameErrorss = "**Email is not valid";
  
    return (
        <tr>
            <td>
            <input 
          type="text"
          name='fullName'
          onChange={handleEditFormChange}
          value={editFormData.fullName}
          required
          placeholder='Enter your fullName..'
          />
            {(editFormData.fullName!=="")?<p style={{color:"red",fontSize:"17px"}}>{firstNameError}</p>:null}
            </td>
            <td>
            <input 
          type="text"
          name='address'
           onChange={handleEditFormChange}
           value={editFormData.address}
          required
          placeholder='Enter your address..'
          />
          
            </td>
            <td>
            <input 
          type="text"
          name='phoneNumber'
           onChange={handleEditFormChange}
           value={editFormData.phoneNumber}
          required
          placeholder='Enter your phoneNumber..'
          />
          {(editFormData.phoneNumber!=="")?<p style={{color:"red",fontSize:"17px"}}>{firstNameErrors}</p>:null}
            </td>
            <td>
            <input 
          type="text"
          name='email'
           onChange={handleEditFormChange}
           value={editFormData.email}
          required
          placeholder='Enter your email..'
          />
          {(editFormData.email!=="")?<p style={{color:"red",fontSize:"17px"}}>{firstNameErrorss}</p>:null}
        </td>
        <td>
            <button type='submit'>Save</button>
            <button type='submit' onClick={handleCancelClick}>Cancel</button>
        </td>
        </tr>
    )
}

export default EditableRow
