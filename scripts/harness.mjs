#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const configPath = path.join(root, "harness", "config.json");

function readConfig() {
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function rel(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function write(relativePath, content) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "plan";
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function walk(dir, ignoredDirs, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.includes(entry.name)) {
        walk(fullPath, ignoredDirs, files);
      }
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

function checkRequiredPaths(config, errors) {
  for (const requiredPath of config.requiredPaths) {
    if (!exists(requiredPath)) {
      errors.push(`缺少必要路徑：${requiredPath}`);
    }
  }
}

function checkMarkdownSections(config, errors) {
  for (const [file, sections] of Object.entries(config.requiredMarkdownSections)) {
    if (!exists(file)) continue;
    const content = read(file);
    for (const section of sections) {
      if (!content.includes(section)) {
        errors.push(`${file} 缺少章節「${section}」`);
      }
    }
  }
}

function checkActivePlans(config, errors) {
  const activeDir = path.join(root, "docs", "harness", "exec-plans", "active");
  if (!fs.existsSync(activeDir)) return;

  const planFiles = fs
    .readdirSync(activeDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(activeDir, file));

  for (const planFile of planFiles) {
    const content = fs.readFileSync(planFile, "utf8");
    for (const section of config.activePlanRequiredSections) {
      if (!content.includes(section)) {
        errors.push(`Active plan ${rel(planFile)} 缺少 ${section}`);
      }
    }
  }
}

function checkSourceLineLimits(config, errors) {
  const ignoredDirs = config.rules.ignoredDirs ?? [];
  const maxLines = config.rules.maxSourceLines;
  const sourceExtensions = config.rules.sourceExtensions ?? [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
  ];
  const extensions = new Set(sourceExtensions);

  for (const sourceRoot of config.rules.sourceGlobs) {
    const sourcePath = path.join(root, sourceRoot);
    for (const file of walk(sourcePath, ignoredDirs)) {
      if (!extensions.has(path.extname(file))) continue;
      const lineCount = fs.readFileSync(file, "utf8").split(/\r?\n/).length;
      if (lineCount > maxLines) {
        errors.push(`${rel(file)} 共有 ${lineCount} 行；上限是 ${maxLines} 行`);
      }
    }
  }
}

function check() {
  const config = readConfig();
  const errors = [];

  checkRequiredPaths(config, errors);
  checkMarkdownSections(config, errors);
  checkActivePlans(config, errors);
  checkSourceLineLimits(config, errors);

  if (errors.length > 0) {
    console.error("Harness 檢查失敗：");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Harness 檢查通過。");
}

function init(args) {
  const rawGoal = args.join(" ").trim() || "New harness task";
  const slug = slugify(rawGoal);
  const date = today();
  const file = `docs/harness/exec-plans/active/${date}-${slug}.md`;

  if (exists(file)) {
    console.error(`計畫已存在：${file}`);
    process.exit(1);
  }

  const template = read("harness/templates/exec-plan.md");
  const content = template
    .replaceAll("{{TITLE}}", titleFromSlug(slug))
    .replaceAll("{{DATE}}", date)
    .replaceAll("{{GOAL}}", rawGoal);

  write(file, content);
  console.log(`已建立 ${file}`);
}

function status() {
  const activeDir = path.join(root, "docs", "harness", "exec-plans", "active");
  const completedDir = path.join(root, "docs", "harness", "exec-plans", "completed");
  const active = fs.existsSync(activeDir)
    ? fs.readdirSync(activeDir).filter((file) => file.endsWith(".md"))
    : [];
  const completed = fs.existsSync(completedDir)
    ? fs.readdirSync(completedDir).filter((file) => file.endsWith(".md"))
    : [];

  console.log("Harness 狀態");
  console.log(`進行中計畫：${active.length}`);
  for (const file of active) {
    console.log(`- docs/harness/exec-plans/active/${file}`);
  }
  console.log(`已完成計畫：${completed.length}`);
}

function help() {
  console.log(`用法：
  node scripts/harness.mjs check
  node scripts/harness.mjs init <goal>
  node scripts/harness.mjs status`);
}

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "check":
    check();
    break;
  case "init":
    init(args);
    break;
  case "status":
    status();
    break;
  case undefined:
  case "help":
  case "--help":
  case "-h":
    help();
    break;
  default:
    console.error(`未知命令：${command}`);
    help();
    process.exit(1);
}
