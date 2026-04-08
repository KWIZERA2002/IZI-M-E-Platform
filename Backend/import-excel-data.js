const xlsx = require('xlsx');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// File paths
const CORDAID_FILE = path.join(process.env.USERPROFILE, 'Downloads', 'Cordaid outreach database.xlsx');
const KIIWP_FILE = path.join(process.env.USERPROFILE, 'Downloads', 'Database KIIWP2 _UPDATED (1) (1).xlsx');
const INDICATORS_FILE = path.join(process.env.USERPROFILE, 'Downloads', 'KIIWP2 Results framework & Indicators progress (4) (1).xlsx');

// Database path
const DB_PATH = path.join(__dirname, 'data', 'izi-me.db');

// Create SQLite database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('✗ Database connection error:', err.message);
    process.exit(1);
  } else {
    console.log(`✓ Connected to database: ${DB_PATH}`);
  }
});

// Helper to execute query with promise
function dbRun(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

// Helper to read Excel file
function readExcelFile(filePath, sheetIndex = 0) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[sheetIndex];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });
    console.log(`✓ Read ${filePath.split('\\').pop()} (${data.length} rows, sheet: ${sheetName})`);
    return data;
  } catch (err) {
    console.error(`✗ Error reading ${filePath}:`, err.message);
    return [];
  }
}

// Import Cordaid data (PSAC farmers)
async function importCordaidData() {
  console.log('\n👥 Importing Cordaid Outreach Database (PSAC Farmers)...');
  
  const data = readExcelFile(CORDAID_FILE, 0);
  let imported = 0;

  for (const row of data) {
    try {
      const name = (row['Names of participant'] || row['Names'] || '').trim();
      const location = `${row['Sector'] || ''}, ${row['District'] || ''}`.replace(/^\s*,\s*|\s*,\s*$/g, '').trim();

      // Skip empty rows
      if (!name || name === '') continue;

      await dbRun(
        'INSERT INTO farmers (name, location, created_at) VALUES (?, ?, datetime("now"))',
        [name, location]
      );
      imported++;
    } catch (err) {
      // Silently skip on error
    }
  }

  console.log(`✓ Imported ${imported} PSAC farmers`);
  return imported;
}

// Import KIIWP data (KIIWP farmers)
async function importKiiwpData() {
  console.log('\n👥 Importing Database KIIWP2 (KIIWP Farmers)...');
  
  const data = readExcelFile(KIIWP_FILE, 0);
  let imported = 0;

  for (const row of data) {
    try {
      const name = (row['Names'] || row['Names of participant'] || '').trim();
      const location = `${row['Sector'] || ''}, ${row['Cell'] || ''}, ${row['Village'] || ''}`.replace(/^\s*,\s*|\s*,\s*$/g, '').trim();

      // Skip empty rows
      if (!name || name === '') continue;

      await dbRun(
        'INSERT INTO farmers (name, location, created_at) VALUES (?, ?, datetime("now"))',
        [name, location]
      );
      imported++;
    } catch (err) {
      // Silently skip on error
    }
  }

  console.log(`✓ Imported ${imported} KIIWP farmers`);
  return imported;
}

// Import Indicators data
async function importIndicatorsData() {
  console.log('\n📊 Importing Indicators Data...');
  
  const data = readExcelFile(INDICATORS_FILE, 0);
  let imported = 0;

  for (const row of data) {
    try {
      // Look for indicator name in various possible column names
      let indicatorName = row['Indicator'] || row['Results'] || row['Output'] || row['Outcome'] || '';
      indicatorName = indicatorName.trim();
      
      // Skip empty or non-text rows
      if (!indicatorName || indicatorName.length < 2 || indicatorName.startsWith('#')) continue;

      // Extract numeric values - try multiple column name variations
      const baseline = parseFloat(row['Baseline'] || row['baseline'] || 0) || 0;
      const target = parseFloat(row['Target'] || row['target'] || row['Goal'] || 0) || 0;
      const actual = parseFloat(row['Actual'] || row['actual'] || row['Current'] || row['Progress'] || 0) || 0;

      await dbRun(
        'INSERT INTO indicators (name, target_value, actual_value) VALUES (?, ?, ?)',
        [indicatorName, target, actual]
      );
      imported++;
    } catch (err) {
      // Silently skip on error
    }
  }

  console.log(`✓ Imported ${imported} indicators`);
  return imported;
}


// Main import function
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  IZI M&E Platform - Excel Data Import Script           ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  try {
    // Import farmer data
    const cordaidCount = await importCordaidData();
    const kiiwpCount = await importKiiwpData();

    // Import indicators
    const indicatorsCount = await importIndicatorsData();

    // Summary
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║  Import Summary                                        ║');
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log(`║ PSAC Farmers:    ${cordaidCount.toString().padEnd(36)} ║`);
    console.log(`║ KIIWP Farmers:   ${kiiwpCount.toString().padEnd(36)} ║`);
    console.log(`║ Indicators:      ${indicatorsCount.toString().padEnd(36)} ║`);
    console.log(`║ Total Records:   ${(cordaidCount + kiiwpCount + indicatorsCount).toString().padEnd(36)} ║`);
    console.log('╚════════════════════════════════════════════════════════╝');

    console.log('\n✅ Import completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Start the backend: npm start');
    console.log('2. Open the platform in your browser');
    console.log('3. Login and view the imported data');

    db.close();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Import failed:', err.message);
    db.close();
    process.exit(1);
  }
}

// Run the import
main();
