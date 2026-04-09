
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DATA STORE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const DB = {
  currentUser: {id:1,name:"Christian KWIZERA",role:"admin",initials:"CK"},
  projects: [
    {
      id:1,
      name:"KIIWP",
      full_name:"Kayonza Irrigation and Integrated Watershed Management Project",
      description:"A Rwandan initiative to reduce poverty and increase food security in the drought-prone Eastern Province by establishing sustainable irrigation and water management. It operates primarily in Kayonza District, targeting thousands of households through infrastructure development and agribusiness training.",
      status:"active",
      start_date:"2019-01-01",
      end_date:"2028-12-31",
      location:"Kayonza District, Eastern Province, Rwanda",
      budget:61000000,
      budget_currency:"USD",
      total_budget:61000000,
      donors:["IFAD", "Government of Rwanda", "Government of Spain", "Cordaid/ICCO"],
      partners:["IFAD", "Government of Rwanda", "Government of Spain", "Cordaid/ICCO"],
      lead_agency:"IFAD",
      executing_agency:"Government of Rwanda",
      funding_sources:["IFAD (lead)", "Government of Rwanda", "Government of Spain", "Cordaid/ICCO"],
      co_financiers:["IFAD", "Government of Rwanda", "Government of Spain", "Cordaid/ICCO"],
      operating_location:"Kayonza District, Eastern Province, Rwanda",
      duration:"Phase I (2019-2023), Phase II (2021-2028)",
      key_activities:["Constructing valley dams and installing irrigation systems for fruit orchards", "Land management: Protecting watersheds to reduce erosion"],
      key_indicators:["Increasing income and climate resilience for 40,000 rural households", "Improving market access", "Strengthening financial service access"],
      target_beneficiaries:40000,
      target_households:40000,
      target_individuals:180000,
      restoration_area:null,
      restoration_area_unit:"hectares"
    },
    {
      id:2,
      name:"PSAC",
      full_name:"Promoting Smallholder Agro-Export Competitiveness",
      description:"A six-year, $62.89 million Rwandan project aimed at increasing rural incomes by boosting the productivity, quality, and export capacity of smallholder farmers in the coffee, tea, and horticulture value chains.",
      status:"active",
      start_date:"2023-03-01",
      end_date:"2029-02-28",
      location:"14 districts in Rwanda (Western, Southern, Eastern, Northern Provinces)",
      budget:62890000,
      budget_currency:"USD",
      total_budget:62890000,
      donors:["International Fund for Agricultural Development (IFAD)", "Government of Spain", "Government of Rwanda"],
      partners:["Cordaid", "Heifer International", "Kilimo Trust"],
      lead_agency:"IFAD",
      executing_agency:"Government of Rwanda",
      funding_sources:["IFAD", "Government of Spain", "Government of Rwanda"],
      co_financiers:["IFAD", "Government of Spain", "Government of Rwanda"],
      operating_location:"14 districts: Western Province (Rutsiro, Nyamasheke, Nyabihu, Rusizi, Karongi), Southern Province (Nyaruguru, Nyamagabe, Huye, Nyanza, Ruhango), Eastern Province (Rwamagana, Bugesera), Northern Province (Musanze, Rulindo)",
      duration:"6 years (2023-2029)",
      key_activities:["Rejuvenating/rehabilitating 8,242 hectares (coffee, tea, horticulture)", "Providing matching grants", "Distributing seedlings (coffee, tea, avocado, mango, patchouli)", "Building climate-resilient capacity", "Establishing backward/forward market linkages"],
      key_indicators:["Target: 56,695 households (approx. 255,128 individuals)", "Achievements: ~12 million+ seedlings produced, 4,567 jobs created for women and youth"],
      target_beneficiaries:56695,
      target_households:56695,
      target_individuals:255128,
      restoration_area:8242,
      restoration_area_unit:"hectares"
    },
    {
      id:3,
      name:"PRISM",
      full_name:"Partnership for Resilient and Inclusive Small Livestock Markets",
      description:"A five-year Rwandan agricultural project designed to reduce poverty and enhance the resilience of poor rural households by transforming the small livestock sector (pigs, chickens, goats, and sheep). It focuses on enhancing food security and increasing incomes through market-oriented, inclusive, and sustainable livestock production.",
      status:"active",
      start_date:"2021-03-01",
      end_date:"2026-02-28",
      location:"15 districts across Northern, Southern, and Western provinces of Rwanda",
      budget:45640000,
      budget_currency:"USD",
      total_budget:45640000,
      donors:["International Fund for Agricultural Development (IFAD)", "Enabel", "Heifer International", "Government of Rwanda", "VSF Belgium"],
      partners:["Rwanda Agriculture and Animal Resources Development Board (RAB)", "Enabel", "Heifer International", "VSF Belgium", "Cordaid", "Government of Rwanda"],
      lead_agency:"Rwanda Agriculture and Animal Resources Development Board (RAB)",
      executing_agency:"SPIU of IFAD-funded projects",
      funding_sources:["IFAD ($14.9M–$15M)", "Enabel ($17.43M)", "Heifer International ($4.68M)", "VSF Belgium", "Government of Rwanda", "Cordaid"],
      co_financiers:["IFAD", "Enabel", "Heifer International", "Government of Rwanda", "VSF Belgium", "Cordaid"],
      operating_location:"15 districts: Northern (Gakenke, Musanze, Burera, Rulindo, Gicumbi), Southern (Ruhango, Huye, Gisagara, Nyaruguru, Nyamagabe), Western (Nyabihu, Rutsiro, Ngororero, Karongi, Nyamasheke)",
      duration:"5 years (March 2021 – September 2026)",
      key_activities:["Credit Enhancement Facility (CEF) - 76% invested", "Equity Fund - 18%", "Technical support, policy dialogue, and management"],
      key_indicators:["Focus on small livestock sector transformation", "Market-oriented and sustainable production", "Enhanced food security and income generation"],
      target_beneficiaries:null,
      target_households:null,
      target_individuals:null,
      restoration_area:null,
      restoration_area_unit:"hectares"
    },
    {
      id:4,
      name:"RDDP",
      full_name:"Rwanda Dairy Development Project",
      description:"An initiative designed to increase the competitiveness and profitability of Rwanda's dairy sector, focusing on improving the livelihoods of smallholder farmers through enhanced milk production, quality, and market access.",
      status:"active",
      start_date:"2024-01-01",
      end_date:"2030-12-31",
      location:"Nationwide, targeting 27 rural districts",
      budget:100370000,
      budget_currency:"USD",
      total_budget:100370000,
      donors:["International Fund for Agricultural Development (IFAD)", "OPEC Fund", "Green Climate Fund (GCF)", "Government of Rwanda", "Heifer International", "Equity Bank Rwanda"],
      partners:["Rwanda Agriculture and Animal Resources Development Board (RAB)", "Heifer International", "Cordaid", "Rwanda Cooperative Agency (RCA)", "Local financial institutions"],
      lead_agency:"International Fund for Agricultural Development (IFAD)",
      executing_agency:"Rwanda Agriculture and Animal Resources Development Board (RAB) / MINAGRI",
      funding_sources:["IFAD ($20.5m)", "OPEC Fund ($20m)", "GCF ($8.5m)", "Government of Rwanda ($17.64m)", "Heifer International ($6m)", "Equity Bank Rwanda ($10m)", "Beneficiaries ($9.52m)"],
      co_financiers:["IFAD", "OPEC Fund", "GCF", "Government of Rwanda", "Heifer International", "Equity Bank Rwanda"],
      operating_location:"Nationwide, targeting 27 rural districts (14 initial + 13 new districts). Key regions: East, North, West, South provinces",
      duration:"Phase II (2024–2029/30)",
      key_activities:["Improving dairy breeds and Artificial Insemination (AI) services", "Fodder cultivation", "Establishing/rehabilitating Milk Collection Centres (MCCs)", "Cold chain systems", "Capacity building on climate-smart dairy production", "Digitalizing MCCs"],
      key_indicators:["Target Households: 175,000 households (60% using climate-resilient practices)", "Income Goal: 30% increase in income for dairy households", "Employment: Creating ~29,000 jobs (45% women, 25% youth)"],
      target_beneficiaries:175000,
      target_households:175000,
      target_individuals:750000,
      restoration_area:null,
      restoration_area_unit:"hectares"
    },
    {
      id:5,
      name:"TREPA",
      full_name:"Transforming Eastern Province through Adaptation",
      description:"A 6-year initiative (2021–2027) aimed at restoring 60,000 hectares of drought-degraded landscapes and building community resilience to climate change in Rwanda's Eastern Province.",
      status:"active",
      start_date:"2021-12-23",
      end_date:"2027-12-23",
      location:"All seven districts of Eastern Province, Rwanda",
      budget:49600000,
      budget_currency:"USD",
      total_budget:49600000,
      donors:["Green Climate Fund (GCF)"],
      partners:["International Union for Conservation of Nature (IUCN)", "Rwanda Forestry Authority (RFA)", "Cordaid", "Enabel", "CIFOR-ICRAF", "World Vision"],
      lead_agency:"International Union for Conservation of Nature (IUCN)",
      executing_agency:"Rwanda Forestry Authority (RFA)",
      funding_sources:["Green Climate Fund (GCF) - $33.8 million", "Co-financing from partners - $15.8 million"],
      co_financiers:["Green Climate Fund (GCF)", "Partners"],
      operating_location:"Nyagatare, Gatsibo, Bugesera, Ngoma, Kirehe, Kayonza, Rwamagana",
      duration:"6 years (23 December 2021 – 23 December 2027)",
      key_activities:["Restoring 60,000 ha of degraded land (crop lands, silvo-pastoral lands, woodlots, public forests)", "Agroforestry & Fodder: Scaling up silvopastoral packages and agroforestry, including drought-tolerant fodder trees", "Financial Inclusion: Training savings groups, fostering financial literacy, facilitating access to loans from SACCOs", "Energy Efficiency: Distributing improved cooking stoves to over 100,000 households", "Value Chain Development: Promoting climate-resilient products (beekeeping, tree crops, fodder)"],
      key_indicators:["Restoration: 60,000 hectares of restored, drought-degraded land", "Beneficiaries: 75,000 smallholder farmers (over 120,000 households) made more resilient", "Community Groups: 136 Saving Group Ambassadors (SGAs) mentoring over 21,000 members", "Efficiency: 100,000+ households using clean/efficient cooking tech"],
      target_beneficiaries:75000,
      target_households:120000,
      target_individuals:480000,
      restoration_area:60000,
      restoration_area_unit:"hectares"
    },
    {
      id:6,
      name:"STARLIT",
      full_name:"Strengthening Agricultural Resilience through Learning and Innovation",
      description:"An IFAD-China South-South and Triangular Cooperation (SSTC) facility-funded project designed to strengthen the resilience of smallholder maize farmers against climate change and food insecurity.",
      status:"completed",
      start_date:"2021-12-01",
      end_date:"2023-06-30",
      location:"Kayonza District, Eastern Rwanda (and Kenya)",
      budget:483470,
      budget_currency:"USD",
      total_budget:483470,
      donors:["International Fund for Agricultural Development (IFAD)"],
      partners:["Cordaid", "Youth Engagement in Agricultural Network (Rwanda)", "Reseau Interdiocesan de Microfinance (RIM LTD)", "Viamo", "Local irrigation equipment suppliers"],
      lead_agency:"IFAD",
      executing_agency:"Cordaid",
      funding_sources:["IFAD-China SSTC Facility"],
      co_financiers:["IFAD"],
      operating_location:"Kayonza District, Eastern Rwanda (and Kenya)",
      duration:"18 months (December 2021 – June 2023)",
      key_activities:["Installing solar-powered irrigation systems", "Assisting in creating tailored financial products", "Introducing Agricultural Credit Assessment Tool (A-CAT)", "Providing phone-based agri-extension services", "Training youth as service providers for equipment maintenance"],
      key_indicators:["Targets: 2,800 smallholder farmers (45% women)", "Achievements: 1,176 farmers (48% women) accessed loans, 18 youths trained, adoption of solar irrigation"],
      target_beneficiaries:2800,
      target_households:2800,
      target_individuals:11200,
      restoration_area:null,
      restoration_area_unit:"hectares"
    }
  ],
  beneficiaries: [
    {id:"F001",name:"Jean Baptiste Habimana",sex:"M",age:42,cooperative:"Ubuzimu Coop",province:"Eastern",district:"Kayonza",sector:"Mukarange",project:"TREPA",phone:"+250 788 100 001",status:"active"},
    {id:"F002",name:"Marie Claire Uwase",sex:"F",age:35,cooperative:"Twubakane Coop",province:"Eastern",district:"Gatsibo",sector:"Kiziguro",project:"KIIWP",phone:"+250 788 100 002",status:"active"},
    {id:"F003",name:"Emmanuel Niyonzima",sex:"M",age:50,cooperative:"Ubuzimu Coop",province:"Eastern",district:"Kayonza",sector:"Mukarange",project:"TREPA",phone:"+250 788 100 003",status:"active"},
    {id:"F004",name:"Claudine Mukamurenzi",sex:"F",age:28,cooperative:"Tuzamurane Coop",province:"Eastern",district:"Ngoma",sector:"Mutendeli",project:"KIIWP",phone:"+250 788 100 004",status:"inactive"},
    {id:"F005",name:"Innocent Hakizimana",sex:"M",age:61,cooperative:"Ubuzimu Coop",province:"Eastern",district:"Kayonza",sector:"Mukarange",project:"TREPA",phone:"+250 788 100 005",status:"active"},
    {id:"F006",name:"Solange Nyiraneza",sex:"F",age:33,cooperative:"Tuzamurane Coop",province:"Kigali",district:"Gasabo",sector:"Kacyiru",project:"PSAC",phone:"+250 788 100 006",status:"active"},
    {id:"F007",name:"Beatrice Ineza",sex:"F",age:44,cooperative:"Twubakane Coop",province:"Eastern",district:"Gatsibo",sector:"Kiziguro",project:"KIIWP",phone:"+250 788 100 007",status:"active"},
    {id:"F008",name:"Pascal Uwimana",sex:"M",age:29,cooperative:"Ubuzimu Coop",province:"Eastern",district:"Kayonza",sector:"Mukarange",project:"TREPA",phone:"+250 788 100 008",status:"active"}
  ],
  indicators: [
    {id:1,project:"TREPA",code:"TREPA-O1.1",name:"# farmers trained on improved agri practices",disagg:"Sex, Age",baseline:0,target:5000,current:3840,unit:"farmers",source:"Training registers",frequency:"Quarterly",responsible:"M&E Officer"},
    {id:2,project:"TREPA",code:"TREPA-O1.2",name:"% increase in household income",disagg:"Sex",baseline:0,target:30,current:18,unit:"%",source:"HH Survey",frequency:"Annual",responsible:"M&E Officer"},
    {id:3,project:"TREPA",code:"TREPA-O2.1",name:"# cooperatives with improved governance",disagg:"Province",baseline:2,target:25,current:17,unit:"coops",source:"Audit reports",frequency:"Annual",responsible:"M&E Officer"},
    {id:4,project:"KIIWP",code:"KIIWP-O1.1",name:"# hectares under irrigation",disagg:"None",baseline:450,target:1200,current:870,unit:"ha",source:"Field measurement",frequency:"Bi-annual",responsible:"Field Officer"},
    {id:5,project:"KIIWP",code:"KIIWP-O2.1",name:"# HH with improved water access",disagg:"Sex, Vulnerability",baseline:1200,target:4000,current:2560,unit:"HH",source:"Community survey",frequency:"Annual",responsible:"M&E Officer"},
    {id:6,project:"PSAC",code:"PSAC-O1.1",name:"# SMEs supported with finance/tech",disagg:"Sex, Age",baseline:0,target:200,current:67,unit:"SMEs",source:"SME registry",frequency:"Quarterly",responsible:"Field Officer"}
  ],
  learningLog: [
    {id:1,title:"Community mobilization boosts farmer training attendance",project:"TREPA",date:"2024-03-15",type:"best_practice",narrative:"When community leaders are engaged before training sessions, attendance rates increase by 40%. Peer-to-peer invitation outperforms radio and printed notice.",tags:["training","community"],indicator:"TREPA-O1.1"},
    {id:2,title:"Irrigation committee governance gaps causing inequitable water distribution",project:"KIIWP",date:"2024-05-10",type:"challenge",narrative:"Water allocation disputes have risen in 3 sectors due to unclear committee bylaws. Recommend dispute resolution training and formalized bylaws before next season.",tags:["irrigation","governance"],indicator:"KIIWP-O1.1"},
    {id:3,title:"Using mobile data collection reduces entry errors by 60%",project:"PSAC",date:"2024-07-02",type:"lesson_learned",narrative:"Switching from paper-based forms to KoBoToolbox forms with built-in validation reduced data entry errors significantly in Q2 2024.",tags:["data","digital"],indicator:null},
    {id:4,title:"Diversifying crops reduces household vulnerability to climate shocks",project:"TREPA",date:"2024-08-20",type:"recommendation",narrative:"Households with 3+ crop varieties showed 35% less income loss during the 2024 dry spell. Recommend integrating crop diversification into future training packages.",tags:["climate","resilience"],indicator:"TREPA-O1.2"}
  ],
  fieldActivities: [
    {id:1,project:"TREPA",location:"Kayonza, Mukarange",type:"Training",plannedDate:"2024-09-05",actualDate:"2024-09-07",team:["Alice Uwimana","Paul Ndayisaba"],outputs:"140 farmers trained on soil health",findings:"High interest; need follow-up materials in Kinyarwanda",status:"completed"},
    {id:2,project:"KIIWP",location:"Ngoma, Mutendeli",type:"Monitoring Visit",plannedDate:"2024-09-15",actualDate:"2024-09-15",team:["Jean Claude Mugisha"],outputs:"Canal 4B inspection completed",findings:"Siltation observed in 200m section; maintenance needed by Oct",status:"completed"},
    {id:3,project:"PSAC",location:"Kigali, Gasabo",type:"Focus Group Discussion",plannedDate:"2024-10-01",actualDate:"",team:["Solange Nyiraneza","Alice Uwimana"],outputs:"Planned: 20 SME owner feedback session",findings:"",status:"planned"},
    {id:4,project:"TREPA",location:"Gatsibo, Kiziguro",type:"Farmer Field School",plannedDate:"2024-10-12",actualDate:"",team:["Paul Ndayisaba"],outputs:"Planned: Season B field school launch",findings:"",status:"planned"}
  ],
  trainingActivities: [],
  beneficiaryActivitySummary: [],
  field_activities: [],
  tasks: [
    {id:1,title:"Submit TREPA Q3 donor report to USAID",project:"TREPA",assignee:"Alice Uwimana",dueDate:"2024-10-15",priority:"high",status:"pending",linked:"Donor Report"},
    {id:2,title:"Upload KIIWP beneficiary list from field visit",project:"KIIWP",assignee:"Jean Claude Mugisha",dueDate:"2024-10-05",priority:"medium",status:"completed",linked:"Beneficiary Data"},
    {id:3,title:"Review and validate Season A indicator results",project:"TREPA",assignee:"Alice Uwimana",dueDate:"2024-10-20",priority:"high",status:"pending",linked:"Indicators"},
    {id:4,title:"Schedule PSAC focus group discussions",project:"PSAC",assignee:"Solange Nyiraneza",dueDate:"2024-09-30",priority:"medium",status:"overdue",linked:"Field Activities"},
    {id:5,title:"Map KoBo PSAC form fields to indicator library",project:"PSAC",assignee:"Alice Uwimana",dueDate:"2024-10-25",priority:"low",status:"pending",linked:"KoBo Integration"}
  ],
  donorReports: [
    {id:1,project:"TREPA",donor:"USAID",period:"Q2 2024",version:"v1.2",status:"draft",lastEdited:"2024-09-18",content:{"Executive Summary":"","Progress by Result":"","Indicator Table":"auto","Financial Summary":""}},
    {id:2,project:"KIIWP",donor:"World Bank",period:"H1 2024",version:"v2.0",status:"submitted",lastEdited:"2024-08-30",content:{"Project Overview":"","Output Table":"auto","Case Studies":"","Risk Log":""}},
    {id:3,project:"PSAC",donor:"EU",period:"Annual 2024",version:"v0.5",status:"draft",lastEdited:"2024-09-20",content:{"Narrative Report":"","Results Framework":"auto","Financial Report":""}}
  ],
  users: [
    {id:1,name:"Christian KWIZERA",email:"christian.kwizira@izi.rw",role:"admin",projects:"All",lastLogin:"Today",status:"active"},
    {id:2,name:"Jean Claude Mugisha",email:"jc.mugisha@izi.rw",role:"m_e_officer",projects:"KIIWP, TREPA",lastLogin:"Yesterday",status:"active"},
    {id:3,name:"Paul Ndayisaba",email:"p.ndayisaba@izi.rw",role:"data_clerk",projects:"TREPA",lastLogin:"2024-09-18",status:"active"},
    {id:4,name:"Solange Nyiraneza",email:"s.nyiraneza@izi.rw",role:"m_e_officer",projects:"PSAC",lastLogin:"Today",status:"active"},
    {id:5,name:"Eric Nshimiyimana",email:"e.nshimi@izi.rw",role:"viewer",projects:"PSAC, PRISM",lastLogin:"2024-09-10",status:"inactive"}
  ],
  koboForms: [
    {id:"k1",uid:"TREPA123uid",name:"TREPA Farmer Registration Form",project:"TREPA",type:"Beneficiary / Farmer Registration",submissions:3840,lastSync:"2024-09-22 08:30",status:"connected",mappedFields:12},
    {id:"k2",uid:"KIIWP456uid",name:"KIIWP Monitoring Visit Log",project:"KIIWP",type:"Field Activity Log",submissions:145,lastSync:"2024-09-21 14:15",status:"connected",mappedFields:8},
    {id:"k3",uid:"PSAC789uid",name:"PSAC SME Baseline Survey",project:"PSAC",type:"Indicator Data",submissions:67,lastSync:"2024-09-20 09:00",status:"connected",mappedFields:9},
    {id:"k4",uid:"TREPA-FS-uid",name:"TREPA Farmer Field School Attendance",project:"TREPA",type:"Field Activity Log",submissions:2200,lastSync:"2024-09-19 16:45",status:"paused",mappedFields:6}
  ],
  auditLog: [
    {id:1,user:"Alice Uwimana",action:"Updated indicator TREPA-O1.1 result value to 3840",time:"Today 09:14",type:"update"},
    {id:2,user:"Jean Claude Mugisha",action:"Added field activity: KIIWP Monitoring Visit â€” Ngoma",time:"Yesterday 16:32",type:"create"},
    {id:3,user:"Paul Ndayisaba",action:"Imported 142 beneficiary records via CSV (TREPA)",time:"2024-09-20 11:05",type:"import"},
    {id:4,user:"Alice Uwimana",action:"Deleted beneficiary F023 (Emmanuel Nkusi)",time:"2024-09-19 14:20",type:"delete"},
    {id:5,user:"Solange Nyiraneza",action:"Created learning log entry: Mobile data collection reduces errors",time:"2024-09-18 10:00",type:"create"}
  ],
  farmers: [],
  automationRules: [
    {id:1,  enabled:true,  name:'Alert: Beneficiary count milestone',       trigger:'import_beneficiaries', condition:'count_gte',  conditionValue:100, project:'All', action:'create_alert',                  actionParams:{title:'Beneficiary import milestone — {count} records committed for {project}',         priority:'medium', linked:'Beneficiary Data'}},
    {id:2,  enabled:true,  name:'Learning log: large import milestone',      trigger:'import_beneficiaries', condition:'count_gte',  conditionValue:500, project:'All', action:'create_learning_entry',         actionParams:{type:'lesson_learned', titleTemplate:'Data milestone: {count} beneficiaries imported into {project}',                    narrativeTemplate:'A batch import of {count} beneficiary records was committed to {project} on {date}. Cross-check against field registration sheets.', tags:['data','import']}},
    {id:3,  enabled:true,  name:'Alert: KoBo sync completed',                trigger:'kobo_sync',            condition:'always',     conditionValue:0,   project:'All', action:'create_alert',                  actionParams:{title:'KoBo sync: {form} — {count} new record(s) for {project}',                       priority:'low',    linked:'KoBo Integration'}},
    {id:4,  enabled:true,  name:'Alert: Large KoBo sync — review quality',   trigger:'kobo_sync',            condition:'count_gte',  conditionValue:50,  project:'All', action:'create_alert',                  actionParams:{title:'Large KoBo sync — {count} records from "{form}" ({project}): verify data quality', priority:'high',   linked:'KoBo Integration'}},
    {id:5,  enabled:true,  name:'Donor report: record Indicator Data sync',  trigger:'kobo_sync',            condition:'type_match', conditionValue:'Indicator Data',       project:'All', action:'update_donor_report_narrative', actionParams:{section:'Progress by Result', narrativeTemplate:'Indicator data refreshed from KoBo form "{form}" on {date}. {count} submission(s) processed for {project}.'}},
    {id:6,  enabled:false, name:'Learning log: KoBo field activity synced',  trigger:'kobo_sync',            condition:'type_match', conditionValue:'Field Activity Log',   project:'All', action:'create_learning_entry',         actionParams:{type:'lesson_learned', titleTemplate:'KoBo field data synced: {form} — {project}',                            narrativeTemplate:'KoBo form "{form}" synced on {date}, bringing in {count} field activity record(s) for {project}.', tags:['kobo','field-data']}}
  ],
};

// ══════════════════════════════════════════════════════════════════
// AUTOMATION ENGINE
// Fires after import commits or KoBo syncs; evaluates configured rules;
// executes: create_alert, create_learning_entry, update_donor_report_narrative
// ══════════════════════════════════════════════════════════════════
const AutomationEngine = {
  _recentAlertCache: {},
  _dedupWindowMs: 5 * 60 * 1000,

  // Interpolate {variable} placeholders in a template string
  _interpolate(template, vars) {
    return String(template || '').replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? vars[k] : `{${k}}`);
  },

  _buildVars(ctx) {
    return {
      count: ctx.count,
      project: ctx.project || 'All projects',
      date: new Date().toISOString().slice(0, 10),
      form: ctx.formName || '',
      type: ctx.formType || '',
    };
  },

  _alertCacheKey(title, project) {
    return `${String(project || 'All').toLowerCase()}::${String(title || '').toLowerCase()}`;
  },

  _isAlertThrottled(title, project) {
    const key = this._alertCacheKey(title, project);
    const now = Date.now();
    const last = this._recentAlertCache[key] || 0;
    if (now - last < this._dedupWindowMs) return true;

    const recentTask = (DB.tasks || []).find((t) => {
      if (!t || t.title !== title || (t.project || 'All') !== (project || 'All')) return false;
      if (!t.autoGenerated) return false;
      if (!t.createdAt) return false;
      const age = now - new Date(t.createdAt).getTime();
      return Number.isFinite(age) && age >= 0 && age < this._dedupWindowMs;
    });

    return !!recentTask;
  },

  // Test whether a rule's condition passes for the current event context
  _conditionPasses(rule, ctx) {
    switch (rule.condition) {
      case 'always':      return true;
      case 'count_gte':   return ctx.count >= Number(rule.conditionValue || 0);
      case 'count_lte':   return ctx.count <= Number(rule.conditionValue || 0);
      case 'type_match':  return String(ctx.formType || '').toLowerCase() === String(rule.conditionValue || '').toLowerCase();
      default:            return false;
    }
  },

  // Test whether a rule's project filter matches the event project
  _projectPasses(rule, ctx) {
    if (!rule.project || rule.project === 'All') return true;
    return normalizeProjectKey(rule.project) === normalizeProjectKey(ctx.project || '');
  },

  // Execute a single rule action
  _runAction(rule, ctx) {
    const vars = this._buildVars(ctx);
    const p = rule.actionParams || {};

    switch (rule.action) {
      case 'create_alert': {
        const title = this._interpolate(p.title, vars);
        const project = ctx.project || 'All';
        if (this._isAlertThrottled(title, project)) {
          return { performed: false, skipped: true, reason: 'throttled', message: `Skipped duplicate alert: ${title}` };
        }
        const task = {
          id: newId(),
          title,
          project,
          assignee: DB.currentUser?.name || 'System',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          priority: p.priority || 'medium',
          status: 'pending',
          linked: p.linked || 'KoBo Integration',
          autoGenerated: true,
          createdAt: new Date().toISOString(),
        };
        DB.tasks.unshift(task);
        this._recentAlertCache[this._alertCacheKey(title, project)] = Date.now();
        return { performed: true, action: 'create_alert', message: `Created alert: ${title}` };
      }
      case 'create_learning_entry': {
        const title = this._interpolate(p.titleTemplate, vars);
        const existing = DB.learningLog.find(l => l.title === title && l.date === vars.date);
        if (existing) return { performed: false, skipped: true, reason: 'duplicate_learning_entry', message: `Skipped duplicate learning entry: ${title}` };
        const entry = {
          id: newId(),
          title,
          project: ctx.project || 'All',
          date: vars.date,
          type: p.type || 'lesson_learned',
          narrative: this._interpolate(p.narrativeTemplate, vars),
          tags: p.tags || ['automation'],
          indicator: '',
          autoGenerated: true,
        };
        DB.learningLog.unshift(entry);
        return { performed: true, action: 'create_learning_entry', message: `Created learning entry: ${title}` };
      }
      case 'update_donor_report_narrative': {
        const text = this._interpolate(p.narrativeTemplate, vars);
        const section = p.section || 'Progress by Result';
        let updates = 0;
        const reports = DB.donorReports.filter(r => {
          if (!ctx.project) return true;
          return normalizeProjectKey(r.project) === normalizeProjectKey(ctx.project);
        });
        reports.forEach(r => {
          if (r.content && r.content[section] !== undefined && r.content[section] !== 'auto') {
            const prev = r.content[section] ? r.content[section] + '\n\n' : '';
            r.content[section] = prev + `[Auto-updated ${vars.date}] ${text}`;
            r.lastEdited = vars.date;
            updates += 1;
          }
        });
        return { performed: updates > 0, action: 'update_donor_report_narrative', message: `Updated donor report narrative in ${updates} report(s)` };
      }
      default:
        return { performed: false, skipped: true, reason: 'unknown_action', message: `Unknown action: ${rule.action}` };
    }
  },

  preview(rule, ctx) {
    const passesTrigger = rule && rule.trigger === ctx.trigger;
    const passesCondition = !!rule && this._conditionPasses(rule, ctx);
    const passesProject = !!rule && this._projectPasses(rule, ctx);
    const wouldRun = !!rule && passesTrigger && passesCondition && passesProject;
    if (!rule) {
      return { wouldRun: false, passesTrigger: false, passesCondition: false, passesProject: false, actionPreview: 'No rule provided.' };
    }

    const vars = this._buildVars(ctx);
    const p = rule.actionParams || {};
    let actionPreview = 'No action preview available.';
    if (rule.action === 'create_alert') {
      const title = this._interpolate(p.title, vars);
      const throttled = this._isAlertThrottled(title, ctx.project || 'All');
      actionPreview = throttled
        ? `Would be throttled (duplicate within ${Math.round(this._dedupWindowMs / 60000)} min): ${title}`
        : `Would create alert: ${title}`;
    } else if (rule.action === 'create_learning_entry') {
      actionPreview = `Would create learning entry: ${this._interpolate(p.titleTemplate, vars)}`;
    } else if (rule.action === 'update_donor_report_narrative') {
      actionPreview = `Would append to donor reports (${p.section || 'Progress by Result'}): ${this._interpolate(p.narrativeTemplate, vars)}`;
    }

    return {
      wouldRun,
      passesTrigger,
      passesCondition,
      passesProject,
      actionPreview,
    };
  },

  // Public entry-point: call this with an event context object after data changes
  // ctx shape: { trigger, project, count, formName, formType }
  run(ctx) {
    const rules = (DB.automationRules || []).filter(r =>
      r.enabled &&
      r.trigger === ctx.trigger &&
      this._conditionPasses(r, ctx) &&
      this._projectPasses(r, ctx)
    );
    if (!rules.length) return;
    rules.forEach(r => {
      try {
        const outcome = this._runAction(r, ctx);
        if (outcome && outcome.performed) {
          addAudit(`Automation "${r.name}" fired (${ctx.trigger}, ${ctx.count} records, ${ctx.project || 'All'})`, 'create');
        }
      } catch (err) {
        console.warn('[AutomationEngine] Rule failed:', r.name, err);
      }
    });
    // Refresh UI badge counts so alerts appear immediately
    if (typeof App !== 'undefined' && App.updateTaskBadge) App.updateTaskBadge();
  },
};

// Backend API helpers
const configuredApiBase = String(window.IZI_CONFIG?.API_BASE || '').trim().replace(/\/$/, '');
const isFileProtocol = window.location?.protocol === 'file:';
const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location?.hostname || '');
const defaultApiBase = isFileProtocol || isLocalHost
  ? 'http://localhost:5000/api'
  : `${window.location.origin}/api`;
const API_BASE = configuredApiBase || defaultApiBase;

let importPreviewState = {
  type: 'beneficiaries',
  fileName: '',
  projectContext: '',
  interventionType: '',
  interventionName: '',
  interventionDate: '',
  duplicatePolicy: 'update_same_project',
  rawRows: 0,
  validRows: 0,
  invalidRows: 0,
  records: [],
  rows: [],
  sample: [],
  headers: [],
  warnings: []
};

let trainingImportState = {
  activityMode: 'select',
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? {
    'Content-Type': 'application/json',
    'x-auth-token': token,
    'Authorization': `Bearer ${token}`
  } : { 'Content-Type': 'application/json' };
};

async function fetchBackend(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { ...getAuthHeaders(), ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 401) {
      localStorage.removeItem('token');
      if (typeof App !== 'undefined' && App.showLogin) {
        App.showLogin();
      }
    }
    throw new Error(`Backend ${path} error ${response.status}: ${errorText}`);
  }

  return response.json();
}

async function fetchBackendFormData(path, formData, options = {}) {
  const token = localStorage.getItem('token');
  const headers = token ? {
    'x-auth-token': token,
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  } : { ...(options.headers || {}) };

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'POST',
    body: formData,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 401) {
      localStorage.removeItem('token');
      if (typeof App !== 'undefined' && App.showLogin) {
        App.showLogin();
      }
    }
    throw new Error(`Backend ${path} error ${response.status}: ${errorText}`);
  }

  return response.json();
}

function normalizeProject(project) {
  // Preserve all original fields from backend, then normalize/overlay specific ones
  const donors = Array.isArray(project.donors) ? project.donors : (project.donors ? tryParseJSON(project.donors, []) : []);
  const partners = Array.isArray(project.partners) ? project.partners : (project.partners ? tryParseJSON(project.partners, []) : []);
  const key_activities = Array.isArray(project.key_activities) ? project.key_activities : (project.key_activities ? tryParseJSON(project.key_activities, []) : []);
  const key_indicators = Array.isArray(project.key_indicators) ? project.key_indicators : (project.key_indicators ? tryParseJSON(project.key_indicators, []) : []);
  const funding_sources = Array.isArray(project.funding_sources) ? project.funding_sources : (project.funding_sources ? tryParseJSON(project.funding_sources, []) : []);
  const co_financiers = Array.isArray(project.co_financiers) ? project.co_financiers : (project.co_financiers ? tryParseJSON(project.co_financiers, []) : []);
  return {
    ...project,
    id: project.id,
    name: project.name || `Project ${project.id}`,
    full_name: project.full_name || project.fullName || '',
    description: project.description || '',
    location: project.location || '',
    status: project.status || 'active',
    start_date: project.start_date || project.startDate || '',
    end_date: project.end_date || project.endDate || '',
    duration: project.duration || '',
    budget: Number(project.budget || project.total_budget || 0),
    total_budget: Number(project.total_budget || project.budget || 0),
    budget_currency: project.budget_currency || 'USD',
    target_beneficiaries: project.target_beneficiaries ? Number(project.target_beneficiaries) : null,
    target_households: project.target_households ? Number(project.target_households) : null,
    target_individuals: project.target_individuals ? Number(project.target_individuals) : null,
    restoration_area: project.restoration_area ? Number(project.restoration_area) : null,
    restoration_area_unit: project.restoration_area_unit || 'hectares',
    donors,
    partners,
    key_activities,
    key_indicators,
    funding_sources,
    co_financiers,
    lead_agency: project.lead_agency || '',
    executing_agency: project.executing_agency || '',
    operating_location: project.operating_location || '',
    spent: project.spent || 0,
    activities: project.total_tasks || project.activities || 0,
    created_at: project.created_at || new Date().toISOString(),
  };
}
function tryParseJSON(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

function normalizeFarmer(farmer) {
  const explicitProject = String(farmer.project || '').trim();
  const inferredProject = explicitProject ? '' : inferFarmerProject(farmer);
  const resolvedProject = explicitProject || inferredProject;
  return {
    id: farmer.id,
    identifier: farmer.identifier || '',
    name: farmer.name || 'Unknown',
    cooperative: farmer.cooperative || '',
    province: farmer.province || '',
    district: farmer.district || '',
    sector: farmer.sector || '',
    project: resolvedProject,
    projectRaw: explicitProject,
    projectInferred: inferredProject,
    phone: farmer.phone || '',
    status: farmer.status || 'active',
    sex: farmer.sex || 'M',
    age: farmer.age || '',
    location: farmer.location || '',
    intervention_type: farmer.intervention_type || '',
    intervention_name: farmer.intervention_name || '',
    intervention_date: farmer.intervention_date || '',
    accessed_loan: farmer.accessed_loan === true || farmer.accessed_loan === 1 || farmer.accessed_loan === '1',
    accessed_market: farmer.accessed_market === true || farmer.accessed_market === 1 || farmer.accessed_market === '1',
    record_source: farmer.record_source || '',
  };
}

function findProjectNameByAliases(aliases) {
  const list = Array.isArray(DB.projects) ? DB.projects : [];
  const keys = (aliases || []).map(normalizeProjectKey).filter(Boolean);
  for (const project of list) {
    const projectTokens = [project?.name, project?.full_name, project?.fullName]
      .map(normalizeProjectKey)
      .filter(Boolean);
    if (keys.some((key) => projectTokens.some((token) => token === key || token.includes(key) || key.includes(token)))) {
      return project.name || String(aliases[0] || '').toUpperCase();
    }
  }
  return String(aliases[0] || '').toUpperCase();
}

function inferFarmerProject(farmer) {
  const text = [
    farmer?.project,
    farmer?.province,
    farmer?.district,
    farmer?.sector,
    farmer?.location,
    farmer?.cooperative,
  ].join(' ').toLowerCase();

  if (!text.trim()) return '';

  const psacDistricts = [
    'rutsiro', 'nyamasheke', 'nyabihu', 'rusizi', 'karongi',
    'nyaruguru', 'nyamagabe', 'huye', 'nyanza', 'ruhango',
    'rwamagana', 'bugesera', 'musanze', 'rulindo'
  ];
  const kiiwpDistricts = ['kayonza'];

  const hasPsacSignal = psacDistricts.some((district) => text.includes(district));
  const hasKiiwpSignal = kiiwpDistricts.some((district) => text.includes(district));

  if (hasPsacSignal && !hasKiiwpSignal) {
    return findProjectNameByAliases(['PSAC']);
  }
  if (hasKiiwpSignal && !hasPsacSignal) {
    return findProjectNameByAliases(['KIIWP']);
  }

  return '';
}

function normalizeIndicator(indicator) {
  return {
    id: indicator.id,
    project: indicator.project || indicator.project_name || '',
    code: indicator.code || '',
    name: indicator.name || '',
    baseline: indicator.baseline !== undefined && indicator.baseline !== null ? Number(indicator.baseline) : 0,
    target: indicator.target_value !== undefined && indicator.target_value !== null ? Number(indicator.target_value) : Number(indicator.target || 0),
    current: indicator.actual_value !== undefined && indicator.actual_value !== null ? Number(indicator.actual_value) : Number(indicator.current || 0),
    unit: indicator.unit || '',
    source: indicator.source || '',
    frequency: indicator.frequency || '',
    responsible: indicator.responsible || '',
    disagg: indicator.disagg || '',
  };
}

function normalizeFieldActivity(activity) {
  const rawTeam = activity.team;
  let team = [];
  if (Array.isArray(rawTeam)) {
    team = rawTeam.filter(Boolean).map(v => String(v).trim()).filter(Boolean);
  } else if (typeof rawTeam === 'string') {
    team = rawTeam.split(/[,;]+/).map(v => v.trim()).filter(Boolean);
  }

  return {
    id: activity.id,
    project: activity.project || activity.project_name || '',
    type: activity.type || activity.activity_type || '',
    location: activity.location || '',
    plannedDate: activity.plannedDate || activity.planned_date || '',
    actualDate: activity.actualDate || activity.actual_date || '',
    team,
    outputs: activity.outputs || '',
    findings: activity.findings || '',
    status: activity.status || 'planned',
  };
}

function normalizeProjectKey(value) {
  return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ');
}

function projectMatches(projectValue, project) {
  const value = normalizeProjectKey(projectValue);
  if (!value) return false;

  const tokens = [
    project?.name,
    project?.full_name,
    project?.fullName,
  ].map(normalizeProjectKey).filter(Boolean);

  return tokens.some(token => token === value || token.includes(value) || value.includes(token));
}

function getProjectLeadAgency(projectName) {
  const project = (DB.projects || []).find((p) => projectMatches(projectName, p));
  if (!project) return '';
  const leadAgency = String(project.lead_agency || '').trim();
  if (leadAgency) return leadAgency;
  const firstDonor = Array.isArray(project.donors) ? String(project.donors[0] || '').trim() : '';
  return firstDonor;
}

function classifyInterventionBucket(entry) {
  const text = `${entry?.intervention_type || ''} ${entry?.intervention_name || ''}`.toLowerCase();
  if (text.includes('faab') || text.includes('farming as business')) return 'FaaB';
  if (text.includes('financial literacy')) return 'Financial Literacy';
  if (text.includes('governance') || text.includes('leadership')) return 'Governance & Leadership';
  return '';
}

function buildBeneficiaryActivitySummary() {
  const rows = Array.isArray(DB.beneficiaryActivitySummary) ? DB.beneficiaryActivitySummary : [];
  const projectMap = new Map();

  const ensureProject = (projectName) => {
    const key = String(projectName || 'Unassigned').trim() || 'Unassigned';
    if (!projectMap.has(key)) {
      projectMap.set(key, {
        project: key,
        FaaB: 0,
        'Financial Literacy': 0,
        'Governance & Leadership': 0,
        'Loan Access': 0,
        'Market Access': 0,
        total: 0,
      });
    }
    return projectMap.get(key);
  };

  rows.forEach((row) => {
    const record = ensureProject(row.project);
    const total = Number(row.total || 0);
    const loan = Number(row.accessed_loan || 0);
    const market = Number(row.accessed_market || 0);
    const bucket = classifyInterventionBucket(row);
    record.total += total;
    record['Loan Access'] += loan;
    record['Market Access'] += market;
    if (bucket) record[bucket] += total;
  });

  return [...projectMap.values()].sort((a, b) => a.project.localeCompare(b.project));
}

function syncDonorReportsWithProjects() {
  if (!Array.isArray(DB.donorReports) || !Array.isArray(DB.projects)) return;
  DB.donorReports = DB.donorReports.map((report) => {
    const alignedDonor = getProjectLeadAgency(report.project);
    if (!alignedDonor) return report;
    return { ...report, donor: alignedDonor };
  });
}

function deriveIndicatorsFromProjects(projects) {
  const rows = [];
  (projects || []).forEach((project) => {
    const indicators = Array.isArray(project?.key_indicators) ? project.key_indicators : [];
    indicators.forEach((text, index) => {
      rows.push({
        id: `derived-${project.id || project.name}-${index + 1}`,
        project: project.name || '',
        code: `${project.name || 'PRJ'}-K${index + 1}`,
        name: String(text || '').trim(),
        baseline: 0,
        target: 0,
        current: 0,
        unit: '',
        source: 'Project profile',
        frequency: 'N/A',
        responsible: '',
        disagg: '',
      });
    });
  });
  return rows.filter(row => row.name);
}

function deriveFieldActivitiesFromProjects(projects) {
  const rows = [];
  (projects || []).forEach((project) => {
    const activities = Array.isArray(project?.key_activities) ? project.key_activities : [];
    activities.forEach((text, index) => {
      rows.push({
        id: `planned-${project.id || project.name}-${index + 1}`,
        project: project.name || '',
        type: 'Planned Activity',
        location: project.location || '',
        plannedDate: project.start_date || '',
        actualDate: '',
        team: [],
        outputs: String(text || '').trim(),
        findings: '',
        status: 'planning',
        _derivedProfile: true,
      });
    });
  });
  return rows.filter(row => row.outputs);
}

function buildUnifiedIndicators() {
  const logged = Array.isArray(DB.indicators) ? DB.indicators : [];
  const derived = deriveIndicatorsFromProjects(DB.projects || []);
  const seen = new Set(
    logged.map((i) => `${normalizeProjectKey(i.project)}::${String(i.name || '').toLowerCase().trim()}`)
  );
  const missingDerived = derived.filter((d) => {
    const key = `${normalizeProjectKey(d.project)}::${String(d.name || '').toLowerCase().trim()}`;
    return !seen.has(key);
  }).map((d) => ({ ...d, _derivedProfile: true }));
  return [...logged, ...missingDerived];
}

function buildUnifiedFieldActivities() {
  const logged = Array.isArray(DB.fieldActivities) ? DB.fieldActivities : [];
  const derived = deriveFieldActivitiesFromProjects(DB.projects || []);
  const hasLoggedByProject = new Set(logged.map((a) => normalizeProjectKey(a.project)));
  const projectFallback = derived.filter((d) => !hasLoggedByProject.has(normalizeProjectKey(d.project)));
  return [...logged, ...projectFallback];
}

async function loadBackendData() {
  const results = await Promise.allSettled([
    fetchBackend('/admin/data'),
    fetchBackend('/users/me'),
    fetchBackend('/kobo-sync/forms'),
    fetchBackend('/admin/users'),
    fetchBackend('/admin/automation-rules'),
    fetchBackend('/farmers/training-activities'),
    fetchBackend('/farmers/activity-summary'),
  ]);

  if (results[3].status === 'fulfilled' && Array.isArray(results[3].value)) {
    DB.users = results[3].value.map(u => ({
      id: u.id,
      name: u.name || u.username || 'User',
      email: u.email,
      role: u.role || 'viewer',
      projects: u.projects || 'All',
      lastLogin: u.lastLogin || 'Never',
      status: u.status || 'active',
      emailVerified: Number(u.email_verified) === 1,
      invitePending: Number(u.email_verified) !== 1 && !!u.verification_token,
      verificationExpires: u.verification_expires || null
    }));
  }

  if (results[2].status === 'fulfilled' && Array.isArray(results[2].value)) {
    DB.koboForms = results[2].value.map(f => ({
      ...f,
      id: f.id,
      uid: f.uid,
      name: f.name,
      project: f.project,
      type: f.type,
      submissions: Number(f.submissions || 0),
      mappedFields: Number(f.mapped_fields || f.mappedFields || 0),
      lastSync: f.last_sync || f.lastSync || 'Never',
      status: f.status || 'connected'
    }));

    // Load mappings for each form to get accurate mapped fields count
    for (const form of DB.koboForms) {
      try {
        const mappings = await fetchBackend(`/kobo-sync/forms/${form.id}/mappings`);
        form.mappedFields = mappings.length;
      } catch (err) {
        console.warn('Failed to load mappings for form', form.id, err);
      }
    }
  }

  if (results[0].status === 'fulfilled' && results[0].value) {
    const data = results[0].value;
    DB.projects = Array.isArray(data.projects) ? data.projects.map(normalizeProject) : DB.projects;
    syncDonorReportsWithProjects();
    if (Array.isArray(data.farmers)) {
      const normalized = data.farmers.map(normalizeFarmer);
      DB.farmers = normalized;
      DB.beneficiaries = normalized;
    }
    DB.indicators = Array.isArray(data.indicators) ? data.indicators.map(normalizeIndicator) : DB.indicators;
    if (!DB.indicators.length) {
      DB.indicators = deriveIndicatorsFromProjects(DB.projects);
    }
    DB.fieldActivities = Array.isArray(data.fieldActivities) ? data.fieldActivities.map(normalizeFieldActivity) : DB.fieldActivities;
    if (Array.isArray(data.fieldActivities)) {
      DB.field_activities = data.fieldActivities.map(normalizeFieldActivity);
    }
  } else {
    console.warn('Load admin data failed:', results[0].reason || results[0].value);
  }

  if (results[1].status === 'fulfilled' && results[1].value) {
    const user = results[1].value;
    DB.currentUser = {
      id: user.id,
      name: user.username || user.name || 'User',
      email: user.email || '',
      role: user.role || 'viewer',
      initials: (user.username || user.name || 'U').slice(0,2).toUpperCase(),
    };
    // Update localStorage with latest user info
    localStorage.setItem('currentUser', JSON.stringify(DB.currentUser));
  } else {
    // Try to load from localStorage if backend fails
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      DB.currentUser = JSON.parse(stored);
    } else {
      console.warn('Load current user failed:', results[1].reason || results[1].value);
    }
  }

  if (results[4].status === 'fulfilled' && Array.isArray(results[4].value)) {
    const backendRules = results[4].value.map((r) => ({
      id: r.id,
      name: r.name,
      enabled: !!r.enabled,
      trigger: r.trigger,
      project: r.project || 'All',
      condition: r.condition || 'always',
      conditionValue: r.conditionValue,
      action: r.action,
      actionParams: r.actionParams || {},
    }));

    if (backendRules.length) {
      DB.automationRules = backendRules;
    } else if (Array.isArray(DB.automationRules) && DB.automationRules.length) {
      const created = [];
      for (const rule of DB.automationRules) {
        try {
          const saved = await fetchBackend('/admin/automation-rules', {
            method: 'POST',
            body: JSON.stringify({
              name: rule.name,
              enabled: !!rule.enabled,
              trigger: rule.trigger,
              project: rule.project || 'All',
              condition: rule.condition || 'always',
              conditionValue: rule.conditionValue,
              action: rule.action,
              actionParams: rule.actionParams || {},
            }),
          });
          created.push(saved);
        } catch (seedErr) {
          console.warn('Failed to seed automation rule:', rule.name, seedErr);
        }
      }
      if (created.length) DB.automationRules = created;
    }
  } else {
    console.warn('Load automation rules failed, using local defaults:', results[4].reason || results[4].value);
  }

  if (results[5].status === 'fulfilled' && Array.isArray(results[5].value)) {
    DB.trainingActivities = results[5].value;
  }

  if (results[6].status === 'fulfilled' && Array.isArray(results[6].value)) {
    DB.beneficiaryActivitySummary = results[6].value;
  }

  const authFailed = results.some(r => r.status === 'rejected' && /401/.test(String(r.reason)));
  if (authFailed) {
    throw new Error('Authentication required');
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// UTILITIES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const $ = id => document.getElementById(id);
function getRoleLabel(role) {
  const labels = {
    'admin': 'Administrator',
    'm_e_officer': 'M&E Personnel',
    'project_officer': 'Project Officer',
    'project_coordinator': 'Project Coordinator',
    'project_manager': 'Project Manager',
    'data_clerk': 'Data Clerk',
    'viewer': 'Viewer'
  };
  return labels[role] || role;
}
const pct = (c,t) => t ? Math.min(100,Math.round(c/t*100)) : 0;
const fmt = n => typeof n==='number' ? n.toLocaleString() : (n||'');
const fmtUSD = n => '$'+(n/1000).toFixed(0)+'k';
const fmtCurrency = (n, currency = 'USD') => {
  if (!n || n === 0) return '$0';
  const units = [
    { value: 1000000000, symbol: 'B' },
    { value: 1000000, symbol: 'M' },
    { value: 1000, symbol: 'K' }
  ];
  const unit = units.find(u => Math.abs(n) >= u.value);
  const formatted = unit ? (n / unit.value).toFixed(1).replace(/\.0$/, '') + unit.symbol : n.toLocaleString();
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'RWF' ? 'FRw' : currency;
  return symbol + formatted;
};
const fmtNumber = n => typeof n === 'number' ? n.toLocaleString() : (n || '');
const fmtDate = d => {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
const fmtDateTime = d => {
  if (!d) return '';
  const source = String(d);
  const parsed = new Date(source);
  const date = Number.isNaN(parsed.getTime()) ? new Date(source.replace(' ', 'T')) : parsed;
  if (Number.isNaN(date.getTime())) return source;
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const newId = () => Date.now() + Math.floor(Math.random()*1000);

function badge(status){
  const map={active:'b-green Active',planning:'b-blue Planning',completed:'b-purple Completed',inactive:'b-gray Inactive',
    pending:'b-amber Pending',overdue:'b-red Overdue',submitted:'b-green Submitted',draft:'b-amber Draft',
    connected:'b-green Connected',paused:'b-gray Paused',cancelled:'b-gray Cancelled',invited_pending:'b-amber Invited'};
  const [cls,lbl]=(map[status]||'b-gray '+status).split(' ');
  return `<span class="badge ${cls}">${lbl||status}</span>`;
}
function progBar(val,color='var(--blue)'){
  return `<div class="prog-wrap"><div class="prog-bar" style="width:${val}%;background:${color}"></div></div>`;
}
function progColor(p){return p>=80?'var(--green)':p>=50?'var(--blue)':'var(--amber)'}

function icon(name,size=16){
  const icons={
    dashboard:`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`,
    projects:`<path d="M3 7h18M3 12h18M3 17h12"/>`,
    users:`<circle cx="9" cy="7" r="4"/><path d="M2 21v-1a7 7 0 0114 0v1"/><path d="M16 3.13a4 4 0 010 7.75M22 21v-1a4 4 0 00-3-3.87"/>`,
    chart:`<path d="M3 18l6-6 4 4 8-8"/>`,
    book:`<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>`,
    file:`<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
    map:`<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>`,
    bell:`<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>`,
    settings:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>`,
    plus:`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    edit:`<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
    trash:`<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>`,
    download:`<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
    upload:`<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>`,
    search:`<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    x:`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
    check:`<polyline points="20 6 9 17 4 12"/>`,
    link:`<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>`,
    refresh:`<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>`,
    eye:`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
    tag:`<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`,
    shield:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    kobo:`<circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>`,
    info:`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
    calendar:`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
    database:`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  };
  const d=icons[name]||'';
  return `<svg width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">${d}</svg>`;
}
function ico(name,size=16){return icon(name,size)}

function addAudit(action,type='update'){
  DB.auditLog.unshift({id:newId(),user:DB.currentUser.name,action,time:'Just now',type});
  if(DB.auditLog.length>50)DB.auditLog.pop();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MODAL ENGINE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
window.Modal = {
  _confirmCallback: null,
  open(title,bodyHtml,footerHtml='',large=false){
    const r=$('modal-root');
    r.innerHTML=`<div class="overlay" id="overlay" onclick="if(event.target===this)Modal.close()">
      <div class="modal${large?' modal-lg':''}" role="dialog">
        <div class="modal-head">
          <span class="modal-title">${esc(title)}</span>
          <button class="icon-btn" onclick="Modal.close()">${ico('x',15)}</button>
        </div>
        <div class="modal-body">${bodyHtml}</div>
        ${footerHtml?`<div class="modal-foot">${footerHtml}</div>`:''}
      </div>
    </div>`;
  },
  close(){$('modal-root').innerHTML='';this._confirmCallback=null;},
  confirm(msg,onYes){
    this._confirmCallback=onYes;
    Modal.open('Confirm',`<p style="color:var(--text2);font-size:14px">${esc(msg)}</p>`,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button>
       <button class="btn btn-danger" onclick="Modal._confirmCallback&&Modal._confirmCallback();Modal.close()">Confirm</button>`);
  }
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NAVIGATION
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const NAV=[
  {label:'Overview',items:[{id:'dashboard',label:'Dashboard',icon:'dashboard'}]},
  {label:'Programme',items:[{id:'projects',label:'Projects',icon:'projects'},{id:'indicators',label:'Indicators',icon:'chart'},{id:'field',label:'Field Activities',icon:'map'}]},
  {label:'Data',items:[{id:'beneficiaries',label:'Farmer / Beneficiary Data',icon:'users'},{id:'learning',label:'Learning Log',icon:'book'},{id:'donors',label:'Donor Reports',icon:'file'}]},
  {label:'Operations',items:[{id:'tasks',label:'Alerts & Tasks',icon:'bell'},{id:'kobo',label:'KoBo Integration',icon:'kobo'}]},
  {label:'System',items:[{id:'admin',label:'Admin Panel',icon:'settings'},{id:'database',label:'Database Management',icon:'database'}]}
];
const PAGE_TITLES={dashboard:'Dashboard',projects:'Projects',indicators:'Indicators Library',beneficiaries:'Farmer / Beneficiary Data',learning:'Learning Log',donors:'Donor Reports',field:'Field Activities',tasks:'Alerts & Tasks',kobo:'KoBo Integration',admin:'Admin Panel',database:'Database Management'};

function buildNav(){
  const el=$('nav-items');
  el.innerHTML=NAV.map(s=>`<div class="sb-section">
    <div class="sb-label">${s.label}</div>
    ${s.items.map(i=>`<button class="nav-btn" id="nav-${i.id}" onclick="App.openPage('${i.id}')">${ico(i.icon,15)}<span>${i.label}</span>${i.id==='tasks'?'<span class="nav-badge hidden" id="task-badge">0</span>':''}</button>`).join('')}
  </div>`).join('');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PAGES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€ DASHBOARD â”€â”€
function renderDashboard(){
  const total = DB.farmers.length ? DB.farmers.length : DB.beneficiaries.length;
  const openTasks=DB.tasks.filter(t=>t.status==='pending'||t.status==='overdue').length;
  const avgPct=Math.round(DB.indicators.reduce((a,i)=>a+pct(i.current,i.target),0)/DB.indicators.length);
  const activeProj=DB.projects.filter(p=>p.status==='active').length;
  const months=['Apr','May','Jun','Jul','Aug','Sep'];
  const bars=[42,65,58,78,91,85];
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Dashboard</div><div class="section-sub">Rwanda M&amp;E Platform â€” September 2024</div></div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('dashboard')">${ico('download',13)} Export Summary</button>
    <button class="btn btn-primary btn-sm" onclick="App.renderPage()">${ico('refresh',13)} Refresh</button>
  </div>
</div>
<div class="g4" style="margin-bottom:18px">
  ${[['Active Projects',activeProj,'of '+DB.projects.length+' total','var(--blue)'],
     ['Total Beneficiaries',fmt(total),'+12 this month','var(--green)'],
     ['Avg Indicator Progress',avgPct+'%','Across all projects','var(--purple)'],
     ['Open Tasks',openTasks,DB.tasks.filter(t=>t.status==='overdue').length+' overdue','var(--amber)']
  ].map(([l,v,s,c])=>`<div class="stat"><div class="stat-lbl">${l}</div><div class="stat-val" style="color:${c}">${v}</div><div class="stat-sub">${s}</div></div>`).join('')}
</div>
<div class="g2" style="margin-bottom:18px">
  <div class="card">
    <div class="card-header"><span class="card-title">Projects at a Glance</span><button class="btn btn-ghost btn-sm" onclick="App.openPage('projects')">View All</button></div>
    ${DB.projects.map(p=>{const sp=p.budget?Math.round(p.spent/p.budget*100):0;const col=sp>80?'var(--red)':sp>60?'var(--amber)':'var(--blue)';
    return `<div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-family:var(--font-h);font-weight:700;font-size:13px;color:var(--text)">${esc(p.name)}</span>
        <div style="display:flex;gap:8px;align-items:center"><span style="font-size:11px;color:var(--text3)">${fmtUSD(p.spent)} / ${fmtUSD(p.budget)}</span>${badge(p.status)}</div>
      </div>${progBar(sp,col)}
      <div style="display:flex;justify-content:space-between;margin-top:3px;font-size:11px;color:var(--text3)"><span>${esc(p.location)}</span><span>${sp}% budget</span></div>
    </div>`;}).join('')}
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Data Collection Activity</span><span style="font-size:11px;color:var(--text3)">Last 6 months</span></div>
    <div class="bar-chart-wrap">
      ${months.map((m,i)=>`<div class="bar-col">
        <div class="bar" style="height:${bars[i]}%;background:${i===5?'var(--blue)':'var(--bg5)'}"></div>
        <span class="bar-lbl">${m}</span>
      </div>`).join('')}
    </div>
    <div style="margin-top:14px;font-size:12px;color:var(--text3);text-align:center">KoBoToolbox submissions synced</div>
  </div>
</div>
<div class="g2">
  <div class="card">
    <div class="card-header"><span class="card-title">Key Indicator Progress</span><button class="btn btn-ghost btn-sm" onclick="App.openPage('indicators')">View All</button></div>
    ${DB.indicators.slice(0,5).map(ind=>{const p2=pct(ind.current,ind.target);const col=progColor(p2);
    return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="flex:1;font-size:12px;color:var(--text);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(ind.name.length>36?ind.name.slice(0,36)+'â€¦':ind.name)}</div>
      <div style="width:100px">${progBar(p2,col)}</div>
      <div style="width:36px;text-align:right;font-size:11px;font-family:var(--font-m);color:${col}">${p2}%</div>
    </div>`;}).join('')}
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">Upcoming Tasks</span><button class="btn btn-ghost btn-sm" onclick="App.openPage('tasks')">View All</button></div>
    ${DB.tasks.slice(0,4).map(t=>`<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px">
      ${badge(t.status)}
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(t.title)}</div>
        <div style="font-size:11px;color:var(--text3)">${esc(t.assignee)} Â· Due ${esc(t.dueDate)}</div>
      </div>
      <span class="badge ${t.priority==='high'?'b-red':t.priority==='medium'?'b-amber':'b-gray'}">${t.priority}</span>
    </div>`).join('')}
  </div>
</div>
</div>`;
}

// â”€â”€ PROJECTS â”€â”€
let _selProject=null;
let _projTab='overview';
function renderProjects(){
  if(_selProject) return renderProjectDetail(_selProject);
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Projects</div><div class="section-sub">${DB.projects.length} projects registered</div></div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('projects')">${ico('download',13)} Export</button>
    <button class="btn btn-primary btn-sm" onclick="App.openProjectForm()">${ico('plus',13)} New Project</button>
  </div>
</div>
<div class="filter-row">
  <div class="search-wrap"><span class="search-ico">${ico('search',14)}</span><input class="form-input" id="proj-search" placeholder="Search projectsâ€¦" style="width:220px;padding-left:33px" oninput="App.filterProjects()"></div>
  <select class="form-select" id="proj-status" style="width:130px" onchange="App.filterProjects()"><option value="">All Status</option><option>active</option><option>planning</option><option>completed</option></select>
</div>
<div class="g2" id="proj-grid">
${DB.projects.map(p=>projectCard(p)).join('')}
</div>
</div>`;
}
function projectCard(p){
  const budget = p.budget || p.total_budget || 0;
  const currency = p.budget_currency || 'USD';
  const statusColor = p.status === 'active' ? 'b-green' : p.status === 'completed' ? 'b-blue' : p.status === 'planning' ? 'b-amber' : 'b-gray';
  const indicatorCount = (DB.indicators || []).filter(i => projectMatches(i.project, p)).length;
  const fieldActivities = Array.isArray(DB.fieldActivities) ? DB.fieldActivities : (Array.isArray(DB.field_activities) ? DB.field_activities : []);
  const activityCount = fieldActivities.filter(a => projectMatches(a.project, p)).length;
  const coverageClass = (count) => {
    if (count <= 0) return 'b-red';
    if (count <= 2) return 'b-amber';
    return 'b-green';
  };

  return `<div class="card" id="pcard-${p.id}" style="cursor:pointer" onclick="App.viewProject(${p.id})">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
    <div style="flex:1;min-width:0">
      <div style="font-family:var(--font-h);font-size:18px;font-weight:700;color:var(--blue);letter-spacing:-0.5px;margin-bottom:4px">${esc(p.name)}</div>
      <div style="font-size:13px;color:var(--text);font-weight:500;margin-bottom:2px">${esc(p.full_name || '')}</div>
      <div style="font-size:11px;color:var(--text3)">${esc(p.location || '')}</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center;flex-shrink:0">
      <span class="badge ${statusColor}">${esc(p.status || 'unknown')}</span>
      <button class="icon-btn" onclick="event.stopPropagation(); App.openProjectForm(${p.id})" title="Edit">${ico('edit',13)}</button>
      <button class="icon-btn" onclick="event.stopPropagation(); App.deleteProject(${p.id})" title="Delete">${ico('trash',13)}</button>
    </div>
  </div>

  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px">
    ${p.duration ? `<div style="flex:1;min-width:120px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.9px">Duration</div><div style="font-size:12px;color:var(--text);font-weight:500">${esc(p.duration)}</div></div>` : ''}
    ${budget > 0 ? `<div style="flex:1;min-width:120px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.9px">Budget</div><div style="font-size:12px;color:var(--text);font-weight:500">${fmtCurrency(budget, currency)}</div></div>` : ''}
    ${p.target_beneficiaries ? `<div style="flex:1;min-width:120px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.9px">Beneficiaries</div><div style="font-size:12px;color:var(--text);font-weight:500">${fmtNumber(p.target_beneficiaries)}</div></div>` : ''}
  </div>

  ${p.description ? `<div style="font-size:12px;color:var(--text2);line-height:1.4;margin-bottom:12px;max-height:60px;overflow:hidden">${esc(p.description.length > 150 ? p.description.substring(0, 150) + '...' : p.description)}</div>` : ''}

  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
    <span class="badge ${coverageClass(indicatorCount)}">Indicators: ${indicatorCount}</span>
    <span class="badge ${coverageClass(activityCount)}">Field Activities: ${activityCount}</span>
    ${p.donors && p.donors.length > 0 ? `<span class="badge b-purple">${p.donors.length} donor${p.donors.length > 1 ? 's' : ''}</span>` : ''}
    ${p.partners && p.partners.length > 0 ? `<span class="badge b-teal">${p.partners.length} partner${p.partners.length > 1 ? 's' : ''}</span>` : ''}
    ${p.key_activities && p.key_activities.length > 0 ? `<span class="badge b-blue">${p.key_activities.length} activit${p.key_activities.length === 1 ? 'y' : 'ies'}</span>` : ''}
    ${p.restoration_area ? `<span class="badge b-green">${fmtNumber(p.restoration_area)} ${p.restoration_area_unit || 'ha'}</span>` : ''}
  </div>

  <div style="display:flex;justify-content:space-between;align-items:center">
    <div style="font-size:11px;color:var(--text3)">Created ${fmtDate(p.created_at || new Date())}</div>
    <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); App.viewProject(${p.id})">${ico('eye',13)} View Details</button>
  </div>
</div>`;
}
function renderProjectDetail(p){
  const tabs = ['overview', 'details', 'activities', 'indicators', 'partners'];
  const projInds = buildUnifiedIndicators().filter(i => projectMatches(i.project, p));
  const projActivities = buildUnifiedFieldActivities()
    .filter(a => projectMatches(a.project, p));

  return `
<div class="fade">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap">
    <button class="btn btn-ghost btn-sm" onclick="App.backToProjects()">${ico('x',12)} Back to Projects</button>
    <span style="font-family:var(--font-h);font-size:20px;font-weight:700;color:var(--text)">${esc(p.name)}</span>
    <span class="badge ${p.status === 'active' ? 'b-green' : p.status === 'completed' ? 'b-blue' : p.status === 'planning' ? 'b-amber' : 'b-gray'}">${esc(p.status || 'unknown')}</span>
    <div style="margin-left:auto;display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm" onclick="App.openProjectForm(${p.id})">${ico('edit',13)} Edit</button>
      <button class="btn btn-danger btn-sm" onclick="App.deleteProject(${p.id})">${ico('trash',13)} Delete</button>
    </div>
  </div>

  <div class="tabs" style="margin-bottom:20px">${tabs.map(t => `<button class="tab${_projTab === t ? ' active' : ''}" onclick="App.setProjTab('${t}')">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}</div>

  ${_projTab === 'overview' ? `
  <div class="g2" style="margin-bottom:20px">
    <div class="card">
      <div class="card-title">Project Summary</div>
      ${p.description ? `<p style="color:var(--text2);line-height:1.5;margin-bottom:16px">${esc(p.description)}</p>` : ''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${p.location ? `<div><div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.9px;margin-bottom:4px">Location</div><div style="font-size:13px;color:var(--text);font-weight:500">${esc(p.location)}</div></div>` : ''}
        ${p.duration ? `<div><div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.9px;margin-bottom:4px">Duration</div><div style="font-size:13px;color:var(--text);font-weight:500">${esc(p.duration)}</div></div>` : ''}
        ${p.start_date ? `<div><div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.9px;margin-bottom:4px">Start Date</div><div style="font-size:13px;color:var(--text);font-weight:500">${fmtDate(p.start_date)}</div></div>` : ''}
        ${p.end_date ? `<div><div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.9px;margin-bottom:4px">End Date</div><div style="font-size:13px;color:var(--text);font-weight:500">${fmtDate(p.end_date)}</div></div>` : ''}
      </div>
    </div>

    <div class="card">
      <div class="card-title">Key Metrics</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        ${p.total_budget || p.budget ? `<div class="stat"><div class="stat-lbl">Total Budget</div><div class="stat-val" style="color:var(--green)">${fmtCurrency(p.total_budget || p.budget, p.budget_currency || 'USD')}</div></div>` : ''}
        ${p.target_beneficiaries ? `<div class="stat"><div class="stat-lbl">Target Beneficiaries</div><div class="stat-val" style="color:var(--blue)">${fmtNumber(p.target_beneficiaries)}</div></div>` : ''}
        ${p.target_households ? `<div class="stat"><div class="stat-lbl">Target Households</div><div class="stat-val" style="color:var(--purple)">${fmtNumber(p.target_households)}</div></div>` : ''}
        ${p.restoration_area ? `<div class="stat"><div class="stat-lbl">Restoration Area</div><div class="stat-val" style="color:var(--teal)">${fmtNumber(p.restoration_area)} ${p.restoration_area_unit || 'ha'}</div></div>` : ''}
      </div>
    </div>
  </div>

  ${p.key_indicators && p.key_indicators.length > 0 ? `
  <div class="card" style="margin-bottom:20px">
    <div class="card-title">Key Indicators & Results</div>
    <div style="display:grid;gap:12px">
      ${p.key_indicators.map(indicator => `<div style="padding:12px;border:1px solid var(--border);border-radius:6px;background:var(--bg3)">
        <div style="font-size:13px;color:var(--text);font-weight:500">${esc(indicator)}</div>
      </div>`).join('')}
    </div>
  </div>` : ''}

  ` : ''}

  ${_projTab === 'details' ? `
  <div class="g2">
    <div class="card">
      <div class="card-title">Project Details</div>
      <div style="display:grid;gap:12px">
        ${p.lead_agency ? `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--text3)">Lead Agency</span><span style="color:var(--text);font-weight:500">${esc(p.lead_agency)}</span></div>` : ''}
        ${p.executing_agency ? `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--text3)">Executing Agency</span><span style="color:var(--text);font-weight:500">${esc(p.executing_agency)}</span></div>` : ''}
        ${p.operating_location ? `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--text3)">Operating Location</span><span style="color:var(--text);font-weight:500">${esc(p.operating_location)}</span></div>` : ''}
        ${p.budget_currency ? `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--text3)">Budget Currency</span><span style="color:var(--text);font-weight:500">${esc(p.budget_currency)}</span></div>` : ''}
      </div>
    </div>

    <div class="card">
      <div class="card-title">Funding & Partners</div>
      ${p.funding_sources && p.funding_sources.length > 0 ? `
      <div style="margin-bottom:16px">
        <div style="font-size:12px;color:var(--text3);margin-bottom:8px">Funding Sources</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${p.funding_sources.map(source => `<span class="chip">${esc(source)}</span>`).join('')}
        </div>
      </div>` : ''}

      ${p.co_financiers && p.co_financiers.length > 0 ? `
      <div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:8px">Co-financiers</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${p.co_financiers.map(financier => `<span class="chip">${esc(financier)}</span>`).join('')}
        </div>
      </div>` : ''}
    </div>
  </div>
  ` : ''}

  ${_projTab === 'activities' ? `
  <div class="card" style="margin-bottom:14px">
    <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
      <span class="card-title">Field Activities</span>
      <button class="btn btn-primary btn-sm" onclick="App.openFieldForm(null, '${esc(p.name)}')">${ico('plus',13)} Log Activity</button>
    </div>
    ${projActivities.length ? `
    <div class="tbl-wrap"><table>
      <thead><tr><th>Type</th><th>Location</th><th>Planned</th><th>Actual</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${projActivities.map(a=>`<tr>
        <td style="color:var(--text);font-weight:500">${esc(a.type)}</td>
        <td>${esc(a.location || '—')}</td>
        <td class="mono" style="font-size:11px">${esc(a.plannedDate || '—')}</td>
        <td class="mono" style="font-size:11px;color:${a.actualDate?'var(--green)':'var(--text3)'}">${esc(a.actualDate || '—')}</td>
        <td>${badge(a.status)}</td>
        <td><div style="display:flex;gap:4px">${a._derivedProfile
          ? `<button class="btn btn-ghost btn-xs" onclick="App.openFieldForm(null, '${esc(a.project)}')">${ico('plus',11)} Log Actual</button>`
          : `<button class="icon-btn" onclick="App.openFieldForm(${a.id})">${ico('edit',13)}</button><button class="icon-btn" onclick="App.deleteField(${a.id})">${ico('trash',13)}</button>`}
        </div></td>
      </tr>`).join('')}</tbody>
    </table></div>` : `<div class="empty">No field activities logged for this project yet. <button class="btn btn-ghost btn-sm" onclick="App.openFieldForm(null, '${esc(p.name)}')">Log first activity</button></div>`}
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">Planned / Key Activities</span>
    </div>
    ${p.key_activities && p.key_activities.length > 0 ? `
    <div style="display:grid;gap:12px">
      ${p.key_activities.map((activity, index) => `
      <div style="display:flex;gap:12px;padding:16px;border:1px solid var(--border);border-radius:8px;background:var(--bg3)">
        <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:var(--blue);color:#fff;font-weight:600;font-size:14px;flex-shrink:0">${index + 1}</div>
        <div style="flex:1">
          <div style="font-size:14px;color:var(--text);font-weight:500;margin-bottom:4px">Activity ${index + 1}</div>
          <div style="font-size:13px;color:var(--text2);line-height:1.4">${esc(activity)}</div>
        </div>
      </div>`).join('')}
    </div>` : `<div class="empty">No key activities defined for this project yet. This section will update once activities are added.</div>`}
  </div>
  ` : ''}

  ${_projTab === 'indicators' ? `
  <div style="margin-bottom:12px;display:flex;justify-content:flex-end">
    <button class="btn btn-primary btn-sm" onclick="App.openIndicatorForm(null, '${esc(p.name)}')">${ico('plus',13)} Add Indicator</button>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Indicator</th>
          <th>Baseline</th>
          <th>Target</th>
          <th>Current</th>
          <th>Progress</th>
          <th>Freq.</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${projInds.length ? projInds.map(ind => {
          const p2 = pct(ind.current, ind.target);
          const col = progColor(p2);
          return `<tr>
            <td><span class="mono badge b-blue">${esc(ind.code)}</span></td>
            <td style="color:var(--text);font-weight:500;max-width:200px">${esc(ind.name)}</td>
            <td>${fmt(ind.baseline)}</td>
            <td>${fmt(ind.target)} <span style="color:var(--text3);font-size:11px">${esc(ind.unit)}</span></td>
            <td style="font-weight:600;color:${col}">${fmt(ind.current)}</td>
            <td style="min-width:120px"><div style="display:flex;align-items:center;gap:6px"><div style="flex:1">${progBar(p2, col)}</div><span class="mono" style="color:${col}">${p2}%</span></div></td>
            <td>${esc(ind.frequency)}</td>
            <td><div style="display:flex;gap:4px">${ind._derivedProfile
              ? `<button class="btn btn-ghost btn-xs" onclick="App.openIndicatorForm(null, '${esc(ind.project)}')">${ico('plus',11)} Add Measured</button>`
              : `<button class="icon-btn" onclick="App.openIndicatorForm(${ind.id})">${ico('edit',13)}</button><button class="icon-btn" onclick="App.deleteIndicator(${ind.id})">${ico('trash',13)}</button>`}
            </div></td>
          </tr>`;
        }).join('') : `<tr><td colspan="8" class="empty">No indicators for this project yet. <button class="btn btn-ghost btn-sm" onclick="App.openIndicatorForm(null, '${esc(p.name)}')">Add first indicator</button></td></tr>`}
      </tbody>
    </table>
  </div>
  ` : ''}

  ${_projTab === 'partners' ? `
  <div class="g2">
    ${p.donors && p.donors.length > 0 ? `
    <div class="card">
      <div class="card-title">Donors (${p.donors.length})</div>
      <div style="display:grid;gap:8px">
        ${p.donors.map(donor => `<div style="display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--border);border-radius:6px">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--green);flex-shrink:0"></div>
          <span style="font-size:13px;color:var(--text);font-weight:500">${esc(donor)}</span>
        </div>`).join('')}
      </div>
    </div>` : ''}

    ${p.partners && p.partners.length > 0 ? `
    <div class="card">
      <div class="card-title">Partners (${p.partners.length})</div>
      <div style="display:grid;gap:8px">
        ${p.partners.map(partner => `<div style="display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--border);border-radius:6px">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--blue);flex-shrink:0"></div>
          <span style="font-size:13px;color:var(--text);font-weight:500">${esc(partner)}</span>
        </div>`).join('')}
      </div>
    </div>` : ''}
  </div>
  ` : ''}
</div>`;
}

// â”€â”€ BENEFICIARIES â”€â”€
let _benPage=1;
const _benPerPage=7;
function renderBeneficiaries(search='',filterProj='All',filterSex='All',filterInterventionType='All',filterInterventionName='All',filterLoan='All',filterMarket='All'){
  const beneficiaries = DB.farmers.length ? DB.farmers : DB.beneficiaries;
  const summaryRows = buildBeneficiaryActivitySummary();
  const resolveProject = (b) => String(b.project || '').trim() || 'Unassigned';
  const resolveInterventionType = (b) => String(b.intervention_type || '').trim() || 'Unclassified';
  const resolveInterventionName = (b) => String(b.intervention_name || '').trim() || 'Unspecified';
  const projectOptions = Array.from(new Set([
    ...DB.projects.map(p => p.name),
    ...beneficiaries.map(resolveProject).filter(Boolean)
  ])).sort();
  const interventionTypeOptions = Array.from(new Set(beneficiaries.map(resolveInterventionType))).sort();
  const interventionNameOptions = Array.from(new Set(beneficiaries.map(resolveInterventionName))).sort();
  const s=(search||'').toLowerCase();
  const filtered=beneficiaries.filter(b=>{
    const idValue = (b.identifier || b.id || '').toString().toLowerCase();
    const ms=(b.name||'').toLowerCase().includes(s)||idValue.includes(s)||(b.cooperative||'').toLowerCase().includes(s)||(b.location||'').toLowerCase().includes(s)||resolveInterventionName(b).toLowerCase().includes(s)||resolveInterventionType(b).toLowerCase().includes(s);
    const loanOk = filterLoan === 'All' || (filterLoan === 'Yes' ? !!b.accessed_loan : !b.accessed_loan);
    const marketOk = filterMarket === 'All' || (filterMarket === 'Yes' ? !!b.accessed_market : !b.accessed_market);
    return ms
      && (filterProj==='All'||resolveProject(b)===filterProj)
      && (filterSex==='All'||b.sex===filterSex)
      && (filterInterventionType==='All'||resolveInterventionType(b)===filterInterventionType)
      && (filterInterventionName==='All'||resolveInterventionName(b)===filterInterventionName)
      && loanOk
      && marketOk;
  });
  const pages=Math.ceil(filtered.length/_benPerPage)||1;
  if(_benPage>pages)_benPage=1;
  const paged=filtered.slice((_benPage-1)*_benPerPage,_benPage*_benPerPage);
  const totalCount = beneficiaries.length;
  const fC=beneficiaries.filter(b=>b.sex==='F').length;
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Farmer / Beneficiary Data</div><div class="section-sub">${totalCount} registered beneficiaries</div></div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-primary btn-sm" onclick="App.openTrainingImportModal()">${ico('plus',13)} New Training/Activity + Import</button>
    <button class="btn btn-ghost btn-sm" onclick="App.importCSV()">${ico('upload',13)} Import CSV/Excel</button>
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('beneficiaries')">${ico('download',13)} Export</button>
    <button class="btn btn-ghost btn-sm" onclick="App.openBenForm()">${ico('plus',13)} Add Beneficiary</button>
  </div>
</div>
<div class="g4" style="margin-bottom:16px">
  ${[['Total',totalCount,'var(--blue)'],['Female',fC,'var(--pink)'],['Male',totalCount-fC,'var(--teal)'],['Active',beneficiaries.filter(b=>b.status==='active').length,'var(--green)']].map(([l,v,c])=>`<div class="stat"><div class="stat-lbl">${l}</div><div class="stat-val" style="color:${c}">${v}</div></div>`).join('')}
</div>
<div class="card" style="margin-bottom:16px">
  <div class="card-header"><span class="card-title">Activity Summary By Project</span><span style="font-size:12px;color:var(--text3)">Counts from imported activity-tagged beneficiary records</span></div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Project</th><th>FaaB</th><th>Financial Literacy</th><th>Governance & Leadership</th><th>Loan Access</th><th>Market Access</th><th>Total Tagged</th></tr></thead>
      <tbody>
        ${summaryRows.length ? summaryRows.map(row => `<tr>
          <td><span class="badge b-blue">${esc(row.project)}</span></td>
          <td>${fmt(row.FaaB)}</td>
          <td>${fmt(row['Financial Literacy'])}</td>
          <td>${fmt(row['Governance & Leadership'])}</td>
          <td>${fmt(row['Loan Access'])}</td>
          <td>${fmt(row['Market Access'])}</td>
          <td style="font-weight:600">${fmt(row.total)}</td>
        </tr>`).join('') : '<tr><td colspan="7" class="empty">No activity-tagged beneficiary records yet. Use the New Training/Activity + Import flow.</td></tr>'}
      </tbody>
    </table>
  </div>
</div>
<div class="filter-row">
  <div class="search-wrap"><span class="search-ico">${ico('search',14)}</span><input class="form-input" id="ben-search" value="${esc(search)}" placeholder="Search by name, ID, cooperativeâ€¦" style="width:260px;padding-left:33px" oninput="App.filterBen()"></div>
  <select class="form-select" id="ben-proj" style="width:150px" onchange="App.filterBen()"><option>All</option>${projectOptions.map(name=>`<option${filterProj===name?' selected':''}>${name}</option>`).join('')}</select>
  <select class="form-select" id="ben-sex" style="width:100px" onchange="App.filterBen()"><option>All</option><option${filterSex==='F'?' selected':''}>F</option><option${filterSex==='M'?' selected':''}>M</option></select>
  <select class="form-select" id="ben-int-type" style="width:200px" onchange="App.filterBen()"><option>All</option>${interventionTypeOptions.map(name=>`<option${filterInterventionType===name?' selected':''}>${name}</option>`).join('')}</select>
  <select class="form-select" id="ben-int-name" style="width:220px" onchange="App.filterBen()"><option>All</option>${interventionNameOptions.map(name=>`<option${filterInterventionName===name?' selected':''}>${name}</option>`).join('')}</select>
  <select class="form-select" id="ben-loan" style="width:120px" onchange="App.filterBen()"><option${filterLoan==='All'?' selected':''}>All</option><option${filterLoan==='Yes'?' selected':''}>Loan: Yes</option><option${filterLoan==='No'?' selected':''}>Loan: No</option></select>
  <select class="form-select" id="ben-market" style="width:130px" onchange="App.filterBen()"><option${filterMarket==='All'?' selected':''}>All</option><option${filterMarket==='Yes'?' selected':''}>Market: Yes</option><option${filterMarket==='No'?' selected':''}>Market: No</option></select>
</div>
<div class="tbl-wrap" style="margin-bottom:14px"><table>
  <thead><tr><th>ID</th><th>Name</th><th>Sex</th><th>Cooperative</th><th>Project</th><th>Intervention</th><th>Type</th><th>Loan</th><th>Market</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody>${paged.length?paged.map(b=>`<tr>
    <td><span class="mono" style="color:var(--blue)">${esc(b.id)}</span></td>
    <td style="color:var(--text);font-weight:500">${esc(b.name)}</td>
    <td><span class="badge ${b.sex==='F'?'b-purple':'b-teal'}">${b.sex==='F'?'Female':'Male'}</span></td>
    <td>${esc(b.cooperative)}</td>
    <td><span class="badge b-blue">${esc(resolveProject(b))}${b.projectInferred ? ' (derived)' : ''}</span></td>
    <td>${esc(resolveInterventionName(b))}</td>
    <td><span class="badge b-teal">${esc(resolveInterventionType(b))}</span></td>
    <td>${b.accessed_loan ? '<span class="badge b-green">Yes</span>' : '<span class="badge b-red">No</span>'}</td>
    <td>${b.accessed_market ? '<span class="badge b-green">Yes</span>' : '<span class="badge b-red">No</span>'}</td>
    <td>${badge(b.status)}</td>
    <td><div style="display:flex;gap:4px"><button class="icon-btn" onclick="App.openBenForm('${b.id}')">${ico('edit',13)}</button><button class="icon-btn" onclick="App.deleteBen('${b.id}')">${ico('trash',13)}</button></div></td>
  </tr>`).join(''):`<tr><td colspan="11" class="empty">No records match your search</td></tr>`}</tbody>
</table></div>
${pages>1?`<div style="display:flex;justify-content:center;align-items:center;gap:10px">
  <button class="btn btn-ghost btn-sm" onclick="App.benPage(${_benPage-1})" ${_benPage===1?'disabled':''}>Previous</button>
  <span style="font-size:13px;color:var(--text2)">Page ${_benPage} of ${pages}</span>
  <button class="btn btn-ghost btn-sm" onclick="App.benPage(${_benPage+1})" ${_benPage===pages?'disabled':''}>Next</button>
</div>`:''}
</div>`;
}

// â”€â”€ INDICATORS â”€â”€
function renderIndicators(search='',filterProj='All'){
  const s=(search||'').toLowerCase();
  const sourceIndicators = buildUnifiedIndicators();
  const selectedProject = filterProj === 'All' ? null : (DB.projects.find(p => p.name === filterProj) || { name: filterProj, full_name: filterProj });
  const filtered = sourceIndicators.filter(i => {
    const projectOk = filterProj === 'All' || projectMatches(i.project, selectedProject);
    const nameText = String(i.name || '').toLowerCase();
    const codeText = String(i.code || '').toLowerCase();
    return projectOk && (nameText.includes(s) || codeText.includes(s));
  });
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Indicators Library</div><div class="section-sub">${sourceIndicators.length} indicators across all projects</div></div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-ghost btn-sm" onclick="App.importCSV()">${ico('upload',13)} Import Results</button>
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('indicators')">${ico('download',13)} Export</button>
    <button class="btn btn-primary btn-sm" onclick="App.openIndicatorForm()">${ico('plus',13)} Add Indicator</button>
  </div>
</div>
<div class="filter-row">
  <div class="search-wrap"><span class="search-ico">${ico('search',14)}</span><input class="form-input" id="ind-search" value="${esc(search)}" placeholder="Search indicatorsâ€¦" style="width:220px;padding-left:33px" oninput="App.filterInd()"></div>
  <select class="form-select" id="ind-proj" style="width:130px" onchange="App.filterInd()"><option>All</option>${DB.projects.map(p=>`<option${filterProj===p.name?' selected':''}>${p.name}</option>`).join('')}</select>
</div>
<div class="tbl-wrap"><table>
  <thead><tr><th>Code</th><th>Indicator</th><th>Project</th><th>Baseline</th><th>Target</th><th>Current</th><th>Progress</th><th>Freq.</th><th>Actions</th></tr></thead>
  <tbody>${filtered.length ? filtered.map(ind=>{const p2=pct(ind.current,ind.target);const col=progColor(p2);return`<tr>
    <td><span class="mono badge b-blue">${esc(ind.code)}</span></td>
    <td style="color:var(--text);font-weight:500;max-width:220px">${esc(ind.name)}</td>
    <td><span class="badge b-blue">${esc(ind.project)}</span></td>
    <td>${fmt(ind.baseline)}</td>
    <td style="font-weight:500">${fmt(ind.target)} <span style="font-size:11px;color:var(--text3)">${esc(ind.unit)}</span></td>
    <td style="font-weight:700;color:${col}">${fmt(ind.current)}</td>
    <td style="min-width:130px"><div style="display:flex;align-items:center;gap:6px"><div style="flex:1">${progBar(p2,col)}</div><span class="mono" style="color:${col}">${p2}%</span></div></td>
    <td>${esc(ind.frequency)}</td>
    <td><div style="display:flex;gap:4px">${ind._derivedProfile
      ? `<button class="btn btn-ghost btn-xs" onclick="App.openIndicatorForm(null, '${esc(ind.project)}')">${ico('plus',11)} Add Measured</button>`
      : `<button class="icon-btn" onclick="App.openIndicatorForm(${ind.id})">${ico('edit',13)}</button><button class="icon-btn" onclick="App.deleteIndicator(${ind.id})">${ico('trash',13)}</button>`}
    </div></td>
  </tr>`}).join('') : `<tr><td colspan="9" class="empty">No indicators available yet for this selection. Add one to get started.</td></tr>`}</tbody>
</table></div>
</div>`;
}

// â”€â”€ LEARNING LOG â”€â”€
function renderLearning(filterType='All',filterProj='All'){
  const typeColors={best_practice:'b-green',lesson_learned:'b-blue',challenge:'b-red',risk:'b-amber',recommendation:'b-purple'};
  const typeLabels={best_practice:'Best Practice',lesson_learned:'Lesson Learned',challenge:'Challenge',risk:'Risk',recommendation:'Recommendation'};
  const filtered=DB.learningLog.filter(l=>(filterType==='All'||l.type===filterType)&&(filterProj==='All'||l.project===filterProj));
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Learning Log</div><div class="section-sub">${DB.learningLog.length} entries</div></div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('learning')">${ico('download',13)} Export</button>
    <button class="btn btn-primary btn-sm" onclick="App.openLearningForm()">${ico('plus',13)} New Entry</button>
  </div>
</div>
<div class="filter-row">
  <select class="form-select" id="learn-type" style="width:170px" onchange="App.filterLearn()"><option>All</option>${Object.entries(typeLabels).map(([k,v])=>`<option value="${k}"${filterType===k?' selected':''}>${v}</option>`).join('')}</select>
  <select class="form-select" id="learn-proj" style="width:130px" onchange="App.filterLearn()"><option>All</option>${DB.projects.map(p=>`<option${filterProj===p.name?' selected':''}>${p.name}</option>`).join('')}</select>
</div>
${filtered.map(e=>`
<div class="card" style="margin-bottom:14px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div style="flex:1">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;align-items:center">
        <span class="badge ${typeColors[e.type]}">${typeLabels[e.type]}</span>
        <span class="badge b-blue">${esc(e.project)}</span>
        <span style="font-size:11px;color:var(--text3)">${esc(e.date)}</span>
        ${e.indicator?`<span class="chip">${ico('link',11)} ${esc(e.indicator)}</span>`:''}
      </div>
      <div style="font-family:var(--font-h);font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px">${esc(e.title)}</div>
      <div style="font-size:13px;color:var(--text2);line-height:1.65">${esc(e.narrative)}</div>
      <div style="margin-top:8px">${(e.tags||[]).map(t=>`<span class="tag">${ico('tag',10)} ${esc(t)}</span>`).join('')}</div>
    </div>
    <div style="display:flex;gap:4px;margin-left:12px">
      <button class="icon-btn" onclick="App.openLearningForm(${e.id})">${ico('edit',13)}</button>
      <button class="icon-btn" onclick="App.deleteLearning(${e.id})">${ico('trash',13)}</button>
    </div>
  </div>
</div>`).join('')}
${!filtered.length?'<div class="empty">No entries match the selected filters</div>':''}
</div>`;
}

// â”€â”€ FIELD ACTIVITIES â”€â”€
function renderField(filterProj='All'){
  const sourceActivities = buildUnifiedFieldActivities();
  const selectedProject = filterProj === 'All' ? null : (DB.projects.find(p => p.name === filterProj) || { name: filterProj, full_name: filterProj });
  const filtered = sourceActivities.filter(a => filterProj === 'All' || projectMatches(a.project, selectedProject));
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Field Activities</div><div class="section-sub">${sourceActivities.length} activities (logged + planned)</div></div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('field')">${ico('download',13)} Export</button>
    <button class="btn btn-primary btn-sm" onclick="App.openFieldForm()">${ico('plus',13)} Log Activity</button>
  </div>
</div>
<div class="filter-row">
  <select class="form-select" id="field-proj" style="width:140px" onchange="App.filterField()"><option>All</option>${DB.projects.map(p=>`<option${filterProj===p.name?' selected':''}>${p.name}</option>`).join('')}</select>
</div>
<div class="tbl-wrap"><table>
  <thead><tr><th>Project</th><th>Type</th><th>Location</th><th>Planned</th><th>Actual</th><th>Team</th><th>Outputs</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody>${filtered.map(a=>`<tr>
    <td><span class="badge b-blue">${esc(a.project)}</span></td>
    <td style="color:var(--text);font-weight:500">${esc(a.type)}</td>
    <td>${esc(a.location)}</td>
    <td class="mono" style="font-size:11px">${esc(a.plannedDate)}</td>
    <td class="mono" style="font-size:11px;color:${a.actualDate?'var(--green)':'var(--text3)'}">${a.actualDate||'â€”'}</td>
    <td style="font-size:12px">${esc((a.team||[]).join(', '))}</td>
    <td style="font-size:12px;color:var(--text2);max-width:160px">${esc(a.outputs||'â€”')}</td>
    <td>${badge(a.status)}</td>
    <td><div style="display:flex;gap:4px">${a._derivedProfile
      ? `<button class="btn btn-ghost btn-xs" onclick="App.openFieldForm(null, '${esc(a.project)}')">${ico('plus',11)} Log Actual</button>`
      : `<button class="icon-btn" onclick="App.openFieldForm(${a.id})">${ico('edit',13)}</button><button class="icon-btn" onclick="App.deleteField(${a.id})">${ico('trash',13)}</button>`}
    </div></td>
  </tr>`).join('') || `<tr><td colspan="9" class="empty">No field activities available for this selection yet. <button class="btn btn-ghost btn-sm" onclick="App.openFieldForm(null${filterProj !== 'All' ? `, '${esc(filterProj)}'` : ''})">Log first activity</button></td></tr>`}</tbody>
</table></div>
</div>`;
}

// â”€â”€ TASKS â”€â”€
function renderTasks(filter='All'){
  const filtered=DB.tasks.filter(t=>filter==='All'||t.status===filter);
  const prioColor={high:'var(--red)',medium:'var(--amber)',low:'var(--green)'};
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Alerts &amp; Tasks</div><div class="section-sub">${DB.tasks.filter(t=>t.status!=='completed').length} open tasks</div></div>
  <button class="btn btn-primary btn-sm" onclick="App.openTaskForm()">${ico('plus',13)} New Task</button>
</div>
<div class="filter-row">
  ${['All','pending','overdue','completed'].map(f=>`<button class="btn ${filter===f?'btn-primary':'btn-ghost'} btn-sm" onclick="App.filterTasks('${f}')">${f.charAt(0).toUpperCase()+f.slice(1)}</button>`).join('')}
</div>
<div id="task-list">
${filtered.map(t=>`
<div class="card card-sm" style="display:flex;align-items:center;gap:12px;margin-bottom:10px;opacity:${t.status==='completed'?.7:1}">
  <div class="prio-bar" style="height:40px;background:${prioColor[t.priority]}"></div>
  <div style="flex:1;min-width:0">
    <div style="font-size:13px;font-weight:500;color:${t.status==='completed'?'var(--text3)':'var(--text)'};text-decoration:${t.status==='completed'?'line-through':'none'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(t.title)}</div>
    <div style="font-size:11px;color:var(--text3);margin-top:2px"><span class="badge b-blue" style="font-size:10px;margin-right:6px">${esc(t.project)}</span>${esc(t.assignee)} Â· Due ${esc(t.dueDate)} Â· ${esc(t.linked)}</div>
  </div>
  <div style="display:flex;gap:6px;align-items:center;flex-shrink:0">
    ${badge(t.status)}
    ${t.status!=='completed'?`<button class="btn btn-success btn-xs" onclick="App.completeTask(${t.id})">${ico('check',12)} Done</button>`:''}
    ${t.status==='completed'?`<button class="btn btn-ghost btn-xs" onclick="App.reopenTask(${t.id})">Reopen</button>`:''}
    <button class="icon-btn" onclick="App.openTaskForm(${t.id})">${ico('edit',13)}</button>
    <button class="icon-btn" onclick="App.deleteTask(${t.id})">${ico('trash',13)}</button>
  </div>
</div>`).join('')}
${!filtered.length?'<div class="empty">No tasks in this category</div>':''}
</div>
</div>`;
}

// â”€â”€ DONOR REPORTS â”€â”€
let _editingReport=null;
function renderDonors(){
  syncDonorReportsWithProjects();
  if(_editingReport){const r=DB.donorReports.find(x=>x.id===_editingReport);return r?renderReportEditor(r):renderDonors();}
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Donor Reports</div><div class="section-sub">Generate and manage donor-ready reports</div></div>
  <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    ${DB.currentUser?.role === 'admin' ? `<button class="btn btn-ghost btn-sm" onclick="App.syncAllDonorReportsNow()">${ico('refresh',12)} Update Existing Reports</button>` : ''}
    <button class="btn btn-primary btn-sm" onclick="App.openDonorForm()">${ico('plus',13)} New Report</button>
  </div>
</div>
<div class="tbl-wrap"><table>
  <thead><tr><th>Project</th><th>Donor</th><th>Period</th><th>Version</th><th>Status</th><th>Last Edited</th><th>Actions</th></tr></thead>
  <tbody>${DB.donorReports.map(r=>`<tr>
    <td><span class="badge b-blue">${esc(r.project)}</span></td>
    <td style="color:var(--text);font-weight:500">${esc(r.donor)}</td>
    <td>${esc(r.period)}</td>
    <td><span class="ver-tag">${esc(r.version)}</span></td>
    <td>${badge(r.status)}</td>
    <td class="mono" style="font-size:11px">${esc(r.lastEdited)}</td>
    <td><div style="display:flex;gap:6px">
      <button class="btn btn-ghost btn-sm" onclick="App.editReport(${r.id})">${ico('edit',12)} Edit Report</button>
      <button class="icon-btn" onclick="App.deleteDonor(${r.id})">${ico('trash',13)}</button>
    </div></td>
  </tr>`).join('')}</tbody>
</table></div>
</div>`;
}
function renderReportEditor(r){
  const donorLabel = getProjectLeadAgency(r.project) || r.donor;
  const inds=DB.indicators.filter(i=>i.project===r.project);
  return `
<div class="fade">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap">
  <button class="btn btn-ghost btn-sm" onclick="App.closeReport()">${ico('x',12)} Back</button>
  <span style="font-family:var(--font-h);font-size:18px;font-weight:700;color:var(--text)">${esc(r.project)} â€” ${esc(donorLabel)} ${esc(r.period)}</span>
  <span class="ver-tag">${esc(r.version)}</span>${badge(r.status)}
  <div style="margin-left:auto;display:flex;gap:8px">
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('report')">${ico('download',13)} Export Excel</button>
    <button class="btn btn-ghost btn-sm" onclick="window.print()">${ico('download',13)} Print/PDF</button>
    <button class="btn btn-success btn-sm" onclick="App.markReportSubmitted(${r.id})">${ico('check',13)} Mark Submitted</button>
  </div>
</div>
${Object.keys(r.content).map(section=>`
<div class="donor-section-box">
  <div style="font-weight:600;color:var(--text);font-size:13px;margin-bottom:10px">${esc(section)}</div>
  ${r.content[section]==='auto'?`<div class="tbl-wrap"><table>
    <thead><tr><th>Indicator</th><th>Baseline</th><th>Target</th><th>Actual</th><th>Progress</th></tr></thead>
    <tbody>${inds.map(i=>{const p2=pct(i.current,i.target);const col=progColor(p2);return`<tr>
      <td style="color:var(--text)">${esc(i.name)}</td>
      <td>${fmt(i.baseline)}</td><td>${fmt(i.target)} ${esc(i.unit)}</td>
      <td style="font-weight:700;color:${col}">${fmt(i.current)}</td>
      <td><div style="display:flex;align-items:center;gap:6px"><div style="width:80px">${progBar(p2,col)}</div><span class="mono" style="color:${col}">${p2}%</span></div></td>
    </tr>`}).join('')}</tbody>
  </table></div>`
  :`<textarea class="form-textarea" rows="5" placeholder="Enter ${esc(section)} narrativeâ€¦" onchange="App.saveReportSection(${r.id},'${esc(section)}',this.value)">${esc(r.content[section]||'')}</textarea>`}
</div>`).join('')}
</div>`;
}

// â”€â”€ KOBO â”€â”€
let _syncing=null;
function renderKobo(){
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">KoBo Integration</div><div class="section-sub">Automated data flows from KoBoToolbox</div></div>
  <button class="btn btn-primary btn-sm" onclick="App.openKoboForm()">${ico('plus',13)} Connect Form</button>
</div>
<div class="card" style="margin-bottom:18px">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
    <div>
      <div style="font-family:var(--font-h);font-weight:600;color:var(--text);margin-bottom:4px">KoBoToolbox Account</div>
      <div style="display:flex;align-items:center;gap:6px"><div class="pulse"></div><span style="font-size:12px;color:var(--green)">Connected â€” kf.kobotoolbox.org</span></div>
    </div>
    <div style="display:flex;align-items:flex-end;gap:10px">
      <div class="form-group" style="margin:0">
        <label class="form-label">API Token</label>
        <input class="form-input" type="password" value="kpi.xxxxxxxxxxxxxxxx" style="width:200px;font-family:var(--font-m);font-size:11px">
      </div>
      <button class="btn btn-ghost btn-sm">Update Token</button>
    </div>
  </div>
</div>
<div class="g4" style="margin-bottom:18px">
  ${[['Connected Forms',DB.koboForms.filter(f=>f.status==='connected').length,'var(--green)'],
     ['Total Submissions',fmt(DB.koboForms.reduce((a,f)=>a+f.submissions,0)),'var(--blue)'],
     ['Mapped Fields',DB.koboForms.reduce((a,f)=>a+f.mappedFields,0),'var(--purple)'],
     ['Last Sync','Today','var(--teal)']].map(([l,v,c])=>`<div class="stat"><div class="stat-lbl">${l}</div><div class="stat-val" style="color:${c};font-size:22px">${v}</div></div>`).join('')}
</div>
<div class="card-title" style="margin-bottom:10px">Connected KoBo Forms</div>
<div id="kobo-forms">
${DB.koboForms.map(f=>`
<div class="kobo-row" id="krow-${f.id}">
  <div style="flex:1">
    <div style="font-weight:500;color:var(--text);font-size:13px">${esc(f.name)}</div>
    <div style="font-size:11px;color:var(--text3);margin-top:3px"><span class="badge b-blue" style="font-size:10px;margin-right:6px">${esc(f.project)}</span>${esc(f.type || 'Unknown type')} Â· ${fmt(f.submissions)} submissions Â· ${f.mappedFields} mapped fields Â· Last: ${esc(f.lastSync)}</div>
    <div style="font-size:10px;color:var(--text3);margin-top:3px">UID: ${esc(f.uid || 'not set')}</div>
  </div>
  ${badge(f.status)}
  <button class="btn btn-ghost btn-sm" onclick="App.openKoboMapping('${f.id}')">${ico('link',12)} Mapping</button>
  <button class="btn btn-primary btn-sm" id="sync-${f.id}" onclick="App.syncKobo('${f.id}')">${ico('refresh',12)} Sync Now</button>
  <button class="icon-btn" onclick="App.deleteKoboForm('${f.id}')">${ico('trash',13)}</button>
</div>`).join('')}
</div>
<div class="divider"></div>
<div class="card-title" style="margin-bottom:12px">External Integrations</div>
<div class="g3">
  ${[
    ['Power BI','Push indicators and dashboards','connected','powerbi','/integrations/powerbi/status','Check Dataset'],
    ['TolaData','Sync activities and logframe','connected','toladata','/integrations/toladata/projects','Check Projects'],
    ['monday.com','Sync tasks and activities','connected','monday','/integrations/monday/board','Check Board']
  ].map(([n,d,s,type,statusPath,statusLabel])=>`<div class="card card-sm">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-weight:600;font-size:13px;color:var(--text)">${n}</span>${badge(s)}</div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:10px">${d}</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button class="btn btn-ghost btn-sm" id="sync-${type}" onclick="App.syncIntegration('${type}')">${ico('refresh',12)} Sync</button>
      <button class="btn btn-ghost btn-sm" id="check-${type}" onclick="App.checkIntegrationStatus('${type}','${statusPath}')">${ico('link',12)} ${statusLabel}</button>
    </div>
  </div>`).join('')}
</div>
<div style="margin-top:16px;text-align:center">
  <button class="btn btn-primary" id="sync-all-btn" onclick="App.syncAllIntegrations()">${ico('sync',14)} Sync All Integrations</button>
</div>
</div>`;
}

// â”€â”€ ADMIN â”€â”€
let _adminTab='users';
function renderAdmin(){
  const roleLabels={admin:'Admin',m_e_officer:'M&E Personnel',project_coordinator:'Project Coordinator',project_manager:'Project Manager',project_officer:'Project Officer',data_clerk:'Data Clerk',viewer:'Viewer'};
  const roleBadge={admin:'b-red',m_e_officer:'b-blue',project_coordinator:'b-amber',project_manager:'b-purple',project_officer:'b-teal',data_clerk:'b-purple',viewer:'b-gray'};
  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Admin Panel</div><div class="section-sub">Users, roles, data management, and audit log</div></div>
</div>
<div class="tabs">
  ${[['users','Users & Roles'],['import','Import Data'],['refdata','Reference Data'],['audit','Audit Log'],['automation','Automation Rules']].map(([id,lbl])=>`<button class="tab${_adminTab===id?' active':''}" onclick="App.setAdminTab('${id}')">${lbl}</button>`).join('')}
</div>

${_adminTab==='users'?`
<div style="display:flex;justify-content:flex-end;margin-bottom:14px"><button class="btn btn-primary btn-sm" onclick="App.openUserForm()">${ico('plus',13)} Add User</button></div>
<div class="tbl-wrap"><table>
  <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Projects</th><th>Last Login</th><th>Latest Invite Generated At</th><th>Invite Expires At</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody>${DB.users.map(u=>`<tr>
    <td><div style="display:flex;align-items:center;gap:8px">
      <div style="width:28px;height:28px;border-radius:50%;background:var(--bg4);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text2);flex-shrink:0">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
      <span style="color:var(--text);font-weight:500">${esc(u.name)}</span>
    </div></td>
    <td class="mono" style="font-size:11px">${esc(u.email)}</td>
    <td><span class="badge ${roleBadge[u.role]||'b-gray'}">${roleLabels[u.role]||u.role}</span></td>
    <td style="font-size:12px">${esc(u.projects)}</td>
    <td style="font-size:12px">${esc(u.lastLogin)}</td>
    <td style="font-size:12px">${esc(u.inviteGeneratedAt ? fmtDateTime(u.inviteGeneratedAt) : '-')}</td>
    <td style="font-size:12px">${esc(u.verificationExpires ? fmtDateTime(u.verificationExpires) : '-')}</td>
    <td>${u.invitePending?badge('invited_pending'):badge(u.status)}</td>
    <td><div style="display:flex;gap:4px"><button class="icon-btn" onclick="App.openUserForm(${u.id})" title="Edit user">${ico('edit',13)}</button>${u.invitePending?`<button class="icon-btn" onclick="App.resendUserInvite(${u.id})" title="Resend invitation">${ico('refresh',13)}</button>`:''}<button class="icon-btn" onclick="App.deleteUser(${u.id})" title="Delete user">${ico('trash',13)}</button></div></td>
  </tr>`).join('')}</tbody>
</table></div>`:''}

${_adminTab==='import'?`
<div class="g3" style="margin-bottom:20px">
  ${[{title:'Import Beneficiaries',desc:'CSV/Excel. Updates existing by ID, inserts new.',icon:'users'},{title:'Import Indicators',desc:'Bulk upload indicator results from Excel template.',icon:'chart'},{title:'Import Activities',desc:'Import field activity logs from CSV.',icon:'map'}].map(im=>`
  <div class="card">
    <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:12px">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(79,142,247,0.12);display:flex;align-items:center;justify-content:center;color:var(--blue);flex-shrink:0">${ico(im.icon,18)}</div>
      <div><div style="font-weight:600;color:var(--text);font-size:13px">${im.title}</div><div style="font-size:12px;color:var(--text3);margin-top:3px">${im.desc}</div></div>
    </div>
    <div class="drag-zone" onclick="App.importCSV()">
      <div style="opacity:.5;margin-bottom:8px">${ico('upload',20)}</div>
      <div style="font-size:12px;color:var(--text3)">Drop file or click to browse</div>
      <div style="font-size:10px;color:var(--text3);margin-top:3px">.csv, .xlsx supported</div>
    </div>
    <div style="display:flex;gap:8px;margin-top:10px">
      <button class="btn btn-ghost btn-sm" style="flex:1">${ico('download',12)} Template</button>
      <button class="btn btn-primary btn-sm" style="flex:1" onclick="App.importCSV()">${ico('upload',12)} Upload</button>
    </div>
  </div>`).join('')}
</div>
<div class="card">
  <div class="card-title">Validation Rules</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;color:var(--text2)">
    ${["Required fields checked before import","Duplicate ID detection (update or insert)","Data type validation (dates, numbers)","Province/district matched to reference list","Cooperative names fuzzy-matched to registry","Post-import preview before committing"].map(r=>`<div style="display:flex;gap:8px;align-items:center"><span style="color:var(--green)">${ico('check',13)}</span>${r}</div>`).join('')}
  </div>
</div>`:''}

${_adminTab==='refdata'?`
<div class="g2">
  ${[['Provinces & Districts',['Eastern Province','Northern Province','Southern Province','Western Province','Kigali City']],
     ['Activity Types',['Training','Monitoring Visit','Focus Group Discussion','Farmer Field School','Community Meeting']],
     ['Cooperative Registry',[...new Set(DB.beneficiaries.map(b=>b.cooperative))]],
     ['Indicator Units',['Farmers','Hectares','Households','%','USD','SMEs','Cooperatives']]
  ].map(([title,items])=>`<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><div class="card-title" style="margin:0">${title}</div><button class="btn btn-primary btn-xs">${ico('plus',11)}</button></div>
    ${items.map(it=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px;color:var(--text2)">${esc(it)}<div style="display:flex;gap:3px"><button class="icon-btn" style="width:24px;height:24px">${ico('edit',11)}</button><button class="icon-btn" style="width:24px;height:24px">${ico('trash',11)}</button></div></div>`).join('')}
  </div>`).join('')}
</div>`:''}

${_adminTab==='audit'?`
<div class="card">
  <div class="card-title">Audit Log</div>
  ${DB.auditLog.map(log=>`<div class="timeline-item">
    <div class="tl-dot" style="background:${log.type==='delete'?'var(--red)':log.type==='import'?'var(--purple)':log.type==='create'?'var(--green)':'var(--blue)'}"></div>
    <div><div style="font-size:13px;color:var(--text)"><strong>${esc(log.user)}</strong> â€” ${esc(log.action)}</div><div style="font-size:11px;color:var(--text3);margin-top:2px">${esc(log.time)}</div></div>
  </div>`).join('')}
</div>`:''}

${_adminTab==='automation'?`
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
  <div style="font-size:13px;color:var(--text3)">Rules fire automatically after import or KoBo sync &mdash; creating alerts, learning log entries, or updating donor report narratives.</div>
  <button class="btn btn-primary btn-sm" onclick="App.openAutomationRuleForm(null)">${ico('plus',13)} Add Rule</button>
</div>
<div class="tbl-wrap"><table>
  <thead><tr><th>On/Off</th><th>Rule Name</th><th>Trigger</th><th>Condition</th><th>Action</th><th>Project</th><th></th></tr></thead>
  <tbody>
  ${(DB.automationRules||[]).map(r=>`<tr>
    <td>
      <span onclick="App.toggleAutomationRule('${r.id}',${!r.enabled})" style="display:inline-block;width:34px;height:18px;border-radius:9px;background:${r.enabled?'var(--blue)':'var(--bg4)'};cursor:pointer;position:relative;transition:background .2s;vertical-align:middle">
        <span style="display:block;width:14px;height:14px;border-radius:50%;background:#fff;position:absolute;top:2px;${r.enabled?'right:2px':'left:2px'};transition:all .2s"></span>
      </span>
    </td>
    <td style="font-weight:500;color:var(--text)">${esc(r.name)}</td>
    <td><span class="badge b-blue" style="font-size:10px">${r.trigger==='kobo_sync'?'KoBo Sync':'Import'}</span></td>
    <td style="font-size:12px;color:var(--text2)">${r.condition==='always'?'Always':r.condition==='count_gte'?'\u2265 '+r.conditionValue+' records':r.condition==='count_lte'?'\u2264 '+r.conditionValue+' records':'Type = '+esc(r.conditionValue)}</td>
    <td><span class="badge ${r.action==='create_alert'?'b-amber':r.action==='create_learning_entry'?'b-teal':'b-purple'}" style="font-size:10px">${r.action==='create_alert'?'Create Alert':r.action==='create_learning_entry'?'Learning Entry':'Update Report'}</span></td>
    <td style="font-size:12px;color:var(--text3)">${esc(r.project||'All')}</td>
    <td><div style="display:flex;gap:4px">
      <button class="icon-btn" onclick="App.testAutomationRule('${r.id}')">${ico('refresh',13)}</button>
      <button class="icon-btn" onclick="App.openAutomationRuleForm('${r.id}')">${ico('edit',13)}</button>
      <button class="icon-btn" onclick="App.deleteAutomationRule('${r.id}')">${ico('trash',13)}</button>
    </div></td>
  </tr>`).join('')}
  ${!(DB.automationRules||[]).length?'<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:24px">No rules yet. Click Add Rule to create one.</td></tr>':''}
  </tbody>
</table></div>
<div class="card" style="margin-top:16px">
  <div class="card-title">How Automation Works</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;font-size:12px;color:var(--text2)">
    <div style="padding:10px;background:var(--bg3);border-radius:var(--r)"><strong style="color:var(--text)">Triggers</strong><br><br><b>import_beneficiaries</b> &mdash; fires after any CSV/Excel import.<br><br><b>kobo_sync</b> &mdash; fires after a KoBo form sync completes.</div>
    <div style="padding:10px;background:var(--bg3);border-radius:var(--r)"><strong style="color:var(--text)">Conditions</strong><br><br><b>Always</b> &mdash; fires every time.<br><b>&ge; N records</b> &mdash; count threshold.<br><b>Type match</b> &mdash; specific form type.</div>
    <div style="padding:10px;background:var(--bg3);border-radius:var(--r)"><strong style="color:var(--text)">Actions</strong><br><br><b>Create Alert</b> &mdash; adds a task in Alerts &amp; Tasks.<br><b>Learning Entry</b> &mdash; adds entry to Learning Log.<br><b>Update Report</b> &mdash; appends note to Donor Report section.</div>
  </div>
</div>`:''}
</div>`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DATABASE MANAGEMENT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function renderDatabase(){
  const tables = [
    {id:'farmers',name:'Farmers',count:DB.farmers.length,columns:['id','name','location','created_at']},
    {id:'projects',name:'Projects',count:DB.projects.length,columns:['id','name','description','status','start_date','end_date']},
    {id:'indicators',name:'Indicators',count:DB.indicators.length,columns:['id','name','target_value','actual_value']},
    {id:'users',name:'Users',count:DB.users.length,columns:['id','name','email','role','lastLogin','status']},
    {id:'tasks',name:'Tasks',count:DB.tasks.length,columns:['id','title','project','assignee','dueDate','priority','status']}
  ];

  return `
<div class="fade">
<div class="section-head">
  <div><div class="section-title">Database Management</div><div class="section-sub">Direct database table manipulation and inspection</div></div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-ghost btn-sm" onclick="App.exportCSV('database')">${ico('download',13)} Export All</button>
    <button class="btn btn-primary btn-sm" onclick="App.refreshDatabase()">${ico('refresh',13)} Refresh Data</button>
  </div>
</div>

<div class="db-overview">
  <div class="db-stats">
    <div class="stat-card">
      <div class="stat-icon">${ico('database',24)}</div>
      <div class="stat-content">
        <div class="stat-val">${tables.reduce((a,t)=>a+t.count,0)}</div>
        <div class="stat-lbl">Total Records</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">${ico('projects',24)}</div>
      <div class="stat-content">
        <div class="stat-val">${tables.length}</div>
        <div class="stat-lbl">Tables</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">${ico('users',24)}</div>
      <div class="stat-content">
        <div class="stat-val">${DB.users.filter(u=>u.status==='active').length}</div>
        <div class="stat-lbl">Active Users</div>
      </div>
    </div>
  </div>
</div>

<div class="db-tables">
  ${tables.map(table=>`
    <div class="db-table-card">
      <div class="db-table-header">
        <div class="db-table-title">
          <span class="db-table-icon">${ico(table.id==='farmers'?'users':table.id==='projects'?'projects':table.id==='indicators'?'chart':table.id==='users'?'users':'file',16)}</span>
          ${table.name}
          <span class="db-table-count">${table.count} records</span>
        </div>
        <div class="db-table-actions">
          <button class="btn btn-ghost btn-xs" onclick="App.viewTable('${table.id}')">${ico('eye',12)} View</button>
          <button class="btn btn-ghost btn-xs" onclick="App.addRecord('${table.id}')">${ico('plus',12)} Add</button>
          <button class="btn btn-ghost btn-xs" onclick="App.exportTable('${table.id}')">${ico('download',12)} Export</button>
        </div>
      </div>
      <div class="db-table-preview" id="preview-${table.id}">
        ${renderTablePreview(table)}
      </div>
    </div>
  `).join('')}
</div>

<div class="db-sql-section">
  <div class="db-sql-header">
    <div class="section-title">SQL Query</div>
    <div class="section-sub">Execute custom SQL queries (read-only)</div>
  </div>
  <div class="db-sql-form">
    <textarea id="sql-query" class="db-sql-input" placeholder="SELECT * FROM farmers LIMIT 10;" rows="3"></textarea>
    <button class="btn btn-primary" onclick="App.executeSQL()">Execute Query</button>
  </div>
  <div id="sql-results" class="db-sql-results"></div>
</div>
</div>
`;
}

function renderTablePreview(table){
  const data = DB[table.id] || [];
  const preview = data.slice(0,3);
  
  if(preview.length === 0) return '<div class="db-empty">No records found</div>';
  
  return `
<table class="db-preview-table">
  <thead>
    <tr>${table.columns.map(col=>`<th>${col.replace('_',' ').toUpperCase()}</th>`).join('')}</tr>
  </thead>
  <tbody>
    ${preview.map(row=>`
      <tr>${table.columns.map(col=>`<td>${esc(row[col] || '')}</td>`).join('')}</tr>
    `).join('')}
  </tbody>
</table>
${data.length > 3 ? `<div class="db-more">... and ${data.length - 3} more records</div>` : ''}
`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// APP CONTROLLER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
window.App = {
  currentPage:'dashboard',
  _fieldState:{},

  async init(){
    buildNav();
    this.updateUserDisplay();
    const token = localStorage.getItem('token');
    if (!token) {
      this.showLogin();
      return;
    }

    try {
      await loadBackendData();
      this.updateUserDisplay();
      this.openPage('dashboard');
      this.updateTaskBadge();
    } catch (err) {
      console.warn('Backend load failed:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.showLogin();
    }
  },

  updateUserDisplay(){
    const user = DB.currentUser || JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user.name) return;

    const avatar = $('user-avatar') || document.querySelector('.avatar');
    const nameEl = $('user-name-display') || document.querySelector('.user-name-t');
    const roleEl = $('user-role-display') || document.querySelector('.user-role-t');

    if (avatar) avatar.textContent = user.initials || user.name.slice(0, 2).toUpperCase();
    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = getRoleLabel(user.role || 'viewer');
  },

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    location.reload();
  },

  openPage(id){
    this.currentPage=id;
    _selProject=null;
    _projTab='overview';
    _editingReport=null;
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    const nb=$('nav-'+id);
    if(nb)nb.classList.add('active');
    $('topbar-title').textContent=PAGE_TITLES[id]||id;
    this.renderPage();
  },

  renderPage(){
    const c=$('content');
    const renders={dashboard:renderDashboard,projects:renderProjects,beneficiaries:()=>renderBeneficiaries(),indicators:()=>renderIndicators(),learning:()=>renderLearning(),field:()=>renderField(),tasks:()=>renderTasks(),donors:renderDonors,kobo:renderKobo,admin:renderAdmin,database:renderDatabase};
    const fn=renders[this.currentPage];
    c.innerHTML=fn?fn():'<div class="empty">Page not found</div>';
  },

  updateTaskBadge(){
    const open=DB.tasks.filter(t=>t.status==='pending'||t.status==='overdue').length;
    const badge=$('task-badge');
    const dot=$('notif-dot');
    if(badge){badge.textContent=open;badge.classList.toggle('hidden',open===0);}
    if(dot)dot.style.display=open>0?'block':'none';
  },

  showLogin(){
    Modal.open('Sign in to IZI M&E',
      `<div class="form-group">
        <label class="form-label">Email or Username</label>
        <input class="form-input" id="login-email" placeholder="you@example.com or username" autocomplete="username">
      </div>
       <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" id="login-password" autocomplete="current-password">
       </div>`,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button>
       <button class="btn btn-primary" onclick="App.login()">Sign in</button>
       <button class="btn btn-ghost" onclick="App.showRegister()">Register</button>`,
      true);
  },

  async login(){
    const identifier = $('login-email')?.value.trim();
    const password = $('login-password')?.value;
    if(!identifier || !password) return alert('Email/username and password are required');

    try {
      const result = await fetchBackend('/users/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, email: identifier, password }),
      });
      
      if (result.requiresVerification) {
        Modal.close();
        App.showVerifyEmail(result.email);
        return;
      }

      localStorage.setItem('token', result.token);
      localStorage.setItem('currentUser', JSON.stringify({
        id: result.user.id,
        name: result.user.username,
        email: result.user.email,
        role: result.user.role || 'viewer'
      }));
      Modal.close();
      await loadBackendData();
      this.openPage('dashboard');
      this.updateTaskBadge();
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  },

  showRegister(){
    Modal.open('Register for IZI M&E',
      `<div class="form-group">
        <label class="form-label">Username</label>
        <input class="form-input" id="register-username" placeholder="Choose your username" autocomplete="username">
       </div>
       <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" id="register-email" placeholder="you@example.com" autocomplete="email">
       </div>
       <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" id="register-password" placeholder="At least 6 characters" autocomplete="new-password">
       </div>
       <div class="form-group">
        <label class="form-label">Confirm Password</label>
        <input type="password" class="form-input" id="register-confirm" placeholder="Confirm your password" autocomplete="new-password">
       </div>`,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button>
       <button class="btn btn-primary" onclick="App.register()">Register</button>`,
      true);
  },

  async register(){
    const username = $('register-username')?.value.trim();
    const email = $('register-email')?.value.trim();
    const password = $('register-password')?.value;
    const confirmPassword = $('register-confirm')?.value;
    
    if(!username || !email || !password || !confirmPassword) return alert('All fields are required');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email');
    if(password.length < 6) return alert('Password must be at least 6 characters');
    if(password !== confirmPassword) return alert('Passwords do not match');

    try {
      const result = await fetchBackend('/users/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      
      Modal.close();
      alert(result.message);
      if (result.requiresVerification) {
        App.showVerifyEmail(email);
      } else {
        await loadBackendData();
        this.openPage('dashboard');
      }
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  },

  showVerifyEmail(email){
    Modal.open('Verify Your Email',
      `<p style="color:var(--text2);margin-bottom:16px">A verification link has been sent to <strong>${esc(email)}</strong>. Please check your email and click the verification link to complete your signup.</p>
       <div class="form-group">
        <label class="form-label">Or enter verification code (optional)</label>
        <input class="form-input" id="verify-token" placeholder="Paste your verification token here">
       </div>`,
      `<button class="btn btn-ghost" onclick="Modal.close()">Close</button>
       <button class="btn btn-primary" onclick="App.verifyEmailToken()">Verify Token</button>
       <button class="btn btn-ghost btn-sm" onclick="App.resendVerification('${email}')" style="margin-top:10px">Resend Email</button>`,
      true);
  },

  async verifyEmailToken(){
    const token = $('verify-token')?.value.trim();
    if(!token) return alert('Please enter a verification token or check your email');

    try {
      const result = await fetchBackend('/users/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });

      localStorage.setItem('token', result.token);
      localStorage.setItem('currentUser', JSON.stringify({
        id: result.user.id,
        name: result.user.username,
        email: result.user.email,
        role: result.user.role || 'viewer'
      }));
      Modal.close();
      alert(result.message);
      await loadBackendData();
      this.openPage('dashboard');
      this.updateTaskBadge();
    } catch (err) {
      alert('Verification failed: ' + err.message);
    }
  },

  async resendVerification(email){
    try {
      const result = await fetchBackend('/users/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      alert(result.message);
    } catch (err) {
      alert('Resend failed: ' + err.message);
    }
  },

  // â”€â”€ FILTERS â”€â”€
  filterProjects(){
    const s=($('proj-search')||{}).value||'';
    const st=($('proj-status')||{}).value||'';
    document.querySelectorAll('[id^=pcard-]').forEach(el=>{
      const id=parseInt(el.id.replace('pcard-',''));
      const p=DB.projects.find(x=>x.id===id);
      if(!p)return;
      const show=(p.name.toLowerCase().includes(s.toLowerCase())||p.location.toLowerCase().includes(s.toLowerCase()))&&(!st||p.status===st);
      el.style.display=show?'':'none';
    });
  },
  filterBen(){
    _benPage=1;
    const s=($('ben-search')||{}).value||'';
    const fp=($('ben-proj')||{}).value||'All';
    const fs=($('ben-sex')||{}).value||'All';
    const fit=($('ben-int-type')||{}).value||'All';
    const fin=($('ben-int-name')||{}).value||'All';
    const floan=($('ben-loan')||{}).value||'All';
    const fmarket=($('ben-market')||{}).value||'All';
    $('content').innerHTML=renderBeneficiaries(s,fp,fs,fit,fin,floan,fmarket);
  },
  filterInd(){
    const s=($('ind-search')||{}).value||'';
    const fp=($('ind-proj')||{}).value||'All';
    $('content').innerHTML=renderIndicators(s,fp);
  },
  filterLearn(){
    const ft=($('learn-type')||{}).value||'All';
    const fp=($('learn-proj')||{}).value||'All';
    $('content').innerHTML=renderLearning(ft,fp);
  },
  filterField(){
    const fp=($('field-proj')||{}).value||'All';
    $('content').innerHTML=renderField(fp);
  },
  filterTasks(f){
    $('content').innerHTML=renderTasks(f);
  },
  setAdminTab(tab){
    _adminTab = tab || 'users';
    if (this.currentPage === 'admin') this.renderPage();
  },
  _buildAutomationRulePayloadFromForm() {
    const name = (($('ar-name') || {}).value || '').trim();
    const project = (($('ar-project') || {}).value || 'All').trim() || 'All';
    const trigger = (($('ar-trigger') || {}).value || 'import_beneficiaries').trim();
    const condition = (($('ar-condition') || {}).value || 'always').trim();
    const conditionValueRaw = (($('ar-condition-value') || {}).value || '').trim();
    const action = (($('ar-action') || {}).value || 'create_alert').trim();
    const message = (($('ar-message') || {}).value || '').trim();
    const priority = (($('ar-priority') || {}).value || 'medium').trim();
    const enabled = !!(($('ar-enabled') || {}).checked);

    if (!name) throw new Error('Rule name is required');
    const conditionValue = condition === 'always' ? 0 : (condition === 'type_match' ? conditionValueRaw : Number(conditionValueRaw || 0));
    if (condition !== 'always' && condition !== 'type_match' && Number.isNaN(conditionValue)) {
      throw new Error('Condition value must be a valid number for count conditions');
    }

    const actionParams = action === 'create_alert'
      ? { title: message || 'Automation alert for {project}: {count} records', priority }
      : action === 'create_learning_entry'
        ? { titleTemplate: message || 'Automated insight for {project} ({count} records)', narrativeTemplate: message || 'Automation captured {count} records from {form} on {date}.', type: 'lesson_learned', tags: ['automation'] }
        : { section: 'Progress by Result', narrativeTemplate: message || 'Automation update: {count} records synced for {project} from {form} ({type}).' };

    return {
      name,
      project,
      trigger,
      condition,
      conditionValue,
      action,
      actionParams,
      enabled,
    };
  },
  openAutomationRuleForm(id){
    const isEdit = id !== null && id !== undefined;
    const rule = isEdit ? (DB.automationRules || []).find(r => String(r.id) === String(id)) : null;
    const actions = [
      ['create_alert', 'Create Alert'],
      ['create_learning_entry', 'Create Learning Entry'],
      ['update_donor_report_narrative', 'Update Donor Report Narrative'],
    ];
    const conditions = [
      ['always', 'Always'],
      ['count_gte', 'Count >= N'],
      ['count_lte', 'Count <= N'],
      ['type_match', 'Form Type Match'],
    ];
    const body = `
      <div class="fr2">
        <div class="form-group"><label class="form-label">Rule Name</label><input class="form-input" id="ar-name" value="${esc((rule || {}).name || '')}" placeholder="e.g. Large import spike alert"></div>
        <div class="form-group"><label class="form-label">Project</label><select class="form-select" id="ar-project"><option value="All" ${(rule || {}).project === 'All' || !rule ? 'selected' : ''}>All</option>${DB.projects.map(p=>`<option value="${esc(p.name)}" ${(rule || {}).project===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div>
      </div>
      <div class="fr2">
        <div class="form-group"><label class="form-label">Trigger</label><select class="form-select" id="ar-trigger"><option value="import_beneficiaries" ${(rule || {}).trigger==='import_beneficiaries' || !rule ? 'selected' : ''}>Import Beneficiaries</option><option value="kobo_sync" ${(rule || {}).trigger==='kobo_sync' ? 'selected' : ''}>KoBo Sync</option></select></div>
        <div class="form-group"><label class="form-label">Condition</label><select class="form-select" id="ar-condition">${conditions.map(([v,l])=>`<option value="${v}" ${(rule || {}).condition===v || (!rule && v==='always') ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      </div>
      <div class="fr2">
        <div class="form-group"><label class="form-label">Condition Value</label><input class="form-input" id="ar-condition-value" value="${esc(String((rule || {}).conditionValue ?? 0))}" placeholder="0"></div>
        <div class="form-group"><label class="form-label">Action</label><select class="form-select" id="ar-action">${actions.map(([v,l])=>`<option value="${v}" ${(rule || {}).action===v || (!rule && v==='create_alert') ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Message Template</label><input class="form-input" id="ar-message" value="${esc(((rule || {}).actionParams || {}).title || ((rule || {}).actionParams || {}).titleTemplate || ((rule || {}).actionParams || {}).narrativeTemplate || '')}" placeholder="Use {count}, {project}, {date}, {form}, {type}"></div>
      <div class="form-group"><label class="form-label">Priority (for alerts)</label><select class="form-select" id="ar-priority"><option value="low" ${((rule||{}).actionParams||{}).priority==='low'?'selected':''}>Low</option><option value="medium" ${!rule || !((rule||{}).actionParams||{}).priority || ((rule||{}).actionParams||{}).priority==='medium'?'selected':''}>Medium</option><option value="high" ${((rule||{}).actionParams||{}).priority==='high'?'selected':''}>High</option></select></div>
      <label style="display:flex;gap:8px;align-items:center;margin-top:4px"><input type="checkbox" id="ar-enabled" ${(rule || {}).enabled || !rule ? 'checked' : ''}> Enable rule</label>
      <div style="font-size:11px;color:var(--text3);margin-top:6px">Template variables: {count}, {project}, {date}, {form}, {type}</div>
    `;
    Modal.open(isEdit ? 'Edit Automation Rule' : 'Add Automation Rule', body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-ghost" onclick="App.testAutomationRule('${isEdit ? rule.id : ''}', true)">Test Rule</button><button class="btn btn-primary" onclick="App.saveAutomationRule('${isEdit ? rule.id : ''}')">${isEdit ? 'Save Changes' : 'Create Rule'}</button>`);
  },
  async saveAutomationRule(id){
    try {
      const payload = this._buildAutomationRulePayloadFromForm();
      let saved;
      if (id) {
        saved = await fetchBackend(`/admin/automation-rules/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        addAudit('Updated automation rule: ' + saved.name, 'update');
      } else {
        saved = await fetchBackend('/admin/automation-rules', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        addAudit('Created automation rule: ' + saved.name, 'create');
      }

      const i = (DB.automationRules || []).findIndex(r => String(r.id) === String(saved.id));
      if (i >= 0) DB.automationRules[i] = saved;
      else (DB.automationRules = DB.automationRules || []).push(saved);

      Modal.close();
      if (this.currentPage === 'admin') this.renderPage();
    } catch (err) {
      alert('Failed to save automation rule: ' + err.message);
    }
  },
  async toggleAutomationRule(id, enabled){
    const rule = (DB.automationRules || []).find(r => String(r.id) === String(id));
    if (!rule) return;
    const previous = rule.enabled;
    rule.enabled = !!enabled;
    if (this.currentPage === 'admin') this.renderPage();
    try {
      const updated = await fetchBackend(`/admin/automation-rules/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ enabled: !!enabled }),
      });
      Object.assign(rule, updated);
      addAudit(`${rule.enabled ? 'Enabled' : 'Disabled'} automation rule: ${rule.name}`, 'update');
      if (this.currentPage === 'admin') this.renderPage();
    } catch (err) {
      rule.enabled = previous;
      if (this.currentPage === 'admin') this.renderPage();
      alert('Failed to update rule status: ' + err.message);
    }
  },
  deleteAutomationRule(id){
    const rule = (DB.automationRules || []).find(r => String(r.id) === String(id));
    if (!rule) return;
    Modal.confirm(`Delete automation rule "${esc(rule.name)}"?`, async () => {
      try {
        await fetchBackend(`/admin/automation-rules/${id}`, { method: 'DELETE' });
        DB.automationRules = (DB.automationRules || []).filter(r => String(r.id) !== String(id));
        addAudit('Deleted automation rule: ' + rule.name, 'delete');
        if (this.currentPage === 'admin') this.renderPage();
      } catch (err) {
        alert('Failed to delete automation rule: ' + err.message);
      }
    });
  },
  testAutomationRule(id, useDraft = false){
    let rule;
    try {
      if (useDraft) {
        rule = this._buildAutomationRulePayloadFromForm();
        rule.id = id || 'draft';
        this._automationRuleDraftForTest = { ...rule };
      } else {
        rule = (DB.automationRules || []).find(r => String(r.id) === String(id));
      }
    } catch (err) {
      return alert('Cannot test this rule yet: ' + err.message);
    }
    if (!rule) return alert('Rule not found');

    const body = `
      <div class="fr2">
        <div class="form-group"><label class="form-label">Trigger</label><select class="form-select" id="ar-test-trigger"><option value="import_beneficiaries" ${rule.trigger==='import_beneficiaries'?'selected':''}>Import Beneficiaries</option><option value="kobo_sync" ${rule.trigger==='kobo_sync'?'selected':''}>KoBo Sync</option></select></div>
        <div class="form-group"><label class="form-label">Project</label><input class="form-input" id="ar-test-project" value="${esc(rule.project || 'All')}"></div>
      </div>
      <div class="fr2">
        <div class="form-group"><label class="form-label">Record Count</label><input class="form-input" id="ar-test-count" type="number" value="100"></div>
        <div class="form-group"><label class="form-label">Form Type</label><input class="form-input" id="ar-test-type" value="Indicator Data"></div>
      </div>
      <div class="form-group"><label class="form-label">Form Name</label><input class="form-input" id="ar-test-form" value="Sample KoBo Form"></div>
      <div id="ar-test-output" style="background:var(--bg3);padding:10px;border-radius:var(--r);font-size:12px;color:var(--text2)">Click Run Preview to evaluate this rule.</div>
    `;

    Modal.open('Test Automation Rule', body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Close</button><button class="btn btn-primary" onclick="App.runAutomationRulePreview('${String(rule.id)}', ${useDraft ? 'true' : 'false'})">Run Preview</button>`);
  },
  runAutomationRulePreview(id, useDraft = false){
    let rule;
    try {
      if (useDraft) {
        rule = this._automationRuleDraftForTest ? { ...this._automationRuleDraftForTest } : null;
      } else {
        rule = (DB.automationRules || []).find(r => String(r.id) === String(id));
      }
    } catch (err) {
      const outErr = $('ar-test-output');
      if (outErr) outErr.innerHTML = `<span style="color:var(--red)">Invalid rule draft: ${esc(err.message)}</span>`;
      return;
    }
    if (!rule) return;

    const ctx = {
      trigger: (($('ar-test-trigger') || {}).value || 'import_beneficiaries').trim(),
      project: (($('ar-test-project') || {}).value || 'All').trim() || 'All',
      count: Number((($('ar-test-count') || {}).value || 0)),
      formName: (($('ar-test-form') || {}).value || '').trim(),
      formType: (($('ar-test-type') || {}).value || '').trim(),
    };

    const result = AutomationEngine.preview(rule, ctx);
    const out = $('ar-test-output');
    if (!out) return;
    out.innerHTML = `
      <div><strong>Rule:</strong> ${esc(rule.name || 'Draft rule')}</div>
      <div><strong>Trigger match:</strong> ${result.passesTrigger ? 'Yes' : 'No'}</div>
      <div><strong>Condition match:</strong> ${result.passesCondition ? 'Yes' : 'No'}</div>
      <div><strong>Project match:</strong> ${result.passesProject ? 'Yes' : 'No'}</div>
      <div><strong>Would execute:</strong> ${result.wouldRun ? 'Yes' : 'No'}</div>
      <div style="margin-top:8px"><strong>Action preview:</strong> ${esc(result.actionPreview)}</div>
    `;
  },
  benPage(p){
    _benPage=p;
    const s=($('ben-search')||{}).value||'';
    const fp=($('ben-proj')||{}).value||'All';
    const fs=($('ben-sex')||{}).value||'All';
    const fit=($('ben-int-type')||{}).value||'All';
    const fin=($('ben-int-name')||{}).value||'All';
    const floan=($('ben-loan')||{}).value||'All';
    const fmarket=($('ben-market')||{}).value||'All';
    $('content').innerHTML=renderBeneficiaries(s,fp,fs,fit,fin,floan,fmarket);
  },

  // â”€â”€ PROJECT ACTIONS â”€â”€
  viewProject(id){_selProject=DB.projects.find(p=>p.id===id);_projTab='overview';this.renderPage();},
  backToProjects(){_selProject=null;this.renderPage();},
  setProjTab(t){_projTab=t;this.renderPage();},
  openProjectForm(id){
    const p = id ? DB.projects.find(x => x.id === id) : {
      status: 'planning',
      start_date: '',
      end_date: '',
      budget: 0,
      budget_currency: 'USD',
      total_budget: 0,
      donors: [],
      partners: [],
      lead_agency: '',
      executing_agency: '',
      funding_sources: [],
      co_financiers: [],
      operating_location: '',
      duration: '',
      key_activities: [],
      key_indicators: [],
      target_beneficiaries: 0,
      target_households: 0,
      target_individuals: 0,
      restoration_area: 0,
      restoration_area_unit: 'hectares'
    };

    const body = `
      <div class="fr2">
        <div class="form-group"><label class="form-label">Short Name *</label><input class="form-input" id="pf-name" value="${esc(p.name || '')}" required></div>
        <div class="form-group"><label class="form-label">Status</label><select class="form-select" id="pf-status">
          <option value="planning"${p.status === 'planning' ? ' selected' : ''}>Planning</option>
          <option value="active"${p.status === 'active' ? ' selected' : ''}>Active</option>
          <option value="completed"${p.status === 'completed' ? ' selected' : ''}>Completed</option>
        </select></div>
      </div>

      <div class="form-group"><label class="form-label">Full Project Name</label><input class="form-input" id="pf-full-name" value="${esc(p.full_name || '')}"></div>

      <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="pf-description" rows="3">${esc(p.description || '')}</textarea></div>

      <div class="fr2">
        <div class="form-group"><label class="form-label">Location</label><input class="form-input" id="pf-location" value="${esc(p.location || '')}"></div>
        <div class="form-group"><label class="form-label">Operating Location</label><input class="form-input" id="pf-operating-location" value="${esc(p.operating_location || '')}"></div>
      </div>

      <div class="fr2">
        <div class="form-group"><label class="form-label">Start Date</label><input type="date" class="form-input" id="pf-start-date" value="${p.start_date || ''}"></div>
        <div class="form-group"><label class="form-label">End Date</label><input type="date" class="form-input" id="pf-end-date" value="${p.end_date || ''}"></div>
      </div>

      <div class="form-group"><label class="form-label">Duration</label><input class="form-input" id="pf-duration" value="${esc(p.duration || '')}"></div>

      <div class="fr3">
        <div class="form-group"><label class="form-label">Total Budget</label><input type="number" class="form-input" id="pf-total-budget" value="${p.total_budget || p.budget || 0}" step="0.01"></div>
        <div class="form-group"><label class="form-label">Budget Currency</label><select class="form-select" id="pf-budget-currency">
          <option value="USD"${(p.budget_currency || 'USD') === 'USD' ? ' selected' : ''}>USD</option>
          <option value="EUR"${p.budget_currency === 'EUR' ? ' selected' : ''}>EUR</option>
          <option value="RWF"${p.budget_currency === 'RWF' ? ' selected' : ''}>RWF</option>
        </select></div>
        <div class="form-group"><label class="form-label">Restoration Area</label><input type="number" class="form-input" id="pf-restoration-area" value="${p.restoration_area || 0}" step="0.01"></div>
      </div>

      <div class="fr2">
        <div class="form-group"><label class="form-label">Restoration Area Unit</label><select class="form-select" id="pf-restoration-area-unit">
          <option value="hectares"${(p.restoration_area_unit || 'hectares') === 'hectares' ? ' selected' : ''}>Hectares</option>
          <option value="acres"${p.restoration_area_unit === 'acres' ? ' selected' : ''}>Acres</option>
          <option value="km2"${p.restoration_area_unit === 'km2' ? ' selected' : ''}>Square Kilometers</option>
        </select></div>
        <div class="form-group"><label class="form-label">Lead Agency</label><input class="form-input" id="pf-lead-agency" value="${esc(p.lead_agency || '')}"></div>
      </div>

      <div class="form-group"><label class="form-label">Executing Agency</label><input class="form-input" id="pf-executing-agency" value="${esc(p.executing_agency || '')}"></div>

      <div class="fr3">
        <div class="form-group"><label class="form-label">Target Beneficiaries</label><input type="number" class="form-input" id="pf-target-beneficiaries" value="${p.target_beneficiaries || 0}"></div>
        <div class="form-group"><label class="form-label">Target Households</label><input type="number" class="form-input" id="pf-target-households" value="${p.target_households || 0}"></div>
        <div class="form-group"><label class="form-label">Target Individuals</label><input type="number" class="form-input" id="pf-target-individuals" value="${p.target_individuals || 0}"></div>
      </div>

      <div class="form-group"><label class="form-label">Donors (comma-separated)</label><input class="form-input" id="pf-donors" value="${esc((p.donors || []).join(', '))}"></div>

      <div class="form-group"><label class="form-label">Partners (comma-separated)</label><input class="form-input" id="pf-partners" value="${esc((p.partners || []).join(', '))}"></div>

      <div class="form-group"><label class="form-label">Co-financiers (comma-separated)</label><input class="form-input" id="pf-co-financiers" value="${esc((p.co_financiers || []).join(', '))}"></div>

      <div class="form-group"><label class="form-label">Funding Sources (comma-separated)</label><input class="form-input" id="pf-funding-sources" value="${esc((p.funding_sources || []).join(', '))}"></div>

      <div class="form-group"><label class="form-label">Key Activities (one per line)</label><textarea class="form-textarea" id="pf-key-activities" rows="4">${esc((p.key_activities || []).join('\n'))}</textarea></div>

      <div class="form-group"><label class="form-label">Key Indicators & Results (one per line)</label><textarea class="form-textarea" id="pf-key-indicators" rows="4">${esc((p.key_indicators || []).join('\n'))}</textarea></div>
    `;

    Modal.open(id ? 'Edit Project' : 'New Project', body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveProject(${id || 'null'})">Save Project</button>`, true);
  },
  saveProject(id){
    const rec = {
      name: $('pf-name').value.trim(),
      full_name: $('pf-full-name').value.trim(),
      description: $('pf-description').value.trim(),
      status: $('pf-status').value,
      start_date: $('pf-start-date').value,
      end_date: $('pf-end-date').value,
      location: $('pf-location').value.trim(),
      operating_location: $('pf-operating-location').value.trim(),
      duration: $('pf-duration').value.trim(),
      total_budget: +$('pf-total-budget').value || 0,
      budget_currency: $('pf-budget-currency').value,
      restoration_area: +$('pf-restoration-area').value || 0,
      restoration_area_unit: $('pf-restoration-area-unit').value,
      lead_agency: $('pf-lead-agency').value.trim(),
      executing_agency: $('pf-executing-agency').value.trim(),
      target_beneficiaries: +$('pf-target-beneficiaries').value || 0,
      target_households: +$('pf-target-households').value || 0,
      target_individuals: +$('pf-target-individuals').value || 0,
      donors: $('pf-donors').value.split(',').map(s => s.trim()).filter(Boolean),
      partners: $('pf-partners').value.split(',').map(s => s.trim()).filter(Boolean),
      co_financiers: $('pf-co-financiers').value.split(',').map(s => s.trim()).filter(Boolean),
      funding_sources: $('pf-funding-sources').value.split(',').map(s => s.trim()).filter(Boolean),
      key_activities: $('pf-key-activities').value.split('\n').map(s => s.trim()).filter(Boolean),
      key_indicators: $('pf-key-indicators').value.split('\n').map(s => s.trim()).filter(Boolean)
    };

    if (!rec.name) return alert('Project name is required');

    if (id) {
      // Update existing project
      const existingProject = DB.projects.find(p => p.id === id);
      Object.assign(existingProject, rec, { updated_at: new Date().toISOString() });
      const alignedDonor = getProjectLeadAgency(rec.name);
      DB.donorReports = DB.donorReports.map(report =>
        projectMatches(report.project, rec)
          ? { ...report, donor: alignedDonor || report.donor }
          : report
      );
      addAudit('Updated project ' + rec.name, 'update');
    } else {
      // Create new project
      rec.id = newId();
      rec.created_at = new Date().toISOString();
      DB.projects.push(rec);
      addAudit('Created project ' + rec.name, 'create');
    }

    Modal.close();
    this.renderPage();
  },
  deleteProject(id){Modal.confirm('Delete this project? This cannot be undone.',()=>{DB.projects=DB.projects.filter(p=>p.id!==id);addAudit('Deleted project id '+id,'delete');App.renderPage();});},

  // â”€â”€ INDICATOR ACTIONS â”€â”€
  openIndicatorForm(id, projectName=''){
    const defaultProject = projectName || DB.projects[0]?.name || '';
    const ind=id?DB.indicators.find(x=>x.id===id):{project:defaultProject,disagg:'Sex',baseline:0,target:0,current:0,unit:'farmers',frequency:'Quarterly',responsible:'M&E Officer',source:''};
    const body=`
      <div class="fr2"><div class="form-group"><label class="form-label">Code</label><input class="form-input" id="if-code" value="${esc(ind.code||'')}"></div>
      <div class="form-group"><label class="form-label">Project</label><select class="form-select" id="if-proj">${DB.projects.map(p=>`<option${ind.project===p.name?' selected':''}>${p.name}</option>`).join('')}</select></div></div>
      <div class="form-group"><label class="form-label">Indicator Name / Definition</label><input class="form-input" id="if-name" value="${esc(ind.name||'')}"></div>
      <div class="fr3"><div class="form-group"><label class="form-label">Baseline</label><input type="number" class="form-input" id="if-base" value="${ind.baseline||0}"></div>
      <div class="form-group"><label class="form-label">Target</label><input type="number" class="form-input" id="if-tgt" value="${ind.target||0}"></div>
      <div class="form-group"><label class="form-label">Current Value</label><input type="number" class="form-input" id="if-cur" value="${ind.current||0}"></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Unit</label><input class="form-input" id="if-unit" value="${esc(ind.unit||'')}"></div>
      <div class="form-group"><label class="form-label">Disaggregation</label><input class="form-input" id="if-disagg" value="${esc(ind.disagg||'')}"></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Data Source</label><input class="form-input" id="if-src" value="${esc(ind.source||'')}"></div>
      <div class="form-group"><label class="form-label">Frequency</label><select class="form-select" id="if-freq"><option${ind.frequency==='Monthly'?' selected':''}>Monthly</option><option${ind.frequency==='Quarterly'?' selected':''}>Quarterly</option><option${ind.frequency==='Bi-annual'?' selected':''}>Bi-annual</option><option${ind.frequency==='Annual'?' selected':''}>Annual</option></select></div></div>
      <div class="form-group"><label class="form-label">Responsible Person</label><input class="form-input" id="if-resp" value="${esc(ind.responsible||'')}"></div>`;
    Modal.open(id?'Edit Indicator':'Add Indicator',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveIndicator(${id||'null'})">Save</button>`,true);
  },
  saveIndicator(id){
    const rec={code:$('if-code').value.trim(),project:$('if-proj').value,name:$('if-name').value.trim(),baseline:+$('if-base').value,target:+$('if-tgt').value,current:+$('if-cur').value,unit:$('if-unit').value,disagg:$('if-disagg').value,source:$('if-src').value,frequency:$('if-freq').value,responsible:$('if-resp').value};
    if(!rec.name)return alert('Indicator name required');
    if(id){Object.assign(DB.indicators.find(x=>x.id===id),rec,{id});addAudit('Updated indicator '+rec.code,'update');}
    else{rec.id=newId();DB.indicators.push(rec);addAudit('Added indicator '+rec.code,'create');}
    Modal.close();this.renderPage();
  },
  deleteIndicator(id){Modal.confirm('Delete this indicator?',()=>{DB.indicators=DB.indicators.filter(x=>x.id!==id);addAudit('Deleted indicator id '+id,'delete');App.renderPage();});},

  // â”€â”€ BENEFICIARY ACTIONS â”€â”€
  openBenForm(id){
    const b=id?DB.beneficiaries.find(x=>x.identifier===id||x.id===id):{id:'F'+String(newId()).slice(-4),sex:'F',age:'',cooperative:'',province:'Eastern',district:'',sector:'',cell:'',village:'',phone:'',status:'active',project:DB.projects[0]?.name||'',intervention_type:'Training',intervention_name:'',intervention_date:'',accessed_loan:false,accessed_market:false};
    const body=`
      <div class="fr2"><div class="form-group"><label class="form-label">Farmer ID</label><input class="form-input" id="bf-id" value="${esc(b.id||'')}"></div>
      <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="bf-name" value="${esc(b.name||'')}"></div></div>
      <div class="fr3"><div class="form-group"><label class="form-label">Sex</label><select class="form-select" id="bf-sex"><option value="F"${b.sex==='F'?' selected':''}>Female</option><option value="M"${b.sex==='M'?' selected':''}>Male</option></select></div>
      <div class="form-group"><label class="form-label">Age</label><input type="number" class="form-input" id="bf-age" value="${b.age||''}"></div>
      <div class="form-group"><label class="form-label">Status</label><select class="form-select" id="bf-status"><option${b.status==='active'?' selected':''}>active</option><option${b.status==='inactive'?' selected':''}>inactive</option></select></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Cooperative</label><input class="form-input" id="bf-coop" value="${esc(b.cooperative||'')}"></div>
      <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="bf-phone" value="${esc(b.phone||'')}"></div></div>
      <div class="fr3"><div class="form-group"><label class="form-label">Province</label><input class="form-input" id="bf-prov" value="${esc(b.province||'')}"></div>
      <div class="form-group"><label class="form-label">District</label><input class="form-input" id="bf-dist" value="${esc(b.district||'')}"></div>
      <div class="form-group"><label class="form-label">Sector</label><input class="form-input" id="bf-sect" value="${esc(b.sector||'')}"></div></div>
      <div class="form-group"><label class="form-label">Project</label><select class="form-select" id="bf-proj">${DB.projects.map(p=>`<option${b.project===p.name?' selected':''}>${p.name}</option>`).join('')}</select></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Intervention Type</label><input class="form-input" id="bf-int-type" value="${esc(b.intervention_type||'') || 'Training'}" placeholder="e.g. Training, Financial Service"></div>
      <div class="form-group"><label class="form-label">Intervention Name</label><input class="form-input" id="bf-int-name" value="${esc(b.intervention_name||'')}" placeholder="e.g. Farming as Business (FaaB)"></div></div>
      <div class="fr3"><div class="form-group"><label class="form-label">Intervention Date</label><input type="date" class="form-input" id="bf-int-date" value="${esc(b.intervention_date||'')}"></div>
      <label style="display:flex;align-items:center;gap:8px;margin-top:22px"><input type="checkbox" id="bf-loan" ${b.accessed_loan?'checked':''}> Accessed Loan</label>
      <label style="display:flex;align-items:center;gap:8px;margin-top:22px"><input type="checkbox" id="bf-market" ${b.accessed_market?'checked':''}> Accessed Market</label></div>`;
    Modal.open(id?'Edit Beneficiary':'Add Beneficiary',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveBen('${id||''}')">Save</button>`,true);
  },
  saveBen(id){
    const rec={
      id:$('bf-id').value.trim(),
      name:$('bf-name').value.trim(),
      sex:$('bf-sex').value,
      age:+$('bf-age').value,
      cooperative:$('bf-coop').value.trim(),
      phone:$('bf-phone').value.trim(),
      province:$('bf-prov').value.trim(),
      district:$('bf-dist').value.trim(),
      sector:$('bf-sect').value.trim(),
      status:$('bf-status').value,
      project:$('bf-proj').value,
      intervention_type:$('bf-int-type').value.trim(),
      intervention_name:$('bf-int-name').value.trim(),
      intervention_date:$('bf-int-date').value,
      accessed_loan:($('bf-loan')||{}).checked,
      accessed_market:($('bf-market')||{}).checked,
      record_source:'manual'
    };
    if(!rec.name||!rec.id)return alert('Name and ID required');
    if(id){const idx=DB.beneficiaries.findIndex(x=>x.identifier===id||x.id===id);if(idx>=0)DB.beneficiaries[idx]=rec;addAudit('Updated beneficiary '+rec.name,'update');}
    else{if(DB.beneficiaries.find(x=>x.identifier===rec.id||x.id===rec.id))return alert('ID already exists');DB.beneficiaries.push(rec);addAudit('Added beneficiary '+rec.name,'create');}
    Modal.close();this.renderPage();
  },
  deleteBen(id){Modal.confirm('Delete beneficiary '+id+'?',()=>{DB.beneficiaries=DB.beneficiaries.filter(x=>x.identifier!==id&&x.id!==id);addAudit('Deleted beneficiary '+id,'delete');App.renderPage();});},

  // â”€â”€ LEARNING ACTIONS â”€â”€
  openLearningForm(id){
    const e=id?DB.learningLog.find(x=>x.id===id):{project:DB.projects[0]?.name||'',date:new Date().toISOString().slice(0,10),type:'lesson_learned',tags:[],narrative:'',indicator:''};
    const typeOpts=['best_practice','lesson_learned','challenge','risk','recommendation'];
    const typeLabels={best_practice:'Best Practice',lesson_learned:'Lesson Learned',challenge:'Challenge',risk:'Risk',recommendation:'Recommendation'};
    const body=`
      <div class="form-group"><label class="form-label">Title</label><input class="form-input" id="lf-title" value="${esc(e.title||'')}"></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Project</label><select class="form-select" id="lf-proj">${DB.projects.map(p=>`<option${e.project===p.name?' selected':''}>${p.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Type</label><select class="form-select" id="lf-type">${typeOpts.map(t=>`<option value="${t}"${e.type===t?' selected':''}>${typeLabels[t]}</option>`).join('')}</select></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Date</label><input type="date" class="form-input" id="lf-date" value="${e.date||''}"></div>
      <div class="form-group"><label class="form-label">Linked Indicator (optional)</label><input class="form-input" id="lf-ind" value="${esc(e.indicator||'')}" placeholder="e.g. TREPA-O1.1"></div></div>
      <div class="form-group"><label class="form-label">Narrative</label><textarea class="form-textarea" id="lf-nar" rows="4">${esc(e.narrative||'')}</textarea></div>
      <div class="form-group"><label class="form-label">Tags (comma-separated)</label><input class="form-input" id="lf-tags" value="${esc((e.tags||[]).join(', '))}"></div>`;
    Modal.open(id?'Edit Learning Entry':'New Learning Entry',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveLearning(${id||'null'})">Save Entry</button>`,true);
  },
  saveLearning(id){
    const rec={title:$('lf-title').value.trim(),project:$('lf-proj').value,type:$('lf-type').value,date:$('lf-date').value,narrative:$('lf-nar').value.trim(),indicator:$('lf-ind').value.trim(),tags:$('lf-tags').value.split(',').map(s=>s.trim()).filter(Boolean)};
    if(!rec.title)return alert('Title required');
    if(id){Object.assign(DB.learningLog.find(x=>x.id===id),rec,{id});addAudit('Updated learning entry: '+rec.title,'update');}
    else{rec.id=newId();DB.learningLog.push(rec);addAudit('Added learning entry: '+rec.title,'create');}
    Modal.close();this.renderPage();
  },
  deleteLearning(id){Modal.confirm('Delete this learning entry?',()=>{DB.learningLog=DB.learningLog.filter(x=>x.id!==id);addAudit('Deleted learning entry id '+id,'delete');App.renderPage();});},

  // â”€â”€ FIELD ACTIVITY ACTIONS â”€â”€
  openFieldForm(id, projectName=''){
    const defaultProject = projectName || DB.projects[0]?.name || '';
    const a=id?DB.fieldActivities.find(x=>x.id===id):{project:defaultProject,type:'Training',status:'planned',team:[],plannedDate:new Date().toISOString().slice(0,10),actualDate:'',outputs:'',findings:''};
    const types=['Training','Monitoring Visit','Focus Group Discussion','Farmer Field School','Community Meeting','Data Collection'];
    const body=`
      <div class="fr2"><div class="form-group"><label class="form-label">Project</label><select class="form-select" id="ff-proj">${DB.projects.map(p=>`<option${a.project===p.name?' selected':''}>${p.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Activity Type</label><select class="form-select" id="ff-type">${types.map(t=>`<option${a.type===t?' selected':''}>${t}</option>`).join('')}</select></div></div>
      <div class="form-group"><label class="form-label">Location (District, Sector)</label><input class="form-input" id="ff-loc" value="${esc(a.location||'')}"></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Planned Date</label><input type="date" class="form-input" id="ff-plan" value="${a.plannedDate||''}"></div>
      <div class="form-group"><label class="form-label">Actual Date</label><input type="date" class="form-input" id="ff-actual" value="${a.actualDate||''}"></div></div>
      <div class="form-group"><label class="form-label">Team Members (comma-separated)</label><input class="form-input" id="ff-team" value="${esc((a.team||[]).join(', '))}"></div>
      <div class="form-group"><label class="form-label">Outputs / Deliverables</label><textarea class="form-textarea" id="ff-out" rows="2">${esc(a.outputs||'')}</textarea></div>
      <div class="form-group"><label class="form-label">Key Findings</label><textarea class="form-textarea" id="ff-find" rows="3">${esc(a.findings||'')}</textarea></div>
      <div class="form-group"><label class="form-label">Status</label><select class="form-select" id="ff-status"><option${a.status==='planned'?' selected':''}>planned</option><option${a.status==='completed'?' selected':''}>completed</option><option${a.status==='cancelled'?' selected':''}>cancelled</option></select></div>`;
    Modal.open(id?'Edit Activity':'Log Field Activity',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveField(${id||'null'})">Save</button>`,true);
  },
  saveField(id){
    const rec={project:$('ff-proj').value,type:$('ff-type').value,location:$('ff-loc').value.trim(),plannedDate:$('ff-plan').value,actualDate:$('ff-actual').value,team:$('ff-team').value.split(',').map(s=>s.trim()).filter(Boolean),outputs:$('ff-out').value.trim(),findings:$('ff-find').value.trim(),status:$('ff-status').value};
    if(!rec.location)return alert('Location required');
    if(id){Object.assign(DB.fieldActivities.find(x=>x.id===id),rec,{id});addAudit('Updated field activity: '+rec.type+' at '+rec.location,'update');}
    else{rec.id=newId();DB.fieldActivities.push(rec);addAudit('Added field activity: '+rec.type+' at '+rec.location,'create');}
    Modal.close();this.renderPage();
  },
  deleteField(id){Modal.confirm('Delete this activity?',()=>{DB.fieldActivities=DB.fieldActivities.filter(x=>x.id!==id);addAudit('Deleted field activity id '+id,'delete');App.renderPage();});},

  // â”€â”€ TASK ACTIONS â”€â”€
  openTaskForm(id){
    const t=id?DB.tasks.find(x=>x.id===id):{project:DB.projects[0]?.name||'',priority:'medium',status:'pending',dueDate:new Date().toISOString().slice(0,10),assignee:DB.currentUser.name,linked:'Indicators'};
    const body=`
      <div class="form-group"><label class="form-label">Task Title</label><input class="form-input" id="tf-title" value="${esc(t.title||'')}"></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Project</label><select class="form-select" id="tf-proj">${DB.projects.map(p=>`<option${t.project===p.name?' selected':''}>${p.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Assignee</label><select class="form-select" id="tf-assign">${DB.users.map(u=>`<option${t.assignee===u.name?' selected':''}>${u.name}</option>`).join('')}</select></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Due Date</label><input type="date" class="form-input" id="tf-due" value="${t.dueDate||''}"></div>
      <div class="form-group"><label class="form-label">Priority</label><select class="form-select" id="tf-prio"><option${t.priority==='high'?' selected':''}>high</option><option${t.priority==='medium'?' selected':''}>medium</option><option${t.priority==='low'?' selected':''}>low</option></select></div></div>
      <div class="form-group"><label class="form-label">Linked To</label><select class="form-select" id="tf-link">
        ${['Donor Report','Indicators','Field Activities','Beneficiary Data','KoBo Integration','Learning Log'].map(l=>`<option${t.linked===l?' selected':''}>${l}</option>`).join('')}</select></div>`;
    Modal.open(id?'Edit Task':'New Task',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveTask(${id||'null'})">Save Task</button>`);
  },
  saveTask(id){
    const rec={title:$('tf-title').value.trim(),project:$('tf-proj').value,assignee:$('tf-assign').value,dueDate:$('tf-due').value,priority:$('tf-prio').value,linked:$('tf-link').value,status:'pending'};
    if(!rec.title)return alert('Task title required');
    if(id){Object.assign(DB.tasks.find(x=>x.id===id),rec,{id,status:DB.tasks.find(x=>x.id===id).status});addAudit('Updated task: '+rec.title,'update');}
    else{rec.id=newId();DB.tasks.push(rec);addAudit('Created task: '+rec.title,'create');}
    Modal.close();this.updateTaskBadge();this.renderPage();
  },
  completeTask(id){const t=DB.tasks.find(x=>x.id===id);if(t){t.status='completed';addAudit('Completed task: '+t.title,'update');}this.updateTaskBadge();this.renderPage();},
  reopenTask(id){const t=DB.tasks.find(x=>x.id===id);if(t)t.status='pending';this.updateTaskBadge();this.renderPage();},
  deleteTask(id){Modal.confirm('Delete this task?',()=>{DB.tasks=DB.tasks.filter(x=>x.id!==id);App.updateTaskBadge();App.renderPage();});},

  // â”€â”€ DONOR REPORT ACTIONS â”€â”€
  openDonorForm(){
    const defaultProjectName = DB.projects[0]?.name || '';
    const defaultLeadAgency = getProjectLeadAgency(defaultProjectName);
    const body=`
      <div class="fr2"><div class="form-group"><label class="form-label">Project</label><select class="form-select" id="dr-proj" onchange="App.syncDonorLeadAgencyInput()">${DB.projects.map(p=>`<option>${p.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Donor (Lead Agency)</label><input class="form-input" id="dr-donor" value="${esc(defaultLeadAgency)}" readonly></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Reporting Period</label><input class="form-input" id="dr-period" placeholder="e.g. Q3 2024"></div>
      <div class="form-group"><label class="form-label">Version</label><input class="form-input" id="dr-ver" value="v1.0"></div></div>
      <div class="form-group"><label class="form-label">Report Sections (one per line)</label><textarea class="form-textarea" id="dr-sects" rows="4">Executive Summary\nProgress by Result\nIndicator Table\nFinancial Summary</textarea></div>`;
    Modal.open('New Donor Report',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveDonorReport()">Create Report</button>`);
    this.syncDonorLeadAgencyInput();
  },
  syncDonorLeadAgencyInput(){
    const projectName = $('dr-proj')?.value || '';
    const donorInput = $('dr-donor');
    if (donorInput) donorInput.value = getProjectLeadAgency(projectName);
  },
  saveDonorReport(){
    const sects=$('dr-sects').value.split('\n').map(s=>s.trim()).filter(Boolean);
    const content={};
    sects.forEach(s=>{content[s]=s.toLowerCase().includes('indicator')||s.toLowerCase().includes('result')||s.toLowerCase().includes('output')?'auto':'';});
    const projectName = $('dr-proj').value;
    const donor = getProjectLeadAgency(projectName);
    const rec={id:newId(),project:projectName,donor,period:$('dr-period').value.trim(),version:$('dr-ver').value.trim(),status:'draft',lastEdited:new Date().toISOString().slice(0,10),content};
    if(!rec.donor)return alert('Selected project has no Lead Agency. Update the project profile first.');
    if(!rec.period)return alert('Reporting period required');
    DB.donorReports.push(rec);addAudit('Created donor report: '+rec.project+' '+rec.period,'create');
    Modal.close();this.renderPage();
  },
  syncAllDonorReportsNow(){
    let updated = 0;
    DB.donorReports = DB.donorReports.map(report => {
      const alignedDonor = getProjectLeadAgency(report.project);
      if (!alignedDonor || alignedDonor === report.donor) return report;
      updated += 1;
      return { ...report, donor: alignedDonor };
    });
    addAudit('Resynced donor reports with project lead agencies (' + updated + ' updated)','update');
    this.renderPage();
    alert(updated ? `Updated ${updated} donor report${updated === 1 ? '' : 's'} from project Lead Agency values.` : 'All donor reports were already aligned with project Lead Agency values.');
  },
  editReport(id){_editingReport=id;this.renderPage();},
  closeReport(){_editingReport=null;this.renderPage();},
  markReportSubmitted(id){const r=DB.donorReports.find(x=>x.id===id);if(r){r.status='submitted';r.lastEdited=new Date().toISOString().slice(0,10);addAudit('Marked report submitted: '+r.project+' '+r.period,'update');}this.renderPage();},
  saveReportSection(id,section,val){const r=DB.donorReports.find(x=>x.id===id);if(r&&r.content)r.content[section]=val;},
  deleteDonor(id){Modal.confirm('Delete this report?',()=>{DB.donorReports=DB.donorReports.filter(x=>x.id!==id);App.renderPage();});},

  // â”€â”€ USER ACTIONS â”€â”€
  openUserForm(id){
    const u=id?DB.users.find(x=>x.id===id):{role:'viewer',projects:'',status:'active'};
    const body=`
      <div class="fr2"><div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="uf-name" value="${esc(u.name||'')}"></div>
      <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="uf-email" value="${esc(u.email||'')}"></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Role</label><select class="form-select" id="uf-role"><option value="admin"${u.role==='admin'?' selected':''}>Admin</option><option value="m_e_officer"${u.role==='m_e_officer'?' selected':''}>M&E Personnel</option><option value="project_coordinator"${u.role==='project_coordinator'?' selected':''}>Project Coordinator</option><option value="project_manager"${u.role==='project_manager'?' selected':''}>Project Manager</option><option value="project_officer"${u.role==='project_officer'?' selected':''}>Project Officer</option><option value="data_clerk"${u.role==='data_clerk'?' selected':''}>Data Clerk</option><option value="viewer"${u.role==='viewer'?' selected':''}>Viewer</option></select></div>
      <div class="form-group"><label class="form-label">Assigned Projects</label><input class="form-input" id="uf-proj" value="${esc(u.projects||'')}" placeholder="e.g. TREPA, KIIWP or All"></div></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Status</label><select class="form-select" id="uf-status"><option${u.status==='active'?' selected':''}>active</option><option${u.status==='inactive'?' selected':''}>inactive</option></select></div>
      ${!id?`<div class="form-group"><label class="form-label">Invitation Flow</label><div class="form-input" style="background:var(--bg3);color:var(--text2)">No password needed. User will complete signup and set password from their side using this email.</div></div>`:'<div></div>'}</div>`;
    Modal.open(id?'Edit User':'Add User',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveUser(${id||'null'})">Save User</button>`);
  },
  async saveUser(id){
    const rec={name:$('uf-name').value.trim(),email:$('uf-email').value.trim(),role:$('uf-role').value,projects:$('uf-proj').value.trim(),status:$('uf-status').value};
    if(!rec.name||!rec.email)return alert('Name and email required');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rec.email)) return alert('Please provide a valid email address');

    try {
      let user;
      if(id){
        const payload = { ...rec };
        user = await fetchBackend(`/admin/users/${id}`, { method:'PUT', body: JSON.stringify(payload) });
        DB.users = DB.users.map(x => x.id === id ? ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          projects: rec.projects || x.projects,
          lastLogin: x.lastLogin || 'Never'
        }) : x);
        addAudit('Updated user '+rec.name,'update');
      } else {
        const payload = { name: rec.name, email: rec.email, role: rec.role, status: rec.status };
        user = await fetchBackend('/admin/users', { method:'POST', body: JSON.stringify(payload) });
        const nextUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          projects: rec.projects,
          lastLogin: 'Never',
          invitePending: true,
          emailVerified: false,
          inviteGeneratedAt: user.invite_generated_at || null,
          verificationExpires: user.verification_expires || null
        };
        const existingIndex = DB.users.findIndex(x => x.id === user.id || x.email === user.email);
        if (existingIndex >= 0) DB.users[existingIndex] = { ...DB.users[existingIndex], ...nextUser };
        else DB.users.push(nextUser);
        addAudit((user.inviteResent ? 'Re-invited user ' : 'Invited user ') + rec.email,'create');
      }
      Modal.close();
      this.setAdminTab('users');
      this.renderPage();
      if (!id) {
        this.showInviteResult(user);
      }
    } catch (err) {
      alert('Save user failed: ' + err.message);
    }
  },
  showInviteResult(user){
    const inviteLink = user.invitePath ? `${window.location.origin}${user.invitePath}` : (user.inviteUrl || user.verifyUrl || '');
    const invalidationNote = user.previousInviteInvalidated ? ' Previous invitation links are now invalid; share only this latest link.' : '';
    const message = (user.message || 'Invitation processed successfully.') + invalidationNote;

    if (!inviteLink) {
      alert(message);
      return;
    }

    Modal.open('Invitation Ready',
      `<div style="display:grid;gap:10px">
        <div style="font-size:13px;color:var(--text2)">${esc(message)}</div>
        <div style="font-size:12px;color:var(--text3)">Share this link with the user:</div>
        <textarea id="invite-link-output" class="form-input" readonly style="min-height:88px;resize:vertical">${esc(inviteLink)}</textarea>
      </div>`,
      `<button class="btn btn-ghost" onclick="Modal.close()">Close</button>
       <button class="btn btn-primary" onclick="App.copyInviteLink()">Copy Link</button>`,
      true);
  },
  async copyInviteLink(){
    const el = $('invite-link-output');
    const text = el ? el.value : '';
    if (!text) return alert('No invitation link available to copy.');
    try {
      await navigator.clipboard.writeText(text);
      alert('Invitation link copied to clipboard.');
    } catch (err) {
      if (el) {
        el.focus();
        el.select();
      }
      alert('Clipboard access failed. The link is selected for manual copy.');
    }
  },
  async resendUserInvite(id){
    try {
      const result = await fetchBackend(`/admin/users/${id}/resend-invite`, { method:'POST' });
      DB.users = DB.users.map(u => u.id===id ? {
        ...u,
        invitePending: true,
        emailVerified: false,
        inviteGeneratedAt: result.invite_generated_at || u.inviteGeneratedAt || null,
        verificationExpires: result.verification_expires || u.verificationExpires || null
      } : u);
      addAudit('Re-invited user '+(result.email||id),'update');
      this.renderPage();
      this.showInviteResult(result);
    } catch (err) {
      alert('Resend invite failed: ' + err.message);
    }
  },
  async _performDeleteUser(id){
    try {
      await fetchBackend(`/admin/users/${id}`, { method:'DELETE' });
      DB.users = DB.users.filter(x=>x.id!==id);
      addAudit('Deleted user '+id,'delete');
      App.renderPage();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  },

  deleteUser(id){
    if(id===1) return alert('Cannot delete admin user');
    Modal.confirm('Delete this user?', function(){ App._performDeleteUser(id); });
  },

  // â”€â”€ INTEGRATION ACTIONS â”€â”€
  async syncIntegration(type){
    const btn = $(`sync-${type}`);
    if(btn){btn.disabled=true;btn.innerHTML=`${ico('refresh',12)} Syncing…`;}

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not signed in. Please sign in again to sync integrations.');
        App.showLogin();
        return;
      }

      const runStep = async (path, label) => {
        const response = await fetchBackend(path, { method: 'POST' });
        return `${label}: ${response.message || 'Completed'}`;
      };

      const statusLines = [];
      switch(type){
        case 'powerbi':
          statusLines.push(await runStep('/integrations/powerbi/indicators', 'Indicators'));
          statusLines.push(await runStep('/integrations/powerbi/dashboard', 'Dashboard'));
          break;
        case 'toladata':
          statusLines.push(await runStep('/integrations/toladata/activities', 'Activities'));
          statusLines.push(await runStep('/integrations/toladata/logframe', 'Logframe'));
          break;
        case 'monday':
          statusLines.push(await runStep('/integrations/monday/tasks', 'Tasks'));
          statusLines.push(await runStep('/integrations/monday/activities', 'Activities'));
          break;
        default:
          throw new Error(`Unsupported integration type: ${type}`);
      }

      addAudit(`Synced ${type} integration`,'update');
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} sync completed successfully.\n\n${statusLines.join('\n')}`);

    } catch (err) {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} sync failed: ${err.message}`);
      console.warn(err);
    } finally {
      if(btn){btn.disabled=false;btn.innerHTML=`${ico('refresh',12)} Sync`;}
    }
  },

  async checkIntegrationStatus(type, statusPath){
    const btn = $(`check-${type}`);
    if(btn){btn.disabled=true;btn.innerHTML=`${ico('link',12)} Checking…`;}

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not signed in. Please sign in again to check integration status.');
        App.showLogin();
        return;
      }

      const result = await fetchBackend(statusPath, { method: 'GET' });
      const title = type === 'powerbi' ? 'Power BI' : type === 'toladata' ? 'TolaData' : 'monday.com';
      alert(`${title} status check succeeded.\n\n${result.message || 'Connection is active.'}`);
    } catch (err) {
      alert(`Status check failed for ${type}: ${err.message}`);
      console.warn(err);
    } finally {
      const labels = {
        powerbi: 'Check Dataset',
        toladata: 'Check Projects',
        monday: 'Check Board'
      };
      if(btn){btn.disabled=false;btn.innerHTML=`${ico('link',12)} ${labels[type] || 'Check'}`;}
    }
  },

  async syncAllIntegrations(){
    const btn = $('sync-all-btn');
    if(btn){btn.disabled=true;btn.innerHTML=`${ico('sync',14)} Syncing All…`;}

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not signed in. Please sign in again to sync integrations.');
        App.showLogin();
        return;
      }

      const result = await fetchBackend('/integrations/sync/all', {method:'POST'});
      addAudit('Synced all integrations','update');

      let message = `${result.message || 'Bulk sync completed.'}\n\n`;
      if(result.data){
        const p = result.data.powerbi || {};
        const t = result.data.toladata || {};
        const m = result.data.monday || {};

        message += `Power BI Indicators: ${p.indicators ? 'OK' : p.error ? `ERROR (${p.error})` : 'SKIPPED'}\n`;
        message += `Power BI Dashboard: ${p.dashboard ? 'OK' : p.error ? `ERROR (${p.error})` : 'SKIPPED'}\n`;
        message += `TolaData Activities: ${t.activities ? 'OK' : t.error ? `ERROR (${t.error})` : 'SKIPPED'}\n`;
        message += `TolaData Logframe: ${t.logframe ? 'OK' : t.error ? `ERROR (${t.error})` : 'SKIPPED'}\n`;
        message += `monday.com Tasks: ${m.tasks ? 'OK' : m.error ? `ERROR (${m.error})` : 'SKIPPED'}\n`;
        message += `monday.com Activities: ${m.activities ? 'OK' : m.error ? `ERROR (${m.error})` : 'SKIPPED'}\n`;
      }

      alert(message);

    } catch (err) {
      alert(`Bulk sync failed: ${err.message}`);
      console.warn(err);
    } finally {
      if(btn){btn.disabled=false;btn.innerHTML=`${ico('sync',14)} Sync All Integrations`;}
    }
  },

  // â”€â”€ KOBO ACTIONS â”€â”€
  async syncKobo(fid){
    const btn=$('sync-'+fid);
    if(btn){btn.disabled=true;btn.innerHTML=`${ico('refresh',12)} Syncing…`;}
    try {
      const f = DB.koboForms.find(x=>x.id===fid);
      if (!f || !f.uid) throw new Error('KoBo form UID is missing. Please reconnect the form with a valid UID.');
      const result = await fetchBackend('/kobo-sync/sync', {
        method:'POST',
        body: JSON.stringify({ formId: f.id, uid: f.uid, type: f.type, project: f.project })
      });
      if(f){
        if (typeof result.syncedCount === 'number') {
          f.submissions += result.syncedCount;
        }
        f.lastSync = new Date().toISOString().slice(0,16).replace('T',' ');
        f.status = 'connected';
        addAudit('Synced KoBo form: '+f.name,'update');
        AutomationEngine.run({
          trigger: 'kobo_sync',
          project: f.project || 'All',
          count: typeof result.syncedCount === 'number' ? result.syncedCount : 0,
          formName: f.name,
          formType: f.type || '',
        });
      }
    } catch (err) {
      alert('KoBo sync failed: '+err.message);
      console.warn(err);
    } finally {
      if(btn){btn.disabled=false;btn.innerHTML=`${ico('refresh',12)} Sync Now`;}
      App.renderPage();
    }
  },
  openKoboForm(){
    const body=`
      <div class="form-group"><label class="form-label">KoBo Form UID</label><input class="form-input" id="kf-uid" placeholder="e.g. aXYZ123abcâ€¦"></div>
      <div class="fr2"><div class="form-group"><label class="form-label">Form Name</label><input class="form-input" id="kf-name" placeholder="Descriptive name"></div>
      <div class="form-group"><label class="form-label">Project</label><select class="form-select" id="kf-proj">${DB.projects.map(p=>`<option>${p.name}</option>`).join('')}</select></div></div>
      <div class="form-group"><label class="form-label">Data Type</label><select class="form-select" id="kf-type"><option>Beneficiary / Farmer Registration</option><option>Field Activity Log</option><option>Indicator Data</option><option>Monitoring Visit</option></select></div>
      <div style="background:var(--bg3);border-radius:var(--r);padding:12px;font-size:12px;color:var(--text3)">${ico('info',14)} Connect the KoBo form UID for the project and sync submissions directly into the platform.</div>`;
    Modal.open('Connect KoBo Form',body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveKoboForm()">Connect &amp; Sync</button>`);
  },
  async saveKoboForm(){
    const uid=$('kf-uid').value.trim();
    const name=$('kf-name').value.trim();
    const project=$('kf-proj').value;
    const type=$('kf-type').value;
    if(!uid) return alert('Form UID is required');
    if(!name) return alert('Form name is required');
    const rec = { id: 'k'+newId(), uid, name, project, type, submissions: 0, lastSync: 'Never', status: 'connected', mappedFields: 0 };
    try {
      await fetchBackend('/kobo-sync/forms', { method:'POST', body: JSON.stringify(rec) });
      DB.koboForms.unshift(rec);
      addAudit('Connected KoBo form: '+name,'create');
      Modal.close();
      App.renderPage();
    } catch (err) {
      alert('Failed to connect KoBo form: '+err.message);
    }
  },
  deleteKoboForm(id){
    Modal.confirm('Disconnect this KoBo form?', async () => {
      try {
        await fetchBackend(`/kobo-sync/forms/${id}`, { method:'DELETE' });
        DB.koboForms = DB.koboForms.filter(x=>x.id!==id);
        App.renderPage();
      } catch (err) {
        alert('Failed to disconnect KoBo form: '+err.message);
      }
    });
  },
  openKoboMapping(id){
    const f = DB.koboForms.find(x=>x.id===id);
    Modal.open('Field Mapping â€” '+f.name, `<p style="color:var(--text2);font-size:13px;margin-bottom:14px">Map KoBo form fields to platform fields. Select the platform table and field for each KoBo field.</p>
      <div id="mapping-editor" style="max-height:400px;overflow-y:auto"></div>`,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveKoboMapping('${id}')">Save Mapping</button>`);
    App.loadKoboMapping(id);
  },
  async loadKoboMapping(id){
    const editor = $('mapping-editor');
    editor.innerHTML = '<div class="db-empty">Loading form fields...</div>';

    try {
      const [fieldsRes, mappingsRes] = await Promise.all([
        fetchBackend(`/kobo-sync/forms/${id}/fields`),
        fetchBackend(`/kobo-sync/forms/${id}/mappings`)
      ]);

      const koboFields = fieldsRes.fields || [];
      const existingMappings = mappingsRes || [];

      const platformFields = {
        farmers: ['name', 'location', 'phone', 'cooperative', 'project', 'province', 'district', 'sector', 'status', 'sex', 'age', 'identifier'],
        field_activities: ['project', 'type', 'location', 'planned_date', 'actual_date', 'team', 'outputs', 'findings', 'status'],
        indicators: ['project', 'code', 'name', 'baseline', 'target_value', 'actual_value', 'unit', 'source', 'frequency', 'responsible', 'disagg']
      };

      const mappingRows = koboFields.map(koboField => {
        const existing = existingMappings.find(m => m.kobo_field === koboField);
        const selectedTable = existing?.platform_table || '';
        const selectedField = existing?.platform_field || '';

        const tableOptions = Object.keys(platformFields).map(table =>
          `<option value="${table}" ${selectedTable === table ? 'selected' : ''}>${table.replace('_', ' ')}</option>`
        ).join('');

        const fieldOptions = selectedTable ? platformFields[selectedTable].map(field =>
          `<option value="${field}" ${selectedField === field ? 'selected' : ''}>${field.replace('_', ' ')}</option>`
        ).join('') : '<option value="">Select table first</option>';

        return `
          <div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--border2);font-size:13px">
            <div style="flex:1;font-family:var(--font-m);color:var(--text)">${esc(koboField)}</div>
            <select class="form-select" style="width:150px" onchange="App.updateMappingFields('${koboField}', this.value)">
              <option value="">Select table</option>${tableOptions}
            </select>
            <select class="form-select mapping-field" style="width:150px" data-kobo="${koboField}">
              ${fieldOptions}
            </select>
          </div>`;
      }).join('');

      editor.innerHTML = mappingRows || '<div class="db-empty">No KoBo fields found. Check the form UID and try again.</div>';

    } catch (err) {
      editor.innerHTML = `<div class="db-empty">Failed to load mapping: ${esc(err.message)}</div>`;
    }
  },
  updateMappingFields(koboField, table){
    const fieldSelect = document.querySelector(`.mapping-field[data-kobo="${koboField}"]`);
    if (!fieldSelect) return;

    const platformFields = {
      farmers: ['name', 'location', 'phone', 'cooperative', 'project', 'province', 'district', 'sector', 'status', 'sex', 'age', 'identifier'],
      field_activities: ['project', 'type', 'location', 'planned_date', 'actual_date', 'team', 'outputs', 'findings', 'status'],
      indicators: ['project', 'code', 'name', 'baseline', 'target_value', 'actual_value', 'unit', 'source', 'frequency', 'responsible', 'disagg']
    };

    const fields = platformFields[table] || [];
    fieldSelect.innerHTML = fields.map(field =>
      `<option value="${field}">${field.replace('_', ' ')}</option>`
    ).join('');
  },
  async saveKoboMapping(id){
    const mappings = [];
    document.querySelectorAll('.mapping-field').forEach(select => {
      const koboField = select.getAttribute('data-kobo');
      const platformField = select.value;
      const tableSelect = select.previousElementSibling;
      const platformTable = tableSelect.value;

      if (platformField && platformTable) {
        mappings.push({
          kobo_field: koboField,
          platform_field: platformField,
          platform_table: platformTable
        });
      }
    });

    try {
      await fetchBackend(`/kobo-sync/forms/${id}/mappings`, { method: 'POST', body: JSON.stringify({ mappings }) });
      const f = DB.koboForms.find(x=>x.id===id);
      if (f) f.mappedFields = mappings.length;
      Modal.close();
      App.renderPage();
    } catch (err) {
      alert('Failed to save mapping: ' + err.message);
    }
  },

  // â”€â”€ EXPORT / IMPORT â”€â”€
  exportCSV(type){
    let rows=[],filename='export.csv';
    if(type==='beneficiaries'){rows=[['ID','Name','Sex','Age','Cooperative','Province','District','Project','Status'],...DB.beneficiaries.map(b=>[b.id,b.name,b.sex,b.age,b.cooperative,b.province,b.district,b.project,b.status])];filename='beneficiaries.csv';}
    else if(type==='indicators'){rows=[['Code','Project','Indicator','Baseline','Target','Current','Unit','Progress%'],...DB.indicators.map(i=>[i.code,i.project,i.name,i.baseline,i.target,i.current,i.unit,pct(i.current,i.target)])];filename='indicators.csv';}
    else if(type==='projects'){rows=[['Name','Full Name','Location','Status','Start','End','Budget','Spent'],...DB.projects.map(p=>[p.name,p.fullName,p.location,p.status,p.startDate,p.endDate,p.budget,p.spent])];filename='projects.csv';}
    else if(type==='learning'){rows=[['Title','Project','Date','Type','Tags','Narrative'],...DB.learningLog.map(l=>[l.title,l.project,l.date,l.type,(l.tags||[]).join(';'),l.narrative])];filename='learning_log.csv';}
    else if(type==='field'){rows=[['Project','Type','Location','PlannedDate','ActualDate','Team','Outputs','Status'],...DB.fieldActivities.map(a=>[a.project,a.type,a.location,a.plannedDate,a.actualDate,(a.team||[]).join(';'),a.outputs,a.status])];filename='field_activities.csv';}
    else{rows=[['IZI M&E Export'],['Generated',new Date().toISOString()]];filename='dashboard_summary.csv';}
    const csv=rows.map(r=>r.map(v=>'"'+String(v||'').replace(/"/g,'""')+'"').join(',')).join('\n');
    const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download=filename;a.click();
    addAudit('Exported '+filename,'update');
  },

  // â”€â”€ DATABASE MANAGEMENT â”€â”€
  refreshDatabase(){
    loadBackendData().then(() => {
      this.renderPage();
      alert('Database data refreshed successfully!');
    }).catch(err => {
      console.error('Failed to refresh database:', err);
      alert('Failed to refresh database data.');
    });
  },

  viewTable(tableId){
    const data = DB[tableId] || [];
    const tableConfig = {
      farmers: {name: 'Farmers', columns: ['id', 'name', 'location', 'created_at']},
      projects: {name: 'Projects', columns: ['id', 'name', 'description', 'status', 'start_date', 'end_date']},
      indicators: {name: 'Indicators', columns: ['id', 'name', 'target_value', 'actual_value']},
      users: {name: 'Users', columns: ['id', 'name', 'email', 'role', 'lastLogin', 'status']},
      tasks: {name: 'Tasks', columns: ['id', 'title', 'project', 'assignee', 'dueDate', 'priority', 'status']}
    };

    const config = tableConfig[tableId];
    if (!config) return alert('Table not found');

    const html = `
<div style="max-height:70vh;overflow-y:auto">
  <table class="db-preview-table" style="width:100%">
    <thead>
      <tr>${config.columns.map(col => `<th>${col.replace('_', ' ').toUpperCase()}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${data.map(row => `
        <tr>${config.columns.map(col => `<td>${esc(row[col] || '')}</td>`).join('')}</tr>
      `).join('')}
    </tbody>
  </table>
</div>
<div style="margin-top:16px;text-align:right">
  <span style="font-size:12px;color:var(--text3)">${data.length} records</span>
</div>
    `;

    Modal.open(`${config.name} Table (${data.length} records)`, html, `<button class="btn btn-ghost" onclick="Modal.close()">Close</button>`);
  },

  addRecord(tableId){
    const tableConfig = {
      farmers: {name: 'Farmer', fields: [
        {key: 'name', label: 'Name', type: 'text', required: true},
        {key: 'location', label: 'Location', type: 'text', required: true}
      ]},
      projects: {name: 'Project', fields: [
        {key: 'name', label: 'Name', type: 'text', required: true},
        {key: 'description', label: 'Description', type: 'textarea'},
        {key: 'status', label: 'Status', type: 'select', options: ['active', 'planning', 'completed']},
        {key: 'start_date', label: 'Start Date', type: 'date'},
        {key: 'end_date', label: 'End Date', type: 'date'}
      ]},
      indicators: {name: 'Indicator', fields: [
        {key: 'name', label: 'Name', type: 'text', required: true},
        {key: 'target_value', label: 'Target Value', type: 'number'},
        {key: 'actual_value', label: 'Actual Value', type: 'number'}
      ]},
      users: {name: 'User', fields: [
        {key: 'username', label: 'Username', type: 'text', required: true},
        {key: 'password_hash', label: 'Password Hash', type: 'password', required: true}
      ]},
      tasks: {name: 'Task', fields: [
        {key: 'title', label: 'Title', type: 'text', required: true},
        {key: 'project_id', label: 'Project ID', type: 'number'},
        {key: 'assigned_to', label: 'Assigned To', type: 'number'},
        {key: 'due_date', label: 'Due Date', type: 'date'},
        {key: 'priority', label: 'Priority', type: 'select', options: ['low', 'medium', 'high']},
        {key: 'is_completed', label: 'Completed', type: 'checkbox'}
      ]}
    };

    const config = tableConfig[tableId];
    if (!config) return alert('Table not supported for adding records');

    const formHtml = config.fields.map(field => {
      let inputHtml = '';
      if (field.type === 'textarea') {
        inputHtml = `<textarea class="form-input" id="add-${field.key}" rows="3">${field.default || ''}</textarea>`;
      } else if (field.type === 'select') {
        inputHtml = `<select class="form-select" id="add-${field.key}">${(field.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
      } else if (field.type === 'checkbox') {
        inputHtml = `<input type="checkbox" id="add-${field.key}" ${field.default ? 'checked' : ''}>`;
      } else {
        inputHtml = `<input type="${field.type}" class="form-input" id="add-${field.key}" value="${field.default || ''}" ${field.required ? 'required' : ''}>`;
      }
      return `<div class="form-group"><label class="form-label">${field.label}${field.required ? ' *' : ''}</label>${inputHtml}</div>`;
    }).join('');

    Modal.open(`Add New ${config.name}`, formHtml, `
      <button class="btn btn-ghost" onclick="Modal.close()">Cancel</button>
      <button class="btn btn-primary" onclick="App.saveNewRecord('${tableId}')">Save Record</button>
    `);
  },

  saveNewRecord(tableId){
    // This would need backend API integration to actually save to database
    alert('This feature requires backend API integration. For now, use the SQL query section to manipulate data directly.');
    Modal.close();
  },

  exportTable(tableId){
    const data = DB[tableId] || [];
    const tableConfig = {
      farmers: {columns: ['id', 'name', 'location', 'created_at']},
      projects: {columns: ['id', 'name', 'description', 'status', 'start_date', 'end_date']},
      indicators: {columns: ['id', 'name', 'target_value', 'actual_value']},
      users: {columns: ['id', 'name', 'email', 'role', 'lastLogin', 'status']},
      tasks: {columns: ['id', 'title', 'project', 'assignee', 'dueDate', 'priority', 'status']}
    };

    const config = tableConfig[tableId];
    if (!config) return alert('Table not found');

    const headers = config.columns;
    const rows = [headers, ...data.map(row => config.columns.map(col => row[col] || ''))];
    
    const csv = rows.map(r => r.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `${tableId}_export.csv`;
    a.click();
    
    addAudit(`Exported ${tableId} table (${data.length} records)`, 'update');
  },

  async executeSQL(){
    const query = $('sql-query')?.value?.trim();
    if (!query) return alert('Please enter a SQL query');

    try {
      const result = await fetchBackend('/debug/sql', {
        method: 'POST',
        body: JSON.stringify({ query })
      });

      const resultsEl = $('sql-results');
      if (result.rows && result.rows.length > 0) {
        const headers = Object.keys(result.rows[0]);
        resultsEl.innerHTML = `
          <div class="db-result-count">${result.rows.length} rows returned</div>
          <table>
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${result.rows.map(row => `<tr>${headers.map(h => `<td>${esc(row[h] || '')}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        `;
      } else {
        resultsEl.innerHTML = '<div class="db-result-count">Query executed successfully (no results)</div>';
      }
    } catch (err) {
      $('sql-results').innerHTML = `<div style="color:var(--red);font-family:var(--font-m)">Error: ${err.message}</div>`;
    }
  },

  async openRecordForm(tableId, id){
    const record = id ? (DB[tableId] || []).find(r => String(r.id) === String(id)) : null;
    const formConfig = {
      farmers: [
        {key:'name',label:'Name',type:'text',required:true},
        {key:'location',label:'Location',type:'text'},
        {key:'project',label:'Project',type:'text'},
        {key:'cooperative',label:'Cooperative',type:'text'},
        {key:'phone',label:'Phone',type:'text'},
        {key:'status',label:'Status',type:'select',options:['active','inactive']}
      ],
      indicators: [
        {key:'name',label:'Indicator Name',type:'text',required:true},
        {key:'target_value',label:'Target Value',type:'number'},
        {key:'actual_value',label:'Actual Value',type:'number'}
      ],
      field_activities: [
        {key:'project',label:'Project',type:'text',required:true},
        {key:'type',label:'Activity Type',type:'text'},
        {key:'location',label:'Location',type:'text'},
        {key:'planned_date',label:'Planned Date',type:'date'},
        {key:'actual_date',label:'Actual Date',type:'date'},
        {key:'team',label:'Team Members',type:'text'},
        {key:'outputs',label:'Outputs',type:'textarea'},
        {key:'status',label:'Status',type:'select',options:['planned','completed','cancelled']}
      ],
      projects: [
        {key:'name',label:'Project Name',type:'text',required:true},
        {key:'description',label:'Description',type:'textarea'},
        {key:'status',label:'Status',type:'select',options:['active','planning','completed']},
        {key:'start_date',label:'Start Date',type:'date'},
        {key:'end_date',label:'End Date',type:'date'}
      ]
    };

    const fields = formConfig[tableId];
    if (!fields) return alert('Unsupported record type');

    const body = fields.map(field => {
      const value = record ? record[field.key] || '' : '';
      if (field.type === 'textarea') {
        return `<div class="form-group"><label class="form-label">${field.label}</label><textarea class="form-textarea" id="rec-${field.key}" rows="3">${esc(value)}</textarea></div>`;
      }
      if (field.type === 'select') {
        return `<div class="form-group"><label class="form-label">${field.label}</label><select class="form-select" id="rec-${field.key}">${field.options.map(opt => `<option value="${opt}"${value===opt?' selected':''}>${opt}</option>`).join('')}</select></div>`;
      }
      return `<div class="form-group"><label class="form-label">${field.label}</label><input class="form-input" id="rec-${field.key}" type="${field.type}" value="${esc(value)}"></div>`;
    }).join('');

    Modal.open(id ? `Edit ${tableId.replace(/_/g,' ')}` : `Add ${tableId.replace(/_/g,' ')}`, body,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.saveRecord('${tableId}', ${id||'null'})">Save</button>`);
  },

  async saveRecord(tableId, id){
    const formConfig = {
      farmers: ['name','location','project','cooperative','phone','status'],
      indicators: ['name','target_value','actual_value'],
      field_activities: ['project','type','location','planned_date','actual_date','team','outputs','status'],
      projects: ['name','description','status','start_date','end_date']
    };
    const fields = formConfig[tableId];
    if (!fields) return alert('Unsupported record type');

    const payload = {};
    fields.forEach(key => { payload[key] = $('rec-'+key)?.value || ''; });
    if (!payload.name && tableId !== 'field_activities') return alert('Name is required');

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/admin/entity/${tableId}/${id}` : `/admin/entity/${tableId}`;
      const result = await fetchBackend(url, { method, body: JSON.stringify(payload) });
      if (id) {
        const index = DB[tableId].findIndex(r => String(r.id) === String(id));
        if (index >= 0) DB[tableId][index] = result;
      } else {
        DB[tableId].push(result);
      }
      addAudit(`${id ? 'Updated' : 'Created'} ${tableId.replace(/_/g,' ')}: ${result.name || result.project || result.title}`, id ? 'update' : 'create');
      Modal.close();
      App.renderPage();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  },

  async deleteRecord(tableId, id){
    if (!confirm('Delete this record?')) return;
    try {
      await fetchBackend(`/admin/entity/${tableId}/${id}`, { method: 'DELETE' });
      DB[tableId] = (DB[tableId] || []).filter(r => String(r.id) !== String(id));
      addAudit(`Deleted ${tableId.replace(/_/g,' ')} id ${id}`, 'delete');
      App.renderPage();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  },

  viewTable(tableId){
    const data = DB[tableId] || [];
    const tableConfig = {
      farmers: {name:'Farmers', columns:['id','name','project','location','cooperative','phone','status']},
      indicators: {name:'Indicators', columns:['id','name','target_value','actual_value']},
      field_activities: {name:'Field Activities', columns:['id','project','type','location','planned_date','actual_date','status']},
      projects: {name:'Projects', columns:['id','name','status','start_date','end_date']}
    };

    const config = tableConfig[tableId];
    if (!config) return alert('Table not found');

    const html = `
<div style="max-height:70vh;overflow-y:auto">
  <table class="db-preview-table" style="width:100%">
    <thead>
      <tr>${config.columns.map(col => `<th>${col.replace('_',' ').toUpperCase()}</th>`).join('')}<th>ACTIONS</th></tr>
    </thead>
    <tbody>
      ${data.map(row => `
        <tr>${config.columns.map(col => `<td>${esc(row[col] || '')}</td>`).join('')}<td style="white-space:nowrap;display:flex;gap:4px"><button class="icon-btn" style="width:28px;height:28px" onclick="App.openRecordForm('${tableId}', ${row.id})">${ico('edit',12)}</button><button class="icon-btn" style="width:28px;height:28px" onclick="App.deleteRecord('${tableId}', ${row.id})">${ico('trash',12)}</button></td></tr>
      `).join('')}
    </tbody>
  </table>
</div>
<div style="margin-top:16px;text-align:right">
  <span style="font-size:12px;color:var(--text3)">${data.length} records</span>
</div>
    `;

    Modal.open(`${config.name} Table (${data.length} records)`, html, `<button class="btn btn-ghost" onclick="Modal.close()">Close</button>`);
  },

  getTrainingImportProjectValue(){
    const selected = (($('train-import-project-select') || {}).value || '').trim();
    if (selected === '__new__') {
      return (($('train-import-project-custom') || {}).value || '').trim();
    }
    return selected;
  },

  getTrainingActivitiesForProject(projectName){
    const project = String(projectName || '').trim().toLowerCase();
    return (DB.trainingActivities || []).filter((item) => String(item.project || '').trim().toLowerCase() === project);
  },

  syncTrainingImportModal(){
    const projectSelect = $('train-import-project-select');
    const customWrap = $('train-import-project-custom-wrap');
    const mode = (($('train-import-activity-mode') || {}).value || 'select').trim();
    const existingWrap = $('train-import-existing-activity-wrap');
    const createWrap = $('train-import-new-activity-wrap');
    const typeInput = $('train-import-type');
    const nameInput = $('train-import-name');
    const existingSelect = $('train-import-existing-activity');

    if (projectSelect && customWrap) {
      customWrap.style.display = projectSelect.value === '__new__' ? '' : 'none';
    }
    if (existingWrap && createWrap) {
      existingWrap.style.display = mode === 'select' ? '' : 'none';
      createWrap.style.display = mode === 'create' ? '' : 'none';
    }

    const projectName = this.getTrainingImportProjectValue();
    if (existingSelect) {
      const activities = this.getTrainingActivitiesForProject(projectName);
      existingSelect.innerHTML = activities.length
        ? activities.map((item, index) => `<option value="${index}">${esc(item.activity_type)} - ${esc(item.activity_name)}</option>`).join('')
        : '<option value="">No existing activities for this project</option>';

      if (mode === 'select' && activities.length) {
        const selected = activities[Math.max(0, Number(existingSelect.value) || 0)] || activities[0];
        if (typeInput) typeInput.value = selected.activity_type || '';
        if (nameInput) nameInput.value = selected.activity_name || '';
      }
    }
  },

  openTrainingImportModal(){
    importPreviewState = {
      type: 'beneficiaries', fileName: '', projectContext: '', interventionType: '', interventionName: '', interventionDate: '', duplicatePolicy: 'always_insert', rawRows: 0, validRows: 0, invalidRows: 0, records: [], rows: [], sample: [], headers: [], warnings: []
    };
    trainingImportState = { activityMode: 'select' };

    const projectNames = Array.from(new Set([
      ...DB.projects.map((p) => p.name),
      ...(DB.trainingActivities || []).map((p) => p.project).filter(Boolean),
    ])).sort();

    Modal.open('New Training/Activity + Import File', `
      <div style="display:grid;gap:16px">
        <div style="background:var(--bg4);border:1px solid var(--border);border-radius:var(--r);padding:12px;font-size:12px;color:var(--text2)">
          Complete the flow in order: choose or create a project, select or create an activity bucket, upload Excel/CSV, preview rows, then confirm the import into that exact training/activity.
        </div>

        <div class="fr2">
          <div class="form-group">
            <label class="form-label">Project</label>
            <select class="form-select" id="train-import-project-select" onchange="App.syncTrainingImportModal();App.refreshTrainingImportPreview()">
              ${projectNames.map((name, index) => `<option value="${esc(name)}" ${index===0?'selected':''}>${esc(name)}</option>`).join('')}
              <option value="__new__">Create new project name...</option>
            </select>
          </div>
          <div class="form-group" id="train-import-project-custom-wrap" style="display:none">
            <label class="form-label">New Project Name</label>
            <input class="form-input" id="train-import-project-custom" placeholder="Enter project name" oninput="App.syncTrainingImportModal();App.refreshTrainingImportPreview()">
          </div>
        </div>

        <div class="fr2">
          <div class="form-group">
            <label class="form-label">Training / Activity Mode</label>
            <select class="form-select" id="train-import-activity-mode" onchange="App.syncTrainingImportModal();App.refreshTrainingImportPreview()">
              <option value="select">Select existing activity</option>
              <option value="create">Create new activity</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Intervention Date</label>
            <input type="date" class="form-input" id="train-import-date" value="${new Date().toISOString().slice(0,10)}" onchange="App.refreshTrainingImportPreview()">
          </div>
        </div>

        <div id="train-import-existing-activity-wrap" class="form-group">
          <label class="form-label">Existing Activity</label>
          <select class="form-select" id="train-import-existing-activity" onchange="App.syncTrainingImportModal();App.refreshTrainingImportPreview()"></select>
        </div>

        <div id="train-import-new-activity-wrap" style="display:none">
          <div class="fr2">
            <div class="form-group">
              <label class="form-label">Activity Type</label>
              <select class="form-select" id="train-import-type" onchange="App.refreshTrainingImportPreview()">
                <option>FaaB</option>
                <option>Financial Literacy</option>
                <option>Governance & Leadership</option>
                <option>Loan Access</option>
                <option>Market Access</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Activity Name</label>
              <input class="form-input" id="train-import-name" placeholder="e.g. Farming as Business Cohort 3" oninput="App.refreshTrainingImportPreview()">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description (optional)</label>
            <textarea class="form-textarea" id="train-import-description" rows="2" placeholder="Short description of the activity bucket"></textarea>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Duplicate Policy</label>
          <select class="form-select" id="train-import-duplicate-policy" onchange="App.refreshTrainingImportPreview()">
            <option value="skip_duplicates">Skip duplicates</option>
            <option value="update_same_project">Update same-project</option>
            <option value="always_insert" selected>Always insert</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Upload Excel / CSV</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input type="file" id="train-import-file" accept=".csv,.xlsx,.xls" style="color:var(--text2);font-size:13px;width:100%;background:var(--bg3);padding:10px;border-radius:var(--r);border:1px solid var(--border2)">
            <button class="btn btn-ghost btn-sm" onclick="App.downloadImportTemplate('beneficiaries')">${ico('download',13)} Template</button>
          </div>
        </div>

        <div id="train-import-preview-summary"></div>
        <div id="train-import-preview-details"></div>
      </div>
    `,
    `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-ghost" onclick="App.refreshTrainingImportPreview()">Preview Rows</button><button class="btn btn-primary" onclick="App.commitTrainingImport()">Confirm Import</button>`, true);

    const fileInput = $('train-import-file');
    if (fileInput) fileInput.addEventListener('change', () => App.refreshTrainingImportPreview());
    this.syncTrainingImportModal();
  },

  getTrainingImportContext(){
    const project = this.getTrainingImportProjectValue();
    const mode = (($('train-import-activity-mode') || {}).value || 'select').trim();
    const activities = this.getTrainingActivitiesForProject(project);
    let interventionType = (($('train-import-type') || {}).value || '').trim();
    let interventionName = (($('train-import-name') || {}).value || '').trim();

    if (mode === 'select' && activities.length) {
      const selectedIndex = Math.max(0, Number((($('train-import-existing-activity') || {}).value || 0)) || 0);
      const selected = activities[selectedIndex] || activities[0];
      interventionType = selected?.activity_type || interventionType;
      interventionName = selected?.activity_name || interventionName;
    }

    return {
      project,
      mode,
      interventionType,
      interventionName,
      interventionDate: (($('train-import-date') || {}).value || '').trim(),
      description: (($('train-import-description') || {}).value || '').trim(),
      duplicatePolicy: (($('train-import-duplicate-policy') || {}).value || 'always_insert').trim(),
    };
  },

  async refreshTrainingImportPreview(){
    const summaryEl = $('train-import-preview-summary');
    const detailsEl = $('train-import-preview-details');
    if (!summaryEl || !detailsEl) return;

    const fileInput = $('train-import-file');
    const file = fileInput?.files?.[0];
    const ctx = this.getTrainingImportContext();

    if (!ctx.project) {
      summaryEl.innerHTML = '<div class="db-empty">Choose or create a project first.</div>';
      detailsEl.innerHTML = '';
      return;
    }
    if (!ctx.interventionType || !ctx.interventionName) {
      summaryEl.innerHTML = '<div class="db-empty">Select or create a training/activity bucket first.</div>';
      detailsEl.innerHTML = '';
      return;
    }
    if (!file) {
      summaryEl.innerHTML = '<div class="db-empty">Upload an Excel or CSV file to preview the import.</div>';
      detailsEl.innerHTML = '';
      return;
    }

    try {
      const preview = await this.parseFileViaBackend(file, 'beneficiaries', ctx.project, ctx.interventionType, ctx.interventionName, ctx.interventionDate);
      importPreviewState = {
        type: preview.type || 'beneficiaries',
        fileName: preview.fileName || file.name,
        projectContext: ctx.project,
        interventionType: ctx.interventionType,
        interventionName: ctx.interventionName,
        interventionDate: ctx.interventionDate,
        duplicatePolicy: ctx.duplicatePolicy,
        rawRows: preview.rawRows || 0,
        validRows: preview.validRows || 0,
        invalidRows: preview.invalidRows || 0,
        records: Array.isArray(preview.records) ? preview.records : [],
        rows: Array.isArray(preview.rows) ? preview.rows : [],
        sample: Array.isArray(preview.sample) ? preview.sample : [],
        headers: Array.isArray(preview.headers) ? preview.headers : [],
        warnings: Array.isArray(preview.warnings) ? preview.warnings : [],
      };

      summaryEl.innerHTML = `
        <div style="margin-bottom:10px;padding:10px 12px;background:var(--bg4);border:1px solid var(--border);border-radius:var(--r);font-size:12px;color:var(--text2)">
          Import target: <strong style="color:var(--text)">${esc(ctx.project)}</strong> / <strong style="color:var(--text)">${esc(ctx.interventionType)}</strong> / <strong style="color:var(--text)">${esc(ctx.interventionName)}</strong>${ctx.interventionDate ? ` on <strong style="color:var(--text)">${esc(ctx.interventionDate)}</strong>` : ''}
        </div>
        ${this.renderImportPreviewSummary(importPreviewState)}
      `;
      detailsEl.innerHTML = this.renderImportPreviewTable(importPreviewState, 'beneficiaries');
    } catch (err) {
      importPreviewState = {
        ...importPreviewState,
        type: 'beneficiaries',
        fileName: file.name,
        projectContext: ctx.project,
        interventionType: ctx.interventionType,
        interventionName: ctx.interventionName,
        interventionDate: ctx.interventionDate,
        duplicatePolicy: ctx.duplicatePolicy,
        records: [], rows: [], sample: [], headers: [], rawRows: 0, validRows: 0, invalidRows: 0,
        warnings: [err.message || 'Preview failed']
      };
      summaryEl.innerHTML = `<div class="db-empty">Unable to preview file: ${esc(err.message || 'Unknown error')}</div>`;
      detailsEl.innerHTML = '';
    }
  },

  async commitTrainingImport(){
    const file = $('train-import-file')?.files?.[0];
    if (!file) return alert('Upload a file first');

    const ctx = this.getTrainingImportContext();
    if (!ctx.project) return alert('Project is required');
    if (!ctx.interventionType || !ctx.interventionName) return alert('Training/activity type and name are required');

    if (!importPreviewState.records.length || importPreviewState.fileName !== file.name || importPreviewState.projectContext !== ctx.project || importPreviewState.interventionType !== ctx.interventionType || importPreviewState.interventionName !== ctx.interventionName || importPreviewState.interventionDate !== ctx.interventionDate) {
      await this.refreshTrainingImportPreview();
    }

    if (!importPreviewState.records.length) {
      return alert('No valid beneficiary rows are available for import. Preview the file and correct the data first.');
    }

    try {
      await fetchBackend('/farmers/training-activities', {
        method: 'POST',
        body: JSON.stringify({
          project: ctx.project,
          activity_type: ctx.interventionType,
          activity_name: ctx.interventionName,
          description: ctx.description,
          status: 'active',
        })
      });

      const result = await fetchBackend('/admin/import', {
        method: 'POST',
        body: JSON.stringify({
          type: 'beneficiaries',
          projectContext: ctx.project,
          interventionType: ctx.interventionType,
          interventionName: ctx.interventionName,
          interventionDate: ctx.interventionDate,
          duplicatePolicy: ctx.duplicatePolicy,
          records: importPreviewState.records,
        })
      });

      addAudit(`Imported ${result.inserted + result.updated} beneficiary records into ${ctx.project} / ${ctx.interventionName}`, 'import');
      Modal.close();
      await loadBackendData();
      this.renderPage();
      alert(`Import complete: ${result.inserted} new, ${result.updated} updated, ${result.skipped || 0} skipped.`);
      AutomationEngine.run({
        trigger: 'import_beneficiaries',
        project: ctx.project,
        count: (result.inserted || 0) + (result.updated || 0),
        formName: ctx.interventionName,
        formType: ctx.interventionType,
      });
    } catch (err) {
      alert('Training/activity import failed: ' + err.message);
    }
  },

  importCSV(){
    importPreviewState = {
      type: 'beneficiaries', fileName: '', projectContext: '', duplicatePolicy: 'update_same_project', rawRows: 0, validRows: 0, invalidRows: 0, records: [], rows: [], sample: [], headers: [], warnings: []
    };
    const projectOptions = DB.projects.map(p => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join('');

    Modal.open('Import Data',`
      <p style="color:var(--text2);font-size:13px;margin-bottom:16px">Upload a CSV or Excel file. Choose the import type and then browse or drop the file below. A structured preview will appear before you commit.</p>

      <div style="background:var(--bg4);border:1px solid var(--border);border-radius:var(--r);padding:12px;margin-bottom:16px;font-size:12px;color:var(--text3)">
        <strong>Troubleshooting:</strong> If no valid records are found, download the template first to see the expected column format. Your file must have column names that match (or are similar to) the expected names shown in the preview.
      </div>

      <div class="form-group"><label class="form-label">Import Type</label><select class="form-select" id="import-type"><option value="beneficiaries">Beneficiaries</option><option value="indicators">Indicators</option><option value="activities">Activities</option><option value="projects">Projects</option></select></div>

      <div class="form-group" id="import-project-group">
        <label class="form-label">Beneficiary Project Context</label>
        <select class="form-select" id="import-project-context">
          <option value="">Auto from file (if column exists)</option>
          ${projectOptions}
        </select>
        <div style="margin-top:6px;color:var(--text3);font-size:11px">If your file has no project column, the selected project will be applied to imported beneficiaries.</div>
      </div>

      <div class="form-group" id="import-duplicate-policy-group">
        <label class="form-label">Duplicate Policy (Beneficiaries)</label>
        <select class="form-select" id="import-duplicate-policy">
          <option value="skip_duplicates">Skip duplicates</option>
          <option value="update_same_project" selected>Update same-project</option>
          <option value="always_insert">Always insert</option>
        </select>
        <div style="margin-top:6px;color:var(--text3);font-size:11px">Controls how duplicate beneficiary identifiers are handled for this import run.</div>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:12px">
        <input type="file" id="import-file" accept=".csv,.xlsx,.xls" style="color:var(--text2);font-size:13px;width:100%;background:var(--bg3);padding:10px;border-radius:var(--r);border:1px solid var(--border2)">
        <button class="btn btn-ghost btn-sm" onclick="App.downloadImportTemplate($('import-type').value)" title="Download Template">${ico('download',13)} Template</button>
      </div>

      <div id="import-preview-summary" style="margin-top:18px"></div>
      <div id="import-preview-details" style="margin-top:14px"></div>`,
      `<button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.processImport()">Commit Import</button>`);

    const typeSelect = $('import-type');
    const fileInput = $('import-file');
    const projectSelect = $('import-project-context');
    const projectGroup = $('import-project-group');
    const duplicatePolicySelect = $('import-duplicate-policy');
    const duplicatePolicyGroup = $('import-duplicate-policy-group');
    const syncImportProjectField = () => {
      const isBeneficiaries = typeSelect.value === 'beneficiaries';
      projectGroup.style.display = isBeneficiaries ? '' : 'none';
      duplicatePolicyGroup.style.display = isBeneficiaries ? '' : 'none';
      if (!isBeneficiaries) projectSelect.value = '';
    };
    syncImportProjectField();
    fileInput.addEventListener('change', App.refreshImportPreview);
    typeSelect.addEventListener('change', () => { syncImportProjectField(); App.refreshImportPreview(); });
    projectSelect.addEventListener('change', App.refreshImportPreview);
    duplicatePolicySelect.addEventListener('change', App.refreshImportPreview);
  },

  async getFilePreview(file){
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext === 'xlsx' || ext === 'xls') {
      return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
          resolve(data.slice(0,4).map(row => esc(row.join(' | '))).join('<br>'));
        };
        reader.onerror = reject;
        reader.readAsBinaryString(file);
      });
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = e => {
        const lines = e.target.result.split('\n').filter(Boolean).slice(0,4);
        resolve(lines.map(l => esc(l)).join('<br>'));
      };
      reader.readAsText(file);
    });
  },

  async processImport(){
    const fi = $('import-file');
    if (!fi || !fi.files[0]) return alert('Please select a file');
    const type = $('import-type').value;
    const projectContext = type === 'beneficiaries' ? (($('import-project-context') || {}).value || '') : '';
    const duplicatePolicy = type === 'beneficiaries' ? (($('import-duplicate-policy') || {}).value || 'update_same_project') : 'update_same_project';
    const file = fi.files[0];

    if (!importPreviewState.records.length || importPreviewState.fileName !== file.name || importPreviewState.type !== type || (importPreviewState.projectContext || '') !== projectContext || (importPreviewState.duplicatePolicy || 'update_same_project') !== duplicatePolicy) {
      await App.refreshImportPreview();
    }

    if (!importPreviewState.records.length) {
      const expected = App.getExpectedColumns(type);
      return alert(`No valid records available for import. Please check the file and preview output first.\n\nFor ${type} import, you need at least these columns:\n${expected.required.join(', ')}\n\nDownload the template to see the correct format.`);
    }

    try {
      const payload = {
        type,
        projectContext,
        duplicatePolicy,
        records: importPreviewState.records
      };

      const result = await fetchBackend('/admin/import', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      addAudit(`Imported ${result.inserted + result.updated} records into ${type} (${duplicatePolicy})`, 'import');
      Modal.close();
      alert(`Import complete: ${result.inserted} new, ${result.updated} updated, ${result.skipped || 0} skipped.`);
      await loadBackendData();
      App.renderPage();
      AutomationEngine.run({
        trigger: 'import_beneficiaries',
        project: projectContext || 'All',
        count: (result.inserted || 0) + (result.updated || 0),
        formName: '',
        formType: type === 'beneficiaries' ? 'Beneficiary / Farmer Registration' : type,
      });
    } catch (err) {
      alert('Import failed: ' + err.message);
    }
  },

  async refreshImportPreview(){
    const fi = $('import-file');
    const type = $('import-type') ? $('import-type').value : 'beneficiaries';
    const projectContext = type === 'beneficiaries' ? (($('import-project-context') || {}).value || '') : '';
    const duplicatePolicy = type === 'beneficiaries' ? (($('import-duplicate-policy') || {}).value || 'update_same_project') : 'update_same_project';
    if (!fi || !fi.files[0]) {
      $('import-preview-summary').innerHTML = '<div class="db-empty">Choose a file to preview import details.</div>';
      $('import-preview-details').innerHTML = '';
      return;
    }

    const file = fi.files[0];
    try {
      const preview = await App.parseFileViaBackend(file, type, projectContext);
      importPreviewState = {
        type: preview.type || type,
        fileName: preview.fileName || file.name,
        projectContext,
        duplicatePolicy,
        rawRows: preview.rawRows || 0,
        validRows: preview.validRows || 0,
        invalidRows: preview.invalidRows || 0,
        records: Array.isArray(preview.records) ? preview.records : [],
        rows: Array.isArray(preview.rows) ? preview.rows : [],
        sample: Array.isArray(preview.sample) ? preview.sample : [],
        headers: Array.isArray(preview.headers) ? preview.headers : [],
        warnings: Array.isArray(preview.warnings) ? preview.warnings : []
      };

      $('import-preview-summary').innerHTML = App.renderImportPreviewSummary(importPreviewState);
      $('import-preview-details').innerHTML = App.renderImportPreviewTable(importPreviewState, type);
    } catch (err) {
      const finalMessage = err?.message || 'Unknown file parsing error';
      $('import-preview-summary').innerHTML = `<div class="db-empty">Unable to read file: ${esc(finalMessage)}</div>`;
      $('import-preview-details').innerHTML = '';
      importPreviewState = { ...importPreviewState, fileName: file.name, type, projectContext, duplicatePolicy, rawRows: 0, validRows: 0, invalidRows: 0, records: [], rows: [], sample: [], warnings: [finalMessage] };
      return;
    }
  },

  renderImportPreviewSummary(state){
    const fieldList = state.headers.length ? `<div style="margin-top:6px;font-size:12px;color:var(--text3)">Columns found: ${esc(state.headers.join(', '))}</div>` : '';
    const warnings = state.warnings.length ? `<div style="margin-top:10px;color:var(--amber);font-size:12px">${state.warnings.map(w => esc(w)).join(' / ')}</div>` : '';

    // Add column mapping guidance
    const expectedColumns = App.getExpectedColumns(state.type);
    const columnGuidance = state.headers.length ? App.getColumnMappingGuidance(state.headers, expectedColumns, state.type) : '';

    return `
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);padding:14px;font-size:13px;color:var(--text2)">
        <div style="font-weight:600;color:var(--text);margin-bottom:8px">Import preview summary</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><strong>File</strong><br>${esc(state.fileName)}</div>
          <div><strong>Type</strong><br>${esc(state.type)}</div>
          <div><strong>Rows</strong><br>${state.rawRows}</div>
          <div><strong>Valid</strong><br>${state.validRows}</div>
          <div><strong>Invalid</strong><br>${state.invalidRows}</div>
        </div>
        ${fieldList}
        ${columnGuidance}
        ${warnings}
      </div>`;
  },

  renderImportPreviewTable(state, type){
    const rows = Array.isArray(state.rows) ? state.rows : [];
    if (!rows.length) return '<div class="db-empty">No rows available for preview.</div>';
    const headers = state.headers.length
      ? state.headers
      : Array.from(rows.reduce((set, row) => {
        Object.keys(row || {}).forEach(k => set.add(k));
        return set;
      }, new Set()));

    const body = rows.map((row, idx) => {
      const normalized = App.normalizeImportRecord(type, row);
      const statusLabel = normalized ? 'valid' : 'invalid';
      const statusColor = normalized ? 'var(--green)' : 'var(--red)';
      return `<tr><td style="white-space:nowrap;color:${statusColor};font-weight:600">${statusLabel}</td><td style="white-space:nowrap;color:var(--text3)">${idx + 1}</td>${headers.map(h => `<td>${esc(row[h] ?? '')}</td>`).join('')}</tr>`;
    }).join('');

    return `
      <div class="db-preview-table" style="overflow-x:auto">
        <table style="width:100%">
          <thead><tr><th>STATUS</th><th>ROW</th>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
      <div style="margin-top:10px;font-size:12px;color:var(--text3)">Showing all ${rows.length} parsed row(s) and all detected column(s).</div>`;
  },

  normalizeImportRecord(type, row){
    const data = {};
    const expected = this.getExpectedColumns(type);
    if (!expected) return null;
    const allFields = [...expected.required, ...expected.optional];
    const lowerRow = Object.keys(row).reduce((acc,key)=>{
      acc[String(key).trim().toLowerCase()] = row[key];
      return acc;
    }, {});
    for (const destKey of allFields) {
      const aliases = this.getColumnVariations(destKey, type);
      for (const alias of aliases) {
        const v = lowerRow[String(alias).toLowerCase()];
        if (v !== undefined && v !== null && String(v).trim() !== '') { data[destKey] = v; break; }
      }
    }
    if (type === 'beneficiaries') {
      if (!data.name) {
        const firstNonEmpty = Object.values(lowerRow).find(v => v !== undefined && v !== null && String(v).trim().length > 1);
        if (firstNonEmpty) data.name = firstNonEmpty;
      }
      if (!data.id && data.identifier) data.id = data.identifier;
      if (data.accessed_loan !== undefined) data.accessed_loan = /^(1|true|yes|y)$/i.test(String(data.accessed_loan));
      if (data.accessed_market !== undefined) data.accessed_market = /^(1|true|yes|y)$/i.test(String(data.accessed_market));
      if (!data.name) return null;
      return data;
    }
    if (type === 'indicators') {
      if (!data.name) return null;
      if (data.target_value !== undefined) data.target_value = Number(data.target_value) || 0;
      if (data.actual_value !== undefined) data.actual_value = Number(data.actual_value) || 0;
      if (data.baseline !== undefined) data.baseline = Number(data.baseline) || 0;
      return data;
    }
    if (type === 'activities') {
      if (!data.project || !data.type) return null;
      if (data.team && typeof data.team === 'string') data.team = data.team.split(/[,;]+/).map(s=>s.trim()).filter(Boolean).join(';');
      return data;
    }
    if (type === 'projects') {
      if (!data.name) return null;
      return data;
    }
    return null;
  },

  getExpectedColumns(type){
    const map = {
      beneficiaries: {
        required: ['name'],
        optional: ['sex', 'age', 'cooperative', 'province', 'district', 'sector', 'project', 'phone', 'status', 'location', 'intervention_type', 'intervention_name', 'intervention_date', 'accessed_loan', 'accessed_market', 'record_source']
      },
      indicators: {
        required: ['name'],
        optional: ['project', 'code', 'baseline', 'target_value', 'actual_value', 'unit', 'source', 'frequency', 'responsible', 'disagg']
      },
      activities: {
        required: ['project', 'type'],
        optional: ['location', 'planned_date', 'actual_date', 'team', 'outputs', 'findings', 'status']
      },
      projects: {
        required: ['name'],
        optional: ['description', 'status', 'start_date', 'end_date']
      }
    };
    return map[type] || { required: [], optional: [] };
  },

  getColumnMappingGuidance(foundHeaders, expected, type){
    if (!foundHeaders.length) return '';

    const lowerHeaders = foundHeaders.map(h => h.toLowerCase().trim());
    const matched = [];
    const missing = [];

    // Check required fields
    expected.required.forEach(req => {
      const baseName = req.split(' ')[0]; // Remove (or identifier) part
      const variations = this.getColumnVariations(baseName, type);
      const found = variations.some(v => lowerHeaders.includes(v.toLowerCase()));
      if (found) {
        matched.push(req);
      } else {
        missing.push(req);
      }
    });

    // Check optional fields
    const optionalMatched = [];
    expected.optional.forEach(opt => {
      const variations = this.getColumnVariations(opt, type);
      const found = variations.some(v => lowerHeaders.includes(v.toLowerCase()));
      if (found) {
        optionalMatched.push(opt);
      }
    });

    let guidance = '';

    if (missing.length > 0) {
      guidance += `<div style="margin-top:8px;color:var(--red);font-size:12px"><strong>Missing required columns:</strong> ${missing.join(', ')}</div>`;
    }

    if (matched.length > 0) {
      guidance += `<div style="margin-top:4px;color:var(--green);font-size:12px"><strong>Found required columns:</strong> ${matched.join(', ')}</div>`;
    }

    if (optionalMatched.length > 0) {
      guidance += `<div style="margin-top:4px;color:var(--blue);font-size:12px"><strong>Found optional columns:</strong> ${optionalMatched.join(', ')}</div>`;
    }

    if (missing.length === 0 && matched.length === 0) {
      guidance += `<div style="margin-top:8px;color:var(--text3);font-size:12px">No matching columns found. Expected column names for ${type}:</div>`;
      guidance += `<div style="margin-top:4px;font-size:11px;color:var(--text3)">Required: ${expected.required.join(', ')}</div>`;
      guidance += `<div style="margin-top:2px;font-size:11px;color:var(--text3)">Optional: ${expected.optional.join(', ')}</div>`;
    }

    return guidance;
  },

  getColumnVariations(baseName, type){
    const variations = {
      beneficiaries: {
        id: ['id', 'farmer_id', 'beneficiary_id', 'identifier', 'farmer id', 'beneficiary id', 'beneficiary code', 'code', 'no', 'n°', 'numéro', 'numero'],
        identifier: ['identifier', 'national id', 'beneficiary id', 'farmer id', 'id', 'national_id'],
        name: ['name','full_name','full name','farmer_name','farmer name','beneficiary name','beneficiary_name','names','nom','prénom','prenom','noms','nom complet','nom_complet','nom prenom','nom_prenom','first name','first_name','last name','last_name','firstname','lastname','beneficiaire','bénéficiaire','agriculteur','participant'],
        sex: ['sex','gender','sexe','genre','m/f','sex/gender'],
        age: ['age','âge'],
        cooperative: ['cooperative','coop','cooperative_name','cooperative name','group','groupe','coopérative','cooperatives','organization','organisation'],
        province: ['province','region','région'],
        district: ['district','rayon','woreda'],
        sector: ['sector','secteur','cell','cellule','village','kebele'],
        project: ['project','project_name','project name','projet','program','programme'],
        phone: ['phone','mobile','telephone','phone_number','phone number','tel','tél','téléphone','contact','number'],
        status: ['status','état','etat','statut','active','actif'],
        location: ['location','site','cell','village','lieu','localisation','address','adresse'],
        intervention_type: ['intervention_type', 'intervention type', 'training type', 'activity type', 'module', 'training_module'],
        intervention_name: ['intervention_name', 'intervention name', 'training', 'training name', 'activity', 'activity name', 'session'],
        intervention_date: ['intervention_date', 'intervention date', 'training date', 'activity date', 'date'],
        accessed_loan: ['accessed_loan', 'accessed loan', 'loan access', 'loan_access', 'received loan'],
        accessed_market: ['accessed_market', 'accessed market', 'market access', 'market_access', 'linked to market', 'market linkage'],
        record_source: ['record_source', 'source', 'data source', 'import source']
      },
      indicators: {
        project: ['project','project_name','project name','projet'],
        code: ['code','indicator_code','indicator code','id','ref'],
        name: ['name','indicator','description','indicator_name','indicator name','indicateur','libellé','libelle'],
        baseline: ['baseline','base','valeur de base','base value'],
        target_value: ['target','target_value','target value','goal','cible','objectif'],
        actual_value: ['actual','actual_value','actual value','current','current_value','current value','value','valeur','résultat','resultat'],
        unit: ['unit','unité','unite'],
        source: ['source','data_source','data source','source de données'],
        frequency: ['frequency','fréquence','frequence','periodicity'],
        responsible: ['responsible','responsible_person','responsible person','responsable'],
        disagg: ['disagg','disaggregation','désagrégation','desagregation']
      },
      activities: {
        project: ['project','project_name','project name','projet'],
        type: ['type','activity_type','activity type','activity','activité','activite'],
        location: ['location','lieu','localisation','site'],
        planned_date: ['planned_date','planned date','planned','date prévue','date_prevue'],
        actual_date: ['actual_date','actual date','actual','date réelle','date_reelle'],
        team: ['team','team_members','team members','équipe','equipe'],
        outputs: ['outputs','deliverables','results','résultats','livrable'],
        findings: ['findings','observations','notes'],
        status: ['status','statut','état','etat']
      },
      projects: {
        name: ['name','project_name','project name','projet','nom'],
        description: ['description','details','résumé','resume','summary'],
        status: ['status','statut'],
        start_date: ['start_date','start date','start','début','debut'],
        end_date: ['end_date','end date','end','fin','clôture','cloture']
      }
    };
    return variations[type]?.[baseName] || [baseName];
  },

  parseCsvFile(file){
    return window.parseCsvFile(file);
  },

  parseXlsxFile(file){
    return window.parseXlsxFile(file);
  },

  async parseFileViaBackend(file, type, projectContext = '', interventionType = '', interventionName = '', interventionDate = ''){
    const formData = new FormData();
    formData.append('type', type);
    if (projectContext) formData.append('projectContext', projectContext);
    if (interventionType) formData.append('interventionType', interventionType);
    if (interventionName) formData.append('interventionName', interventionName);
    if (interventionDate) formData.append('interventionDate', interventionDate);
    formData.append('file', file);
    return fetchBackendFormData('/admin/import/preview', formData, { method: 'POST' });
  },

  downloadImportTemplate(type){
    const templates = {
      beneficiaries: {
        headers: ['id', 'name', 'sex', 'age', 'cooperative', 'province', 'district', 'sector', 'project', 'phone', 'status', 'intervention_type', 'intervention_name', 'intervention_date', 'accessed_loan', 'accessed_market'],
        sample: [
          ['F001', 'Marie Uwase', 'F', '35', 'Twubakane Coop', 'Eastern', 'Gatsibo', 'Kiziguro', 'KIIWP', '+250788100002', 'active', 'Training', 'Farming as Business (FaaB)', '2026-04-01', '0', '1'],
          ['F002', 'Jean Baptiste Habimana', 'M', '42', 'Ubuzimu Coop', 'Eastern', 'Kayonza', 'Mukarange', 'TREPA', '+250788100001', 'active', 'Training', 'Financial Literacy', '2026-04-01', '1', '0']
        ]
      },
      indicators: {
        headers: ['project', 'code', 'name', 'baseline', 'target_value', 'actual_value', 'unit', 'source', 'frequency', 'responsible'],
        sample: [
          ['TREPA', 'TREPA-O1.1', 'Farmers trained on improved practices', '0', '5000', '3840', 'farmers', 'Training registers', 'Quarterly', 'M&E Officer'],
          ['KIIWP', 'KIIWP-O1.1', 'Hectares under irrigation', '450', '1200', '870', 'ha', 'Field measurement', 'Bi-annual', 'Field Officer']
        ]
      },
      activities: {
        headers: ['project', 'type', 'location', 'planned_date', 'actual_date', 'team', 'outputs', 'findings', 'status'],
        sample: [
          ['TREPA', 'Training', 'Kayonza, Mukarange', '2024-09-05', '2024-09-07', 'Alice Uwimana; Paul Ndayisaba', '140 farmers trained', 'High interest; need follow-up materials', 'completed'],
          ['KIIWP', 'Monitoring Visit', 'Ngoma, Mutendeli', '2024-09-15', '2024-09-15', 'Jean Claude Mugisha', 'Canal 4B inspection completed', 'Siltation observed; maintenance needed', 'completed']
        ]
      },
      projects: {
        headers: ['name', 'description', 'status', 'start_date', 'end_date'],
        sample: [
          ['TREPA', 'Tree and Rural Enterprise Programme', 'active', '2022-01-01', '2025-12-31'],
          ['KIIWP', 'Kayonza Irrigation Project', 'active', '2021-06-01', '2024-12-31']
        ]
      }
    };

    const template = templates[type];
    if (!template) return;

    let csv = template.headers.join(',') + '\n';
    template.sample.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_import_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Boot-safe global import parser helpers
if (!window.parseCsvFile) {
  window.parseCsvFile = function(file){
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target.result;
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
        if (!lines.length) return resolve([]);
        const headers = lines[0].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(h => h.replace(/\"/g,'').trim());
        const rows = lines.slice(1).map(line => {
          const values = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(v => v.replace(/\"/g,'').trim());
          const item = {};
          headers.forEach((h,i)=>item[h] = values[i] !== undefined ? values[i] : '');
          return item;
        });
        resolve(rows);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };
}

if (!window.loadXlsxLibrary) {
  window.loadXlsxLibrary = function(){
    if (window.XLSX) return Promise.resolve(window.XLSX);
    if (window._xlsxLibraryPromise) return window._xlsxLibraryPromise;

    window._xlsxLibraryPromise = new Promise((resolve,reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.19.1/dist/xlsx.full.min.js';
      script.onload = () => {
        if (window.XLSX) {
          resolve(window.XLSX);
        } else {
          reject(new Error('XLSX library loaded but did not initialize.'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load XLSX library.'));
      document.head.appendChild(script);
    });

    return window._xlsxLibraryPromise;
  };
}

if (!window.parseXlsxFile) {
  window.parseXlsxFile = function(file){
    return window.loadXlsxLibrary().then(() => {
      const parse = () => {
        if (file.arrayBuffer) {
          return file.arrayBuffer().then(buffer => {
            const data = new Uint8Array(buffer);
            const workbook = XLSX.read(data, { type:'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            return XLSX.utils.sheet_to_json(sheet, { defval:'' });
          });
        }

        return new Promise((resolve,reject)=>{
          const reader = new FileReader();
          reader.onload = e => {
            try {
              const workbook = XLSX.read(e.target.result, { type:'binary' });
              const sheet = workbook.Sheets[workbook.SheetNames[0]];
              const data = XLSX.utils.sheet_to_json(sheet, { defval:'' });
              resolve(data);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = reject;
          reader.readAsBinaryString(file);
        });
      };

      return parse();
    });
  };
}

document.addEventListener('DOMContentLoaded',()=>App.init());

