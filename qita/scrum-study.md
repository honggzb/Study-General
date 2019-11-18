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


- Product Owner
  - Final authority on requirements
  - Prioritize backlog and provide clear requirements
- Team members
  - Cross functional, autonomous, self organizing
  - Project manager, developer, tester, Swiss Army Knife, CTM, TOC
- Scrum master
  - Facilitator, negotiator, responsible for guiding team
  - Removes impediments or finds someone that can

- Product Backlog
  - Feature list User stories
  - Features, bugs, technical work, information, …
  - Not required to be complete at the beginning
  - Prioritized for the…
- Sprint Planning Meeting
  - Committed parties involved
    - Product owner, team members
  - Other parties can attend as listeners
  - PO describes highest priorities
  - Detailed tasks created and assigned
  - Objectives:
    - Sprint goal
    - Sprint backlog
  - Looking ahead recommended
- Daily Scrum
  - Moderated by scrum master
  - 15 min, time boxed, usually in the morning/same location
  - Every attendee
    - What did you do yesterday?
    - What will you do today?
    - Is there any impediment on your way?
  - Scrum master helps remove impediments
    - Or find someone who will
  - State of affairs
- Burndownchart
  - Graphical representation of work pending vs. time left
  - Are you going to make it?
- Velocity
  - Amount of work per particular sprint
  - Helpful in planning upcoming sprints
  - Dynamic
- Sprint Retrospective
  - Objective: determine ways to improve at end of sprint
  - Suggestion: (What should we…)
    - Start doing?
    - Stop doing?
    - Continue doing?
  - Prioritize
  - Work on improving
- Sprint Review
  - Goal: Ship Ready State!
    - Scrum  Deliver Potentially Shippable Product
  - Hold a meeting to present the outcome
  - Typically a demo
  - Assessed towards the sprint goal

- JIRA Agile

- JIRA’s way of Agile project management
- Scrum
  - Create and estimate stories, build and prioritize backlog, team commitment, velocity, …
- Based on 3 boards:
  - Planning Board
  - Task Board
  - Chart Board
