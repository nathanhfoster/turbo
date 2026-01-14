# Prompt Engineering Master Guide

A comprehensive guide to effective prompt engineering for LLM interactions, based on best practices and patterns used throughout this codebase.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Prompt Structure](#prompt-structure)
3. [System Messages](#system-messages)
4. [Temperature & Parameters](#temperature--parameters)
5. [Prompt Patterns](#prompt-patterns)
6. [Advanced Techniques](#advanced-techniques)
7. [Common Pitfalls](#common-pitfalls)
8. [Codebase Examples](#codebase-examples)
9. [Best Practices Checklist](#best-practices-checklist)

---

## Core Principles

### 1. Clarity & Specificity

**❌ Bad:**
```
Improve this resume
```

**✅ Good:**
```
Improve the following resume content to make it more professional and impactful. 
Maintain the original structure and key information, but enhance the language, 
quantify achievements where possible, and ensure consistency in formatting.
```

### 2. Context is King

Always provide sufficient context for the model to understand the task:

```typescript
const prompt = `You are a professional resume writer with 10+ years of experience.
Your task is to improve resumes while maintaining authenticity.

Context:
- Target audience: ${targetAudience}
- Industry: ${industry}
- Experience level: ${experienceLevel}

Resume content:
${resumeContent}`;
```

### 3. Explicit Instructions

Be explicit about what you want:

```typescript
const prompt = `Analyze this resume and provide:
1. Three specific improvements for the "Experience" section
2. Quantifiable metrics to add
3. Action verbs to replace weak language
4. Formatting suggestions

Resume:
${resumeContent}`;
```

### 4. Output Format Specification

Specify the desired output format:

```typescript
const prompt = `Generate a JSON object with the following structure:
{
  "improvements": [
    {
      "section": "string",
      "suggestion": "string",
      "priority": "high|medium|low"
    }
  ],
  "summary": "string"
}

Resume content:
${resumeContent}`;
```

---

## Prompt Structure

### Standard Structure

```
[Role/Persona]
[Context]
[Task]
[Input Data]
[Output Format]
[Constraints/Requirements]
```

### Example Template

```typescript
function buildPrompt(
  role: string,
  context: string,
  task: string,
  input: string,
  outputFormat?: string,
  constraints?: string
): string {
  return `
You are ${role}.

Context:
${context}

Task:
${task}

Input:
${input}

${outputFormat ? `Output Format:\n${outputFormat}` : ''}

${constraints ? `Constraints:\n${constraints}` : ''}
  `.trim();
}
```

---

## System Messages

System messages set the model's behavior and role. Use them strategically:

### Basic System Message

```typescript
const systemMessage = `You are a professional resume writer. 
Improve resumes while maintaining the original structure and key information.`;
```

### Advanced System Message (From Blog Generator)

```typescript
const systemMessage = `You are writing a sophisticated blog post for **${companyName}** (${url}), 
the pioneering digital impact platform that ${description}

### Strategic Context
**Company Mission**: ${description}
**Platform Categories**: ${categories.join(", ")}
**Target Audience**: ${targetAudience}
- **Focus Areas**: ${audienceGuide.focus}
- **Tone Approach**: ${audienceGuide.tone}
- **Key Concepts**: ${audienceGuide.keywords.join(", ")}`;
```

### System Message Best Practices

1. **Define Role Clearly** - "You are a [role] with [expertise]"
2. **Set Tone & Style** - "Write in a [tone] style"
3. **Establish Constraints** - "Do not [action]"
4. **Provide Context** - Include relevant background information
5. **Specify Output Format** - "Return as [format]"

---

## Temperature & Parameters

### Temperature Guide

| Use Case | Temperature | Description |
|----------|-------------|-------------|
| **Factual/Precise** | 0.0 - 0.3 | Code generation, data extraction, factual Q&A |
| **Balanced** | 0.4 - 0.7 | General writing, analysis, summarization |
| **Creative** | 0.8 - 1.0 | Creative writing, brainstorming, ideation |
| **Highly Creative** | 1.0 - 2.0 | Poetry, fiction, experimental content |

### Codebase Examples

```typescript
// Resume improvement - balanced creativity
temperature: 0.7

// Job tailoring - more focused
temperature: 0.5

// Blog generation - creative but controlled
temperature: 0.7

// Conversational - more natural
temperature: 0.8
```

### Max Tokens

Set appropriate token limits based on expected output:

```typescript
// Short responses
maxTokens: 500

// Medium responses
maxTokens: 1000 - 2000

// Long-form content
maxTokens: 2000 - 4000
```

### Other Parameters

```typescript
{
  temperature: 0.7,
  maxTokens: 2000,
  topP: 0.9,        // Nucleus sampling
  frequencyPenalty: 0.0,  // Reduce repetition
  presencePenalty: 0.0,   // Encourage new topics
}
```

---

## Prompt Patterns

### 1. Role-Based Prompting

```typescript
const prompt = `You are an expert ${domain} consultant with ${years} years of experience.
Your clients trust you for ${expertise}.

Task: ${task}
`;
```

### 2. Chain-of-Thought

```typescript
const prompt = `Let's solve this step by step:

1. First, analyze the problem: ${problem}
2. Identify key factors: ${factors}
3. Consider possible solutions: ${solutions}
4. Evaluate each solution: ${evaluation}
5. Recommend the best approach: ${recommendation}

Problem: ${input}`;
```

### 3. Few-Shot Learning

```typescript
const prompt = `Here are examples of good ${outputType}:

Example 1:
${example1}

Example 2:
${example2}

Now create a similar ${outputType} for:
${input}`;
```

### 4. Constraint-Based

```typescript
const prompt = `Create ${outputType} with these constraints:
- Must include: ${requiredElements}
- Must not include: ${forbiddenElements}
- Must follow: ${styleGuide}
- Must be: ${length} words

Input: ${input}`;
```

### 5. Iterative Refinement

```typescript
// First pass
const prompt1 = `Analyze this ${input} and identify areas for improvement.`;

// Second pass
const prompt2 = `Based on this analysis: ${analysis}
Improve the ${input} by addressing these specific issues:
${issues}`;
```

---

## Advanced Techniques

### 1. Prompt Chaining

Break complex tasks into steps:

```typescript
// Step 1: Analysis
const analysisPrompt = `Analyze this resume and identify:
- Strengths
- Weaknesses
- Missing elements
- Improvement opportunities`;

// Step 2: Improvement
const improvementPrompt = `Based on this analysis: ${analysis}
Improve the resume by:
1. ${improvement1}
2. ${improvement2}
3. ${improvement3}`;
```

### 2. Template-Based Prompts

Create reusable prompt templates:

```typescript
interface PromptTemplate {
  role: string;
  context: string;
  task: string;
  examples?: string[];
  constraints?: string[];
}

function buildPrompt(template: PromptTemplate, input: string): string {
  return `
You are ${template.role}.

Context:
${template.context}

Task:
${template.task}

${template.examples ? `Examples:\n${template.examples.join('\n\n')}` : ''}

${template.constraints ? `Constraints:\n${template.constraints.map(c => `- ${c}`).join('\n')}` : ''}

Input:
${input}
  `.trim();
}
```

### 3. Dynamic Prompt Generation

Generate prompts based on context:

```typescript
function generateResumePrompt(
  resume: Resume,
  instructions?: string,
  targetJob?: string
): string {
  const basePrompt = `Improve the following resume`;
  
  let prompt = basePrompt;
  
  if (targetJob) {
    prompt += ` to match this job description:\n\nJob Description:\n${targetJob}\n\n`;
  }
  
  if (instructions) {
    prompt += `\nSpecific instructions: ${instructions}\n\n`;
  }
  
  prompt += `Resume content:\n${resume.content}`;
  
  return prompt;
}
```

### 4. Structured Output Prompts

Force structured responses:

```typescript
const prompt = `Analyze this resume and return a JSON object:

{
  "strengths": ["string"],
  "weaknesses": ["string"],
  "improvements": [
    {
      "section": "string",
      "current": "string",
      "suggested": "string",
      "reason": "string"
    }
  ],
  "score": number,
  "summary": "string"
}

Resume:
${resumeContent}

Return ONLY valid JSON, no additional text.`;
```

---

## Common Pitfalls

### 1. Vague Instructions

**❌ Bad:**
```
Make this better
```

**✅ Good:**
```
Improve this resume by:
- Quantifying achievements with specific numbers
- Using action verbs (e.g., "led", "achieved", "implemented")
- Ensuring consistent formatting
- Highlighting relevant skills for software engineering roles
```

### 2. Insufficient Context

**❌ Bad:**
```
Improve this: ${content}
```

**✅ Good:**
```
You are a professional resume writer. Improve this software engineer resume 
for a senior position at a tech company. Focus on leadership experience and 
technical achievements. Maintain the original structure.

Resume: ${content}
```

### 3. Conflicting Instructions

**❌ Bad:**
```
Make it shorter but include more details. Be creative but stay factual.
```

**✅ Good:**
```
Create a concise resume (1-2 pages) that highlights the most relevant 
achievements. Use specific metrics and quantifiable results. Maintain 
professional tone throughout.
```

### 4. Ignoring Output Format

**❌ Bad:**
```
Analyze this and give me suggestions.
```

**✅ Good:**
```
Analyze this resume and provide suggestions in this format:

1. [Section Name]
   - Current: [what it says now]
   - Suggested: [improved version]
   - Reason: [why this is better]

Resume: ${content}
```

### 5. Not Testing Prompts

Always test prompts with different inputs to ensure they work consistently.

---

## Codebase Examples

### Example 1: Resume Improvement (Simple)

```typescript
// From: apps/resume/domains/Resume/hooks/useResumeAI.ts
const prompt = instructions
  ? `Improve the following resume based on these instructions: ${instructions}\n\nResume content:\n${resume.content}`
  : `Improve the following resume content to make it more professional and impactful:\n\n${resume.content}`;
```

**Analysis:**
- ✅ Clear task definition
- ✅ Handles optional instructions
- ⚠️ Could benefit from system message
- ⚠️ Could specify output format

**Improved Version:**
```typescript
const systemMessage = `You are a professional resume writer with expertise in 
creating impactful, ATS-friendly resumes. Your improvements maintain authenticity 
while enhancing clarity and impact.`;

const prompt = `Improve the following resume content to make it more professional 
and impactful. Maintain the original HTML structure and formatting.

${instructions ? `Specific instructions: ${instructions}\n\n` : ''}
Resume content:
${resume.content}

Return the improved resume in the same HTML format.`;
```

### Example 2: Job Tailoring

```typescript
// From: apps/resume/domains/Resume/hooks/useResumeAI.ts
const prompt = `Tailor the following resume to match this job description. 
Keep the same structure and format, but adjust the content to highlight 
relevant skills and experiences:\n\nJob Description:\n${jobDescription}\n\nResume content:\n${resume.content}`;
```

**Analysis:**
- ✅ Clear task
- ✅ Maintains structure
- ⚠️ Could be more specific about what to highlight
- ⚠️ Could include matching criteria

**Improved Version:**
```typescript
const systemMessage = `You are a career coach specializing in resume tailoring. 
You match candidate qualifications to job requirements while maintaining 
authenticity and avoiding exaggeration.`;

const prompt = `Tailor the following resume to match this job description.

Job Description:
${jobDescription}

Resume content:
${resume.content}

Instructions:
1. Identify key requirements from the job description
2. Match relevant experiences and skills from the resume
3. Reorder sections to highlight most relevant qualifications first
4. Adjust language to match job description keywords (where authentic)
5. Maintain original structure and formatting
6. Keep all factual information accurate

Return the tailored resume in the same HTML format.`;
```

### Example 3: Blog Generation (Advanced)

```typescript
// From: packages/openai/src/prompts/blogs/index.ts
const prompt = `
You are writing a sophisticated blog post for **${companyName}** (${url}), 
the pioneering digital impact platform that ${description}

### Strategic Context
**Company Mission**: ${description}
**Platform Categories**: ${categories.join(", ")}
**Target Audience**: ${targetAudience}
- **Focus Areas**: ${audienceGuide.focus}
- **Tone Approach**: ${audienceGuide.tone}
- **Key Concepts**: ${audienceGuide.keywords.join(", ")}

### Content Topic
${topic}

### Writing Guidelines
**Tone**: ${TONE_GUIDELINES[tone]}

**Mission Integration**: Weave in these ${companyName} differentiators naturally:
${relevantMissionAngles.map((angle) => `- ${angle}`).join("\n")}

**Content Strategy**:
- **Depth**: Provide comprehensive insights (1200–1800 words)
- **Practical Value**: Include actionable takeaways
- **Current Relevance**: Incorporate trending topics
- **Authentic Integration**: Connect topics to ${companyName}'s mission
`;
```

**Analysis:**
- ✅ Excellent context setting
- ✅ Clear role definition
- ✅ Specific guidelines
- ✅ Output length specified
- ✅ Tone and style defined
- ✅ Mission alignment

This is a **master-level prompt** that demonstrates best practices.

---

## Best Practices Checklist

### Before Writing a Prompt

- [ ] **Define the role** - Who is the AI acting as?
- [ ] **Set the context** - What background information is needed?
- [ ] **Clarify the task** - What exactly should be done?
- [ ] **Specify output format** - How should results be structured?
- [ ] **Set constraints** - What should/shouldn't be included?
- [ ] **Choose parameters** - Temperature, max tokens, etc.

### While Writing a Prompt

- [ ] **Be specific** - Avoid vague language
- [ ] **Provide examples** - Show what good output looks like
- [ ] **Use structure** - Organize with headers, lists, sections
- [ ] **Include constraints** - Set boundaries
- [ ] **Test iteratively** - Refine based on results

### After Writing a Prompt

- [ ] **Test with various inputs** - Ensure consistency
- [ ] **Check output format** - Verify structure matches expectations
- [ ] **Validate quality** - Does output meet requirements?
- [ ] **Document patterns** - Save successful prompts for reuse
- [ ] **Iterate and improve** - Refine based on results

---

## Prompt Templates Library

### Template 1: Analysis & Improvement

```typescript
function createAnalysisPrompt(input: string, focus: string): string {
  return `
You are an expert ${focus} analyst.

Analyze the following ${inputType} and provide:

1. **Strengths**: What works well?
2. **Weaknesses**: What needs improvement?
3. **Opportunities**: What could be enhanced?
4. **Recommendations**: Specific actionable improvements

Input:
${input}

Format your response as a structured analysis with clear sections.
  `.trim();
}
```

### Template 2: Content Generation

```typescript
function createContentPrompt(
  topic: string,
  audience: string,
  tone: string,
  length: string
): string {
  return `
You are a professional content writer specializing in ${topic} for ${audience}.

Create ${length} content with:
- Tone: ${tone}
- Target audience: ${audience}
- Key message: ${message}

Topic: ${topic}

Requirements:
- Engaging introduction
- Clear structure
- Actionable insights
- Strong conclusion
  `.trim();
}
```

### Template 3: Transformation

```typescript
function createTransformPrompt(
  input: string,
  fromFormat: string,
  toFormat: string,
  constraints?: string[]
): string {
  return `
Transform the following ${fromFormat} into ${toFormat}.

Input (${fromFormat}):
${input}

Requirements:
${constraints?.map(c => `- ${c}`).join('\n') || '- Maintain all key information\n- Preserve structure'}

Output (${toFormat}):
  `.trim();
}
```

---

## Testing & Iteration

### Prompt Testing Framework

```typescript
interface PromptTest {
  name: string;
  prompt: string;
  inputs: string[];
  expectedOutputs: string[];
  temperature?: number;
}

async function testPrompt(test: PromptTest): Promise<TestResult> {
  const results = [];
  
  for (const input of test.inputs) {
    const response = await adapter.askOpenAI({
      prompt: test.prompt.replace('${input}', input),
      temperature: test.temperature || 0.7,
    });
    
    results.push({
      input,
      output: response,
      matches: validateOutput(response, test.expectedOutputs),
    });
  }
  
  return {
    passRate: calculatePassRate(results),
    results,
  };
}
```

### Iterative Refinement Process

1. **Initial Prompt** - Write first version
2. **Test** - Run with sample inputs
3. **Analyze** - Review outputs for issues
4. **Refine** - Adjust prompt based on results
5. **Repeat** - Continue until quality is consistent

---

## Resources

### Internal Documentation

- `packages/openai/README.md` - OpenAI package usage
- `packages/openai/src/prompts/blogs/` - Advanced blog prompt examples
- `apps/resume/domains/Resume/hooks/useResumeAI.ts` - Resume AI patterns

### External Resources

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Prompt Engineering Institute](https://www.promptingguide.ai/)

---

## Quick Reference

### Temperature by Use Case

| Task | Temperature |
|------|-------------|
| Code generation | 0.0 - 0.3 |
| Data extraction | 0.0 - 0.3 |
| Factual Q&A | 0.0 - 0.3 |
| Analysis | 0.4 - 0.6 |
| Writing | 0.6 - 0.8 |
| Creative writing | 0.8 - 1.0 |
| Brainstorming | 0.9 - 1.2 |

### Prompt Structure Checklist

- [ ] Role/Persona defined
- [ ] Context provided
- [ ] Task clearly stated
- [ ] Input data included
- [ ] Output format specified
- [ ] Constraints listed
- [ ] Examples provided (if needed)
- [ ] Parameters set appropriately

---

## Conclusion

Effective prompt engineering is both an art and a science. The key principles are:

1. **Be specific** - Clear instructions yield better results
2. **Provide context** - More context = better understanding
3. **Iterate** - Test and refine continuously
4. **Document** - Save successful patterns
5. **Learn from examples** - Study what works

Remember: **The best prompt is the one that consistently produces the desired output for your specific use case.**
