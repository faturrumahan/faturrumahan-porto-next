"use client";

import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <ScaleLoader height={20} color="#8f8f8f" />
    </div>
  );
}
