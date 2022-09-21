import React, { useState } from "react";
import styles from "./HamburgerMenuIcon.module.scss";

export const HamburgerMenuIcon: React.FC<{
  onClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ onClick }) => {
  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`w-11 h-11 flex items-center justify-center rounded-full hover:bg-zinc-200 cursor-pointer ${
        clicked ? (opened ? styles.opened : styles.closed) : ""
      }`}
      onClick={(e) => {
        setClicked(true);

        setOpened(!opened);

        onClick(e);
      }}
    >
      <div className="w-7 h-7 flex-col gap-3 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className="style-scope yt-icon"
          style={{
            pointerEvents: "none",
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <g className="style-scope yt-icon">
            <path
              d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"
              className="style-scope yt-icon"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};