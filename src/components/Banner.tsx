import React from "react";

export type BannerData = {
  message: string;
  state: "success" | "error";
};

const Banner = ({ banner: { message, state } }: { banner: BannerData }) => {
  const isSuccess = state === "success";
  const icon = isSuccess ? "✅" : "❌";

  console.log(state);

  return (
    <p
      className={`p-2 rounded-xl w-full text-center ${
        isSuccess ? "bg-green-300" : "bg-red-300"
      }`}
    >
      {`${icon} ${message}`}
    </p>
  );
};

export default Banner;
