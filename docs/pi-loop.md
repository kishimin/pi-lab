# Functional Requirements Specification

## 1. Required Features (MVP)

### 1.1 Pi Message

- Message Input
  - Users can enter any message
  - Limit the number of characters
  - Validate user input

- Pi Conversion Display
  - Display the entered message as if it had been converted into digits of π
  - Display a numeric sequence that resembles π
  - Do not directly display the original message on the conversion result screen

- Analysis Experience
  - Display a π analysis animation
  - Display an animation that appears to restore the message
  - Present the failed analysis as the punchline
  - Provide a way for users to try again

---

## 2. Optional Features (Future Implementation)

### 2.1 Pi Message

- Sharing
  - Store message data in the URL
  - Generate a shareable URL
  - Copy the URL to the clipboard
  - Share via X

- Message Reception
  - Read message data from the shared URL
  - Display a π analysis animation
  - Display an animation that appears to restore the message
  - Present the failed analysis as the punchline
  - Provide a way for recipients to try Pi Message themselves

- Experience Enhancements
  - Add additional analysis animation patterns
  - Add τ-themed jokes and easter eggs
  - Display special effects on π-related dates

### 2.2 Pi Receipt

- Amount Input
  - Users can enter any amount
  - Users can enter multiple product names and prices
  - Validate user input

- Pi Receipt Generation
  - Generate a receipt from the entered data
  - Display a fictional tax rate inspired by π
  - Display Pi Points
  - Display random π-themed line items
  - Calculate the total amount

- Receipt Display
  - Display the result using a receipt-style UI
  - Optimize the layout for smartphone screenshots
  - Allow users to regenerate the receipt

- Sharing
  - Save the receipt as an image
  - Share the receipt on social media

### 2.3 Pi Approximation Atlas

- Approximation List
  - Display a list of notable approximations of π
  - Display the difference between each approximation and π
  - Visually represent approximation accuracy

- Approximation Details
  - Display an overview of each approximation
  - Display related people and historical context
  - Briefly explain the approximation method and its characteristics

- Content Display
  - Display approximations in chronological order or by accuracy
  - Provide explanations that are understandable without advanced mathematical knowledge
  - Include math-related jokes and trivia

### 2.4 Shared Features

- Sharing via the Web Share API
- Japanese and English support

---

## 3. Technical Requirements

### 3.1 Frontend

- Programming Language
  - TypeScript

- Frameworks / Libraries
  - React
  - Vite

- State Management
  - Use React's built-in state management by default
  - Do not use a global state management library

- Routing
  - TanStack Router

- Styling
  - Tailwind CSS

- UI Component Development
  - Storybook

- Testing
  - Vitest
  - React Testing Library
  - Storybook
  - Playwright

### 3.2 Backend

- None

No backend APIs, user authentication, or server-side processing will be used.

### 3.3 Data Management

- Data Storage
  - Process data entirely in the browser
  - Manage static content within the frontend application

- Data Format
  - TypeScript objects
  - JSON

- Data Retention
  - Do not permanently store user data

### 3.4 External Services and APIs

- None

No external APIs will be used in the MVP.

### 3.5 Infrastructure and Deployment

- Hosting
  - Cloudflare Pages

- CI/CD
  - GitHub Actions
  - Run linting, tests, and builds on pull requests

- Environment Variable Management
  - Environment variables will generally not be used in the MVP
  - If required, manage them using `.env` files
  - Exclude `.env` files from Git version control

---

## 4. Non-Functional Requirements

### 4.1 Performance

- Initial Load Time
  - Target an initial load time of one second or less

- UI Response Time
  - Provide immediate UI feedback for user interactions

- Processing Time
  - Target a processing time of one second or less for standard data processing
  - Intentional animation and presentation delays are excluded from processing time requirements

- Expected Data Volume
  - Do not store large amounts of π digits
  - Keep static content data to the minimum required

### 4.2 Security

- Input Validation
  - Validate user input

- Sensitive Information Management
  - Do not store API keys or sensitive information in the frontend

- User Data Handling
  - Do not store user input on a server

- Dependency Management
  - Avoid unnecessary dependencies
  - Review dependencies for known vulnerabilities

### 4.3 Supported Environments

- Supported Devices
  - Desktop
  - Smartphone
  - Tablet

- Supported Browsers
  - Latest version of Google Chrome
  - Latest version of Safari
  - Latest version of Firefox
  - Latest version of Microsoft Edge

- Responsive Design
  - Use a mobile-first design approach
  - Prevent layout issues across major viewport sizes

### 4.4 Maintainability

- Feature Separation
  - Separate each experience under the `features` directory
  - Minimize dependencies between experiences

- Shared Component Management
  - Share only UI components used across multiple experiences
  - Avoid excessive abstraction and component sharing

- Type Safety
  - Use TypeScript type definitions
  - Avoid using `any` wherever possible

- Testing Strategy
  - Test key user interactions
  - Unit test data transformation and calculation logic
  - E2E test key user flows

### 4.5 Extensibility

- New Feature Support
  - Manage each experience as an independent feature

- Content Expansion
  - Use a structure that makes it easy to add new experiences
  - Structure Pi Approximation Atlas data so that new approximations can be added easily

- Internationalization
  - Consider future Japanese and English support
  - Avoid excessive hard-coded UI text within components

- External Service Integration
  - Do not depend on external services in the MVP

---

## 5. Out of Scope

The following features will not be implemented in the MVP:

- Pi Message sharing
- Pi Message reception
- Pi Receipt
- Pi Approximation Atlas
- User registration and login
- Database
- Backend APIs
- AI features
- Real encryption
- Real message searches within the digits of π
- Persistent user data storage
- Dynamic OGP generation
- Admin dashboard
- Internationalization

---

## 6. Definition of Done

The MVP is considered complete when all of the following conditions are met:

- The core Pi Message features work correctly
- Users can enter a message
- The Pi conversion result can be displayed
- The analysis animation and punchline are displayed correctly
- Core features are usable on smartphones
- Linting, tests, and builds pass successfully
- The application is deployed to the production environment
