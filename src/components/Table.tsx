import { tableHeadings } from "../constants";
import { IoMdSettings } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import ListLoading from "./partials/ListLoading";
import CustomPagination from "./partials/CustomPagination";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { BsFillEyeFill } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";

type props = {
  loading: boolean;
  userData: null | [];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setModals: React.Dispatch<
    React.SetStateAction<{
      addUser: boolean;
      details: boolean;
      editUser: boolean;
      deleteUser: boolean;
      data: any;
    }>
  >;
};

const Table: React.FC<props> = ({
  loading,
  userData,
  currentPage,
  setCurrentPage,
  setModals,
}) => {
  // function to change the page number
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // when dropdown opens it should set the data to modals state and vice versa
  const onDropdownOpenChange = (open: boolean, user: any) => {
    if (open) {
      setModals((prevData) => ({
        ...prevData,
        data: user,
      }));
    } else if (!open) {
      setModals((prevData) => ({
        ...prevData,
        data: null,
      }));
    }
  };

  // menu Items
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <BsFillEyeFill size={18} className="text-gray-600" />,
      label: (
        <button
          style={{
            fontFamily: "Montserrat",
          }}
          className=" text-gray-600 font-semibold"
        >
          Details
        </button>
      ),
      onClick: () => {
        setModals((prevData) => ({
          ...prevData,
          details: true,
        }));
      },
    },
    {
      key: "2",
      icon: <BiSolidEdit size={18} className="text-gray-600" />,
      label: (
        <button
          style={{
            fontFamily: "Montserrat",
          }}
          className=" text-gray-600 font-semibold"
        >
          Edit
        </button>
      ),
      onClick: () => {
        setModals((prevData) => ({
          ...prevData,
          editUser: true,
        }));
      },
    },
  ];

  return (
    <div className="w-full py-6 px-6 bg-white text-gray-500 rounded-b">
      {/* added overflow if screen size is lower than 1290px */}
      <div className="overflow-x-auto overflow-y-hidden">
        <table
          id="userTable"
          className="md:min-w-[90rem] lg:min-w-[80rem] xl:min-w-full"
        >
          <thead>
            <tr className="border-b-2">
              {/* mapped table headings */}
              {tableHeadings.map((heading, index) => (
                <th key={index} className="font-bold px-6 pb-3 text-start">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {/* mapped user Data */}
          <tbody>
            {loading === false &&
              userData !== null &&
              userData?.map((user: any, index: number) => (
                <tr key={index} className="border-b-2 text-[15px]">
                  <td className="font-medium py-3 text-start px-6">
                    {index + 1}
                  </td>
                  <td className="font-medium py-3 text-start px-6">
                    {user?.name ? user?.name : "-"}
                  </td>
                  <td className="font-medium py-3 text-start px-6">
                    {user?.username ? user?.username : "-"}
                  </td>
                  <td className="font-medium py-3 text-start px-6">
                    {user?.email ? user?.email : "-"}
                  </td>
                  <td className="font-medium py-3 text-start px-6">
                    {user?.phone ? user?.phone : "-"}
                  </td>
                  <td className="font-medium py-3 text-start px-6">
                    {user?.company.name ? user?.company.name : "-"}
                  </td>
                  <td className="font-medium py-3 text-start px-6 flex gap-4 items-center">
                    <Dropdown
                      menu={{ items }}
                      trigger={["click"]}
                      onOpenChange={(open) => onDropdownOpenChange(open, user)}
                    >
                      <IoMdSettings
                        size={26}
                        className=" text-primary hover:text-opacity-70 transition duration-150 cursor-pointer"
                      />
                    </Dropdown>

                    <RxCrossCircled
                      size={24}
                      className="text-red-500 stroke-[0.5] hover:text-opacity-70 transition duration-150 cursor-pointer"
                      onClick={() =>
                        setModals((prevData) => ({
                          ...prevData,
                          deleteUser: true,
                          data: user,
                        }))
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* show loading if loading is true */}
        {loading && <ListLoading />}

        {/* if api call fails then show No result */}
        {userData === undefined || userData?.length === 0 ? (
          <div className="w-full pt-6 flex items-center justify-center">
            <p className="font-semibold text-red-500">No user Found</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* pagination */}
      {userData !== null && userData !== undefined ? (
        <div className="pt-10 pb-5 flex w-full justify-center lg:justify-end">
          <CustomPagination
            currentPage={currentPage}
            totalData={userData !== null ? userData?.length : 0}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Table;
