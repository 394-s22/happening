import { render, screen, fireEvent } from "@testing-library/react";
import { useUserState, confirmSignOut } from "./utils/firebase";
import { useEvents, useUserRsvpEvents } from "./utils/api";
import "@testing-library/jest-dom";
import App from "./App";
import { signOut } from "firebase/auth";
import { useState } from "react";

jest.mock("./utils/firebase");
jest.mock("./utils/api");

test("page loads", () => {
  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const headerElement = screen.getByText(/Happened/i);
  expect(headerElement).toBeInTheDocument();
});

test("non authenticated user", () => {
  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const signInButton = screen.getByTestId("btn-sign-in");
  expect(signInButton).toBeInTheDocument();
});

test("authenticated user sees something different", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };

  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const signOutButton = screen.getByTestId("btn-sign-out");
  expect(signOutButton).toBeInTheDocument();
});

// Quinton test 1 below
test("bookmark button takes you to My Events page", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };

  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]); //This semicolon (statement cessation character) was added by Jackson Miller.
  render(<App />);
  const bookmarkButton = screen.getByTestId("bookmark-button");
  fireEvent.click(bookmarkButton); // also me
  expect(screen.getByText("My Events")).toBeInTheDocument();
  expect(screen.queryByText("Ooga Booga")).not.toBeInTheDocument();
}); //also me

// Jackson test 1
test("hitting logout (and confirming) returns you to login page", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };

  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]);
  render(<App />);

  expect(screen.getByTestId("btn-sign-out")).toBeInTheDocument();
  const button = screen.getByTestId("btn-sign-out");
  fireEvent.click(button);

  expect(confirmSignOut).toBeCalled();
});

// Jackson test 2
test("single selected filter shows correct events", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };
  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]);
  render(<App />);

  const expandButton = screen.getByTestId("expand-filters");
  fireEvent.click(expandButton);
  const filterOptionButton = screen.getByText("drinks");
  fireEvent.click(filterOptionButton);

  const events = [
    ...document.getElementsByClassName("event_description__GZ17T"),
  ];

  expect(events.every((el) => el.textContent === "A two-person improv show."));
});

// Rutuja Test 2: All events shown when no filters applied

test("Show all events when no filters are applied", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };

  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([mockUser]);

  const [data, loading, error] = useEvents();
  render(<App />);

  const events = [
    ...document.getElementsByClassName("event_description__GZ17T"),
  ];
  expect(events.length === data.events.length);
});

// Yabi test 1 below
test("add button takes you to Add Events modal", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };

  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const addButton = screen.getByTestId("add-button");
  fireEvent.click(addButton);
  expect(screen.getByText("Add Event")).toBeInTheDocument();
});

//Sharat test 1 below
test("clicking close on Add Events page hides modal", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };
  useEvents.mockReturnValue([{ events: [] }, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const addButton = screen.getByTestId("add-button");
  expect(screen.queryByText("Add Event")).not.toBeInTheDocument();
  expect(screen.queryByTestId("add-event-close")).not.toBeInTheDocument();
  fireEvent.click(addButton);
  expect(screen.getByText("Add Event")).toBeInTheDocument();
  const closeButton = screen.getByTestId("add-event-close");
  fireEvent.click(closeButton);
  //expect(screen.queryByTestId('add-event-close')).not.toBeInTheDocument();
});

//Sharat test 2 below
test("events are rendered in chronological order", () => {
  const mockUser = {
    email: "test@u.northwestern.edu",
  };
  useEvents.mockReturnValue([
    {
      events: [
        {
          _id: { $oid: "626751d23ba75c3804b50fd4" },
          title: "Lakefill Campfire",
          location: "Lakefill",
          time: 1651112100,
          description: "Roast marshmallows and meet others on the lakefill",
          pictureUrl:
            "https://admissionblog.northwestern.edu/files/2015/07/Blog-Post-Image-tcwxq1.jpg",
          filters: ["food", "outdoors"],
          rsvp: [],
          __v: { $numberInt: "0" },
        },
        {
          _id: { $oid: "62674d9b3ba75c3804b50130" },
          title: "The Real Skim Shady",
          location: "McCormick Auditorium",
          time: 1651104000,
          description: "A two-person improv show.",
          pictureUrl:
            "https://cdn11.bigcommerce.com/s-q1qpuo8ch5/images/stencil/2048x2048/products/981/507/skimmilkhalf__61068.1554299719.jpg?c=2",
          filters: ["free", "indoors", "entertainment"],
          rsvp: [],
          __v: { $numberInt: "0" },
        },
      ],
    },
    false,
    null,
  ]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const html = document.body.innerHTML;
  const a = html.search("The Real Skim Shady");
  const b = html.search("Lakefill Campfire");
  console.log(html);
  expect(b).toBeGreaterThan(a);
});
