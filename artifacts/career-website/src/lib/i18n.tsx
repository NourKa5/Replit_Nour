import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "ar" | "he";

export const translations = {
  en: {
    // Navbar
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_challenge: "Challenge",
    nav_contact: "Contact",
    nav_admin: "Admin",
    nav_hire: "Hire Me",
    nav_back: "Back to Portfolio",

    // Hero
    hero_available: "Available for full-time roles",
    hero_tagline1: "Bridging molecular science",
    hero_tagline2: "with intelligent systems.",
    hero_desc: "Chemical Engineering graduate from Ben-Gurion University. 2.5 years R&D at Atiko Labs developing AI-powered SERS/Raman algorithms. Now building full-stack AI systems.",
    hero_cta_projects: "View Projects",
    hero_cta_contact: "Get in Touch",
    hero_cta_reel: "Watch My Reel",
    hero_stat1_label: "2.5 Yrs R&D",
    hero_stat1_val: "Experience",
    hero_stat2_label: "8 Projects",
    hero_stat2_val: "Completed",
    hero_stat3_label: "1 Paper",
    hero_stat3_val: "Under Review",
    hero_stat4_label: "80+ GPA",
    hero_stat4_val: "BGU Negev",
    hero_find: "Find me on",

    // About
    about_title: "About Me",
    about_h3: "Transforming complex problems into elegant solutions.",
    about_p1: "I'm a Chemical Engineering graduate from Ben-Gurion University of the Negev (Energy, Water & Advanced Technologies track). For 2.5 years at Atiko Labs, I developed AI-powered algorithms for Surface-Enhanced Raman Spectroscopy — enabling non-invasive diagnostics headed for peer-reviewed publication.",
    about_p2: "Equally at home in the spectrometer lab, on the PLC factory floor, and shipping production code. My range is unusual: Python signal-processing, Siemens PLC programming, SolidWorks prototyping, FastAPI microservices, and full-stack AI deployment — all from first principles.",
    about_p3: "Completing an AI Developer certification and seeking a first full-time role where this hybrid profile creates measurable impact.",
    about_edu1: "B.Sc. Chemical Engineering",
    about_edu1_sub: "Ben-Gurion University, 2024",
    about_edu2: "GPA: 80.65 / 100",
    about_edu2_sub: "Energy, Water & Advanced Tech",
    about_edu3: "AI Developer Certification",
    about_edu3_sub: "Ecom School, 2026",
    about_edu4: "1 Research Paper",
    about_edu4_sub: "Under Peer Review",

    // Skills
    skills_title: "Technical Skills",
    skills_subtitle: "A comprehensive toolkit combining chemical engineering, industrial automation, and modern software development.",
    skill_cat1: "R&D & Process Engineering",
    skill_cat2: "Programming & Data",
    skill_cat3: "Automation & Industry 4.0",
    skill_cat4: "AI & Machine Learning",
    skill_cat5: "Backend & DevOps",
    skill_cat6: "Engineering Tools",

    // Experience
    exp_title: "Experience",
    exp_job1_title: "Engineering & Technology Instructor",
    exp_job1_company: "Alrowad for Science and Technology",
    exp_job1_period: "Nov 2025 — Present",
    exp_job1_b1: "Teaching engineering and technology, elementary through high school",
    exp_job1_b2: "Designing hands-on experiences that build real technical skills",
    exp_job2_title: "R&D Algorithm Developer & Data Analyst",
    exp_job2_company: "Atiko Labs, Israel",
    exp_job2_period: "Jun 2023 — Nov 2025",
    exp_job2_b1: "SERS signal processing, pattern recognition, and analytics pipeline in Python",
    exp_job2_b2: "NSR <2% (noise-to-signal — noise is <2% of signal) enabling 1 µM trace detection in blood",
    exp_job2_b3: "Applied PCA, PLS, PCR for dimensionality reduction and spectral analysis",
    exp_job2_b4: "Contributed to peer-reviewed publication (under review)",
    exp_job3_title: "Industry 4.0 Automation Trainee",
    exp_job3_company: "Moona – A Space for Change, Israel",
    exp_job3_period: "Nov 2024 — Feb 2025",
    exp_job3_b1: "Automated sorting system: PLC, Yaskawa robotics, Cognex machine vision",
    exp_job3_b2: "Optimized pneumatic motion control and RPA; prototyped with SolidWorks",
    exp_job4_title: "Research Assistant — Water Treatment",
    exp_job4_company: "Jacob Blaustein Institutes for Desert Research",
    exp_job4_period: "Oct 2022 — Jun 2023",
    exp_job4_b1: "Column experiments with zeolite and membranes for ammonium removal",
    exp_job4_b2: "Optimized adsorption parameters under Prof. Oded Nir",

    // Projects
    proj_title: "Featured Projects",
    proj_subtitle: "A selection of my recent work spanning R&D signal processing, industrial automation, and full-stack software development.",
    proj_code: "Code",
    proj_demo: "Demo",
    proj1_title: "RamanSense — Adaptive SERS Algorithm",
    proj1_desc: "Imagine trying to hear one person whispering in a stadium full of noise — that's finding a single molecule in blood. I built RamanSense: a pattern recognition algorithm that strips noise layer by layer to identify a molecule's unique chemical fingerprint. NSR <2%, detected 4-ATP at 1 µM in blood — invisible to conventional methods. Goal: real-time, non-invasive diagnostics that are fast, accurate, and cost-effective. Paper under peer review.",
    proj2_title: "Automated Box-Sorting System",
    proj2_desc: "Industrial sorting with PLC ladder logic, Yaskawa robotics, laser sensors, and Cognex machine vision. Optimized RPA and pneumatics for energy efficiency.",
    proj3_title: "artboxnat — AI Sales Assistant",
    proj3_desc: "Arabic RTL e-commerce with serverless OpenAI chat assistant. Deployed on Vercel with GitHub CI/CD pipeline.",
    proj4_title: "ShopAI — AI Shopping Platform",
    proj4_desc: "Full-stack e-commerce with GPT chat, Redis caching, JWT auth, order management, stock control, and Random Forest churn prediction ML model.",
    proj5_title: "Polls System — Microservices Backend",
    proj5_desc: "Two-service platform (User + Poll) with FastAPI, MySQL, Docker. Clean MVC, inter-service HTTP via httpx, analytics, cascade deletions.",
    proj6_title: "Supervised Learning — Regression & Classification",
    proj6_desc: "End-to-end ML: GDP regression (Ridge/Lasso/Polynomial KFold) + churn classification (LR, KNN, SVM, Random Forest, GridSearchCV). Graded 'one of the best seen.'",
    proj7_title: "WhatsApp AI Bot",
    proj7_desc: "Personal WhatsApp bot that replies to your contacts as you — GPT-4o trained on your writing style and tone. Handles Arabic, English, and natural code-switching. Includes typing indicators, human-like random delays (1.5–4 s), conversation memory, and QR session persistence.",
    proj8_title: "Nickel Recovery from Ni-MH Batteries",
    proj8_desc: "Final-year Chemical Engineering design project at BGU. Full process design for Ni recovery via H₂SO₄ leaching — PFD, P&ID, equipment specs, block diagram, mass & energy balances, and process control. Supervised by Mr. Ronen Berman, RTA Engineering LTD.",

    // About mission
    about_mission: "The research mission: enable non-invasive early detection anywhere, anytime — real-time, on-site diagnostics that are fast, accurate, and affordable. A direct step toward transforming how healthcare catches disease early.",

    // RamanSense Viz
    viz_badge: "Research Spotlight",
    viz_badge_sub: "Atiko Labs · 2023–2025 · Paper Under Peer Review",
    viz_algo_title: "Adaptive SERS Detection Algorithm",
    viz_mission: "Goal: revolutionize non-invasive early diagnostics — real-time, on-site detection that's fast, accurate, accessible, and cost-effective.",
    viz_pipeline_title: "Detection Pipeline",
    viz_step1_label: "Blood Sample",
    viz_step1_sub: "Complex media",
    viz_step2_label: "SERS Laser",
    viz_step2_sub: "Nano-sensor",
    viz_step3_label: "Raw Spectrum",
    viz_step3_sub: "Noisy signal",
    viz_step4_label: "RamanSense",
    viz_step4_sub: "Pattern recognition",
    viz_step5_label: "Detected!",
    viz_step5_sub: "4-ATP @ 1 µM",
    viz_raw_title: "Raw Signal",
    viz_raw_sub: "Noise obscures signal",
    viz_clean_title: "After RamanSense",
    viz_clean_sub: "4-ATP fingerprint identified ✓",
    viz_algo_steps: "Processing Steps",
    viz_algo_1: "1. ROI Selection",
    viz_algo_2: "2. Moving-Avg Denoising",
    viz_algo_3: "3. Median Baseline Removal",
    viz_algo_4: "4. Min-Max Normalisation",
    viz_algo_5: "5. Spectrum Profile Match",

    // Contact
    contact_title: "Let's Build Something Real.",
    contact_subtitle: "Actively seeking full-time opportunities. Whether you have a question or want to talk shop — the inbox is always open.",
    contact_info: "Contact Information",
    contact_email_label: "Email",
    contact_phone_label: "Phone",
    contact_location_label: "Location",
    contact_location_val: "Israel (Open to Global Relocation)",
    contact_name: "Full Name",
    contact_name_ph: "John Doe",
    contact_email: "Email Address",
    contact_email_ph: "john@example.com",
    contact_message: "Your Message",
    contact_message_ph: "What are you working on?",
    contact_send: "Send Message →",
    contact_sending: "Sending Message...",
    contact_success_title: "Message Sent!",
    contact_success_desc: "Thank you for reaching out. Nour will get back to you shortly.",

    // Game
    game_badge: "Recruiter Challenge",
    game_title: "Nour's Lab Challenge",
    game_subtitle: "Two ways to explore Nour's world — pick your challenge!",
    game_quiz_title: "Knowledge Quiz",
    game_quiz_desc: "5 random questions from a 20-question pool covering Nour's work in spectroscopy, automation, AI, and full-stack dev.",
    game_photon_title: "Photon Catcher",
    game_photon_desc: "Catch flying photons before they escape! Each one reveals a real achievement from Nour's career.",
  },

  ar: {
    // Navbar
    nav_about: "نبذة",
    nav_skills: "المهارات",
    nav_projects: "المشاريع",
    nav_experience: "الخبرة",
    nav_challenge: "التحدي",
    nav_contact: "تواصل",
    nav_admin: "الإدارة",
    nav_hire: "وظّفني",
    nav_back: "العودة للملف",

    // Hero
    hero_available: "متاح لأدوار بدوام كامل",
    hero_tagline1: "جسر بين علم الجزيئات",
    hero_tagline2: "والأنظمة الذكية.",
    hero_desc: "خريج هندسة كيميائية من جامعة بن غوريون. 2.5 سنة بحث وتطوير في Atiko Labs تطوير خوارزميات SERS/Raman بالذكاء الاصطناعي. الآن يبني أنظمة ذكاء اصطناعي متكاملة.",
    hero_cta_projects: "عرض المشاريع",
    hero_cta_contact: "تواصل معي",
    hero_cta_reel: "▶ شاهد ريل التعريف",
    hero_stat1_label: "2.5 سنة بحث وتطوير",
    hero_stat1_val: "خبرة",
    hero_stat2_label: "8 مشاريع",
    hero_stat2_val: "مكتملة",
    hero_stat3_label: "بحث علمي",
    hero_stat3_val: "قيد المراجعة",
    hero_stat4_label: "+80 معدل",
    hero_stat4_val: "جامعة بن غوريون",
    hero_find: "تجدني على",

    // About
    about_title: "نبذة عني",
    about_h3: "تحويل المشكلات المعقدة إلى حلول أنيقة.",
    about_p1: "خريج هندسة كيميائية من جامعة بن غوريون النقب (مسار الطاقة والمياه والتقنيات المتقدمة). لمدة 2.5 سنة في Atiko Labs، طوّرت خوارزميات مدعومة بالذكاء الاصطناعي لطيفية رامان المعززة بالسطح — تُمكّن التشخيص غير الجراحي المتجه للنشر العلمي.",
    about_p2: "مرتاح في مختبر مطياف، وعلى أرضية مصنع PLC، وفي شحن كود الإنتاج. نطاقي غير معتاد: معالجة إشارات بايثون، برمجة Siemens PLC، نمذجة SolidWorks، خدمات FastAPI المصغرة، ونشر الذكاء الاصطناعي الكامل — كل ذلك من المبادئ الأساسية.",
    about_p3: "يُكمل شهادة مطوّر ذكاء اصطناعي، ويبحث عن دور أول بدوام كامل حيث يصنع هذا الملف المختلط تأثيراً قابلاً للقياس.",
    about_edu1: "بكالوريوس هندسة كيميائية",
    about_edu1_sub: "جامعة بن غوريون، 2024",
    about_edu2: "معدل: 80.65 / 100",
    about_edu2_sub: "الطاقة والمياه والتقنيات المتقدمة",
    about_edu3: "شهادة مطوّر ذكاء اصطناعي",
    about_edu3_sub: "Ecom School، 2026",
    about_edu4: "بحث علمي",
    about_edu4_sub: "قيد المراجعة العلمية",

    // Skills
    skills_title: "المهارات التقنية",
    skills_subtitle: "مجموعة أدوات شاملة تجمع بين الهندسة الكيميائية والأتمتة الصناعية وتطوير البرمجيات الحديثة.",
    skill_cat1: "البحث والتطوير وهندسة العمليات",
    skill_cat2: "البرمجة وتحليل البيانات",
    skill_cat3: "الأتمتة والصناعة 4.0",
    skill_cat4: "الذكاء الاصطناعي والتعلم الآلي",
    skill_cat5: "الخادم والنشر",
    skill_cat6: "أدوات الهندسة",

    // Experience
    exp_title: "الخبرة",
    exp_job1_title: "مدرّس ومرشد هندسة وتكنولوجيا",
    exp_job1_company: "الرواد للعلوم والتكنولوجيا",
    exp_job1_period: "نوفمبر 2025 — حتى الآن",
    exp_job1_b1: "تدريس الهندسة والتكنولوجيا من الابتدائي حتى الثانوي",
    exp_job1_b2: "تصميم تجارب عملية تبني مهارات تقنية حقيقية",
    exp_job2_title: "مطوّر خوارزميات بحث وتطوير ومحلل بيانات",
    exp_job2_company: "Atiko Labs، إسرائيل",
    exp_job2_period: "يونيو 2023 — نوفمبر 2025",
    exp_job2_b1: "معالجة إشارات SERS، التعرف على الأنماط، وتحليل البيانات بالبايثون",
    exp_job2_b2: "NSR أقل من 2% (نسبة الضوضاء للإشارة — الضوضاء أقل من 2% من الإشارة) — كشف عند 1 ميكرومول في الدم",
    exp_job2_b3: "تطبيق PCA وPLS وPCR لتقليل الأبعاد وتحليل الطيف",
    exp_job2_b4: "مساهمة في بحث علمي محكّم (قيد المراجعة)",
    exp_job3_title: "متدرب أتمتة الصناعة 4.0",
    exp_job3_company: "Moona – A Space for Change، إسرائيل",
    exp_job3_period: "نوفمبر 2024 — فبراير 2025",
    exp_job3_b1: "نظام فرز آلي: PLC وروبوتات Yaskawa ورؤية آلية Cognex",
    exp_job3_b2: "تحسين التحكم الهوائي وRPA؛ نمذجة بـ SolidWorks",
    exp_job4_title: "مساعد باحث — معالجة المياه",
    exp_job4_company: "معاهد جاكوب بلاوستاين لأبحاث الصحراء",
    exp_job4_period: "أكتوبر 2022 — يونيو 2023",
    exp_job4_b1: "تجارب الأعمدة بالزيوليت والأغشية لإزالة الأمونيوم",
    exp_job4_b2: "تحسين معاملات الامتزاز تحت إشراف الأستاذ عوديد نير",

    // Projects
    proj_title: "المشاريع المميزة",
    proj_subtitle: "مختارات من أعمالي الأخيرة تشمل معالجة إشارات البحث والتطوير والأتمتة الصناعية وتطوير البرمجيات الكاملة.",
    proj_code: "الكود",
    proj_demo: "تجربة",
    proj1_title: "RamanSense — خوارزمية SERS التكيفية",
    proj1_desc: "تخيّل محاولة سماع همسة شخص واحد في استاد مليء بالضجيج — هذا تحدي الكشف عن جزيء بعينه في الدم. بنيت RamanSense: خوارزمية تعرّف على أنماط تأخذ إشارة مستشعر رامان الفوضوية، تقشر الضوضاء طبقةً تلو طبقة، وتحدد البصمة الكيميائية الفريدة للجزيء. النتيجة: NSR أقل من 2% وكشف ناجح عن 4-ATP بتركيز 1 ميكرومول في الدم — تركيز خفيّ على الطرق التقليدية. الورقة قيد المراجعة.",
    proj2_title: "نظام فرز صناديق آلي",
    proj2_desc: "فرز صناعي بمخطط سلّم PLC وروبوتات Yaskawa وليزر وكاميرات Cognex. تحسين RPA والهواء المضغوط لكفاءة الطاقة.",
    proj3_title: "artboxnat — مساعد مبيعات بالذكاء الاصطناعي",
    proj3_desc: "تجارة إلكترونية عربية بدعم RTL مع مساعد OpenAI بدون خادم. نُشر على Vercel مع خط CI/CD من GitHub.",
    proj4_title: "ShopAI — منصة تسوق ذكية",
    proj4_desc: "تجارة إلكترونية متكاملة مع محادثة GPT، Redis، JWT، إدارة الطلبات، التحكم بالمخزون، ونموذج Random Forest للتنبؤ.",
    proj5_title: "نظام استطلاعات — خدمات مصغرة",
    proj5_desc: "منصة بخدمتين (مستخدم + استطلاع) مع FastAPI وMySQL وDocker. MVC نظيف، HTTP بين الخدمات عبر httpx، تحليلات.",
    proj6_title: "التعلم الخاضع للإشراف — انحدار وتصنيف",
    proj6_desc: "تعلم آلي شامل: انحدار الناتج المحلي + تصنيف تضارب العملاء (LR، KNN، SVM، Random Forest، GridSearchCV). تقييم: 'من أفضل ما شاهدنا'.",
    proj7_title: "بوت واتساب بالذكاء الاصطناعي",
    proj7_desc: "بوت واتساب شخصي يرد على أصدقائك بأسلوبك تماماً — مدعوم بـ GPT-4o مع ذاكرة المحادثة. يتعامل مع العربية والإنجليزية والخلط الطبيعي بين اللغتين. مؤشر الكتابة، تأخير عشوائي يبدو بشرياً، وحفظ الجلسة.",
    proj8_title: "استرداد النيكل من بطاريات Ni-MH",
    proj8_desc: "مشروع التخرج في الهندسة الكيميائية بجامعة بن غوريون. تصميم عملية كاملة لاسترداد Ni عبر رشح H₂SO₄ — مخطط PFD وP&ID ومواصفات المعدات والسيطرة على العملية وموازين الكتلة والطاقة. إشراف المهندس رونين بيرمان.",

    // About mission
    about_mission: "مهمة البحث: تشخيص مبكر غير جراحي في كل مكان وكل وقت — فوري، دقيق، وبتكلفة متاحة. خطوة حقيقية نحو تغيير طريقة اكتشاف الأمراض مبكراً.",

    // RamanSense Viz
    viz_badge: "تسليط الضوء على البحث",
    viz_badge_sub: "Atiko Labs · 2023–2025 · بحث قيد المراجعة",
    viz_algo_title: "خوارزمية SERS التكيفية للكشف",
    viz_mission: "الهدف: إحداث ثورة في التشخيص المبكر غير الجراحي — كشف فوري، ميداني، دقيق، سريع وبتكلفة مناسبة.",
    viz_pipeline_title: "خط أنابيب الكشف",
    viz_step1_label: "عينة دم",
    viz_step1_sub: "وسط معقد",
    viz_step2_label: "ليزر SERS",
    viz_step2_sub: "مستشعر نانوي",
    viz_step3_label: "الطيف الخام",
    viz_step3_sub: "إشارة صاخبة",
    viz_step4_label: "RamanSense",
    viz_step4_sub: "تعرف على الأنماط",
    viz_step5_label: "تم الكشف!",
    viz_step5_sub: "4-ATP @ 1 ميكرومول",
    viz_raw_title: "الإشارة الخام",
    viz_raw_sub: "الضوضاء تحجب الإشارة",
    viz_clean_title: "بعد RamanSense",
    viz_clean_sub: "تم تحديد بصمة 4-ATP ✓",
    viz_algo_steps: "خطوات المعالجة",
    viz_algo_1: "١. تحديد منطقة الاهتمام",
    viz_algo_2: "٢. تقليل الضوضاء بالمتوسط المتحرك",
    viz_algo_3: "٣. إزالة الخط الأساسي بالوسيط",
    viz_algo_4: "٤. تطبيع Min-Max",
    viz_algo_5: "٥. مطابقة الملف الطيفي",

    // Contact
    contact_title: "لنبنِ شيئاً حقيقياً.",
    contact_subtitle: "يبحث بنشاط عن فرص بدوام كامل. سواء كان لديك سؤال أو تريد الحديث — صندوق الوارد مفتوح دائماً.",
    contact_info: "معلومات التواصل",
    contact_email_label: "البريد الإلكتروني",
    contact_phone_label: "الهاتف",
    contact_location_label: "الموقع",
    contact_location_val: "إسرائيل (منفتح على الانتقال عالمياً)",
    contact_name: "الاسم الكامل",
    contact_name_ph: "محمد أحمد",
    contact_email: "البريد الإلكتروني",
    contact_email_ph: "example@domain.com",
    contact_message: "رسالتك",
    contact_message_ph: "ما الذي تعمل عليه؟",
    contact_send: "أرسل الرسالة ←",
    contact_sending: "جاري الإرسال...",
    contact_success_title: "تم إرسال الرسالة!",
    contact_success_desc: "شكراً للتواصل. نور سيرد عليك قريباً.",

    // Game
    game_badge: "تحدي المُجنّد",
    game_title: "تحدي مختبر نور",
    game_subtitle: "طريقتان لاستكشاف عالم نور — اختر تحديك!",
    game_quiz_title: "اختبار المعرفة",
    game_quiz_desc: "5 أسئلة عشوائية من مجموعة 20 سؤالاً تغطي عمل نور في الطيفية والأتمتة والذكاء الاصطناعي والتطوير.",
    game_photon_title: "صائد الفوتونات",
    game_photon_desc: "اصطد الفوتونات الطائرة قبل أن تهرب! كل فوتون يكشف إنجازاً حقيقياً من مسيرة نور.",
  },

  he: {
    // Navbar
    nav_about: "אודות",
    nav_skills: "כישורים",
    nav_projects: "פרויקטים",
    nav_experience: "ניסיון",
    nav_challenge: "אתגר",
    nav_contact: "צור קשר",
    nav_admin: "ניהול",
    nav_hire: "גייס אותי",
    nav_back: "חזרה לתיק עבודות",

    // Hero
    hero_available: "זמין לתפקידים במשרה מלאה",
    hero_tagline1: "גשר בין מדע מולקולרי",
    hero_tagline2: "למערכות חכמות.",
    hero_desc: "בוגר הנדסה כימית מאוניברסיטת בן-גוריון. 2.5 שנות מו\"פ ב-Atiko Labs לפיתוח אלגוריתמי SERS/Raman מבוססי AI. כעת בונה מערכות AI מלאות.",
    hero_cta_projects: "צפה בפרויקטים",
    hero_cta_contact: "צור קשר",
    hero_cta_reel: "▶ צפה בריל שלי",
    hero_stat1_label: "2.5 שנות מו\"פ",
    hero_stat1_val: "ניסיון",
    hero_stat2_label: "8 פרויקטים",
    hero_stat2_val: "הושלמו",
    hero_stat3_label: "מאמר מחקרי",
    hero_stat3_val: "בסקירת עמיתים",
    hero_stat4_label: "+80 ממוצע",
    hero_stat4_val: "אוניברסיטת בן-גוריון",
    hero_find: "מצא אותי ב",

    // About
    about_title: "אודות",
    about_h3: "הפיכת בעיות מורכבות לפתרונות אלגנטיים.",
    about_p1: "בוגר הנדסה כימית מאוניברסיטת בן-גוריון בנגב (מסלול אנרגיה, מים וטכנולוגיות מתקדמות). במשך 2.5 שנים ב-Atiko Labs פיתחתי אלגוריתמים מבוססי AI לספקטרוסקופיית רמאן מוגברת — המאפשרים אבחון לא פולשני בדרך לפרסום מדעי.",
    about_p2: "נוח בשלוש סביבות: מעבדת ספקטרומטר, רצפת מפעל PLC, ומשלוח קוד ייצור. הטווח שלי יוצא דופן: עיבוד אותות Python, תכנות Siemens PLC, אב-טיפוס SolidWorks, microservices של FastAPI ופריסת AI מלאה — הכל מעקרונות ראשונים.",
    about_p3: "משלים תעודת מפתח AI ומחפש תפקיד ראשון במשרה מלאה שבו הפרופיל ההיברידי יוצר השפעה מדידה.",
    about_edu1: "B.Sc. הנדסה כימית",
    about_edu1_sub: "אוניברסיטת בן-גוריון, 2024",
    about_edu2: "ממוצע: 80.65 / 100",
    about_edu2_sub: "אנרגיה, מים וטכנולוגיות מתקדמות",
    about_edu3: "תעודת מפתח AI",
    about_edu3_sub: "Ecom School, 2026",
    about_edu4: "מאמר מחקרי",
    about_edu4_sub: "בסקירת עמיתים",

    // Skills
    skills_title: "כישורים טכניים",
    skills_subtitle: "ערכת כלים מקיפה המשלבת הנדסה כימית, אוטומציה תעשייתית ופיתוח תוכנה מודרני.",
    skill_cat1: "מו\"פ והנדסת תהליכים",
    skill_cat2: "תכנות וניתוח נתונים",
    skill_cat3: "אוטומציה ותעשייה 4.0",
    skill_cat4: "AI ולמידת מכונה",
    skill_cat5: "Backend ו-DevOps",
    skill_cat6: "כלי הנדסה",

    // Experience
    exp_title: "ניסיון",
    exp_job1_title: "מדריך ומנטור הנדסה וטכנולוגיה",
    exp_job1_company: "אלרואד למדע וטכנולוגיה",
    exp_job1_period: "נובמבר 2025 — הווה",
    exp_job1_b1: "הוראת הנדסה וטכנולוגיה מבית-ספר יסודי עד תיכון",
    exp_job1_b2: "עיצוב חוויות מעשיות שבונות מיומנויות טכניות אמיתיות",
    exp_job2_title: "מפתח אלגוריתמים מו\"פ ומנתח נתונים",
    exp_job2_company: "Atiko Labs, ישראל",
    exp_job2_period: "יוני 2023 — נובמבר 2025",
    exp_job2_b1: "עיבוד אותות SERS, זיהוי דפוסים, ותהליך אנליטיקה ב-Python",
    exp_job2_b2: "NSR <2% (רעש-לאות — רעש פחות מ-2% מהאות) — גילוי עקבות ב-1µM בדם",
    exp_job2_b3: "יישום PCA, PLS, PCR לצמצום ממדים וניתוח ספקטרלי",
    exp_job2_b4: "תרומה לפרסום מדעי שנבדק על ידי עמיתים",
    exp_job3_title: "מתמחה אוטומציה בתעשייה 4.0",
    exp_job3_company: "Moona – A Space for Change, ישראל",
    exp_job3_period: "נובמבר 2024 — פברואר 2025",
    exp_job3_b1: "מערכת מיון אוטומטית: PLC, רובוטיקת Yaskawa, ראייה ממוחשבת Cognex",
    exp_job3_b2: "אופטימיזציה של בקרת תנועה פניאומטית ו-RPA; אב-טיפוס ב-SolidWorks",
    exp_job4_title: "עוזר מחקר — טיפול במים",
    exp_job4_company: "מכוני המחקר ע\"ש בלאוסטיין לחקר המדבר",
    exp_job4_period: "אוקטובר 2022 — יוני 2023",
    exp_job4_b1: "ניסויי עמודות עם זאוליט וממברנות להסרת אמוניום",
    exp_job4_b2: "אופטימיזציה פרמטרים של ספיחה תחת פרופ' עודד ניר",

    // Projects
    proj_title: "פרויקטים נבחרים",
    proj_subtitle: "מבחר עבודות אחרונות הכוללות עיבוד אותות מו\"פ, אוטומציה תעשייתית ופיתוח תוכנה מלא.",
    proj_code: "קוד",
    proj_demo: "הדגמה",
    proj1_title: "RamanSense — אלגוריתם SERS אדפטיבי",
    proj1_desc: "דמיין לשמוע לחישה של אדם אחד בתוך אצטדיון מלא רעש — כך מרגיש לזהות מולקולה בודדת בדם. בניתי את RamanSense: אלגוריתם זיהוי דפוסים שלוקח אות של חיישן רמאן כאוטי, מפריד את הרעש שכבה אחר שכבה, ומאתר את טביעת האצבע הכימית הייחודית של המולקולה. תוצאה: NSR <2% וגילוי 4-ATP ב-1µM ישירות בדם — ריכוז בלתי נראה לשיטות מקובלות. מאמר בסקירת עמיתים.",
    proj2_title: "מערכת מיון קופסאות אוטומטית",
    proj2_desc: "מיון תעשייתי עם לוגיקת סולם PLC, רובוטיקת Yaskawa, חיישני לייזר וראייה ממוחשבת Cognex. אופטימיזציה של RPA ופנאומטיקה ליעילות אנרגטית.",
    proj3_title: "artboxnat — עוזר מכירות AI",
    proj3_desc: "מסחר אלקטרוני ערבי RTL עם עוזר צ'אט OpenAI serverless. פורס על Vercel עם CI/CD מ-GitHub.",
    proj4_title: "ShopAI — פלטפורמת קניות AI",
    proj4_desc: "מסחר אלקטרוני מלא עם צ'אט GPT, Redis caching, JWT auth, ניהול הזמנות, בקרת מלאי, ומודל ML של Random Forest לחיזוי נטישה.",
    proj5_title: "מערכת סקרים — Microservices Backend",
    proj5_desc: "פלטפורמה עם שתי שירותים (משתמש + סקר) עם FastAPI, MySQL, Docker. MVC נקי, HTTP בין-שירותי דרך httpx, אנליטיקה.",
    proj6_title: "למידה מונחית — רגרסיה וסיווג",
    proj6_desc: "ML מקצה לקצה: רגרסיית GDP + סיווג נטישה (LR, KNN, SVM, Random Forest, GridSearchCV). ציון: 'מהטובים שראינו'.",
    proj7_title: "בוט WhatsApp עם AI",
    proj7_desc: "בוט WhatsApp אישי שעונה לאנשי הקשר שלך בסגנון שלך — GPT-4o עם זיכרון שיחה. תומך בערבית, אנגלית וחלוף טבעי בין השפות. כולל אינדיקטור הקלדה, עיכוב אנושי אקראי ושמירת סשן.",
    proj8_title: "שחזור ניקל מסוללות Ni-MH",
    proj8_desc: "פרויקט גמר בהנדסה כימית באוניברסיטת בן-גוריון. עיצוב תהליך מלא לשחזור Ni דרך שטיפת H₂SO₄ — PFD, P&ID, מפרטי ציוד, ביקורת מסה ואנרגיה ובקרת תהליך. בפיקוח מר רונן ברמן.",

    // About mission
    about_mission: "מטרת המחקר: אבחון מוקדם לא פולשני בכל מקום ובכל עת — מהיר, מדויק ובעלות נגישה. צעד ממשי לשינוי האופן שבו הרפואה מגלה מחלות בשלב מוקדם.",

    // RamanSense Viz
    viz_badge: "זרקור מחקרי",
    viz_badge_sub: "Atiko Labs · 2023–2025 · מאמר בסקירת עמיתים",
    viz_algo_title: "אלגוריתם SERS אדפטיבי לגילוי",
    viz_mission: "מטרה: לחולל מהפכה באבחון מוקדם לא פולשני — זיהוי בזמן אמת, מדויק, מהיר ועלות-אפקטיבי.",
    viz_pipeline_title: "צינור הגילוי",
    viz_step1_label: "דגימת דם",
    viz_step1_sub: "מדיה מורכבת",
    viz_step2_label: "לייזר SERS",
    viz_step2_sub: "חיישן ננו",
    viz_step3_label: "ספקטרום גולמי",
    viz_step3_sub: "אות רועש",
    viz_step4_label: "RamanSense",
    viz_step4_sub: "זיהוי דפוסים",
    viz_step5_label: "זוהה!",
    viz_step5_sub: "4-ATP @ 1 µM",
    viz_raw_title: "אות גולמי",
    viz_raw_sub: "רעש מסתיר את האות",
    viz_clean_title: "לאחר RamanSense",
    viz_clean_sub: "טביעת אצבע 4-ATP זוהתה ✓",
    viz_algo_steps: "שלבי עיבוד",
    viz_algo_1: "1. בחירת ROI",
    viz_algo_2: "2. צמצום רעש - ממוצע נע",
    viz_algo_3: "3. הסרת קו בסיס - חציון נע",
    viz_algo_4: "4. נרמול Min-Max",
    viz_algo_5: "5. השוואת פרופיל ספקטרלי",

    // Contact
    contact_title: "בואו נבנה משהו אמיתי.",
    contact_subtitle: "מחפש באופן פעיל הזדמנויות במשרה מלאה. בין אם יש לך שאלה או רוצה לדבר עסקים — תיבת הדואר תמיד פתוחה.",
    contact_info: "פרטי יצירת קשר",
    contact_email_label: "אימייל",
    contact_phone_label: "טלפון",
    contact_location_label: "מיקום",
    contact_location_val: "ישראל (פתוח לשינוי מיקום גלובלי)",
    contact_name: "שם מלא",
    contact_name_ph: "ישראל ישראלי",
    contact_email: "כתובת אימייל",
    contact_email_ph: "example@domain.com",
    contact_message: "ההודעה שלך",
    contact_message_ph: "על מה אתה עובד?",
    contact_send: "שלח הודעה ←",
    contact_sending: "שולח...",
    contact_success_title: "ההודעה נשלחה!",
    contact_success_desc: "תודה שפנית. נור יחזור אליך בקרוב.",

    // Game
    game_badge: "אתגר המגייס",
    game_title: "אתגר המעבדה של נור",
    game_subtitle: "שתי דרכים לחקור את עולמו של נור — בחר את האתגר שלך!",
    game_quiz_title: "חידון ידע",
    game_quiz_desc: "5 שאלות אקראיות מבנק של 20 שאלות המכסות עבודת נור בספקטרוסקופיה, אוטומציה, AI ופיתוח מלא.",
    game_photon_title: "תופס פוטונים",
    game_photon_desc: "תפוס פוטונים טסים לפני שיברחו! כל פוטון חושף הישג אמיתי ממסלול נור.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("nk_lang");
    return (saved as Lang) || "en";
  });

  const isRTL = lang === "ar" || lang === "he";

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("nk_lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    return (translations[lang] as Record<string, string>)[key] ?? (translations.en as Record<string, string>)[key] ?? key;
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
