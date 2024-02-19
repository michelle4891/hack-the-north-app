import React from "react";
import { TEvent } from "../Interfaces"; // Adjust the import path as needed
import CommonEventHeader from "../common/CommonEventHeader";

interface EventModalProps {
  events: TEvent[];
  event: TEvent | null;
  loggedIn: boolean;
  onClose: () => void;
  setSelectedEvent: (event: TEvent | null) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  events,
  event,
  onClose,
  loggedIn,
  setSelectedEvent,
}) => {
  if (!event) return null; // Do not render the modal if there's no event

  const url = loggedIn ? event.private_url : event.public_url; // Display private and public url depending on if the user is logged in

  // Filter and display the events that correspond to the related event ids
  const relatedEvents = (relatedEventIds: number[]) => {
    return events
      .filter((event) => relatedEventIds.includes(event.id))
      .map((event) => (
        <button
          key={event.id}
          className="underlined-button"
          onClick={() => setSelectedEvent(event)}
        >
          {event.name}
        </button>
      ));
  };

  return (
    <div className="event-modal" id="eventModal">
      <div className="event-modal-content">
        <button onClick={onClose} className="underlined-button">
          <img src="/icons/back-icon.svg" alt="Return" />
        </button>
        <br></br>
        <CommonEventHeader
          name={event.name}
          type={event.event_type}
          permission={event.permission}
          startTime={event.start_time}
          endTime={event.end_time}
          speakers={event.speakers}
        />
        <p>{event.description || "No description available."}</p>
        <a href={url} style={{ color: "#47149a" }}>
          {url}
        </a>
        <h4 style={{ marginTop: "20px" }}>Related Events:</h4>
        {relatedEvents(event.related_events)}
        <div
          style={{ display: "flex", width: "100%", justifyContent: "right" }}
        >
          <button className="purple-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
