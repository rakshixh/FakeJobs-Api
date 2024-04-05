# Fake Jobs API

The Fake Jobs API is a stateless API created using Node.js and Express.js. It utilizes a JSON data source as a database and provides CRUD (Create, Read, Update, Delete) functionality for job listings.

## Purpose

This API is designed to help frontend developers integrate job listing functionality into their applications. It serves as a backend service for managing job data, allowing developers to focus on building frontend interfaces without worrying about backend logic.

## Usage

Developers can use this API to create applications for various purposes, including:

- **Portfolio websites**: Showcase job listing functionality in frontend portfolios.
- **Proof of concept projects**: Quickly prototype job-related applications using dummy data.
- **Learning projects**: Practice frontend development skills by integrating with a backend API.

## Deployed Base URL

### https://fakejobs-api.vercel.app/

## Endpoints

### Get all jobs

- **Endpoint**: `/jobs`
- **Method**: GET
- **Description**: Fetches all job listings.
- **Usage**: Send a GET request to `/jobs` to retrieve all job listings.
- **Response**: An array of job objects.

> [!NOTE]
> This API will return 30 job listing objects.

-----------

### Get a specific job by ID

- **Endpoint**: `/jobs/:id`
- **Method**: GET
- **Description**: Fetches a specific job listing by its ID.
- **Usage**: Send a GET request to `/jobs/:id`, where `:id` is the ID of the job you want to retrieve.
- **Response**: The job object with the specified ID. If no job is found, a 404 response is returned with a message indicating that no job was found with the provided ID.

-----------

### Create a new job listing

- **Endpoint**: `/jobs`
- **Method**: POST
- **Description**: Adds a new job listing.
- **Usage**: Send a POST request to `/jobs` with the details of the new job in the request body.<br>
> [!NOTE]
> You can include `id` in the body but still backend will generate new `id value` for `id` property for the created new job listing.
- **Example for `Body of the request`**:
```
{
  "id": "1",
  "title": "Senior Front-End Developer",
  "type": "Full-Time",
  "location": "New York, NY",
  "description": "Join our team as a Senior Front-End Developer in the heart of New York City. We are looking for an experienced individual with a passion for cutting-edge technologies and a track record of delivering high-quality web applications.",
  "salary": "$100K - $120K",
  "company": {
      "name": "Tech Innovations Inc",
      "description": "Tech Innovations Inc is a leading technology company specializing in software development and digital solutions. Our team is dedicated to pushing the boundaries of innovation to deliver exceptional products and services.",
      "contactEmail": "contact@techinnovations.com",
      "contactPhone": "555-123-4567"
  }
}
```
- **Response**: If successful, returns a success message along with the newly created job object. If there's an error, an appropriate error message is returned.
- **Example of success response**:
```
{
    "success": true,
    "msg": "Job Created Successfully!",
    "job": {
        "id": "197666",
        "title": "Senior Front-End Developer",
        "type": "Full-Time",
        "location": "New York, NY",
        "description": "Join our team as a Senior Front-End Developer in the heart of New York City. We are looking for an experienced individual with a passion for cutting-edge technologies and a track record of delivering high-quality web applications.",
        "salary": "$100K - $120K",
        "company": {
            "name": "Tech Innovations Inc",
            "description": "Tech Innovations Inc is a leading technology company specializing in software development and digital solutions. Our team is dedicated to pushing the boundaries of innovation to deliver exceptional products and services.",
            "contactEmail": "contact@techinnovations.com",
            "contactPhone": "555-123-4567"
        }
    }
}
```
-----------

### Update an existing job listing

- **Endpoint**: `/jobs/:id`
- **Method**: PUT
- **Description**: Updates an existing job listing by its ID.
- **Usage**: Send a PUT request to `/jobs/:id`, where `:id` is the ID of the job you want to update, with the updated job details in the request body.<br>
> [!NOTE]
> You can include `id` in the body but still backend will ignore that and update the other properties as per request body. If you don't include the `id` property then at the end `id` property with the value of `:id` will be added.
- **Example for `Body of the request`**:Make sure to include the value of the properties with updated data.
```
{
  "id": "1",
  "title": "Senior Front-End Developer",
  "type": "Full-Time",
  "location": "New York, NY",
  "description": "Join our team as a Senior Front-End Developer in the heart of New York City. We are looking for an experienced individual with a passion for cutting-edge technologies and a track record of delivering high-quality web applications.",
  "salary": "$100K - $120K",
  "company": {
      "name": "Tech Innovations Inc",
      "description": "Tech Innovations Inc is a leading technology company specializing in software development and digital solutions. Our team is dedicated to pushing the boundaries of innovation to deliver exceptional products and services.",
      "contactEmail": "contact@techinnovations.com",
      "contactPhone": "555-123-4567"
  }
}
```
- **Response**: If successful, returns a success message along with the updated job object. If no job is found with the provided ID, a 404 response is returned with a message indicating that no job was found.
- **Example of success response**:
```
{
    "success": true,
    "msg": "Job with id 1 has been updated",
    "job": {
        "id": "1",
        "title": "Senior Front-End Developer",
        "type": "Part-Time",
        "location": "New York, NY",
        "description": "Join our team as a Senior Front-End Developer in the heart of New York City. We are looking for an experienced individual with a passion for cutting-edge technologies and a track record of delivering high-quality web applications.",
        "salary": "$100K - $120K",
        "company": {
            "name": "Tech Innovations Inc",
            "description": "Tech Innovations Inc is a leading technology company specializing in software development and digital solutions. Our team is dedicated to pushing the boundaries of innovation to deliver exceptional products and services.",
            "contactEmail": "contact@techinnovations.com",
            "contactPhone": "555-123-4567"
        }
    }
}
```
- **Example of 404 not found response**:
```
{
    "success": true,
    "msg": "Job not found!"
}
```

-----------

### Delete a job listing

- **Endpoint**: `/jobs/:id`
- **Method**: DELETE
- **Description**: Deletes a job listing by its ID.
- **Usage**: Send a DELETE request to `/jobs/:id`, where `:id` is the ID of the job you want to delete.
- **Response**: If successful, returns a success message along with the deleted job object. If no job is found with the provided ID, a 404 response is returned with a message indicating that no job was found.
- **Example of success response**:
```
{
    "success": true,
    "msg": "Job with id 1 has been deleted",
    "job": {
        "id": "1",
        "title": "Senior Front-End Developer",
        "type": "Full-Time",
        "location": "New York, NY",
        "description": "Join our team as a Senior Front-End Developer in the heart of New York City. We are looking for an experienced individual with a passion for cutting-edge technologies and a track record of delivering high-quality web applications.",
        "salary": "$100K - $120K",
        "company": {
            "name": "Tech Innovations Inc",
            "description": "Tech Innovations Inc is a leading technology company specializing in software development and digital solutions. Our team is dedicated to pushing the boundaries of innovation to deliver exceptional products and services.",
            "contactEmail": "contact@techinnovations.com",
            "contactPhone": "555-123-4567"
        }
    }
}
```
- **Example of 404 not found response**:
```
{
    "success": false,
    "msg": "Job not found!"
}
```

<h2>Contribution Guidelines:</h2>

Check the [Contributing Guide]() out. <br>
Head over to our [issue tracker]() to check more about it. <br>
We expect all contributors to abide by the terms of our [Code of Conduct]().
<br>

<h2>🛡️ License:</h2>

This repository is licensed under the MIT license

![GitHub watchers](https://img.shields.io/github/watchers/rakshixh/FakeJobs-Api?label=Number%20of%20Watchers&style=flat&labelColor=red&color=black)
![GitHub forks](https://img.shields.io/github/forks/rakshixh/FakeJobs-Api?label=Number%20of%20Forks&style=flat&labelColor=red&color=black)
![GitHub Repo stars](https://img.shields.io/github/stars/rakshixh/FakeJobs-Api?style=flat&label=Number%20of%20Stars&labelColor=red&color=black)
![GitHub issues](https://img.shields.io/github/issues/rakshixh/FakeJobs-Api?label=Number%20of%20Issues&labelColor=red&color=black)
