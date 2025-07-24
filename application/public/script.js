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

// Creates clickable pills dynamically for all unique subjects and colors
function populateFilters() {
  const subjectSet = new Set();
  const colorSet = new Set();

  episodes.forEach(ep => {
    ep.subject.split(',').forEach(s => {
      const trimmed = s.trim();
      if (trimmed) subjectSet.add(trimmed);
    });

    ep.colors.split(',').forEach(c => {
      const trimmed = c.trim();
      if (trimmed) colorSet.add(trimmed);
    });
  });

  const subjectFilters = document.getElementById('subjectFilters');
  const colorFilters = document.getElementById('colorFilters');

  [...subjectSet].sort().forEach(subject => {
    const pill = document.createElement('div');
    pill.className = "filter-pill";
    pill.textContent = subject;
    pill.dataset.value = subject;
    pill.onclick = () => pill.classList.toggle('selected');
    subjectFilters.appendChild(pill);
  });

  [...colorSet].sort().forEach(color => {
    const pill = document.createElement('div');
    pill.className = "filter-pill";
    pill.textContent = color;
    pill.dataset.value = color;
    pill.onclick = () => pill.classList.toggle('selected');
    colorFilters.appendChild(pill);
  });
}

// Filters the episodes based on search input and selected filters
function filterEpisodes() {
  const titleQuery = document.getElementById('titleInput').value.toLowerCase();

  // Get selected subject and color values from filter pills
  const selectedSubjects = Array.from(document.querySelectorAll('#subjectFilters .filter-pill.selected'))
    .map(el => el.dataset.value);
  const selectedColors = Array.from(document.querySelectorAll('#colorFilters .filter-pill.selected'))
    .map(el => el.dataset.value);

  filteredResults = episodes.filter(ep => {
    const matchTitle = !titleQuery || ep.title.toLowerCase().includes(titleQuery);

    const subjectList = ep.subject.split(',').map(s => s.trim());
    const colorList = ep.colors.split(',').map(c => c.trim());

    const matchSubject = selectedSubjects.every(s => subjectList.includes(s));
    const matchColor = selectedColors.every(c => colorList.includes(c));

    return matchTitle && matchSubject && matchColor;
  });

  currentPage = 1;
  displayResults();
  displayPagination();
}

// Displays current page of filtered results
function displayResults() {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (filteredResults.length === 0) {
    container.textContent = 'No matching episodes found.';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const currentPageResults = filteredResults.slice(start, end);

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
  if (totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    displayResults();
    displayPagination();
  };

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    displayResults();
    displayPagination();
  };

  pagination.appendChild(prevBtn);
  pagination.appendChild(document.createTextNode(` Page ${currentPage} of ${totalPages} `));
  pagination.appendChild(nextBtn);
}

// Initialize
loadData();
