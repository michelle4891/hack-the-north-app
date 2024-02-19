import React from "react";
import { TEventType, TPermission, TSpeaker } from "../Interfaces";

interface CommonEventHeaderProps {
  name: string;
  type: TEventType;
  permission: TPermission | undefined;
  startTime: number;
  endTime: number;
  speakers: TSpeaker[];
}

const CommonEventHeader: React.FC<CommonEventHeaderProps> = ({
  name,
  type,
  permission,
  startTime,
  endTime,
  speakers,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <h3>{name}</h3>
      <div style={{ display: "flex", gap: "10px", margin: "5px 0" }}>
        <div className="event-tag">{type.replace("_", "-")}</div>
        <div className="event-tag">{permission}</div>
      </div>
      <h4>
        {/*Format start and end date and time*/}
        {new Date(startTime).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}{" "}
        {new Date(startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
        {" - "}
        {new Date(endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </h4>
      <h4>Speakers: {speakers.map((speaker) => speaker.name).join(", ")}</h4>
    </div>
  );
};

export default CommonEventHeader;
