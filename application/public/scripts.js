// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", async () => {
    try {
      // GET REQUEST TO YEARS ENDPOINT
      const response = await fetch('/api/episodes/years');
      if (!response.ok) {
        throw new Error('Network response was not ok for years endpoint');
      }
      // Parse the response as JSON
      const result = await response.json();
      const years = result.data; // e.g., [{ "year": 1983 }, { "year": 1984 }, ...]
      const yearFilter = document.getElementById("yearFilter");
  
      // Loop through the years and create option elements
      years.forEach(item => {
        const option = document.createElement("option");
        option.value = item.year;
        option.textContent = item.year;
        yearFilter.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  
    // GET REQUEST TO MONTHS ENDPOINT
    try {
      const responseMonths = await fetch('/api/episodes/months');
      if (!responseMonths.ok) {
        throw new Error('Network response was not ok for months endpoint');
      }
      const resultMonths = await responseMonths.json();
      const months = resultMonths.data;
      const monthFilter = document.getElementById('monthFilter');
  
      // Create option elements for each month
      months.forEach(item => {
        const option = document.createElement("option");
        option.value = item.month;
        option.textContent = item.month;
        monthFilter.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching months:", error);
    }
  
    // GET REQUEST TO SEASONS ENDPOINT
    try {
      const response = await fetch('/api/colors/seasons');
      if (!response.ok) {
        throw new Error('Network response was not ok for seasons endpoint');
      }
      const result = await response.json();
      const seasons = result.data;
      const seasonFilter = document.getElementById("seasonFilter");
  
      seasons.forEach(item => {
        const option = document.createElement("option");
        option.value = item.season;
        option.textContent = item.season;
        seasonFilter.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching seasons:", error);
    }
  
    // GET REQUEST TO SUBJECTS ENDPOINT
    try {
      const response = await fetch('/api/subjects/subject');
      if (!response.ok) {
        throw new Error('Network response was not ok for subjects endpoint');
      }
      const result = await response.json();
      const subjects = result.data; // Expecting an array of subject strings
      const subjectsContainer = document.getElementById("subjectsContainer");
  
      // Clear any existing content (optional)
      subjectsContainer.innerHTML = "";
  
      // Create a checkbox for each subject
      subjects.forEach(subject => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("checkbox-option");
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        // Ensure id is valid (avoid spaces/special characters)
        checkbox.id = 'sub_' + subject.replace(/\s+/g, '_');
        checkbox.name = "filterOptions";
        checkbox.value = subject;
  
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = subject;
  
        optionDiv.appendChild(checkbox);
        optionDiv.appendChild(label);
        subjectsContainer.appendChild(optionDiv);
      });
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  
    // GET REQUEST TO COLORS ENDPOINT
    try {
      const responseColors = await fetch('/api/colors/colors');
      if (!responseColors.ok) {
        throw new Error('Network response was not ok for colors endpoint');
      }
      const resultColors = await responseColors.json();
      const colors = resultColors.data; // Expects an array of color strings
      const colorsContainer = document.getElementById("colorsContainer");
  
      // Clear existing content
      colorsContainer.innerHTML = "";
  
      // Create a checkbox for each color
      colors.forEach(color => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("checkbox-option");
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = 'color_' + color.replace(/\s+/g, '_');
        checkbox.name = "filterColors";
        checkbox.value = color;
  
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = color;
  
        optionDiv.appendChild(checkbox);
        optionDiv.appendChild(label);
        colorsContainer.appendChild(optionDiv);
      });
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  });
  