import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import process from "node:process"

if (!fs.statSync("./_posts").isDirectory()) {
    console.log(`Wrong current directory: ${process.cwd()}`)
    process.exit(-1)
}

const args = process.argv.slice(2)

const id = args.join("-")

if (!id) {
    console.log(`Usage: npm run new <article-id>`)
    process.exit(-1)
}

const mdPath = path.join("_posts", id + ".md")

if (fs.existsSync(mdPath)) {
    console.log(`id already exists`)
    process.exit(-1)
}

fs.writeFileSync(
    mdPath,
    `---
title: ${id}
date: ${new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
        .format(new Date())
        .replaceAll("/", "-")}
tags:
---`,
)

console.log(`Created: ${mdPath}`)

execSync(`code ${mdPath}`)
