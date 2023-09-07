import ModalLayout from "../partials/ModalLayout";
import InputField from "../partials/InputField";

type props = {
  onClose: () => void;
  userData: any;
};

const UserDetailsModal: React.FC<props> = ({ onClose, userData }) => {
  return (
    <>
      <ModalLayout onClose={onClose}>
        <p className="w-full border-b-2 border-black/20 pb-4 text-center text-2xl font-bold">
          User Details
        </p>

        <div className="mt-6 grid max-h-[30rem] pr-3 overflow-y-auto md:overflow-hidden md:h-fit pt-2 md:pt-0 w-full grid-cols-1 gap-x-8 gap-y-6 md:w-[35rem] md:grid-cols-2">
          <InputField
            label="Name"
            type="text"
            name="name"
            disabled={true}
            value={userData.name}
          />

          <InputField
            label="Username"
            type="text"
            name="username"
            disabled={true}
            value={userData.username}
          />

          <InputField
            label="Email"
            type="text"
            name="email"
            disabled={true}
            value={userData.email}
          />

          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            disabled={true}
            value={userData.phone}
          />

          <InputField
            label="City"
            type="text"
            name="city"
            disabled={true}
            value={userData.address.city}
          />

          <InputField
            label="Pincode / Zipcode"
            type="text"
            name="pincode"
            disabled={true}
            value={userData.address.zipcode}
          />

          <InputField
            label="Street Address"
            type="text"
            name="address"
            disabled={true}
            value={userData.address.street}
          />

          <InputField
            label="Company Name"
            type="text"
            name="company_name"
            disabled={true}
            value={userData.company.name}
          />
        </div>
      </ModalLayout>
    </>
  );
};

export default UserDetailsModal;
