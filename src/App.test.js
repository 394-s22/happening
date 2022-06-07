import { render, screen, fireEvent, getAllByAltText } from '@testing-library/react';
import { useUserState, confirmSignOut }from './utils/firebase';
import { useEvents, useUserRsvpEvents } from "./utils/api"
import '@testing-library/jest-dom';
import App from './App';

const eventsArray = [{"_id":{"$oid":"62674ace3ba75c3804b4f8e8"},"title":"Refresh Presents: The Universe","location":"Ryan Auditorium","time":{"$numberInt":"1656816897"},"description":"3 years after our last in-person spring show, Refresh Dance Crew is so excited to present its SIXTH annual spring show: THE UNIVERSE. Our team has continued to grow to an astronomical size and have worked so hard (while staying safe!) to perform choreography and freestyle sets that are out of this world. 🪐 WHEN & WHERE 🪐 April 29th / 9PM April 30th / 7PM & 10PM @ Tech Ryan Auditorium ☄️ TICKETS ☄️ $5 Wildcard / $7 Without LINK COMING SOON Tickets will NOT be available for purchase at door Stay tuned for more details and sneakpeeks to come... ","pictureUrl":"https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/278958501_659882258721394_4538617596824949587_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=340051&_nc_ohc=ne8MEWHI4n8AX96YWpl&_nc_ht=scontent-ort2-1.xx&oh=00_AT9cgxVMFK_EG3mH95qwnIkl18ZgdAue0f-X7JPAi25jDg&oe=626C34B5","filters":["nightlife","entertainment"],"rsvp":[{"$oid":"625ce82551e874af4900d675"}],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"62674b9b3ba75c3804b4fad1"},"title":"NU Nights Board Games and Breakfast","location":"Norris Louis Room","time":{"$numberInt":"1651280400"},"description":"Come to Norris Louis Room on Friday 4/29 at 8 pm for our free Board Games🎲 & Breakfast🍞 event! And you'll get to play a new game called What's In the Bank? Hope to see you there!","pictureUrl":"https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/279005561_4907007422760449_5105125457120639817_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=340051&_nc_ohc=l_SkgKAcqokAX9SCpcI&_nc_ht=scontent-ort2-1.xx&oh=00_AT-MZ5wDQQXNZYBMXgM6NtL0R-05SwQdr6QiIzMIOh0ZMA&oe=626CC12D","filters":["food","free","indoors"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"62674c463ba75c3804b4fd2c"},"title":"Wildcat Wednesday (I Heart Northwestern Week)","location":"Norris Center","time":{"$numberInt":"1656816897"},"description":"Details: Northwestern Pride Day Locations: Norris Students will share their I Heart Northwestern story on their very own \"I 💜 NU\" t-shirt. There will be free swag items as well!","pictureUrl":"https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/275443660_1296058134248490_3600134666934102629_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=340051&_nc_ohc=Y3LYq99l4RsAX9ZNG5E&_nc_ht=scontent-ort2-1.xx&oh=00_AT_COskW0nGyT74tX9hmmRlVXzahw866KrYpNxJxbGJYuA&oe=626B872C","filters":["food","free","indoors"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"62674d523ba75c3804b50021"},"title":"Fanny Pack Friday (I Heart Northwestern Week)","location":"Norris Center","time":{"$numberInt":"1651248000"},"description":"Get ready for Dillo Day and festival season! Swing by our locations (TBD) to get your fanny pack and other I Heart Northwestern Week Swag!","pictureUrl":"https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/275508455_1296058537581783_5794382726628208897_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=340051&_nc_ohc=4t-OzzyoetAAX_e_Taa&_nc_ht=scontent-ort2-1.xx&oh=00_AT9B0m6ln3aaQ83jTzrkEj9WsrbSLOPlS7aJ-EcQTLPEcg&oe=626D107B","filters":["food","free","indoors"],"rsvp":[{"$oid":"625ce82551e874af4900d675"}],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"62674d813ba75c3804b500cd"},"title":"Thank You Thursday (I Heart Northwestern Week)","location":"Norris Center","time":{"$numberInt":"1651161600"},"description":"Now's your chance to thank the donors who have helped make Northwestern what it is. Stop by to sign postcards thanking alumni who have supported Northwestern to earn swag.","pictureUrl":"https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/275457548_1296058330915137_4448429499162763676_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=340051&_nc_ohc=Lel-Ea9ZMncAX9aHJMC&_nc_ht=scontent-ort2-1.xx&oh=00_AT-iKC0Xh66nYc3AqIykaF8LWR7hWA7x9X9ewn3oAWDpsg&oe=626D0398","filters":["food","free","indoors"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"62674d9b3ba75c3804b50130"},"title":"The Real Skim Shady","location":"McCormick Auditorium","time":{"$numberInt":"1651104000"},"description":"A two-person improv show.","pictureUrl":"https://cdn11.bigcommerce.com/s-q1qpuo8ch5/images/stencil/2048x2048/products/981/507/skimmilkhalf__61068.1554299719.jpg?c=2","filters":["free","indoors","entertainment"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"62674ebe3ba75c3804b504c9"},"title":"Civ V Club Initial Interest Meeting","location":"University Hall 307","time":{"$numberInt":"1651438800"},"description":"Come play the classic 4E video game Sid Meier's Civilization V!","pictureUrl":"https://upload.wikimedia.org/wikipedia/en/5/5c/CIVILIZATION-V-FRONT-OF-BOX.jpg","filters":["free","indoors"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"62674fd33ba75c3804b50853"},"title":"Board Game Night","location":"1740 Evanston Ave","time":{"$numberInt":"1651374000"},"description":"Play board games and have some food","pictureUrl":"https://img1.ak.crunchyroll.com/i/spire2/53c374ae341950be54dd5b96a3e8fea31319798223_large.jpg", "filters":["food", "free", "indoors"], "rsvp":[{"$oid":"625cdf79c6f72fa245286127"}, {"$oid":"625ce82551e874af4900d675"}, {"$oid":"625f945f64c6b5bae371a8bc"}, {"$oid":"625cec37e9f323acb116ff6f"}],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"626750e03ba75c3804b50cea"},"title":"Block Party","location":"1340 Oak","time":{"$numberInt":"1651291200"},"description":"HOUSE PARTY","pictureUrl":"https://img.static-kl.com/images/media/E95E1F32-A7A4-4FC0-AC0A41A2BC528AE3?aspect_ratio=1:1&min_width=912","filters":["drinks","outdoors","nightlife","entertainment","music"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"626751873ba75c3804b50eef"},"title":"NU Student Chamber Music Concert","location":"Galvin Hall","time":{"$numberInt":"1651191300"},"description":"Hear music by NU student chamber groups","pictureUrl":"https://static01.nyt.com/images/2021/10/21/arts/20chamber-1/20chamber-1-videoSixteenByNineJumbo1600.jpg","filters":["free","indoors","entertainment","music"],"rsvp":[{"$oid":"625ce82551e874af4900d675"},{"$oid":"625cdf79c6f72fa245286127"}],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"626751d23ba75c3804b50fd4"},"title":"Lakefill Campfire","location":"Lakefill","time":{"$numberInt":"1651112100"},"description":"Roast marshmallows and meet others on the lakefill","pictureUrl":"https://admissionblog.northwestern.edu/files/2015/07/Blog-Post-Image-tcwxq1.jpg","filters":["food","outdoors"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"6267523f3ba75c3804b51120"},"title":"Longboarder Meetup","location":"Lakefill","time":{"$numberInt":"1651270500"},"description":"Come and join the sk8 gang","pictureUrl":"https://coresites-cdn-adm.imgix.net/mpora_new/wp-content/uploads/2015/09/Penny-Skateboards-Longboard-680x450.jpg","filters":["active","outdoors"],"rsvp":[],"__v":{"$numberInt":"0"}},
{"_id":{"$oid":"6267525d3ba75c3804b51197"},"title":"NU Skate Club Meetup","location":"Lakefill","time":{"$numberInt":"1651950000"},"description":"Come skate with us!","pictureUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQ2XEdBsKp66qSD2h9yAxsTy7oA8K37rQKA&usqp=CAU","filters":["active","outdoors"],"rsvp":[],"__v":{"$numberInt":"0"}}
]

jest.mock('./utils/firebase');
jest.mock('./utils/api');

test('page loads', () => {
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const headerElement = screen.getByText(/Happened/i);
  expect(headerElement).toBeInTheDocument();
});

test('non authenticated user', () => {
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([null]);
  render(<App />);
  const signInButton = screen.getByTestId("btn-sign-in");
  expect(signInButton).toBeInTheDocument();
});

test('authenticated user sees something different', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const signOutButton = screen.getByTestId('btn-sign-out');
  expect(signOutButton).toBeInTheDocument();
});


// Quinton test 1 below
test('bookmark button takes you to My Events page', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]); //This semicolon (statement cessation character) was added by Jackson Miller.
  render(<App />);
  const bookmarkButton = screen.getByTestId('bookmark-button');
  fireEvent.click(bookmarkButton); // also me
  expect(screen.getByText('My Events')).toBeInTheDocument();
  expect(screen.queryByText('Ooga Booga')).not.toBeInTheDocument();
}); //also me

// Jackson test 1
test('hitting logout (and confirming) returns you to login page', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };


  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]);
  render(<App />);

  expect(screen.getByTestId("btn-sign-out")).toBeInTheDocument();
  const button = screen.getByTestId("btn-sign-out");
  fireEvent.click(button);

  expect(confirmSignOut).toBeCalled();
  
});

// Jackson test 2
test('single selected filter shows correct events', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  
  useEvents.mockReturnValue([{events: eventsArray}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]);
  render(<App />);

  const expandButton = screen.getByTestId('expand-filters');
  fireEvent.click(expandButton);
  const filterOptionButton = screen.getByText("drinks");
  fireEvent.click(filterOptionButton);
  

  const events = screen.getAllByTestId('event-test');
  expect(events.every((el) => el.textContent === 'Block Party')).toBeTruthy();
});

// Rutuja Test 2: All events shown when no filters applied

test('Show all events when no filters are applied', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };
  useEvents.mockReturnValue([{events: eventsArray}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  useUserRsvpEvents.mockReturnValue([[], false, null]);
  render(<App />);

  const events = screen.getAllByTestId('event-test');
  console.log(events)
  
  expect(events.length === eventsArray.length).toBeTruthy();


});

// Yabi test 1 below
test('add button takes you to Add Events modal', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };

  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const addButton = screen.getByTestId('add-button');
  fireEvent.click(addButton); 
  expect(screen.getByText('Add Event')).toBeInTheDocument();
}); 

//Sharat test 1 below
test('clicking close on Add Events page hides modal', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };
  useEvents.mockReturnValue([{events: []}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const addButton = screen.getByTestId('add-button');
  expect(screen.queryByText('Add Event')).not.toBeInTheDocument();
  expect(screen.queryByTestId('add-event-close')).not.toBeInTheDocument();
  fireEvent.click(addButton);
  expect(screen.getByText('Add Event')).toBeInTheDocument();
  const closeButton = screen.getByTestId('add-event-close');
  fireEvent.click(closeButton);
  //expect(screen.queryByTestId('add-event-close')).not.toBeInTheDocument();
});

//Sharat test 2 below 
test('events are rendered in chronological order', () => {
  const mockUser = {
    email: 'test@u.northwestern.edu'
  };
  useEvents.mockReturnValue([{events: [{"_id":{"$oid":"626751d23ba75c3804b50fd4"},"title":"Lakefill Campfire","location":"Lakefill","time":1651112100, "description":"Roast marshmallows and meet others on the lakefill","pictureUrl":"https://admissionblog.northwestern.edu/files/2015/07/Blog-Post-Image-tcwxq1.jpg","filters":["food","outdoors"],"rsvp":[],"__v":{"$numberInt":"0"}}, {"_id":{"$oid":"62674d9b3ba75c3804b50130"},"title":"The Real Skim Shady","location":"McCormick Auditorium","time":1651104000,"description":"A two-person improv show.","pictureUrl":"https://cdn11.bigcommerce.com/s-q1qpuo8ch5/images/stencil/2048x2048/products/981/507/skimmilkhalf__61068.1554299719.jpg?c=2","filters":["free","indoors","entertainment"],"rsvp":[],"__v":{"$numberInt":"0"}}]}, false, null]);
  useUserState.mockReturnValue([mockUser]);
  render(<App />);
  const html = document.body.innerHTML;
  const a = html.search("The Real Skim Shady");
  const b = html.search("Lakefill Campfire");
  //console.log(html)
  expect(b).toBeGreaterThan(a);
})