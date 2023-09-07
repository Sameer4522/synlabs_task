import { useState } from "react";

const userTemplate = {
  name: { text: "", error: "" },
  username: { text: "", error: "" },
  company: { text: "", error: "" },
  address: { text: "", error: "" },
  city: { text: "", error: "" },
  pincode: { text: "", error: "" },
  email: { text: "", error: "" },
  phone: { text: "", error: "" },
};

const updateUserTemplate = {
  name: { text: "", error: "" },
  username: { text: "", error: "" },
  company: { text: "", error: "" },
  address: { text: "", error: "" },
  city: { text: "", error: "" },
  zipcode: { text: "", error: "" },
  email: { text: "", error: "" },
  phone: { text: "", error: "" },
};

export const userState = () => {
  const [updatedKeys, setUpdatedKeys] = useState<any | []>([]);

  const handleValidation = (key: string, value: string) => {
    let error = "";

    if (key == "email") {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        error = "Invalid email";
      } else {
        error = "";
      }
    } else if (key == "name" || key == "company_name" || key == "username") {
      if (value.length < 4) {
        error = "Minimum length is 4";
      }
    } else if (key == "city") {
      if (value.length < 3) {
        error = "Minimum length is 3";
      }
    } else if (key == "phone") {
      if (value.length !== 10) {
        error = "Mobile Number Must be 10 Digit";
      }
    } else if (key == "phone") {
      if (!/^[6-9]{1}[0-9]{9}$/g.test(value)) {
        error = "Enter a vaild Mobile Number";
      }
    } else if (key == "address") {
      if (value.length < 10) {
        error = "Enter a valid address";
      }
    } else if (key == "pincode") {
      if (value.length < 6) {
        error = "Enter a valid pincode";
      }
    }

    return error;
  };

  const extractFormData = (form: any) => {
    let bodyData: any = {};

    for (const [mainKey, mainValue] of Object.entries(form)) {
      bodyData[mainKey] = (mainValue as { text: string }).text;
    }

    return bodyData;
  };

  // user Form
  const [userForm, setUserForm] = useState({ ...userTemplate });

  const handleUserForm = (key: string, value: string) => {
    let currentState: any = { ...userForm };

    currentState[key]["text"] = value;
    currentState[key]["error"] = handleValidation(key, value);

    setUserForm(currentState);
  };

  // update user form
  const [updateUserForm, setUpdateUserForm] = useState({
    ...updateUserTemplate,
  });

  const handleUpdateUserForm = (key: string, value: string) => {
    let currentState: any = { ...updateUserForm };

    currentState[key]["text"] = value;

    const error = handleValidation(key, value);
    currentState[key]["error"] = error;

    const currentKeys: any = [...updatedKeys];

    if (!currentKeys.includes(key)) {
      currentKeys.push(key);
    }

    setUpdatedKeys(currentKeys);
    setUpdateUserForm(currentState);
  };

  return {
    extractFormData,
    userForm,
    setUserForm,
    handleUserForm,
    updateUserForm,
    setUpdateUserForm,
    handleUpdateUserForm,
    setUpdatedKeys,
    updatedKeys,
  };
};
