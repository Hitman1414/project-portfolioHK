const { execSync } = require('child_process');

console.log('====================================');
console.log('🚀 Portfolio Studio — Publish Workflow');
console.log('====================================\n');

try {
  console.log('Step 1: Validating content schemas...');
  execSync('node scripts/validate.js', { stdio: 'inherit' });

  console.log('\nStep 2: Testing static build...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\nStep 3: Checking Git workspace status...');
  const status = execSync('git status --porcelain').toString();

  if (!status.trim()) {
    console.log('ℹ️ No uncommitted content changes detected in Git repository.');
    console.log('✨ Workspace is already up to date!');
    process.exit(0);
  }

  console.log('Detected modified files:');
  console.log(status);

  console.log('\nStep 4: Staging and creating publish commit...');
  execSync('git add .', { stdio: 'inherit' });
  const commitMsg = `Content update: Academic profile & research refresh [${new Date().toISOString().split('T')[0]}]`;
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

  console.log('\nStep 5: Pushing changes to remote repository...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('\n🎉 Published successfully! GitHub / Vercel deployment triggered automatically.\n');
} catch (err) {
  console.error('\n❌ Publish failed during execution:', err.message);
  process.exit(1);
}
