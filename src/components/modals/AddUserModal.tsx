import { useState } from "react";
import ModalLayout from "../partials/ModalLayout";
import InputField from "../partials/InputField";
import { userState } from "../../hooks/userState";
import { errorToast, removeChar, successToast } from "../../api/utils";
import SecondaryBtn from "../partials/SecondaryBtn";
import PrimaryBtn from "../partials/PrimaryBtn";
import { USER } from "../../api/apiServices";
import Loading from "../partials/Loading";

type props = {
  onClose: () => void;
  fetchUserList: () => void;
  setUserForm: any;
  userForm: {
    name: { text: string; error: string };
    username: { text: string; error: string };
    company: { text: string; error: string };
    address: { text: string; error: string };
    city: { text: string; error: string };
    pincode: { text: string; error: string };
    email: { text: string; error: string };
    phone: { text: string; error: string };
  };
  handleUserForm: (key: string, value: string) => void;
};

const AddUserModal: React.FC<props> = ({
  onClose,
  fetchUserList,
  setUserForm,
  userForm,
  handleUserForm,
}) => {
  const [loading, setLoading] = useState(false);
  const { extractFormData } = userState();

  const addNewUser = async () => {
    setLoading(true);
    try {
      let currentForm: any = { ...userForm };
      let error = false;

      for (const [mainKey, mainValue] of Object.entries(userForm)) {
        // Check for validation errors and update the form state
        if (mainValue.text.length === 0 && mainValue.error.length === 0) {
          error = true;
          currentForm[mainKey] = {
            ...currentForm[mainKey],
            error: "This field is required",
          };
        } else if (
          mainValue.text.length !== 0 &&
          mainValue.error.length !== 0
        ) {
          error = true;
        } else if (
          mainValue.text.length === 0 &&
          mainValue.error.length !== 0
        ) {
          error = true;
        }
      }

      if (error) {
        setUserForm(currentForm);
        throw Error("Invalid form fields");
      }

      const bodyData = extractFormData(userForm);

      const res = await USER.addNewUser({
        ...bodyData,
        company: { name: bodyData.company },
        address: {
          street: bodyData.address,
          city: bodyData.city,
          zipcode: bodyData.pincode,
        },
      });

      if (res !== undefined && [200, 201, 202, 203, 204].includes(res.status)) {
        // clearing form state
        setUserForm({
          name: { text: "", error: "" },
          username: { text: "", error: "" },
          company: { text: "", error: "" },
          address: { text: "", error: "" },
          city: { text: "", error: "" },
          pincode: { text: "", error: "" },
          email: { text: "", error: "" },
          phone: { text: "", error: "" },
        });

        onClose();

        // fetch user again
        fetchUserList();

        // show success message
        successToast("Added User Successfully");
      } else {
        errorToast("Failed to Add User");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      errorToast(
        error.message ? error.message : "Something went wrong! try again later"
      );
    }
  };

  return (
    <>
      <ModalLayout onClose={onClose}>
        <p className="w-full border-b-2 border-black/20 pb-4 text-center text-2xl font-bold">
          Add New User
        </p>

        <div className="mt-6 grid max-h-[25rem] md:max-h-full pr-3 overflow-y-auto md:overflow-hidden md:h-full pt-2 md:pt-0 w-full grid-cols-1 gap-x-8 gap-y-4 md:w-[35rem] md:grid-cols-2">
          <InputField
            label="Name"
            type="text"
            name="name"
            value={userForm.name.text}
            error={userForm.name.error}
            onChange={(e) => {
              handleUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Username"
            type="text"
            name="username"
            value={userForm.username.text}
            error={userForm.username.error}
            onChange={(e) => {
              handleUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Email"
            type="text"
            name="email"
            value={userForm.email.text}
            error={userForm.email.error}
            onChange={(e) => {
              handleUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            maxLength={10}
            value={userForm.phone.text}
            error={userForm.phone.error}
            onChange={(e) => {
              let value = removeChar(e.target.value);
              handleUserForm(e.target.name, value);
            }}
          />

          <InputField
            label="City"
            type="text"
            name="city"
            value={userForm.city.text}
            error={userForm.city.error}
            onChange={(e) => {
              handleUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Pincode / Zipcode"
            type="text"
            name="pincode"
            value={userForm.pincode.text}
            error={userForm.pincode.error}
            onChange={(e) => {
              handleUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Street Address"
            type="text"
            name="address"
            value={userForm.address.text}
            error={userForm.address.error}
            onChange={(e) => {
              handleUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Company Name"
            type="text"
            name="company"
            value={userForm.company.text}
            error={userForm.company.error}
            onChange={(e) => {
              handleUserForm(e.target.name, e.target.value);
            }}
          />
        </div>

        <div className="mt-8 flex w-full items-center justify-center gap-6">
          <SecondaryBtn onClick={onClose} text="Cancel" />

          <PrimaryBtn onClick={addNewUser} text="Confirm" />
        </div>
      </ModalLayout>

      {loading && <Loading />}
    </>
  );
};

export default AddUserModal;
