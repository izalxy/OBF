const express = require('express');
const cors = require('cors');
const multer = require('multer');
const JsConfuser = require('js-confuser');
const path = require('path');
const fs = require('fs');
const chalk = require("chalk");
const app = express();
const PORT = process.env.SERVER_PORT || 4081;
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
const storage = multer.memoryStorage();
const upload = multer({ storage });
function getUltraSafeConfig() {
  return {
    target: "node",
    calculator: true,
    compact: true,
    hexadecimalNumbers: true,
    controlFlowFlattening: 1,
    deadCode: 1,
    dispatcher: true,
    duplicateLiteralsRemoval: 1,
    flatten: true,
    globalConcealing: true,
    identifierGenerator: "Izall",
    renameVariables: true,
    renameGlobals: true,
    minify: true,
    movedDeclarations: true,
    objectExtraction: true,
    opaquePredicates: 0.75,
    stringConcealing: true,
    stringCompression: true,
    stringEncoding: true,
    stringSplitting: 0.75,
    rgf: false,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true
    }
  };
}

function getNebulaObfuscationConfig() {
  const generateNebulaName = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prefix = "NX";
    let randomPart = "";
    for (let i = 0; i < 4; i++) {
      randomPart += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${prefix}${randomPart}`;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: generateNebulaName,
    stringCompression: true,
    stringConcealing: false,
    stringEncoding: true,
    stringSplitting: false,
    controlFlowFlattening: 1,
    flatten: true,
    shuffle: true,
    rgf: true,
    deadCode: true,
    opaquePredicates: true,
    dispatcher: true,
    globalConcealing: true,
    objectExtraction: true,
    duplicateLiteralsRemoval: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true,
    },
  };
}

function getNovaObfuscationConfig() {
  const generateNovaName = () => {
    return "var_Zal" + Math.random().toString(36).substring(7);
  };
  return {
    target: "node",
    calculator: false,
    compact: true,
    controlFlowFlattening: 1,
    deadCode: 1,
    dispatcher: true,
    duplicateLiteralsRemoval: 1,
    flatten: true,
    globalConcealing: true,
    hexadecimalNumbers: 1,
    identifierGenerator: generateNovaName,
    lock: {
      antiDebug: true,
      integrity: true,
      selfDefending: true,
    },
    minify: true,
    movedDeclarations: true,
    objectExtraction: true,
    opaquePredicates: true,
    renameGlobals: true,
    renameVariables: true,
    shuffle: true,
    stack: true,
    stringCompression: true,
    stringConcealing: true,
  };
}

function getArabObfuscationConfig() {
  const arabicChars = ["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];
  const generateArabicName = () => {
    const length = Math.floor(Math.random() * 4) + 3;
    let name = "zal";
    for (let i = 0; i < length; i++) {
      name += arabicChars[Math.floor(Math.random() * arabicChars.length)];
    }
    return name;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: () => generateArabicName(),
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: 1,
    shuffle: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true,
    },
  };
}

function getJapanObfuscationConfig() {
  const japaneseChars = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"];
  const generateJapaneseName = () => {
    const length = Math.floor(Math.random() * 4) + 3;
    let name = "zal";
    for (let i = 0; i < length; i++) {
      name += japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
    }
    return name;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: () => generateJapaneseName(),
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: 1,
    flatten: true,
    shuffle: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true,
    },
  };
}

function getJapanxArabObfuscationConfig() {
  const japaneseXArabChars = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي","ら","り","る","れ","ろ","わ","を","ん"];
  const generateJapaneseXArabName = () => {
    const length = Math.floor(Math.random() * 4) + 3;
    let name = "zal";
    for (let i = 0; i < length; i++) {
      name += japaneseXArabChars[Math.floor(Math.random() * japaneseXArabChars.length)];
    }
    return name;
  };
  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: () => generateJapaneseXArabName(),
    stringCompression: true,
    stringConcealing: true,
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: 1,
    flatten: true,
    shuffle: true,
    rgf: false,
    dispatcher: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true,
    },
  };
}

function getHardObfuscationConfig() {
  return {
    target: "node",
    compact: true,
    controlFlowFlattening: 1,
    deadCode: 1,
    dispatcher: true,
    duplicateLiteralsRemoval: 1,
    flatten: true,
    globalConcealing: true,
    identifierGenerator: "IzalStarboy",
    renameVariables: true,
    renameGlobals: true,
    minify: true,
    movedDeclarations: true,
    objectExtraction: true,
    opaquePredicates: 1,
    stringConcealing: true,
    stringCompression: true,
    stringEncoding: true,
    stringSplitting: 1,
    shuffle: true,
    stack: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true
    }
  };
}
function createPasswordTemplate(encodedPassword, originalCode) {
  return `const readline = require('readline');
const chalk = require('chalk');
(async () => {
  const passwordBuffer = Buffer.from('${encodedPassword}', 'base64');
  const correctPassword = passwordBuffer.toString('utf8');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.clear();
  console.log(chalk.bold.red("🔑 MASUKKAN PASSWORD:"));
  rl.question('> ', (inputPassword) => {
    if (inputPassword !== correctPassword) {
      console.log(chalk.bold.red("❌ PASSWORD SALAH"));
      process.exit(1);
    }
    ${originalCode}
    rl.close();
  });
})();`;
}
app.post('/api/obfuscate', async (req, res) => {
  try {
    const { code, method, password, fileName = 'script.js' } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Kode JavaScript tidak boleh kosong' });
    }
    let config;
    switch (method) {
      case 'ultra':
        config = getUltraSafeConfig();
        break;
      case 'nova':
        config = getNovaObfuscationConfig();
        break;
      case 'nebula':
        config = getNebulaObfuscationConfig();
        break;
      case 'hard':
        config = getHardObfuscationConfig();
        break;
      case 'arab':
        config = getArabObfuscationConfig();
        break;
      case 'japan':
        config = getJapanObfuscationConfig();
        break;
      case 'japan-arab':
        config = getJapanxArabObfuscationConfig();
        break;
      default:
        config = getUltraSafeConfig();
    }
    let codeToObfuscate = code;
    if (password) {
      const encodedPassword = Buffer.from(password).toString('base64');
      codeToObfuscate = createPasswordTemplate(encodedPassword, code);
    }
    const obfuscatedResult = await JsConfuser.obfuscate(codeToObfuscate, config);
    let obfuscatedCode = typeof obfuscatedResult === 'string' ? obfuscatedResult : (obfuscatedResult?.code || JSON.stringify(obfuscatedResult));
    res.json({
      success: true,
      obfuscatedCode: obfuscatedCode,
      fileName: `${Date.now()}_${fileName.replace('.js', '_obfuscated.js')}`,
      message: 'Obfuscation berhasil!'
    });
    console.log(chalk.bold.green(`[DONE OBF] ${fileName} ${new Date().toLocaleString()} - ${method}`));
  } catch (error) {
    console.error('Error during obfuscation:', error);
    res.status(500).json({ 
      error: `Kesalahan saat mengobfuskasi: ${error.message}` 
    });
  }
});
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, () => {
  console.clear();
  console.log(chalk.green(`[ SERVER ON IN PORT ] ${PORT}`));
  console.log(chalk.blue(`Server running at http://localhost:${PORT}`));
});