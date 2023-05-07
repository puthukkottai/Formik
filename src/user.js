import React from "react";
import { MyProvider1 } from "./components/userContext";
import UserForm from "./components/userForm";
export default function User() {
  return (
    <div className="userprovider">
      <MyProvider1>
        <UserForm />
      </MyProvider1>
    </div>
  );
}
