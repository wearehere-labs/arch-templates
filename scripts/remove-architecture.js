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

async function removeArchitecture() {
  console.log('\n=== Remove Architecture ===\n');

  try {
    const data = JSON.parse(readFileSync(JSON_FILE, 'utf8'));

    if (data.architectures.length === 0) {
      console.log('No architectures found in the list.');
      rl.close();
      return;
    }

    console.log('Available architectures:\n');
    data.architectures.forEach((arch, index) => {
      console.log(`${index + 1}. ${arch.name} (${arch.type})`);
      console.log(`   Repo: ${arch.gitRepo}`);
      console.log(`   Contact: ${arch.contactEmail}\n`);
    });

    const answer = await question('Enter the number of the architecture to remove (or "cancel" to abort): ');

    if (answer.toLowerCase() === 'cancel') {
      console.log('\n❌ Operation cancelled.');
      rl.close();
      return;
    }

    const index = parseInt(answer) - 1;

    if (isNaN(index) || index < 0 || index >= data.architectures.length) {
      console.error('\n❌ Error: Invalid selection!');
      rl.close();
      process.exit(1);
    }

    const removed = data.architectures.splice(index, 1)[0];

    writeFileSync(JSON_FILE, JSON.stringify(data, null, 2) + '\n');

    console.log('\n✅ Architecture removed successfully!');
    console.log('\nRemoved architecture:');
    console.log(JSON.stringify(removed, null, 2));
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }

  rl.close();
}

removeArchitecture();
