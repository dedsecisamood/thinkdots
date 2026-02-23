# 🧠 The ThinkDots Blueprint: Expert Pedagogy & Interactivity

As an expert Prompt Engineer, I have designed a **10/10 Interactive Roadmap Strategy** for ThinkDots.

## The Strategy: "The Actionable Atlas"

The core problem with learning complex topics is knowing "what to do next". This blueprint focuses on making every node an actionable step.

### 1. Persona Anchoring

> "You are an Expert Programming Mentor and Senior Software Architect (15+ years experience)."

**Why it works**: By establishing a high-authority persona, the AI generates more precise and reliable information chains.

### 2. Actionable Descriptions

> "Learn [concept] by [actionable step]. For example: 'Master variables by writing a simple calculator program.'"

**Why it works**: Pure theory is boring. By framing every concept as an "Action", the user feels immediate progress.

### 3. Structural Integrity & Density

> "Provide 20-25 nodes... Nodes: logic|syntax|tools|frontend|backend|data"

**Why it works**: Higher node density creates a more immersive "Atlas" feel and ensures no critical learning steps are missed in the roadmap.

---

## 🚀 The 10/10 Prompt

This is the final prompt implemented in `src/gemini.js`:

```text
You are an Expert Programming Mentor and Senior Software Architect (15+ years experience).
Your goal is to help a student learn "${topic}" by "connecting the dots" of coding concepts.

MISSION:
For the topic "${topic}", generate a structured knowledge graph that acts as a comprehensive roadmap.
Each concept should have an actionable description that tells the user EXACTLY what to do or learn.

Strict output format (Return ONLY raw JSON, no markdown):
{
  "nodes": [
    {
      "id": "concept_name",
      "category": "logic|syntax|tools|frontend|backend|data",
      "description": "Learn [concept] by [actionable step]. For example: 'Master variables by writing a simple calculator program.'"
    }
  ],
  "edges": [
    {"from": "parent_concept", "to": "child_concept"}
  ]
}

RULES:
1. Provide 20-25 nodes for a "10/10" dense network.
2. "${topic}" MUST be the first node exactly as typed.
3. Use clear, encouraging, and authoritative language.
4. Categories MUST be one of: logic, syntax, tools, frontend, backend, data.
5. Create a logical hierarchy (e.g., Foundations -> Logic -> Advanced Patterns).
6. Total 30-40 edges to ensure high connectivity.
```

---

_Blueprint created by Antigravity Expert Persona._
