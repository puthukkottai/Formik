import MyForm from "./components/form";
import { MyProvider } from "./components/context";
import React from "react";
export default function Home() {
  return (
    <div>
      <MyProvider>
        <MyForm />
      </MyProvider>
    </div>
  );
}
