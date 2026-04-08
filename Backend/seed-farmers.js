/**
 * Seed script: inserts representative PSAC and KIIWP farmer/beneficiary data.
 * Clears existing seeded rows first so it is idempotent.
 * Run: node Backend/seed-farmers.js   (from project root)
 *   or: npm run seed:farmers
 */
require('./config/loadEnv');
const pool = require('./config/database');

/* ─────────────────────────────────────────────────────────────────
   PSAC DATA
   Promoting Smallholder Agro-Export Competitiveness
   14 districts – coffee / tea / horticulture value chains
───────────────────────────────────────────────────────────────── */
const PSAC_FARMERS = [
  // ── Coffee belt – Western Province ──
  { name: 'Uwimana Chantal',    sex:'F', age:38, district:'Rutsiro',     province:'Western',  sector:'Boneza',    cooperative:'COOPAC',          phone:'0788411201', status:'active' },
  { name: 'Nshimiyimana Eric',  sex:'M', age:44, district:'Rutsiro',     province:'Western',  sector:'Kigeyo',    cooperative:'COOPAC',          phone:'0788411202', status:'active' },
  { name: 'Mukandutiye Solange',sex:'F', age:31, district:'Rutsiro',     province:'Western',  sector:'Mushonyi',  cooperative:'ABAKUNDA KAWA',   phone:'0788411203', status:'active' },
  { name: 'Habimana Jean Pierre',sex:'M',age:52, district:'Rutsiro',     province:'Western',  sector:'Gihango',   cooperative:'ABAKUNDA KAWA',   phone:'0788411204', status:'active' },
  { name: 'Umutoniwase Alice',  sex:'F', age:27, district:'Nyabihu',     province:'Western',  sector:'Karago',    cooperative:'COCAMU',          phone:'0788411205', status:'active' },
  { name: 'Nsabimana Théogène', sex:'M', age:49, district:'Nyabihu',     province:'Western',  sector:'Jomba',     cooperative:'COCAMU',          phone:'0788411206', status:'active' },
  { name: 'Izabayo Faustin',    sex:'M', age:36, district:'Nyabihu',     province:'Western',  sector:'Bigogwe',   cooperative:'DUKUNDE KAWA',    phone:'0788411207', status:'active' },
  { name: 'Mukamana Vestine',   sex:'F', age:41, district:'Nyamasheke',  province:'Western',  sector:'Bushekeri', cooperative:'DUKUNDE KAWA',    phone:'0788411208', status:'active' },
  { name: 'Nkurunziza Callixte',sex:'M', age:55, district:'Nyamasheke',  province:'Western',  sector:'Kanjongo',  cooperative:'ABAKUNDA KAWA',   phone:'0788411209', status:'active' },
  { name: 'Uwase Epiphanie',    sex:'F', age:33, district:'Nyamasheke',  province:'Western',  sector:'Karengera', cooperative:'COOPAC',          phone:'0788411210', status:'active' },
  { name: 'Twagirimana Samuel', sex:'M', age:46, district:'Karongi',     province:'Western',  sector:'Rugabano',  cooperative:'ABAKUNDE KAWA',   phone:'0788411211', status:'active' },
  { name: 'Ingabire Beatrice',  sex:'F', age:29, district:'Karongi',     province:'Western',  sector:'Murambi',   cooperative:'COCAMU',          phone:'0788411212', status:'active' },
  { name: 'Munyangaju Dieudonné',sex:'M',age:43, district:'Karongi',     province:'Western',  sector:'Gitesi',    cooperative:'COOPAC',          phone:'0788411213', status:'active' },
  { name: 'Nyirahabimana Rose', sex:'F', age:37, district:'Rusizi',      province:'Western',  sector:'Bugarama',  cooperative:'COCAMU',          phone:'0788411214', status:'active' },
  { name: 'Gakwenzire Prosper', sex:'M', age:50, district:'Rusizi',      province:'Western',  sector:'Nyakabuye', cooperative:'ABAKUNDA KAWA',   phone:'0788411215', status:'active' },
  { name: 'Mukagihana Julienne',sex:'F', age:34, district:'Rusizi',      province:'Western',  sector:'Nzahaha',   cooperative:'DUKUNDE KAWA',    phone:'0788411216', status:'active' },

  // ── Tea belt – Southern Province ──
  { name: 'Buregeya Laurent',   sex:'M', age:42, district:'Nyaruguru',   province:'Southern', sector:'Mata',      cooperative:'SORELI',          phone:'0788411217', status:'active' },
  { name: 'Mukamugema Spéciose',sex:'F', age:39, district:'Nyaruguru',   province:'Southern', sector:'Muganza',   cooperative:'RUBAYA Cooperative',phone:'0788411218',status:'active' },
  { name: 'Semana Emmanuel',    sex:'M', age:48, district:'Nyaruguru',   province:'Southern', sector:'Kibeho',    cooperative:'SORELI',          phone:'0788411219', status:'active' },
  { name: 'Nyiransengimana Agnes',sex:'F',age:30,district:'Nyaruguru',   province:'Southern', sector:'Ngera',     cooperative:'RUBAYA Cooperative',phone:'0788411220',status:'active' },
  { name: 'Niyonkuru Clément',  sex:'M', age:53, district:'Nyamagabe',   province:'Southern', sector:'Gasaka',    cooperative:'SORELI',          phone:'0788411221', status:'active' },
  { name: 'Uwimpuhwe Félicité', sex:'F', age:26, district:'Nyamagabe',   province:'Southern', sector:'Kamegeri',  cooperative:'RUBAYA Cooperative',phone:'0788411222',status:'active' },
  { name: 'Habiyaremye Alexis', sex:'M', age:45, district:'Nyamagabe',   province:'Southern', sector:'Mushubi',   cooperative:'SORELI',          phone:'0788411223', status:'active' },
  { name: 'Mukarumongi Cécile', sex:'F', age:32, district:'Huye',        province:'Southern', sector:'Mbazi',     cooperative:'RUBAYA Cooperative',phone:'0788411224',status:'active' },
  { name: 'Nzeyimana Evode',    sex:'M', age:47, district:'Huye',        province:'Southern', sector:'Tumba',     cooperative:'COOPAC',          phone:'0788411225', status:'active' },
  { name: 'Uwingabire Josiane', sex:'F', age:35, district:'Huye',        province:'Southern', sector:'Maraba',    cooperative:'COOPAC',          phone:'0788411226', status:'active' },
  { name: 'Ndayisenga Florent', sex:'M', age:41, district:'Nyanza',      province:'Southern', sector:'Busasamana',cooperative:'COCAMU',          phone:'0788411227', status:'active' },
  { name: 'Musabyimana Immaculée',sex:'F',age:28,district:'Nyanza',      province:'Southern', sector:'Kigoma',    cooperative:'ABAKUNDA KAWA',   phone:'0788411228', status:'active' },
  { name: 'Hakizimana Théophile',sex:'M',age:56, district:'Ruhango',     province:'Southern', sector:'Cyahinda',  cooperative:'SORELI',          phone:'0788411229', status:'active' },
  { name: 'Nyiramutuzo Florence',sex:'F',age:36, district:'Ruhango',     province:'Southern', sector:'Ntongwe',   cooperative:'SORELI',          phone:'0788411230', status:'active' },

  // ── Horticulture – Eastern Province ──
  { name: 'Mutabazi Patrice',   sex:'M', age:44, district:'Rwamagana',   province:'Eastern',  sector:'Musha',     cooperative:'COARV',           phone:'0788411231', status:'active' },
  { name: 'Umwali Jacqueline',  sex:'F', age:31, district:'Rwamagana',   province:'Eastern',  sector:'Fajara',    cooperative:'COARV',           phone:'0788411232', status:'active' },
  { name: 'Gasasira Désiré',    sex:'M', age:49, district:'Rwamagana',   province:'Eastern',  sector:'Kigabiro',  cooperative:'COARV',           phone:'0788411233', status:'active' },
  { name: 'Uwineza Marceline',  sex:'F', age:27, district:'Bugesera',    province:'Eastern',  sector:'Juru',      cooperative:'INZEGO Y\'ABAHIZI',phone:'0788411234',status:'active' },
  { name: 'Nzungize Donatien',  sex:'M', age:52, district:'Bugesera',    province:'Eastern',  sector:'Nyamata',   cooperative:'INZEGO Y\'ABAHIZI',phone:'0788411235',status:'active' },
  { name: 'Mukeshimana Gaudence',sex:'F',age:38, district:'Bugesera',    province:'Eastern',  sector:'Rilima',    cooperative:'INZEGO Y\'ABAHIZI',phone:'0788411236',status:'active' },

  // ── Northern Province ──
  { name: 'Nkusi Viateur',      sex:'M', age:43, district:'Musanze',     province:'Northern', sector:'Cyuve',     cooperative:'DUKUNDE KAWA',    phone:'0788411237', status:'active' },
  { name: 'Mukamuganga Brigitte',sex:'F',age:30, district:'Musanze',     province:'Northern', sector:'Busogo',    cooperative:'DUKUNDE KAWA',    phone:'0788411238', status:'active' },
  { name: 'Habimana Valentin',  sex:'M', age:46, district:'Musanze',     province:'Northern', sector:'Muhoza',    cooperative:'COOPAC',          phone:'0788411239', status:'active' },
  { name: 'Nyiramahoro Odette', sex:'F', age:33, district:'Rulindo',     province:'Northern', sector:'Buyoga',    cooperative:'ABAKUNDA KAWA',   phone:'0788411240', status:'active' },
  { name: 'Bigirimana Grégoire',sex:'M', age:51, district:'Rulindo',     province:'Northern', sector:'Rukozo',    cooperative:'ABAKUNDA KAWA',   phone:'0788411241', status:'active' },
  { name: 'Mukandori Scolastique',sex:'F',age:29,district:'Rulindo',     province:'Northern', sector:'Masoro',    cooperative:'DUKUNDE KAWA',    phone:'0788411242', status:'active' },

  // ── Extra records for adequate representation ──
  { name: 'Ntawukulilyayo Denis',sex:'M',age:48, district:'Nyaruguru',   province:'Southern', sector:'Rusenge',   cooperative:'SORELI',          phone:'0788411243', status:'active' },
  { name: 'Kayitesi Yvonne',    sex:'F', age:35, district:'Nyabihu',     province:'Western',  sector:'Shyira',    cooperative:'COCAMU',          phone:'0788411244', status:'active' },
  { name: 'Nshuti Léon',        sex:'M', age:40, district:'Karongi',     province:'Western',  sector:'Bwishyura', cooperative:'COOPAC',          phone:'0788411245', status:'active' },
  { name: 'Uwamahoro Claudine', sex:'F', age:26, district:'Rwamagana',   province:'Eastern',  sector:'Karenge',   cooperative:'COARV',           phone:'0788411246', status:'active' },
  { name: 'Hakizimana Sylvain', sex:'M', age:54, district:'Nyamasheke',  province:'Western',  sector:'Mahembe',   cooperative:'COCAMU',          phone:'0788411247', status:'active' },
  { name: 'Mutoni Providencia', sex:'F', age:32, district:'Bugesera',    province:'Eastern',  sector:'Gashora',   cooperative:'INZEGO Y\'ABAHIZI',phone:'0788411248',status:'active' },
];

/* ─────────────────────────────────────────────────────────────────
   KIIWP DATA
   Kayonza Irrigation and Integrated Watershed Management Project
   All farmers in Kayonza District, Eastern Province
───────────────────────────────────────────────────────────────── */
const KIIWP_FARMERS = [
  // ── Rwinkwavu Sector ──
  { name: 'Murindangabo Félicien',  sex:'M', age:45, district:'Kayonza', province:'Eastern', sector:'Rwinkwavu',   cooperative:'TWIYUBAKE',         phone:'0788422101', status:'active' },
  { name: 'Uwimana Solange',        sex:'F', age:33, district:'Kayonza', province:'Eastern', sector:'Rwinkwavu',   cooperative:'TWIYUBAKE',         phone:'0788422102', status:'active' },
  { name: 'Nkurunziza Augustin',    sex:'M', age:51, district:'Kayonza', province:'Eastern', sector:'Rwinkwavu',   cooperative:'TWIYUBAKE',         phone:'0788422103', status:'active' },
  { name: 'Nyirahabimana Prisca',   sex:'F', age:28, district:'Kayonza', province:'Eastern', sector:'Rwinkwavu',   cooperative:'COARV',             phone:'0788422104', status:'active' },
  { name: 'Bizimana Camille',       sex:'M', age:42, district:'Kayonza', province:'Eastern', sector:'Rwinkwavu',   cooperative:'COARV',             phone:'0788422105', status:'active' },
  { name: 'Nyirabakundana Espérance',sex:'F',age:37, district:'Kayonza', province:'Eastern', sector:'Rwinkwavu',   cooperative:'COARV',             phone:'0788422106', status:'active' },

  // ── Kabarondo Sector ──
  { name: 'Rutaganda  Jean Baptiste',sex:'M',age:48,district:'Kayonza',  province:'Eastern', sector:'Kabarondo',   cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422107', status:'active' },
  { name: 'Mukamanzi Vestine',       sex:'F',age:30, district:'Kayonza', province:'Eastern', sector:'Kabarondo',   cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422108', status:'active' },
  { name: 'Niyonsaba Gonzague',      sex:'M',age:55, district:'Kayonza', province:'Eastern', sector:'Kabarondo',   cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422109', status:'active' },
  { name: 'Uwase Radégonde',         sex:'F',age:26, district:'Kayonza', province:'Eastern', sector:'Kabarondo',   cooperative:'TWIYUBAKE',         phone:'0788422110', status:'active' },
  { name: 'Habyarimana Dieudonné',   sex:'M',age:44, district:'Kayonza', province:'Eastern', sector:'Kabarondo',   cooperative:'TWIYUBAKE',         phone:'0788422111', status:'active' },
  { name: 'Mukarumongi Thérèse',     sex:'F',age:39, district:'Kayonza', province:'Eastern', sector:'Kabarondo',   cooperative:'COARV',             phone:'0788422112', status:'active' },

  // ── Ndego Sector ──
  { name: 'Nkuranyi Gaétan',        sex:'M', age:41, district:'Kayonza', province:'Eastern', sector:'Ndego',       cooperative:'TWIYUBAKE',         phone:'0788422113', status:'active' },
  { name: 'Musabyimana Claudine',   sex:'F', age:34, district:'Kayonza', province:'Eastern', sector:'Ndego',       cooperative:'TWIYUBAKE',         phone:'0788422114', status:'active' },
  { name: 'Ngenzi Théophile',       sex:'M', age:50, district:'Kayonza', province:'Eastern', sector:'Ndego',       cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422115', status:'active' },
  { name: 'Nyirarukundo Pascasie',  sex:'F', age:27, district:'Kayonza', province:'Eastern', sector:'Ndego',       cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422116', status:'active' },
  { name: 'Murenzi Callixte',       sex:'M', age:46, district:'Kayonza', province:'Eastern', sector:'Ndego',       cooperative:'COARV',             phone:'0788422117', status:'active' },
  { name: 'Uwingabire Immaculée',   sex:'F', age:32, district:'Kayonza', province:'Eastern', sector:'Ndego',       cooperative:'COARV',             phone:'0788422118', status:'active' },

  // ── Murundi Sector ──
  { name: 'Gasana Aristide',        sex:'M', age:43, district:'Kayonza', province:'Eastern', sector:'Murundi',     cooperative:'TWIYUBAKE',         phone:'0788422119', status:'active' },
  { name: 'Mukandoli Ancille',      sex:'F', age:31, district:'Kayonza', province:'Eastern', sector:'Murundi',     cooperative:'TWIYUBAKE',         phone:'0788422120', status:'active' },
  { name: 'Ntabana Florien',        sex:'M', age:49, district:'Kayonza', province:'Eastern', sector:'Murundi',     cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422121', status:'active' },
  { name: 'Nyiramugisha Goretti',   sex:'F', age:35, district:'Kayonza', province:'Eastern', sector:'Murundi',     cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422122', status:'active' },
  { name: 'Musoni Patrice',         sex:'M', age:53, district:'Kayonza', province:'Eastern', sector:'Murundi',     cooperative:'COARV',             phone:'0788422123', status:'active' },
  { name: 'Mukagakwiye Joséphine',  sex:'F', age:29, district:'Kayonza', province:'Eastern', sector:'Murundi',     cooperative:'COARV',             phone:'0788422124', status:'active' },

  // ── Ruramira Sector ──
  { name: 'Nzabanita Fulgence',     sex:'M', age:47, district:'Kayonza', province:'Eastern', sector:'Ruramira',    cooperative:'TWIYUBAKE',         phone:'0788422125', status:'active' },
  { name: 'Umugoroba Cécile',       sex:'F', age:36, district:'Kayonza', province:'Eastern', sector:'Ruramira',    cooperative:'TWIYUBAKE',         phone:'0788422126', status:'active' },
  { name: 'Munyurangabo Viateur',   sex:'M', age:40, district:'Kayonza', province:'Eastern', sector:'Ruramira',    cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422127', status:'active' },
  { name: 'Nyirabarezi Jacqueline', sex:'F', age:28, district:'Kayonza', province:'Eastern', sector:'Ruramira',    cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422128', status:'active' },
  { name: 'Karangwa Ferdinand',     sex:'M', age:52, district:'Kayonza', province:'Eastern', sector:'Ruramira',    cooperative:'COARV',             phone:'0788422129', status:'active' },
  { name: 'Uwineza Chantal',        sex:'F', age:24, district:'Kayonza', province:'Eastern', sector:'Ruramira',    cooperative:'COARV',             phone:'0788422130', status:'active' },

  // ── Mwiri Sector ──
  { name: 'Rugira Léonidas',        sex:'M', age:44, district:'Kayonza', province:'Eastern', sector:'Mwiri',       cooperative:'TWIYUBAKE',         phone:'0788422131', status:'active' },
  { name: 'Nyamwasa Bernadette',    sex:'F', age:33, district:'Kayonza', province:'Eastern', sector:'Mwiri',       cooperative:'TWIYUBAKE',         phone:'0788422132', status:'active' },
  { name: 'Mugiraneza Sylvestre',   sex:'M', age:57, district:'Kayonza', province:'Eastern', sector:'Mwiri',       cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422133', status:'active' },
  { name: 'Mukamana Béatrice',      sex:'F', age:30, district:'Kayonza', province:'Eastern', sector:'Mwiri',       cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422134', status:'active' },
  { name: 'Nkurunziza Fabien',      sex:'M', age:45, district:'Kayonza', province:'Eastern', sector:'Mwiri',       cooperative:'COARV',             phone:'0788422135', status:'active' },
  { name: 'Uwiragiye Odette',       sex:'F', age:27, district:'Kayonza', province:'Eastern', sector:'Mwiri',       cooperative:'COARV',             phone:'0788422136', status:'active' },

  // ── Mukarange Sector ──
  { name: 'Twahirwa Théodore',      sex:'M', age:50, district:'Kayonza', province:'Eastern', sector:'Mukarange',   cooperative:'TWIYUBAKE',         phone:'0788422137', status:'active' },
  { name: 'Nyirabasa Angélique',    sex:'F', age:38, district:'Kayonza', province:'Eastern', sector:'Mukarange',   cooperative:'TWIYUBAKE',         phone:'0788422138', status:'active' },
  { name: 'Mutabazi Emmanuel',      sex:'M', age:43, district:'Kayonza', province:'Eastern', sector:'Mukarange',   cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422139', status:'active' },
  { name: 'Uwimana Brigitte',       sex:'F', age:31, district:'Kayonza', province:'Eastern', sector:'Mukarange',   cooperative:'INZEGO Y\'ABAHIZI', phone:'0788422140', status:'active' },
  { name: 'Gasabira Romain',        sex:'M', age:48, district:'Kayonza', province:'Eastern', sector:'Mukarange',   cooperative:'COARV',             phone:'0788422141', status:'active' },
  { name: 'Mukamugema Chantal',     sex:'F', age:35, district:'Kayonza', province:'Eastern', sector:'Mukarange',   cooperative:'COARV',             phone:'0788422142', status:'active' },

  // ── Gahini Sector ──
  { name: 'Birasa Innocent',        sex:'M', age:46, district:'Kayonza', province:'Eastern', sector:'Gahini',      cooperative:'TWIYUBAKE',         phone:'0788422143', status:'active' },
  { name: 'Nyiransabimana Marie',   sex:'F', age:29, district:'Kayonza', province:'Eastern', sector:'Gahini',      cooperative:'TWIYUBAKE',         phone:'0788422144', status:'active' },
  { name: 'Hakizimana Damas',       sex:'M', age:54, district:'Kayonza', province:'Eastern', sector:'Gahini',      cooperative:'COARV',             phone:'0788422145', status:'active' },
  { name: 'Mukeshimana Vénérande',  sex:'F', age:33, district:'Kayonza', province:'Eastern', sector:'Gahini',      cooperative:'COARV',             phone:'0788422146', status:'active' },
];

/* ─────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────── */
function makeIdentifier(project, index) {
  const prefix = project === 'PSAC' ? 'PSAC-B' : 'KIIWP-F';
  return `${prefix}${String(index + 1).padStart(4, '0')}`;
}

function makeLocation(f) {
  return [f.sector, f.district, f.province].filter(Boolean).join(', ');
}

/* ─────────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────── */
async function run() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  IZI M&E Platform – Farmer Seed Script       ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  try {
    // Test connection first: try SELECT 1
    await pool.query('SELECT 1');
    console.log('✓ Database connection OK\n');

    // Detect whether schema is already initialised for Postgres
    if (pool.initializeSchema) {
      await pool.initializeSchema();
    }

    // Remove existing seeded rows to stay idempotent
    await pool.query("DELETE FROM farmers WHERE project IN ('PSAC','KIIWP')");
    console.log('✓ Cleared existing PSAC / KIIWP farmer rows\n');

    let psacCount = 0;
    let kiiwpCount = 0;

    // ── Insert PSAC ──
    console.log('👥 Seeding PSAC farmers…');
    for (let i = 0; i < PSAC_FARMERS.length; i++) {
      const f = PSAC_FARMERS[i];
      const identifier = makeIdentifier('PSAC', i);
      const location = makeLocation(f);
      try {
        await pool.query(
          `INSERT INTO farmers
             (identifier, name, sex, age, district, province, sector, cooperative,
              phone, project, location, status)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
          [identifier, f.name, f.sex, f.age, f.district, f.province,
           f.sector, f.cooperative, f.phone, 'PSAC', location, f.status]
        );
        psacCount++;
      } catch (err) {
        console.error(`  ✗ Skipped ${f.name}: ${err.message}`);
      }
    }
    console.log(`✓ Inserted ${psacCount} PSAC farmers\n`);

    // ── Insert KIIWP ──
    console.log('👥 Seeding KIIWP farmers…');
    for (let i = 0; i < KIIWP_FARMERS.length; i++) {
      const f = KIIWP_FARMERS[i];
      const identifier = makeIdentifier('KIIWP', i);
      const location = makeLocation(f);
      try {
        await pool.query(
          `INSERT INTO farmers
             (identifier, name, sex, age, district, province, sector, cooperative,
              phone, project, location, status)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
          [identifier, f.name, f.sex, f.age, f.district, f.province,
           f.sector, f.cooperative, f.phone, 'KIIWP', location, f.status]
        );
        kiiwpCount++;
      } catch (err) {
        console.error(`  ✗ Skipped ${f.name}: ${err.message}`);
      }
    }
    console.log(`✓ Inserted ${kiiwpCount} KIIWP farmers\n`);

    // ── Summary ──
    const total = await pool.query('SELECT COUNT(*) AS cnt FROM farmers');
    const totalCount = total.rows[0]?.cnt || total.rows[0]?.['COUNT(*)'] || 0;

    console.log('╔══════════════════════════════════════════════╗');
    console.log('║  Seed Summary                                ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║  PSAC farmers :  ${String(psacCount).padEnd(27)}║`);
    console.log(`║  KIIWP farmers:  ${String(kiiwpCount).padEnd(27)}║`);
    console.log(`║  Total in DB  :  ${String(totalCount).padEnd(27)}║`);
    console.log('╚══════════════════════════════════════════════╝');
    console.log('\n✅ Seeding complete!');

    if (typeof pool.close === 'function') pool.close();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    console.error(err.stack);
    if (typeof pool.close === 'function') pool.close();
    process.exit(1);
  }
}

run();

module.exports = run;
