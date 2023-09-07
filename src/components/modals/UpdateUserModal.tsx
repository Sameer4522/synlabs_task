import { useState, useEffect } from "react";
import ModalLayout from "../partials/ModalLayout";
import InputField from "../partials/InputField";
import { userState } from "../../hooks/userState";
import {
  errorToast,
  infoToast,
  removeChar,
  successToast,
} from "../../api/utils";
import SecondaryBtn from "../partials/SecondaryBtn";
import PrimaryBtn from "../partials/PrimaryBtn";
import Loading from "../partials/Loading";
import { USER } from "../../api/apiServices";

type props = {
  onClose: () => void;
  fetchUserList: () => void;
  userData: any;
  updateUserForm: {
    name: { text: string; error: string };
    username: { text: string; error: string };
    company: { text: string; error: string };
    address: { text: string; error: string };
    city: { text: string; error: string };
    zipcode: { text: string; error: string };
    email: { text: string; error: string };
    phone: { text: string; error: string };
  };
  setUpdateUserForm: any;
  handleUpdateUserForm: (key: string, value: string) => void;
  updatedKeys: any;
  setUpdatedKeys: any;
};

const UpdateUserModal: React.FC<props> = ({
  userData,
  onClose,
  fetchUserList,
  updateUserForm,
  setUpdateUserForm,
  handleUpdateUserForm,
  updatedKeys,
  setUpdatedKeys,
}) => {
  const [loading, setLoading] = useState(false);
  const { extractFormData } = userState();

  // useEffect to populate data to form
  useEffect(() => {
    if (userData) {
      const updatedForm = {
        name: { text: userData.name, error: "" },
        username: { text: userData.username, error: "" },
        company: { text: userData.company.name, error: "" },
        address: { text: userData.address.street, error: "" },
        city: { text: userData.address.city, error: "" },
        zipcode: { text: userData.address.zipcode, error: "" },
        email: { text: userData.email, error: "" },
        phone: { text: userData.phone, error: "" },
      };
      setUpdateUserForm(updatedForm);
    }
  }, [userData]);

  const updateUser = async () => {
    try {
      setLoading(true);

      let currentForm: any = { ...updateUserForm };
      let error = "";

      // Check if any field has been edited and if mainKey.error !== 0
      for (const mainKey of updatedKeys) {
        const mainValue = currentForm[mainKey];

        if (mainValue.error.length !== 0) {
          error = mainValue.error;
          break;
        }
      }

      // Check if no fields have been edited
      if (updatedKeys.length === 0) {
        // Show a success message for no updates
        infoToast("No changes made.");
        setLoading(false);
        return;
      }

      if (error.length !== 0) {
        setLoading(false);
        return;
      }

      let bodyData = extractFormData(updateUserForm);

      const res: any = await USER.updateUserData(userData.id, {
        ...bodyData,
        company: { name: bodyData.company },
        address: {
          street: bodyData.address,
          city: bodyData.city,
          zipcode: bodyData.pincode,
        },
      });

      if (
        res.status === 200 ||
        res.status === 201 ||
        res.status === 202 ||
        res.status === 203 ||
        res.status === 204
      ) {
        successToast("Updated User Successfully");
        onClose();
        fetchUserList();
      } else {
        errorToast("Failed to update user");
      }

      setLoading(false);
      setUpdatedKeys([]);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        error.message ? error.message : "Something went wrong! Try again later"
      );
    }
  };

  return (
    <>
      <ModalLayout onClose={onClose}>
        <p className="w-full border-b-2 border-black/20 pb-4 text-center text-2xl font-bold">
          Update New User
        </p>

        <div className="mt-6 grid max-h-[25rem] pr-3 overflow-y-auto md:h-full pt-2 md:pt-0 w-full grid-cols-1 gap-x-8 gap-y-4 md:w-[35rem] md:grid-cols-2">
          <InputField
            label="Name"
            type="text"
            name="name"
            value={updateUserForm.name.text}
            error={updateUserForm.name.error}
            onChange={(e) => {
              handleUpdateUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Username"
            type="text"
            name="username"
            value={updateUserForm.username.text}
            error={updateUserForm.username.error}
            onChange={(e) => {
              handleUpdateUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Email"
            type="text"
            name="email"
            value={updateUserForm.email.text}
            error={updateUserForm.email.error}
            onChange={(e) => {
              handleUpdateUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            maxLength={10}
            value={updateUserForm.phone.text}
            error={updateUserForm.phone.error}
            onChange={(e) => {
              let value = removeChar(e.target.value);
              handleUpdateUserForm(e.target.name, value);
            }}
          />

          <InputField
            label="City"
            type="text"
            name="city"
            value={updateUserForm.city.text}
            error={updateUserForm.city.error}
            onChange={(e) => {
              handleUpdateUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Pincode / Zipcode"
            type="text"
            name="pincode"
            value={updateUserForm.zipcode.text}
            error={updateUserForm.zipcode.error}
            onChange={(e) => {
              handleUpdateUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Street Address"
            type="text"
            name="address"
            value={updateUserForm.address.text}
            error={updateUserForm.address.error}
            onChange={(e) => {
              handleUpdateUserForm(e.target.name, e.target.value);
            }}
          />

          <InputField
            label="Company Name"
            type="text"
            name="company"
            value={updateUserForm.company.text}
            error={updateUserForm.company.error}
            onChange={(e) => {
              handleUpdateUserForm(e.target.name, e.target.value);
            }}
          />
        </div>

        <div className="mt-8 flex w-full items-center justify-center gap-6">
          <SecondaryBtn onClick={onClose} text="Cancel" />

          <PrimaryBtn onClick={updateUser} text="Confirm" />
        </div>
      </ModalLayout>

      {loading && <Loading />}
    </>
  );
};

export default UpdateUserModal;
