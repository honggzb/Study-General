## Scrum and Kanban methodologies

```
         Scrum                           |      Kanban
Use for projects, with defined features  | use for support, unpredictable development
```

### Scrum methodology

- break project into Epics and User Stories
    - Epics: larger body of work, broken into stories
    - User Story: or story, smallest unit of work
      - "As a <type of user>, I want <some goal>, so that <some reason>"
- User stories are prioritized
- devlopment is performe in short cycles- Sprints
- Scrum Flow:  ![](https://i.imgur.com/iYv760t.png)
- Scrum Roles
    - Product Owner: 
    - Development Team: builds the product
    - Scrum Master
- Scrum Events
    - Sprint Planning
      - Sprint backlog created from product backlog
      - Dev team provides estimates- story points or hours
    - Dialy Scrum: 15 minutes
      - What I did yesterday
      - what I plan to do today
      - Do I have any blockers?
    - Sprint Review & Retrospective
      - Review:   what was completed/not completed
      - Retrospective: What went well during sprint and what could be improved for next sprint
- Scrum Summary
  - ![](https://i.imgur.com/rXzXexg.png)

### Kanban methodology
  
- Simpler form of agile development
- Define flow of work
- Kanban board
- Limit on WIP(work in progress) items

## Jira Terms

- Issues
- Projects
- Workflow
- Versions
- Components

## Search issues- JQL Query

` project = "ccc" and issuetype= Story and status = "In progress" order by lastViewed DESC`
- swimlanes: `priority=Highest`

## State of affairs

- Burndownchart
  - Graphical representation of work pending vs. time left
  - Are you going to make it?
- Velocity
  - Amount of work per particular sprint
  - Helpful in planning upcoming sprints
  - Dynamic

## JIRA Agile

- JIRA’s way of Agile project management
- Scrum
  - Create and estimate stories, build and prioritize backlog, team commitment, velocity, …
- Based on 3 boards:
  - Planning Board
  - Task Board
  - Chart Board

[Scrum Essentials Exam Prep- William W. Davis](#top)

## Scrum Roles

### Product Owner

- Represents the interests of the stakeholder community to the scrum team. Commonly referred to as the Voice Of the Customer(VOC)
- Ensuring clear communication of product or service functionality requirements to the scrum team. Ensuring that the scrum team delivers value
- Defining Acceptance criteria
- Responsiblilty
  - create project Vision Process
    - Define the project vision
    - Helps create the project Charter and Project Budget
  - Form scrum Team Process
    - Helps determine the scrum Team numbers
    - Develop a collaboration plan with scrum master
  - Create Sprint backlog process
    - Clarifies requirements to the scrum team while creating the sprint backlog
  - Other responsiblities 
    - Determining the project's initial overall requirements and kicking off project activities
    - Representing users of the product or service with a thorough understanding of the user community
    - Securing the inital and ongoing financial resources for the project
    - Focusing on value creation and overall Return On Investment(ROI)
    - Accessing the viability and ensuring the delivery of the product or service
- Chief Product Owner
  - Responsible for coordinating the work of multiple Product Owners
  - Prepares and maintains overall prioritized product backlog for large project

### Scrum Master

- Is the ""servant leader" who moderates and facilitates team interactions as team coach and motivator
- Responsible for ensuring that team has a productive work environment by guarding the team from external influences, removing any obstacles, and enforcing scrum principles, aspects, and processes.
- Responsiblilty
  - Develop Epics process -> Facilitates creation of the epics and personas
  - Create User stories process -> Assist the scrum team in creating user stories and their acceptance criteria
  - Create Deliverables process ->
    - Supports the scrum team in creating the deliverables agreed to for the sprint
    - Helps update the scrumboard and impediment log
- Scrum of scrums meeting in large projects which have multiple scrum teams working in parallel
  - Analogous to the daily standup meeting
  - Facilitated by Chief scrum master 

[back to top](#top)

> Reference
- https://www.famousdavis.com/
