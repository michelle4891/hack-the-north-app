import React from "react";
import { TEventType } from "../Interfaces";

interface EventTypeFilterProps {
  selectedTypes: Record<TEventType, boolean>;
  handleTypeChange: (type: TEventType) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventTypeFilter: React.FC<EventTypeFilterProps> = ({
  selectedTypes,
  handleTypeChange,
  handleSearchChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: "10px",
        margin: "10px",
      }}
    >
      {/*Search box that allows user to enter a search term*/}
      <input
        type="text"
        className="search-box"
        onChange={handleSearchChange}
        placeholder="Search events..."
      />
      {/*Checkboxes to allow user to filter by event type*/}
      <div>
        <input
          type="checkbox"
          id="workshop"
          checked={selectedTypes.workshop}
          onChange={() => handleTypeChange("workshop")}
        />
        <label htmlFor="workshop" style={{ marginLeft: "5px" }}>
          Workshop
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="activity"
          checked={selectedTypes.activity}
          onChange={() => handleTypeChange("activity")}
        />
        <label htmlFor="activity" style={{ marginLeft: "5px" }}>
          Activity
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="tech_talk"
          checked={selectedTypes.tech_talk}
          onChange={() => handleTypeChange("tech_talk")}
        />
        <label htmlFor="tech_talk" style={{ marginLeft: "5px" }}>
          Tech Talk
        </label>
      </div>
    </div>
  );
};

export default EventTypeFilter;
