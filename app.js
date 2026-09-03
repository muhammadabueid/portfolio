/* ==========================================================================
   Mohamed Abu-Eid Portfolio - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. DOM Elements Selection
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const backToTopBtn = document.getElementById('backToTop');

  const heroCopyEmailBtn = document.getElementById('heroCopyEmailBtn');
  const contactCopyBtn = document.getElementById('contactCopyBtn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const projectDetailButtons = document.querySelectorAll('[data-project]');

  const contactForm = document.getElementById('contactForm');

  // Resume Modal Elements
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const navResumeBtn = document.getElementById('navResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  // Set current year dynamically
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Interactive 3D Parallax Tilt for Hero Profile Avatar Showcase
  const heroAvatarContainer = document.getElementById('heroAvatarContainer');
  if (heroAvatarContainer) {
    heroAvatarContainer.addEventListener('mousemove', (e) => {
      const rect = heroAvatarContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * 16;
      const rotateY = (x / rect.width) * 16;

      heroAvatarContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroAvatarContainer.addEventListener('mouseleave', () => {
      heroAvatarContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      heroAvatarContainer.style.transition = 'transform 0.5s ease';
    });

    heroAvatarContainer.addEventListener('mouseenter', () => {
      heroAvatarContainer.style.transition = 'none';
    });
  }

  // ------------------------------------------------------------------------
  // 2. Navigation & Scroll Effects
  // ------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    // Header shadow background toggle
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active Navigation Highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('mobile-active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking a link
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // Smooth Back to Top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Toast Notification & Copy Email
  // ------------------------------------------------------------------------
  const emailAddress = "mohamedaboeid07@gmail.com";

  function copyToClipboard(text, customMessage = "Email address copied to clipboard!") {
    navigator.clipboard.writeText(text).then(() => {
      showToast(customMessage);
    }).catch(() => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast(customMessage);
    });
  }

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  if (heroCopyEmailBtn) {
    heroCopyEmailBtn.addEventListener('click', () => copyToClipboard(emailAddress));
  }

  if (contactCopyBtn) {
    contactCopyBtn.addEventListener('click', () => copyToClipboard(emailAddress));
  }

  // ------------------------------------------------------------------------
  // 4. INTERACTIVE SMARTPHONE APP SIMULATOR DATA & CONTROLLER
  // ------------------------------------------------------------------------
  const phoneViewport = document.getElementById('phoneViewport');
  const simInfoCard = document.getElementById('simInfoCard');
  const simSelectorBtns = document.querySelectorAll('.sim-selector-btn');

  const simulatorApps = {
    skincare: {
      badge: "State Management • Provider",
      title: "Skin Care Advisor App",
      desc: "Personalized skincare diagnostic & product recommendation app built with Flutter & Provider pattern. Allows users to test skin sensitivity and browse curated routines.",
      arch: [
        "Reactive state management using Provider & ChangeNotifier",
        "Clean Material 3 UI design with custom theme gradients",
        "Filtering engine by skin type (Dry, Oily, Sensitive, Combination)"
      ],
      screenHtml: `
        <div class="sim-app-header">
          <div class="sim-app-title"><i class="fa-solid fa-spa" style="color:#54C5F8;"></i> Skin Care Advisor</div>
          <i class="fa-solid fa-bell" style="font-size:0.8rem; opacity:0.6;"></i>
        </div>
        <div style="font-size:0.75rem; color:#9CA3AF;">Select Skin Type:</div>
        <div class="sim-chips-row" id="skinTypeChips">
          <span class="sim-chip active" data-type="Dry">Dry Skin</span>
          <span class="sim-chip" data-type="Oily">Oily Skin</span>
          <span class="sim-chip" data-type="Sensitive">Sensitive</span>
          <span class="sim-chip" data-type="Combination">Combination</span>
        </div>
        <div id="simProductContainer" style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.3rem;">
          <div class="sim-card">
            <div style="font-weight:600; font-size:0.82rem; color:#54C5F8;">Hydrating Hyaluronic Serum</div>
            <div style="font-size:0.72rem; color:#9CA3AF;">Deep moisture barrier boost • Morning Routine</div>
            <div style="font-weight:700; font-size:0.8rem; color:#64FFDA; margin-top:0.2rem;">★ 4.9 (128 reviews)</div>
          </div>
          <div class="sim-card">
            <div style="font-weight:600; font-size:0.82rem; color:#54C5F8;">Ceramide Gentle Cleanser</div>
            <div style="font-size:0.72rem; color:#9CA3AF;">pH balanced non-stripping formula</div>
            <div style="font-weight:700; font-size:0.8rem; color:#64FFDA; margin-top:0.2rem;">★ 4.8 (95 reviews)</div>
          </div>
        </div>
        <button id="simDiagnoseBtn" style="margin-top:auto; background:linear-gradient(135deg, #54C5F8, #01B5D8); color:#0A0E17; border:none; padding:0.55rem; border-radius:8px; font-weight:700; font-size:0.8rem; cursor:pointer;">
          Diagnose My Skin <i class="fa-solid fa-wand-magic-sparkles"></i>
        </button>
      `
    },
    taskmanager: {
      badge: "Local NoSQL DB • Hive",
      title: "Task Manager App",
      desc: "Offline-first productivity mobile app built with Flutter and Hive DB. Features task scheduling, instant local disk persistence, and completion analytics.",
      arch: [
        "Hive NoSQL database for key-value & typed task model storage",
        "Instant CRUD operations with auto-sync listeners",
        "Responsive grid & interactive task progress tracker"
      ],
      screenHtml: `
        <div class="sim-app-header">
          <div class="sim-app-title"><i class="fa-solid fa-list-check" style="color:#54C5F8;"></i> Daily Tasks</div>
          <span style="background:rgba(84,197,248,0.2); color:#54C5F8; font-size:0.7rem; padding:0.1rem 0.4rem; border-radius:99px; font-weight:600;">Hive DB</span>
        </div>
        <div style="background:rgba(255,255,255,0.05); padding:0.6rem; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
          <div style="display:flex; justify-space-between; align-items:center; font-size:0.75rem; margin-bottom:0.3rem;">
            <span>Completed Today</span>
            <span id="taskProgressTxt" style="color:#64FFDA; font-weight:700;">2 of 3</span>
          </div>
          <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
            <div id="taskProgressBar" style="width:66%; height:100%; background:linear-gradient(90deg, #54C5F8, #64FFDA);"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.4rem; margin-top:0.4rem;" id="simTaskList">
          <div class="sim-task-item completed" data-id="1">
            <span><i class="fa-regular fa-circle-check" style="color:#64FFDA;"></i> Finalize CS Graduation Thesis</span>
            <span style="font-size:0.65rem; background:rgba(255,255,255,0.1); padding:0.1rem 0.3rem; border-radius:4px;">High</span>
          </div>
          <div class="sim-task-item completed" data-id="2">
            <span><i class="fa-regular fa-circle-check" style="color:#64FFDA;"></i> Refactor Flutter Provider Code</span>
            <span style="font-size:0.65rem; background:rgba(255,255,255,0.1); padding:0.1rem 0.3rem; border-radius:4px;">Medium</span>
          </div>
          <div class="sim-task-item" data-id="3">
            <span><i class="fa-regular fa-circle" style="color:#9CA3AF;"></i> Deploy Portfolio App Update</span>
            <span style="font-size:0.65rem; background:rgba(84,197,248,0.2); color:#54C5F8; padding:0.1rem 0.3rem; border-radius:4px;">Urgent</span>
          </div>
        </div>
        <button id="simAddTaskBtn" style="margin-top:auto; background:rgba(255,255,255,0.08); border:1px dashed rgba(84,197,248,0.4); color:#54C5F8; padding:0.5rem; border-radius:8px; font-weight:600; font-size:0.78rem; cursor:pointer;">
          + Add New Task (Hive DB)
        </button>
      `
    },
    weather: {
      badge: "Networking • REST API",
      title: "Weather Forecast App",
      desc: "Live meteorological forecast app consuming OpenWeather REST APIs. Displays dynamic weather conditions, wind speed, UV index, and extended forecasts.",
      arch: [
        "HTTP REST client with error handling & JSON model parsing",
        "Geolocation service for automatic local weather detection",
        "Dynamic UI visual themes shifting with weather conditions"
      ],
      screenHtml: `
        <div class="sim-app-header">
          <div class="sim-app-title"><i class="fa-solid fa-location-dot" style="color:#54C5F8;"></i> Damanhur, Egypt</div>
          <i class="fa-solid fa-rotate-right" style="font-size:0.8rem; opacity:0.6;"></i>
        </div>
        <div style="text-align:center; padding:0.8rem 0;">
          <i class="fa-solid fa-cloud-sun" style="font-size:2.8rem; color:#FBBF24; filter:drop-shadow(0 0 10px rgba(251,191,36,0.4));"></i>
          <div style="font-size:2.2rem; font-weight:800; color:#F3F4F6; margin-top:0.2rem;" id="simWeatherTemp">28°C</div>
          <div style="font-size:0.8rem; color:#9CA3AF;" id="simWeatherDesc">Partly Cloudy • Humidity 54%</div>
        </div>
        <div style="display:flex; justify-space-between; gap:0.4rem;">
          <div class="sim-card" style="flex:1; text-align:center; padding:0.5rem;">
            <div style="font-size:0.68rem; color:#9CA3AF;">Wind</div>
            <div style="font-weight:700; font-size:0.8rem; color:#54C5F8;">14 km/h</div>
          </div>
          <div class="sim-card" style="flex:1; text-align:center; padding:0.5rem;">
            <div style="font-size:0.68rem; color:#9CA3AF;">UV Index</div>
            <div style="font-weight:700; font-size:0.8rem; color:#64FFDA;">Low 2</div>
          </div>
          <div class="sim-card" style="flex:1; text-align:center; padding:0.5rem;">
            <div style="font-size:0.68rem; color:#9CA3AF;">Pressure</div>
            <div style="font-weight:700; font-size:0.8rem; color:#54C5F8;">1014 hPa</div>
          </div>
        </div>
        <div style="font-size:0.75rem; color:#9CA3AF; margin-top:0.3rem;">Quick Search City:</div>
        <div style="display:flex; gap:0.3rem;" id="simCityBtns">
          <button class="sim-chip active" data-city="Cairo" data-temp="32°C" data-desc="Sunny">Cairo</button>
          <button class="sim-chip" data-city="Alexandria" data-temp="26°C" data-desc="Sea Breeze">Alexandria</button>
          <button class="sim-chip" data-city="London" data-temp="18°C" data-desc="Light Rain">London</button>
        </div>
      `
    },
    notes: {
      badge: "Storage & Search • Hive",
      title: "Notes Application",
      desc: "Fast note-taking application utilizing Hive NoSQL database. Supports color tag categories, real-time search, and distraction-free writing interface.",
      arch: [
        "Ultra-fast disk read/write throughput powered by Hive",
        "Real-time title & content search indexing",
        "Color-coded note cards with custom tag filters"
      ],
      screenHtml: `
        <div class="sim-app-header">
          <div class="sim-app-title"><i class="fa-solid fa-note-sticky" style="color:#54C5F8;"></i> My Notes</div>
          <i class="fa-solid fa-magnifying-glass" style="font-size:0.8rem; opacity:0.6;"></i>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem;" id="simNotesContainer">
          <div class="sim-card" style="border-left:3px solid #54C5F8;">
            <div style="font-weight:700; font-size:0.82rem; color:#F3F4F6;">Flutter Clean Architecture Rules</div>
            <div style="font-size:0.72rem; color:#9CA3AF; margin-top:0.2rem;">Separate Data, Domain, and Presentation layers for maximum testability...</div>
            <span style="font-size:0.62rem; background:rgba(84,197,248,0.15); color:#54C5F8; padding:0.1rem 0.3rem; border-radius:3px; display:inline-block; margin-top:0.4rem;">Flutter</span>
          </div>
          <div class="sim-card" style="border-left:3px solid #64FFDA;">
            <div style="font-weight:700; font-size:0.82rem; color:#F3F4F6;">Provider vs Bloc State Management</div>
            <div style="font-size:0.72rem; color:#9CA3AF; margin-top:0.2rem;">Use Provider for straightforward apps and Bloc/Cubit for complex event streams...</div>
            <span style="font-size:0.62rem; background:rgba(100,255,218,0.15); color:#64FFDA; padding:0.1rem 0.3rem; border-radius:3px; display:inline-block; margin-top:0.4rem;">Architecture</span>
          </div>
        </div>
        <button id="simAddNoteBtn" style="margin-top:auto; background:linear-gradient(135deg, #7C4DFF, #54C5F8); color:#FFF; border:none; padding:0.5rem; border-radius:8px; font-weight:700; font-size:0.8rem; cursor:pointer;">
          + Create Note
        </button>
      `
    }
  };

  function loadSimulatorApp(appKey) {
    const app = simulatorApps[appKey];
    if (!app || !phoneViewport || !simInfoCard) return;

    // Load viewport
    phoneViewport.innerHTML = app.screenHtml;

    // Load info card
    simInfoCard.innerHTML = `
      <span class="sim-info-badge">${app.badge}</span>
      <h3 class="sim-info-title">${app.title}</h3>
      <p class="sim-info-desc">${app.desc}</p>
      <div class="sim-arch-list">
        ${app.arch.map(item => `
          <div class="sim-arch-item">
            <i class="fa-solid fa-circle-check"></i>
            <span>${item}</span>
          </div>
        `).join('')}
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-primary btn-view-project" data-project="${appKey}">
          <span>Full Specs</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;

    // Attach interactive handlers inside simulated screen
    attachSimulatorInteractiveHandlers(appKey);
  }

  function attachSimulatorInteractiveHandlers(appKey) {
    if (appKey === 'skincare') {
      const skinChips = phoneViewport.querySelectorAll('#skinTypeChips .sim-chip');
      skinChips.forEach(chip => {
        chip.addEventListener('click', () => {
          skinChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          const type = chip.getAttribute('data-type');
          showToast(`Filtered skincare products for ${type} skin!`);
        });
      });

      const diagnoseBtn = phoneViewport.querySelector('#simDiagnoseBtn');
      if (diagnoseBtn) {
        diagnoseBtn.addEventListener('click', () => {
          showToast("Running Skin Diagnostic Questionnaire...");
        });
      }
    } else if (appKey === 'taskmanager') {
      const taskItems = phoneViewport.querySelectorAll('#simTaskList .sim-task-item');
      taskItems.forEach(item => {
        item.addEventListener('click', () => {
          item.classList.toggle('completed');
          const icon = item.querySelector('i');
          if (item.classList.contains('completed')) {
            icon.className = 'fa-regular fa-circle-check';
            icon.style.color = '#64FFDA';
          } else {
            icon.className = 'fa-regular fa-circle';
            icon.style.color = '#9CA3AF';
          }
          // Recalculate completed count
          const completedCount = phoneViewport.querySelectorAll('#simTaskList .sim-task-item.completed').length;
          const totalCount = taskItems.length;
          const progressTxt = phoneViewport.querySelector('#taskProgressTxt');
          const progressBar = phoneViewport.querySelector('#taskProgressBar');
          if (progressTxt) progressTxt.textContent = `${completedCount} of ${totalCount}`;
          if (progressBar) progressBar.style.width = `${(completedCount / totalCount) * 100}%`;
          showToast("Hive DB updated task completion state!");
        });
      });

      const addTaskBtn = phoneViewport.querySelector('#simAddTaskBtn');
      if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
          showToast("Added new task entry to Hive Local Database!");
        });
      }
    } else if (appKey === 'weather') {
      const cityBtns = phoneViewport.querySelectorAll('#simCityBtns .sim-chip');
      cityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          cityBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const temp = btn.getAttribute('data-temp');
          const desc = btn.getAttribute('data-desc');
          const city = btn.getAttribute('data-city');

          const tempEl = phoneViewport.querySelector('#simWeatherTemp');
          const descEl = phoneViewport.querySelector('#simWeatherDesc');
          const headerEl = phoneViewport.querySelector('.sim-app-title');

          if (tempEl) tempEl.textContent = temp;
          if (descEl) descEl.textContent = `${desc} • Humidity 50%`;
          if (headerEl) headerEl.innerHTML = `<i class="fa-solid fa-location-dot" style="color:#54C5F8;"></i> ${city}`;
          showToast(`Fetched REST API data for ${city}!`);
        });
      });
    } else if (appKey === 'notes') {
      const addNoteBtn = phoneViewport.querySelector('#simAddNoteBtn');
      if (addNoteBtn) {
        addNoteBtn.addEventListener('click', () => {
          showToast("Created new note in Hive Storage!");
        });
      }
    }
  }

  // Handle Simulator selector buttons
  simSelectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      simSelectorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const simKey = btn.getAttribute('data-sim');
      loadSimulatorApp(simKey);
    });
  });

  // Initial Simulator Load
  loadSimulatorApp('skincare');

  // ------------------------------------------------------------------------
  // 5. PROJECT CATEGORY FILTERING LOGIC
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('#projectFilters .filter-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 6. DART CLEAN ARCHITECTURE CODE SHOWCASE CONTROLLER
  // ------------------------------------------------------------------------
  const codeSnippetDisplay = document.getElementById('codeSnippetDisplay');
  const codeTabs = document.querySelectorAll('#codeTabs .code-tab');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  const codeSnippets = {
    provider: `// lib/providers/skincare_provider.dart
import 'package:flutter/foundation.dart';
import '../models/skincare_product.dart';
import '../repositories/skincare_repository.dart';

<span class="code-kw">class</span> <span class="code-type">SkincareProvider</span> <span class="code-kw">extends</span> <span class="code-type">ChangeNotifier</span> {
  <span class="code-kw">final</span> <span class="code-type">SkincareRepository</span> _repository;
  
  <span class="code-type">List</span>&lt;<span class="code-type">SkincareProduct</span>&gt; _products = [];
  <span class="code-type">String</span> _selectedSkinType = <span class="code-str">'Dry'</span>;
  <span class="code-type">bool</span> _isLoading = <span class="code-kw">false</span>;

  <span class="code-type">SkincareProvider</span>(<span class="code-kw">this</span>._repository);

  <span class="code-type">List</span>&lt;<span class="code-type">SkincareProduct</span>&gt; <span class="code-kw">get</span> products =&gt; _products;
  <span class="code-type">String</span> <span class="code-kw">get</span> selectedSkinType =&gt; _selectedSkinType;
  <span class="code-type">bool</span> <span class="code-kw">get</span> isLoading =&gt; _isLoading;

  <span class="code-type">Future</span>&lt;<span class="code-kw">void</span>&gt; <span class="code-func">fetchRecommendations</span>(<span class="code-type">String</span> skinType) <span class="code-kw">async</span> {
    _isLoading = <span class="code-kw">true</span>;
    _selectedSkinType = skinType;
    <span class="code-func">notifyListeners</span>();

    <span class="code-kw">try</span> {
      _products = <span class="code-kw">await</span> _repository.<span class="code-func">getProductsBySkinType</span>(skinType);
    } <span class="code-kw">catch</span> (e) {
      <span class="code-type">debugPrint</span>(<span class="code-str">'Error fetching recommendations: $e'</span>);
    } <span class="code-kw">finally</span> {
      _isLoading = <span class="code-kw">false</span>;
      <span class="code-func">notifyListeners</span>();
    }
  }
}`,
    hive: `// lib/services/hive_storage_service.dart
import 'package:hive_flutter/hive_flutter.dart';
import '../models/task_model.dart';

<span class="code-kw">class</span> <span class="code-type">HiveStorageService</span> {
  <span class="code-kw">static const</span> <span class="code-type">String</span> _taskBoxName = <span class="code-str">'tasksBox'</span>;

  <span class="code-type">Future</span>&lt;<span class="code-kw">void</span>&gt; <span class="code-func">initHive</span>() <span class="code-kw">async</span> {
    <span class="code-kw">await</span> <span class="code-type">Hive</span>.<span class="code-func">initFlutter</span>();
    <span class="code-type">Hive</span>.<span class="code-func">registerAdapter</span>(<span class="code-type">TaskModelAdapter</span>());
    <span class="code-kw">await</span> <span class="code-type">Hive</span>.<span class="code-func">openBox</span>&lt;<span class="code-type">TaskModel</span>&gt;(_taskBoxName);
  }

  <span class="code-type">Box</span>&lt;<span class="code-type">TaskModel</span>&gt; <span class="code-kw">get</span> _taskBox =&gt; <span class="code-type">Hive</span>.<span class="code-func">box</span>&lt;<span class="code-type">TaskModel</span>&gt;(_taskBoxName);

  <span class="code-type">List</span>&lt;<span class="code-type">TaskModel</span>&gt; <span class="code-func">getAllTasks</span>() {
    <span class="code-kw">return</span> _taskBox.values.<span class="code-func">toList</span>();
  }

  <span class="code-type">Future</span>&lt;<span class="code-kw">void</span>&gt; <span class="code-func">addTask</span>(<span class="code-type">TaskModel</span> task) <span class="code-kw">async</span> {
    <span class="code-kw">await</span> _taskBox.<span class="code-func">put</span>(task.id, task);
  }

  <span class="code-type">Future</span>&lt;<span class="code-kw">void</span>&gt; <span class="code-func">toggleTaskStatus</span>(<span class="code-type">String</span> id) <span class="code-kw">async</span> {
    <span class="code-kw">final</span> task = _taskBox.<span class="code-func">get</span>(id);
    <span class="code-kw">if</span> (task != <span class="code-kw">null</span>) {
      task.isCompleted = !task.isCompleted;
      <span class="code-kw">await</span> task.<span class="code-func">save</span>();
    }
  }
}`,
    api: `// lib/services/weather_api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/weather_model.dart';

<span class="code-kw">class</span> <span class="code-type">WeatherApiService</span> {
  <span class="code-kw">static const</span> <span class="code-type">String</span> _baseUrl = <span class="code-str">'https://api.openweathermap.org/data/2.5/weather'</span>;
  <span class="code-kw">final</span> <span class="code-type">String</span> _apiKey;

  <span class="code-type">WeatherApiService</span>({<span class="code-ann">required</span> <span class="code-type">String</span> apiKey}) : _apiKey = apiKey;

  <span class="code-type">Future</span>&lt;<span class="code-type">WeatherModel</span>&gt; <span class="code-func">fetchCityWeather</span>(<span class="code-type">String</span> cityName) <span class="code-kw">async</span> {
    <span class="code-kw">final</span> uri = <span class="code-type">Uri</span>.<span class="code-func">parse</span>(<span class="code-str">'$_baseUrl?q=$cityName&appid=$_apiKey&units=metric'</span>);
    <span class="code-kw">final</span> response = <span class="code-kw">await</span> http.<span class="code-func">get</span>(uri);

    <span class="code-kw">if</span> (response.statusCode == <span class="code-str">200</span>) {
      <span class="code-kw">final</span> <span class="code-type">Map</span>&lt;<span class="code-type">String</span>, <span class="code-type">dynamic</span>&gt; data = <span class="code-type">jsonDecode</span>(response.body);
      <span class="code-kw">return</span> <span class="code-type">WeatherModel</span>.<span class="code-func">fromJson</span>(data);
    } <span class="code-kw">else</span> {
      <span class="code-kw">throw</span> <span class="code-type">Exception</span>(<span class="code-str">'Failed to load weather data for $cityName'</span>);
    }
  }
}`,
    clean: `// lib/data/repositories/task_repository_impl.dart
import '../../domain/entities/task.dart';
import '../../domain/repositories/task_repository.dart';
import '../datasources/task_local_datasource.dart';

<span class="code-kw">class</span> <span class="code-type">TaskRepositoryImpl</span> <span class="code-kw">implements</span> <span class="code-type">TaskRepository</span> {
  <span class="code-kw">final</span> <span class="code-type">TaskLocalDataSource</span> localDataSource;

  <span class="code-type">TaskRepositoryImpl</span>({<span class="code-ann">required</span> <span class="code-kw">this</span>.localDataSource});

  <span class="code-ann">@override</span>
  <span class="code-type">Future</span>&lt;<span class="code-type">List</span>&lt;<span class="code-type">Task</span>&gt;&gt; <span class="code-func">getTasks</span>() <span class="code-kw">async</span> {
    <span class="code-kw">final</span> models = <span class="code-kw">await</span> localDataSource.<span class="code-func">getTasksFromStorage</span>();
    <span class="code-kw">return</span> models.<span class="code-func">map</span>((m) =&gt; m.<span class="code-func">toEntity</span>()).<span class="code-func">toList</span>();
  }

  <span class="code-ann">@override</span>
  <span class="code-type">Future</span>&lt;<span class="code-kw">void</span>&gt; <span class="code-func">saveTask</span>(<span class="code-type">Task</span> task) <span class="code-kw">async</span> {
    <span class="code-kw">final</span> model = <span class="code-type">TaskModel</span>.<span class="code-func">fromEntity</span>(task);
    <span class="code-kw">await</span> localDataSource.<span class="code-func">saveTask</span>(model);
  }
}`
  };

  let currentTabKey = 'provider';

  function loadCodeSnippet(tabKey) {
    currentTabKey = tabKey;
    if (codeSnippetDisplay && codeSnippets[tabKey]) {
      codeSnippetDisplay.innerHTML = codeSnippets[tabKey];
    }
  }

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-tab');
      loadCodeSnippet(key);
    });
  });

  // Initial code load
  loadCodeSnippet('provider');

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const rawText = codeSnippetDisplay.innerText;
      copyToClipboard(rawText, "Dart code snippet copied to clipboard!");
    });
  }

  // ------------------------------------------------------------------------
  // 7. RESUME MODAL & PRINT CONTROLLER
  // ------------------------------------------------------------------------
  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (navResumeBtn) navResumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ------------------------------------------------------------------------
  // 8. Detailed Project Specifications Data & Modal System
  // ------------------------------------------------------------------------
  const projectsData = {
    skincare: {
      title: "Skin Care Advisor",
      badge: "Mobile Application",
      image: "assets/skincare.png",
      description: "A comprehensive Flutter application designed to assist users in identifying their skin type and finding tailored skincare product recommendations. Built with clean architecture and reactive UI components.",
      features: [
        "Interactive skin type diagnostic test and questionnaire.",
        "Personalized product recommendation engine based on skin concerns.",
        "Clean, intuitive product details view with ingredient breakdowns.",
        "State management implemented using the Provider pattern."
      ],
      tech: ["Flutter", "Dart", "Provider", "Material Design", "JSON Local Specs"],
      link: "https://github.com/muhammadabueid"
    },
    taskmanager: {
      title: "Task Manager App",
      badge: "Productivity Tool",
      image: "assets/taskmanager.png",
      description: "A productivity mobile app built with Flutter that provides seamless offline task tracking, custom category management, and progress statistics with instant persistent storage.",
      features: [
        "Offline-first architecture using Hive local database.",
        "Task prioritization, category tagging, and due-date scheduling.",
        "Dark theme & light theme auto-adaptation.",
        "Responsive grid layout designed for phone and tablet screens."
      ],
      tech: ["Flutter", "Dart", "Hive DB", "Provider", "Clean Architecture"],
      link: "https://github.com/muhammadabueid"
    },
    weather: {
      title: "Weather Application",
      badge: "API Integration",
      image: "assets/weather.png",
      description: "Real-time weather forecast application retrieving live meteorological data from OpenWeather REST API. Displays hourly forecasts, humidity, wind speeds, and UV indices.",
      features: [
        "Live location-based weather updates via REST API.",
        "Hourly and 7-day extended weather forecast cards.",
        "Search functionality for major global cities.",
        "Dynamic UI gradient shifts matching weather conditions."
      ],
      tech: ["Flutter", "REST API", "JSON Parsing", "Http Package", "Geolocation"],
      link: "https://github.com/muhammadabueid"
    },
    notes: {
      title: "Notes Application",
      badge: "Local Data Storage",
      image: "assets/notes.png",
      description: "A high-performance note-taking app prioritizing user privacy and quick access. Uses Hive for ultra-fast disk read/writes and supports note categorization and full-text search.",
      features: [
        "Ultra-fast local CRUD operations with Hive database.",
        "Color-coded note cards and tag filtering.",
        "Real-time search across note titles and body content.",
        "Minimalist aesthetic with focus on distraction-free writing."
      ],
      tech: ["Flutter", "Dart", "Hive DB", "Provider", "Material UI"],
      link: "https://github.com/muhammadabueid"
    },
    portfolio: {
      title: "Portfolio Website",
      badge: "Web Application",
      image: "assets/taskmanager.png",
      description: "A modern, highly aesthetic personal portfolio web application designed for desktop, tablet, and mobile devices showcasing mobile development expertise.",
      features: [
        "Custom design system with dark mode & Flutter cyan glows.",
        "Interactive simulated mobile smartphone frame hero visual.",
        "Accessible, high-performance HTML5, CSS3, and JavaScript implementation.",
        "Client-side form validation and modal viewer system."
      ],
      tech: ["HTML5", "Vanilla CSS", "JavaScript ES6+", "Responsive Design"],
      link: "https://github.com/muhammadabueid"
    }
  };

  // Re-bind modal buttons dynamically (including dynamically created ones in simulator)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-project]');
    if (btn) {
      const key = btn.getAttribute('data-project');
      const project = projectsData[key];
      if (project) {
        openProjectModal(project);
      }
    }
  });

  function openProjectModal(project) {
    modalBody.innerHTML = `
      <div class="modal-project-header">
        <span class="modal-badge">${project.badge}</span>
        <h2 class="modal-title">${project.title}</h2>
      </div>

      <div class="modal-img-wrapper" style="margin: 1.5rem 0; border-radius: var(--radius-md); overflow: hidden; max-height: 280px;">
        <img src="${project.image}" alt="${project.title} Screenshot" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <p class="modal-description" style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.65;">
        ${project.description}
      </p>

      <div class="modal-features-section" style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.05rem; margin-bottom: 0.75rem; color: var(--flutter-cyan);">Key Highlights & Features</h4>
        <ul style="padding-left: 1.25rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.4rem;">
          ${project.features.map(feat => `<li>${feat}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-tech-stack" style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.9rem; margin-bottom: 0.6rem; color: var(--text-muted);">Technologies Used</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${project.tech.map(t => `<span style="background: rgba(84,197,248,0.1); border: 1px solid rgba(84,197,248,0.3); color: var(--flutter-cyan); font-family: var(--font-mono); font-size: 0.8rem; padding: 0.3rem 0.7rem; border-radius: var(--radius-sm);">${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-actions" style="display: flex; gap: 1rem; margin-top: 2rem;">
        <a href="${project.link}" target="_blank" rel="noopener" class="btn btn-primary" style="flex: 1; justify-content: center;">
          <span>Explore Source Code on GitHub</span>
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. Contact Form Handling & Validation
  // ------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      function validateField(input, condition) {
        const group = input.closest('.form-group');
        if (condition) {
          group.classList.remove('error');
          return true;
        } else {
          group.classList.add('error');
          return false;
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const isNameValid = validateField(nameInput, nameInput.value.trim().length > 0);
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length > 0);
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length > 0);

      isValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (isValid) {
        showToast("Thank you! Your message has been sent successfully.");
        contactForm.reset();
      }
    });
  }

});
