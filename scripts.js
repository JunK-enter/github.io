
function openMenu() {
    document.getElementById("menuSlide").style.width = "250px";
}

function closeMenu() {
    document.getElementById("menuSlide").style.width = "0";
    var menu = document.getElementById("menuSlide");
    var isClickInside = menu.contains(event.target);
    if (!isClickInside) {
      menu.style.width = "0";
    }
}

let currentPage = 1;
  const totalPages = 5; // adjust this value based on the number of pages
  const chaptersPerPage = 2; // adjust this value based on the number of chapters per page

  function updatePage() {
    // Hide all chapters
    const chapters = document.getElementsByClassName("chapter");
    for (const chapter of chapters) {
      chapter.style.display = "none";
    }

    // Show the chapters belonging to the current page
    const startIndex = (currentPage - 1) * chaptersPerPage;
    for (let i = startIndex; i < startIndex + chaptersPerPage; i++) {
      if (chapters[i]) {
        chapters[i].style.display = "block";
      }
    }

    // Update pagination controls
    document.getElementById("currentPage").textContent = currentPage;
    document.getElementById("totalPages").textContent = totalPages;
    document.getElementById("prev").disabled = currentPage === 1;
    document.getElementById("next").disabled = currentPage === totalPages;
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      updatePage();
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      updatePage();
    }
  }

  // Call the updatePage function once when the page is loaded
  document.addEventListener("DOMContentLoaded", () => {
    updatePage();
  });

   // Function to make requests to the Google Analytics Reporting API V4.
   async function requestGAData(page_id, access_token, start_date, end_date) {
    const response = await fetch(`https://www.googleapis.com/analytics/v3/data/ga?ids=ga:${page_id}&start_date=${start_date}&end_date=${end_date}&metrics=ga%3Apageviews`, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return null;
    }

    return data;
  }

  async function requestGAData(page_id, access_token, start_date, end_date) {
    const response = await fetch(`https://www.googleapis.com/analytics/v3/data/ga?ids=ga:${page_id}&start_date=${start_date}&end_date=${end_date}&metrics=ga%3Apageviews`, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return null;
    }

    return data;
  }

  async function getTotalVisitors() {
    const access_token = "ACCESS_TOKEN";
    const view_id = "VIEW_ID";
    const page_id = "YOUR_MEASUREMENT_ID";

    const now = new Date();
    const start_date = "2005-01-01";
    const end_date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const total_data = await requestGAData(page_id, access_token, start_date, end_date);
    const total_visitors = total_data && total_data.rows && total_data.rows[0] && parseInt(total_data.rows[0][0], 10);

    return total_visitors;
  }

  function updateTotalVisitorCount() {
    getTotalVisitors().then((total_visitors) => {
      document.getElementById("total-visitors").innerText = total_visitors;
    }).catch((error) => {
      console.error("Error fetching visitor data:", error);
    });
  }

  updateTotalVisitorCount();
