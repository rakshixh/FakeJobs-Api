# Fake Jobs API

The Fake Jobs API is a stateless API created using Node.js and Express.js. It utilizes a JSON data source as a database and provides CRUD (Create, Read, Update, Delete) functionality for job listings.

## Purpose

This API is designed to help frontend developers integrate job listing functionality into their applications. It serves as a backend service for managing job data, allowing developers to focus on building frontend interfaces without worrying about backend logic.

## Usage

Developers can use this API to create applications for various purposes, including:

- **Portfolio websites**: Showcase job listing functionality in frontend portfolios.
- **Proof of concept projects**: Quickly prototype job-related applications using dummy data.
- **Learning projects**: Practice frontend development skills by integrating with a backend API.

## Endpoints

### Get all jobs

- **Endpoint**: `/jobs`
- **Method**: GET
- **Description**: Fetches all job listings.
- **Usage**: Send a GET request to `/jobs` to retrieve all job listings.
- **Response**: An array of job objects.

### Get a specific job by ID

- **Endpoint**: `/jobs/:id`
- **Method**: GET
- **Description**: Fetches a specific job listing by its ID.
- **Usage**: Send a GET request to `/jobs/:id`, where `:id` is the ID of the job you want to retrieve.
- **Response**: The job object with the specified ID. If no job is found, a 404 response is returned with a message indicating that no job was found with the provided ID.

### Create a new job listing

- **Endpoint**: `/jobs`
- **Method**: POST
- **Description**: Adds a new job listing.
- **Usage**: Send a POST request to `/jobs` with the details of the new job in the request body.
- **Response**: If successful, returns a success message along with the newly created job object. If there's an error, an appropriate error message is returned.

### Update an existing job listing

- **Endpoint**: `/jobs/:id`
- **Method**: PUT
- **Description**: Updates an existing job listing by its ID.
- **Usage**: Send a PUT request to `/jobs/:id`, where `:id` is the ID of the job you want to update, with the updated job details in the request body.
- **Response**: If successful, returns a success message along with the updated job object. If no job is found with the provided ID, a 404 response is returned with a message indicating that no job was found.

### Delete a job listing

- **Endpoint**: `/jobs/:id`
- **Method**: DELETE
- **Description**: Deletes a job listing by its ID.
- **Usage**: Send a DELETE request to `/jobs/:id`, where `:id` is the ID of the job you want to delete.
- **Response**: If successful, returns a success message along with the deleted job object. If no job is found with the provided ID, a 404 response is returned with a message indicating that no job was found.
