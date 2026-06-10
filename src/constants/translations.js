// ─────────────────────────────────────────────────────────────────
//  translations.js  —  SEO-Optimized Multi-language Content
//  Taxi Service: Trending Drop Taxi | Tamil Nadu Outstation
//  SEO Strategy:
//    • Keyword-rich headings & descriptions (long-tail outstation queries)
//    • Hreflang-ready lang codes (en, ta)
//    • Structured data strings for JSON-LD (LocalBusiness + FAQPage)
//    • Meta title / description / keywords per lang
//    • Open Graph strings
// ─────────────────────────────────────────────────────────────────

export const seoMeta = {
  en: {
    // ── <title> tag ──────────────────────────────────────────────
    pageTitle: 'Trending Drop Taxi | Outstation Cab Service Tamil Nadu – ₹16/km',

    // ── <meta name="description"> ────────────────────────────────
    metaDescription:
      'Book outstation taxi in Tamil Nadu from ₹16/km. No return fare, no hidden charges. Sedan, SUV & Innova cabs from Coimbatore, Tirunelveli, Chennai, Madurai. 24/7 booking.',

    // ── <meta name="keywords"> ───────────────────────────────────
    metaKeywords:
      'outstation taxi Tamil Nadu, drop taxi Coimbatore, one way cab Chennai to Madurai, outstation cab Tirunelveli, Coimbatore to Bangalore taxi, no return fare taxi, drop taxi service TN, affordable outstation cab, Trending Drop Taxi',

    // ── Open Graph ───────────────────────────────────────────────
    ogTitle: 'Trending Drop Taxi – No Return Fare | Tamil Nadu Outstation Cab',
    ogDescription:
      'Flat ₹16/km outstation cab across Tamil Nadu. Zero surge pricing. Verified chauffeurs. Book online instantly via WhatsApp.',
    ogType: 'website',

    // ── Structured Data: LocalBusiness (JSON-LD) ─────────────────
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TaxiService',
      name: 'Trending Drop Taxi',
      description:
        'Premium outstation taxi service in Tamil Nadu offering flat-rate per-km pricing with no return fare and no hidden charges.',
      url: 'https://trendingtaxi.in',
      telephone: '+91-XXXXXXXXXX',
      priceRange: '₹16–₹22 per km',
      areaServed: [
        'Tamil Nadu', 'Coimbatore', 'Tirunelveli', 'Chennai',
        'Madurai', 'Trichy', 'Salem', 'Bangalore', 'Kerala'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
      },
    },

    // ── FAQ Structured Data (boosts rich results) ────────────────
    faqStructuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is there a return fare for outstation trips?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Trending Drop Taxi charges only one-way fare. You pay only for the distance you travel — zero return fare.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the per-km rate for outstation taxi in Tamil Nadu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our rates start from ₹16/km for Sedan, ₹18/km for Etios, ₹20/km for Innova Crysta, and ₹22/km for Tempo Traveller.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I book an outstation cab from Coimbatore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fill the booking form on our website with pickup, drop, date and time — get an instant fare estimate and confirm via WhatsApp.',
          },
        },
      ],
    },
  },

  ta: {
    pageTitle: 'ட்ரெண்டிங் டிராப் டாக்ஸி | தமிழ்நாடு அவுட்ஸ்டேஷன் கேப் சேவை – ₹16/கிமீ',
    metaDescription:
      'தமிழ்நாட்டில் ₹16/கிமீ முதல் அவுட்ஸ்டேஷன் டாக்ஸி முன்பதிவு செய்யுங்கள். திரும்பும் கட்டணம் இல்லை, மறைமுக கட்டணங்கள் இல்லை. கோயம்புத்தூர், திருநெல்வேலி, சென்னை, மதுரையிலிருந்து 24/7 சேவை.',
    metaKeywords:
      'அவுட்ஸ்டேஷன் டாக்ஸி தமிழ்நாடு, டிராப் டாக்ஸி கோயம்புத்தூர், ஒரு வழி கேப் சேவை, திருநெல்வேலி டாக்ஸி, கோயம்புத்தூர் டு பெங்களூரு டாக்ஸி, திரும்பும் கட்டணம் இல்லா டாக்ஸி',
    ogTitle: 'ட்ரெண்டிங் டிராப் டாக்ஸி – திரும்பும் கட்டணம் இல்லை | தமிழ்நாடு அவுட்ஸ்டேஷன்',
    ogDescription:
      'தமிழ்நாடு முழுவதும் ₹16/கிமீ நிலையான கட்டணம். கூடுதல் கட்டணங்கள் இல்லை. சரிபார்க்கப்பட்ட ஓட்டுநர்கள். வாட்ஸ்அப் மூலம் உடனே முன்பதிவு செய்யுங்கள்.',
    ogType: 'website',
  },
};

// ─────────────────────────────────────────────────────────────────
//  UI Translations (keyword-enriched for on-page SEO)
// ─────────────────────────────────────────────────────────────────
export const translations = {
  en: {
    // ── Nav ──────────────────────────────────────────────────────
    home: 'Home',
    about: 'About Us',
    tariff: 'Tariff',
    destinations: 'Top Destinations',
    reviews: 'Reviews',
    contact: 'Contact',

    // ── Form Labels ──────────────────────────────────────────────
    oneWay: 'One Way',
    roundTrip: 'Round Trip',
    name: 'Your Name',
    mobile: 'Mobile Number',
    pickup: 'Pickup City / Address',
    drop: 'Drop City / Address',
    date: 'Pickup Date',
    time: 'Pickup Time',
    returnDate: 'Return Date',
    returnTime: 'Return Time',
    selectCar: 'Select Cab Type',
    estimate: 'Get Instant Fare Estimate',
    noReturn: 'No Return Fare',

    // ── Hero ─────────────────────────────────────────────────────
    // SEO: Primary H1 keyword target — "outstation taxi Tamil Nadu"
    subtitle: 'Premium Outstation Cab Service – Tamil Nadu',
    mainTitle: 'Outstation Taxi Tamil Nadu',
    desc: 'No return fare. No hidden charges. Flat ₹16/km outstation cab service across Tamil Nadu — Coimbatore, Chennai, Madurai, Tirunelveli & beyond. Verified professional chauffeurs, 24/7.',

    // ── Stats ────────────────────────────────────────────────────
    callNow: 'Call Now',
    activeRides: 'Rides Daily',
    cities: 'Cities Covered',
    rating: 'Customer Rating',

    // ── Estimate Modal ───────────────────────────────────────────
    estTitle: 'Outstation Fare Estimate',
    totalEst: 'Estimated Fare',
    distanceNote:
      '*Approximate estimate based on straight-line distance. Actual toll & driver bata charges apply additionally.',
    confirmWhatsApp: 'Confirm Booking via WhatsApp',
    close: 'Close',

    // ── Tariff Section ───────────────────────────────────────────
    // SEO: "transparent taxi tariff Tamil Nadu", "no surge outstation"
    transparentTariff: 'Transparent Outstation Tariff',
    tariffSub:
      'Flat per-km pricing across Tamil Nadu. Zero surge. Zero hidden fees. One-way outstation fare only — no return charges.',
    passengers: 'Passengers',
    luggage: 'Luggage',
    extraCharges: 'Driver Bata & Toll Extra',

    // ── Features ─────────────────────────────────────────────────
    whyChooseUs: 'Why Choose Trending Drop Taxi',
    servicesTitle: 'Premium Cab Features',
    featuresSub:
      'Crafting elite outstation travel experiences for corporate and leisure trips across South India.',
    featTitle1: 'Vetted Chauffeur Network',
    featDesc1:
      'Background-checked, professionally trained drivers certified for long-distance outstation trips across Tamil Nadu and South India.',
    featTitle2: 'Real-Time Live Dispatch',
    featDesc2:
      'GPS-tracked fleet with live dispatch for guaranteed on-time pickups — every outstation trip, every time.',
    featTitle3: 'Zero Surge Guarantee',
    featDesc3:
      'Flat per-km rate guaranteed even during peak season, festivals, and holidays. What you estimate is what you pay.',
    execStandard: 'Executive Standard',
    mechSanitation: 'Deep-Cleaned & Serviced Cabs',
    mechDesc:
      'Every outstation cab undergoes a multi-point inspection before departure — AC, tyres, interiors verified.',

    // ── Destinations ─────────────────────────────────────────────
    // SEO: "popular outstation routes Tamil Nadu", "drop taxi routes"
    destTitle: 'Popular Outstation Routes',
    destSub:
      'Most-booked one-way drop taxi routes across Tamil Nadu and South India. Flat-rate no-return-fare cab service.',

    // ── Reviews ──────────────────────────────────────────────────
    reviewTitle: 'Customer Reviews',
    reviewSub:
      "What business and leisure travelers say about Trending Drop Taxi — Tamil Nadu's trusted outstation cab service.",

    // ── Contact ──────────────────────────────────────────────────
    contactTitle: 'Book Your Outstation Cab',
    contactSub:
      'Available 24/7 for outstation bookings, corporate travel arrangements, and immediate dispatch across Tamil Nadu.',
    contactHeadingPart1: 'Book Corporate',
    contactHeadingPart2: 'or Personal',
    contactHeadingAccent: 'Outstation Trips',
    location: 'Tirunelveli / Coimbatore, Tamil Nadu',
    opsHub: '24/7 Booking Operations',
    verifiedAgency: 'Verified Commercial Cab Agency',
    whatsappDesk: 'WhatsApp Booking Desk',

    // ── Footer ───────────────────────────────────────────────────
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Info',
    rights: 'All Rights Reserved. Trending Drop Taxi – Premium Outstation Cab Service, Tamil Nadu.',
    brandFooterDesc:
      'Trending Drop Taxi offers premium outstation cab services across Tamil Nadu with flat-rate per-km pricing, no return fare, and verified professional chauffeurs.',
    footerAddress:
      'Main Dispatch Hub\nCoimbatore Junction, Tamil Nadu – 641001\nEmail: ops@trendingtaxi.in',

    // ── Reviews Data ─────────────────────────────────────────────
    reviewsData: [
      {
        name: 'Dr. Anand Gopalan',
        route: 'Chennai ⭢ Madurai',
        text: 'Excellent outstation cab experience. The car was immaculate and the driver had superb knowledge of the highway route. No hidden charges — exactly as quoted.',
      },
      {
        name: 'Meera Krishnan',
        route: 'Coimbatore ⭢ Bangalore',
        text: 'The one-way fare saved me nearly 40% compared to other outstation services. Transparent billing, no return fare — highly recommended for regular travelers.',
      },
      {
        name: 'S. Ranganathan',
        route: 'Tirunelveli ⭢ Chennai',
        text: 'Professional outstation taxi service. The online estimate matched the final invoice to the rupee. Will book again for all my Tamil Nadu trips.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  ta: {
    // ── Nav ──────────────────────────────────────────────────────
    home: 'முகப்பு',
    about: 'எங்களைப் பற்றி',
    tariff: 'கட்டணங்கள்',
    destinations: 'பிரபலமான இலக்குகள்',
    reviews: 'மதிப்பாய்வுகள்',
    contact: 'தொடர்பு',

    // ── Form Labels ──────────────────────────────────────────────
    oneWay: 'ஒரு வழிப் பயணம்',
    roundTrip: 'இரு வழிப் பயணம்',
    name: 'உங்கள் பெயர்',
    mobile: 'கைபேசி எண்',
    pickup: 'புறப்படும் நகரம் / இடம்',
    drop: 'சென்றடையும் நகரம் / இடம்',
    date: 'பயண தேதி',
    time: 'பயண நேரம்',
    returnDate: 'திரும்பும் தேதி',
    returnTime: 'திரும்பும் நேரம்',
    selectCar: 'கார் வகை தேர்வு செய்க',
    estimate: 'உடனடி கட்டண மதிப்பீடு காண்க',
    noReturn: 'திரும்பும் கட்டணம் இல்லை',

    // ── Hero ─────────────────────────────────────────────────────
    subtitle: 'தமிழ்நாடு பிரீமியம் அவுட்ஸ்டேஷன் டாக்ஸி சேவை',
    mainTitle: 'தமிழ்நாடு அவுட்ஸ்டேஷன் டாக்ஸி',
    desc: 'திரும்பும் கட்டணம் இல்லை. மறைமுக கட்டணங்கள் இல்லை. தமிழ்நாடு முழுவதும் ₹16/கிமீ நிலையான கட்டணத்தில் — கோயம்புத்தூர், சென்னை, மதுரை, திருநெல்வேலி உட்பட. சரிபார்க்கப்பட்ட ஓட்டுநர்கள், 24/7.',

    // ── Stats ────────────────────────────────────────────────────
    callNow: 'இப்போதே அழைக்க',
    activeRides: 'தினசரி பயணங்கள்',
    cities: 'இணைக்கப்பட்ட நகரங்கள்',
    rating: 'வாடிக்கையாளர் மதிப்பீடு',

    // ── Estimate Modal ───────────────────────────────────────────
    estTitle: 'அவுட்ஸ்டேஷன் கட்டண மதிப்பீடு',
    totalEst: 'மதிப்பிடப்பட்ட கட்டணம்',
    distanceNote:
      '*தோராயமான நேர்கோட்டு தூரத்தின் அடிப்படையில் கணக்கிடப்பட்டது. டோல்கேட் மற்றும் ஓட்டுநர் பட்டா தனியாக வரும்.',
    confirmWhatsApp: 'வாட்ஸ்அப் மூலம் முன்பதிவு செய்க',
    close: 'மூடு',

    // ── Tariff Section ───────────────────────────────────────────
    transparentTariff: 'வெளிப்படையான அவுட்ஸ்டேஷன் கட்டணங்கள்',
    tariffSub:
      'தமிழ்நாடு முழுவதும் ஒரு கிலோமீட்டருக்கு நிலையான கட்டணம். கூடுதல் கட்டணங்கள் இல்லை. ஒரு வழி கட்டணம் மட்டும் — திரும்பும் கட்டணம் இல்லை.',
    passengers: 'பயணிகள்',
    luggage: 'சூட்கேஸ்',
    extraCharges: 'ஓட்டுநர் பட்டா & டோல்கேட் தனியானது',
    
    // ── Features ─────────────────────────────────────────────────
    whyChooseUs: 'ட்ரெண்டிங் டிராப் டாக்ஸியை ஏன் தேர்வு செய்ய வேண்டும்',
    servicesTitle: 'பிரீமியம் கேப் வசதிகள்',
    featuresSub:
      'தென்னிந்தியா முழுவதும் நிறுவன மற்றும் சாதாரண பயணங்களுக்கான சிறந்த அவுட்ஸ்டேஷன் பயண அனுபவம்.',
    featTitle1: 'சரிபார்க்கப்பட்ட ஓட்டுநர் நெட்வொர்க்',
    featDesc1:
      'பின்னணி சரிபார்க்கப்பட்ட, தமிழ்நாடு மற்றும் தென்னிந்தியா நெடுந்தூர பயணங்களுக்கு பயிற்சி பெற்ற தொழில்முறை ஓட்டுநர்கள்.',
    featTitle2: 'நேரடி GPS கண்காணிப்பு',
    featDesc2:
      'ஒவ்வொரு அவுட்ஸ்டேஷன் பயணத்திலும் GPS கண்காணிப்புடன் உடனடி பிக்அப் உறுதி செய்யப்படுகிறது.',
    featTitle3: 'கூடுதல் கட்டணங்கள் இல்லை என்ற உறுதிமொழி',
    featDesc3:
      'பண்டிகை காலம், விடுமுறை நாட்கள் என எந்த நேரத்திலும் நிலையான கிலோமீட்டர் கட்டணம் — மதிப்பீடு செய்தது தான் செலுத்துவீர்கள்.',
    execStandard: 'எக்ஸிகியூட்டிவ் தரம்',
    mechSanitation: 'ஆழமாக சுத்தம் செய்யப்பட்ட & சர்வீஸ் செய்யப்பட்ட வாகனங்கள்',
    mechDesc:
      'ஒவ்வொரு அவுட்ஸ்டேஷன் வாகனமும் புறப்படுவதற்கு முன் பல கட்ட ஆய்வுக்குட்படுத்தப்படுகிறது — AC, டயர்கள், உள்புறம் சரிபார்க்கப்படுகிறது.',

    // ── Destinations ─────────────────────────────────────────────
    destTitle: 'பிரபலமான அவுட்ஸ்டேஷன் வழிகள்',
    destSub:
      'தமிழ்நாடு மற்றும் தென்னிந்தியாவில் அதிகம் முன்பதிவு செய்யப்படும் ஒரு வழி டிராப் டாக்ஸி வழிகள்.',

    // ── Reviews ──────────────────────────────────────────────────
    reviewTitle: 'வாடிக்கையாளர் மதிப்பாய்வுகள்',
    reviewSub:
      'தமிழ்நாட்டின் நம்பகமான அவுட்ஸ்டேஷன் கேப் சேவையான ட்ரெண்டிங் டிராப் டாக்ஸியைப் பற்றி பயணிகள் கூறுவது.',

    // ── Contact ──────────────────────────────────────────────────
    contactTitle: 'உங்கள் அவுட்ஸ்டேஷன் கேப் முன்பதிவு செய்யுங்கள்',
    contactSub:
      'தமிழ்நாடு முழுவதும் அவுட்ஸ்டேஷன் முன்பதிவுகள், நிறுவன பயண ஏற்பாடுகள் மற்றும் உடனடி பிரயாணங்களுக்கு 24/7 கிடைக்கிறோம்.',
    contactHeadingPart1: 'நிறுவன அல்லது தனிப்பட்ட',
    contactHeadingPart2: 'அவுட்ஸ்டேஷன்',
    contactHeadingAccent: 'பயணங்களை தொடங்குங்கள்',
    location: 'திருநெல்வேலி / கோயம்புத்தூர், தமிழ்நாடு',
    opsHub: '24/7 முன்பதிவு சேவை மையம்',
    verifiedAgency: 'சரிபார்க்கப்பட்ட வணிக கேப் நிறுவனம்',
    whatsappDesk: 'வாட்ஸ்அப் முன்பதிவு சேவை',

    // ── Footer ───────────────────────────────────────────────────
    quickLinks: 'விரைவு இணைப்புகள்',
    contactInfo: 'தொடர்பு தகவல்',
    rights:
      'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. ட்ரெண்டிங் டிராப் டாக்ஸி – தமிழ்நாடு பிரீமியம் அவுட்ஸ்டேஷன் கேப் சேவை.',
    brandFooterDesc:
      'ட்ரெண்டிங் டிராப் டாக்ஸி தமிழ்நாடு முழுவதும் நிலையான கிலோமீட்டர் கட்டணத்தில் — திரும்பும் கட்டணம் இல்லாமல், மறைமுக கட்டணங்கள் இல்லாமல் — பிரீமியம் அவுட்ஸ்டேஷன் கேப் சேவை வழங்குகிறது.',
    footerAddress:
      'தலைமை அலுவலகம்\nகோயம்புத்தூர் சந்திப்பு, தமிழ்நாடு – 641001\nமின்னஞ்சல்: ops@trendingtaxi.in',

    // ── Reviews Data ─────────────────────────────────────────────
    reviewsData: [
      {
        name: 'டாக்டர். ஆனந்த் கோபாலன்',
        route: 'சென்னை ⭢ மதுரை',
        text: 'சிறந்த அவுட்ஸ்டேஷன் கேப் அனுபவம். கார் மிகவும் சுத்தமாக இருந்தது, ஓட்டுநருக்கு தேசியநெடுஞ்சாலை வழித்தட அறிவு மிகச் சிறப்பு. மறைமுக கட்டணங்கள் இல்லை.',
      },
      {
        name: 'மீரா கிருஷ்ணன்',
        route: 'கோயம்புத்தூர் ⭢ பெங்களூரு',
        text: 'ஒரு வழி கட்டணம் மற்ற சேவைகளை விட 40% குறைவு. வெளிப்படையான கட்டண முறை, திரும்பும் கட்டணம் இல்லை — தொடர்ந்து பயணிப்பவர்களுக்கு மிகவும் பரிந்துரைக்கிறேன்.',
      },
      {
        name: 'எஸ். ரங்கநாதன்',
        route: 'திருநெல்வேலி ⭢ சென்னை',
        text: 'தொழில்முறை அவுட்ஸ்டேஷன் டாக்ஸி சேவை. ஆன்லைன் மதிப்பீடும் இறுதி கட்டணமும் சரியாக ஒத்திருந்தது. தமிழ்நாடு பயணங்களுக்கு மீண்டும் முன்பதிவு செய்வேன்.',
      },
    ],
  },
};