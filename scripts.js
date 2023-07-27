
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
