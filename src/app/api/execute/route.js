// src/app/api/execute/route.js
// Code execution via OneCompiler API
// Endpoint: POST https://onecompiler.com/api/v1/run
// Auth: x-api-key header
// Key: ONECOMPILER_API_KEY in .env

import { NextResponse } from "next/server";
import { auth }         from "@clerk/nextjs/server";

const CANNOT_RUN = ["html", "css", "react", "nextjs", "git", "sql", "jquery"];

// OneCompiler language IDs (EXACT strings from their API)
// javascript MUST be "nodejs" — "javascript" returns 400
const OC_LANGUAGES = {
  python:     { language: "python",     filename: "main.py"   },
  py:         { language: "python",     filename: "main.py"   },
  javascript: { language: "nodejs",     filename: "index.js"  },
  js:         { language: "nodejs",     filename: "index.js"  },
  typescript: { language: "typescript", filename: "main.ts"   },
  ts:         { language: "typescript", filename: "main.ts"   },
  java:       { language: "java",       filename: "Main.java" },
  cpp:        { language: "cpp",        filename: "main.cpp"  },
  "c++":      { language: "cpp",        filename: "main.cpp"  },
  c:          { language: "c",          filename: "main.c"    },
  bash:       { language: "bash",       filename: "main.sh"   },
  shell:      { language: "bash",       filename: "main.sh"   },
  go:         { language: "go",         filename: "main.go"   },
  rust:       { language: "rust",       filename: "main.rs"   },
  ruby:       { language: "ruby",       filename: "main.rb"   },
  php:        { language: "php",        filename: "main.php"  },
};

async function runOnOneCompiler(code, langConfig) {
  const apiKey = process.env.ONECOMPILER_API_KEY;
  if (!apiKey) throw new Error("ONECOMPILER_API_KEY is not set in .env");

  const body = {
    language: langConfig.language,
    stdin:    "",
    files:    [{ name: langConfig.filename, content: code }],
  };

  const res = await fetch("https://onecompiler.com/api/v1/run", {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":    apiKey,           // OneCompiler native auth header
    },
    signal: AbortSignal.timeout(30000),
    body:   JSON.stringify(body),
  });

  // Always read the body for debugging
  const text = await res.text();

  if (!res.ok) {
    console.error(`[OneCompiler] HTTP ${res.status}:`, text);
    throw new Error(`OneCompiler API error ${res.status}: ${text.slice(0, 200)}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("[OneCompiler] Non-JSON response:", text);
    throw new Error("OneCompiler returned non-JSON response");
  }

  // Log in dev for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("[OneCompiler] response:", JSON.stringify(data).slice(0, 300));
  }

  // Response shape: { status, stdout, stderr, exception, executionTime }
  const stdout   = data.stdout    ?? "";
  const stderr   = data.stderr    ?? "";
  const exception = data.exception ?? null;
  const allErr   = exception ? `${stderr}\nException: ${exception}`.trim() : stderr;
  const exitCode = (data.status === "success" && !exception) ? 0 : 1;

  return { stdout, stderr: allErr, exitCode };
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code, language } = await req.json();

    if (!code?.trim() || !language) {
      return NextResponse.json({ error: "code and language are required" }, { status: 400 });
    }

    const lang = language.toLowerCase();

    // Non-runnable languages — give helpful message
    if (CANNOT_RUN.includes(lang)) {
      return NextResponse.json({
        stdout: "", stderr: "", cannotRun: true,
        message: `${language} runs in a browser/local environment only.\n\nTo run locally:\n  1. Install the required tools\n  2. Save your code to a file\n  3. Execute from your terminal`,
      });
    }

    const langConfig = OC_LANGUAGES[lang];
    if (!langConfig) {
      return NextResponse.json(
        { error: `"${language}" is not supported. Supported: python, javascript, typescript, java, cpp, c, go, rust, ruby, php, bash` },
        { status: 400 }
      );
    }

    const result = await runOnOneCompiler(code, langConfig);
    return NextResponse.json({ ...result, language: langConfig.language });

  } catch (err) {
    if (err.name === "AbortError" || err.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Execution timed out (30s). Check for infinite loops." },
        { status: 504 }
      );
    }
    console.error("[POST /api/execute]", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 503 }
    );
  }
}
