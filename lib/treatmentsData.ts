import { CLINIC } from "./clinicInfo";

export interface TreatmentImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Treatment {
  id: string;
  name: string;
  localName: string;
  category: "digestive" | "liver" | "pancreas-biliary";
  badge: string;
  shortDesc: string;
  about: string;
  symptoms: string[];
  highlights: string[];

  /* ---- in-depth content (shown under "Read In-Depth Guide") ---- */
  image: TreatmentImage;
  overview: string[];
  types?: { title: string; text: string }[];
  causes: string[];
  selfCare: string[];
  whenToSeeDoctor: string[];
  whatToExpect: string[];
  faqs: { q: string; a: string }[];
  /** slugs of related articles in lib/newsData.ts */
  relatedGuides: string[];
}

// Images already in /public/assets. Swap in condition-specific diagrams later if you add them.
const CONSULT = "/assets/consultation";
const DOCTOR = CLINIC.doctor.name;

export const TREATMENTS: Treatment[] = [
  {
    id: "acidity-gerd",
    name: "Acidity & Reflux (GERD)",
    localName: "एसिडिटी / अम्लपित्त",
    category: "digestive",
    badge: "Gastroenterology Consultation",
    shortDesc:
      "Assessment and treatment of acidity, heartburn and acid reflux, with upper GI endoscopy when it is needed.",
    about:
      "Acidity or acid reflux happens when stomach acid flows back into the food pipe (oesophagus) or irritates the lining of the stomach. Occasional heartburn is common, but symptoms that come often or do not settle need a proper assessment.",
    symptoms: [
      "Burning in the chest or upper abdomen",
      "Sour taste or food coming back up",
      "Bloating, gas and belching",
      "Nausea or a feeling of fullness",
      "Pain or difficulty while swallowing",
    ],
    highlights: [
      "Consultation with a gastroenterologist",
      "Upper GI endoscopy at the clinic when needed",
      "Diet guidance through nutritional counselling",
      "A treatment plan made for your condition",
    ],

    image: {
      src: `${CONSULT}/digestive-system.jpg`,
      alt: "The digestive system, from the food pipe to the intestines",
      caption: "Acid reflux is acid moving from the stomach back up into the food pipe.",
    },
    overview: [
      "A ring of muscle at the lower end of the food pipe normally keeps stomach contents down. When it relaxes too often or is weak, acid can flow back up and cause a burning feeling behind the breastbone.",
      "Most people have heartburn now and then. When it happens several times a week, wakes you at night or comes with other symptoms, it may be gastro-oesophageal reflux disease (GERD), which can irritate or damage the food pipe if left untreated.",
      "A doctor decides, from your symptoms and examination, whether tests such as an upper GI endoscopy are needed.",
    ],
    types: [
      { title: "Occasional acidity", text: "Heartburn or a sour taste now and then, often linked to a heavy meal, spicy food or lying down soon after eating." },
      { title: "GERD", text: "Reflux that happens often, with symptoms on most weeks. It needs a treatment plan and follow-up." },
      { title: "Warning symptoms", text: "Trouble swallowing, repeated vomiting, weight loss, black stool or blood in vomit need a prompt examination." },
    ],
    causes: [
      "Large, oily or spicy meals and late-night eating",
      "Lying down soon after a meal",
      "Smoking, alcohol, and too much tea or coffee",
      "Being overweight",
      "Stress and irregular meal timings",
      "Some medicines, such as painkillers",
      "Some stomach infections, such as H. pylori",
    ],
    selfCare: [
      "Eat smaller meals at regular times",
      "Keep a gap of two to three hours between dinner and sleep",
      "Raise the head end of the bed if symptoms come at night",
      "Cut down on foods and drinks that trigger your symptoms",
      "Avoid smoking and alcohol",
      "Do not take painkillers regularly without medical advice",
    ],
    whenToSeeDoctor: [
      "Heartburn on most days, or for more than two weeks",
      "Pain or difficulty while swallowing",
      "Repeated vomiting or unexplained weight loss",
      "Black stool or vomiting blood: seek urgent care",
      "Chest pain with sweating, breathlessness or pain in the arm: go to a hospital emergency at once, as it can be a heart problem",
    ],
    whatToExpect: [
      `Consultation with ${DOCTOR}, who listens to your symptoms and examines you`,
      "Tests such as an upper GI endoscopy are advised only if needed",
      "A treatment plan with medicines and diet or lifestyle changes",
      "Nutritional counselling for a common gastro illness diet",
      "Follow-up to check how you are responding",
    ],
    faqs: [
      {
        q: "Is acidity the same as GERD?",
        a: "Acidity is the common word for burning or sourness in the stomach or chest. GERD is the medical condition where reflux happens often and can irritate the food pipe.",
      },
      {
        q: "Do I always need an endoscopy?",
        a: "Not always. Your doctor decides after hearing your symptoms. Endoscopy is advised mainly when there are warning signs, or when symptoms do not settle with treatment.",
      },
    ],
    relatedGuides: ["acidity-gas-bloating-when-to-see-a-gastroenterologist", "upper-gi-endoscopy-what-to-expect"],
  },

  {
    id: "constipation-ibs",
    name: "Constipation, IBS & Bowel Problems",
    localName: "कब्ज / बद्धकोष्ठता",
    category: "digestive",
    badge: "Bowel & Colon Care",
    shortDesc:
      "Care for constipation, repeated loose stools and irritable bowel syndrome, with colonoscopy or manometry when needed.",
    about:
      "Bowel problems include long-standing constipation, loose stools that keep returning, and bloating or cramps that come and go. Irritable bowel syndrome (IBS) is a common condition of this kind, where the bowel is sensitive but no damage is seen. A doctor should first rule out other causes.",
    symptoms: [
      "Hard stools or difficulty passing stool",
      "Loose motions that keep returning",
      "Cramping pain that eases after passing stool",
      "Bloating and gas",
      "A feeling that the bowel has not emptied fully",
    ],
    highlights: [
      "Consultation with a gastroenterologist",
      "Colonoscopy at the clinic when needed",
      "Anorectal manometry and biofeedback therapy expertise",
      "Diet counselling for common gastro illnesses",
    ],

    image: {
      src: `${CONSULT}/gastroenterology-diseases.jpg`,
      alt: "Gastroenterology consultation for bowel and digestive problems",
      caption: "Bowel habits often improve with the right diet, routine and treatment.",
    },
    overview: [
      "Bowel habits differ from person to person, so what matters is a change from your own normal, or a problem that keeps coming back.",
      "In IBS the gut becomes over-sensitive and moves too fast or too slowly, causing cramps, bloating and constipation, diarrhoea or both. It does not damage the bowel, but its symptoms can look like other conditions, so a proper assessment is important.",
      "Sometimes constipation is due to muscles in the pelvic floor not working together when passing stool. Tests such as anorectal manometry can show this, and biofeedback therapy can retrain these muscles.",
    ],
    types: [
      { title: "Constipation", text: "Fewer or harder stools, straining, or the feeling of an incomplete motion that lasts for weeks." },
      { title: "Irritable bowel syndrome", text: "Recurring abdominal pain with constipation, loose stools or both, often linked to stress and food triggers." },
      { title: "Warning signs", text: "Blood in stool, weight loss, night-time diarrhoea or a recent change in bowel habit after the age of 40 need tests." },
    ],
    causes: [
      "Low-fibre food and too little water",
      "Ignoring the urge to pass stool and irregular routine",
      "Stress and anxiety",
      "Certain medicines",
      "Pelvic floor muscles that do not relax while passing stool",
      "Food intolerances, such as to milk sugar (lactose)",
      "Infections of the bowel",
    ],
    selfCare: [
      "Eat fibre-rich food and drink enough water",
      "Go to the toilet at a fixed time and do not hold back the urge",
      "Do not strain or sit for long on the toilet",
      "Walk or exercise daily",
      "Keep a food diary to spot triggers",
      "Find ways to reduce stress, such as regular sleep and relaxation",
    ],
    whenToSeeDoctor: [
      "Blood in stool, or black stool",
      "Unexplained weight loss",
      "A change in bowel habit that lasts for more than a few weeks",
      "Diarrhoea that wakes you at night",
      "Severe abdominal pain with vomiting and no passage of stool or gas: seek urgent care",
    ],
    whatToExpect: [
      `Consultation with ${DOCTOR}, with a discussion of your bowel habits and diet`,
      "Blood or stool tests, and colonoscopy if your doctor advises it",
      "Anorectal manometry and biofeedback therapy where a muscle coordination problem is suspected",
      "A plan covering diet, medicines and routine",
      "Nutritional counselling and follow-up",
    ],
    faqs: [
      {
        q: "Is IBS dangerous?",
        a: "IBS does not damage the bowel, but it can affect daily life. Because other conditions can cause similar symptoms, a doctor should confirm the diagnosis.",
      },
      {
        q: "What is biofeedback therapy?",
        a: `Biofeedback therapy retrains the muscles used to pass stool. ${DOCTOR} has experience with anorectal manometry and biofeedback therapy.`,
      },
    ],
    relatedGuides: ["acidity-gas-bloating-when-to-see-a-gastroenterologist"],
  },

  {
    id: "fatty-liver",
    name: "Fatty Liver",
    localName: "फैटी लिवर / फॅटी लिव्हर",
    category: "liver",
    badge: "Liver Care & Fibroscan",
    shortDesc:
      "Assessment of fatty liver with Fibroscan, followed by a diet, lifestyle and medical plan to protect the liver.",
    about:
      "Fatty liver means extra fat has built up in the liver cells. It is very common and often causes no symptoms, but over time it can lead to inflammation and scarring of the liver, so it should not be ignored.",
    symptoms: [
      "Often no symptoms at all",
      "Tiredness or weakness",
      "Mild discomfort in the upper right abdomen",
      "A fatty liver on an ultrasound report, or raised liver tests",
      "Weight gain around the waist",
    ],
    highlights: [
      "Fibroscan available at the clinic as a day care service",
      "Consultation for liver related diseases",
      "Liver and pancreatic diseases diet counselling",
      "Follow-up of liver tests",
    ],

    image: {
      src: `${CONSULT}/liver-related-diseases.jpg`,
      alt: "Consultation for liver related diseases",
      caption: "Fatty liver can often be improved in the early stage.",
    },
    overview: [
      "The liver stores and processes fat. When more fat enters the liver than it can handle, the extra fat collects inside the liver cells. This is fatty liver.",
      "Most people feel normal, and fatty liver is often found by chance on an ultrasound or a blood test. In some people the fat causes inflammation, which over the years can lead to scarring (fibrosis) and, later, cirrhosis.",
      "Fibroscan is a painless test that measures how stiff the liver is, which shows scarring, and also how much fat it holds. It helps your doctor judge how serious the condition is.",
    ],
    types: [
      { title: "Fatty liver not caused by alcohol", text: "The most common type. It is linked to excess weight, diabetes or high sugar, and high cholesterol or triglycerides." },
      { title: "Alcohol-related fatty liver", text: "Caused by regular alcohol use. Stopping alcohol is the most important step." },
      { title: "Fatty liver with scarring", text: "When inflammation has caused scarring. It needs closer follow-up to stop it from getting worse." },
    ],
    causes: [
      "Excess weight, especially fat around the waist",
      "Diabetes or pre-diabetes",
      "High cholesterol or triglycerides",
      "A diet high in sugar, sweet drinks and fried food, with little exercise",
      "Regular alcohol use",
      "Some medicines",
    ],
    selfCare: [
      "Lose weight gradually, as even a modest loss can reduce liver fat",
      "Walk or exercise regularly",
      "Cut down on sweet drinks, sugar and fried food",
      "Avoid alcohol",
      "Keep blood sugar and cholesterol under control",
      "Do not take herbal or over-the-counter supplements for the liver without medical advice",
    ],
    whenToSeeDoctor: [
      "Fatty liver on an ultrasound, or raised liver tests (SGOT / SGPT)",
      "Fatty liver together with diabetes or high cholesterol",
      "Yellow eyes or dark urine",
      "Swelling of the legs or abdomen",
      "Vomiting blood or black stool: seek urgent care",
    ],
    whatToExpect: [
      `Consultation with ${DOCTOR}, with a review of your reports`,
      "Blood tests and an ultrasound, if not already done",
      "Fibroscan to check for fat and scarring",
      "A plan covering diet, activity and medicines if needed",
      "Nutritional counselling and follow-up tests",
    ],
    faqs: [
      {
        q: "Does fatty liver always need medicines?",
        a: "Not always. Many people improve with weight loss, regular exercise and a better diet. Your doctor will decide if medicines are needed.",
      },
      {
        q: "Can fatty liver be reversed?",
        a: "In the early stage, fat in the liver often reduces with weight loss, exercise and a healthy diet. Once scarring has developed, treatment aims to stop it from getting worse.",
      },
    ],
    relatedGuides: ["fatty-liver-symptoms-causes-fibroscan"],
  },

  {
    id: "liver-diseases",
    name: "Hepatitis & Cirrhosis",
    localName: "यकृत रोग / यकृताचे आजार",
    category: "liver",
    badge: "Liver Disease & Transplant Counselling",
    shortDesc:
      "Care for hepatitis, cirrhosis and other liver diseases, including day care ascitic tapping and albumin infusion, and liver transplant counselling.",
    about:
      "Hepatitis is inflammation of the liver, most often caused by viruses, alcohol, medicines or fatty liver. Long-standing inflammation can lead to scarring called cirrhosis, in which the liver can no longer work normally. Early assessment helps to protect the liver.",
    symptoms: [
      "Yellow eyes or skin (jaundice)",
      "Dark urine and pale stool",
      "Swelling of the abdomen or legs",
      "Loss of appetite, tiredness and weight loss",
      "Vomiting blood or black stool: an emergency",
    ],
    highlights: [
      "Consultation for liver related diseases",
      "Ascitic tapping and albumin infusion as day care procedures",
      "Liver transplant counselling",
      "Vaccination available as a day care service",
    ],

    image: {
      src: `${CONSULT}/liver-transplant-counselling.jpg`,
      alt: "Liver transplant counselling and liver disease care",
      caption: "Early care helps to slow liver damage and prevent complications.",
    },
    overview: [
      "The liver cleans the blood, helps digest food and makes proteins the body needs. Because it has a large reserve, liver disease can stay silent for a long time, and jaundice or swelling often appear late.",
      "Hepatitis can be short-term (acute) or long-lasting (chronic). Chronic inflammation slowly replaces healthy liver tissue with scar tissue, which is cirrhosis.",
      "In advanced liver disease, fluid can collect in the abdomen (ascites), the blood protein albumin can fall, and veins in the food pipe can become fragile. Your doctor checks for these and plans treatment accordingly.",
    ],
    types: [
      { title: "Acute hepatitis", text: "Sudden inflammation, often with jaundice, nausea and tiredness. Infections such as hepatitis A and E are common causes and many people recover with proper care, but some need to be watched closely." },
      { title: "Chronic hepatitis", text: "Inflammation that lasts more than six months, such as hepatitis B or C, alcohol-related or autoimmune hepatitis. It needs regular follow-up." },
      { title: "Cirrhosis", text: "Scarring of the liver. It may cause fluid in the abdomen, swelling of the legs, jaundice or bleeding, and needs specialist care." },
    ],
    causes: [
      "Hepatitis A and E viruses, from contaminated food and water",
      "Hepatitis B and C viruses, from infected blood or body fluids",
      "Regular alcohol use",
      "Fatty liver",
      "Some medicines, herbal products and toxins",
      "Autoimmune and inherited liver diseases",
    ],
    selfCare: [
      "Avoid alcohol completely",
      "Drink safe water and eat hygienically prepared food",
      "Ask your doctor about hepatitis A and B vaccination",
      "Do not take painkillers, herbal or other medicines without asking your doctor",
      "Follow the diet advised for your condition, including less salt if you have swelling",
      "Keep your follow-up visits and tests",
    ],
    whenToSeeDoctor: [
      "Yellow eyes or skin, or dark urine",
      "Swelling of the abdomen or legs",
      "Persistent tiredness, loss of appetite or weight loss",
      "Vomiting blood, black stool, confusion or unusual sleepiness: go to a hospital emergency at once",
      "Fever with abdominal pain in a person with known liver disease: seek urgent care",
    ],
    whatToExpect: [
      `Consultation with ${DOCTOR}, with a review of your history and reports`,
      "Blood tests, ultrasound and Fibroscan to assess the liver",
      "Endoscopy where needed to check the veins of the food pipe",
      "Day care ascitic tapping or albumin infusion if your condition needs it",
      "Liver transplant counselling if the disease is advanced, and diet counselling",
    ],
    faqs: [
      {
        q: "What is ascitic tapping?",
        a: "It is a procedure where fluid that has collected in the abdomen (ascites) is drained with a needle, to relieve swelling and discomfort. At the clinic it is done as a day care procedure.",
      },
      {
        q: "When is a liver transplant considered?",
        a: "When the liver is badly damaged and treatment can no longer control the disease. The clinic offers liver transplant counselling to explain the process and the next steps.",
      },
    ],
    relatedGuides: ["fatty-liver-symptoms-causes-fibroscan"],
  },

  {
    id: "gallstones-pancreatitis",
    name: "Gallstones & Pancreatitis",
    localName: "पित्त की पथरी / स्वादुपिंडाचा दाह",
    category: "pancreas-biliary",
    badge: "ERCP & Endoscopic Care",
    shortDesc:
      "Care for gallstones, bile duct stones, pancreatitis and jaundice, with ERCP, stenting and endo ultrasound when needed.",
    about:
      "The gallbladder stores bile that helps to digest fat, and the pancreas makes digestive juices and insulin. Gallstones, a blocked bile duct and pancreatitis cause pain in the upper abdomen, vomiting and sometimes jaundice, and some of these conditions need urgent care.",
    symptoms: [
      "Pain in the upper abdomen that may spread to the back or right shoulder",
      "Nausea and vomiting, especially after fatty meals",
      "Yellow eyes or skin",
      "Fever with chills",
      "Pale stool and dark urine",
    ],
    highlights: [
      "ERCP, including bile duct and pancreatic duct stenting",
      "Endo ultrasound",
      "Consultation for gallbladder and pancreas diseases",
      "Diet counselling for liver and pancreatic diseases",
    ],

    image: {
      src: `${CONSULT}/gallbladder-pancreas-diseases.jpg`,
      alt: "Consultation for gallbladder and pancreas diseases",
      caption: "Stones in the gallbladder or bile duct can block the flow of bile and cause pain or jaundice.",
    },
    overview: [
      "Gallstones are hard deposits that form in the gallbladder. Many cause no problem, but a stone can block the gallbladder outlet and cause sudden pain, or move into the bile duct and cause jaundice and infection.",
      "The pancreas lies behind the stomach. Pancreatitis is inflammation of the pancreas, causing severe upper abdominal pain, often with vomiting. Gallstones and alcohol are among the most common causes.",
      "Imaging such as an ultrasound or endo ultrasound shows the cause, and ERCP, an endoscopic procedure, can both look at and treat problems of the bile duct and pancreatic duct.",
    ],
    types: [
      { title: "Gallstones", text: "Stones in the gallbladder. They may cause repeated pain after meals, especially fatty ones." },
      { title: "Bile duct stones or blockage", text: "A stone or narrowing that blocks the bile duct. It can cause jaundice, fever and pancreatitis, and often needs ERCP." },
      { title: "Pancreatitis", text: "Acute (sudden) or chronic (long-standing) inflammation of the pancreas. Severe attacks need urgent hospital care." },
    ],
    causes: [
      "Gallstones, the most common cause of sudden pancreatitis",
      "Regular alcohol use",
      "High triglycerides (blood fat)",
      "Being overweight or losing weight very quickly",
      "Some medicines",
      "Narrowing or blockage of the bile or pancreatic duct",
    ],
    selfCare: [
      "Avoid heavy, oily and fried meals",
      "Eat small meals at regular times",
      "Avoid alcohol",
      "Keep a healthy weight and avoid crash diets",
      "Drink enough fluids",
      "Do not ignore pain that keeps coming back after meals",
    ],
    whenToSeeDoctor: [
      "Repeated pain in the upper abdomen, especially after meals",
      "Yellow eyes or skin, or pale stool and dark urine",
      "Severe, constant abdominal pain, or vomiting that does not stop: go to a hospital emergency",
      "Fever with chills along with abdominal pain: seek urgent care",
    ],
    whatToExpect: [
      `Consultation with ${DOCTOR}, with a review of your symptoms and reports`,
      "Blood tests and imaging, such as an ultrasound or endo ultrasound",
      "ERCP with stone removal or stenting if a duct is blocked",
      "Advice on gallbladder treatment, and referral where surgery is needed",
      "Diet counselling and follow-up",
    ],
    faqs: [
      {
        q: "What is ERCP?",
        a: "ERCP is an endoscopic procedure used to look at, and treat, problems of the bile duct and pancreatic duct, such as stones or narrowing. A stent can be placed to keep a blocked duct open.",
      },
      {
        q: "What should I eat if I have pancreatitis?",
        a: "Usually small, low-fat meals and no alcohol, but the plan depends on your condition. The clinic offers nutritional counselling for liver and pancreatic diseases.",
      },
    ],
    relatedGuides: ["gallstones-pancreatitis-warning-signs"],
  },
];