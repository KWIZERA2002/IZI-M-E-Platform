/**
 * Seed script: replaces all projects in the DB with the 6 correct CORDAID projects.
 * Run once: node seed-projects.js
 */
const pool = require('./config/database');

const PROJECTS = [
  {
    name: 'KIIWP',
    full_name: 'Kayonza Irrigation and Integrated Watershed Management Project',
    description: 'A Rwandan initiative to reduce poverty and increase food security in the drought-prone Eastern Province by establishing sustainable irrigation and water management. It operates primarily in Kayonza District, targeting thousands of households through infrastructure development and agribusiness training.',
    status: 'active',
    start_date: '2019-01-01',
    end_date: '2028-12-31',
    location: 'Kayonza District, Eastern Province, Rwanda',
    budget: 61000000,
    budget_currency: 'USD',
    total_budget: 61000000,
    donors: JSON.stringify(['IFAD', 'Government of Rwanda', 'Government of Spain', 'Cordaid/ICCO']),
    partners: JSON.stringify(['IFAD', 'Government of Rwanda', 'Government of Spain', 'Cordaid/ICCO']),
    lead_agency: 'IFAD',
    executing_agency: 'Government of Rwanda',
    funding_sources: JSON.stringify(['IFAD (lead)', 'Government of Rwanda', 'Government of Spain', 'Cordaid/ICCO']),
    co_financiers: JSON.stringify(['IFAD', 'Government of Rwanda', 'Government of Spain', 'Cordaid/ICCO']),
    operating_location: 'Kayonza District, Eastern Province, Rwanda',
    duration: 'Phase I (2019-2023), Phase II (2021-2028)',
    key_activities: JSON.stringify(['Constructing valley dams and installing irrigation systems for fruit orchards', 'Land management: Protecting watersheds to reduce erosion']),
    key_indicators: JSON.stringify(['Increasing income and climate resilience for 40,000 rural households', 'Improving market access', 'Strengthening financial service access']),
    target_beneficiaries: 40000,
    target_households: 40000,
    target_individuals: 180000,
    restoration_area: null,
    restoration_area_unit: 'hectares',
  },
  {
    name: 'PSAC',
    full_name: 'Promoting Smallholder Agro-Export Competitiveness',
    description: 'A six-year, $62.89 million Rwandan project aimed at increasing rural incomes by boosting the productivity, quality, and export capacity of smallholder farmers in the coffee, tea, and horticulture value chains.',
    status: 'active',
    start_date: '2023-03-01',
    end_date: '2029-02-28',
    location: '14 districts in Rwanda (Western, Southern, Eastern, Northern Provinces)',
    budget: 62890000,
    budget_currency: 'USD',
    total_budget: 62890000,
    donors: JSON.stringify(['International Fund for Agricultural Development (IFAD)', 'Government of Spain', 'Government of Rwanda']),
    partners: JSON.stringify(['Cordaid', 'Heifer International', 'Kilimo Trust']),
    lead_agency: 'IFAD',
    executing_agency: 'Government of Rwanda',
    funding_sources: JSON.stringify(['IFAD', 'Government of Spain', 'Government of Rwanda']),
    co_financiers: JSON.stringify(['IFAD', 'Government of Spain', 'Government of Rwanda']),
    operating_location: '14 districts: Western Province (Rutsiro, Nyamasheke, Nyabihu, Rusizi, Karongi), Southern Province (Nyaruguru, Nyamagabe, Huye, Nyanza, Ruhango), Eastern Province (Rwamagana, Bugesera), Northern Province (Musanze, Rulindo)',
    duration: '6 years (2023-2029)',
    key_activities: JSON.stringify(['Rejuvenating/rehabilitating 8,242 hectares (coffee, tea, horticulture)', 'Providing matching grants', 'Distributing seedlings (coffee, tea, avocado, mango, patchouli)', 'Building climate-resilient capacity', 'Establishing backward/forward market linkages']),
    key_indicators: JSON.stringify(['Target: 56,695 households (approx. 255,128 individuals)', 'Achievements: ~12 million+ seedlings produced, 4,567 jobs created for women and youth']),
    target_beneficiaries: 56695,
    target_households: 56695,
    target_individuals: 255128,
    restoration_area: 8242,
    restoration_area_unit: 'hectares',
  },
  {
    name: 'PRISM',
    full_name: 'Partnership for Resilient and Inclusive Small Livestock Markets',
    description: 'A five-year Rwandan agricultural project designed to reduce poverty and enhance the resilience of poor rural households by transforming the small livestock sector (pigs, chickens, goats, and sheep). It focuses on enhancing food security and increasing incomes through market-oriented, inclusive, and sustainable livestock production.',
    status: 'active',
    start_date: '2021-03-01',
    end_date: '2026-02-28',
    location: '15 districts across Northern, Southern, and Western provinces of Rwanda',
    budget: 45640000,
    budget_currency: 'USD',
    total_budget: 45640000,
    donors: JSON.stringify(['International Fund for Agricultural Development (IFAD)', 'Enabel', 'Heifer International', 'Government of Rwanda', 'VSF Belgium']),
    partners: JSON.stringify(['Rwanda Agriculture and Animal Resources Development Board (RAB)', 'Enabel', 'Heifer International', 'VSF Belgium', 'Cordaid', 'Government of Rwanda']),
    lead_agency: 'Rwanda Agriculture and Animal Resources Development Board (RAB)',
    executing_agency: 'SPIU of IFAD-funded projects',
    funding_sources: JSON.stringify(['IFAD ($14.9M–$15M)', 'Enabel ($17.43M)', 'Heifer International ($4.68M)', 'VSF Belgium', 'Government of Rwanda', 'Cordaid']),
    co_financiers: JSON.stringify(['IFAD', 'Enabel', 'Heifer International', 'Government of Rwanda', 'VSF Belgium', 'Cordaid']),
    operating_location: '15 districts: Northern (Gakenke, Musanze, Burera, Rulindo, Gicumbi), Southern (Ruhango, Huye, Gisagara, Nyaruguru, Nyamagabe), Western (Nyabihu, Rutsiro, Ngororero, Karongi, Nyamasheke)',
    duration: '5 years (March 2021 – September 2026)',
    key_activities: JSON.stringify(['Credit Enhancement Facility (CEF) - 76% invested', 'Equity Fund - 18%', 'Technical support, policy dialogue, and management']),
    key_indicators: JSON.stringify(['Focus on small livestock sector transformation', 'Market-oriented and sustainable production', 'Enhanced food security and income generation']),
    target_beneficiaries: null,
    target_households: null,
    target_individuals: null,
    restoration_area: null,
    restoration_area_unit: 'hectares',
  },
  {
    name: 'RDDP',
    full_name: 'Rwanda Dairy Development Project',
    description: "An initiative designed to increase the competitiveness and profitability of Rwanda's dairy sector, focusing on improving the livelihoods of smallholder farmers through enhanced milk production, quality, and market access.",
    status: 'active',
    start_date: '2024-01-01',
    end_date: '2030-12-31',
    location: 'Nationwide, targeting 27 rural districts',
    budget: 100370000,
    budget_currency: 'USD',
    total_budget: 100370000,
    donors: JSON.stringify(['International Fund for Agricultural Development (IFAD)', 'OPEC Fund', 'Green Climate Fund (GCF)', 'Government of Rwanda', 'Heifer International', 'Equity Bank Rwanda']),
    partners: JSON.stringify(['Rwanda Agriculture and Animal Resources Development Board (RAB)', 'Heifer International', 'Cordaid', 'Rwanda Cooperative Agency (RCA)', 'Local financial institutions']),
    lead_agency: 'International Fund for Agricultural Development (IFAD)',
    executing_agency: 'Rwanda Agriculture and Animal Resources Development Board (RAB) / MINAGRI',
    funding_sources: JSON.stringify(['IFAD ($20.5m)', 'OPEC Fund ($20m)', 'GCF ($8.5m)', 'Government of Rwanda ($17.64m)', 'Heifer International ($6m)', 'Equity Bank Rwanda ($10m)', 'Beneficiaries ($9.52m)']),
    co_financiers: JSON.stringify(['IFAD', 'OPEC Fund', 'GCF', 'Government of Rwanda', 'Heifer International', 'Equity Bank Rwanda']),
    operating_location: 'Nationwide, targeting 27 rural districts (14 initial + 13 new districts). Key regions: East, North, West, South provinces',
    duration: 'Phase II (2024–2029/30)',
    key_activities: JSON.stringify(['Improving dairy breeds and Artificial Insemination (AI) services', 'Fodder cultivation', 'Establishing/rehabilitating Milk Collection Centres (MCCs)', 'Cold chain systems', 'Capacity building on climate-smart dairy production', 'Digitalizing MCCs']),
    key_indicators: JSON.stringify(['Target Households: 175,000 households (60% using climate-resilient practices)', 'Income Goal: 30% increase in income for dairy households', 'Employment: Creating ~29,000 jobs (45% women, 25% youth)']),
    target_beneficiaries: 175000,
    target_households: 175000,
    target_individuals: 750000,
    restoration_area: null,
    restoration_area_unit: 'hectares',
  },
  {
    name: 'TREPA',
    full_name: 'Transforming Eastern Province through Adaptation',
    description: 'A 6-year initiative (2021–2027) aimed at restoring 60,000 hectares of drought-degraded landscapes and building community resilience to climate change in Rwanda\'s Eastern Province.',
    status: 'active',
    start_date: '2021-12-23',
    end_date: '2027-12-23',
    location: 'All seven districts of Eastern Province, Rwanda',
    budget: 49600000,
    budget_currency: 'USD',
    total_budget: 49600000,
    donors: JSON.stringify(['Green Climate Fund (GCF)']),
    partners: JSON.stringify(['International Union for Conservation of Nature (IUCN)', 'Rwanda Forestry Authority (RFA)', 'Cordaid', 'Enabel', 'CIFOR-ICRAF', 'World Vision']),
    lead_agency: 'International Union for Conservation of Nature (IUCN)',
    executing_agency: 'Rwanda Forestry Authority (RFA)',
    funding_sources: JSON.stringify(['Green Climate Fund (GCF) - $33.8 million', 'Co-financing from partners - $15.8 million']),
    co_financiers: JSON.stringify(['Green Climate Fund (GCF)', 'Partners']),
    operating_location: 'Nyagatare, Gatsibo, Bugesera, Ngoma, Kirehe, Kayonza, Rwamagana',
    duration: '6 years (23 December 2021 – 23 December 2027)',
    key_activities: JSON.stringify(['Restoring 60,000 ha of degraded land (crop lands, silvo-pastoral lands, woodlots, public forests)', 'Agroforestry & Fodder: Scaling up silvopastoral packages and agroforestry, including drought-tolerant fodder trees', 'Financial Inclusion: Training savings groups, fostering financial literacy, facilitating access to loans from SACCOs', 'Energy Efficiency: Distributing improved cooking stoves to over 100,000 households', 'Value Chain Development: Promoting climate-resilient products (beekeeping, tree crops, fodder)']),
    key_indicators: JSON.stringify(['Restoration: 60,000 hectares of restored, drought-degraded land', 'Beneficiaries: 75,000 smallholder farmers (over 120,000 households) made more resilient', 'Community Groups: 136 Saving Group Ambassadors (SGAs) mentoring over 21,000 members', 'Efficiency: 100,000+ households using clean/efficient cooking tech']),
    target_beneficiaries: 75000,
    target_households: 120000,
    target_individuals: 480000,
    restoration_area: 60000,
    restoration_area_unit: 'hectares',
  },
  {
    name: 'STARLIT',
    full_name: 'Strengthening Agricultural Resilience through Learning and Innovation',
    description: 'An IFAD-China South-South and Triangular Cooperation (SSTC) facility-funded project designed to strengthen the resilience of smallholder maize farmers against climate change and food insecurity.',
    status: 'completed',
    start_date: '2021-12-01',
    end_date: '2023-06-30',
    location: 'Kayonza District, Eastern Rwanda (and Kenya)',
    budget: 483470,
    budget_currency: 'USD',
    total_budget: 483470,
    donors: JSON.stringify(['International Fund for Agricultural Development (IFAD)']),
    partners: JSON.stringify(['Cordaid', 'Youth Engagement in Agricultural Network (Rwanda)', 'Reseau Interdiocesan de Microfinance (RIM LTD)', 'Viamo', 'Local irrigation equipment suppliers']),
    lead_agency: 'IFAD',
    executing_agency: 'Cordaid',
    funding_sources: JSON.stringify(['IFAD-China SSTC Facility']),
    co_financiers: JSON.stringify(['IFAD']),
    operating_location: 'Kayonza District, Eastern Rwanda (and Kenya)',
    duration: '18 months (December 2021 – June 2023)',
    key_activities: JSON.stringify(['Installing solar-powered irrigation systems', 'Assisting in creating tailored financial products', 'Introducing Agricultural Credit Assessment Tool (A-CAT)', 'Providing phone-based agri-extension services', 'Training youth as service providers for equipment maintenance']),
    key_indicators: JSON.stringify(['Targets: 2,800 smallholder farmers (45% women)', 'Achievements: 1,176 farmers (48% women) accessed loans, 18 youths trained, adoption of solar irrigation']),
    target_beneficiaries: 2800,
    target_households: 2800,
    target_individuals: 11200,
    restoration_area: null,
    restoration_area_unit: 'hectares',
  },
];

async function seedProjects() {
  console.log('Seeding projects...');

  // Remove tasks referencing old projects first (cascade not guaranteed in all SQLite modes)
  await pool.query('DELETE FROM tasks');
  await pool.query('DELETE FROM projects');
  console.log('Cleared existing projects and tasks.');

  for (const p of PROJECTS) {
    await pool.query(
      `INSERT INTO projects (
        name, full_name, description, status, start_date, end_date, location,
        budget, budget_currency, total_budget, donors, partners, lead_agency,
        executing_agency, funding_sources, co_financiers, operating_location,
        duration, key_activities, key_indicators, target_beneficiaries,
        target_households, target_individuals, restoration_area, restoration_area_unit
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25
      )`,
      [
        p.name, p.full_name, p.description, p.status, p.start_date, p.end_date, p.location,
        p.budget, p.budget_currency, p.total_budget, p.donors, p.partners, p.lead_agency,
        p.executing_agency, p.funding_sources, p.co_financiers, p.operating_location,
        p.duration, p.key_activities, p.key_indicators, p.target_beneficiaries,
        p.target_households, p.target_individuals, p.restoration_area, p.restoration_area_unit,
      ]
    );
    console.log(`  Inserted: ${p.name} — ${p.full_name}`);
  }

  const result = await pool.query('SELECT id, name, full_name, status, budget FROM projects ORDER BY id');
  console.log('\nProjects now in DB:');
  result.rows.forEach(r => console.log(`  [${r.id}] ${r.name} | ${r.full_name} | ${r.status} | $${r.budget}`));
  console.log('\nDone.');
}

if (require.main === module) {
  seedProjects().then(() => process.exit(0)).catch(e => { console.error('Seed failed:', e); process.exit(1); });
}

module.exports = {
  PROJECTS,
  seedProjects,
};
