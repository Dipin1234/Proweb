// Video data
const videos = [
  {
    id: "1",
    title: "Basic Maths 01",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/u8p0D4YLbtk",
  },
  {
    id: "2",
    title: "Basic Maths 02",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/VyBRUPsrVtY",
  },
  {
    id: "3",
    title: "Basic Maths 03",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/ULZIX5yoO1I",
  },
  {
    id: "4",
    title: "Basic Maths 04",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/kj8BSobi7hY",
  },
  {
    id: "5",
    title: "Basic Maths 05",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/L_Dkvv2rLrs",
  },
  {
    id: "6",
    title: "Basic Maths 06",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/qBxHZx_TkSI",
  },
  {
    id: "7",
    title: "Basic Maths 07",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/WFj4Sfejj3k",
  },
  {
    id: "8",
    title: "Basic Maths 08",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/JZaofsRIInE",
  },
  {
    id: "9",
    title: "Basic Maths 09",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/WQ4l69oBjeA",
  },
  {
    id: "10",
    title: "Basic Maths 10",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/xNV3tDGnqmg",
  },
  {
    id: "11",
    title: "Basic Maths 11",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/LCIfD2DzpEQ",
  },
  {
    id: "12",
    title: "Basic Maths 12",
    description: "📺 Click Here to Watch Lecture",
    youtubeLink: "https://www.youtube.com/embed/_lntcBK1vy8",
  }
];

// DOM Elements
const moduleList = document.getElementById("moduleList");
const videoFrame = document.getElementById("videoFrame");
const videoTitle = document.getElementById("videoTitle");
const videoDescription = document.getElementById("videoDescription");
const markCompleteBtn = document.getElementById("markComplete");
const searchBar = document.getElementById("searchBar");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const themeToggle = document.querySelector(".theme-toggle");
const sidebar = document.querySelector(".sidebar");
const toggleSidebar = document.querySelector(".toggle-sidebar");

// Create floating reopen button
const reopenSidebar = document.createElement("div");
reopenSidebar.className = "reopen-sidebar";
reopenSidebar.innerHTML = '<i class="fas fa-arrow-right"></i>';
document.body.appendChild(reopenSidebar);

// Load completed videos from localStorage
let completedVideos = JSON.parse(localStorage.getItem("completedVideos")) || [];

// Load Modules
function loadModules(filteredVideos = videos) {
    moduleList.innerHTML = "";
    if (filteredVideos.length === 0) {
        moduleList.innerHTML = "<li>No videos found.</li>";
        videoFrame.src = "";
        videoTitle.textContent = "No Video Selected";
        videoDescription.textContent = "";
        markCompleteBtn.style.display = "none";
        return;
    }

    filteredVideos.forEach(video => {
        const li = document.createElement("li");
        li.textContent = video.title;
        li.dataset.videoId = video.id;
        if (completedVideos.includes(video.id)) {
            li.classList.add("completed");
        }
        li.addEventListener("click", () => {
            loadVideo(video);
            setActiveModule(li);
        });
        moduleList.appendChild(li);
    });

    updateProgress();
    // Load first video by default
    if (filteredVideos.length > 0 && !moduleList.querySelector(".active")) {
        loadVideo(filteredVideos[0]);
        moduleList.firstChild.classList.add("active");
    }
}

// Load Video
function loadVideo(video) {
    if (!video.youtubeLink) {
        console.error("Invalid YouTube link for video:", video.title);
        return;
    }
    videoFrame.src = video.youtubeLink;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;
    markCompleteBtn.style.display = "block";
    markCompleteBtn.textContent = completedVideos.includes(video.id) ? "Completed" : "Mark as Completed";
    markCompleteBtn.disabled = completedVideos.includes(video.id);
}

// Set Active Module
function setActiveModule(selectedLi) {
    const allLi = moduleList.querySelectorAll("li");
    allLi.forEach(li => li.classList.remove("active"));
    selectedLi.classList.add("active");
}

// Mark Video as Completed
markCompleteBtn.addEventListener("click", () => {
    const activeLi = moduleList.querySelector(".active");
    if (!activeLi) return;

    const activeVideoId = activeLi.dataset.videoId;
    if (!completedVideos.includes(activeVideoId)) {
        completedVideos.push(activeVideoId);
        localStorage.setItem("completedVideos", JSON.stringify(completedVideos));
        loadModules(videos); // Reload with current filter
    }
});

// Update Progress
function updateProgress() {
    const progress = videos.length ? (completedVideos.length / videos.length) * 100 : 0;
    progressPercent.textContent = `${Math.round(progress)}%`;
    progressFill.style.width = `${progress}%`;
}

// Search Functionality
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase().trim();
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
    );
    loadModules(filteredVideos);
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.innerHTML = document.body.classList.contains("dark")
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// Sidebar Toggle
toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    reopenSidebar.style.display = sidebar.classList.contains("collapsed") ? "block" : "none";
});

// Reopen Sidebar
reopenSidebar.addEventListener("click", () => {
    sidebar.classList.remove("collapsed");
    reopenSidebar.style.display = "none";
});

// Initialize
try {
    loadModules();
    reopenSidebar.style.display = "none"; // Hidden by default
} catch (error) {
    console.error("Error loading modules:", error);
    moduleList.innerHTML = "<li>Error loading videos. Please try again.</li>";
}