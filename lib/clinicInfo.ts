/**
 * Single source of truth for clinic details.
 * Contact details, services and stats come from https://gastroworldclinic.com/
 * Edit here once and the whole site / emails / calendar invites / prescriptions update.
 */
export const CLINIC = {
  name: 'Gastroworld Clinic',
  shortName: 'Gastroworld',
  /** Small line shown under the brand name in the header. */
  brandSub: 'Gastro & Liver Clinic',
  tagline: 'Your Digestive Health Experts',
  taglineMr: 'तुमच्या पचनसंस्थेच्या आरोग्याचे तज्ञ',
  taglineHi: 'आपके पाचन स्वास्थ्य के विशेषज्ञ',

  doctor: {
    name: 'Dr. Manoj Kolhe',
    nameMr: 'डॉ. मनोज कोल्हे',
    title: 'Gastroenterologist, Hepatologist (Liver Specialist) & Therapeutic Endoscopist',
    titleMr: 'गॅस्ट्रोएन्टेरोलॉजिस्ट, हेपॅटोलॉजिस्ट (यकृत तज्ञ) व थेरपेटिक एन्डोस्कोपिस्ट',
  },

  phone: {
    display: '+91 70385 00664',
    tel: '+917038500664',
    digits: '917038500664',
  },

  email: 'docmanojck@gmail.com',

  address: {
    line1: '4th Floor, Ecorb Millenia Tower',
    line2: 'CTS No. 4224, S.No. 45/2, Akurdi Gaothan, Vivek Nagar',
    line3: 'Akurdi, Pimpri-Chinchwad, Maharashtra - 411035',
    full: 'Dr Manoj Kolhe, 4th Floor, Ecorb Millenia Tower, CTS No. 4224, S.No. 45/2, Akurdi Gaothan, Vivek Nagar, Akurdi, Pimpri-Chinchwad, Maharashtra 411035',
    landmark: 'Ecorb Millenia Tower, Vivek Nagar, Akurdi',
    landmarkMr: 'इकॉर्ब मिलेनिया टॉवर, विवेक नगर, आकुर्डी',
    area: 'Akurdi, Pimpri-Chinchwad, Pune',
    /**
     * Map search link. For an exact pin, open the clinic in Google Maps,
     * click Share > Copy link, and paste it here instead.
     */
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Gastroworld+Clinic+Dr+Manoj+Kolhe+Ecorb+Millenia+Tower+Akurdi+Pune',
  },

  social: {
    facebook: 'https://www.facebook.com/gastroworldpune/',
    instagram: 'https://www.instagram.com/gastro_world_pune/',
  },

  /** Figures shown on the clinic's homepage. */
  stats: {
    patients: '5000+',
    endoscopies: '5000+',
    experience: '10+ years',
  },

  logo: '/assets/gastroworldlogo.webp',
  // gastroworldposter.webp is not in public/assets yet, so this falls back to the banner.
  // Add the poster file and change this back when you have it.
  poster: '/assets/gastroworldlogobanner.webp',
  banner: '/assets/gastroworldlogobanner.webp',

  /** Shown wherever services are described. */
  advisory:
    'Expert care for digestive, liver, gallbladder and pancreas diseases, advanced endoscopic procedures and nutritional counselling.',
  advisoryMr:
    'पचनसंस्था, यकृत, पित्ताशय व स्वादुपिंडाच्या आजारांवर तज्ञ उपचार, प्रगत एन्डोस्कोपी प्रक्रिया आणि आहार सल्ला',
} as const;

/** Service groups from the clinic's website menu. */
export const SERVICES = [
  {
    title: 'Consultation',
    items: [
      'Gastroenterology diseases',
      'Liver related diseases',
      'Liver transplant counselling',
      'Gallbladder & Pancreas diseases',
      'Gastrointestinal cancers',
    ],
  },
  {
    title: 'Endoscopic Procedures',
    items: ['Upper GI endoscopy', 'Colonoscopy', 'ERCP', 'Endo ultrasound'],
  },
  {
    title: 'Day Care GI Procedures',
    items: [
      'Ascitic tapping',
      'Albumin infusion',
      'Vaccination',
      'Fibroscan',
      'Laboratory',
      'Pharmacy services',
    ],
  },
  {
    title: 'Nutritional Counselling',
    items: ['Liver and pancreatic diseases diet', 'Common gastro illness diet'],
  },
] as const;

/**
 * Common symptoms shown on the site. Same export name and shape as before
 * so existing components keep working. Edit this list to match what the clinic wants to show.
 */
export const FIVE_MAIN_SYMPTOMS = [
  { en: 'Abdominal pain', hi: 'पेट दर्द' },
  { en: 'Acidity & heartburn', hi: 'एसिडिटी व सीने में जलन' },
  { en: 'Nausea & vomiting', hi: 'जी मिचलाना व उल्टी' },
  { en: 'Jaundice', hi: 'पीलिया' },
  { en: 'Blood in stool', hi: 'मल में खून' },
] as const;

/** "Why choose us" points from the clinic's website. */
export const CLINIC_HIGHLIGHTS = [
  'Expert leadership with extensive experience in gastroenterology and liver care',
  'Comprehensive services, from routine check-ups to advanced therapeutic procedures',
  'State-of-the-art technology and facilities',
  'Personalised treatment plans tailored to your condition and lifestyle',
  'Empathetic care: every patient treated with respect and dignity',
  'Convenient location in Pimpri Chinchwad for patients in the surrounding areas',
] as const;

/**
 * Old name kept so existing imports don't break.
 * Switch components to CLINIC_HIGHLIGHTS, then delete this line.
 */
export const INJECTION_POINTS = CLINIC_HIGHLIGHTS;