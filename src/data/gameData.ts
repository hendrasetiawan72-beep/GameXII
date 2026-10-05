import {
  Major,
  DayNumber,
  MapLocation,
  NPC,
  ClueItem,
  QuizQuestion,
  LetterSection,
  MatchingPair
} from '../types/game';

// 9 Standard Parts of an Application Letter (Cover Letter)
export const LETTER_PARTS: LetterSection[] = [
  {
    id: 'sender_info',
    name: "Sender's Information",
    correctOrder: 1,
    sampleContent: 'Raka Pratama\nJl. Raya Bawang No. 45, Batang\nrakapratama@email.com | +62 812-3456-7890',
    purpose: 'Provides your name, address, and contact information so the employer can easily reach you.',
    hint: 'Contains your full name, home address, email, and phone number.'
  },
  {
    id: 'date',
    name: 'Date',
    correctOrder: 2,
    sampleContent: 'October 15, 2026',
    purpose: 'Indicates the date when the letter was written.',
    hint: 'Placed directly below sender information.'
  },
  {
    id: 'receiver_info',
    name: "Receiver's Information (Inside Address)",
    correctOrder: 3,
    sampleContent: 'Hiring Committee\nMuhiba Partner Corporation\nJl. Sudirman No. 12, Jawa Tengah',
    purpose: 'The employer or company name and office address.',
    hint: 'Name or title of the recruiter, company name, and company address.'
  },
  {
    id: 'salutation',
    name: 'Salutation (Formal Greeting)',
    correctOrder: 4,
    sampleContent: 'Dear Hiring Manager,',
    purpose: 'A polite formal greeting to the employer.',
    hint: 'Examples: Dear Mr. Smith, Dear Ms. Clara, or Dear Hiring Manager.'
  },
  {
    id: 'opening_para',
    name: 'Opening Paragraph',
    correctOrder: 5,
    sampleContent: 'I am writing to express my strong interest in applying for the advertised position at your esteemed company.',
    purpose: 'States why you are writing and which position you are applying for.',
    hint: 'Specifies the job position and where you found the vacancy.'
  },
  {
    id: 'body_para',
    name: 'Body Paragraph',
    correctOrder: 6,
    sampleContent: 'As a final-year vocational student at SMK Muhammadiyah Bawang, I have developed solid practical skills, hands-on project experience, and teamwork abilities.',
    purpose: 'Explains your relevant skills, education, experience, and why you are suitable.',
    hint: 'Highlights your skills, achievements, and vocational competence.'
  },
  {
    id: 'closing_para',
    name: 'Closing Paragraph',
    correctOrder: 7,
    sampleContent: 'Thank you for considering my application. I look forward to discussing how my skills match your team in an interview.',
    purpose: 'Politely thanks the employer, requests an interview, and offers next steps.',
    hint: 'Mentions attached CV and expresses enthusiasm for an interview.'
  },
  {
    id: 'complimentary_close',
    name: 'Complimentary Close',
    correctOrder: 8,
    sampleContent: 'Sincerely,',
    purpose: 'A formal and courteous sign-off phrase.',
    hint: 'Examples: Sincerely, Yours faithfully, or Respectfully.'
  },
  {
    id: 'signature',
    name: 'Signature & Full Name',
    correctOrder: 9,
    sampleContent: '[Signature]\n(Raka Pratama)',
    purpose: 'Your handwritten signature and printed full name confirming authenticity.',
    hint: 'Your handwritten sign and printed full name.'
  }
];

// Map Locations in SMK Muhammadiyah Bawang
export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'gate',
    name: 'School Main Gate',
    shortName: 'Gate',
    x: 48,
    y: 84,
    width: 20,
    height: 12,
    color: '#E2E8F0',
    accentColor: '#475569',
    icon: 'DoorOpen',
    description: 'The iconic welcoming gate of SMK Muhammadiyah Bawang.'
  },
  {
    id: 'courtyard',
    name: 'School Courtyard',
    shortName: 'Courtyard',
    x: 45,
    y: 50,
    width: 24,
    height: 18,
    color: '#BBF7D0',
    accentColor: '#15803D',
    icon: 'Trees',
    description: 'Spacious green field with trees, park benches, and flagpole.'
  },
  {
    id: 'classroom',
    name: 'Classroom XII',
    shortName: 'Classroom',
    x: 15,
    y: 20,
    width: 22,
    height: 16,
    color: '#FED7AA',
    accentColor: '#C2410C',
    icon: 'School',
    description: 'Clean bright classroom where final-year students study and discuss.'
  },
  {
    id: 'library',
    name: 'School Library',
    shortName: 'Library',
    x: 45,
    y: 18,
    width: 22,
    height: 16,
    color: '#FEF08A',
    accentColor: '#B45309',
    icon: 'BookOpen',
    description: 'Quiet library filled with English dictionaries and career reference books.'
  },
  {
    id: 'akl_lab',
    name: 'AKL Accounting Lab',
    shortName: 'AKL Lab',
    x: 78,
    y: 18,
    width: 20,
    height: 16,
    color: '#BAE6FD',
    accentColor: '#0369A1',
    icon: 'Calculator',
    description: 'Equipped with banking simulation software, ledgers, and calculators.',
    allowedMajors: ['AKL']
  },
  {
    id: 'canteen',
    name: 'School Canteen',
    shortName: 'Canteen',
    x: 15,
    y: 52,
    width: 20,
    height: 16,
    color: '#FBCFE8',
    accentColor: '#BE185D',
    icon: 'Coffee',
    description: 'Popular spot for friendly talks over warm tea and snacks.'
  },
  {
    id: 'guidance_room',
    name: 'Guidance & Counseling (BK)',
    shortName: 'Guidance (BK)',
    x: 78,
    y: 46,
    width: 20,
    height: 16,
    color: '#DDD6FE',
    accentColor: '#6D28D9',
    icon: 'Compass',
    description: 'Counseling office where Pak Budi advises on career and education.'
  },
  {
    id: 'announcement_board',
    name: 'Announcement Board',
    shortName: 'Job Board',
    x: 45,
    y: 36,
    width: 20,
    height: 13,
    color: '#FEF9C3',
    accentColor: '#A16207',
    icon: 'Newspaper',
    description: 'Bulletin board displaying career brochures, job vacancies, and posters.'
  },
  {
    id: 'teacher_room',
    name: 'Career Center (BKK)',
    shortName: 'Career Center',
    x: 18,
    y: 78,
    width: 22,
    height: 15,
    color: '#C7D2FE',
    accentColor: '#3730A3',
    icon: 'Users',
    description: 'Vocational Career Center (BKK) and Teacher Lounge.'
  },
  {
    id: 'auto_workshop',
    name: 'Automotive Workshop',
    shortName: 'Workshop',
    x: 70,
    y: 80,
    width: 20,
    height: 15,
    color: '#FED7AA',
    accentColor: '#EA580C',
    icon: 'Wrench',
    description: 'Realistic workshop with engine stands, diagnostic tools, and motorbikes.',
    allowedMajors: ['OTOMOTIF']
  },
  {
    id: 'tjkt_lab',
    name: 'TJKT Computer Network Lab',
    shortName: 'TJKT Lab',
    x: 74,
    y: 58,
    width: 22,
    height: 16,
    color: '#A7F3D0',
    accentColor: '#059669',
    icon: 'Cpu',
    description: 'Server racks, Cisco routers, LAN crimpers, and fiber optic kits.',
    allowedMajors: ['TJKT']
  }
];

// NPCs in the game with English dialogue & English expression highlights
export const GAME_NPCS: NPC[] = [
  {
    id: 'pak_budi',
    name: 'Pak Budi',
    role: 'Guidance Counselor (Guru BK)',
    locationId: 'guidance_room',
    x: 84,
    y: 50,
    gender: 'male',
    avatarType: 'counselor',
    dialogueByDay: {
      1: [
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "Welcome! I noticed you look thoughtful today. Are you thinking about graduation?",
          expressionTip: "Asking about feelings"
        },
        {
          speaker: 'Player',
          en: "Yes, sir. I still don't know: should I work directly or go to college?",
          expressionTip: "Asking for advice"
        },
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "In my opinion, both are very good paths! What matters is knowing what you want and preparing yourself thoroughly.",
          expressionTip: "In my opinion... (Giving opinion)"
        },
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "If you want to apply for a job, you must learn how to write a strong English Application Letter."
        }
      ],
      2: [
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "I believe checking the school announcement board is the best first step.",
          expressionTip: "I believe... (Expressing belief)"
        },
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "Look for the recruitment flyer that matches your vocational major!"
        }
      ],
      3: [
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "From my point of view, writing an application letter is like introducing your best self to a company.",
          expressionTip: "From my point of view... (Sharing perspective)"
        },
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "Visit the Library to collect the 9 essential parts of an application letter."
        }
      ],
      4: [
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "You are making tremendous progress! Head to your major's practical lab to solve your vocational challenge."
        }
      ],
      5: [
        {
          speaker: 'Pak Budi',
          speakerRole: 'Guidance Counselor',
          en: "Whatever you decide—working or continuing studies—Muhiba is immensely proud of you!"
        }
      ]
    }
  },
  {
    id: 'bu_rina',
    name: 'Bu Rina',
    role: 'AKL Accounting Teacher',
    locationId: 'akl_lab',
    x: 82,
    y: 22,
    gender: 'female',
    avatarType: 'teacher_akl',
    majorSpecific: 'AKL',
    dialogueByDay: {
      1: [
        {
          speaker: 'Bu Rina',
          en: "Hello! Accounting skills are needed everywhere—banks, public institutions, and modern businesses.",
          expressionTip: "Encouragement"
        }
      ],
      2: [
        {
          speaker: 'Bu Rina',
          en: "I think you should examine the MUHIBA BANK PARTNER brochure on the announcement board!",
          expressionTip: "I think... (Giving suggestion)"
        }
      ],
      3: [
        {
          speaker: 'Bu Rina',
          en: "Remember: an application letter must highlight both financial accuracy and computer spreadsheet skills."
        }
      ],
      4: [
        {
          speaker: 'Bu Rina',
          en: "Ready for your challenge? Let's match your vocational accounting skills with the bank's requirements!"
        }
      ],
      5: [
        {
          speaker: 'Bu Rina',
          en: "Your attention to detail is remarkable. You are ready for professional life!"
        }
      ]
    }
  },
  {
    id: 'sinta',
    name: 'Sinta',
    role: 'AKL Classmate',
    locationId: 'canteen',
    x: 20,
    y: 56,
    gender: 'female',
    avatarType: 'student_girl',
    majorSpecific: 'AKL',
    dialogueByDay: {
      1: [
        {
          speaker: 'Sinta',
          en: "You are really good at numbers and balance sheets. Why don't you try working at a bank?",
          expressionTip: "Why don't you... (Making a suggestion)"
        }
      ],
      2: [
        {
          speaker: 'Sinta',
          en: "I agree! The Junior Accounting Assistant position at Muhiba Bank Partner looks perfect for us.",
          expressionTip: "I agree (Agreeing with an opinion)"
        }
      ],
      3: [
        {
          speaker: 'Sinta',
          en: "I found a clue in the library about formal salutations: use 'Dear Hiring Manager,' if you do not know the recipient's exact name."
        }
      ],
      4: [
        {
          speaker: 'Sinta',
          en: "Don't forget to include Microsoft Excel and team collaboration in your letter body!"
        }
      ],
      5: [
        {
          speaker: 'Sinta',
          en: "We did it! We learned how to write a real application letter together!"
        }
      ]
    }
  },
  {
    id: 'pak_darto',
    name: 'Pak Darto',
    role: 'Automotive Workshop Head',
    locationId: 'auto_workshop',
    x: 74,
    y: 88,
    gender: 'male',
    avatarType: 'teacher_auto',
    majorSpecific: 'OTOMOTIF',
    dialogueByDay: {
      1: [
        {
          speaker: 'Pak Darto',
          en: "Hey champ! A skilled automotive technician is always in high demand. Keep your passion burning."
        }
      ],
      2: [
        {
          speaker: 'Pak Darto',
          en: "MUHIBA AUTO GARAGE is recruiting a Junior Automotive Technician. Check their poster!",
          expressionTip: "Giving information"
        }
      ],
      3: [
        {
          speaker: 'Pak Darto',
          en: "Just like assembling a motorcycle engine cylinder, an application letter has strict sequential parts!"
        }
      ],
      4: [
        {
          speaker: 'Pak Darto',
          en: "Our workshop diagnostic engine has misaligned letter components! Arrange them in order to fire up the engine!"
        }
      ],
      5: [
        {
          speaker: 'Pak Darto',
          en: "Great job! A technician who communicates fluently in English will easily reach global opportunities!"
        }
      ]
    }
  },
  {
    id: 'raka_friend',
    name: 'Raka',
    role: 'Automotive Classmate',
    locationId: 'courtyard',
    x: 48,
    y: 54,
    gender: 'male',
    avatarType: 'student_boy',
    majorSpecific: 'OTOMOTIF',
    dialogueByDay: {
      1: [
        {
          speaker: 'Raka',
          en: "You are good at fixing motorcycle engines and electronic fuel injection. But are we ready for a real workshop?",
          expressionTip: "Expressing curiosity"
        }
      ],
      2: [
        {
          speaker: 'Raka',
          en: "That sounds like a good idea! Let's check the job brochure at the announcement board right away.",
          expressionTip: "That sounds like a good idea"
        }
      ],
      3: [
        {
          speaker: 'Raka',
          en: "In the letter, we should mention engine overhaul, diagnostics, and workshop safety procedures (K3)!"
        }
      ],
      4: [
        {
          speaker: 'Raka',
          en: "Let's filter out non-automotive tools like frying pans or cooking spoons, haha!"
        }
      ],
      5: [
        {
          speaker: 'Raka',
          en: "Now I have the confidence to send my application to modern auto service centers!"
        }
      ]
    }
  },
  {
    id: 'pak_andi',
    name: 'Pak Andi',
    role: 'TJKT Network Teacher',
    locationId: 'tjkt_lab',
    x: 82,
    y: 64,
    gender: 'male',
    avatarType: 'teacher_tjkt',
    majorSpecific: 'TJKT',
    dialogueByDay: {
      1: [
        {
          speaker: 'Pak Andi',
          en: "Hi there! The digital telecom world is expanding rapidly. Fiber optics, routing, and cloud infrastructure need young talents."
        }
      ],
      2: [
        {
          speaker: 'Pak Andi',
          en: "I suggest you look up the MUHIBA TELECOM vacancy. They are seeking a Junior Network Technician!",
          expressionTip: "I suggest... (Making recommendation)"
        }
      ],
      3: [
        {
          speaker: 'Pak Andi',
          en: "Writing an application letter is like configuring network protocols: each section must be correctly sequenced!"
        }
      ],
      4: [
        {
          speaker: 'Pak Andi',
          en: "Connect the fiber network patch cables in proper application letter sequence to activate our telecom server!"
        }
      ],
      5: [
        {
          speaker: 'Pak Andi',
          en: "Excellent work! English is the universal language of computer networking and international IT certifications."
        }
      ]
    }
  },
  {
    id: 'dimas',
    name: 'Dimas',
    role: 'TJKT Classmate',
    locationId: 'canteen',
    x: 22,
    y: 54,
    gender: 'male',
    avatarType: 'student_boy',
    majorSpecific: 'TJKT',
    dialogueByDay: {
      1: [
        {
          speaker: 'Dimas',
          en: "You configure MikroTik routers and crimp RJ45 cables faster than anyone in class!",
          expressionTip: "Giving compliment"
        }
      ],
      2: [
        {
          speaker: 'Dimas',
          en: "I believe MUHIBA TELECOM will appreciate your troubleshooting and teamwork skills.",
          expressionTip: "I believe... (Expressing conviction)"
        }
      ],
      3: [
        {
          speaker: 'Dimas',
          en: "Let's check the library to find out how to write a polite closing paragraph expressing interest in an interview."
        }
      ],
      4: [
        {
          speaker: 'Dimas',
          en: "Our server rack is blinking green! The network cables are all plugged in the right order!"
        }
      ],
      5: [
        {
          speaker: 'Dimas',
          en: "Whether we work directly or continue to engineering college, we are well prepared!"
        }
      ]
    }
  },
  {
    id: 'mr_hendra',
    name: 'Mr. Hendra',
    role: 'BKK Career Center Coordinator',
    locationId: 'teacher_room',
    x: 25,
    y: 84,
    gender: 'male',
    avatarType: 'coordinator',
    dialogueByDay: {
      1: [
        {
          speaker: 'Mr. Hendra',
          en: "Welcome to Muhiba Career Center (BKK). Every great professional career starts with self-discovery and curiosity."
        }
      ],
      2: [
        {
          speaker: 'Mr. Hendra',
          en: "Observing real job brochures teaches you what industries truly demand from vocational graduates."
        }
      ],
      3: [
        {
          speaker: 'Mr. Hendra',
          en: "Mastering English application letters opens doors both locally and globally."
        }
      ],
      4: [
        {
          speaker: 'Mr. Hendra',
          en: "Take your time assembling the letter. Quality and honesty in your skills matter most."
        }
      ],
      5: [
        {
          speaker: 'Mr. Hendra',
          en: "Congratulations! You have completed the entire career quest. Step forward to review your final results."
        }
      ]
    }
  }
];

// Clues to discover per Day (English only)
export const GAME_CLUES: ClueItem[] = [
  {
    id: 'clue_d1_1',
    day: 1,
    title: 'Graduation Anxiety Discussion',
    description: 'Student conversation on the courtyard bench: "Should I work or go to college?"',
    locationId: 'courtyard',
    icon: 'MessageCircle',
    points: 10
  },
  {
    id: 'clue_d1_2',
    day: 1,
    title: 'Guidance Counselor Wisdom',
    description: 'Pak Budi explained: "Both work and college are valid paths. Preparation is the key."',
    locationId: 'guidance_room',
    icon: 'Compass',
    points: 10
  },
  {
    id: 'clue_d1_3',
    day: 1,
    title: 'Career Exploration Shelf',
    description: 'Discovered a career handbook showing the importance of English Application Letters.',
    locationId: 'library',
    icon: 'BookOpen',
    points: 10
  },

  {
    id: 'clue_d2_1',
    day: 2,
    title: 'Job Board Vacancy Brochure',
    description: 'A colorful vintage brochure outlining position, requirements, and instructions to submit a letter.',
    locationId: 'announcement_board',
    icon: 'FileText',
    points: 10
  },
  {
    id: 'clue_d2_2',
    day: 2,
    title: 'Requirements Breakdown',
    description: 'Identified key requirements: communication, teamwork, computer literacy, and vocational expertise.',
    locationId: 'teacher_room',
    icon: 'CheckCircle2',
    points: 10
  },

  {
    id: 'clue_d3_1',
    day: 3,
    title: 'Application Letter Anatomy: Part 1-4',
    description: "Sender's Info, Date, Receiver's Address, and formal Salutation (e.g., Dear Hiring Manager).",
    locationId: 'library',
    icon: 'FileCode',
    points: 10,
    pieceReward: "Sender, Date, Receiver, Salutation"
  },
  {
    id: 'clue_d3_2',
    day: 3,
    title: 'Application Letter Anatomy: Part 5-7',
    description: 'Opening Paragraph (applying for), Body (skills/achievements), and Closing Paragraph (interview request).',
    locationId: 'classroom',
    icon: 'FileText',
    points: 10,
    pieceReward: "Opening, Body, Closing"
  },
  {
    id: 'clue_d3_3',
    day: 3,
    title: 'Application Letter Anatomy: Part 8-9',
    description: 'Complimentary Close (Sincerely,) followed by signature and clear printed full name.',
    locationId: 'teacher_room',
    icon: 'PenTool',
    points: 10,
    pieceReward: "Complimentary Close, Signature"
  },

  {
    id: 'clue_d4_1',
    day: 4,
    title: 'Vocational Skill Matching',
    description: 'Connecting personal vocational school practical skills directly with company qualifications.',
    locationId: 'akl_lab',
    icon: 'Layers',
    points: 10
  },
  {
    id: 'clue_d4_2',
    day: 4,
    title: 'Letter Draft Assembled',
    description: 'Successfully put together all 9 segments of the application letter with zero errors!',
    locationId: 'canteen',
    icon: 'Award',
    points: 10
  },

  {
    id: 'clue_d5_1',
    day: 5,
    title: 'Recruiter Confirmation Message',
    description: '"Congratulations! Your application has been received and reviewed."',
    locationId: 'teacher_room',
    icon: 'MailCheck',
    points: 10
  },
  {
    id: 'clue_d5_2',
    day: 5,
    title: 'The Great Muhiba Simulation Reveal',
    description: 'Mr. Hendra reveals the grand truth: you have been tested for authentic career readiness.',
    locationId: 'courtyard',
    icon: 'Sparkles',
    points: 10
  }
];

// Major-specific Vacancy Brochures
export const MAJOR_VACANCIES = {
  AKL: {
    companyName: 'MUHIBA BANK PARTNER',
    tagline: 'Together for a Better Financial Future',
    position: 'Junior Accounting Assistant',
    location: 'Financial District / Bank Branch, Batang & Pekalongan',
    description: 'Muhiba Bank Partner invites ambitious vocational accounting graduates to join our modern financial teller and bookkeeping operations.',
    requirements: [
      'Basic accounting & bookkeeping knowledge',
      'Proficiency in spreadsheet software (Microsoft Excel / Google Sheets)',
      'Good written & verbal communication in English',
      'Strong teamwork, integrity, and ethical responsibility',
      'Detail-oriented and responsible with financial records',
      'Fresh graduates from SMK Muhammadiyah Bawang welcome'
    ],
    contact: 'recruitment@muhibabank.co.id',
    deadline: 'June 30, 2026',
    instruction: 'Please send your application letter and resume in English.'
  },
  OTOMOTIF: {
    companyName: 'MUHIBA AUTO GARAGE',
    tagline: 'Precision Engineering & Modern Automotive Solutions',
    position: 'Junior Automotive Technician',
    location: 'Central Modern Workshop, Jawa Tengah',
    description: 'Muhiba Auto Garage is seeking energetic automotive graduates passionate about engine servicing, EFI systems, and vehicle maintenance.',
    requirements: [
      'Basic automotive engine & electrical knowledge',
      'Hands-on experience in tune-up and brake maintenance',
      'Strict adherence to workshop safety (K3) procedures',
      'Teamwork and proactive problem-solving mindset',
      'Eager to learn modern computerized diagnostic scanner tools',
      'Fresh graduates from SMK Muhammadiyah Bawang welcome'
    ],
    contact: 'careers@muhiba-autogarage.com',
    deadline: 'June 30, 2026',
    instruction: 'Send your English application letter and vocational portfolio.'
  },
  TJKT: {
    companyName: 'MUHIBA TELECOM',
    tagline: 'Connecting Communities Through Ultra-Fast Fiber & Networks',
    position: 'Junior Network Technician',
    location: 'Network Operations Center (NOC), Jawa Tengah',
    description: 'Muhiba Telecom provides broadband and network services. We are looking for talented young technicians to assist network deployments.',
    requirements: [
      'Basic computer networking (IP addressing, Subnetting, OSI Layer)',
      'Hands-on cabling & crimping skills (LAN RJ45 & Fiber Optic handling)',
      'Network troubleshooting & device configuration mindset',
      'Good communication and client service orientation',
      'Ability to collaborate within technical field teams',
      'Fresh graduates from SMK Muhammadiyah Bawang welcome'
    ],
    contact: 'hr@muhibatelecom.net',
    deadline: 'June 30, 2026',
    instruction: 'Please send your English application letter and technical certification copies.'
  }
};

// Skill Matching Pairs per Major
export const MAJOR_MATCHING_PAIRS: Record<Major, MatchingPair[]> = {
  AKL: [
    {
      id: 'akl_pair_1',
      skill: 'Ledger & Journal Bookkeeping',
      requirement: 'Basic accounting knowledge'
    },
    {
      id: 'akl_pair_2',
      skill: 'English customer greeting',
      requirement: 'Good communication'
    },
    {
      id: 'akl_pair_3',
      skill: 'Class finance project work',
      requirement: 'Able to work in a team'
    },
    {
      id: 'akl_pair_4',
      skill: 'Spreadsheet formula & tables',
      requirement: 'Computer skills'
    }
  ],
  OTOMOTIF: [
    {
      id: 'oto_pair_1',
      skill: 'Engine overhaul & 4-stroke valve tune-up',
      requirement: 'Engine maintenance skills'
    },
    {
      id: 'oto_pair_2',
      skill: 'Diagnostic scanner code reading',
      requirement: 'Basic automotive knowledge'
    },
    {
      id: 'oto_pair_3',
      skill: 'Wearing safety boots & goggles (K3)',
      requirement: 'Safety awareness'
    },
    {
      id: 'oto_pair_4',
      skill: 'Workshop team vehicle checkup',
      requirement: 'Teamwork'
    }
  ],
  TJKT: [
    {
      id: 'tjkt_pair_1',
      skill: 'IP Addressing & Router configuration',
      requirement: 'Basic networking knowledge'
    },
    {
      id: 'tjkt_pair_2',
      skill: 'Ping test & LAN cable continuity test',
      requirement: 'Troubleshooting skills'
    },
    {
      id: 'tjkt_pair_3',
      skill: 'Explaining internet issues clearly',
      requirement: 'Communication'
    },
    {
      id: 'tjkt_pair_4',
      skill: 'Server rack deployment with classmates',
      requirement: 'Teamwork'
    }
  ]
};

// Daily Quizzes (Clean CEFR A2-B1 English Only)
export const DAILY_QUIZZES: Record<DayNumber, QuizQuestion[]> = {
  1: [
    {
      id: 'q1_1',
      questionEn: 'What is the main purpose of an application letter (cover letter)?',
      options: [
        { key: 'A', text: 'To tell a funny holiday story to friends' },
        { key: 'B', text: 'To apply for a job and present your qualifications' },
        { key: 'C', text: 'To invite coworkers to a graduation party' },
        { key: 'D', text: 'To complain about school examination rules' }
      ],
      correctAnswer: 'B',
      explanationEn: 'An application letter is a formal document sent to an employer to express interest in a job vacancy.'
    },
    {
      id: 'q1_2',
      questionEn: 'Which expression is used to give a polite personal opinion?',
      options: [
        { key: 'A', text: 'In my opinion, both work and college are great paths.' },
        { key: 'B', text: 'Shut up and listen to me now!' },
        { key: 'C', text: 'I do not care what anyone thinks.' },
        { key: 'D', text: 'Give me the correct answer immediately.' }
      ],
      correctAnswer: 'A',
      explanationEn: '"In my opinion..." is a standard polite expression to state your thoughts constructively.'
    },
    {
      id: 'q1_3',
      questionEn: 'What did Pak Budi advise about choosing between work and college?',
      options: [
        { key: 'A', text: 'Only college is good; working is bad.' },
        { key: 'B', text: 'You should stop studying and do nothing.' },
        { key: 'C', text: 'Both are possible; what matters is preparation and knowing what you want.' },
        { key: 'D', text: 'Students are not allowed to graduate this year.' }
      ],
      correctAnswer: 'C',
      explanationEn: 'Pak Budi emphasized that both working and continuing studies are positive if you prepare yourself.'
    },
    {
      id: 'q1_4',
      questionEn: 'Which sentence correctly uses "I think..." to express an idea?',
      options: [
        { key: 'A', text: 'I think we should check the career information board.' },
        { key: 'B', text: 'I thinking go to school yesterday.' },
        { key: 'C', text: 'Think I is very hungry.' },
        { key: 'D', text: 'Are you think tomorrow morning?' }
      ],
      correctAnswer: 'A',
      explanationEn: '"I think we should..." expresses a gentle, collaborative suggestion.'
    },
    {
      id: 'q1_5',
      questionEn: 'Where can students find career guidance and counseling at school?',
      options: [
        { key: 'A', text: 'The parking lot behind the fence' },
        { key: 'B', text: 'Guidance and Counseling Room (Ruang BK)' },
        { key: 'C', text: 'The school football field goalpost' },
        { key: 'D', text: 'Underneath the cafeteria bench' }
      ],
      correctAnswer: 'B',
      explanationEn: 'The Guidance Counseling Room (Ruang BK) is dedicated to helping students plan their future.'
    }
  ],
  2: [
    {
      id: 'q2_1',
      questionEn: 'Where is job vacancy information usually posted in a vocational school?',
      options: [
        { key: 'A', text: 'Announcement board and official career center (BKK)' },
        { key: 'B', text: 'On the roof of the water tank' },
        { key: 'C', text: 'Written in small letters on cafeteria spoons' },
        { key: 'D', text: 'Hidden inside an empty football' }
      ],
      correctAnswer: 'A',
      explanationEn: 'Job boards and career centers (BKK) display official vacancies and recruitment flyers.'
    },
    {
      id: 'q2_2',
      questionEn: 'What does the term "Requirements" mean on a job recruitment brochure?',
      options: [
        { key: 'A', text: 'The video games you must play during lunch' },
        { key: 'B', text: 'The qualifications, skills, and conditions needed for the job' },
        { key: 'C', text: 'The list of dishes served at the company cafeteria' },
        { key: 'D', text: 'The uniform colors worn by the company security' }
      ],
      correctAnswer: 'B',
      explanationEn: '"Requirements" are the skills, education, and competencies expected by the employer.'
    },
    {
      id: 'q2_3',
      questionEn: 'If a vacancy says "Fresh graduates welcome", what does it mean?',
      options: [
        { key: 'A', text: 'Only people with 20 years of experience can apply' },
        { key: 'B', text: 'Students who just graduated from school can apply' },
        { key: 'C', text: 'Applicants must bring fresh fruit to the office' },
        { key: 'D', text: 'Only teachers may apply' }
      ],
      correctAnswer: 'B',
      explanationEn: '"Fresh graduates" refers to new graduates who are starting their professional career.'
    },
    {
      id: 'q2_4',
      questionEn: 'Which of the following is usually NOT found on a professional job brochure?',
      options: [
        { key: 'A', text: 'Company name and open position' },
        { key: 'B', text: 'Required skills and qualifications' },
        { key: 'C', text: 'Application deadline and contact email' },
        { key: 'D', text: 'The principal’s favorite cartoon movie' }
      ],
      correctAnswer: 'D',
      explanationEn: 'Job brochures focus strictly on professional job details, requirements, deadline, and contact instructions.'
    },
    {
      id: 'q2_5',
      questionEn: 'What instruction is commonly given to candidates interested in the job?',
      options: [
        { key: 'A', text: '"Please send your application letter and resume."' },
        { key: 'B', text: '"Please shout your name outside the building."' },
        { key: 'C', text: '"Wait 10 years before doing anything."' },
        { key: 'D', text: '"Delete all your school certificates."' }
      ],
      correctAnswer: 'A',
      explanationEn: 'Employers instruct applicants to submit a formal application letter and CV/resume.'
    }
  ],
  3: [
    {
      id: 'q3_1',
      questionEn: 'How many standard parts are there in a complete formal application letter?',
      options: [
        { key: 'A', text: '2 parts only' },
        { key: 'B', text: '5 parts' },
        { key: 'C', text: '9 parts' },
        { key: 'D', text: '50 parts' }
      ],
      correctAnswer: 'C',
      explanationEn: 'A standard letter includes 9 parts: Sender Info, Date, Receiver Info, Salutation, Opening, Body, Closing, Complimentary Close, and Signature.'
    },
    {
      id: 'q3_2',
      questionEn: 'Which greeting (salutation) is most appropriate for a formal job application?',
      options: [
        { key: 'A', text: 'Hey bro!' },
        { key: 'B', text: 'What’s up dude?' },
        { key: 'C', text: 'Dear Hiring Manager,' },
        { key: 'D', text: 'Hi my good buddy,' }
      ],
      correctAnswer: 'C',
      explanationEn: '"Dear Hiring Manager," or "Dear Mr./Ms. [Name]," is respectful and professional.'
    },
    {
      id: 'q3_3',
      questionEn: 'Which part of the letter states the specific position you are applying for?',
      options: [
        { key: 'A', text: 'Opening Paragraph' },
        { key: 'B', text: 'The envelope stamp' },
        { key: 'C', text: 'Complimentary Close' },
        { key: 'D', text: 'The date line' }
      ],
      correctAnswer: 'A',
      explanationEn: 'The opening paragraph clearly states why you are writing and identifies the target job title.'
    },
    {
      id: 'q3_4',
      questionEn: 'Which part explains your vocational skills, achievements, and suitability for the job?',
      options: [
        { key: 'A', text: 'Body Paragraph' },
        { key: 'B', text: 'Date line' },
        { key: 'C', text: 'Postal barcode' },
        { key: 'D', text: 'The blank margins' }
      ],
      correctAnswer: 'A',
      explanationEn: 'The body paragraph showcases your practical qualifications, projects, and vocational competencies.'
    },
    {
      id: 'q3_5',
      questionEn: 'Which phrase is a proper formal "Complimentary Close"?',
      options: [
        { key: 'A', text: 'Sincerely,' },
        { key: 'B', text: 'See ya later!' },
        { key: 'C', text: 'Bye bye forever,' },
        { key: 'D', text: 'Catch you later,' }
      ],
      correctAnswer: 'A',
      explanationEn: '"Sincerely," "Yours faithfully," and "Respectfully," are standard formal closes in business correspondence.'
    }
  ],
  4: [
    {
      id: 'q4_1',
      questionEn: 'Which opening sentence is the most professional for your letter?',
      options: [
        { key: 'A', text: 'I am writing to apply for the advertised position at your company.' },
        { key: 'B', text: 'Give me this job because I need money right now.' },
        { key: 'C', text: 'I saw your building and it looked nice.' },
        { key: 'D', text: 'I was bored at home so I wrote this letter.' }
      ],
      correctAnswer: 'A',
      explanationEn: '"I am writing to apply for the position..." is professional, courteous, and direct.'
    },
    {
      id: 'q4_2',
      questionEn: 'Why should you match your skills with the company job requirements?',
      options: [
        { key: 'A', text: 'To prove that you have the right capabilities to do the work successfully' },
        { key: 'B', text: 'To make the letter as long as possible' },
        { key: 'C', text: 'Because colors look prettier on paper' },
        { key: 'D', text: 'To confuse the interviewer during the interview' }
      ],
      correctAnswer: 'A',
      explanationEn: 'Matching skills proves relevance and demonstrates that you can fulfill the company’s duties.'
    },
    {
      id: 'q4_3',
      questionEn: 'Which of the following information should NOT be included in your application letter body?',
      options: [
        { key: 'A', text: 'Vocational practical skills and project experience' },
        { key: 'B', text: 'Your willingness to learn and work in a team' },
        { key: 'C', text: 'Irrelevant childhood gossip about your neighbors' },
        { key: 'D', text: 'Relevant software or tool capabilities' }
      ],
      correctAnswer: 'C',
      explanationEn: 'Keep the letter strictly focused on relevant professional and vocational qualifications.'
    },
    {
      id: 'q4_4',
      questionEn: 'What is the purpose of the Closing Paragraph in an application letter?',
      options: [
        { key: 'A', text: 'To thank the recruiter and express enthusiasm for an interview' },
        { key: 'B', text: 'To demand immediate salary payment today' },
        { key: 'C', text: 'To write a recipe for fried rice' },
        { key: 'D', text: 'To criticize other applicants' }
      ],
      correctAnswer: 'A',
      explanationEn: 'The closing paragraph thanks the employer and looks forward to discussing qualifications in an interview.'
    },
    {
      id: 'q4_5',
      questionEn: 'Where should your full typed name appear at the end of the letter?',
      options: [
        { key: 'A', text: 'Directly below the complimentary close and signature' },
        { key: 'B', text: 'Written backwards at the top right corner' },
        { key: 'C', text: 'Inside a secret envelope' },
        { key: 'D', text: 'Nowhere on the paper' }
      ],
      correctAnswer: 'A',
      explanationEn: 'Your printed name belongs below the signature line at the very bottom.'
    }
  ],
  5: [
    {
      id: 'q5_1',
      questionEn: 'What was the surprising plot twist revealed by Mr. Hendra?',
      options: [
        { key: 'A', text: 'The whole quest was an authentic school simulation to test career readiness and English skills!' },
        { key: 'B', text: 'The school had been moved to another country.' },
        { key: 'C', text: 'All exams were cancelled forever.' },
        { key: 'D', text: 'Everyone had to repeat the first grade.' }
      ],
      correctAnswer: 'A',
      explanationEn: 'The entire journey was an immersive simulation designed by SMK Muhammadiyah Bawang to build real career confidence.'
    },
    {
      id: 'q5_2',
      questionEn: 'Does the game consider "going to college" or "entering the workforce" as the only correct choice?',
      options: [
        { key: 'A', text: 'No, both paths are valuable and respectable; your future is your choice!' },
        { key: 'B', text: 'Yes, only working is allowed.' },
        { key: 'C', text: 'Yes, only college is allowed.' },
        { key: 'D', text: 'Neither is allowed.' }
      ],
      correctAnswer: 'A',
      explanationEn: 'Vocational graduates can excel both in immediate employment and in higher academic studies.'
    },
    {
      id: 'q5_3',
      questionEn: 'How does mastering English Application Letters benefit students going to college?',
      options: [
        { key: 'A', text: 'It prepares them for scholarship applications, campus internships, and future careers.' },
        { key: 'B', text: 'It is completely useless for college students.' },
        { key: 'C', text: 'It is only used for buying groceries.' },
        { key: 'D', text: 'It prevents students from borrowing campus books.' }
      ],
      correctAnswer: 'A',
      explanationEn: 'Formal writing skills are vital for university admissions, study grants, and post-graduation jobs.'
    },
    {
      id: 'q5_4',
      questionEn: 'Which core competencies did you demonstrate throughout Muhiba Career Quest?',
      options: [
        { key: 'A', text: 'English communication, critical thinking, problem-solving, and career readiness' },
        { key: 'B', text: 'Giving up quickly without trying' },
        { key: 'C', text: 'Ignoring teacher instructions' },
        { key: 'D', text: 'Skipping classes' }
      ],
      correctAnswer: 'A',
      explanationEn: 'The quest cultivates 21st-century vocational competencies: language, logic, and self-efficacy.'
    },
    {
      id: 'q5_5',
      questionEn: 'What is the spirit and motto of SMK Muhammadiyah Bawang?',
      options: [
        { key: 'A', text: 'Islamic Character, Skilled Craftsmanship, Independent Leadership (Islami, Terampil, Mandiri)' },
        { key: 'B', text: 'Waiting for others to do the work' },
        { key: 'C', text: 'Refusing modern technology' },
        { key: 'D', text: 'Avoiding challenges' }
      ],
      correctAnswer: 'A',
      explanationEn: 'SMK Muhammadiyah Bawang empowers students with Islamic character, skilled craftsmanship, and self-reliance.'
    }
  ]
};

// Opening Dialogue Script for Courtyard (English Only)
export const OPENING_DIALOGUE = [
  {
    speaker: 'Student A (Raka)',
    en: "I can't believe graduation is so close.",
    avatar: 'boy'
  },
  {
    speaker: 'Student B (Sinta)',
    en: "Yeah. But what will we do after graduation?",
    avatar: 'girl_hijab'
  },
  {
    speaker: 'Student A (Raka)',
    en: "I still don't know. Should I work or go to college?",
    avatar: 'boy'
  },
  {
    speaker: 'Student C (Dimas)',
    en: "Maybe we should find some information first around the school.",
    avatar: 'boy'
  },
  {
    speaker: 'Student A (Raka)',
    en: "Good idea. Let's explore SMK Muhammadiyah Bawang and talk to our teachers!",
    avatar: 'boy'
  }
];

// Helper to calculate candidate rating tier
export function getCandidateTier(score: number): {
  tier: string;
  badgeColor: string;
  badgeBg: string;
  summaryEn: string;
} {
  if (score >= 90) {
    return {
      tier: 'Excellent Career Candidate',
      badgeColor: '#065F46',
      badgeBg: '#D1FAE5',
      summaryEn: 'Outstanding performance across English communication, application letter structure, and career problem-solving!'
    };
  }
  if (score >= 80) {
    return {
      tier: 'Strong Candidate',
      badgeColor: '#0369A1',
      badgeBg: '#E0F2FE',
      summaryEn: 'High-level vocational readiness with solid English application letter proficiency.'
    };
  }
  if (score >= 70) {
    return {
      tier: 'Promising Candidate',
      badgeColor: '#854D0E',
      badgeBg: '#FEF9C3',
      summaryEn: 'Good foundational comprehension with great potential for workplace success.'
    };
  }
  if (score >= 60) {
    return {
      tier: 'Keep Practicing',
      badgeColor: '#C2410C',
      badgeBg: '#FFEDD5',
      summaryEn: 'Solid progress made! Review letter sections to sharpen your professional tone.'
    };
  }
  return {
    tier: 'Career Preparation Needed',
    badgeColor: '#991B1B',
    badgeBg: '#FEE2E2',
    summaryEn: 'Keep learning and consult Pak Budi or your vocational teachers for more practice.'
  };
}
