**The Software “-ilities” You Need To Know**

## 1. Usability(Accessability)
  
- Software usability can be described as how effectively end users can use, learn, or control the system. Some questions to ask yourself to determine usability might be:
- Is there a UI metaphor that I am using to help users adapt? (for example, the ‘desktop’ is a metaphor)
- Are the most common operations streamlined to be performed quickly?
- Can new users quickly adapt to the software without help? (is it intuitive?)
- Do validation and error messages make sense?

## Maintainability (Flexibility/Testibility)

- The definition of maintainability implies how brittle the code is to change. As a result, I tie the terms flexibility and testability into the overall maintainability of a project.
- Does the entire team understand the code base or does knowledge islands exist?
- Is the code throughly regression tested?
- Can modifications to the project be done in a timely manner?

## Scalability

- Scalability is the ability for your program to gracefully meet the demand of stress caused by increased usage. In short, ensuring your program doesn’t slow or bust when pounded by more users than you originally anticipated.
- What is your current peak load that you can handle?
- How many database records can create until critical operations slow down?
- Is the primary scaling strategy to “scale up” or to “scale out” — that is, to upgrade the nodes in a fixed topology, or to add nodes?
  
## Availability (or Reliability)

- How long the system is up and running and the Mean Time Between Failure (MTBF) is known as the availability of a program.
- How long does the system need to run without failure?
- What is the acceptable length of time for the system to be down?
- Can down times be scheduled?
- **Availability, Robustness, Fault Tolerance and Reliability**

## Extensibility

- Are there points in the system where changes can be made with (or without) program changes?
- Can the database schema flex to accommodate change?
- Does the system allow Inversion of Control (IoC)?
- Can end users extend the system (scripts, user defined fields, etc)?
- Can 3rd party developers leverage your system?

## Security

- I shouldn’t need to go into this one but to be thorough I like this definition of security: the measure of system’s ability to resist unauthorized attempts at usage or behavior modification, while still providing service to legitimate users.
- Does the system need user or role based security?
- Does code access security need to occur?
- What operations need to be secured?
- How will users be administered?
- 
## Portability(Platform Compatibility)

- Portability is the ability for your application to run on numerous platforms. This is can include actual application hosting, viewing, or data portability.
- Can the data be migrated to other systems?
- For web applications, which browsers does your web app support?
- Which operating systems does your program run on?

## Performance and Efficiency

- Performance is mostly about response time of the software. This response time should be in acceptable intervals (e.g. max. a few seconds), and should not increase if transaction count increases. And also, resources are expensive. Efficiency must be supported with resource utilization. As an exaggerated example, ability of performing a simple function only by using a 32 processor machine or 1 TB disk space is not acceptable. Optimal source/performance ratio must be aimed. 

## Testability and Managability

- Quality software requires quality testing. Source code should be tested with the most coverage and with the most efficient testing methods. This can be performed by using encapsulation, interfaces, patterns, low coupling etc. techniques correctly. Besides testability, a qualified software should be manageable after deployment. It may be monitored for e.g. performance or data usage status, or may enable developer to configure system easily. Creating a successful logging system is another very important issue about managability.
