
[Frontend System Design](#top)

- [General](#general)
- [Frontend System Design Components](#frontend-system-design-components)
- [MVVM (Model-View-ViewModel)](#mvvm-model-view-viewmodel)
- [Hierarchical MVC (HMVC)](#hierarchical-mvc-hmvc)
- [MVVM-C (with Coordinator)](#mvvm-c-with-coordinator)
- [VIPER Architecture](#viper-architecture)
- [Clean Architecture](#clean-architecture)
- [Hexagonal Architecture](#hexagonal-architecture)
- [Screaming Architecture](#screaming-architecture)
- [Tools](#tools)
-----------------------------------------------

## General

- Types of System Design
  - Product Design(HLD or Hign-Level Design)
  - Component Design(LLD)
- Types of System Design Interviews
- ![frontend-sys-design00](./images/frontend-sys-design00.png)
- Things to consider In Front end System Design
  - requirements
  - scoping(Prioritization)
  - Tech choices
  - Component Architecture
  - Data API & protocols & Implementation
- ![frontend-sys-design0](./images/frontend-sys-design0.png)
  
## Frontend System Design Components

```
🔸Architectural Patterns Protocol |🔸Communication 
  - Iframe                        |    - REST/GraphQL/inMemory
  - Web components                |🔸Availability
  - Module Federation             |    - offline support: Sevice Worker
  - MicroApps / Route based       |🔸Accessibility
🔸Consistency                     |🔸Credibility & Trust
  - CSS propeties --> Polyfills   |    - SEO
🔸Logging & Monitoring            |🔸Databases/Caching   
  - Error logging, user tracking, |   - HTTP cachings, Apollo caching
  User activity, Feature usuage,  |   statement management(Redux, context)
🔸Infra/capcity monitoring        |   - local storage
🔸Security                        |   - Session storage
  - Authentication/Authorization  |   - Cookie
  - CORS, CSP                     |   - IndexedDB
🔸Performancy & Optimization      |🔸Testing
  - Assets optimization           |   - unit test, Intergration testing, end to end testing
  - Delivery option               |   - Jest, Cypress
  - SSR                           |
  - Service worker                |
```

![Client-Server Architecture](./images/client-server-arch.png)
- **ViewModel** is designed to store user interface data. The problem with MVC/MVP is that they don't distinguish between business and UI data
- The **View** is isolated from the **Model**. The **ViewModel** coordinates with the odal and provides dat to the **View**
- Many **Views** can share a single **ViewModel**; a singel **View** cannot have more than one **ViewModel**
- The **ViewModel** contains all the data ad behavior of the user interface windwo but without any of the controls used to display the user interface on the screen
![3 Tier Architecture](./images/3-tier-arch.png)

## MVVM (Model-View-ViewModel)

- MVVM separats the view logic from business logic
  - Business Logic
    - Change username
    - make a transaction
    - remove an item from the basket
  - View Logic
    - Close/open modal window
    - Disabel button
    - Update download status

![MVVM](./images/MVVM.png)
![MVVM-k](./images/MVVM-k.png)

```
               Pros                                      |                   Cons
---------------------------------------------------------|---------------------------------------------------------
- Layer seperation. Clear separation between UI(View),   | - Stepper learning curve. Harder to understand
business logic(Model), and presentation Logic(ViewModel) |   and develop
- Scalability. Easier to test, maintain and scale        | - Inexpressiveness. MVVM adds space to store presentation
                                                         |   logic but doesn't help us organize other parts of the
                                                         |   application like API requests, etc.
```

[⬆ back to top](#top)

## Hierarchical MVC (HMVC)

[⬆ back to top](#top)

## MVVM-C (with Coordinator)

[⬆ back to top](#top)

## VIPER Architecture

[⬆ back to top](#top)

## Clean Architecture

[⬆ back to top](#top)

## Hexagonal Architecture

[⬆ back to top](#top)

## Screaming Architecture

[⬆ back to top](#top)



## Tools

- Draw.io
- Gliffy.com
- Lucidchart.com
- Miro.com
- One note(Microsoft)
- Jamboard(Google)

> references
- [14 Front End System Design Concepts Explained in 10 Minutes](https://www.youtube.com/watch?v=YO7R0rYWDl8)
- [Frontend System Design: The 2025 Web Performance Roadmap](https://www.youtube.com/watch?v=KUdqbIHn8Ic)
- [Frontend Architecture Patterns You Need to Know in 2025](https://www.youtube.com/watch?v=ixee55xm_d8)x
- [Frontend System Design | Chakde](https://www.youtube.com/playlist?list=PL4CFloQ4GGWICE0Tz6iXKfN3XWkXRlboU)x
- [Frontend System Design Framework-github sample](https://github.com/wasteCleaner/frontend-system-design-framework?)


monolithic
