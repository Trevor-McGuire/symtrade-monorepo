# Software Design Document (Frontend)

# Table Of Contents

- [1 Introduction](#1-introduction)
- [2 System Overview](#2-system-overview)
- [3 Component Design](#3-component-design)
- [4 Component Design (Dashboard Layout)](#4-component-design-(dashboard-layout))
- [5 Data Design](#5-data-design)

## 1 Introduction

### 1.1 Purpose

This document provides a comprehensive architectural overview of the system, using a number of different architectural views to depict different aspects of the system. It is intended to capture and convey the significant architectural decisions which have been made on the system.

### 1.2 Scope

This SDD outlines the foundational system intended to serve as a proof of concept, demonstrating the potential for the development and implementation of a more advanced design in subsequent stages.

### 1.3 Working Title

SymTrade. The name suggests a focus on trading of financial instruments, such as stocks, which are often identified by ticker symbols.

### 1.4 Supporting Documents

This frontend SDD is supported by the backend SDD, which provides a detailed overview of the server-side architecture and design. The two documents are intended to be read in conjunction with each other, as they provide a comprehensive view of the entire system.

Ambiguous subjects of the backend SDD include:

- Database Design
- Deployment
- External APIs

While this document will include:

- Introduction
- Development Philosophy

## 2 System Overview

The frontend is built using React. In addition to React, the Mantine UI library will be used to design the user interface. The frontend will communicate with the server-side of the application through GraphQL.

This section will cover:
- Component Overview
- Testing and Development Philosophy

### 2.1 Component Overview

The system is designed with:

- Layout Components: Single view pages
- Page Components: Viewable inside/outside Dashboard Layout
- View Components: Viewable inside Dashboard Layout
- Element Components: Reusable UI elements

#### 2.1.1 Layouts Components

- Home Layout: Main page of the application
- Register Layout: For new users to create an account
- Login Layout: For existing users to log in
- Dashboard Layout: Where users can view their trading environment and perform various trading activities

#### 2.1.2 Pages Components

- About Page: Information about the application
- Terms Page: Providing the terms of service (note: also accessible from the register page in the form of a modal)
- Contact Page: Contact information

#### 2.1.3 View Components

- Environment View: For users to view and manage their trading environment.
- Dashboard View: For users to view a snapshot of their portfolio, stocks, watchlist, and news
- Portfolio View: For users to view a detailed view of their portfolio
- Market View: For users to view a list of stocks and add them to their watchlist or portfolio
- News View: For users to view a list of news articles related to their portfolio and watchlist
- Profile View: For users to view and update their account settings

#### 2.1.4 Element Components

- Header Element: At the top of every page, providing breadcrumbs, logo, sign in/out/up, and settings.
- Footer Element: At the bottom of every page, providing links to social media, about, terms, and contact.
- Navigation Element: In the Dashboard Layout, providing links to pages, views, controls.
- BLS Element: Appears on pages when !LoggedIn giving navigation to users without a Navigation element. (Back/Loggin/Signup)
- Terms Element: Appears on the Register Layout, providing the terms of service in a modal. When clicked a modal will appear with the terms of service and options to accept or deny.
- Controls Elements: Simple buttons, toggles, and inputs that are used to interact with the application and perform a simple task/query
  - Logout Control: Logs the user out of the application
- Ticker Details Modal: A modal that appears when a user selects a stock from the Market View. The modal will display the details of the stock and provide options to add the stock to the user's watchlist or portfolio.

### 2.2 Testing and Development Philosophy

_Note: This section is not included in the backend SDD. Backend testing and development will closely follow the frontend testing and development philosophy._

The philosophis used:

- Test-Driven Development (TDD)
- Continuous Integration (CI)
- Iterative and Incremental Development

#### 2.2.1 Test-Driven Development (TDD)

Both the server and client will have isolated testing environment where responses from the other side are mocked.

Frontend, this involves using:

- Jest: A JavaScript testing framework
- React Testing Library: A library for testing React components
- graphql-tools: A library for mocking GraphQL responses

Backend, this involves using:

- Jest: A JavaScript testing framework
- Supertest: A library for testing HTTP requests

In addition to unit tests, integration tests will be used to test the interaction between the server and client. This will be accomplished by using Cypress, an end-to-end testing framework.

#### 2.2.2 Continuous Integration (CI)

Our CI strategy revolves around maintaining a high degree of code quality and ensuring that changes integrate smoothly into the existing codebase. Developers will push their changes frequently, ideally multiple times a day, to the main repository. This frequent integration allows us to detect and address integration issues as early as possible, reducing the risk of complex merge conflicts and bugs in the future.

Upon each push to the repository, an automated process will be triggered. This process includes building the application and running all unit and integration tests. This ensures that every change is validated against the existing codebase and that it doesn't introduce any breaking changes. If the build or tests fail, the team will be notified immediately, allowing for quick remediation of any issues.

This CI strategy will help us maintain a robust, high-quality codebase, and ensure that our application is always in a releasable state. It will also help us to identify and address issues early and efficiently, leading to more stable releases and fewer bugs in the production environment.

#### 2.2.3 Iterative and Incremental Development

In the Incremental development part, each iteration will produce a usable version of the product, albeit a simple one in the early stages. With each subsequent iteration, new features are added, which results in increasingly complete versions of the software. This allows us to deliver value to our users quickly and receive feedback early in the development process.

## 3 Component Design

In the Component Design section of our Software Design Document, we delve into the architecture of our system at a granular level. Each component in our system encapsulates a specific functionality and is designed to interact seamlessly with other components. This section provides a detailed description of each component's:

- Contained functionality: What the component does and a snapshot of the user interface
- Components rendered: What is visible to the user and what options determine the component configuration
- Components linked: Where users can navigate to from the current component
- Data management: What is sent and received from the server
- Special notes: Any additional information about the component

_note: The Dashboard Layout Component Design is not included in this section as it is a complex component with many sub-components and interactions. It will be discussed in the next section,_

### 3.1 Home Layout

Contained functionality:

- Application overview
- Call to action to register or log in

Components Rendered:

- Header Element (options: register, login)
- Footer Element (this static component is always visible and will no longer be mentioned in the following sections)

Components linked:

- Register Layout
- Login Layout
- About Page
- Contact Page
- Terms Page

Special Notes:

- Only accessible to users who are not logged in.

### 3.2 Register Layout

Contained functionality:

- OAuth 2.0 registration (terms validated by OAuth provider)
- Email and password registration (with Terms link/checkbox)
- Toggle to login

Components Rendered:

- Header Element (options: home, login)

Components linked:

- Login Layout

Data management:

a. Email and password => Server => Authentication Headers

b. OAuth 2.0 => Server => Authentication Headers

Special Notes:

- Only accessible to users who are not logged in.

### 3.3 Login Layout

Contained functionality:

- OAuth 2.0 login
- Email and password login
- Toggle to register

Components Rendered:

- Header Element (options: home, register)

Components linked:

- Register Layout

Data management:

a. Email and password => Server => Authentication Headers

b. OAuth 2.0 => Server => Authentication Headers

Special Notes:

- Only accessible to users who are not logged in.

### 3.4 About Page

Contained functionality:

- Application details

Components Rendered:

- Header Element (options: home, login, register)
- !Loggedin: BLS Element

### 3.5 Contact Page

Contained functionality:

- Contact details

Components Rendered:

- Header Element (options: home, login, register)
- !Loggedin: BLS Element

### 3.6 Terms Page

Contained functionality:

- Terms of service

Components Rendered:

- Header Element (options: home, login, register)
- !Loggedin: BLS Element

## 4 Component Design (Dashboard Layout)

The Dashboard Layout consists of a Navigation Element, Display Box, Header/Footer Elements.

### 4.1 Navigation Element

The Navigation component is a complex component that appears in the Dashboard Layout, providing links to pages, views, and controls. The pages are also accessible while dashboard and controls are determined by the users current state in the application.

The component consists of navTabGroups:

- Title Tab: Current environment
- Environment Tab: Link to the Environment View
- View Tab: List of links to:
  - Dashboard View
  - Portfolio View
  - Market View
  - News View
- Pages Tab: List of links to:
  - About Page
  - Terms Page
  - Contact Page
- Account Tab: a link to the profile page
  - Profile View
  - Logout Control

#### 4.1.1 Title Tab

When selecting an environment for the first time, the title tab will be non-existent. The title tab will be set to the name of the environment when the user selects an environment. When A user selects a different environment, the title tab will be updated to the new environment name upon selection.

#### 4.1.2 Environment Tab

The Environment Tab will be visible at all times. Users logging in for the first time will be redirected to the Environment dashpage with the Env Tab displaying "Select Environment". When the user selects the Environment tab, the user will be redirected to the Environment dashpage and the title of the tab will be "Select Environment". When the user selects an environment, the title of the tab will be updated to "Change Environment".

#### 4.1.3 View Tab

View tab will not be visible until the user selects an environment. When the user selects an environment, the View Tab will be visible. The user will be redirected to the Dashboard View upon selection of an environment.

#### 4.1.4 Pages Tab

Pages tab will be visible at all times. The user will be redirected to the page selected

#### 4.1.5 Account Tab

Account tab will be visible at all times. The user will be redirected to the Profile View upon selection and logged out upon selection.

### 4.2 Display Box

This component exists for the purpose of rendering Pages, Views, and Controls. The component will be updated upon logging in and selections from the Navigation Tab Groups.

Renders:

- Environment View
- Dashboard View
- Portfolio View
- Market View
- News View
- Profile View
- Terms Page
- Contact Page
- About Page

#### 4.2.1 Environment View

A table of the user's environments. Displays:

- Environment Name
- Days Simulated
- Performance
- Controls:
  - Select Environment (entire row)
  - Create Environment (Button on top of table)
  - Delete Environment

When a new Environment is selected, the user will be asked to fill out the environment inputs modal with:

- Environment Name
- Starting Cash
- Starting Date

When deleting an environment, the user will be asked to confirm the deletion of the environment.

When selecting an environment, the user will be redirected to the Dashboard View.

#### 4.2.2 Dashboard View

From here users will have access to all the View Tabs.

A snapshot of the user's portfolio, stocks, watchlist, and news. Displays:

- Portfolio Snapshot
- Stocks Snapshot
- Watchlist Snapshot
- News Snapshot

#### 4.2.3 Portfolio View

A detailed view of the user's portfolio. Displays:

- Cash
- Value in different markets
- Performance

#### 4.2.4 Market View

Displays:

- List of stocks with filters and search
- Add to Watchlist
- Buy

#### 4.2.5 News View

Displays:

- List of news articles related to the user's portfolio and watchlist
- Filterable and searchable list of all news articles

#### 4.2.6 Profile View

Displays:

- email
- option to change email
- option to change password

## 5 Data Design

_note: The data design is an outline of the data sent and received from the frontend perspective. This is not a description of the database schema or the server-side data design._

### 5.1 Data Flow

Types of responses:

- Auth Headers: Authentication Headers used to control the session
- Snapshots/Details: Shortform and longform Data from the users environment
- Confirmation: Confirmation of a successful mutation

| User Action       | Type of response from server                        |
| ----------------- | --------------------------------------------------- |
| Registration Data | Authentication Headers                              |
| Login data        | Authentication Headers && Environment View Snapshot |
| Logout            | Confirmation                                        |
| Change Email      | Confirmation                                        |
| Change Password   | Confirmation                                        |
| Delete Account    | Confirmation                                        |

| Environment Action         | Type of response from server |
| -------------------------- | ---------------------------- |
| Environment Selection      | dashboard view Snapshot      |
| Environment Creation       | Confirmation                 |
| Environment Update         | Confirmation                 |
| Environment Deletion       | Confirmation                 |
| Environment View Selection | Environment View Snapshot    |

| Dashboard Action         | Type of response from server           |
| ------------------------ | -------------------------------------- |
| Dashboard View Selection | Dashboard View Snapshot                |
| Portfolio View Selection | Portfolio View Snapshot                |
| Market View Selection    | Market View Details && Ticker Snapshot |
| News View Selection      | News View Details                      |

| Market Action         | Type of response from server |
| --------------------- | ---------------------------- |
| Market Filter         | Ticker Filter Details        |
| Ticker Details        | Ticker Details               |
| Add to Watchlist      | Confirmation                 |
| Remove from Watchlist | Confirmation                 |
| Buy Stock             | Confirmation                 |
| Sell Stock            | Confirmation                 |

| News Action     | Type of response from server |
| --------------- | ---------------------------- |
| News Filter     | News Filter Details          |
| News Details    | News Details                 |
| Favorite News   | Confirmation                 |
| Unfavorite News | Confirmation                 |
| Mark as Read    | Confirmation                 |
| Mark as Unread  | Confirmation                 |

### 5.2 Data Design Mocking

The data design will be mocked using graphql-tools. The mock data will be used to test the frontend components and ensure that they are functioning as expected.
