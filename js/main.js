/* ── ANIMATED WAVEFORM (hero) ────────────────────────────────────── */
function buildWaveform() {
  const container = document.getElementById('waveform');
  if (!container) return;

  const count = 90;
  for (let i = 0; i < count; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-bar';
    container.appendChild(bar);

    const minH = 0.03 + Math.random() * 0.10;
    const maxH = 0.20 + Math.random() * 0.80;
    const dur  = 600  + Math.random() * 1400;

    bar.animate(
      [
        { transform: `scaleY(${minH.toFixed(3)})` },
        { transform: `scaleY(${maxH.toFixed(3)})` },
      ],
      {
        duration: dur,
        delay: -Math.random() * dur,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
      }
    );
  }
}

/* ── NAV: scroll border + active link ───────────────────────────── */
function initNav() {
  const nav      = document.getElementById('nav');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);

    let active = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) active = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${active}`);
    });
  }, { passive: true });
}

/* ── MOBILE MENU ─────────────────────────────────────────────────── */
function initMobileMenu() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function setOpen(open) {
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => setOpen(!btn.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
}

/* ── CREDIT MODAL ────────────────────────────────────────────────── */
function initModal() {
  const modal    = document.getElementById('creditModal');
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');

  function openModal(card) {
    const { title, type, studio, year, tags, desc, img } = card.dataset;

    // Populate badge
    const badge = document.getElementById('modalBadge');
    badge.textContent = type || '';
    badge.className   = `credit-badge credit-badge--${(type || '').toLowerCase()}`;

    document.getElementById('modalYear').textContent   = year   || '';
    document.getElementById('modalTitle').textContent  = title  || 'Untitled';
    document.getElementById('modalStudio').textContent = studio || '';
    document.getElementById('modalDesc').textContent   = desc   || '';

    // Tags
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    if (tags) {
      tags.split(',').forEach(t => {
        const span = document.createElement('span');
        span.className   = 'tag';
        span.textContent = t.trim();
        tagsEl.appendChild(span);
      });
    }

    // Cover image
    const modalImg         = document.getElementById('modalImg');
    const modalPlaceholder = document.getElementById('modalImgPlaceholder');
    if (img) {
      modalImg.src           = img;
      modalImg.alt           = title || '';
      modalImg.style.display = 'block';
      modalPlaceholder.style.display = 'none';
    } else {
      modalImg.style.display         = 'none';
      modalPlaceholder.style.display = 'flex';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open on card click
  document.querySelectorAll('.credit-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    // Keyboard accessibility
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}


/* ── FADE-IN ON SCROLL ───────────────────────────────────────────── */
function initFadeIn() {
  const targets = document.querySelectorAll(
    '.service-card, .team-card, .credit-card, .listen-card, .contact-info, .contact-form'
  );

  targets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 3) * 0.07}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => observer.observe(el));
}

/* ── CONTACT FORM ────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  if (form.action.includes('YOUR_FORM_ID')) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('button[type="submit"]');
      const saved = btn.textContent;
      btn.textContent = '✓ Message sent!';
      btn.disabled    = true;
      setTimeout(() => {
        btn.textContent = saved;
        btn.disabled    = false;
        form.reset();
      }, 3200);
    });
  }
}

/* ── I18N ────────────────────────────────────────────────────────── */
const translations = {
  en: {
    'nav-services': 'Services',
    'nav-team':     'Team',
    'nav-credits':  'Credits',
    'nav-listen':   'Listen',
    'nav-contact':  'Contact',
    'hero-eyebrow': 'Music &amp; Sound Design Studio',
    'hero-subtitle':'Music and sound that shapes worlds.',
    'hero-desc':    'If it moves on screen, it should move through sound.<br>Games, series and cinematic media.',
    'hero-cta1':    'Let\'s talk',
    'hero-cta2':    'Listen',
    'svc-h2':       'We work where<br>sound matters.',
    'svc-p':        'From interactive worlds to cinematic storytelling, we design sound that supports emotion, rhythm and narrative.',
    'svc-music-h3':   'Bespoke Music',
    'svc-music-hook': 'The score your world deserves.',
    'svc-music-p':    'Original scores and soundtracks built specifically for your project. Not adapted from a library, not templated. Games, series, film, live ceremonies. From orchestral to electronic, the music follows your story.',
    'svc-sound-h3':   'Bespoke Sound Design',
    'svc-sound-hook': 'Every sound has a job. We give it one.',
    'svc-sound-p':    'Custom SFX, ambients and sonic textures made from scratch. We don\'t reach for a library when we can build something better. From the quietest texture to the hardest impact, every sound is deliberate.',
    'svc-interactive-h3':   'Audio for Interactive Media',
    'svc-interactive-hook': 'Audio that reacts. Worlds that breathe.',
    'svc-interactive-p':    'Adaptive music systems and dynamic audio for games. We\'ve shipped sound for studios whose games reach over 2 billion players. We understand the technical and creative demands of interactive audio at scale.',
    'svc-post-h3':   'Post, Mix &amp; Voice Over',
    'svc-post-hook': 'The final layer. The one everyone hears.',
    'svc-post-p':    'Final mix, mastering and voice over production in up to 12 languages. Dialogue editing, restoration, VO casting and delivery for broadcast, streaming or theatrical. We handle the last mile.',
    'team-h2':      'The Team',
    'team-p':       'We collaborate with developers, directors and producers who understand that sound is not decoration. It\'s structure.',
    'pere-roles':   'Producer · Sound Designer · Mixing &amp; Mastering',
    'pere-bio':     'Founder of Sonnos (2010). Over 15 years delivering bespoke audio for games, TV series and cinematic media. Credits include Raid: Shadow Legends, MoMonsters (RTVE) and the opening ceremony of the Games of the Small States of Europe.',
    'carlos-roles': 'Composer · Guitarist · Producer',
    'carlos-bio':   'Composer and guitarist at Sonnos since 2010. Lead guitarist in Persefone, with 3 European tours, 2 Asian tours and 5 worldwide albums. Also teaches guitar, composition and harmony at Relative Music School.',
    'miguel-roles': 'Composer · Producer · Keys &amp; Vocals',
    'miguel-bio':   'Berklee-trained composer specialising in film scoring and orchestral work. Keys and vocals in Persefone. Credits include the Nick OST (dir. José Pozo), Wolves, and the Stargate SG-1 Ep.2 OST for MGM.',
    'credits-h2':   'Credits',
    'credits-p':    'Click any project to learn more about the work.',
    'listen-h2':    'Listen',
    'listen-p':     'Sound work across music, design and interactive media.',
    'contact-h2':   'Let\'s talk and build<br>your project together.',
    'contact-tagline': 'We work where sound matters.',
    'form-name':    'Name',
    'form-email':   'Email',
    'form-type':    'Project Type',
    'form-budget':  'Estimated Budget',
    'form-message': 'Tell us about your project',
    'form-submit':  'Send message',
    'opt-type-0': 'Select type...', 'opt-type-1': 'Video Game',       'opt-type-2': 'TV Series',
    'opt-type-3': 'Film / Documentary', 'opt-type-4': 'Trailer / Ad', 'opt-type-5': 'Interactive Media', 'opt-type-6': 'Other',
    'opt-budget-0': 'Select range...', 'opt-budget-1': 'Under €1,000', 'opt-budget-2': '€1,000 – €5,000',
    'opt-budget-3': '€5,000 – €15,000', 'opt-budget-4': '€15,000+',  'opt-budget-5': 'Let\'s discuss',
    'footer-tagline': 'Music &amp; Sound Design · Games, Series &amp; Cinematic Media',
  },
  ca: {
    'nav-services': 'Serveis',
    'nav-team':     'Equip',
    'nav-credits':  'Crèdits',
    'nav-listen':   'Escolta',
    'nav-contact':  'Contacte',
    'hero-eyebrow': 'Estudi de Música i Disseny de So',
    'hero-subtitle':'Música i so que construeix mons.',
    'hero-desc':    'Si es mou a la pantalla, ha de moure\'s a través del so.<br>Videojocs, sèries i mitjans cinematogràfics.',
    'hero-cta1':    'Parlem',
    'hero-cta2':    'Escolta',
    'svc-h2':       'Treballem on<br>el so importa.',
    'svc-p':        'Des de mons interactius fins a la narració cinematogràfica, dissenyem so que dóna suport a l\'emoció, el ritme i la narrativa.',
    'svc-music-h3':   'Música a Mida',
    'svc-music-hook': 'La música que el teu món es mereix.',
    'svc-music-p':    'Bandes sonores originals construïdes específicament per al teu projecte. No adaptades d\'una biblioteca, no plantillades. Videojocs, sèries, cinema, cerimònies en viu. De l\'orquestral a l\'electrònic, la música segueix la teva història.',
    'svc-sound-h3':   'Disseny de So a Mida',
    'svc-sound-hook': 'Cada so té una feina. Nosaltres l\'hi donem.',
    'svc-sound-p':    'SFX, ambients i textures sonores creades des de zero. No recorrem a una biblioteca quan podem construir alguna cosa millor. De la textura més subtil a l\'impacte més fort, cada so és deliberat.',
    'svc-interactive-h3':   'Àudio per a Mitjans Interactius',
    'svc-interactive-hook': 'Àudio que reacciona. Mons que respiren.',
    'svc-interactive-p':    'Sistemes de música adaptativa i àudio dinàmic per a videojocs. Hem creat so per a estudis amb més de 2.000 milions de jugadors. Entenem les exigències tècniques i creatives de l\'àudio interactiu a escala.',
    'svc-post-h3':   'Post, Mix i Voice Over',
    'svc-post-hook': 'La capa final. La que tothom escolta.',
    'svc-post-p':    'Mescla final, masterització i producció de VO en fins a 12 idiomes. Edició de diàleg, restauració, càsting i lliurament per a televisió, streaming o estrena en sales. Nosaltres gestionem l\'últim tram.',
    'team-h2':      'L\'Equip',
    'team-p':       'Col·laborem amb desenvolupadors, directors i productors que entenen que el so no és decoració. És estructura.',
    'pere-roles':   'Productor · Dissenyador de So · Mescla i Masterització',
    'pere-bio':     'Fundador de Sonnos (2010). Més de 15 anys creant àudio a mida per a videojocs, sèries de televisió i mitjans cinematogràfics. Crèdits inclouen Raid: Shadow Legends, MoMonsters (RTVE) i la cerimònia d\'obertura dels Jocs dels Petits Estats d\'Europa.',
    'carlos-roles': 'Compositor · Guitarrista · Productor',
    'carlos-bio':   'Compositor i guitarrista a Sonnos des del 2010. Guitarrista principal de Persefone, amb 3 gires europees, 2 gires asiàtiques i 5 àlbums mundials. També ensenya guitarra, composició i harmonia a la Relative Music School.',
    'miguel-roles': 'Compositor · Productor · Teclats i Veus',
    'miguel-bio':   'Compositor format a Berklee especialitzat en música de cinema i treball orquestral. Teclats i veus a Persefone. Crèdits inclouen el Nick OST (dir. José Pozo), Wolves, i el Stargate SG-1 Ep.2 OST per MGM.',
    'credits-h2':   'Crèdits',
    'credits-p':    'Fes clic en qualsevol projecte per saber-ne més.',
    'listen-h2':    'Escolta',
    'listen-p':     'Treball sonor a través de música, disseny i mitjans interactius.',
    'contact-h2':   'Parlem i construïm<br>el teu projecte junts.',
    'contact-tagline': 'Treballem on el so importa.',
    'form-name':    'Nom',
    'form-email':   'Correu electrònic',
    'form-type':    'Tipus de projecte',
    'form-budget':  'Pressupost estimat',
    'form-message': 'Explica\'ns el teu projecte',
    'form-submit':  'Enviar missatge',
    'opt-type-0': 'Selecciona...', 'opt-type-1': 'Videojoc',          'opt-type-2': 'Sèrie de TV',
    'opt-type-3': 'Cinema / Documental', 'opt-type-4': 'Tràiler / Anunci', 'opt-type-5': 'Mitjans Interactius', 'opt-type-6': 'Altres',
    'opt-budget-0': 'Selecciona rang...', 'opt-budget-1': 'Menys de 1.000 €', 'opt-budget-2': '1.000 € – 5.000 €',
    'opt-budget-3': '5.000 € – 15.000 €', 'opt-budget-4': '15.000 €+',   'opt-budget-5': 'Ho discutim',
    'footer-tagline': 'Música i Disseny de So · Videojocs, Sèries i Mitjans Cinematogràfics',
  },
  es: {
    'nav-services': 'Servicios',
    'nav-team':     'Equipo',
    'nav-credits':  'Créditos',
    'nav-listen':   'Escucha',
    'nav-contact':  'Contacto',
    'hero-eyebrow': 'Estudio de Música y Diseño de Sonido',
    'hero-subtitle':'Música y sonido que construye mundos.',
    'hero-desc':    'Si se mueve en pantalla, debe moverse a través del sonido.<br>Videojuegos, series y medios cinematográficos.',
    'hero-cta1':    'Hablemos',
    'hero-cta2':    'Escuchar',
    'svc-h2':       'Trabajamos donde<br>el sonido importa.',
    'svc-p':        'Desde mundos interactivos hasta la narrativa cinematográfica, diseñamos sonido que apoya la emoción, el ritmo y la narrativa.',
    'svc-music-h3':   'Música a Medida',
    'svc-music-hook': 'La música que tu mundo merece.',
    'svc-music-p':    'Bandas sonoras originales construidas específicamente para tu proyecto. No adaptadas de una biblioteca, no plantilladas. Videojuegos, series, cine, ceremonias en vivo. De lo orquestal a lo electrónico, la música sigue tu historia.',
    'svc-sound-h3':   'Diseño de Sonido a Medida',
    'svc-sound-hook': 'Cada sonido tiene un trabajo. Nosotros se lo damos.',
    'svc-sound-p':    'SFX, ambientes y texturas sonoras creadas desde cero. No recurrimos a una biblioteca cuando podemos construir algo mejor. Desde la textura más sutil hasta el impacto más duro, cada sonido es deliberado.',
    'svc-interactive-h3':   'Audio para Medios Interactivos',
    'svc-interactive-hook': 'Audio que reacciona. Mundos que respiran.',
    'svc-interactive-p':    'Sistemas de música adaptativa y audio dinámico para videojuegos. Hemos creado sonido para estudios con más de 2.000 millones de jugadores. Entendemos las exigencias técnicas y creativas del audio interactivo a escala.',
    'svc-post-h3':   'Post, Mix y Voice Over',
    'svc-post-hook': 'La capa final. La que todos escuchan.',
    'svc-post-p':    'Mezcla final, masterización y producción de VO en hasta 12 idiomas. Edición de diálogo, restauración, casting y entrega para televisión, streaming o estreno en salas. Nos encargamos del último tramo.',
    'team-h2':      'El Equipo',
    'team-p':       'Colaboramos con desarrolladores, directores y productores que entienden que el sonido no es decoración. Es estructura.',
    'pere-roles':   'Productor · Diseñador de Sonido · Mezcla y Masterización',
    'pere-bio':     'Fundador de Sonnos (2010). Más de 15 años creando audio a medida para videojuegos, series de televisión y medios cinematográficos. Créditos incluyen Raid: Shadow Legends, MoMonsters (RTVE) y la ceremonia de apertura de los Juegos de los Pequeños Estados de Europa.',
    'carlos-roles': 'Compositor · Guitarrista · Productor',
    'carlos-bio':   'Compositor y guitarrista en Sonnos desde 2010. Guitarrista principal de Persefone, con 3 giras europeas, 2 giras asiáticas y 5 álbumes mundiales. También enseña guitarra, composición y armonía en la Relative Music School.',
    'miguel-roles': 'Compositor · Productor · Teclados y Voces',
    'miguel-bio':   'Compositor formado en Berklee especializado en música de cine y trabajo orquestal. Teclados y voces en Persefone. Créditos incluyen el Nick OST (dir. José Pozo), Wolves, y el Stargate SG-1 Ep.2 OST para MGM.',
    'credits-h2':   'Créditos',
    'credits-p':    'Haz clic en cualquier proyecto para saber más.',
    'listen-h2':    'Escucha',
    'listen-p':     'Trabajo sonoro a través de música, diseño y medios interactivos.',
    'contact-h2':   'Hablemos y construyamos<br>tu proyecto juntos.',
    'contact-tagline': 'Trabajamos donde el sonido importa.',
    'form-name':    'Nombre',
    'form-email':   'Correo electrónico',
    'form-type':    'Tipo de proyecto',
    'form-budget':  'Presupuesto estimado',
    'form-message': 'Cuéntanos sobre tu proyecto',
    'form-submit':  'Enviar mensaje',
    'opt-type-0': 'Selecciona...', 'opt-type-1': 'Videojuego',        'opt-type-2': 'Serie de TV',
    'opt-type-3': 'Cine / Documental', 'opt-type-4': 'Tráiler / Anuncio', 'opt-type-5': 'Medios Interactivos', 'opt-type-6': 'Otro',
    'opt-budget-0': 'Selecciona rango...', 'opt-budget-1': 'Menos de 1.000 €', 'opt-budget-2': '1.000 € – 5.000 €',
    'opt-budget-3': '5.000 € – 15.000 €', 'opt-budget-4': '15.000 €+',   'opt-budget-5': 'Lo discutimos',
    'footer-tagline': 'Música y Diseño de Sonido · Videojuegos, Series y Medios Cinematográficos',
  },
  fr: {
    'nav-services': 'Services',
    'nav-team':     'Équipe',
    'nav-credits':  'Références',
    'nav-listen':   'Écouter',
    'nav-contact':  'Contact',
    'hero-eyebrow': 'Studio de Musique et Design Sonore',
    'hero-subtitle':'Musique et son qui façonnent des mondes.',
    'hero-desc':    'Si ça bouge à l\'écran, ça doit passer par le son.<br>Jeux vidéo, séries et médias cinématographiques.',
    'hero-cta1':    'Parlons',
    'hero-cta2':    'Écouter',
    'svc-h2':       'Nous travaillons là où<br>le son compte.',
    'svc-p':        'Des mondes interactifs à la narration cinématographique, nous concevons le son qui soutient l\'émotion, le rythme et le récit.',
    'svc-music-h3':   'Musique Sur Mesure',
    'svc-music-hook': 'La musique que votre monde mérite.',
    'svc-music-p':    'Musiques originales construites spécifiquement pour votre projet. Pas adaptées d\'une bibliothèque, pas de templates. Jeux vidéo, séries, films, cérémonies live. De l\'orchestral à l\'électronique, la musique suit votre histoire.',
    'svc-sound-h3':   'Sound Design Sur Mesure',
    'svc-sound-hook': 'Chaque son a un rôle. Nous le lui donnons.',
    'svc-sound-p':    'SFX, ambiances et textures sonores créées de zéro. Nous ne recourons pas à une bibliothèque quand nous pouvons construire quelque chose de mieux. De la texture la plus subtile à l\'impact le plus fort, chaque son est délibéré.',
    'svc-interactive-h3':   'Audio pour les Médias Interactifs',
    'svc-interactive-hook': 'Audio qui réagit. Mondes qui respirent.',
    'svc-interactive-p':    'Systèmes de musique adaptative et audio dynamique pour les jeux vidéo. Nous avons créé du son pour des studios dont les jeux atteignent plus de 2 milliards de joueurs. Nous comprenons les exigences techniques et créatives de l\'audio interactif à grande échelle.',
    'svc-post-h3':   'Post, Mix et Voice Over',
    'svc-post-hook': 'La couche finale. Celle que tout le monde entend.',
    'svc-post-p':    'Mix final, mastering et production VO en jusqu\'à 12 langues. Montage dialogue, restauration, casting et livraison pour la diffusion, le streaming ou la sortie en salles. Nous gérons le dernier kilomètre.',
    'team-h2':      'L\'Équipe',
    'team-p':       'Nous collaborons avec des développeurs, réalisateurs et producteurs qui comprennent que le son n\'est pas une décoration. C\'est une structure.',
    'pere-roles':   'Producteur · Sound Designer · Mix et Mastering',
    'pere-bio':     'Fondateur de Sonnos (2010). Plus de 15 ans à créer de l\'audio sur mesure pour les jeux vidéo, séries télévisées et médias cinématographiques. Crédits incluent Raid: Shadow Legends, MoMonsters (RTVE) et la cérémonie d\'ouverture des Jeux des Petits États d\'Europe.',
    'carlos-roles': 'Compositeur · Guitariste · Producteur',
    'carlos-bio':   'Compositeur et guitariste chez Sonnos depuis 2010. Guitariste principal de Persefone, avec 3 tournées européennes, 2 tournées asiatiques et 5 albums mondiaux. Il enseigne également la guitare, la composition et l\'harmonie à la Relative Music School.',
    'miguel-roles': 'Compositeur · Producteur · Claviers et Voix',
    'miguel-bio':   'Compositeur formé à Berklee spécialisé dans la composition pour film et le travail orchestral. Claviers et voix dans Persefone. Crédits incluent le Nick OST (dir. José Pozo), Wolves, et le Stargate SG-1 Ep.2 OST pour MGM.',
    'credits-h2':   'Références',
    'credits-p':    'Cliquez sur un projet pour en savoir plus.',
    'listen-h2':    'Écouter',
    'listen-p':     'Travail sonore à travers la musique, le design et les médias interactifs.',
    'contact-h2':   'Parlons et construisons<br>votre projet ensemble.',
    'contact-tagline': 'Nous travaillons là où le son compte.',
    'form-name':    'Nom',
    'form-email':   'E-mail',
    'form-type':    'Type de projet',
    'form-budget':  'Budget estimé',
    'form-message': 'Parlez-nous de votre projet',
    'form-submit':  'Envoyer le message',
    'opt-type-0': 'Sélectionner...', 'opt-type-1': 'Jeu vidéo',       'opt-type-2': 'Série TV',
    'opt-type-3': 'Film / Documentaire', 'opt-type-4': 'Bande-annonce / Pub', 'opt-type-5': 'Médias Interactifs', 'opt-type-6': 'Autre',
    'opt-budget-0': 'Sélectionner...', 'opt-budget-1': 'Moins de 1 000 €', 'opt-budget-2': '1 000 € – 5 000 €',
    'opt-budget-3': '5 000 € – 15 000 €', 'opt-budget-4': '15 000 €+', 'opt-budget-5': 'À discuter',
    'footer-tagline': 'Musique et Design Sonore · Jeux Vidéo, Séries et Médias Cinématographiques',
  },
};

function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
  localStorage.setItem('sonnos-lang', lang);
}

function initLang() {
  const saved = localStorage.getItem('sonnos-lang') || 'en';
  setLanguage(saved);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

/* ── FOOTER YEAR ─────────────────────────────────────────────────── */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── INIT ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildWaveform();
  initNav();
  initMobileMenu();
  initModal();
  initFadeIn();
  initContactForm();
  setYear();
  initLang();
});
