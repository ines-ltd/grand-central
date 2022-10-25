# Grand Central

It is a system whereby customers can make requests for collateral from the data team (reports, etc). The request, when accepted, results in a project, which the system also manages by decomposing the project into increments and timeboxes.

## Entity Relationships

```mermaid
erDiagram

  EVENT {
    string time
    string area
    number level
  }

  UPDATE {
    datetime schedule
    string type
  }

  REQUEST {
    string name
    string desc
    string prog
    string category
    string rationale
    string audience
    string urgency
    string status
  }

  USER {
    string firstName
    string lastName
    string email
    string ouc
  }

  PROJECT {
    string holdReason
    string status
    boolean quickWin
    string name
    number priorityScore
    string platform
    bin wireframe
    string moscow
    string userStory
    boolean wireframeSkip
    boolean moscowSkip
    boolean userStorySkip
    datetime ecd
    string milestone
    number incrementCount
    number timeboxPerIncrement
    datetime timeboxLength
  }

  CUSTOMER

  ENGINEER

  TASK {
    string name
    string rollbackReason
    string status
    datetime opened
    datetime closed
  }

  COMMENT {
    string content
    datetime created
  }

  ATTACHMENT {
    bin content
  }

  INCREMENT {
    string description
    datetime ecd
  }

  TIMEBOX {
    string description
    datetime ecd
    datetie length
  }

  UPDATE }o--|| REQUEST : updates

  CUSTOMER ||--|| USER : is

  ENGINEER ||--|| USER : is

  ENGINEER ||--o{ COMMENT : makes

  COMMENT ||--|| TASK : about

  COMMENT ||--|| PROJECT : about

  COMMENT ||--|| INCREMENT : about

  COMMENT ||--|| TIMEBOX : about

  CUSTOMER }|--|{ REQUEST : creates

  ENGINEER ||--o{ TASK : owns

  ENGINEER }o--o{ TASK : delegated

  CUSTOMER }|--|{ UPDATE : subscribes

  USER ||--|| USER : manages

  REQUEST ||--|| EVENT : creates

  REQUEST }|--o{ PROJECT : associates

  PROJECT ||--o{ TASK : has

  TASK ||--o{ ATTACHMENT : has

  PROJECT ||--o{ INCREMENT : has
  
  INCREMENT ||--o{ TIMEBOX : has
```

## Sequence Diagrams

### Project creation

```mermaid
sequenceDiagram
  actor CUSTOMER
  participant REQUEST
  actor ENGINEER
  CUSTOMER ->> REQUEST : creates
  REQUEST ->> ENGINEER : receives
  alt denied
    ENGINEER -->> REQUEST : denies
    REQUEST -->> CUSTOMER : updates
  else approved
    ENGINEER -->> REQUEST : approves
    REQUEST -->> CUSTOMER : updates
    ENGINEER ->> PROJECT : creates
    activate PROJECT
    Note right of PROJECT : Project split into increments
    loop execution
      PROJECT ->> ENGINEER : delegates task
      activate ENGINEER
      ENGINEER -->> CUSTOMER : updates
      ENGINEER -->> PROJECT : completes task
      deactivate ENGINEER
    end
    PROJECT ->> ENGINEER : completed
    ENGINEER ->> CUSTOMER : delivers project
    deactivate PROJECT
  end
```

## Flow diagram

```mermaid
flowchart TD
  Customer[Customer submits request] -->Review{Review}
  Review --> Rejected
  Review --More info required--> Customer
  Review --Approved--> n1[Project created]
  n1 --> n2[Define requirements]
  n2 --> n3{Quick win?}
  n3 --Yes-->DevMgr
  n3 --No--> n4[Complete user stories]
  n4 --> n5[Complete wireframe]
  n5 --> n6[Complete PRL]
  n6 --> DevMgr{Dev mgr review}
  DevMgr --More info required--> n2
  DevMgr --Allocated-->Dev{Dev review}
  Dev --More info required--> n2
  Dev --Accepted--> n7{Quick win?}
  n7 --Yes--> Developed[Project developed]
  n7 --No --> n8[PRL plan & \n increment/timebox]
  n8 --> Developed
  Developed --> n9{Quick win?}
  n9 --Yes--> BA{Business analyst \n sign off}
  n9 --No--> PR{Peer Review}
  PR --Further development--> Dev
  PR --Sign off-->DevMgr2{Dev Mgr \n Sign Off}
  DevMgr2 --Further Development Required--> Dev
  DevMgr2 --Sign off--> BA
  BA --Further Development Required--> Dev
  BA --Sign off--> Customer2{Customer \n sign off}
  Customer2 --Further Development Required--> Dev
  Customer2 --Sign off-->last{{Project Completed}}
```
