import React from "react";
import ProfileOverview from "@/components/molecules/ProfileOverview";
import ContactList from "@/components/molecules/ContactList";

const ProfileBar = () => {
  return (
    <div className="px-7 py-10 bg-stone-100 rounded-lg w-1/5 items-center flex flex-col gap-5 shadow-md h-fit sticky top-0">
      <ProfileOverview />
      <hr className="w-full h-[1.5px] bg-stone-200 rounded" />
      <ContactList />
    </div>
  );
};

export default ProfileBar;
