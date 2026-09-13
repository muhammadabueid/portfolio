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
    azkar: {
      badge: "Islamic App • Flutter & BLoC",
      title: "Azkar App",
      desc: "A cross-platform Flutter app providing daily Islamic Azkar and supplications. Features a clean, minimal UI with categorized Azkar, counter functionality, and offline-first architecture.",
      arch: [
        "BLoC state management for reactive prayer counter",
        "Offline-first with local Hive storage for Azkar data",
        "Clean UI with dark/light mode and Arabic text rendering"
      ],
      screenHtml: `
        <div class="sim-app-header">
          <div class="sim-app-title"><i class="fa-solid fa-moon" style="color:#54C5F8;"></i> Azkar App</div>
          <i class="fa-solid fa-gear" style="font-size:0.8rem; opacity:0.6;"></i>
        </div>
        <div class="sim-chips-row" id="azkarCategoryChips">
          <span class="sim-chip active" data-cat="Morning">Morning</span>
          <span class="sim-chip" data-cat="Evening">Evening</span>
          <span class="sim-chip" data-cat="Sleep">Sleep</span>
          <span class="sim-chip" data-cat="Prayer">Prayer</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.3rem;" id="azkarList">
          <div class="sim-card" style="border-right:3px solid #54C5F8; text-align:right;">
            <div style="font-weight:700; font-size:0.82rem; color:#E2E8F0; direction:rtl;">أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّه</div>
            <div style="font-size:0.7rem; color:#9CA3AF; margin-top:0.2rem;">Morning Azkar • 1×</div>
            <div id="azkarCounter" style="font-weight:700; font-size:0.85rem; color:#54C5F8; margin-top:0.3rem;">Count: 0 / 1</div>
          </div>
          <div class="sim-card" style="border-right:3px solid #64FFDA; text-align:right;">
            <div style="font-weight:700; font-size:0.82rem; color:#E2E8F0; direction:rtl;">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</div>
            <div style="font-size:0.7rem; color:#9CA3AF; margin-top:0.2rem;">Morning Azkar • 100×</div>
          </div>
        </div>
        <button id="simAzkarCountBtn" style="margin-top:auto; background:linear-gradient(135deg, #54C5F8, #01B5D8); color:#0A0E17; border:none; padding:0.55rem; border-radius:8px; font-weight:700; font-size:0.8rem; cursor:pointer;">
          Tap to Count <i class="fa-solid fa-hand-point-up"></i>
        </button>
      `
    },
    motora: {
      badge: "Roadside Assistance • Firebase & Maps",
      title: "Motora App",
      desc: "A smart Flutter-based roadside assistance platform connecting drivers with verified mechanics and tow operators through real-time location, intelligent matching, and seamless service management.",
      arch: [
        "Real-time location tracking with Google Maps API",
        "Firebase Firestore for live mechanic/driver matching",
        "BLoC pattern for complex service request state flows"
      ],
      screenHtml: `
        <div class="sim-app-header">
          <div class="sim-app-title"><i class="fa-solid fa-car-side" style="color:#54C5F8;"></i> Motora</div>
          <span style="background:rgba(100,255,218,0.2); color:#64FFDA; font-size:0.65rem; padding:0.1rem 0.4rem; border-radius:99px; font-weight:600;">LIVE</span>
        </div>
        <div style="background:rgba(84,197,248,0.08); border:1px solid rgba(84,197,248,0.2); border-radius:10px; padding:0.6rem; text-align:center;">
          <i class="fa-solid fa-location-dot" style="color:#54C5F8; font-size:1.2rem;"></i>
          <div style="font-size:0.75rem; color:#E2E8F0; font-weight:600; margin-top:0.2rem;">Damanhur, Egypt</div>
          <div style="font-size:0.65rem; color:#9CA3AF;">GPS Active • Searching nearby...</div>
        </div>
        <div style="font-size:0.72rem; color:#9CA3AF; margin-top:0.4rem;">Available Mechanics Nearby:</div>
        <div style="display:flex; flex-direction:column; gap:0.4rem;" id="simMechanicList">
          <div class="sim-card" style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;" data-name="Ahmed" data-dist="0.8 km">
            <i class="fa-solid fa-wrench" style="color:#54C5F8; font-size:1rem;"></i>
            <div style="flex:1;">
              <div style="font-size:0.8rem; font-weight:600; color:#E2E8F0;">Ahmed (Mechanic)</div>
              <div style="font-size:0.67rem; color:#9CA3AF;">0.8 km away • ★ 4.9</div>
            </div>
            <span style="font-size:0.65rem; background:rgba(100,255,218,0.15); color:#64FFDA; padding:0.15rem 0.4rem; border-radius:4px;">Available</span>
          </div>
          <div class="sim-card" style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;" data-name="Karim" data-dist="1.5 km">
            <i class="fa-solid fa-truck-pickup" style="color:#A855F7; font-size:1rem;"></i>
            <div style="flex:1;">
              <div style="font-size:0.8rem; font-weight:600; color:#E2E8F0;">Karim (Tow Truck)</div>
              <div style="font-size:0.67rem; color:#9CA3AF;">1.5 km away • ★ 4.7</div>
            </div>
            <span style="font-size:0.65rem; background:rgba(168,85,247,0.15); color:#A855F7; padding:0.15rem 0.4rem; border-radius:4px;">Available</span>
          </div>
        </div>
        <button id="simRequestBtn" style="margin-top:auto; background:linear-gradient(135deg, #A855F7, #54C5F8); color:#FFF; border:none; padding:0.55rem; border-radius:8px; font-weight:700; font-size:0.8rem; cursor:pointer;">
          Request Assistance <i class="fa-solid fa-paper-plane"></i>
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
    if (appKey === 'azkar') {
      const categoryChips = phoneViewport.querySelectorAll('#azkarCategoryChips .sim-chip');
      categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
          categoryChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          showToast(`Loaded ${chip.getAttribute('data-cat')} Azkar!`);
        });
      });

      let count = 0;
      const countBtn = phoneViewport.querySelector('#simAzkarCountBtn');
      const counterDisplay = phoneViewport.querySelector('#azkarCounter');
      if (countBtn) {
        countBtn.addEventListener('click', () => {
          count = (count + 1) % 2;
          if (counterDisplay) counterDisplay.textContent = `Count: ${count} / 1`;
          if (count === 1) showToast('Azkar completed! ✓');
        });
      }
    } else if (appKey === 'motora') {
      const mechanicItems = phoneViewport.querySelectorAll('#simMechanicList .sim-card');
      mechanicItems.forEach(item => {
        item.addEventListener('click', () => {
          const name = item.getAttribute('data-name');
          const dist = item.getAttribute('data-dist');
          showToast(`Connecting to ${name} (${dist})...`);
        });
      });

      const requestBtn = phoneViewport.querySelector('#simRequestBtn');
      if (requestBtn) {
        requestBtn.addEventListener('click', () => {
          showToast('Assistance request sent via Firebase!');
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
  loadSimulatorApp('azkar');

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
    provider: `// lib/blocs/azkar_bloc.dart
import 'package:flutter_bloc/flutter_bloc.dart';
import '../models/azkar_model.dart';
import '../repositories/azkar_repository.dart';

<span class="code-kw">class</span> <span class="code-type">AzkarBloc</span> <span class="code-kw">extends</span> <span class="code-type">Bloc</span>&lt;<span class="code-type">AzkarEvent</span>, <span class="code-type">AzkarState</span>&gt; {
  <span class="code-kw">final</span> <span class="code-type">AzkarRepository</span> _repository;

  <span class="code-type">AzkarBloc</span>(<span class="code-kw">this</span>._repository) : <span class="code-kw">super</span>(<span class="code-type">AzkarInitial</span>()) {
    <span class="code-func">on</span>&lt;<span class="code-type">LoadAzkarByCategory</span>&gt;(_onLoadAzkar);
    <span class="code-func">on</span>&lt;<span class="code-type">IncrementAzkarCount</span>&gt;(_onIncrement);
  }

  <span class="code-type">Future</span>&lt;<span class="code-kw">void</span>&gt; <span class="code-func">_onLoadAzkar</span>(
    <span class="code-type">LoadAzkarByCategory</span> event, <span class="code-type">Emitter</span> emit) <span class="code-kw">async</span> {
    emit(<span class="code-type">AzkarLoading</span>());
    <span class="code-kw">final</span> list = <span class="code-kw">await</span> _repository.<span class="code-func">fetchByCategory</span>(event.category);
    emit(<span class="code-type">AzkarLoaded</span>(azkarList: list));
  }

  <span class="code-kw">void</span> <span class="code-func">_onIncrement</span>(<span class="code-type">IncrementAzkarCount</span> event, <span class="code-type">Emitter</span> emit) {
    <span class="code-kw">if</span> (state <span class="code-kw">is</span> <span class="code-type">AzkarLoaded</span>) {
      <span class="code-kw">final</span> s = state <span class="code-kw">as</span> <span class="code-type">AzkarLoaded</span>;
      emit(s.<span class="code-func">copyWith</span>(count: s.count + 1));
    }
  }
}`,
    firebase: `// lib/services/firebase_service.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/mechanic_model.dart';

<span class="code-kw">class</span> <span class="code-type">FirebaseService</span> {
  <span class="code-kw">final</span> <span class="code-type">FirebaseFirestore</span> _db = <span class="code-type">FirebaseFirestore</span>.<span class="code-func">instance</span>;

  <span class="code-type">Stream</span>&lt;<span class="code-type">List</span>&lt;<span class="code-type">MechanicModel</span>&gt;&gt; <span class="code-func">getNearbyMechanics</span>(<span class="code-type">GeoPoint</span> location) {
    <span class="code-kw">return</span> _db
      .<span class="code-func">collection</span>(<span class="code-str">'mechanics'</span>)
      .<span class="code-func">where</span>(<span class="code-str">'isAvailable'</span>, isEqualTo: <span class="code-kw">true</span>)
      .<span class="code-func">snapshots</span>()
      .<span class="code-func">map</span>((snap) => snap.docs
        .<span class="code-func">map</span>((d) => <span class="code-type">MechanicModel</span>.<span class="code-func">fromFirestore</span>(d))
        .<span class="code-func">toList</span>());
  }

  <span class="code-type">Future</span>&lt;<span class="code-kw">void</span>&gt; <span class="code-func">createAssistanceRequest</span>(<span class="code-type">RequestModel</span> req) <span class="code-kw">async</span> {
    <span class="code-kw">await</span> _db
      .<span class="code-func">collection</span>(<span class="code-str">'requests'</span>)
      .<span class="code-func">add</span>(req.<span class="code-func">toMap</span>());
  }
}`,
    api: `// lib/repositories/motora_repository.dart
import '../datasources/remote/motora_remote_datasource.dart';
import '../datasources/local/motora_local_datasource.dart';
import '../../domain/entities/request_entity.dart';

<span class="code-kw">class</span> <span class="code-type">MotoraRepository</span> {
  <span class="code-kw">final</span> <span class="code-type">MotoraRemoteDataSource</span> remote;
  <span class="code-kw">final</span> <span class="code-type">MotoraLocalDataSource</span> local;

  <span class="code-type">MotoraRepository</span>({<span class="code-ann">required</span> <span class="code-kw">this</span>.remote, <span class="code-ann">required</span> <span class="code-kw">this</span>.local});

  <span class="code-type">Future</span>&lt;<span class="code-type">RequestEntity</span>&gt; <span class="code-func">submitRequest</span>(<span class="code-type">RequestEntity</span> entity) <span class="code-kw">async</span> {
    <span class="code-kw">try</span> {
      <span class="code-kw">final</span> result = <span class="code-kw">await</span> remote.<span class="code-func">sendRequest</span>(entity);
      <span class="code-kw">await</span> local.<span class="code-func">cacheRequest</span>(result);
      <span class="code-kw">return</span> result;
    } <span class="code-kw">catch</span> (_) {
      <span class="code-kw">return</span> local.<span class="code-func">getLastCachedRequest</span>();
    }
  }
}`,
    clean: `// lib/data/repositories/azkar_repository_impl.dart
import '../../domain/entities/azkar_entity.dart';
import '../../domain/repositories/azkar_repository.dart';
import '../datasources/azkar_local_datasource.dart';

<span class="code-kw">class</span> <span class="code-type">AzkarRepositoryImpl</span> <span class="code-kw">implements</span> <span class="code-type">AzkarRepository</span> {
  <span class="code-kw">final</span> <span class="code-type">AzkarLocalDataSource</span> localDataSource;

  <span class="code-type">AzkarRepositoryImpl</span>({<span class="code-ann">required</span> <span class="code-kw">this</span>.localDataSource});

  <span class="code-ann">@override</span>
  <span class="code-type">Future</span>&lt;<span class="code-type">List</span>&lt;<span class="code-type">AzkarEntity</span>&gt;&gt; <span class="code-func">fetchByCategory</span>(<span class="code-type">String</span> category) <span class="code-kw">async</span> {
    <span class="code-kw">final</span> models = <span class="code-kw">await</span> localDataSource.<span class="code-func">getAzkarByCategory</span>(category);
    <span class="code-kw">return</span> models.<span class="code-func">map</span>((m) => m.<span class="code-func">toEntity</span>()).<span class="code-func">toList</span>();
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
    azkar: {
      title: "Azkar App",
      badge: "Mobile Application",
      image: "assets/Azkar_Home.png",
      description: "A cross-platform Flutter mobile application.",
      features: [
        "Cross-platform compatibility for Android & iOS.",
        "Clean UI/UX design.",
        "Responsive and adaptable layout."
      ],
      tech: ["Flutter", "Dart", "Material UI"],
      link: "https://github.com/muhammadabueid/flutter-app"
    },
    motora: {
      title: "Motora",
      badge: "Roadside Assistance Platform",
      image: "assets/motora_home.jpeg",
      description: "A smart Flutter-based roadside assistance platform connecting drivers with verified mechanics and tow operators through real-time location, intelligent matching, tracking, and seamless service management.",
      features: [
        "Real-time location tracking.",
        "Intelligent matching with mechanics and tow operators.",
        "Seamless service management.",
        "Built with clean architecture."
      ],
      tech: ["Flutter", "Dart", "Maps API", "Real-time Tracking"],
      link: "https://github.com/ahmedmetwall/Motora"
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

      <div class="modal-img-wrapper" style="margin: 1.5rem auto; display: flex; justify-content: center;">
        <div class="phone-frame" style="transform: scale(0.85); transform-origin: top center; margin-bottom: -50px;">
          <!-- Top Hardware Notch -->
          <div class="phone-notch">
            <div class="speaker-earpiece"></div>
            <div class="camera-lens"></div>
          </div>
          
          <!-- Phone Status Bar -->
          <div class="phone-status-bar">
            <span class="status-time">09:41</span>
            <div class="status-icons">
              <i class="fa-solid fa-signal"></i>
              <i class="fa-solid fa-wifi"></i>
              <i class="fa-solid fa-battery-three-quarters"></i>
            </div>
          </div>

          <!-- DYNAMIC INTERACTIVE SCREEN DISPLAY -->
          <div class="phone-screen-viewport" style="background: url('${project.image}') center/cover no-repeat;">
          </div>

          <!-- Bottom Home Indicator -->
          <div class="phone-home-indicator"></div>
        </div>
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
