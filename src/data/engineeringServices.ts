import { EngineeringService } from '../types/engineering';

export const ENGINEERING_SERVICES: EngineeringService[] = [
  {
    slug: 'building-design',
    number: '01',
    iconName: 'building',
    titleEn: 'Building Design',
    titleBn: 'বিল্ডিং ডিজাইন',
    shortDescEn: 'Building planning, layout development and practical design solutions.',
    shortDescBn: 'বিল্ডিং প্ল্যানিং, লেআউট প্রণয়ন এবং বাস্তবমুখী ডিজাইন সমাধান।',
    introductionEn: 'BDCON Engineering delivers practical, buildable building design solutions. We integrate spatial efficiency, structural soundness, and regulatory standards to turn requirements into functional, durable physical structures.',
    introductionBn: 'বিডিকন ইঞ্জিনিয়ারিং বাস্তবমুখী ও টেকসই বিল্ডিং ডিজাইন সমাধান প্রদান করে। আমরা প্রতিটি প্রকল্পের প্রয়োজনীয়তাকে কার্যকরী ও দীর্ঘস্থায়ী রূপ দিতে স্থাপত্যের উপযোগিতা, কাঠামোগত নিরাপত্তা এবং কোড মানদণ্ডের সমন্বয় নিশ্চিত করি।',
    whatWeProvideEn: [
      'Comprehensive architectural space planning and functional layouts',
      'Structural coordination ensuring buildability on actual site conditions',
      'Orientation, ventilation, and natural lighting optimization',
      'Compliance alignment with national building codes (BNBC) and local regulations',
      'Practical residential, commercial, and mixed-use building concepts'
    ],
    whatWeProvideBn: [
      'আবাসিক ও বাণিজ্যিক ভবনের সামগ্রিক স্থাপত্য পরিকল্পনা ও কার্যকর লেআউট',
      'সাইটের বাস্তব অবস্থার সাথে সামঞ্জস্যপূর্ণ স্ট্রাকচারাল সমন্বয়',
      'প্রাকৃতিক আলো-বাতাস ও স্থান ব্যবহারের সর্বোচ্চ উপযোগিতা নিশ্চিতকরণ',
      'জাতীয় বিল্ডিং কোড (BNBC) ও স্থানীয় নিয়মনীতি অনুসরণ',
      'বাস্তবায়নযোগ্য ও সাশ্রয়ী নকশা প্রণয়ন'
    ],
    deliverablesEn: [
      'Architectural floor plans and dimension layouts',
      'Roof and utility placement plans',
      'Primary elevation schematics and building sections',
      'Door and window placement schedules',
      'Conceptual structural grid layout recommendations'
    ],
    deliverablesBn: [
      'আর্কিটেকচারাল ফ্লোর প্ল্যান ও সুনির্দিষ্ট ডাইমেনশন লেআউট',
      'রুফ প্ল্যান ও ইউটিলিটি লেআউট ড্রয়িং',
      'বিল্ডিং এলিভেশন শিট ও সেকশন ড্রয়িং',
      'দরজা-জানালার সুনির্দিষ্ট বিবরণ ও শিডিউল',
      'প্রাথমিক স্ট্রাকচারাল গ্রিড লেআউট নোট'
    ],
    workflow: [
      {
        step: '01',
        titleEn: 'Requirement & Site Review',
        titleBn: 'চাহিদা ও সাইট পর্যালোচনা',
        descEn: 'Understanding project goals, plot dimensions, orientation, and specific functional needs.',
        descBn: 'প্রকল্পের লক্ষ্য, প্লটের পরিমাপ, দিকনির্দেশনা ও ব্যবহারিক চাহিদা নিরূপণ।'
      },
      {
        step: '02',
        titleEn: 'Conceptual Layout Development',
        titleBn: 'প্রাথমিক লেআউট প্রণয়ন',
        descEn: 'Drafting initial spatial plans balancing room relationships, circulation, and site parameters.',
        descBn: 'স্থান বণ্টন, চলাচল ও আলোর ব্যবহার বিবেচনা করে প্রাথমিক লেআউট তৈরি।'
      },
      {
        step: '03',
        titleEn: 'Structural & Code Alignment',
        titleBn: 'কাঠামো ও কোড সমন্বয়',
        descEn: 'Reviewing layout against structural column grids, code regulations, and buildability constraints.',
        descBn: 'স্ট্রাকচারাল কলাম গ্রিড ও বিল্ডিং কোডের সাথে নকশার সমন্বয় সাধন।'
      },
      {
        step: '04',
        titleEn: 'Final Design Documentation',
        titleBn: 'চূড়ান্ত ডিজাইন ডকুমেন্টেশন',
        descEn: 'Compiling coordinated architectural drawings ready for subsequent engineering phases.',
        descBn: 'পরবর্তী ইঞ্জিনিয়ারিং ধাপের উপযোগী সমন্বিত পূর্ণাঙ্গ ড্রয়িং শিট প্রস্তুতকরণ।'
      }
    ]
  },
  {
    slug: 'design-engineering-drawings',
    number: '02',
    iconName: 'drafting',
    titleEn: 'Design & Engineering Drawings',
    titleBn: 'ডিজাইন ও ইঞ্জিনিয়ারিং ড্রয়িং',
    shortDescEn: 'Professional technical drawings and engineering documentation.',
    shortDescBn: 'পেশাদার টেকনিক্যাল ড্রয়িং এবং ইঞ্জিনিয়ারিং ডকুমেন্টেশন।',
    introductionEn: 'Clear and precise technical drawings are essential for safe, error-free construction. BDCON Engineering produces comprehensive structural working drawings and engineering documentation tailored for immediate site execution.',
    introductionBn: 'নির্ভুল ও নিরাপদ নির্মাণের প্রধান ভিত্তি হলো স্পষ্ট টেকনিক্যাল ড্রয়িং। বিডিকন ইঞ্জিনিয়ারিং সাইট ইঞ্জিনিয়ার ও ঠিকাদারদের সরাসরি ব্যবহারের উপযোগী বিস্তারিত স্ট্রাকচারাল ওয়ার্কিং ড্রয়িং ও ইঞ্জিনিয়ারিং ডকুমেন্টেশন প্রস্তুত করে।',
    whatWeProvideEn: [
      'Complete structural working drawings ready for field construction',
      'Foundation layouts, column schedules, and footing details',
      'Floor beam, grade beam, and roof framing plans',
      'Slab rebar placement, bar bending schedules, and lap detailing',
      'Staircase, water reservoir, and structural retaining detail sheets'
    ],
    whatWeProvideBn: [
      'মাঠপর্যায়ে নির্মাণের সরাসরি উপযোগী পূর্ণাঙ্গ স্ট্রাকচারাল ওয়ার্কিং ড্রয়িং',
      'ফাউন্ডেশন লেআউট, কলাম শিডিউল এবং ফুটিং ডিটেইলিং শিট',
      'গ্রেড বিম, ফ্লোর বিম ও রুফ ফ্রেমিং প্ল্যান',
      'স্ল্যাব রড বিন্যাস ও ল্যাপিং ডিটেইলিং',
      'সিঁড়ি, আন্ডারগ্রাউন্ড ওয়াটার ট্যাংক ও রিটেইনিং ওয়ালের ড্রয়িং'
    ],
    deliverablesEn: [
      'Structural foundation layout and section sheets',
      'Column layout schedule with reinforcement cross-sections',
      'Beam framing layouts and continuous longitudinal sections',
      'Slab bottom and top rebar layout drawings',
      'General structural notes, concrete specifications, and cover details'
    ],
    deliverablesBn: [
      'স্ট্রাকচারাল ফাউন্ডেশন লেআউট ও সেকশন ড্রয়িং',
      'কলাম শিডিউল ও রড প্লেসমেন্ট ক্রস-সেকশন শিট',
      'বিম ফ্রেমিং লেআউট ও রড ডিটেইলিং সেকশন',
      'স্ল্যাব টপ ও বটম রড বাইন্ডিং ড্রয়িং',
      'সাধারণ স্ট্রাকচারাল নোট, কংক্রিট গ্রেড ও ক্লিয়ার কভার নির্দেশনা'
    ],
    workflow: [
      {
        step: '01',
        titleEn: 'Design Input Analysis',
        titleBn: 'ডিজাইন ইনপুট বিশ্লেষণ',
        descEn: 'Evaluating architectural drawings, soil reports, and structural loading requirements.',
        descBn: 'আর্কিটেকচারাল প্ল্যান, মাটির বৈশিষ্ট্য ও কাঠামোগত লোড বিশ্লেষণ।'
      },
      {
        step: '02',
        titleEn: 'Structural Drafting',
        titleBn: 'স্ট্রাকচারাল ড্রাফটিং',
        descEn: 'Developing coordinated CAD drawings for foundation, columns, beams, and slabs.',
        descBn: 'ফাউন্ডেশন, কলাম, বিম ও স্ল্যাবের সুনির্দিষ্ট ক্যাড ড্রয়িং প্রস্তুতকরণ।'
      },
      {
        step: '03',
        titleEn: 'Detailing & Schedule Verification',
        titleBn: 'ডিটেইলিং ও শিডিউল যাচাই',
        descEn: 'Verifying rebar curtailment, lap lengths, tie spacings, and structural clarity.',
        descBn: 'রড কাটিং, ল্যাপ লেন্থ, টাই স্পেসিং এবং ড্রয়িংয়ের স্পষ্টতা যাচাই।'
      },
      {
        step: '04',
        titleEn: 'Construction-Ready Delivery',
        titleBn: 'সাইট-উপযোগী ড্রয়িং হস্তান্তর',
        descEn: 'Issuing numbered, annotated technical drawings ready for on-site implementation.',
        descBn: 'সাইটে কাজের জন্য প্রস্তুত পরিচ্ছন্ন ও নির্দেশনামূলক ড্রয়িং সেট হস্তান্তর।'
      }
    ]
  },
  {
    slug: 'building-estimation',
    number: '03',
    iconName: 'calculator',
    titleEn: 'Building Estimation',
    titleBn: 'বিল্ডিং এস্টিমেশন',
    shortDescEn: 'Quantity takeoff, material quantities and construction cost estimation.',
    shortDescBn: 'কোয়ান্টিটি টেক-অফ, নির্মাণ সামগ্রীর সঠিক হিসাব এবং নির্মাণ ব্যয় প্রাক্কলন।',
    introductionEn: 'Uncertain material quantities lead to project delays and cost overruns. BDCON Engineering provides accurate building estimation based on engineered drawings, giving clients dependable material volumes and cost forecasts before execution begins.',
    introductionBn: 'নির্মাণ সামগ্রীর হিসাবে অস্পষ্টতা থাকলে প্রকল্পের সময় ও ব্যয় দুটোই অনাকাঙ্ক্ষিতভাবে বৃদ্ধি পায়। বিডিকন ইঞ্জিনিয়ারিং ড্রয়িংয়ের ভিত্তিতে সুনির্দিষ্ট এস্টিমেশন প্রদান করে, যা কাজ শুরুর পূর্বেই ক্লায়েন্টকে প্রয়োজনীয় সামগ্রী ও ব্যয়ের স্বচ্ছ হিসাব দেয়।',
    whatWeProvideEn: [
      'Rigorous material takeoff from structural and architectural drawings',
      'Total reinforcement steel tonnage broken down by diameter (8mm to 25mm)',
      'Concrete volume calculations (cement bags, sand volume, stone/brick chips)',
      'Masonry brickwork, plastering, and surface finishing estimates',
      'Phase-wise material requirements matching construction schedules'
    ],
    whatWeProvideBn: [
      'স্ট্রাকচারাল ও আর্কিটেকচারাল ড্রয়িংয়ের ভিত্তিতে নিখুঁত পরিমাপ',
      'রডের মোট ওজন ও ডায়াভিত্তিক (৮ মিমি থেকে ২৫ মিমি) বিস্তারিত হিসাব',
      'কংক্রিট কাজের সঠিক ভলিউম (সিমেন্ট ব্যাগ, বালু এবং পাথর/খোয়ার পরিমাণ)',
      'ইটের গাঁথুনি, প্লাস্টার এবং ফিনিশিং কাজের নির্ভুল প্রাক্কলন',
      'নির্মাণ কাজের ধাপ অনুযায়ী সামগ্রীর চাহিদাপত্র'
    ],
    deliverablesEn: [
      'Itemized material quantity summary spreadsheet',
      'Rebar schedule showing bar count, cut length, and total weight',
      'Substructure vs. superstructure quantity division',
      'Pre-construction estimated budget report',
      'Variance advisory for market contingency planning'
    ],
    deliverablesBn: [
      'আইটেমভিত্তিক নির্মাণ সামগ্রীর পরিমাণ শিট',
      'রডের ডায়াভিত্তিক ওজন ও প্রয়োজনীয়তার শিডিউল',
      'সাব-স্ট্রাকচার ও সুপার-স্ট্রাকচারের আলাদা পরিমাপ রিপোর্ট',
      'নির্মাণ শুরুর পূর্বে অনুমিত সামগ্রিক বাজেট রিপোর্ট',
      'বাজার মূল্যের সম্ভাব্য পরিবর্তনের সমন্বয় নোট'
    ],
    workflow: [
      {
        step: '01',
        titleEn: 'Drawing Audit',
        titleBn: 'ড্রয়িং নিরীক্ষা',
        descEn: 'Reviewing all drawings and specifications to ensure dimension completeness.',
        descBn: 'পরিমাপের সম্পূর্ণতা নিশ্চিত করতে ড্রয়িং ও স্পেসিফিকেশন পুঙ্খানুপুঙ্খ পর্যালোচনা।'
      },
      {
        step: '02',
        titleEn: 'Quantity Takeoff Calculation',
        titleBn: 'পরিমাণ নিরূপণ',
        descEn: 'Extracting physical dimensions to compute earthwork, concrete, steel, and masonry quantities.',
        descBn: 'মাটি কাটা, কংক্রিট, রড ও গাঁথুনির সঠিক ভলিউম ও ওজন পরিমাপ।'
      },
      {
        step: '03',
        titleEn: 'Compilation & Cross-Check',
        titleBn: 'সংকলন ও সমন্বয় যাচাই',
        descEn: 'Cross-verifying totals using standard engineering allowance and wastage factors.',
        descBn: 'প্রকৌশল মানদণ্ড ও অপচয় বিবেচনা করে হিসাবের নির্ভুলতা নিশ্চিতকরণ।'
      },
      {
        step: '04',
        titleEn: 'Estimation Report Delivery',
        titleBn: 'এস্টিমেশন রিপোর্ট হস্তান্তর',
        descEn: 'Delivering clear, categorized spreadsheets that property owners and contractors can trust.',
        descBn: 'ক্লায়েন্ট ও ঠিকাদারের নির্ভরযোগ্য ব্যবহারের জন্য সুবিন্যস্ত এস্টিমেশন শিট প্রদান।'
      }
    ]
  },
  {
    slug: 'quantity-surveying-boq',
    number: '04',
    iconName: 'spreadsheet',
    titleEn: 'Quantity Surveying & BOQ',
    titleBn: 'কোয়ান্টিটি সার্ভেয়িং ও বিওকিউ (BOQ)',
    shortDescEn: 'Measurement, quantity analysis and BOQ preparation.',
    shortDescBn: 'পরিমাপ, পরিমাণ বিশ্লেষণ এবং প্রমিত বিওকিউ প্রস্তুতকরণ।',
    introductionEn: 'A standardized Bill of Quantities (BOQ) is the commercial backbone of any construction contract. BDCON Engineering provides professional quantity surveying, itemized rate breakdowns, and tender-ready documentation to protect project budgets.',
    introductionBn: 'একটি প্রমিত বিল অব কোয়ান্টিটিজ (BOQ) যেকোনো নির্মাণ চুক্তির প্রধান বাণিজ্যিক ভিত্তি। বিডিকন ইঞ্জিনিয়ারিং পেশাদার কোয়ান্টিটি সার্ভেয়িং, আইটেমভিত্তিক দর বিশ্লেষণ এবং স্বচ্ছ টেন্ডার ডকুমেন্টেশন প্রণয়ন করে প্রকল্পের বাজেট নিয়ন্ত্রণ নিশ্চিত করে।',
    whatWeProvideEn: [
      'Standardized Bill of Quantities structured by trade and construction stage',
      'Clear item descriptions preventing ambiguity during contractor bidding',
      'Itemized rate analysis grounded in current material and labor market rates',
      'Tender schedule preparation for competitive, transparent bidding',
      'Interim bill verification and quantity variation auditing during execution'
    ],
    whatWeProvideBn: [
      'কাজের পর্যায় ও আইটেম অনুযায়ী প্রমিত বিল অব কোয়ান্টিটিজ (BOQ) প্রস্তুতকরণ',
      'ঠিকাদার মূল্যায়নের জন্য প্রতিটি কাজের সুনির্দিষ্ট কারিগরি বিবরণ',
      'চলতি বাজারদর ও লেবার খরচের ভিত্তিতে আইটেমভিত্তিক রেট অ্যানালাইসিস',
      'প্রতিযোগিতামূলক ও স্বচ্ছ ঠিকাদার নির্বাচনের জন্য টেন্ডার শিডিউল',
      'চলমান প্রকল্পে কাজের পরিমাপ যাচাই ও বিল নিরীক্ষা'
    ],
    deliverablesEn: [
      'Formatted Bill of Quantities (BOQ) document with item codes and units',
      'Rate analysis breakdown sheet for major construction items',
      'Tender inquiry schedule for contractor procurement',
      'Payment milestone recommendations tied to measurable work output',
      'Material requisition baseline sheet'
    ],
    deliverablesBn: [
      'আইটেম কোড ও পরিমাপের এককসহ পূর্ণাঙ্গ বিওকিউ (BOQ) ডকুমেন্ট',
      'প্রধান নির্মাণ কাজের বিস্তারিত দর বিশ্লেষণ শিট',
      'ঠিকাদার বাছাইয়ের জন্য প্রস্তুত টেন্ডার শিডিউল',
      'কাজের অগ্রগতির সাথে সম্পর্কিত বিল পরিশোধের মাইলস্টোন গাইডলাইন',
      'সাইট ম্যাটেরিয়াল রিকুইজিশন বেসলাইন ডকুমেন্ট'
    ],
    workflow: [
      {
        step: '01',
        titleEn: 'Scope Breakdown',
        titleBn: 'কাজের পরিধি নির্ধারণ',
        descEn: 'Dissecting project documents into standard civil engineering work items.',
        descBn: 'প্রকল্পের ড্রয়িং পর্যালোচনা করে প্রতিটি কাজের আলাদা আইটেম তালিকা প্রস্তুত।'
      },
      {
        step: '02',
        titleEn: 'Quantity Verification',
        titleBn: 'পরিমাপ যাচাইকরণ',
        descEn: 'Conducting rigorous quantity calculations following standard measurement methods.',
        descBn: 'প্রমিত পরিমাপ পদ্ধতি অনুসরণ করে প্রতিটি আইটেমের সুনির্দিষ্ট হিসাব।'
      },
      {
        step: '03',
        titleEn: 'Rate Formulation & Pricing',
        titleBn: 'দর বিশ্লেষণ ও মূল্য সংযোজন',
        descEn: 'Applying realistic material, plant, labor, and overhead components.',
        descBn: 'বাস্তবসম্মত মালামাল, লেবার খরচ ও আনুষঙ্গিক ব্যয় বিশ্লেষণ করে দর নির্ধারণ।'
      },
      {
        step: '04',
        titleEn: 'Final BOQ Package Issuance',
        titleBn: 'চূড়ান্ত বিওকিউ প্যাকেজ প্রদান',
        descEn: 'Issuing standardized BOQ documentation ready for contractor contracting.',
        descBn: 'চুক্তি ও কাজের জন্য সম্পূর্ণ প্রস্তুত প্রমিত বিওকিউ ডকুমেন্ট হস্তান্তর।'
      }
    ]
  },
  {
    slug: 'construction-consultancy',
    number: '05',
    iconName: 'hardhat',
    titleEn: 'Construction Consultancy',
    titleBn: 'কনস্ট্রাকশন কনসালটেন্সি',
    shortDescEn: 'Technical engineering guidance and construction-related support.',
    shortDescBn: 'কারিগরি ইঞ্জিনিয়ারিং দিকনির্দেশনা এবং নির্মাণকালীন পরামর্শ।',
    introductionEn: 'Translating engineering drawings into reality requires sound technical oversight. BDCON Engineering provides practical construction consultancy, guiding property owners and execution teams on quality, safety, and sequence adherence.',
    introductionBn: 'ড্রয়িংকে বাস্তবে রূপ দিতে প্রয়োজন নির্ভরযোগ্য কারিগরি তদারকি। বিডিকন ইঞ্জিনিয়ারিং নির্মাণ কাজের গুণমান, নিরাপত্তা এবং কাজের সঠিক পর্যায়ক্রম বজায় রাখতে ক্লায়েন্ট ও নির্মাণ দলকে মাঠপর্যায়ে বাস্তবমুখী পরামর্শ প্রদান করে।',
    whatWeProvideEn: [
      'Independent technical review of ongoing construction activities',
      'Rebar binding, shuttering, and casting inspection guidance',
      'Quality control advisory for concrete mixing, curing, and testing',
      'Practical resolution of on-site discrepancies between plan and field condition',
      'Material quality verification recommendations (steel, cement, aggregates)'
    ],
    whatWeProvideBn: [
      'চলমান নির্মাণ কাজের নিরপেক্ষ কারিগরি পর্যালোচনা ও পরামর্শ',
      'রড বাইন্ডিং, শাটারিং এবং ঢালাই কাজের মান তদারকি নির্দেশনা',
      'কংক্রিট মিক্সিং, কিউরিং এবং টেস্ট সংক্রান্ত কোয়ালিটি কন্ট্রোল পরামর্শ',
      'সাইটের বাস্তব সমস্যা ও ড্রয়িংয়ের অমিলের তাৎক্ষণিক প্রকৌশল সমাধান',
      'নির্মাণ সামগ্রীর (রড, সিমেন্ট, পাথর) মান নিশ্চিতকরণ পরামর্শ'
    ],
    deliverablesEn: [
      'Site observation and technical advisory memoranda',
      'Pre-pour inspection checklists and casting readiness review',
      'Quality non-conformance notes and remedial action recommendations',
      'Material sample evaluation guidance',
      'Phase completion engineering verification notes'
    ],
    deliverablesBn: [
      'সাইট পরিদর্শন ও কারিগরি পরামর্শ প্রতিবেদন',
      'ঢালাইয়ের পূর্ববর্তী চেকলিস্ট ও প্রস্তুতি পর্যবেক্ষণ নোট',
      'কাজের ত্রুটি চিহ্নিতকরণ ও তাৎক্ষণিক প্রতিকার নির্দেশনা',
      'নির্মাণ সামগ্রী পরীক্ষার মানদণ্ড সংক্রান্ত সুপারিশ',
      'ধাপভিত্তিক কাজের সন্তোষজনক সমাপ্তি পর্যবেক্ষণ বিবরণী'
    ],
    workflow: [
      {
        step: '01',
        titleEn: 'Site Status Assessment',
        titleBn: 'সাইটের অবস্থা মূল্যায়ন',
        descEn: 'Reviewing current construction stage, schedules, and specific site challenges.',
        descBn: 'চলমান কাজের বর্তমান ধাপ, সময়সূচি ও সম্ভাব্য চ্যালেঞ্জগুলো চিহ্নিতকরণ।'
      },
      {
        step: '02',
        titleEn: 'Engineering Inspection & Guidance',
        titleBn: 'কারিগরি পরিদর্শন ও নির্দেশনা',
        descEn: 'Examining shuttering, rebar placements, structural alignment, and safety protocols.',
        descBn: 'শাটারিং, রড স্থাপন, কাঠামোগত সঠিকতা ও নিরাপত্তা মান যাচাই।'
      },
      {
        step: '03',
        titleEn: 'Issue Resolution & Reporting',
        titleBn: 'সমস্যা সমাধান ও নির্দেশনা প্রদান',
        descEn: 'Delivering clear technical advice to resolve site hurdles without compromising structural safety.',
        descBn: 'নিরাপত্তা ক্ষুণ্ণ না করে সাইটের সমস্যা সমাধানে সুনির্দিষ্ট লিখিত ও মৌখিক নির্দেশনা।'
      },
      {
        step: '04',
        titleEn: 'Ongoing Advisory Support',
        titleBn: 'চলমান পরামর্শ সহায়তা',
        descEn: 'Maintaining communication with the project owner through crucial construction milestones.',
        descBn: 'গুরুত্বপূর্ণ ঢালাই ও নির্মাণ ধাপে ক্লায়েন্টের সাথে নিয়মিত পরামর্শ যোগাযোগ।'
      }
    ]
  },
  {
    slug: 'civil-engineering-consultancy',
    number: '06',
    iconName: 'compass',
    titleEn: 'Civil Engineering Consultancy',
    titleBn: 'সিভিল ইঞ্জিনিয়ারিং কনসালটেন্সি',
    shortDescEn: 'Project-specific engineering advice and practical technical solutions.',
    shortDescBn: 'প্রকল্পভিত্তিক প্রকৌশল পরামর্শ এবং বাস্তবসম্মত কারিগরি সমাধান।',
    introductionEn: 'Complex structural and civil engineering challenges demand experienced, sound judgment. BDCON Engineering delivers project-specific civil engineering advisory, structural evaluations, and practical solutions grounded in safety and economics.',
    introductionBn: 'জটিল কাঠামোগত ও সিভিল ইঞ্জিনিয়ারিং সমস্যায় প্রয়োজন বাস্তব অভিজ্ঞতা ও দূরদর্শী সিদ্ধান্ত। বিডিকন ইঞ্জিনিয়ারিং প্রতিটি প্রকল্পের প্রেক্ষাপট অনুযায়ী নিরাপত্তা ও আর্থিক সাশ্রয় বিবেচনা করে পেশাদার প্রকৌশল পরামর্শ ও সমাধান প্রদান করে।',
    whatWeProvideEn: [
      'Structural safety and integrity evaluations for existing buildings',
      'Technical feasibility studies for planned expansions or modifications',
      'Practical engineering advisory for challenging site and foundation conditions',
      'Retrofitting and strengthening recommendations for compromised structures',
      'Independent engineering consultation for dispute avoidance and quality verification'
    ],
    whatWeProvideBn: [
      'বিদ্যমান ভবনের কাঠামোগত নিরাপত্তা ও স্থায়িত্ব মূল্যায়ন',
      'ভবন বর্ধিতকরণ বা রূপান্তরের ক্ষেত্রে কারিগরি সম্ভাব্যতা যাচাই',
      'কঠিন সাইট পরিস্থিতি ও জটিল ফাউন্ডেশনে প্রকৌশল সমাধান',
      'দুর্বল বা ক্ষতিগ্রস্ত কাঠামোর রেট্রোফিটিং ও শক্তিশালীকরণ পরামর্শ',
      'প্রকল্পের গুণমান নিশ্চিতকরণে স্বাধীন প্রকৌশল মতামত'
    ],
    deliverablesEn: [
      'Civil engineering condition assessment report',
      'Structural safety evaluation summary with visual defect mapping',
      'Technical feasibility memorandum for proposed modifications',
      'Remedial and retrofitting engineering guidelines',
      'Code compliance advisory documentation'
    ],
    deliverablesBn: [
      'সিভিল ইঞ্জিনিয়ারিং অবস্থা মূল্যায়ন প্রতিবেদন',
      'দৃশ্যমান ত্রুটি ম্যাপিং ও কাঠামোগত নিরাপত্তা বিশ্লেষণ নোট',
      'ভবন পরিবর্তনের সম্ভাব্যতা বিষয়ক কারিগরি প্রতিবেদন',
      'রেট্রোফিটিং ও কাঠামো মেরামতের সুনির্দিষ্ট প্রকৌশল গাইডলাইন',
      'কোড সম্মতি সংক্রান্ত পরামর্শ ডকুমেন্ট'
    ],
    workflow: [
      {
        step: '01',
        titleEn: 'Problem Identification',
        titleBn: 'সমস্যা চিহ্নিতকরণ',
        descEn: 'Examining client objectives, structural symptoms, or expansion plans.',
        descBn: 'ক্লায়েন্টের উদ্দেশ্য, কাঠামোগত কোনো লক্ষণ বা সম্প্রসারণের পরিকল্পনা নিরূপণ।'
      },
      {
        step: '02',
        titleEn: 'Technical Investigation',
        titleBn: 'কারিগরি অনুসন্ধান',
        descEn: 'Reviewing existing drawings, site context, loading history, and structural conditions.',
        descBn: 'বিদ্যমান ড্রয়িং, সাইট প্রেক্ষাপট, লোড হিস্ট্রি ও বর্তমান কাঠামোগত অবস্থা পর্যালোচনা।'
      },
      {
        step: '03',
        titleEn: 'Engineering Evaluation',
        titleBn: 'প্রকৌশল মূল্যায়ন',
        descEn: 'Performing structural calculations and assessing code-compliant remedial options.',
        descBn: 'প্রকৌশল হিসাব ও কোড অনুযায়ী সম্ভাব্য সর্বোত্তম সমাধান বিশ্লেষণ।'
      },
      {
        step: '04',
        titleEn: 'Advisory Report Delivery',
        titleBn: 'পরামর্শ প্রতিবেদন হস্তান্তর',
        descEn: 'Presenting a clear, actionable engineering report with practical recommendations.',
        descBn: 'বাস্তবায়নযোগ্য ও সাশ্রয়ী দিকনির্দেশনাসহ স্পষ্ট প্রকৌশল প্রতিবেদন প্রদান।'
      }
    ]
  }
];

export async function getEngineeringServices(): Promise<EngineeringService[]> {
  return ENGINEERING_SERVICES;
}

export async function getEngineeringServiceBySlug(slug: string): Promise<EngineeringService | undefined> {
  // Support aliases for flexibility
  if (slug === 'design-drawings') {
    return ENGINEERING_SERVICES.find(s => s.slug === 'design-engineering-drawings');
  }
  if (slug === 'civil-consultancy') {
    return ENGINEERING_SERVICES.find(s => s.slug === 'civil-engineering-consultancy');
  }
  return ENGINEERING_SERVICES.find(s => s.slug === slug);
}
