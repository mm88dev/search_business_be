# Search Business Backend

A Node/Express with Typescript backend application for handling business search operations.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository:**

  git clone https://github.com/mm88dev/search_business_be.git
  cd search_business_be

2. **Install Dependencies:**
   yarn install

3. **Environment Variables:**
  Create a .env file in the root directory of the project to manage environment variables. Use the following example as a template:

  API_URL=''
  PLACE_ID_1=''
  PLACE_ID_2=''

4. **Available Scripts:**

  start: Starts the application in production mode.

  build: Compiles TypeScript code to JavaScript.

  start:dev: Starts the application in development mode with live reloading.

  test: Runs tests using Jest

5. **Dependencies:**

  This project uses the following dependencies:
    •	axios: Promise-based HTTP client for making API requests.
    •	colors: Terminal string styling.
    •	cors: Package for enabling Cross-Origin Resource Sharing.
    •	dotenv: Loads environment variables from a .env file.
    •	express: Web framework for Node.js.
    •	express-async-errors: Allows handling of asynchronous errors in Express.
    •	express-rate-limit: Middleware for rate limiting requests.
    •	fuse.js: Lightweight fuzzy-search library.
    •	hpp: Middleware to protect against HTTP parameter pollution.

6. **Dependencies:**
    For development and testing, the following dev dependencies are used:
    •	@types/axios: TypeScript definitions for axios.
    •	@types/colors: TypeScript definitions for colors.
    •	@types/cors: TypeScript definitions for cors.
    •	@types/dotenv: TypeScript definitions for dotenv.
    •	@types/express: TypeScript definitions for express.
    •	@types/express-rate-limit: TypeScript definitions for express-rate-limit.
    •	@types/hpp: TypeScript definitions for hpp.
    •	@types/jest: TypeScript definitions for jest.
    •	@types/node: TypeScript definitions for Node.js.
    •	jest: Testing framework.
    •	ts-jest: TypeScript preprocessor for Jest.
    •	ts-node-dev: TypeScript development server with live reloading.
    •	typescript: TypeScript language support.


