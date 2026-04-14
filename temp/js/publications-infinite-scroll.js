// Publications Carousel with updated QuantLab data
(function() {
const publicationsData = [
  {
    "id": 1,
    "title": "Stone Tools in Shape-Space: Evaluating Geometric Morphometric Tangent Assumptions",
    "authors": "Erik Otárola-Castillo",
    "year": "2026",
    "category": "Methods",
    "theme": "Geometric morphometrics and shape-space theory",
    "thumbnail": "img/publications/pub_01.jpg",
    "keywords": "shape-space, geometric morphometrics, tangent space, lithics, archaeological method",
    "link": "https://scholar.google.com/citations?hl=en&user=g_SNDWoAAAAJ",
    "abstract": "A Journal of Archaeological Method and Theory manuscript in review that evaluates whether standard geometric morphometric tangent-space assumptions hold for lithic shape analysis."
  },
  {
    "id": 2,
    "title": "The Spatiotemporal Distribution of Terminal Pleistocene/Early Holocene Stemmed Points across Western North America",
    "authors": "E. J. Knell, M. E. Hill, R. L. Rosencrance, Erik Otárola-Castillo, J. C. Mueller, and J. M. Erlandson",
    "year": "2026",
    "category": "Americas",
    "theme": "Western Stemmed Tradition and Paleoindian archaeology",
    "thumbnail": "img/publications/pub_02.jpg",
    "keywords": "Western North America, stemmed points, Terminal Pleistocene, Early Holocene, Paleoamerican Odyssey",
    "link": "https://scholar.google.com/citations?hl=en&user=g_SNDWoAAAAJ",
    "abstract": "A forthcoming chapter on the geography and chronology of stemmed points across western North America and their relevance to early peopling debates."
  },
  {
    "id": 3,
    "title": "Significant Northwest Shift in Suitable Climate Expected for North American Bison by the Year 2100",
    "authors": "A. B. Shupinski, J. M. Martin, Erik Otárola-Castillo, M. E. Hill Jr., C. Widga, J. L. Rudnik, and R. A. Short",
    "year": "2026",
    "category": "Americas",
    "theme": "Climate modeling and conservation paleobiology",
    "thumbnail": "img/publications/pub_03.jpg",
    "keywords": "bison, climate change, species distribution, North America, future habitat",
    "link": "https://doi.org/10.3389/fevo.2025.1695457",
    "abstract": "Projects a major northwest shift in climatically suitable bison habitat by 2100 and connects archaeological baselines to future-facing ecological modeling."
  },
  {
    "id": 4,
    "title": "Multidisciplinary Theory in Anthropology",
    "authors": "M. Anderson and Erik Otárola-Castillo",
    "year": "2025",
    "category": "Methods",
    "theme": "Anthropological theory across disciplines",
    "thumbnail": "img/publications/pub_04.jpg",
    "keywords": "anthropological theory, multidisciplinary theory, synthesis, methods",
    "link": "https://scholar.google.com/citations?hl=en&user=g_SNDWoAAAAJ",
    "abstract": "A Bloomsbury chapter that situates anthropology within broader multidisciplinary theory-building and interpretive practice."
  },
  {
    "id": 5,
    "title": "The Bayesian Inferential Paradigm in Archaeology",
    "authors": "Erik Otárola-Castillo, M. G. Torquato, and Caitlin Buck",
    "year": "2023",
    "category": "Methods",
    "theme": "Bayesian reasoning beyond chronology",
    "thumbnail": "img/publications/pub_05.jpg",
    "keywords": "Bayesian inference, archaeology, probability, hypothesis testing",
    "link": "https://doi.org/10.1002/9781119592112.ch59",
    "abstract": "Presents Bayesian inference as a general archaeological framework rather than a tool limited to chronology."
  },
  {
    "id": 6,
    "title": "A New Approach to the Quantitative Analysis of Bone Surface Modifications: The Bowser Road Mastodon and Implications of the Data for Understanding Human-Megafauna Interactions in North America",
    "authors": "Erik Otárola-Castillo, M. G. Torquato, T. L. Keevil, A. L. May, S. N. Coon, E. Stow, J. Harris, C. W. Marean, M. I. Eren, and J. J. Shea",
    "year": "2023",
    "category": "Methods",
    "theme": "Quantitative taphonomy and archaeological method",
    "thumbnail": "img/publications/pub_06.jpg",
    "keywords": "bone surface modifications, taphonomy, mastodon, morphometrics, quantitative archaeology",
    "link": "https://doi.org/10.1007/s10816-022-09583-5",
    "abstract": "Builds a quantitative framework for measuring bone surface modifications and applies it to the Bowser Road mastodon."
  },
  {
    "id": 7,
    "title": "Function, Style, and Standardization: Is the Proximal or Distal End of a Middle Stone Age Point More Variable?",
    "authors": "B. J. Schoville, P. Chiwara-Maenzanise, Erik Otárola-Castillo, and J. Wilkins",
    "year": "2023",
    "category": "Africa",
    "theme": "Quantitative lithic variability",
    "thumbnail": "img/publications/pub_07.jpg",
    "keywords": "Middle Stone Age, points, variability, standardization, morphometrics",
    "link": "https://doi.org/10.1080/01977261.2023.2233167",
    "abstract": "Compares proximal and distal point variation to distinguish functional constraint from style and assess standardization in Middle Stone Age points."
  },
  {
    "id": 8,
    "title": "Urbanization, Migration, and Indigenous Health in Peru",
    "authors": "A. Veile, R. Chávez Cabello, Erik Otárola-Castillo, V. Rojas Bravo, and G. Turner",
    "year": "2023",
    "category": "Human Evolution",
    "theme": "Biocultural health and migration",
    "thumbnail": "img/publications/pub_08.jpg",
    "keywords": "Peru, migration, urbanization, indigenous health, biocultural anthropology",
    "link": "https://doi.org/10.1002/ajhb.23904",
    "abstract": "Examines how urbanization and migration shape indigenous health outcomes in Peru."
  },
  {
    "id": 9,
    "title": "Intensification Mechanisms Driving Dietary Change among the Great Plains Big Game Hunters of North America",
    "authors": "Erik Otárola-Castillo, M. G. Torquato, and M. E. Hill",
    "year": "2022",
    "category": "Americas",
    "theme": "Great Plains foraging and dietary change",
    "thumbnail": "img/publications/pub_09.jpg",
    "keywords": "Great Plains, intensification, diet, big game hunters, North America",
    "link": "https://doi.org/10.3167/9781800734296",
    "abstract": "Develops mechanisms for understanding dietary change and intensification among Great Plains big-game hunters in North America."
  },
  {
    "id": 10,
    "title": "Beyond Chronology, Using Bayesian Inference to Evaluate Hypotheses in Archaeology",
    "authors": "Erik Otárola-Castillo, M. G. Torquato, J. Wolfhagen, M. E. Hill, and C. E. Buck",
    "year": "2022",
    "category": "Methods",
    "theme": "Bayesian inference and archaeological reasoning",
    "thumbnail": "img/publications/pub_10.jpg",
    "keywords": "bayesian inference, archaeology, chronology, hypothesis testing",
    "link": "https://doi.org/10.1017/aap.2022.10",
    "abstract": "Shows how Bayesian inference can be used to evaluate archaeological hypotheses directly rather than being restricted to dating."
  },
  {
    "id": 11,
    "title": "Integrated Evidence-Based Extent of Occurrence for North American Bison (Bison bison) since 1500 CE and Before",
    "authors": "J. M. Martin, R. A. Short, G. E. Plumb, L. Markewicz, D. H. Van Vuren, B. Wehus-Tow, Erik Otárola-Castillo, and M. E. Hill Jr.",
    "year": "2022",
    "category": "Americas",
    "theme": "Historical ecology and faunal baselines",
    "thumbnail": "img/publications/pub_11.jpg",
    "keywords": "bison, historical ecology, baseline reconstruction, North America",
    "link": "https://doi.org/10.1002/ecy.3864",
    "abstract": "Builds an evidence-based baseline for historical and pre-1500 occurrence of bison in North America."
  },
  {
    "id": 12,
    "title": "Does the Evidence at Arroyo del Vizcaíno (Uruguay) Support the Claim of Human Occupation 30,000 Years Ago?",
    "authors": "J. A. Holcomb, R. D. Mandel, Erik Otárola-Castillo, K. Rademaker, R. L. Rosencrance, K. N. McDonough, S. Miller, and B. T. Wygal",
    "year": "2022",
    "category": "Americas",
    "theme": "Early peopling and evidentiary standards",
    "thumbnail": "img/publications/pub_12.jpg",
    "keywords": "Uruguay, PaleoAmerica, early peopling, evidentiary evaluation",
    "link": "https://doi.org/10.1080/20555563.2022.2135476",
    "abstract": "Critically evaluates claims for extremely early human occupation in Uruguay and wider standards of archaeological evidence."
  },
  {
    "id": 13,
    "title": "Household Sanitary Conditions Modulate Associations between Birth Mode and Child Growth",
    "authors": "A. Veile, K. L. Kramer, and Erik Otárola-Castillo",
    "year": "2022",
    "category": "Human Evolution",
    "theme": "Human biology, growth, and health",
    "thumbnail": "img/publications/pub_13.jpg",
    "keywords": "child growth, sanitation, birth mode, human biology",
    "link": "https://doi.org/10.1002/ajpa.24563",
    "abstract": "Shows that household sanitary conditions modulate associations between birth mode and child growth."
  },
  {
    "id": 14,
    "title": "Machine Learning, Bootstrapping, Null Models and Why We Are Still Not 100% Sure Which Marks Were Made by Crocodiles",
    "authors": "S. McPherron, W. Archer, Erik Otárola-Castillo, M. G. Torquato, and T. Keevil",
    "year": "2022",
    "category": "Methods",
    "theme": "Machine learning in paleoanthropology",
    "thumbnail": "img/publications/pub_14.jpg",
    "keywords": "machine learning, crocodiles, null models, bone surface modifications",
    "link": "https://doi.org/10.1016/j.jhevol.2021.103071",
    "abstract": "Uses machine learning, resampling, and null-model logic to test attribution of bone surface marks while emphasizing uncertainty."
  },
  {
    "id": 15,
    "title": "Parts and Wholes: Reduction Allometry and Modularity in Experimental Folsom Points",
    "authors": "M. J. Shott and Erik Otárola-Castillo",
    "year": "2022",
    "category": "Americas",
    "theme": "Lithic technology in North America",
    "thumbnail": "img/publications/pub_15.jpg",
    "keywords": "Folsom, lithics, modularity, allometry, North America",
    "link": "https://doi.org/10.1017/aaq.2021.62",
    "abstract": "Uses experimental Folsom points to evaluate reduction, allometry, and modularity in Paleoindian technology."
  },
  {
    "id": 16,
    "title": "The Marine Isotope Stage 5 (∼105 ka) lithic assemblage from Ga-Mohana Hill North Rockshelter and insights into social transmission across the Kalahari Basin and its environs",
    "authors": "Precious Chiwara-Maenzanise, Benjamin J. Schoville, Yonatan Sahle, and Jayne Wilkins",
    "year": "2025",
    "category": "Africa",
    "theme": "Kalahari lithic systems and social transmission",
    "thumbnail": "img/publications/pub_16.jpg",
    "keywords": "MIS 5, Kalahari, social transmission, lithic technology",
    "link": "https://doi.org/10.1016/j.jhevol.2025.103654",
    "abstract": "Analyzes lithic technology at Ga-Mohana Hill North Rockshelter and argues that technological similarities across MIS 5 sites reflect shared traditions and regional connectivity in the Kalahari Basin."
  },
  {
    "id": 17,
    "title": "Ga-Mohana Hill South Rock Shelter: A late Holocene hunter-gatherer rock shelter site in the Southern Kalahari Basin",
    "authors": "Jayne Wilkins, Benjamin J. Schoville, Kyle S. Brown, Emma Loftus, Robyn Pickering, Sechaba Maape, Jessica von der Meden, Abenicia Henderson, and David Morris",
    "year": "2025",
    "category": "Africa",
    "theme": "Field archaeology and southern Kalahari occupation",
    "thumbnail": "img/publications/pub_17.jpg",
    "keywords": "Ga-Mohana Hill, Southern Kalahari, hunter-gatherers, rock shelter",
    "link": "https://social-science.uq.edu.au/profile/2023/benjamin-schoville",
    "abstract": "Introduces Ga-Mohana Hill South Rock Shelter as a late Holocene hunter-gatherer site in the southern Kalahari Basin and extends the broader Ga-Mohana research program."
  },
  {
    "id": 18,
    "title": "Did climate change make Homo sapiens innovative, and if yes, how? Debated perspectives on the African Pleistocene record",
    "authors": "Jayne Wilkins and Benjamin J. Schoville",
    "year": "2024",
    "category": "Australia",
    "theme": "Australia-linked synthesis on climate and innovation",
    "thumbnail": "img/publications/pub_18.jpg",
    "keywords": "Australia collaborations, climate change, innovation, Homo sapiens, Africa",
    "link": "https://doi.org/10.1016/j.qsa.2024.100179",
    "abstract": "Synthesizes competing explanations for the relationship between climate variability and innovation in the African Pleistocene through a collaboration anchored in Australian institutional networks."
  },
  {
    "id": 19,
    "title": "The Tswalu Kalahari Reserve, South Africa",
    "authors": "Benjamin J. Schoville",
    "year": "2023",
    "category": "Australia",
    "theme": "Australia-linked handbook and field synthesis",
    "thumbnail": "img/publications/pub_19.jpg",
    "keywords": "Tswalu, Kalahari, handbook, Australian collaborations",
    "link": "https://doi.org/10.1007/978-3-031-20290-2_111",
    "abstract": "A handbook chapter that synthesizes the Tswalu Kalahari Reserve research context and helps situate the broader field program for a wider comparative audience."
  },
  {
    "id": 20,
    "title": "The drone, the snake, and the crystal: Manifesting potency in 3D digital replicas of living heritage and archaeological places",
    "authors": "Stephen Wessels, Sechaba Maape, Benjamin J. Schoville, and Jayne Wilkins",
    "year": "2022",
    "category": "Australia",
    "theme": "Digital heritage and archaeological places",
    "thumbnail": "img/publications/pub_20.jpg",
    "keywords": "digital heritage, 3D replicas, living heritage, archaeology",
    "link": "https://doi.org/10.1007/s11759-022-09460-3",
    "abstract": "Explores how 3D digital replicas intersect with living heritage, place, and potency, showing that documentation is also a social and ethical practice."
  },
  {
    "id": 21,
    "title": "Holding your shape: controlled tip fracture experiments on cast porcelain points",
    "authors": "Liam Neill, Chris Clarkson, and Benjamin Schoville",
    "year": "2022",
    "category": "Australia",
    "theme": "Experimental archaeology and fracture mechanics",
    "thumbnail": "img/publications/pub_21.jpg",
    "keywords": "fracture experiments, porcelain points, experimental archaeology, Australia",
    "link": "https://doi.org/10.1016/j.jasrep.2022.103505",
    "abstract": "Uses controlled fracture experiments on cast porcelain points to study breakage, standardization, and the mechanics of point failure in an Australian collaboration setting."
  },
  {
    "id": 22,
    "title": "Tufas indicate prolonged periods of water availability linked to human occupation in the southern Kalahari",
    "authors": "Jessica von der Meden, Robyn Pickering, Benjamin J. Schoville, Helen Green, Rieneke Weij, John Hellstrom, Alan Greig, Jon Woodhead, Wendy Khumalo, and Jayne Wilkins",
    "year": "2022",
    "category": "Africa",
    "theme": "Paleoenvironment and occupation history",
    "thumbnail": "img/publications/pub_22.jpg",
    "keywords": "tufas, water availability, human occupation, Kalahari",
    "link": "https://doi.org/10.1371/journal.pone.0270104",
    "abstract": "Shows that tufa deposits can be used to reconstruct long-term water availability and links wet phases to human occupation across the southern Kalahari."
  },
  {
    "id": 23,
    "title": "Ostrich eggshell beads from Ga-Mohana Hill North Rockshelter, southern Kalahari, and the implications for understanding social networks during Marine Isotope Stage 2",
    "authors": "Amy Hatton, Benjamin Collins, Benjamin J. Schoville, and Jayne Wilkins",
    "year": "2022",
    "category": "Africa",
    "theme": "Material culture and social networks",
    "thumbnail": "img/publications/pub_23.jpg",
    "keywords": "ostrich eggshell beads, social networks, MIS 2, Kalahari",
    "link": "https://doi.org/10.1371/journal.pone.0268943",
    "abstract": "Uses ostrich eggshell beads from Ga-Mohana Hill to investigate social signaling and network structure in the southern Kalahari during MIS 2."
  },
  {
    "id": 24,
    "title": "Reply to: clusters of flowstone ages are not supported by statistical evidence",
    "authors": "Robyn Pickering, Andy I. R. Herries, Jon D. Woodhead, John C. Hellstrom, Helen E. Green, Bence Paul, Terrence Ritzman, David S. Strait, Benjamin J. Schoville, and John Hancox",
    "year": "2021",
    "category": "Africa",
    "theme": "Chronology, geology, and debate",
    "thumbnail": "img/publications/pub_24.jpg",
    "keywords": "flowstones, chronology, Nature reply, South Africa",
    "link": "https://doi.org/10.1038/s41586-021-03587-z",
    "abstract": "Responds to a debate over the interpretation of flowstone age clusters and reinforces the importance of chronological reasoning in paleoanthropological contexts."
  },
  {
    "id": 25,
    "title": "Exploring variability in lithic armature discard in the archaeological record",
    "authors": "Claudine Gravel-Miguel, John K. Murray, Benjamin J. Schoville, Colin D. Wren, and Curtis W. Marean",
    "year": "2021",
    "category": "Human Evolution",
    "theme": "Projectile technology and archaeological inference",
    "thumbnail": "img/publications/pub_25.jpg",
    "keywords": "lithic armatures, discard, projectile technology, variability",
    "link": "https://doi.org/10.1016/j.jhevol.2021.102981",
    "abstract": "Investigates how variation in lithic armature discard enters the archaeological record and what that variation can and cannot say about projectile technologies."
  },
  {
    "id": 26,
    "title": "Innovative Homo sapiens behaviours 105,000 years ago in a wetter Kalahari",
    "authors": "Jayne Wilkins, Benjamin J. Schoville, Robyn Pickering, Luke Gliganic, Benjamin Collins, Kyle S. Brown, Jessica von der Meden, Wendy Khumalo, Michael C. Meyer, Sechaba Maape, Alexander F. Blackwood, and Amy Hatton",
    "year": "2021",
    "category": "Human Evolution",
    "theme": "Origins of behavioral innovation",
    "thumbnail": "img/publications/pub_26.jpg",
    "keywords": "Homo sapiens, innovation, Kalahari, behavior",
    "link": "https://doi.org/10.1038/s41586-021-03419-0",
    "abstract": "Reports evidence for innovative Homo sapiens behavior in the interior of southern Africa, challenging coastal-only narratives about the emergence of complex behavior."
  },
  {
    "id": 27,
    "title": "A lithic provisioning model as a proxy for landscape mobility in the Southern and Middle Kalahari",
    "authors": "Benjamin J. Schoville, Kyle S. Brown, and Jayne Wilkins",
    "year": "2021",
    "category": "Africa",
    "theme": "Mobility modeling and provisioning",
    "thumbnail": "img/publications/pub_27.jpg",
    "keywords": "lithic provisioning, mobility, Kalahari, model",
    "link": "https://doi.org/10.1007/s10816-021-09507-9",
    "abstract": "Develops a lithic provisioning model to infer landscape mobility in the southern and middle Kalahari and links technological organization to movement across arid environments."
  }
];

let currentCategory = 'all';
let searchQuery = '';
let filteredPublications = [...publicationsData];
let selectedPublication = null;

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('publicationsCarousel');
  const searchInput = document.getElementById('publicationSearch');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const previewPanel = document.getElementById('previewPanel');
  const previewContent = document.getElementById('previewContent');
  const previewDefault = previewPanel ? previewPanel.querySelector('.preview-default') : null;
  if (!carousel) return;

  function createPublicationCard(pub) {
    const card = document.createElement('div');
    card.className = 'publication-card';
    card.dataset.pubId = pub.id;
    card.innerHTML = `
      <img src="${pub.thumbnail}" alt="${pub.title}" class="card-thumbnail">
      <div class="card-content">
        <h3 class="card-title">${pub.title}</h3>
        <div class="card-meta">
          <p class="card-authors">${pub.authors}</p>
          <div class="card-footer">
            <span class="card-year">${pub.year}</span>
            <span class="card-category">${pub.category}</span>
          </div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => { window.open(pub.link, '_blank'); });
    card.addEventListener('mouseenter', () => showPreview(pub, card));
    card.addEventListener('mouseleave', () => {
      if (!selectedPublication || selectedPublication.id !== pub.id) card.classList.remove('active');
    });
    return card;
  }

  function showPreview(pub, card) {
    if (!previewPanel) return;
    selectedPublication = pub;
    document.querySelectorAll('.publication-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    if (previewDefault) previewDefault.style.display = 'none';
    document.getElementById('previewTitle').textContent = pub.title;
    document.getElementById('previewAuthors').textContent = pub.authors;
    document.getElementById('previewYear').textContent = `${pub.year} • ${pub.category} • ${pub.theme}`;
    document.getElementById('previewAbstract').textContent = pub.abstract;
    document.getElementById('previewLink').href = pub.link;
    previewContent.style.display = 'block';
  }

  function renderPublications() {
    carousel.innerHTML = '';
    if (filteredPublications.length === 0) {
      carousel.innerHTML = '<div class="no-results">No publications match this search.</div>';
      return;
    }
    filteredPublications.forEach(pub => carousel.appendChild(createPublicationCard(pub)));
  }

  function filterPublications() {
    filteredPublications = publicationsData.filter(pub => {
      const matchesCategory = currentCategory === 'all' || pub.category === currentCategory;
      const text = `${pub.title} ${pub.authors} ${pub.keywords} ${pub.theme}`.toLowerCase();
      const matchesSearch = text.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    renderPublications();
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      searchQuery = this.value;
      filterPublications();
    });
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.getAttribute('data-category');
      filterPublications();
    });
  });

  renderPublications();
});
})();
