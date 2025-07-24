// JavaScript logic for data fetching, filtering, and rendering

let episodes = []; // stores all episodes loaded from data.json
  let filteredResults = []; // stores only filtered episodes based on user input
  let currentPage = 1; // tracks the current page number for pagination
  const resultsPerPage = 6; // number of results to show per page

  // Loads JSON data containing all episodes from a local file
  async function loadData() {
    const res = await fetch('data.json'); // Fetches the JSON file
    episodes = await res.json();          // Parses the JSON into JS array
    populateFilters();                    // Builds subject and color filter options
  }

  // Creates checkboxes dynamically for all unique subjects and colors found in the data
  function populateFilters() {
    const subjectSet = new Set(); // to store unique subjects
    const colorSet = new Set();   // to store unique colors

    episodes.forEach(ep => {
      // Splits and trims each subject, then adds to the set
      ep.subject.split(',').forEach(s => {
        const trimmed = s.trim();
        if (trimmed) subjectSet.add(trimmed);
      });

      // Splits and trims each color, then adds to the set
      ep.colors.split(',').forEach(c => {
        const trimmed = c.trim();
        if (trimmed) colorSet.add(trimmed);
      });
    });

    const subjectFilters = document.getElementById('subjectFilters');
    const colorFilters = document.getElementById('colorFilters');

    // Creates checkboxes for all subjects in ABC order
    [...subjectSet].sort().forEach(subject => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" name="subject" value="${subject}" />
        ${subject}
      `;
      subjectFilters.appendChild(label);
    });

    // Creates checkboxes for all colors in ABC order
    [...colorSet].sort().forEach(color => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" name="color" value="${color}" />
        ${color}
      `;
      colorFilters.appendChild(label);
    });
  }

  // Filters the episodes based on search input and selected filters
  function filterEpisodes() {
    const titleQuery = document.getElementById('titleInput').value.toLowerCase();

    // Collects all selected subject and color values
    const selectedSubjects = Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(cb => cb.value);
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value);

    // Filters episodes based on title, subjects, and colors
    filteredResults = episodes.filter(ep => {
      const matchTitle = !titleQuery || ep.title.toLowerCase().includes(titleQuery);

      const subjectList = ep.subject.split(',').map(s => s.trim());
      const colorList = ep.colors.split(',').map(c => c.trim());

      // Checks if all selected subjects and colors are included in the episode
      const matchSubject = selectedSubjects.every(s => subjectList.includes(s));
      const matchColor = selectedColors.every(c => colorList.includes(c));

      return matchTitle && matchSubject && matchColor;
  });

  // Reset to first page and display results
  currentPage = 1;
  displayResults();
  displayPagination();
}

  // Displays current page of filtered results
  function displayResults() {
    const container = document.getElementById('results');
    container.innerHTML = '';

    // If no results found, show message and remove pagination
    if (filteredResults.length === 0) {
      container.textContent = 'No matching episodes found.';
      document.getElementById('pagination').innerHTML = '';
      return;
    }

    // Calculates which results to display based on current page
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const currentPageResults = filteredResults.slice(start, end);

    // Renders each episode as a styled block
    currentPageResults.forEach(ep => {
      const div = document.createElement('div');
      div.className = 'episode';
      div.innerHTML = `
        <h2>${ep.title} (Season ${ep.season}, Episode ${ep.episode})</h2>
        <p><strong>Air Date:</strong> ${ep.air_date}</p>
        <p><strong>Subjects:</strong> ${ep.subject}</p>
        <p><strong>Colors:</strong> ${ep.colors}</p>
        <img src="${ep.img_src}" width="300" loading="lazy" />
        <p><a href="${ep.youtube_src}" target="_blank">Watch Episode</a></p>
      `;
      container.appendChild(div);
    });
  }

  // Builds previous/next buttons and handles pagination display
  function displayPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
    if (totalPages <= 1) return; // Don't show pagination if only one page

    // Creates 'Previous' button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1; // Disable if on first page
    prevBtn.onclick = () => {
      currentPage--;
      displayResults();
      displayPagination();
    };

    // Creates 'Next' button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages; // Disable if on last page
    nextBtn.onclick = () => {
      currentPage++;
      displayResults();
      displayPagination();
    };

    // Append pagination controls
    pagination.appendChild(prevBtn);
    pagination.appendChild(document.createTextNode(` Page ${currentPage} of ${totalPages} `));
    pagination.appendChild(nextBtn);
  }

  // Loads episode data as soon as the script runs
  loadData();