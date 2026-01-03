// export interface SuccessStory {
//   id: string;
//   name: string;
//   role: string;
//   company: string;
//   story: string;
//   image: string;
//   previousRole?: string;
//   salary?: string;
// }

// export const successStories: SuccessStory[] = [
//   {
//     id: "1",
//     name: "Sarah Johnson",
//     role: "AML Analyst",
//     company: "HSBC",
//     story: "After completing the AML course, I landed my dream job within 6 weeks. The practical training made all the difference.",
//     image: "/placeholder.svg",
//     previousRole: "Retail Manager",
//     salary: "£35,000"
//   },
//   {
//     id: "2",
//     name: "Michael Chen",
//     role: "Crypto Compliance Officer",
//     company: "Coinbase",
//     story: "The crypto compliance course gave me the specialized knowledge needed to break into this exciting field.",
//     image: "/placeholder.svg",
//     previousRole: "Banking Associate",
//     salary: "£55,000"
//   },
//   {
//     id: "3",
//     name: "Emma Williams",
//     role: "Data Analyst",
//     company: "Amazon",
//     story: "The hands-on projects and career support helped me transition from hospitality to tech successfully.",
//     image: "/placeholder.svg",
//     previousRole: "Restaurant Manager",
//     salary: "£45,000"
//   }
// ];


export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  company?: string;
  story: string;
  previousRole?: string;
  salary?: string;
}

export const successStories: SuccessStory[] = [
  {
    id: "1",
    name: "Oyinlola Akinyemi",
    role: "KYC Operations",
    story: "Moved from a low paying call centre job into a KYC Operations role. She followed every Titans Careers checklist, practised writing clear CDD rationales, and used Lumi's onboarding simulations to learn how to handle PEPs and source of funds questions. She now works hybrid, earns more than she did in customer service, and says the best part is having a real career path with growth.",
    previousRole: "Call Centre Agent"
  },
  {
    id: "2",
    name: "Segun Faleye",
    role: "Reporting Analyst",
    story: "Was in customer support and felt stuck on repetitive tickets. After the data analysis training with Tobi, he built a small portfolio with Excel dashboards, SQL queries, and a Power BI report showing monthly trends. He started getting interviews within weeks and landed a Reporting Analyst role. He says the confidence to explain insights clearly is what changed everything.",
    previousRole: "Customer Support"
  },
  {
    id: "3",
    name: "Bola Adekunle",
    role: "CDD Analyst",
    story: "Used to do care shifts that left her exhausted and underpaid. She completed the AML KYC cohort, learned risk rating, EDD structure, and escalation writing, then used the interview prep to practise real scenario questions. She got a fully remote CDD Analyst role supporting a fintech onboarding team and says she finally enjoys work that feels professional and respected.",
    previousRole: "Care Worker"
  },
  {
    id: "4",
    name: "Amaka Umeh",
    role: "Junior Data Analyst",
    story: "Transitioned from teaching into a junior data role after building a simple but strong portfolio. She used the course project to analyse customer churn, wrote a clean story around the numbers, and learned how to validate data before presenting. She now works hybrid as a Junior Data Analyst and says she earns better and feels proud that her work influences decisions.",
    previousRole: "Teacher"
  },
  {
    id: "5",
    name: "Temitope Afolabi",
    role: "Junior Business Analyst",
    story: "Moved from front desk duties into a Junior Business Analyst role by learning requirements gathering, process mapping, and user story writing. She used Titans templates to create a sample BRD and a UAT plan, then practised stakeholder conversations during mock sessions. She now supports product change requests and says the work is structured, calm, and much more rewarding.",
    previousRole: "Front Desk"
  },
  {
    id: "6",
    name: "Teniola Shonubi",
    role: "Digital Marketing Executive",
    story: "Was a boutique assistant who wanted a skill that could travel with her. After the digital marketing course with Yinka, she learned campaign planning, content calendars, and how to report results with proper metrics. She built a portfolio from a small brand campaign and got hired as a Digital Marketing Executive. She now earns more and enjoys the flexibility.",
    previousRole: "Boutique Assistant"
  },
  {
    id: "7",
    name: "Olabisi George",
    role: "Privacy Operations Support",
    story: "Worked in HR admin and kept getting pulled into compliance tasks without a title to match. After data privacy training, she learned data mapping, lawful basis, retention, and DSAR handling. She applied those skills to tidy up internal processes at work, then secured a Privacy Operations support role. She says the move brought stability, better pay, and professional recognition.",
    previousRole: "HR Admin"
  },
  {
    id: "8",
    name: "Peter Udo",
    role: "Security Operations Trainee",
    story: "Moved from basic IT helpdesk into a security operations trainee path. He built hands on familiarity with common alerts, learned incident triage steps, and practised how to communicate clearly during escalations. He now supports SOC monitoring and says he finally sees a future in IT that pays well and keeps him learning.",
    previousRole: "IT Helpdesk"
  },
  {
    id: "9",
    name: "Chidera Nwosu",
    role: "Transaction Monitoring Analyst",
    story: "Worked as a bank teller and wanted out of branch pressure. She used the AML KYC programme to reframe her experience into customer risk awareness, controls, and red flags. Lumi's interview drills helped her speak confidently about transaction monitoring and escalation decisions. She moved into a Transaction Monitoring Analyst role with better pay and less stress.",
    previousRole: "Bank Teller"
  },
  {
    id: "10",
    name: "Ngozi Ekwueme",
    role: "People Analytics Support",
    story: "Was an HR admin who used to compile reports manually every month. After the data analysis course, she automated reports with Excel and Power Query, then created a simple Power BI dashboard that leadership loved. She was promoted into People Analytics support and says she now feels valued for impact, not just effort.",
    previousRole: "HR Admin"
  },
  {
    id: "11",
    name: "Ijeoma Okafor",
    role: "Financial Crime Associate",
    story: "A law graduate who struggled to get interviews because she lacked direct compliance experience. She used Titans Careers to learn how to write EDD summaries, apply risk factors, and reference guidance in a practical way. She landed a Financial Crime Associate role and says the structured approach made her sound like someone already doing the job.",
    previousRole: "Law Graduate"
  },
  {
    id: "12",
    name: "Ridwan Olanrewaju",
    role: "Data Operations",
    story: "Moved from warehouse work into a Data Operations role. He built a project cleaning messy data and documenting assumptions properly, then used that portfolio in applications. He now works partly remote and says the biggest difference is predictable hours and a clearer progression plan.",
    previousRole: "Warehouse Worker"
  },
  {
    id: "13",
    name: "Hassan Bello",
    role: "KYC Support Analyst",
    story: "Was an admin assistant doing short term contracts. He used the CV and LinkedIn optimisation support to position himself for KYC support roles, then practised answering common onboarding questions. He got hired as a KYC Support Analyst on a remediation project and now works with a global team remotely most days.",
    previousRole: "Admin Assistant"
  },
  {
    id: "14",
    name: "Aisha Abdullahi",
    role: "Content and Growth",
    story: "Finished NYSC and wanted to avoid drifting between internships. She used Yinka's digital marketing training to build a portfolio with campaign objectives, creative direction, and reporting. She secured a Content and Growth role and says she finally has a career track with measurable wins.",
    previousRole: "NYSC Graduate"
  },
  {
    id: "15",
    name: "Ibrahim Sani",
    role: "Data Coordinator",
    story: "Worked as a transport dispatcher and wanted a role that was less physically demanding. After learning Excel modelling and basic SQL, he started producing route performance reports and presenting weekly insights. He got a Data Coordinator role and is already being trained up for analyst responsibilities.",
    previousRole: "Transport Dispatcher"
  },
  {
    id: "16",
    name: "Chinonso Eze",
    role: "Junior Privacy and Compliance",
    story: "Was a legal intern but wanted to specialise. After data privacy training, he created a mini compliance portfolio including a simple privacy notice, a DSAR workflow, and an incident response outline. He landed a junior Privacy and Compliance role and says his legal background now feels like an advantage again.",
    previousRole: "Legal Intern"
  },
  {
    id: "17",
    name: "Samuel Adeniran",
    role: "Security Tooling Support",
    story: "Was a network cabling technician who wanted to move into a better paid track. He upskilled into security operations basics and endpoint security support and learned how to document incidents properly. He got a role supporting security tooling and says the work is more professional and the pay is better.",
    previousRole: "Network Cabling Technician"
  },
  {
    id: "18",
    name: "Kunle Adeyemi",
    role: "KYC Remediation",
    story: "Moved from logistics supervision into a KYC remediation project role. He learned how to review files, identify gaps, request evidence, and document decisions clearly. The course helped him understand what good looks like, so he could deliver quality and get noticed quickly.",
    previousRole: "Logistics Supervisor"
  },
  {
    id: "19",
    name: "Damilola Ajibade",
    role: "Marketing Data Support",
    story: "Was a social media manager who kept being asked to show results but lacked strong analytics. After the data analysis training, she learned how to track KPIs, build dashboards, and translate numbers into insights. She pivoted into marketing data support and now earns more because she can prove ROI.",
    previousRole: "Social Media Manager"
  },
  {
    id: "20",
    name: "Zainab Yusuf",
    role: "Process Improvement & BA",
    story: "Was already in operations but wanted to move closer to change and transformation. She applied business analysis methods to formalise processes, define requirements, and reduce rework. She was promoted into process improvement and BA responsibilities and says the visibility changed her confidence.",
    previousRole: "Operations"
  },
  {
    id: "21",
    name: "Rukayat Lawal",
    role: "Data Protection Admin",
    story: "Moved from customer support into a Data Protection Admin role. She learned DSAR handling, record keeping, and data minimisation, then used those examples to answer interviews with real scenarios. She now works hybrid and says she finally has a role that feels stable and respected.",
    previousRole: "Customer Support"
  },
  {
    id: "22",
    name: "Dare Alabi",
    role: "Crypto Compliance Support",
    story: "Had bank operations experience and wanted to join the digital assets space without sounding like a beginner. He learned crypto transaction red flags, wallet risk basics, and how AML controls translate into digital assets. He secured a crypto compliance support role and says the industry pace is faster but the career growth is real.",
    previousRole: "Bank Operations"
  },
  {
    id: "23",
    name: "Emeka Nnamdi",
    role: "Digital Marketing (Agency)",
    story: "Was a restaurant supervisor who wanted a flexible career. With Yinka's guidance, he built a practical portfolio showing campaign planning, A B testing ideas, and weekly reporting. He joined a small agency remotely and says his income is higher and his schedule is more predictable.",
    previousRole: "Restaurant Supervisor"
  },
  {
    id: "24",
    name: "Kemi Adebayo",
    role: "Finance Data Analyst",
    story: "Was an accounts assistant who wanted to move from routine work into analysis. She built a finance dashboard, learned reconciliation logic, and used Power BI to visualise performance. She moved into finance data analyst tasks and says her work now influences decisions.",
    previousRole: "Accounts Assistant"
  },
  {
    id: "25",
    name: "Halima Sani",
    role: "Junior Security Compliance",
    story: "Moved from admin work into security compliance support. She built a simple awareness toolkit, learned control basics, and practised audit style documentation. She got a junior Security Compliance role and says she is proud because her work protects the organisation.",
    previousRole: "Admin"
  },
  {
    id: "26",
    name: "Tolu Ogunleye",
    role: "Sanctions Screening",
    story: "Moved from back office operations into sanctions screening. He learned how to handle matching logic, false positives, and escalation notes with clarity. He says the job now feels like problem solving and he is earning better than his previous role.",
    previousRole: "Back Office Operations"
  },
  {
    id: "27",
    name: "Ifunanya Nwankwo",
    role: "Business Analyst",
    story: "Moved from claims processing into BA work by showcasing how she improved accuracy through better requirements and validation steps. Her portfolio included sample user stories and acceptance criteria. She now supports change requests and says she enjoys being part of solutions.",
    previousRole: "Claims Processing"
  },
  {
    id: "28",
    name: "Uche Maduka",
    role: "Data Assistant",
    story: "Worked in hospital records and wanted to enter a role with more growth. She learned data cleaning and analysis basics, then built a reporting sample around patient wait times. She landed a data assistant role and says the environment is calmer and the progression is clearer.",
    previousRole: "Hospital Records"
  },
  {
    id: "29",
    name: "Adaobi Iroha",
    role: "Digital Assets Operations",
    story: "Was an accountant who wanted a role with global exposure. She learned digital assets operations and compliance checks, then positioned her experience around controls and evidence. She now supports reconciliations and compliance reviews and says the pay and learning opportunities are better.",
    previousRole: "Accountant"
  },
  {
    id: "30",
    name: "Okechukwu Ibe",
    role: "Privacy & Security Support",
    story: "Moved from IT support into privacy and security support by combining governance knowledge with practical controls. He learned vendor risk basics, record keeping, and incident response. He now supports privacy and infosec tasks and says his work finally feels specialised.",
    previousRole: "IT Support"
  },
  {
    id: "31",
    name: "Sade Aluko",
    role: "Onboarding & KYC",
    story: "Switched from retail sales into onboarding and KYC. She learned customer risk assessment, evidence standards, and how to document decisions. She got hired by a payments company and says she now has a role with clear progression and better working conditions.",
    previousRole: "Retail Sales"
  },
  {
    id: "32",
    name: "Chuka Ezeani",
    role: "Application Security",
    story: "Moved from software testing into application security fundamentals. He learned secure SDLC basics and how to identify common weaknesses. He now supports secure delivery tasks and says he is more satisfied because the work is technical and valued.",
    previousRole: "Software Testing"
  },
  {
    id: "33",
    name: "Efe Omoruyi",
    role: "Graduate Data Analyst",
    story: "Used her data analysis capstone to show she could think like an analyst. She built a project on churn drivers, created a clean dashboard, and practised presenting insights clearly. She got a graduate data analyst role and says she no longer feels intimidated in interviews.",
    previousRole: "Graduate"
  },
  {
    id: "34",
    name: "Nneka Eze",
    role: "EDD Analyst",
    story: "Moved from microfinance documentation into EDD. She learned how to structure EDD summaries, assess source of wealth, and apply risk factors properly. She landed an EDD role and says the templates helped her deliver professional work from day one.",
    previousRole: "Microfinance Documentation"
  },
  {
    id: "35",
    name: "Bisola Adesanya",
    role: "Marketing Specialist (VA)",
    story: "Was a virtual assistant who wanted higher paying clients. She added email marketing, funnel basics, and reporting to her services, then used her portfolio to pitch outcomes. Her client rates increased significantly and she says she now feels like a specialist, not a general assistant.",
    previousRole: "Virtual Assistant"
  },
  {
    id: "36",
    name: "Mariam Okon",
    role: "GRC Support",
    story: "Moved from customer service into GRC support by learning policies, controls, and basic risk management. She now works remotely for a smaller firm and says the role is calmer and comes with a clearer progression ladder.",
    previousRole: "Customer Service"
  },
  {
    id: "37",
    name: "Ugochukwu Nwafor",
    role: "Crypto Investigations Support",
    story: "Already had AML experience but wanted to move into digital assets. He learned crypto typologies and how investigations differ, then used that to position himself for vendor roles. He got hired to support crypto investigations and says the cases are more interesting and the pay is higher.",
    previousRole: "AML Analyst"
  },
  {
    id: "38",
    name: "Bimpe Akinwale",
    role: "Privacy & KYC Specialist",
    story: "Combined data privacy knowledge with AML KYC skills. She now supports onboarding teams with privacy by design while meeting evidence and audit expectations. Her role expanded quickly because she understands both customer data handling and compliance checks.",
    previousRole: "Onboarding Support"
  },
  {
    id: "39",
    name: "Khadijah Musa",
    role: "Growth Analytics",
    story: "Combined digital marketing with data analysis and moved into growth analytics. She now supports campaign experiments, reporting, and optimisation. She says her work is now measurable and her value increased immediately.",
    previousRole: "Marketing"
  },
  {
    id: "40",
    name: "Doyin Adebayo",
    role: "Financial Crime MI Analyst",
    story: "Combined AML KYC with data analysis to become a Financial Crime MI analyst. She builds dashboards, tracks KPIs, and prepares reporting packs for leadership. She says she earns more and finally feels she is operating at a professional level.",
    previousRole: "KYC Analyst"
  },
  {
    id: "41",
    name: "Olamide Fashola",
    role: "Digital Assets Compliance",
    story: "Moved from legal assistant work into digital assets compliance support. He learned how to assess risk, document controls, and write clear policies. He now supports a product team and says the frameworks helped him stay grounded and credible.",
    previousRole: "Legal Assistant"
  },
  {
    id: "42",
    name: "Somiari Briggs",
    role: "Privacy Compliance",
    story: "Moved from finance admin into privacy compliance by focusing on documentation and vendor assessments. She learned how to review processing activities and identify risks. She now supports vendor reviews and says her work life balance improved.",
    previousRole: "Finance Admin"
  },
  {
    id: "43",
    name: "Kunmi Ojo",
    role: "Performance Marketing",
    story: "Moved from sales into performance marketing support. He learned how to manage lead funnels, track conversion rates, and report results properly. He now works with a growth team and says the job is more strategic and satisfying than pure sales pressure.",
    previousRole: "Sales"
  },
  {
    id: "44",
    name: "Efeoma Osakwe",
    role: "KYC Quality Control",
    story: "Was in a low paying reception job and used Titans Careers to pivot into KYC quality control. She learned how to spot gaps, request the right documents, and write clear review notes. She now earns more, works in a calmer environment, and says she finally feels respected at work.",
    previousRole: "Receptionist"
  },
  {
    id: "45",
    name: "Abdulrahman Sadiq",
    role: "Cybersecurity Compliance Support",
    story: "Moved from an entry level admin role into cybersecurity compliance support. He learned control testing basics and how to document evidence for audits. He now supports internal reviews and says his career finally has direction and better pay.",
    previousRole: "Entry Level Admin"
  },
  {
    id: "46",
    name: "Uduak Etim",
    role: "Junior Reporting",
    story: "Moved from a struggling small business into data analysis by learning Excel, SQL basics, and dashboard building. She used her own business numbers as a project and turned it into a portfolio. She got a junior reporting role and says the skills are useful everywhere.",
    previousRole: "Small Business Owner"
  },
  {
    id: "47",
    name: "Chinyere Nwankwo",
    role: "Onboarding & KYC",
    story: "Moved from frontline bank customer service into onboarding and KYC. She learned how to ask better questions, assess risk, and document decisions properly. She now works hybrid and says her stress level dropped while her salary improved.",
    previousRole: "Bank Customer Service"
  },
  {
    id: "48",
    name: "Bashir Lawal",
    role: "Transaction Monitoring Support",
    story: "Moved from dispatch and logistics into transaction monitoring support by learning red flags and alert handling. He practised writing concise rationales and learned escalation thresholds. He got a role on a monitoring team and says the work is more professional and offers growth.",
    previousRole: "Dispatch & Logistics"
  },
  {
    id: "49",
    name: "Yetunde Adebisi",
    role: "Product Support & BA",
    story: "Used the business analysis training to move from operations into product support and change. She learned how to capture requirements and manage UAT feedback properly. Her manager noticed the improvement and sponsored her move into a BA track internally.",
    previousRole: "Operations"
  },
  {
    id: "50",
    name: "Seyi Adegbite",
    role: "Digital Assets Compliance Analyst",
    story: "Combined AML KYC fundamentals with digital assets compliance knowledge and secured a Digital Assets Compliance Analyst role. He used Lumi's interview prep to answer scenario questions confidently and explain crypto risks clearly. He now works with an international team, earns more, and says the job satisfaction is higher because he is always learning.",
    previousRole: "AML KYC"
  }
];
