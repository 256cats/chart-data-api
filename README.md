
## Project Synopsis

Welcome to the Charting App. The app is containerized with support for environment variables, ready for deployment to any container registry and execution in the cloud (e.g. AWS ECS / EKS / Kubernetes).

We provide a Docker-compose stack to facilitate streamlined development and testing.

## Technologies Overview

This project employs various technologies:

- **Node.js**: A JavaScript runtime environment.
- **TypeScript**: An extension of JavaScript that introduces static typing.
- **Nest.js** ([Nest.js](https://nestjs.com/)): A progressive Node.js framework designed for building efficient and scalable server-side applications.
- **Prisma** ([Prisma](https://www.prisma.io/)): An ORM for robust database management.
- **Pino** ([Pino](https://github.com/pinojs/pino)): A high-speed logging tool enhancing application diagnostics.
- **Eslint, Prettier**: Tools committed to ensuring code quality and consistency.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Prometheus**: A tool for detailed monitoring and performance analysis.
- **Docker**: Containerization of the app with support for environment variables, ready for deployment to any container registry and execution in the cloud.
- **Vite**: Fast frontend build tool. [Vite](https://vitejs.dev/)
- **Apollo**: State management library using GraphQL. [Apollo](https://www.apollographql.com/)
- **React**: Library for building user interfaces. [React](https://reactjs.org/)
- **Nivo**: Data visualization components. [Nivo](https://nivo.rocks/)
- **MUI (Material-UI)**: A popular React UI framework featuring a comprehensive suite of components styled using Material Design. MUI provides a robust and customizable solution for building fast, beautiful, and accessible web interfaces. [MUI](https://mui.com/)


## Running the API Locally

To launch the API in your local environment, follow these steps:

1. Generate your environment file by copying `backend/.env.example` to `backend/.env`.
2. Start the application using docker-compose:

    ```bash
    docker-compose up
    ```

    This command starts the REST API server, initializes PostgreSQL, loads sample data, and makes the API accessible at `localhost:3000`.

## Exploring the API Routes

Explore the API's capabilities through these endpoints:

- **Graphql endpoint**: http://localhost:3000/graphql . Example queries:
```graphql
{
  terms {
    id
    name
    dataPoints(useRandomValues: true) {
      id
      x
      y
    }
  }
}
```
```graphql
{
  terms {
    id
    name
    dataPoints {
      id
      x
      y
    }
  }
}
```
```graphql
{
  randomDataPoints(count: 2, termId: 10) {
    id
    x
    y
    term {
      id
      name
    }
  }
}

```
- **Frontend**: http://localhost:8000
- **API Metrics**: Assess API performance using [Prometheus metrics](http://localhost:3000/metrics).


## Updating the Database Schema

To alter the database schema:

1. Modify `backend/prisma/schema.prisma`.
2. Implement your changes with Prisma:

    ```bash
    npx prisma migrate dev
    ```

    This command updates the database schema and regenerates the Prisma client.
