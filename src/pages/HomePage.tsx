import { useState, useEffect } from "react";
import Table from "../components/Table";
import { USER } from "../api/apiServices";
import { errorToast, handleExportToExcel, successToast } from "../api/utils";
import FilterButtons from "../components/partials/FilterButtons";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import ConfirmModal from "../components/modals/ConfirmModal";
import UserDetailsModal from "../components/modals/UserDetailsModal";
import AddUserModal from "../components/modals/AddUserModal";
import { userState } from "../hooks/userState";
import UpdateUserModal from "../components/modals/UpdateUserModal";

/**
 * ?TODO: add dropdown menu for action btn
 * ?TODO: add modal for user details
 * ?TODO: add modal for add user
 * ?TODO: add modal for edit user details
 * ?TODO: add func for delete user
 * ?TODO: make download excel btn work
 * TODO: make sure everthing is working and response is handled with error
 */

const HomePage = () => {
  const [userData, setUserData] = useState(null); // state to store api data
  const [loading, setLoading] = useState(true); // state to show the loading
  const [currentPage, setCurrentPage] = useState(1); // state to change the pagination
  const [modals, setModals] = useState({
    addUser: false,
    details: false,
    editUser: false,
    deleteUser: false,
    data: null,
  }); // states to handle modals and if necessary pass their data

  const {
    userForm,
    setUserForm,
    handleUserForm,
    updateUserForm,
    setUpdateUserForm,
    handleUpdateUserForm,
    updatedKeys,
    setUpdatedKeys,
  } = userState();

  // function to fetch users list
  const fetchUserList = async () => {
    setLoading(true);
    try {
      const res: any = await USER.getUserData(currentPage);

      if (res.status === 200 || 201 || 202 || 203 || 204) {
        setUserData(res.data);
      } else {
        errorToast("Unable to fetch data");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      errorToast("Something went wrong! try again later");
    }
  };

  // function to remove user
  const removeUser = async (user: any) => {
    setLoading(true);
    try {
      const res: any = await USER.deleteUser(user.id);

      if (res.status === 200) {
        fetchUserList();
        successToast("User Removed Successfully");
      } else {
        errorToast("Failed to remove user");
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      errorToast("Something went wrong! try again later");
    }
  };

  // useEffect to fetch api
  useEffect(() => {
    fetchUserList();
  }, [currentPage]);

  return (
    <>
      <main className="w-full h-full max-w-full py-16 px-6 md:p-16">
        <section className="flex flex-col items-center justify-center w-full shadow-md drop-shadow-md">
          {/* Heading and filter buttons */}
          <div className="py-4 rounded-t bg-primary w-full px-7 text-white flex flex-col gap-y-6 md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold">User Managment</h2>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <FilterButtons
                icon={
                  <BsFileEarmarkExcelFill size={18} className="text-gray-500" />
                }
                text="Export to Excel"
                onClick={handleExportToExcel}
              />

              <FilterButtons
                icon={<IoAddCircleSharp size={22} className="text-gray-500" />}
                text="Add New User"
                onClick={() =>
                  setModals((prevData) => ({
                    ...prevData,
                    addUser: true,
                  }))
                }
              />
            </div>
          </div>

          {/* table */}
          <Table
            loading={loading}
            userData={userData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setModals={setModals}
          />
        </section>
      </main>

      {/* add user modal */}
      {modals.addUser && (
        <AddUserModal
          userForm={userForm}
          setUserForm={setUserForm}
          handleUserForm={handleUserForm}
          onClose={() => {
            setModals((prevData) => ({
              ...prevData,
              addUser: false,
              data: null,
            }));

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
          }}
          fetchUserList={fetchUserList}
        />
      )}

      {/* user details modal */}
      {modals.details && (
        <UserDetailsModal
          onClose={() =>
            setModals((prevData) => ({
              ...prevData,
              details: false,
              data: null,
            }))
          }
          userData={modals.data}
        />
      )}

      {/* edit user modal */}
      {modals.editUser && (
        <UpdateUserModal
          userData={modals.data}
          updateUserForm={updateUserForm}
          setUpdateUserForm={setUpdateUserForm}
          handleUpdateUserForm={handleUpdateUserForm}
          updatedKeys={updatedKeys}
          setUpdatedKeys={setUpdatedKeys}
          onClose={() => {
            setModals((prevData) => ({
              ...prevData,
              editUser: false,
              data: null,
            }));

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
          }}
          fetchUserList={fetchUserList}
        />
      )}

      {/* Delete user modal */}
      {modals.deleteUser && (
        <ConfirmModal
          text={modals.data !== null ? modals.data["name"] : ""}
          onClose={() =>
            setModals((prevData) => ({
              ...prevData,
              deleteUser: false,
              data: null,
            }))
          }
          onConfirm={() => {
            removeUser(modals.data !== null ? modals.data : null);
            setModals((prevData) => ({
              ...prevData,
              deleteUser: false,
              data: null,
            }));
          }}
        />
      )}
    </>
  );
};

export default HomePage;
