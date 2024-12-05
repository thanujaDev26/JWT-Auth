# JWT-Auth
# Combined Mathematics Backend

This repository contains the backend code for the **Combined Mathematics Learning Platform**, a web application designed to help Advanced Level students access educational resources, submit assignments, and collaborate with peers.

## Features
- **Student Authentication**: Secure login using student ID and mobile verification.
- **Resource Management**: Access tutes, model papers, and past papers for download.
- **Submission System**: Submit assignments for teacher marking.
- **Collaboration**: Chat with peers and exchange notes within the platform.
- **Admin Panel**: Teachers can manage resources, upload video messages, and update content.

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Frontend**: React.js (in a separate repository)

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance or connection string
- Git for version control

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd combined-maths-backend

npm install <br/>
npm start


combined-maths-backend/ <br/>
├── src/ <br/>
│   ├── controllers/      # Request handlers for routes <br/>
│   ├── models/           # MongoDB schemas and models <br/>
│   ├── routes/           # API route definitions <br/>
│   ├── middleware/       # Authentication middleware <br/>
│   ├── utils/            # Utility functions <br/>
├── .env                  # Environment variables <br/>
├── .gitignore            # Files and directories to ignore in Git <br/>
├── package.json          # Project dependencies and scripts <br/>
└── README.md             # Project documentation <br/>

