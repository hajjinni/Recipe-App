# Recipe App

## Project Description

The **Recipe App** is a dynamic web application built using **React JS** that allows users to browse, search, and filter recipes using data fetched from a public meals API.  
The project focuses on implementing core React concepts, creating a responsive user interface, and delivering a smooth user experience.

---

## Features

### Recipe Listings
- Display a list of recipes fetched from a public meals API
- Show key recipe details such as:
  - Recipe name
  - Thumbnail image
  - Category
- Each recipe card is clickable to view complete recipe details

### Search and Filter
- Search recipes by name or keyword
- Filter recipes by:
  - Category
  - Ingredients
  - Meal type (area/cuisine)
- Search and filters can be used together for refined results

### Recipe Details
- View full recipe information including:
  - Instructions
  - Ingredients
  - Category
  - Video link (if available)
- Easy navigation back to the main recipe list

### Favorites
- Mark recipes as favorites
- Favorites are stored in `localStorage`
- Favorites persist across browser sessions

---

## User Capabilities

- View a list of available recipes
- Search recipes by name
- Filter recipes by category and ingredients
- View full details of a selected recipe
- Save favorite recipes for later viewing

---

## Tech Stack Used

- **React JS**
- **Tailwind CSS** for styling
- **Axios / Fetch API** for HTTP requests
- **Public API**:  
  https://www.themealdb.com/api.php

---

## Getting Started

### Install Dependencies
```bash
npm install

## Run the Application
 npm start

### The app will run at:
 http://localhost:3000
