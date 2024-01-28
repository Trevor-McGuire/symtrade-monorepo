#   Software Design Document (Backend)

# Table Of Contents

- [1 Supporting Documents](#1-supporting-documents)
- [2 System Overview](#2-system-overview)
- [3 Deployment](#3-deployment)

## 1 Supporting Documents

[Back to TOC](#table-of-contents)

This Backend SDD is supported by the Frontend SDD. The two documents are intended to be read in conjunction with each other, as they provide a comprehensive view of the entire system.

While this document will include:

- Database Design
- Deployment
- External APIs

Ambiguous subjects of the frontend SDD include:

- Introduction
- Development Philosophy

## 2 System Overview

The system is architected based on the client-server model. The backend is built with Node.js and leverages GraphQL for querying and mutating data in MongoDB Atlas. The database is initially populated with core data and is periodically updated with relevant data fetched from various APIs. Additionally, users have the ability to trigger real-time API calls that result in immediate updates to the database.

This overview will cover:
- GraphQL
- API Usage
  - Core seeding runs 
  - Scheduled API calls
  - Real-time API calls
- Database Design
  - Market oriented collections
  - User authentication 
  - User oriented collections

### 2.1 GraphQL

GraphQL is used to allow for flexible querying and mutating of data. It is also a fundamental part of the backend architecture, as it will trigger API calls to fetch data from external sources.

### 2.2 API Usage

The system will use the following APIs to fetch data from external sources:
- Twelve Data API
- Polygon API
- Tiingo API

Calls will be made:
- On Seed
- On a schedule
- In real-time

All calls will be handled using a queue to ensure that the system does not exceed the API call limit.

*Note: The APIs listed above are subject to change.*

#### 2.2.1 Core Seeding Runs

These are API calls that are made in a queue when seeding is triggered. This is necessary due to the limit on API calls per minute. The core seeding runs will fetch data that is necessary for the system to function. This includes:
- Stock Symbols
- Stock Details
- etc.

#### 2.2.2 Scheduled API Calls

These API calls are made on a schedule. The schedule is determined by the periodic release of data from the API. For example, the Twelve Data API releases data on a daily basis. Therefore, the system will make API calls to fetch the data on a daily basis.

Calls will be made on off hours to avoid impacting the performance of the system during peak hours.

#### 2.2.3 Real-Time API Calls

Certain API calls will be made in real-time. This is necessary to ensure users have access to the data relivent to them without having to wait for the next scheduled API call or filling the database with unnecessary data.

### 2.3 Database

The MongoDB Atlas database is a NoSQL database that stores data in JSON-like documents. The database will serve as a cache for data fetched from external APIs. It will also store data that the users create, such as watchlists and portfolios. 

#### 2.3.1 Market Oriented Collections

The system will have collections that are necessary for users to browse and interact with the application. These include:

- Market Symbols
- Market Details
- etc.

#### 2.3.2 User Authentication

User authentication is handled by passport.js. The system will support local authentication, as well as authentication via social media accounts (Google, Facebook, etc.). 

Users will, once registered/logged in, be given a session cookie that will be used to authenticate them for subsequent requests.

#### 2.3.3 User Oriented Collections

The system will have collections that are specific to each user. Users will have a list of collections called the environment collection. The environment collection will contain links to subsequent collections that are specific to the users current environment. 

For example:
User Collection[
  Environment Collection[
    Portfolio Snapshot
    Portfolio Details
    etc.
  ]
]

## 3 System Architecture

*+----------------+    +----------------+    +----------------+
*|    Frontend    |<-->|    Backend     |<-->|    Database    |
*+----------------+    +----------------+    +----------------+
*                              ^
*                              |
*                              v
*                      +----------------+
*                      | External APIs  |
*                      +----------------+

The sytem is focused on supplying the frontend with the data it needs to display the application to the user. This is achieved using resolvers that will query the database and external APIs. Each resolver is designed to query the database first, and if the data is not found, it will query the external API. The data is then stored in the database for future use.



## 4 Deployment

The application will be deployed on Heroku, a cloud platform that offers a streamlined process for deploying, managing, and scaling applications. The deployment process will be initiated by pushing the application code to a Heroku Git repository. Heroku automatically detects the application type (in this case, a Node.js application) and builds the application accordingly.

To automate the deployment process and ensure code quality, we will use GitHub Actions. GitHub Actions is a CI/CD tool that allows us to define a series of commands (actions) that should be executed in response to specific events (triggers), such as pushing code to a repository.

A GitHub Actions workflow will be set up to automatically deploy the application to Heroku whenever changes are pushed to the main branch of the repository. This workflow will also run unit and end-to-end (E2E) tests on the deployed version of the application. This ensures that any changes made to the codebase do not introduce regressions and that the application behaves as expected in a production-like environment.

The workflow will be defined in a YAML file within the .github/workflows directory of the repository. This file will specify the triggers for the workflow, the jobs that should be run (including the steps for deploying the application and running tests), and the environment in which these jobs should be run.
