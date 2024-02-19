import React, { useEffect, useState } from "react";
import { TEvent, TEventType } from "../Interfaces";
import EventModal from "./EventModal";
import CommonEventHeader from "../common/CommonEventHeader";
import EventTypeFilter from "./EventTypeFilter";

const EventsGrid: React.FC<{
  loggedIn: boolean;
  setShowLogin: (showLogin: boolean) => void;
}> = ({ loggedIn, setShowLogin }) => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    workshop: false,
    activity: false,
    tech_talk: false,
  });
  const [lastFocusedElement, setLastFocusedElement] = useState<Element | null>(
    null
  );

  const openModal = (event: TEvent) => {
    setLastFocusedElement(document.activeElement); // Store the currently focused element
    setSelectedEvent(event);
    setTimeout(() => {
      const modalElement = document.getElementById("eventModal");
      if (modalElement) modalElement.focus(); // Focus on the modal or a specific element within it
    }, 0);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus(); // Return focus to the element that opened the modal
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://api.hackthenorth.com/v3/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data: TEvent[] = await response.json();
        // Filter out the private events if user is not logged in
        if (!loggedIn) {
          data = data.filter((event) => event.permission === "public");
        }
        // Sort the events by start_time in ascending order
        data = data.sort((a, b) => a.start_time - b.start_time);
        setEvents(data);
      } catch (error) {
        setError("Failed to fetch events");
        console.error("There was an error!", error);
      } finally {
        // Stop loading once events fetched
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [loggedIn]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    event: TEvent
  ) => {
    if (e.key === "Enter") {
      openModal(event);
    }
  };

  // Check if event type is selected
  const isTypeSelected: boolean = Object.values(selectedTypes).some(
    (value) => value
  );

  // Filter events by search term and event type filter
  const filteredEvents = events
    .filter(
      (event) =>
        searchTerm === "" ||
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Check if event name includes the search term
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) // Check if event description includes the search term
    )
    .filter((event) => !isTypeSelected || selectedTypes[event.event_type]);

  // Set selected event types
  const handleTypeChange = (type: TEventType) => {
    setSelectedTypes((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type],
    }));
  };

  let eventsGridContent = null;

  if (isLoading) {
    // Display while fetching events
    eventsGridContent = <div>Loading...</div>;
  } else if (error) {
    // Display if error fetching events
    eventsGridContent = <div>Error: {error}</div>;
  } else if (filteredEvents.length === 0) {
    // Display if no search results are found
    eventsGridContent = <div>No Results Found.</div>;
  } else {
    // Display filtered events in a grid format
    eventsGridContent = filteredEvents.map((event) => (
      <div
        tabIndex={0} // Keyboard accessible
        key={event.id}
        className="event-widget"
        onKeyDown={(e) => handleKeyDown(e, event)} // Keyboard accessible (user clicks enter while focused on event)
        onClick={() => openModal(event)} // Open respective event modal when clicked
      >
        <CommonEventHeader
          name={event.name}
          type={event.event_type}
          permission={event.permission}
          startTime={event.start_time}
          endTime={event.end_time}
          speakers={event.speakers}
        />
      </div>
    ));
  }

  return (
    <div style={{ padding: "0px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 15px",
          alignItems: "center",
        }}
      >
        <h2>Events</h2>
        {loggedIn ? (
          <button className="white-button" onClick={() => setShowLogin(true)}>
            Log Out
          </button>
        ) : (
          <button className="white-button" onClick={() => setShowLogin(true)}>
            Log In
          </button>
        )}
      </div>
      <EventTypeFilter
        selectedTypes={selectedTypes}
        handleSearchChange={handleSearchChange}
        handleTypeChange={handleTypeChange}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          paddingTop: "10px",
        }}
      >
        {eventsGridContent}
      </div>
      <EventModal
        events={events}
        loggedIn={loggedIn}
        event={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        onClose={closeModal}
      />
    </div>
  );
};

export default EventsGrid;
