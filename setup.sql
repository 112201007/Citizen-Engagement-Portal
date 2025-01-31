CREATE TABLE Users (
    User_ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(15),
    Role VARCHAR(50) NOT NULL
);

CREATE TABLE Civic_Issues (
    Issue_ID SERIAL PRIMARY KEY,
    User_ID INT REFERENCES Users(User_ID),
    Issue_Type VARCHAR(100) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Status VARCHAR(50) DEFAULT 'Reported',
    Reported_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Priority_Score INT
);

CREATE TABLE AI_Analysis (
    Analysis_ID SERIAL PRIMARY KEY,
    Issue_ID INT REFERENCES Civic_Issues(Issue_ID),
    Urgency_Score INT,
    Impact_Score INT,
    Suggested_Priority VARCHAR(50),
    Processed_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Issue_Updates (
    Update_ID SERIAL PRIMARY KEY,
    Issue_ID INT REFERENCES Civic_Issues(Issue_ID),
    Admin_ID INT REFERENCES Users(User_ID),
    Update_Text TEXT,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Workers (
    Worker_ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Phone VARCHAR(15),
    Availability VARCHAR(50) DEFAULT 'Available'
);

CREATE TABLE Task_Assignments (
    Assignment_ID SERIAL PRIMARY KEY,
    Issue_ID INT REFERENCES Civic_Issues(Issue_ID),
    Worker_ID INT REFERENCES Workers(Worker_ID),
    Assigned_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Completed_At TIMESTAMP,
    Status VARCHAR(50) DEFAULT 'Assigned'
);