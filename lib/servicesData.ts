// Content for the Services section.
// Each service = ONE page. Each "section" = a block on that same page
// (also shown in the header flyout menu as an anchor link).
// All four services now have real content.

export type ServiceGroup = { heading: string; items: string[] };

export type ServiceFact = { label: string; value: string };

export type ServiceSection = {
  id: string; // URL anchor, e.g. /services/consultation#liver-related-diseases
  title: string;
  summary: string;
  points: string[]; // simple bullet list (used when `groups` is not set)
  groups?: ServiceGroup[]; // headed lists (conditions / symptoms / how we help)
  highlights?: string[]; // short key points shown beside a portrait image
  facts?: ServiceFact[]; // quick facts grid shown beside a portrait image
  image?: string; // path inside /public, e.g. /assets/consultation/x.jpg (1000x625)
  imageAlt?: string;
  imageWidth?: number; // default 1000
  imageHeight?: number; // default 625 (use 800x1000 for portrait images)
};

export type Service = {
  slug: string; // URL: /services/<slug>
  title: string;
  tagline: string;
  intro: string;
  // optional "What is ...?" intro block with a portrait image (800x1000)
  introHeading?: string;
  introImage?: string;
  introImageAlt?: string;
  introChecklist?: string[];
  sections: ServiceSection[];
};

const IMG = '/assets/consultation';
const EIMG = '/assets/endoscopic-procedures';
const DIMG = '/assets/day-care-gi-procedures';
const NIMG = '/assets/nutritional-counselling';

export const SERVICES: Service[] = [
  {
    slug: 'consultation',
    title: 'Consultation',
    tagline: 'Expert evaluation and diagnosis for digestive and liver conditions.',
    intro:
      'A gastroenterology consultation is a detailed evaluation of your digestive system: the food pipe, stomach, intestines, liver, gallbladder and pancreas. Your specialist listens to your symptoms, reviews your history and reports, examines you, and explains the tests, treatment and lifestyle changes you need.',
    introHeading: 'Consultation at our Gut & Liver Clinic',
    introImage: `${IMG}/consultation-intro.jpg`,
    introImageAlt: 'Illustration of the human body highlighting the liver and digestive organs',
    introChecklist: [
      'Detailed discussion of your symptoms and medical history',
      'Physical examination',
      'Review of your previous reports, scans and medicines',
      'Advice on tests such as blood tests, ultrasound, endoscopy or Fibroscan when needed',
      'A clear treatment and diet plan with follow-up',
    ],
    sections: [
      {
        id: 'gastroenterology-diseases',
        title: 'Gastroenterology Diseases',
        summary:
          'Disorders of the digestive tract can affect the food pipe, stomach, small intestine and large intestine. We evaluate persistent or recurring digestive complaints to find the cause and plan the right treatment.',
        points: [],
        highlights: [
          'Finds the cause of persistent digestive symptoms',
          'Tests are advised only when they are needed',
          'A medicine, diet and lifestyle plan with follow-up',
        ],
        facts: [
          { label: 'Visit', value: 'History, examination and review of reports' },
          { label: 'Bring', value: 'Previous reports, scans and a list of medicines' },
          { label: 'Tests', value: 'Blood tests, stool tests or endoscopy if needed' },
          { label: 'Follow-up', value: 'Planned to monitor your progress' },
        ],
        image: `${IMG}/gastroenterology-diseases.jpg`,
        imageAlt: 'Illustration of the digestive system showing the stomach, liver and intestines',
        groups: [
          {
            heading: 'Common conditions',
            items: [
              'Acid reflux (GERD) and heartburn',
              'Gastritis and peptic ulcer disease',
              'Irritable bowel syndrome (IBS)',
              "Inflammatory bowel disease (Crohn's disease and ulcerative colitis)",
              'Celiac disease and malabsorption',
              'Constipation and chronic diarrhoea',
              'Gastrointestinal bleeding',
            ],
          },
          {
            heading: 'Symptoms to watch for',
            items: [
              'Persistent abdominal pain or bloating',
              'Heartburn, nausea or vomiting',
              'A lasting change in bowel habits',
              'Blood in the stool or black stools',
              'Difficulty swallowing',
              'Unexplained weight loss',
            ],
          },
          {
            heading: 'How we help',
            items: [
              'Detailed history and examination',
              'Targeted tests such as blood tests, stool tests or endoscopy',
              'Medicines, diet and lifestyle guidance',
              'Follow-up to monitor your progress',
            ],
          },
        ],
      },
      {
        id: 'liver-related-diseases',
        title: 'Liver Related Diseases',
        summary:
          'The liver processes nutrients, filters toxins and produces bile. Liver disease is often silent in its early stages, so timely evaluation matters.',
        points: [],
        highlights: [
          'Early evaluation, as liver disease is often silent',
          'Non-invasive checks such as ultrasound and Fibroscan',
          'Advice on diet, vaccination and lifestyle',
        ],
        facts: [
          { label: 'Visit', value: 'History, examination and review of reports' },
          { label: 'Bring', value: 'Earlier liver reports and a list of medicines and supplements' },
          { label: 'Tests', value: 'Liver function tests, ultrasound or Fibroscan' },
          { label: 'Follow-up', value: 'Regular monitoring of your liver health' },
        ],
        image: `${IMG}/liver-related-diseases.jpg`,
        imageAlt: 'Illustration of the liver with the gallbladder and blood vessels',
        groups: [
          {
            heading: 'Common conditions',
            items: [
              'Fatty liver disease',
              'Alcohol-related liver disease',
              'Viral hepatitis (A, B, C and E)',
              'Liver cirrhosis and its complications',
              'Autoimmune and drug-induced liver injury',
              'Jaundice',
            ],
          },
          {
            heading: 'Symptoms to watch for',
            items: [
              'Yellowing of the skin and eyes',
              'Swelling of the abdomen or legs',
              'Persistent tiredness and loss of appetite',
              'Dark urine or pale stools',
              'Easy bruising or bleeding',
              'Itching',
            ],
          },
          {
            heading: 'How we help',
            items: [
              'Liver function tests and ultrasound',
              'Fibroscan to assess liver fat and stiffness',
              'Management of complications such as fluid build-up in the abdomen',
              'Vaccination, diet and lifestyle advice',
            ],
          },
        ],
      },
      {
        id: 'liver-transplant-counselling',
        title: 'Liver Transplant Counselling',
        summary:
          'A liver transplant is considered when the liver can no longer perform its essential functions. Counselling helps patients and families understand when a transplant is needed, what the options are and what to expect.',
        points: [],
        highlights: [
          'Explains when a transplant is needed and what the options are',
          'Covers living-donor and deceased-donor routes',
          'Questions from the patient and family are answered',
        ],
        facts: [
          { label: 'Who', value: 'Patients and family members are welcome' },
          { label: 'Covers', value: 'Timing, donor options and the evaluation process' },
          { label: 'Bring', value: 'All liver reports, scans and hospital summaries' },
          { label: 'After', value: 'Guidance on life after transplant' },
        ],
        image: `${IMG}/liver-transplant-counselling.jpg`,
        imageAlt: 'Diagram of a liver transplant showing donor liver portion and removed recipient liver',
        groups: [
          {
            heading: 'Who may need counselling',
            items: [
              'Advanced cirrhosis (end-stage liver disease)',
              'Acute liver failure',
              'Selected patients with liver cancer',
              'Repeated serious complications of liver disease',
            ],
          },
          {
            heading: 'What counselling covers',
            items: [
              'Whether and when a transplant is advisable',
              'Living-donor and deceased-donor options',
              'The evaluation process and tests involved',
              'Life after transplant: medicines, follow-up and lifestyle',
              'Answers to questions from the patient and family',
            ],
          },
        ],
      },
      {
        id: 'gallbladder-pancreas-diseases',
        title: 'Gallbladder & Pancreas Diseases',
        summary:
          'The gallbladder stores bile and the pancreas makes digestive enzymes and insulin. Stones, inflammation or blockage in these organs can cause severe pain and digestive problems.',
        points: [],
        highlights: [
          'Clear diagnosis of stones, inflammation or blockage',
          'Medical care for pancreatitis and pain',
          'Endoscopic treatment or surgical referral when required',
        ],
        facts: [
          { label: 'Visit', value: 'History, examination and review of reports' },
          { label: 'Bring', value: 'Ultrasound, CT or other scan reports' },
          { label: 'Tests', value: 'Ultrasound, blood tests and further imaging' },
          { label: 'Follow-up', value: 'Diet advice and review of your progress' },
        ],
        image: `${IMG}/gallbladder-pancreas-diseases.jpg`,
        imageAlt: 'Illustration of the gallbladder, bile duct, pancreas and gallstones',
        groups: [
          {
            heading: 'Common conditions',
            items: [
              'Gallstones and biliary colic',
              'Inflammation of the gallbladder (cholecystitis)',
              'Bile duct stones and blockage',
              'Acute pancreatitis',
              'Chronic pancreatitis',
              'Pancreatic cysts',
            ],
          },
          {
            heading: 'Symptoms to watch for',
            items: [
              'Severe upper abdominal pain, sometimes spreading to the back',
              'Pain after fatty meals',
              'Nausea and vomiting',
              'Jaundice',
              'Fever with abdominal pain',
              'Oily, foul-smelling stools',
            ],
          },
          {
            heading: 'How we help',
            items: [
              'Ultrasound, blood tests and further imaging',
              'Medical management of pancreatitis and pain',
              'Endoscopic procedures such as ERCP when needed',
              'Diet advice and referral for surgery when required',
            ],
          },
        ],
      },
      {
        id: 'gastrointestinal-cancers',
        title: 'Gastrointestinal Cancers',
        summary:
          'Cancers can develop anywhere along the digestive tract and in organs such as the liver, pancreas and gallbladder. Early detection greatly improves treatment options, so prompt evaluation of warning signs is important.',
        points: [],
        highlights: [
          'Prompt evaluation of warning signs',
          'Biopsy and imaging to confirm the diagnosis',
          'Screening guidance for people at higher risk',
        ],
        facts: [
          { label: 'Visit', value: 'History, examination and review of reports' },
          { label: 'Bring', value: 'Previous scans, biopsy and blood reports' },
          { label: 'Tests', value: 'Endoscopy or colonoscopy with biopsy, and imaging' },
          { label: 'Team', value: 'Coordination with oncology and surgical teams' },
        ],
        image: `${IMG}/gastrointestinal-cancers.jpg`,
        imageAlt: 'Illustration of the digestive tract with a close-up of a gastrointestinal tumour',
        groups: [
          {
            heading: 'Types we evaluate',
            items: [
              'Oesophageal and stomach cancer',
              'Colorectal cancer',
              'Liver cancer',
              'Pancreatic and gallbladder cancer',
              'Bile duct cancer',
            ],
          },
          {
            heading: 'Warning signs',
            items: [
              'Unexplained weight loss',
              'Blood in the stool or vomit',
              'Persistent difficulty swallowing',
              'Ongoing change in bowel habits',
              'Jaundice',
              'Persistent abdominal pain or a lump in the abdomen',
            ],
          },
          {
            heading: 'How we help',
            items: [
              'Endoscopy and colonoscopy with biopsy for diagnosis',
              'Imaging and tumour marker tests',
              'Coordination with oncology and surgical teams',
              'Screening guidance for people with a family history or other risk factors',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'endoscopic-procedures',
    title: 'Endoscopic Procedures',
    tagline: 'Advanced diagnostic and therapeutic endoscopy.',
    intro:
      'Endoscopic procedures use a thin, flexible tube with a light and a camera to look directly inside the digestive tract and the bile and pancreatic ducts. They help find the cause of your symptoms and, in many cases, treat the problem in the same sitting without open surgery.',
    introHeading: 'Endoscopic Procedures at our Gut & Liver Clinic',
    introImage: `${EIMG}/endoscopic-intro.jpg`,
    introImageAlt: 'Illustration of an endoscope passing through the oesophagus into the stomach and duodenum',
    introChecklist: [
      'A pre-procedure consultation to review your symptoms, medicines and medical history',
      'Clear instructions on fasting and, for colonoscopy, bowel preparation',
      'Sedation, where appropriate, so that you stay comfortable',
      'A period of observation and recovery after the procedure',
      'A report and follow-up plan once all results, including any biopsy, are available',
    ],
    sections: [
      {
        id: 'upper-gi-endoscopy',
        title: 'Upper GI Endoscopy',
        summary:
          'Upper GI endoscopy, also called gastroscopy or oesophago-gastro-duodenoscopy (OGD), uses a thin flexible tube with a camera, passed through the mouth, to examine the lining of the food pipe, the stomach and the first part of the small intestine (duodenum).',
        points: [],
        highlights: [
          'Gives a clear, direct view of the food pipe, stomach and duodenum',
          'A biopsy can be taken during the same procedure',
          'Some problems, such as bleeding points, can be treated on the spot',
        ],
        facts: [
          { label: 'Duration', value: 'About 5 to 15 minutes' },
          { label: 'Preparation', value: 'Fasting for several hours' },
          { label: 'Comfort', value: 'Throat spray or sedation' },
          { label: 'Recovery', value: 'Usually home the same day' },
        ],
        image: `${EIMG}/upper-gi-endoscopy.jpg`,
        imageAlt: 'Illustration of an upper endoscopy showing the endoscope passing through the oesophagus into the stomach',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Why it is done',
            items: [
              'Heartburn or acid reflux that does not settle with treatment',
              'Persistent upper abdominal pain, nausea or vomiting',
              'Difficulty or pain on swallowing',
              'Vomiting blood or passing black stools',
              'Unexplained weight loss or anaemia',
              'Checking for enlarged veins (varices) in people with liver disease',
            ],
          },
          {
            heading: 'What it can find or treat',
            items: [
              'Gastritis and stomach or duodenal ulcers',
              'Reflux-related damage to the food pipe',
              'Narrowing of the food pipe, which can be stretched during the procedure',
              'Bleeding points and varices, which can be treated on the spot',
              'Polyps and early growths, with biopsy where needed',
              'H. pylori infection and celiac disease, confirmed on biopsy',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'You fast for several hours beforehand',
              'A throat spray or sedation keeps you comfortable',
              'The procedure itself is usually short',
              'Mild throat soreness or bloating afterwards is common and settles quickly',
            ],
          },
        ],
      },
      {
        id: 'colonoscopy',
        title: 'Colonoscopy',
        summary:
          'Colonoscopy uses a long, flexible tube with a camera, passed through the rectum, to examine the lining of the entire large intestine (colon) and rectum. It is used to diagnose bowel problems and also to prevent colon cancer by removing polyps before they turn harmful.',
        points: [],
        highlights: [
          'Examines the whole of the large intestine and rectum',
          'Polyps can be removed during the same test',
          'Helps prevent colon cancer by catching problems early',
        ],
        facts: [
          { label: 'Duration', value: 'About 30 to 60 minutes' },
          { label: 'Preparation', value: 'Bowel preparation the day before' },
          { label: 'Comfort', value: 'Sedation' },
          { label: 'Recovery', value: 'Same day, after a short observation' },
        ],
        image: `${EIMG}/colonoscopy.jpg`,
        imageAlt: 'Illustration of a colonoscopy showing the colonoscope, camera tip and monitor view',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Why it is done',
            items: [
              'Blood in the stool or rectal bleeding',
              'A lasting change in bowel habits',
              'Chronic diarrhoea or constipation',
              'Unexplained anaemia or weight loss',
              'Screening for colorectal cancer, usually from 45 to 50 years of age, or earlier with a family history',
            ],
          },
          {
            heading: 'What it can find or treat',
            items: [
              'Polyps, which can be removed during the test',
              'Colorectal cancer, confirmed with a biopsy',
              "Inflammatory bowel disease (Crohn's disease and ulcerative colitis)",
              'Diverticular disease',
              'Sources of bleeding in the bowel',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'Bowel preparation the day before to clean the colon',
              'Sedation to keep you comfortable',
              'Polyps and biopsies are taken through the scope',
              'Some bloating or wind afterwards is normal',
              'Rare risks such as bleeding or a tear in the bowel wall are explained to you beforehand',
            ],
          },
        ],
      },
      {
        id: 'ercp',
        title: 'ERCP',
        summary:
          'ERCP (endoscopic retrograde cholangiopancreatography) combines endoscopy with X-ray imaging to examine and treat the bile ducts and the pancreatic duct. The scope is passed through the mouth to the duodenum, where a smaller instrument is guided into the ducts.',
        points: [],
        highlights: [
          'Examines and treats the bile ducts and pancreatic duct in one procedure',
          'Stones can be removed and stents placed without open surgery',
          'Combines endoscopy with X-ray imaging',
        ],
        facts: [
          { label: 'Duration', value: 'About 30 to 90 minutes' },
          { label: 'Preparation', value: 'Fasting, with blood tests beforehand' },
          { label: 'Comfort', value: 'Sedation or anaesthesia' },
          { label: 'Recovery', value: 'Observation for some hours, sometimes overnight' },
        ],
        image: `${EIMG}/ercp.jpg`,
        imageAlt: 'Diagram of ERCP showing the endoscope in the duodenum, bile duct, gallstone and pancreas',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Why it is done',
            items: [
              'Jaundice caused by a suspected blocked bile duct',
              'Gallstones that have moved into the bile duct',
              'Pancreatitis caused by stones or duct problems',
              'Abnormal liver tests or scans that suggest a duct blockage',
              'Bile leak or duct injury after surgery',
            ],
          },
          {
            heading: 'What it can treat',
            items: [
              'Removal of bile duct stones with a small basket or balloon',
              'Placing a stent to keep a narrowed or blocked duct open',
              'Widening of narrowed bile ducts',
              'Draining infected bile',
              'Taking samples from the ducts for biopsy',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'You fast beforehand and receive sedation or anaesthesia',
              'X-ray dye is injected into the ducts to show them clearly',
              'You are observed for some hours afterwards, sometimes overnight',
              'Possible risks, such as pancreatitis, bleeding or infection, are explained beforehand',
            ],
          },
        ],
      },
      {
        id: 'endo-ultrasound',
        title: 'Endo Ultrasound',
        summary:
          'Endoscopic ultrasound (EUS) combines endoscopy with ultrasound. A thin scope with a tiny ultrasound probe at its tip gives detailed pictures of the wall of the digestive tract and of nearby organs such as the pancreas, bile ducts and lymph nodes. A fine needle can also be passed through it to take samples.',
        points: [],
        highlights: [
          'Gives detailed pictures of the gut wall and nearby organs',
          'A needle biopsy can be taken during the same procedure',
          'Helps stage cancers and plan the right treatment',
        ],
        facts: [
          { label: 'Duration', value: 'About 30 to 60 minutes' },
          { label: 'Preparation', value: 'Fasting for several hours' },
          { label: 'Comfort', value: 'Sedation' },
          { label: 'Recovery', value: 'Same day, after a short observation' },
        ],
        image: `${EIMG}/endo-ultrasound.jpg`,
        imageAlt: 'Illustration of endoscopic ultrasound with a biopsy needle sampling a lymph node near the oesophagus',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Why it is done',
            items: [
              'Closer evaluation of a pancreatic mass or cyst',
              'Staging of oesophageal, stomach or rectal cancers',
              'Looking for small stones in the bile duct or gallbladder missed on other scans',
              'Investigating unexplained pancreatitis or a widened bile duct',
              'Assessing growths under the lining of the stomach or food pipe',
            ],
          },
          {
            heading: 'What it can do',
            items: [
              'Show the gut wall and nearby organs in fine detail',
              'Take needle biopsies from lumps or lymph nodes',
              'Drain selected pancreatic cysts or fluid collections',
              'Help plan the right treatment, including surgery or oncology care',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'You fast beforehand and receive sedation',
              'The procedure is similar to an upper endoscopy and may take a little longer',
              'Biopsy results usually take a few days',
              'Mild throat soreness afterwards is common',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'day-care-gi-procedures',
    title: 'Day Care GI Procedures',
    tagline: 'Same-day procedures and supportive care.',
    intro:
      'Day care procedures are treatments and tests that are done at the clinic so that you can go home the same day, without an overnight hospital stay. For patients with digestive and liver conditions they include draining abdominal fluid, albumin infusion, vaccination, Fibroscan, laboratory tests and pharmacy support, planned and supervised by your specialist.',
    introHeading: 'Day Care GI Procedures at our Gut & Liver Clinic',
    introImage: `${DIMG}/day-care-intro.jpg`,
    introImageAlt: 'Doctor smiling and reviewing a report with a patient during a consultation',
    introChecklist: [
      'Procedures planned after a consultation and review of your reports',
      'Done as day care, so most patients go home the same day',
      'Monitoring by trained staff during and after the procedure',
      'Clear instructions on diet, medicines and warning signs afterwards',
      'A follow-up plan based on your results and progress',
    ],
    sections: [
      {
        id: 'ascitic-tapping',
        title: 'Ascitic Tapping',
        summary:
          'Ascitic tapping (paracentesis) drains excess fluid that has collected in the abdomen. After the skin is numbed, a thin needle or drain removes the fluid, easing swelling and breathlessness. A sample can also be tested to find the cause.',
        points: [],
        highlights: [
          'Relieves abdominal swelling, tightness and breathlessness',
          'Done with a local anaesthetic at the needle site',
          'A fluid sample can be tested to find the cause or to check for infection',
        ],
        facts: [
          { label: 'Duration', value: 'From about 30 minutes to a few hours, depending on the amount of fluid' },
          { label: 'Preparation', value: 'Empty your bladder; tell us about blood-thinning medicines' },
          { label: 'Comfort', value: 'Local anaesthetic' },
          { label: 'Recovery', value: 'Usually home the same day after observation' },
        ],
        image: `${DIMG}/ascitic-tapping.jpg`,
        imageAlt: 'Diagram showing ascites in the abdomen being drained into a collection bag',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Why it is done',
            items: [
              'Fluid build-up in the abdomen from liver cirrhosis',
              'A tight, swollen abdomen causing pain or discomfort',
              'Breathlessness or early fullness from the pressure of fluid',
              'Fluid that does not settle with medicines such as diuretics',
              'Fever or abdominal pain suggesting infection of the fluid',
              'Testing the fluid to find the cause of ascites',
            ],
          },
          {
            heading: 'What it helps with',
            items: [
              'Quick relief from abdominal swelling and pain',
              'Easier breathing, eating and movement',
              'Tests on the fluid, such as cell count, protein and culture',
              'Detecting infection of the abdominal fluid (spontaneous bacterial peritonitis)',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'Ultrasound may be used to choose the safest spot',
              'The skin is cleaned and numbed with a local anaesthetic',
              'A thin needle or drain is placed and the fluid drains into a container',
              'Your pulse and blood pressure are checked during and after the procedure',
              'Albumin may be given if a large amount of fluid is removed',
              'Mild soreness or a little leakage at the site can happen; rare risks such as infection, bleeding or low blood pressure are explained beforehand',
            ],
          },
        ],
      },
      {
        id: 'albumin-infusion',
        title: 'Albumin Infusion',
        summary:
          'Albumin is a protein made by the liver that keeps fluid inside the blood vessels. When levels fall in advanced liver disease, albumin is given slowly through a drip, under observation, in selected situations.',
        points: [],
        highlights: [
          'Helps keep fluid inside the blood vessels',
          'Often given along with ascitic tapping or for certain liver complications',
          'Given slowly through a drip with monitoring by nursing staff',
        ],
        facts: [
          { label: 'Duration', value: 'Usually a few hours' },
          { label: 'Preparation', value: 'Blood tests and your doctor\u2019s advice beforehand' },
          { label: 'Comfort', value: 'A small cannula placed in a vein' },
          { label: 'Recovery', value: 'Usually home the same day' },
        ],
        image: `${DIMG}/albumin-infusion.jpg`,
        imageAlt: 'Illustration of the liver and digestive organs inside the human body',
        imageWidth: 800,
        imageHeight: 589,
        groups: [
          {
            heading: 'When it is used',
            items: [
              'After removal of a large amount of ascitic fluid',
              'Infection of the abdominal fluid (spontaneous bacterial peritonitis)',
              'Kidney problems linked to advanced liver disease (hepatorenal syndrome)',
              'Selected patients with cirrhosis, low albumin and fluid build-up',
            ],
          },
          {
            heading: 'How it helps',
            items: [
              'Supports blood volume and blood pressure',
              'Lowers the risk of kidney problems after large-volume fluid drainage',
              'Supports fluid balance in selected liver patients',
              'Forms part of the overall treatment plan alongside medicines and diet',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'Your doctor reviews your reports and confirms that the infusion is needed',
              'A thin cannula is placed in a vein, usually in the arm',
              'The infusion runs slowly while staff check your pulse, blood pressure and temperature',
              'Chills, rash, fever or breathlessness are uncommon; tell the staff at once if you feel unwell',
              'Follow-up blood tests may be advised',
            ],
          },
        ],
      },
      {
        id: 'vaccination',
        title: 'Vaccination',
        summary:
          'Vaccines protect against infections that can be more serious in liver and digestive disease. We review your history, then advise and give the vaccines that suit your condition, such as hepatitis A and B.',
        points: [],
        highlights: [
          'Protects against infections such as hepatitis A and hepatitis B',
          'Especially valuable in chronic liver disease, where infections can be more serious',
          'A dose schedule planned around your condition and treatment',
        ],
        facts: [
          { label: 'Duration', value: 'A few minutes, plus a short wait afterwards' },
          { label: 'Preparation', value: 'Bring your previous vaccination records' },
          { label: 'Comfort', value: 'A quick injection, usually in the upper arm' },
          { label: 'Recovery', value: 'Return to your normal routine' },
        ],
        image: `${DIMG}/vaccination.jpg`,
        imageAlt: 'Healthcare worker in green scrubs holding a syringe',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Vaccines commonly advised',
            items: [
              'Hepatitis A',
              'Hepatitis B',
              'Influenza (yearly)',
              'Pneumococcal',
              'Typhoid and other routine or travel vaccines, when advised',
            ],
          },
          {
            heading: 'Who may benefit',
            items: [
              'People with chronic liver disease or cirrhosis',
              'People with chronic hepatitis',
              'Patients preparing for a liver transplant',
              'People on medicines that lower immunity, such as for inflammatory bowel disease',
              'Family members living with a person who has hepatitis B',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'Your vaccination history is reviewed, with blood tests to check immunity if needed',
              'We check for allergies, fever or other reasons to delay a dose',
              'You wait for a short time after the injection',
              'Soreness, redness or a mild fever for a day or two is common',
              'Some vaccines need more than one dose; seek care at once for facial swelling or difficulty breathing',
            ],
          },
        ],
      },
      {
        id: 'fibroscan',
        title: 'Fibroscan',
        summary:
          'FibroScan is a quick, painless scan that measures liver stiffness (scarring) and liver fat using a small probe on the skin. In many cases it avoids the need for a liver biopsy.',
        points: [],
        highlights: [
          'Painless, with no needles or cuts',
          'The result is available straight after the scan',
          'Measures both liver stiffness (scarring) and liver fat',
        ],
        facts: [
          { label: 'Duration', value: 'About 10 to 15 minutes' },
          { label: 'Preparation', value: 'Usually fasting for a few hours beforehand' },
          { label: 'Comfort', value: 'No anaesthesia needed' },
          { label: 'Recovery', value: 'None; resume normal activities' },
        ],
        image: `${DIMG}/fibroscan.jpg`,
        imageAlt: 'Illustration of a Fibroscan liver scan comparing a healthy liver with a cirrhotic liver',
        imageWidth: 1000,
        imageHeight: 733,
        groups: [
          {
            heading: 'Who may need it',
            items: [
              'Fatty liver disease',
              'Chronic hepatitis B or hepatitis C',
              'Alcohol-related liver disease',
              'Raised liver enzymes without a clear cause',
              'Follow-up of liver disease and response to treatment',
            ],
          },
          {
            heading: 'What it measures',
            items: [
              'Liver stiffness, a sign of fibrosis (scarring)',
              'The stage of scarring, from mild to cirrhosis',
              'Fat in the liver (steatosis), shown as a CAP score',
              'Changes over time or after treatment',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'You lie on your back with your right arm raised behind your head',
              'Gel is applied to the skin on the right side of the abdomen',
              'A probe is pressed gently on the skin; you feel light taps but no pain',
              'Several readings are taken and averaged',
              'Results can be less reliable in some situations, such as fluid in the abdomen; your doctor will advise if another test is better',
            ],
          },
        ],
      },
      {
        id: 'laboratory',
        title: 'Laboratory',
        summary:
          'Blood, stool and tissue tests help diagnose digestive and liver conditions, show how well treatment is working and pick up problems early.',
        points: [],
        highlights: [
          'Blood tests for liver function, blood counts and infection markers',
          'Stool tests for infection, blood and inflammation',
          'Biopsy samples taken during endoscopy can be examined to confirm a diagnosis',
        ],
        facts: [
          { label: 'Sample', value: 'Blood, stool or tissue (biopsy)' },
          { label: 'Preparation', value: 'Some tests need fasting; you are told in advance' },
          { label: 'Comfort', value: 'A small needle prick for blood tests' },
          { label: 'Results', value: 'Timing depends on the test' },
        ],
        image: `${DIMG}/laboratory.jpg`,
        imageAlt: 'Laboratory worker in blue gloves handling a flask and pipette',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Common tests',
            items: [
              'Liver function tests',
              'Complete blood count, to check for anaemia and infection',
              'Kidney function and electrolytes',
              'Hepatitis A, B, C and E tests',
              'Stool tests for infection, blood and inflammation',
              'Vitamin B12 and iron levels',
            ],
          },
          {
            heading: 'What they help find',
            items: [
              'Liver inflammation or damage',
              'Anaemia and signs of bleeding',
              'Viral hepatitis',
              'Infections and parasites in the gut',
              'Inflammation linked to bowel disease',
              'Nutritional deficiencies',
            ],
          },
          {
            heading: 'What to expect',
            items: [
              'Follow any fasting instructions you are given',
              'Samples are collected by trained staff',
              'Your doctor explains the report at your visit',
              'Bring earlier reports so that results can be compared over time',
            ],
          },
        ],
      },
      {
        id: 'pharmacy-services',
        title: 'Pharmacy Services',
        summary:
          'Medicines prescribed by your specialist are easy to get, and our staff explain how and when to take each one, which side effects to watch for and when to contact us.',
        points: [],
        highlights: [
          'Convenient access to medicines prescribed by your specialist',
          'Clear instructions on dose, timing and duration',
          'Guidance on side effects and on taking medicines together',
        ],
        facts: [
          { label: 'Prescription', value: 'Medicines prescribed by your doctor' },
          { label: 'Counselling', value: 'How and when to take each medicine' },
          { label: 'Please bring', value: 'Your prescription and a list of current medicines' },
          { label: 'Follow-up', value: 'Questions answered at your next visit' },
        ],
        image: `${DIMG}/pharmacy-services.jpg`,
        imageAlt: 'Doctor in green scrubs holding out two different tablets in open palms',
        imageWidth: 800,
        imageHeight: 1000,
        groups: [
          {
            heading: 'Common medicines',
            items: [
              'Acid-reducing medicines for reflux, gastritis and ulcers',
              'Medicines for diarrhoea, constipation and irritable bowel syndrome',
              'Liver medicines such as antivirals, diuretics and lactulose',
              'Medicines for inflammatory bowel disease',
              'Vitamins, iron and other supplements when needed',
            ],
          },
          {
            heading: 'How we help',
            items: [
              'Explaining the dose and timing of each medicine',
              'Checking that your medicines are suitable to take together',
              'Advising on common side effects',
              'Reminding you about follow-up visits',
            ],
          },
          {
            heading: 'Safe medicine tips',
            items: [
              'Take medicines exactly as prescribed and do not stop them without asking',
              'Ask before using painkillers such as NSAIDs, especially with stomach or liver problems',
              'Carry a list of your medicines to every visit',
              'Store medicines properly and check expiry dates',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'nutritional-counselling',
    title: 'Nutritional Counselling',
    tagline: 'Diet plans tailored to your gut and liver health.',
    intro:
      'Nutritional counselling is personal advice on food and eating habits for people with digestive and liver conditions. The right diet can ease symptoms, protect your liver and pancreas, help you recover from stomach illnesses and support your treatment. Your plan is built around your diagnosis, reports and daily routine.',
    introHeading: 'Nutritional Counselling at our Gut & Liver Clinic',
    introImage: `${NIMG}/nutritional-intro.jpg`,
    introImageAlt: 'Heart-shaped bowl of fresh fruit and vegetables beside a stethoscope',
    introChecklist: [
      'A review of your diagnosis, reports, weight and current diet',
      'A meal plan that suits your condition and food habits',
      'Practical advice on what to eat, what to limit and what to avoid',
      'Guidance on portion sizes, meal timing and fluids',
      'Follow-up to adjust the plan as you improve',
    ],
    sections: [
      {
        id: 'liver-pancreatic-diseases-diet',
        title: 'Liver And Pancreatic Diseases Diet',
        summary:
          'Liver and pancreatic diseases change how the body handles food and nutrients. The right diet gives enough energy and protein while easing the load on these organs, and it depends on your condition, so it is tailored to you.',
        points: [],
        highlights: [
          'Balanced meals with enough calories and protein',
          'Less alcohol, fried and processed food, and sugary drinks',
          'A plan that fits your condition, such as fatty liver, cirrhosis or pancreatitis',
        ],
        facts: [
          { label: 'Plan', value: 'Tailored to your diagnosis and reports' },
          { label: 'Meals', value: 'Small, regular meals through the day' },
          { label: 'Avoid', value: 'Alcohol, tobacco, fried and processed food' },
          { label: 'Review', value: 'Adjusted at your follow-up visits' },
        ],
        image: `${NIMG}/liver-pancreatic-diseases-diet.jpg`,
        imageAlt: 'Illustration of a liver surrounded by apple, lemon, onion, avocado, green tea and nuts',
        imageWidth: 900,
        imageHeight: 600,
        groups: [
          {
            heading: 'Who it helps',
            items: [
              'Fatty liver disease',
              'Liver cirrhosis',
              'Alcohol-related liver disease',
              'Acute and chronic pancreatitis',
              'Poor digestion due to a lack of pancreatic enzymes',
            ],
          },
          {
            heading: 'What the diet focuses on',
            items: [
              'Fruits, vegetables and whole grains',
              'Enough protein to protect your muscle, as advised by your doctor',
              'Less salt when there is fluid build-up in the abdomen',
              'Low-fat meals during and after pancreatitis',
              'A light late-evening snack for some people with cirrhosis, if advised',
            ],
          },
          {
            heading: 'Health tips and precautions',
            items: [
              'Avoid alcohol and tobacco',
              'Aim for a healthy weight and stay active as advised',
              'Check with your doctor before taking herbal or liver-tonic supplements',
              'Drink enough water unless your doctor has asked you to limit fluids',
            ],
          },
        ],
      },
      {
        id: 'common-gastro-illness-diet',
        title: 'Common Gastro Illness Diet',
        summary:
          'Illnesses such as diarrhoea, vomiting, gastritis and food poisoning upset the digestive system and can cause dehydration. The right fluids and foods help you recover and settle symptoms, and a balanced diet supports long-term gut health.',
        points: [],
        highlights: [
          'Fluids and oral rehydration first, then bland foods',
          'A gradual return to a normal, balanced diet',
          'Avoid spicy, oily and processed food until you recover',
        ],
        facts: [
          { label: 'First', value: 'Water, ORS, coconut water, clear soups' },
          { label: 'Then add', value: 'Rice, khichdi, banana, toast, curd' },
          { label: 'Avoid', value: 'Spicy, oily food, alcohol, caffeine' },
          { label: 'Seek help if', value: 'Blood in stool, high fever or signs of dehydration' },
        ],
        image: `${NIMG}/common-gastro-illness-diet.jpg`,
        imageAlt: 'Food pyramid showing whole grains, fruits and vegetables, olive oil, fish, dairy and sweets',
        imageWidth: 1200,
        imageHeight: 918,
        groups: [
          {
            heading: 'Common conditions',
            items: [
              'Diarrhoea and gastroenteritis',
              'Vomiting and food poisoning',
              'Gastritis and acid reflux',
              'Constipation',
              'Irritable bowel syndrome (IBS)',
            ],
          },
          {
            heading: 'Foods that usually help',
            items: [
              'Oral rehydration solution, water, coconut water and clear soups',
              'Plain rice, khichdi, toast, bananas and boiled potato',
              'Curd or yoghurt once the stomach settles',
              'Cooked vegetables and soft fruits',
              'Lean protein such as eggs, dal, chicken or fish as your appetite returns',
              'More fibre and fluids if you are constipated',
            ],
          },
          {
            heading: 'Precautions',
            items: [
              'Sip fluids often, in small amounts',
              'Avoid spicy, oily, fried and processed food, alcohol and caffeine until you recover',
              'Eat small, frequent meals and return to normal food gradually',
              'Wash your hands and use clean water and fresh food',
              'See a doctor if you have blood in stool or vomit, high fever, severe pain, signs of dehydration or symptoms lasting more than a few days',
            ],
          },
        ],
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);