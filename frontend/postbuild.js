const fs = require('fs-extra');
const path = require('path');

async function postBuild() {
  const outDir = path.join(__dirname, 'out');
  const tempDir = path.join(__dirname, 'temp_build');
  
  try {
    console.log('📦 Post-build: Restructuring for GitHub Pages...');
    
    // 1. Copier tout le contenu actuel de out/ vers temp_build/
    if (await fs.pathExists(tempDir)) {
      await fs.remove(tempDir);
    }
    await fs.copy(outDir, tempDir);
    console.log('✓ Copied build to temp directory');
    
    // 2. Vider out/
    await fs.emptyDir(outDir);
    console.log('✓ Cleaned out directory');
    
    // 3. Déplacer temp_build/ vers out/Myportfolio2/
    const targetDir = path.join(outDir, 'Myportfolio2');
    await fs.move(tempDir, targetDir);
    console.log('✓ Moved files to out/Myportfolio2/');
    
    // 4. Créer .nojekyll à la racine de out/
    await fs.writeFile(path.join(outDir, '.nojekyll'), '');
    console.log('✓ Created .nojekyll');
    
    console.log('✅ Post-build complete!');
    console.log('📁 Structure: out/Myportfolio2/');
    
  } catch (error) {
    console.error('❌ Post-build error:', error);
    process.exit(1);
  }
}

postBuild();