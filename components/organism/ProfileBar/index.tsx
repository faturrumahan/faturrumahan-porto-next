import React from "react";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import ContactList from "@/components/molecules/ContactList";

const ProfileBar = () => {
  return (
    <div className="max-lg:p-5 lg:px-7 lg:py-10 bg-stone-100 rounded-lg w-full lg:w-1/5 items-center flex flex-col gap-5 shadow-md h-fit lg:sticky lg:top-0">
      <ProfileOverview />
      <hr className="w-full h-[1.5px] bg-stone-200 rounded" />
      <ContactList />
    </div>
  );
};

export default ProfileBar;
