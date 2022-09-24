/* eslint-disable @next/next/no-img-element */
import React from "react";

export const UserMenuIcon: React.FC<{
  opened: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ onClick }) => {
  return (
    <div
      className="overflow-hidden cursor-pointer"
      onClick={onClick}
      style={{
        minWidth: "2.75rem",
        minHeight: "2.75rem",
        height: "2.75rem",
        width: "2.75rem",
      }}
    >
      <img
        src="https://yt3.ggpht.com/yti/AJo0G0nU130wO4fcQvGE_fnQxbe8Yj2bLVxA7ladTzib=s88-c-k-c0x00ffffff-no-rj-mo"
        alt="user icon"
        className="w-full h-full rounded-full kokotko"
      />
    </div>
  );
};
