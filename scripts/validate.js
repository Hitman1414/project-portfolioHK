const fs = require('fs');
const path = require('path');
const { z } = require('zod');

console.log('🔍 Starting Content Validation for Dr. Harshita Kaushik Portfolio...');

const contentDir = path.join(__dirname, '..', 'content');

const ProfileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  institution: z.string().min(1),
  email: z.string().email(),
  linkedin: z.string().url(),
  phd: z.object({
    topic: z.string().min(1),
  }),
});

const PublicationSchema = z.array(
  z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string().min(1),
    year: z.number(),
  })
);

const ResearchSchema = z.array(
  z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string().min(1),
  })
);

let errors = 0;

function validateFile(fileName, schema) {
  const filePath = path.join(contentDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${fileName}`);
    errors++;
    return;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    schema.parse(data);
    console.log(`✅ ${fileName} validated successfully.`);
  } catch (err) {
    console.error(`❌ Validation failed for ${fileName}:`, err.message || err);
    errors++;
  }
}

validateFile('profile.json', ProfileSchema);
validateFile('publications.json', PublicationSchema);
validateFile('research.json', ResearchSchema);

if (errors > 0) {
  console.error(`\n💥 Validation completed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('\n✨ All content validated successfully! Ready for build.\n');
}
