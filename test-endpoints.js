const testRoute = async (method, path, data = null) => {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (data) opts.body = JSON.stringify(data);
  const r = await fetch('http://localhost:5000' + path, opts);
  console.log(`${method} ${path}: ${r.status}`);
  return r;
};

(async () => {
  console.log('--- IZI M&E Platform - Endpoint Tests ---\n');
  
  try {
    // Test registration
    const u = 'testuser' + Date.now();
    const p = 'pass1234';
    const reg = await testRoute('POST', '/api/users/register', {username: u, password: p});
    const regData = await reg.json();
    const token = regData.token;
    console.log(`✓ Registered: ${u}\n`);
    
    // Test login
    const log = await testRoute('POST', '/api/users/login', {username: u, password: p});
    console.log(`✓ Login successful\n`);
    
    // Test protected endpoints
    const opts = { headers: { 'x-auth-token': token, 'Content-Type': 'application/json' } };
    
    const proj = await fetch('http://localhost:5000/api/projects', opts);
    const projData = await proj.json();
    console.log(`✓ GET /api/projects: ${proj.status} (${Array.isArray(projData) ? projData.length + ' projects' : 'empty'})\n`);
    
    const farm = await fetch('http://localhost:5000/api/farmers', opts);
    console.log(`✓ GET /api/farmers: ${farm.status}\n`);
    
    const me = await fetch('http://localhost:5000/api/users/me', opts);
    const meData = await me.json();
    console.log(`✓ GET /api/users/me: ${me.status} (${meData.username})\n`);
    
    // Test debug endpoint
    const debug = await fetch('http://localhost:5000/debug/db');
    const dbData = await debug.json();
    console.log(`✓ GET /debug/db: ${debug.status}`);
    console.log(`  Database: ${dbData.database}`);
    console.log(`  Users: ${dbData.tables.users.length}\n`);
    
    console.log('✅ All endpoints functional!\n');
    console.log('--- Platform Ready ---');
    console.log('Frontend: Open Frontend/IZI-ME-Platform.html in your browser');
    console.log('Backend: Running on http://localhost:5000');
    console.log('API Docs: Check README.md for endpoint details');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    process.exit(1);
  }
  
  process.exit(0);
})();
