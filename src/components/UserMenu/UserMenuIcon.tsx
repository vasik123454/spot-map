/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSession } from "../../hooks/useSession";

export const UserMenuIcon: React.FC<{
  opened: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ onClick }) => {
  const session = useSession();

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
        src={
          !session.data?.avatarUrl
            ? "/images/undraw_pic_profile.svg"
            : session.data?.avatarUrl
        }
        alt="user icon"
        className="w-full h-full rounded-full"
      />
    </div>
  );
};
