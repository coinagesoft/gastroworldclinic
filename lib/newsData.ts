import { CLINIC } from "./clinicInfo";

export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list shown after the paragraphs */
  bullets?: string[];
  /** Optional numbered steps shown after the paragraphs / bullets */
  steps?: string[];
  callout?: string;
  /** Optional illustration shown after the heading */
  image?: ArticleImage;
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  summary: string;
  keyTakeaways: string[];
  contentSections: ArticleSection[];
  faqs?: ArticleFaq[];
  relatedSlugs: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "fatty-liver-symptoms-causes-fibroscan",
    title: "Fatty Liver: Symptoms, Causes and How a Fibroscan Helps",
    category: "Liver",
    readTime: "6 min read",
    image: "/assets/news/fatty-liver-fibroscan.svg",
    summary:
      "Fatty liver is very common and often causes no symptoms at all. Learn the causes, why it should not be ignored and how a Fibroscan checks your liver without any needle or cut.",
    keyTakeaways: [
      "Fatty liver means extra fat has built up inside liver cells",
      "Most people feel normal, so it is often found by chance",
      "Weight, diabetes, high cholesterol and alcohol are common causes",
      "A Fibroscan is a painless scan that checks liver fat and stiffness",
      "Early lifestyle changes can reduce liver fat and protect the liver",
    ],
    contentSections: [
      {
        heading: "What is fatty liver?",
        paragraphs: [
          "Fatty liver means that too much fat has collected inside the cells of the liver. A small amount of fat in the liver is normal. When fat makes up a large share of the liver, it can irritate the liver and cause inflammation.",
          "Fatty liver is very common in India and is seen in people who are overweight as well as in some people with a normal weight. It is often found by chance during an ultrasound done for some other reason.",
        ],
      },
      {
        heading: "Why it should not be ignored",
        paragraphs: [
          "In many people fatty liver stays mild. In some, the fat causes ongoing inflammation. Over the years this can lead to scarring of the liver, called fibrosis, and in a smaller number of people to cirrhosis, where the liver becomes hard and does not work well.",
          "Fatty liver is also linked with diabetes, high blood pressure and heart disease, so it is a sign to look at your overall health and not only the liver.",
        ],
      },
      {
        heading: "Symptoms",
        paragraphs: [
          "Most people with fatty liver have no symptoms. When symptoms do appear, they are usually vague.",
        ],
        bullets: [
          "Tiredness or low energy",
          "A dull discomfort or feeling of fullness in the upper right side of the abdomen",
          "Mild nausea or loss of appetite",
          "In advanced liver disease: yellowing of the eyes or skin (jaundice), swelling of the legs or abdomen, easy bruising or bleeding",
        ],
        callout:
          "Many people with fatty liver feel completely normal. Waiting for symptoms is not a safe way to know about your liver.",
      },
      {
        heading: "Common causes and risk factors",
        paragraphs: ["Fatty liver usually has more than one cause."],
        bullets: [
          "Being overweight, especially extra fat around the waist",
          "Type 2 diabetes or pre-diabetes",
          "High cholesterol or high triglycerides",
          "High blood pressure",
          "A diet high in sugar, sweet drinks, refined flour and fried food",
          "Little physical activity",
          "Regular or heavy alcohol use, which causes alcohol-related fatty liver",
          "Some medicines and rapid weight loss, which the doctor can review",
        ],
      },
      {
        heading: "How is fatty liver checked?",
        paragraphs: [
          "The doctor first asks about your weight, diet, alcohol use, medicines and family history, and examines you. Some tests then help to see how much the liver is affected.",
        ],
        bullets: [
          "Blood tests, including liver function tests, sugar and cholesterol",
          "Ultrasound of the abdomen, which can show fat in the liver",
          "Fibroscan, which also tells how stiff or scarred the liver is",
        ],
      },
      {
        heading: "What is a Fibroscan?",
        paragraphs: [
          "A Fibroscan is a painless, non-invasive scan of the liver. A small probe is placed on the skin over the right side of the lower chest. It sends a gentle vibration into the liver and measures how fast it travels. A stiffer liver is a sign of scarring. The scan also estimates how much fat is in the liver.",
          `Fibroscan is available as a day care procedure at ${CLINIC.name}.`,
        ],
        steps: [
          "You are usually asked not to eat for a few hours before the scan. The clinic will tell you the exact instructions.",
          "You lie on your back with your right arm raised behind your head.",
          "Gel is applied and the probe is pressed lightly on the skin. There is no needle and no cut.",
          "A number of readings are taken, which usually takes only a few minutes.",
          "The doctor explains the result along with your blood tests and plans the next step.",
        ],
      },
      {
        heading: "What you can do",
        paragraphs: [
          "The good news is that fatty liver can improve, especially when it is found early. The main treatment is a change in daily habits.",
        ],
        bullets: [
          "Lose weight gradually if you are overweight. Even a loss of about 5 to 10 percent of body weight can reduce liver fat.",
          "Walk or exercise for about 30 minutes on most days.",
          "Cut down on sweet drinks, sweets, bakery items and deep-fried snacks.",
          "Eat more vegetables, pulses, whole grains and fruit.",
          "Avoid alcohol, or limit it as advised by your doctor.",
          "Keep diabetes, blood pressure and cholesterol under control.",
          "Do not start herbal or over-the-counter products for the liver without asking a doctor.",
        ],
      },
      {
        heading: "When to see a liver specialist",
        paragraphs: [
          `Consult ${CLINIC.doctor.name} if fatty liver is seen on your ultrasound, if your liver test values are high, or if you have diabetes or obesity and have never had your liver checked. Early assessment helps to catch scarring before it advances.`,
        ],
        callout:
          "Yellow eyes or skin, vomiting blood, black stools or swelling of the abdomen need urgent medical care.",
      },
    ],
    faqs: [
      {
        q: "Is fatty liver curable?",
        a: "In the early stages fatty liver can often be reversed with weight loss, regular exercise, a healthy diet and control of diabetes and cholesterol. Scarring that has already formed may not fully reverse, which is why early checks matter.",
      },
      {
        q: "Does a Fibroscan hurt?",
        a: "No. It is a painless scan done with a probe on the skin. There is no needle, no cut and no sedation.",
      },
      {
        q: "I do not drink alcohol. Can I still have fatty liver?",
        a: "Yes. Fatty liver is very common in people who do not drink, and it is mostly linked to weight, diabetes, cholesterol and an unhealthy diet.",
      },
    ],
    relatedSlugs: [
      "gallstones-pancreatitis-warning-signs",
      "acidity-gas-bloating-when-to-see-a-gastroenterologist",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "upper-gi-endoscopy-what-to-expect",
    title: "Upper GI Endoscopy: Why It Is Done and What to Expect",
    category: "Endoscopy",
    readTime: "5 min read",
    image: "/assets/news/upper-gi-endoscopy.svg",
    summary:
      "An upper GI endoscopy lets the doctor look directly at your food pipe, stomach and the first part of the small intestine. Learn when it is needed, how to prepare and what happens on the day.",
    keyTakeaways: [
      "Upper GI endoscopy looks at the food pipe, stomach and duodenum",
      "It is advised for symptoms that last or that come with warning signs",
      "You need to keep your stomach empty before the procedure",
      "It is usually quick, and most people go home the same day",
      "A small tissue sample can be taken during the procedure if needed",
    ],
    contentSections: [
      {
        heading: "What is an upper GI endoscopy?",
        paragraphs: [
          "An upper GI endoscopy is a procedure in which a thin, flexible tube with a tiny camera and light is passed through the mouth. It lets the doctor see the inside of the food pipe (oesophagus), the stomach and the first part of the small intestine (duodenum) on a screen.",
          "It is more accurate than an X-ray for many problems, because the doctor can see the lining directly and can take a small tissue sample (biopsy) if something needs to be tested.",
        ],
      },
      {
        heading: "Why is it done?",
        paragraphs: [
          "Your doctor may advise an upper GI endoscopy to find the cause of symptoms or to treat certain problems.",
        ],
        bullets: [
          "Heartburn or acidity that does not settle with treatment",
          "Difficulty or pain while swallowing",
          "Repeated vomiting, or vomiting blood",
          "Black, tar-like stools",
          "Pain in the upper abdomen that lasts or keeps returning",
          "Unexplained weight loss, loss of appetite or low haemoglobin",
          "Checking for ulcers, inflammation, infection with H. pylori, or growths",
          "Checking for swollen veins in the food pipe in people with liver disease",
        ],
        callout:
          "Black stools or vomiting blood can be a sign of bleeding in the digestive tract. Please see a doctor or go to a hospital without delay.",
      },
      {
        heading: "How to prepare",
        paragraphs: [
          "The clinic will give you exact instructions, but the general points are as follows.",
        ],
        bullets: [
          "Do not eat or drink for the number of hours the doctor tells you, usually around 6 to 8 hours.",
          "Tell the doctor about all your medicines, especially blood thinners, aspirin and diabetes medicines, and about any allergies.",
          "Tell the doctor if you have heart or lung problems, or if you are pregnant.",
          "Carry your earlier reports and prescriptions.",
          "If you will be given sedation, arrange for someone to accompany you.",
        ],
      },
      {
        heading: "What happens during the procedure",
        paragraphs: [
          "The procedure usually takes only a few minutes, and most of the time is spent on preparation and recovery.",
        ],
        steps: [
          "You lie on your left side. Your throat may be numbed with a spray, or you may be given sedation to help you relax.",
          "A small mouth guard is placed to keep your mouth open and protect your teeth.",
          "The doctor gently passes the endoscope through your mouth. It does not block your breathing.",
          "The doctor looks at the lining and, if needed, takes a small biopsy. A biopsy is painless.",
          "The endoscope is removed and you rest for a short time before going home.",
        ],
      },
      {
        heading: "After the procedure",
        paragraphs: [
          "You may feel a mild sore throat or bloating for a few hours. Do not eat or drink until the throat numbness wears off, or as advised. If you were sedated, do not drive, sign important papers or operate machinery for the rest of the day.",
          "The doctor will explain what was seen. If a biopsy was taken, the report usually takes a few days and will be discussed at follow-up.",
        ],
      },
      {
        heading: "Is it safe?",
        paragraphs: [
          "Upper GI endoscopy is a commonly performed and generally safe procedure. Serious problems such as bleeding or a tear in the lining are rare. Contact the clinic or go to a hospital if you have severe chest or abdominal pain, fever, vomiting, black stools or trouble swallowing after the procedure.",
        ],
      },
      {
        heading: "Endoscopy at Gastroworld Clinic",
        paragraphs: [
          `${CLINIC.name} offers upper GI endoscopy, colonoscopy and other advanced endoscopic procedures in ${CLINIC.address.area}, led by ${CLINIC.doctor.name}, ${CLINIC.doctor.title}.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Is an upper GI endoscopy painful?",
        a: "Most people feel some gagging or pressure but not pain. A throat spray or sedation helps you stay comfortable. Tell the doctor if you are anxious.",
      },
      {
        q: "Can I go to work the same day?",
        a: "If you had only a throat spray you can usually return to routine work after the numbness wears off. If you had sedation, rest for the day and do not drive.",
      },
      {
        q: "Will the doctor tell me the result immediately?",
        a: "The doctor usually tells you what was seen soon after the procedure. If a biopsy was taken, the final report comes after a few days.",
      },
    ],
    relatedSlugs: [
      "acidity-gas-bloating-when-to-see-a-gastroenterologist",
      "gallstones-pancreatitis-warning-signs",
      "fatty-liver-symptoms-causes-fibroscan",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "acidity-gas-bloating-when-to-see-a-gastroenterologist",
    title: "Acidity, Gas and Bloating: When to See a Gastroenterologist",
    category: "Digestive Health",
    readTime: "5 min read",
    image: "/assets/news/acidity-gas-bloating.svg",
    summary:
      "Occasional acidity, gas and bloating are common and often settle with simple changes. Learn which habits help and which warning signs mean you should not wait to be examined.",
    keyTakeaways: [
      "Acidity, gas and bloating are common and often linked to food and habits",
      "Smaller meals, a gap before sleep and fewer trigger foods help many people",
      "Symptoms that last for weeks or keep returning need a proper check",
      "Difficulty swallowing, weight loss, vomiting blood or black stools are warning signs",
    ],
    contentSections: [
      {
        heading: "What is acidity?",
        paragraphs: [
          "Acidity usually means a burning feeling in the chest or upper abdomen, sometimes with a sour taste in the mouth. It happens when stomach acid comes back up into the food pipe. When this happens often, it is called acid reflux, or gastro-oesophageal reflux disease (GERD) if it is frequent or troublesome.",
          "Gas and bloating are different but often occur together. Bloating is a feeling of fullness or tightness in the abdomen, and gas can cause belching or passing wind.",
        ],
      },
      {
        heading: "Common symptoms",
        paragraphs: [],
        bullets: [
          "Burning in the chest or upper abdomen, often after meals or when lying down",
          "Sour or bitter fluid coming up into the throat or mouth",
          "Belching, a feeling of fullness and a swollen abdomen",
          "Nausea, or discomfort after eating",
          "A dry cough, hoarse voice or throat irritation, especially at night",
        ],
      },
      {
        heading: "What can trigger these symptoms",
        paragraphs: ["Triggers differ from person to person."],
        bullets: [
          "Large, heavy or late-night meals",
          "Lying down or sleeping soon after eating",
          "Very spicy, oily or fried food",
          "Tea, coffee, fizzy drinks and alcohol",
          "Smoking and tobacco",
          "Being overweight, and tight clothing around the waist",
          "Stress and irregular meal times",
          "Some pain-relief medicines, which can irritate the stomach",
          "An infection with H. pylori, a germ that can inflame the stomach lining",
        ],
      },
      {
        heading: "Simple habits that help",
        paragraphs: [
          "These steps help many people with mild symptoms. They do not replace an examination if the problem is long-standing.",
        ],
        bullets: [
          "Eat smaller meals at regular times instead of a few large ones.",
          "Keep a gap of about 2 to 3 hours between dinner and lying down.",
          "Raise the head end of the bed a little if symptoms occur at night.",
          "Notice which foods make you worse and cut those down.",
          "Chew food slowly and avoid talking while eating.",
          "Stop smoking and keep alcohol low.",
          "Maintain a healthy weight and stay active.",
          "Do not take pain-relief tablets on an empty stomach, and ask a doctor before using them regularly.",
        ],
      },
      {
        heading: "Warning signs: do not wait",
        paragraphs: [
          "Please see a gastroenterologist if you have any of the following, even if you think it is only acidity.",
        ],
        bullets: [
          "Difficulty or pain while swallowing, or food that feels stuck",
          "Unexplained weight loss or loss of appetite",
          "Repeated vomiting, or vomiting blood",
          "Black, tar-like stools or blood in the stool",
          "Looking pale, feeling very tired or a low haemoglobin level",
          "Symptoms that last for more than 2 to 3 weeks, or return soon after stopping medicine",
          "Symptoms that begin for the first time at a later age",
          "A family history of stomach or food pipe cancer",
        ],
        callout:
          "Taking antacids again and again without finding out the cause can hide a problem that needs treatment. If symptoms keep returning, get examined.",
      },
      {
        heading: "What the specialist may do",
        paragraphs: [
          `${CLINIC.doctor.name} will ask about your symptoms, food habits and medicines and examine you. Depending on the findings, tests such as blood tests, an ultrasound, a test for H. pylori or an upper GI endoscopy may be advised. The treatment plan is then made for you, along with diet and lifestyle advice.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Is acidity the same as a heart problem?",
        a: "No, but the two can feel similar. Chest pain that is severe, spreads to the arm or jaw, or comes with sweating or breathlessness needs emergency care. Do not assume it is acidity.",
      },
      {
        q: "Is it fine to take an antacid every day?",
        a: "Occasional use for mild symptoms is common, but daily use for weeks is a reason to see a doctor and find out the cause.",
      },
      {
        q: "Can stress cause bloating and acidity?",
        a: "Stress and irregular routines can make symptoms worse in many people. It is still important to rule out other causes if symptoms are frequent.",
      },
    ],
    relatedSlugs: [
      "upper-gi-endoscopy-what-to-expect",
      "gallstones-pancreatitis-warning-signs",
      "fatty-liver-symptoms-causes-fibroscan",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "gallstones-pancreatitis-warning-signs",
    title: "Gallstones and Pancreatitis: Warning Signs and Diet Tips",
    category: "Gallbladder & Pancreas",
    readTime: "6 min read",
    image: "/assets/news/gallstones-pancreatitis.svg",
    summary:
      "Gallstones can cause sudden upper abdominal pain and are one of the common causes of pancreatitis. Learn the warning signs, when to go to hospital and how diet helps.",
    keyTakeaways: [
      "Gallstones are hard deposits that form in the gallbladder",
      "They can cause pain in the upper abdomen, especially after fatty meals",
      "Gallstones and alcohol are leading causes of pancreatitis",
      "Severe pain, fever or yellow eyes need urgent care",
      "A low-fat, regular diet helps to ease symptoms",
    ],
    contentSections: [
      {
        heading: "What are gallstones?",
        paragraphs: [
          "The gallbladder is a small pouch under the liver that stores bile, a fluid that helps to digest fat. Gallstones are hard lumps that form from the substances in bile. They can be as small as grains of sand or as large as a lemon, and a person can have one or many.",
          "Many people with gallstones have no symptoms and never need treatment. Problems begin when a stone blocks the flow of bile.",
        ],
      },
      {
        heading: "Symptoms of gallstones",
        paragraphs: [],
        bullets: [
          "Pain in the upper right or middle upper abdomen, often starting after a fatty or heavy meal",
          "Pain that can spread to the back or the right shoulder and last from half an hour to several hours",
          "Nausea and vomiting",
          "A feeling of bloating or indigestion",
        ],
      },
      {
        heading: "Who is more likely to get gallstones?",
        paragraphs: [],
        bullets: [
          "Women, and people above 40 years of age",
          "Being overweight",
          "Rapid weight loss or crash diets",
          "Pregnancy",
          "A family history of gallstones",
          "Diabetes",
        ],
      },
      {
        heading: "What is pancreatitis?",
        paragraphs: [
          "The pancreas is a gland behind the stomach that makes digestive juices and insulin. Pancreatitis means that the pancreas has become inflamed. It can be acute, which comes on suddenly, or chronic, which develops over many years.",
          "Gallstones and heavy alcohol use are two of the most common causes. Other causes include very high triglycerides, some medicines, injury and certain infections. Sometimes no cause is found.",
        ],
        bullets: [
          "Severe pain in the upper abdomen that may spread to the back",
          "Pain that gets worse after eating or when lying flat",
          "Nausea, vomiting and a swollen, tender abdomen",
          "Fever and a fast heartbeat",
          "In chronic pancreatitis: repeated pain, loose, oily, foul-smelling stools and weight loss",
        ],
        callout:
          "Sudden severe abdominal pain, repeated vomiting, fever or yellow eyes and skin need urgent care. Please go to a hospital without delay.",
      },
      {
        heading: "How the problem is checked",
        paragraphs: [
          "The doctor starts with your history and examination. Blood tests and an ultrasound of the abdomen are often the first tests. Depending on the findings, further scans or an endoscopic test may be advised.",
          "When a stone has moved into the bile duct, a procedure called ERCP can be used to remove the stone and clear the blockage. Whether it is needed depends on your condition, and the specialist will explain your options.",
        ],
      },
      {
        heading: "Diet tips",
        paragraphs: [
          "Diet does not dissolve stones, but it can help to reduce symptoms and protect the pancreas. Your doctor or dietitian will tailor the advice to you.",
        ],
        bullets: [
          "Choose a low-fat diet. Cut down on deep-fried food, pakoras, samosas, full-fat sweets, cream and butter.",
          "Eat small, regular meals instead of long gaps followed by a heavy meal.",
          "Include vegetables, fruit, whole grains and pulses.",
          "Drink enough water through the day.",
          "Avoid alcohol completely if you have had pancreatitis, unless your doctor says otherwise.",
          "Lose weight slowly. Crash diets can make gallstones more likely.",
        ],
      },
      {
        heading: "When to see a specialist",
        paragraphs: [
          `Consult ${CLINIC.doctor.name} if you have repeated upper abdominal pain, gallstones seen on an ultrasound, or a past attack of pancreatitis. ${CLINIC.name} offers consultation for gallbladder and pancreas diseases, advanced endoscopic procedures and nutritional counselling.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Do all gallstones need treatment?",
        a: "No. Stones that cause no symptoms are often only watched. Treatment is considered when stones cause pain, infection, jaundice or pancreatitis. The doctor will advise based on your situation.",
      },
      {
        q: "Can pancreatitis come back?",
        a: "It can, especially if the cause such as a gallstone or alcohol use is not addressed. Finding and treating the cause lowers the chance of another attack.",
      },
      {
        q: "Is the pain from gallstones always severe?",
        a: "No. It can range from a mild, repeated discomfort after meals to severe pain. Any pain that is severe, lasts for hours or comes with fever or yellow eyes needs urgent care.",
      },
    ],
    relatedSlugs: [
      "fatty-liver-symptoms-causes-fibroscan",
      "upper-gi-endoscopy-what-to-expect",
      "acidity-gas-bloating-when-to-see-a-gastroenterologist",
    ],
  },
];