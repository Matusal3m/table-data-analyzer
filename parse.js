import fs from "fs/promises";

/**
 * 
 * @param {string} directory 
 * @param {string[]} extensions 
 */

async function collectFiles(directory, extensions) {
  let filesContent = "";

  const files = await fs.readdir(directory);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = directory + "/" + file;
    const stat = await fs.stat(fullPath)

    if (stat.isDirectory()) {
      filesContent += await collectFiles(fullPath, extensions);
    } else if (extensions.some(extension => file.endsWith(extension))) {
      const content = await fs.readFile(fullPath, 'utf-8');
      filesContent += `\n==== ${file} ====\n${content}\n`;
    }
  }

  return filesContent
}


function parseArguments() {
  const args = process.argv.slice(2);
  let srcPath = null;
  let extensions = [];

  args.forEach(arg => {
    if (arg.startsWith("--dir=")) {
      srcPath = arg.replace("--dir=", "");
    } else if (arg.startsWith("--extensions=")) {
      extensions = arg.replace("--extensions=", "").split(',').map(ext => ext.trim());
    }
  });

  if (!srcPath) {
    console.error("Erro: O argumento --dir=<path> é obrigatório.");
    console.log("Uso: node script.js --dir=<path> --extensions=.js,.md");
    process.exit(1);
  }

  if (extensions.length === 0) {
    console.warn("Aviso: Nenhuma extensão especificada. Coletando todos os arquivos.");
  }

  return { srcPath, extensions };
}

(async () => {
  const { srcPath, extensions } = parseArguments();

  console.log("Diretório:", srcPath);
  console.log("Extensões:", extensions);

  const fileContent = await collectFiles(srcPath, extensions);
  await fs.writeFile("parsed-project.txt", fileContent);

  console.log("Arquivos coletados e salvos em src/project.txt");
})();
