import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/authSlice";

import userDefaultProfileImage from "../../../assets/user_profile_icon.png";
import { Button, TextInput } from "flowbite-react";

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) {
    return <div>USER NULL ERROR</div>;
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form className="flex flex-col gap-4">
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'">
          <img
            src={currentUser.profileImg || userDefaultProfileImage}
            alt="User Profile Image"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray] "
          />
        </div>
        <TextInput
          type="userName"
          id="userName"
          placeholder="User Name"
          defaultValue={currentUser.username}
          onChange={handleUserChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleUserChange}
        />

        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleUserChange}
        />
        <Button
          type="submit"
          outline
          // </div>disabled={loading || imageFileUploading}
        >
          {
            // loading ? "Loading..." : "Update"
            "Update"
          }
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => {}} className='cursor-pointer'>
          Delete Account
        </span>
        <></>
      </div>
    </div>
  );
};

export default Profile;
