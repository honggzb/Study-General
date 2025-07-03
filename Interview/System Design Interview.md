[System Design Interview Preparation](#top)

- [Front End system design - Autocomplete or Typeahead](#front-end-system-design---autocomplete-or-typeahead)
- [Well-designed HTML forms](#well-designed-html-forms)
- [Design Parking Garage](#design-parking-garage)
- [Design Amazon Prime Video](#design-amazon-prime-video)
- [Design a Hotel Booking Service](#design-a-hotel-booking-service)
- [online book store](#online-book-store)

----------------------------------------------------------------
- Scalable, reliable, cost optimal, performance
- Requirements clarification
- ![5WH分析法](./images/5WH分析法.png)

|Users/Customers|Scale(read and write)|performance|cost|
|---|---|---|---|
|who will use the system|How many read queries per second|What is expected write-to-read data delay|should the design minimize the cost of development|
|how the system will be used|How much data is queried per request|what is expected p00 latency for read queries|should design minimize the cost of maintenance|
||How many video views are processed per second|||
||Can there spikes in traffic|||

![Front End system design](./images/FrontEndsystemdesign.png)

[⬆ back to top](#top)

## Front End system design - Autocomplete or Typeahead

- Clarify the question
  - what is the goal of this feature?
  - Do I need to build just he autocomplete feature or the entire search bar with filters?
  - Should we consider typing errors while search
- General Plan
  - Functional requirements
  - Non functional requirements
  - component architecture
  - Props & events
  - performance
  - Accessiblity
- Functional requirements
  - show suggestions on user input
  - debounce when user stops typing
  - search results should be customisable
  - supports both static data and data coming from an API
- Non functional requirements
  - Network efficient
  - should be configurable
    - cache size
    - minumum search query length
    - search results
  - performance
  - Generic enough to support different platforms
  - Accessibility
  - browser support
  - cross devices(desktop, mobile, tablet)

| Functional requirement | Non functional requirements |
|---|---|
|show suggestions on user input |network efficient|
|debounce when user stop typing|should be configurable- cache size, minumum search query length, search results|
|search results should be customisable|performance|
|supports both static data and data coming from api|generic to support different platforms<br>browser support<br>cross devices(desktop, mobile, tablet)|
||accessibility|

![Aautocompletesample](./images/autocompletesample.png)

[⬆ back to top](#top)

## Well-designed HTML forms

1. Well-structured and semantically correct.
2. Easy to use and navigate (keyboard).
3. Accessible with ARIA attributes and proper labels.
4. Has support for client and server side validation.
6. Well-styled and consistent with the rest of the application.

[⬆ back to top](#top)

## Design Parking Garage

![Parking Garage](./images/Parking-Garage.png)
![Parking-Garage1](./images/Parking-Garage1.png)
![Parking-Garage2](./images/Parking-Garage2.png)

## Design Amazon Prime Video

- scope
  - list functional requirement or non=functional requirement 
![Amazon Prime Video](./images/Amazon-Prime-Video.png) 

## Design a Hotel Booking Service

![Hotel Booking Service](./images/Hotel-Booking-Service.png)

## online book store 

- what：做什么？
- when：完成时间？
- how：如何完成？

### What

- ask
  - scale: 
  - performance
  - whether it needs an API
- online book store 
  - Ebooks or Regular books
  - how many users: 6M users
  - transactions:   500 per second(TPS)

[⬆ back to top](#top)
