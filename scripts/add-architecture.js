import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const JSON_FILE = join(__dirname, '..', 'arch-templates.json');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function addArchitecture() {
  console.log('\n=== Add New Architecture ===\n');

  const type = await question('Enter architecture type (e.g., web-application, microservices): ');
  const name = await question('Enter architecture name: ');
  const gitRepo = await question('Enter Git repository URL: ');
  const contactEmail = await question('Enter contact email: ');

  if (!type || !name || !gitRepo || !contactEmail) {
    console.error('\n❌ Error: All fields are required!');
    rl.close();
    process.exit(1);
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactEmail)) {
    console.error('\n❌ Error: Invalid email format!');
    rl.close();
    process.exit(1);
  }

  // Validate git repo URL
  const urlRegex = /^https?:\/\/.+/;
  if (!urlRegex.test(gitRepo)) {
    console.error('\n❌ Error: Invalid Git repository URL!');
    rl.close();
    process.exit(1);
  }

  try {
    const data = JSON.parse(readFileSync(JSON_FILE, 'utf8'));
    
    const newArchitecture = {
      type: type.trim(),
      name: name.trim(),
      gitRepo: gitRepo.trim(),
      contactEmail: contactEmail.trim()
    };

    data.architectures.push(newArchitecture);

    writeFileSync(JSON_FILE, JSON.stringify(data, null, 2) + '\n');

    console.log('\n✅ Architecture added successfully!');
    console.log('\nAdded architecture:');
    console.log(JSON.stringify(newArchitecture, null, 2));
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }

  rl.close();
}

addArchitecture();
