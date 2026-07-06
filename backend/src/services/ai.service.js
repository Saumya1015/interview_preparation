// const { GoogleGenAI } = require("@google/genai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")
// const puppeteer = require("puppeteer")

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })

// // schema for ai 
// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).min(5).describe("At least 5 technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).min(5).describe("At least 5 behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).min(7).describe("A day-wise preparation plan for the candidate, AT LEAST 7 days, extended further if the skill gaps and job requirements need more preparation time"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })
// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

//     const prompt = `Generate an interview report for a candidate with the following details:
// Resume: ${resume}
// Self Description: ${selfDescription}
// Job Description: ${jobDescription}

// Requirements:
// - "technicalQuestions" MUST contain AT LEAST 5 questions (more if the resume/job description gives enough material to justify it).
// - "behavioralQuestions" MUST contain AT LEAST 5 questions (more if the resume/job description gives enough material to justify it).
// - "preparationPlan" MUST contain AT LEAST 7 entries (day 1 to day 7 minimum), forming a complete day-wise preparation plan. If the candidate's skill gaps or the job's requirements are significant, extend the plan beyond 7 days (e.g. 10, 14 days) as needed to properly cover preparation. Each day should have a distinct focus area and a realistic set of tasks that build on the previous days.

// Return ONLY a valid JSON object with EXACTLY this structure and these exact field names (no extra fields, no missing fields):

// {
//   "title": "string - the job title for this interview",
//   "matchScore": number between 0-100,
//   "technicalQuestions": [
//     { "question": "string", "intention": "string", "answer": "string" }
//   ],
//   "behavioralQuestions": [
//     { "question": "string", "intention": "string", "answer": "string" }
//   ],
//   "skillGaps": [
//     { "skill": "string", "severity": "low" or "medium" or "high" }
//   ],
//   "preparationPlan": [
//     { "day": number, "focus": "string", "tasks": ["string", "string"] }
//   ]
// }`

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//         }
//     })

//     const parsed = JSON.parse(response.text)

//     const result = interviewReportSchema.safeParse(parsed)
//     if (!result.success) {
//         console.error("AI returned invalid structure:", JSON.stringify(result.error.issues, null, 2))
//         throw new Error("AI failed to generate a valid report structure. Please try again.")
//     }

//     return result.data
// }

// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close() // to free ram

//     return pdfBuffer
// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(resumePdfSchema),
//         }
//     })


//     const jsonContent = JSON.parse(response.text)

//     const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

//     return pdfBuffer

// }

// module.exports = { generateInterviewReport, generateResumePdf }







// const { GoogleGenAI } = require("@google/genai")
// const { z } = require("zod")
// const puppeteer = require("puppeteer")

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })

// // ---------------------------------------------------------------------------
// // INTERVIEW REPORT (unchanged logic, kept as-is from your original code)
// // ---------------------------------------------------------------------------
// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question that can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).min(5).describe("At least 5 technical questions along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question that can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).min(5).describe("At least 5 behavioral questions along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day"),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day")
//     })).min(7).describe("A day-wise preparation plan, AT LEAST 7 days"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
//     const prompt = `Generate an interview report for a candidate with the following details:
// Resume: ${resume}
// Self Description: ${selfDescription}
// Job Description: ${jobDescription}

// Requirements:
// - "technicalQuestions" MUST contain AT LEAST 5 questions.
// - "behavioralQuestions" MUST contain AT LEAST 5 questions.
// - "preparationPlan" MUST contain AT LEAST 7 entries, extended further if needed.

// Return ONLY a valid JSON object matching the required structure, no extra text.`

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config: { responseMimeType: "application/json" }
//     })

//     const parsed = JSON.parse(response.text)
//     const result = interviewReportSchema.safeParse(parsed)
//     if (!result.success) {
//         console.error("AI returned invalid structure:", JSON.stringify(result.error.issues, null, 2))
//         throw new Error("AI failed to generate a valid report structure. Please try again.")
//     }
//     return result.data
// }

// // ---------------------------------------------------------------------------
// // RESUME PDF — FIXED to always produce the "resumefinal.pdf" style layout
// // Instead of asking the AI for raw HTML (inconsistent), we ask it for
// // structured CONTENT only, then render that content into a fixed, tested
// // HTML/CSS template. This guarantees the same professional look every time.
// // ---------------------------------------------------------------------------

// const resumeContentSchema = z.object({
//     name: z.string(),
//     phone: z.string(),
//     email: z.string(),
//     links: z.array(z.object({
//         label: z.string().describe("e.g. LinkedIn, GitHub, LeetCode"),
//         url: z.string()
//     })).describe("Profile links, in the order they should appear"),
//     education: z.array(z.object({
//         institution: z.string(),
//         location: z.string(),
//         degree: z.string(),
//         dateRange: z.string()
//     })),
//     experience: z.array(z.object({
//         company: z.string(),
//         location: z.string(),
//         role: z.string(),
//         duration: z.string(),
//         bullets: z.array(z.string())
//     })),
//     projects: z.array(z.object({
//         name: z.string(),
//         tech: z.string().describe("Comma separated tech stack"),
//         bullets: z.array(z.string())
//     })),
//     certifications: z.array(z.string()),
//     achievements: z.array(z.object({
//         title: z.string(),
//         dateRange: z.string(),
//         description: z.string()
//     })),
//     skills: z.array(z.object({
//         category: z.string().describe("e.g. Languages, Frameworks, Developer Tools, Coursework"),
//         items: z.array(z.string())
//     }))
// })

// // IMPORTANT: Do NOT rely on zodToJsonSchema() for this — with nested
// // arrays-of-objects it produces "$ref"/"anyOf" constructs that Gemini's
// // responseSchema does not reliably honor, causing it to silently fall back
// // to flat strings instead of nested objects (which is exactly the bug we
// // hit). Writing the schema by hand, flat and explicit, is the reliable fix.
// const GEMINI_RESUME_SCHEMA = {
//     type: "object",
//     properties: {
//         name: { type: "string" },
//         phone: { type: "string" },
//         email: { type: "string" },
//         links: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     label: { type: "string" },
//                     url: { type: "string" }
//                 },
//                 required: ["label", "url"]
//             }
//         },
//         education: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     institution: { type: "string" },
//                     location: { type: "string" },
//                     degree: { type: "string" },
//                     dateRange: { type: "string" }
//                 },
//                 required: ["institution", "location", "degree", "dateRange"]
//             }
//         },
//         experience: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     company: { type: "string" },
//                     location: { type: "string" },
//                     role: { type: "string" },
//                     duration: { type: "string" },
//                     bullets: { type: "array", items: { type: "string" } }
//                 },
//                 required: ["company", "location", "role", "duration", "bullets"]
//             }
//         },
//         projects: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     name: { type: "string" },
//                     tech: { type: "string" },
//                     bullets: { type: "array", items: { type: "string" } }
//                 },
//                 required: ["name", "tech", "bullets"]
//             }
//         },
//         certifications: { type: "array", items: { type: "string" } },
//         achievements: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     title: { type: "string" },
//                     dateRange: { type: "string" },
//                     description: { type: "string" }
//                 },
//                 required: ["title", "dateRange", "description"]
//             }
//         },
//         skills: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     category: { type: "string" },
//                     items: { type: "array", items: { type: "string" } }
//                 },
//                 required: ["category", "items"]
//             }
//         }
//     },
//     required: ["name", "phone", "email", "links", "education", "experience", "projects", "certifications", "achievements", "skills"]
// }

// function escapeHtml(str = "") {
//     return String(str)
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
// }

// // Builds HTML that mirrors the target resume's look:
// // serif font, photo circle top-left, small-caps section headers with a rule
// // underneath, consistent gaps between entries, two-column rows
// // (title left / date-location right). Kept ATS-friendly: real selectable
// // text throughout, no tables, no multi-column text flow, no text inside
// // images — the photo is purely decorative (CSS circle with initials).
// function buildResumeHtml(data) {
//     const linksHtml = data.links
//         .map(l => `<a href="${escapeHtml(l.url)}">${escapeHtml(l.label)}</a>`)
//         .join(" &nbsp;|&nbsp; ")

//     const educationHtml = data.education.map(e => `
//         <div class="entry">
//             <div class="row">
//                 <span class="bold">${escapeHtml(e.institution)}</span>
//                 <span class="right">${escapeHtml(e.location)}</span>
//             </div>
//             <div class="row">
//                 <span class="italic">${escapeHtml(e.degree)}</span>
//                 <span class="italic right">${escapeHtml(e.dateRange)}</span>
//             </div>
//         </div>
//     `).join("")

//     const experienceHtml = data.experience.map(e => `
//         <div class="entry">
//             <div class="row">
//                 <span class="bold">${escapeHtml(e.company)}</span>
//                 <span class="right">${escapeHtml(e.location)}</span>
//             </div>
//             <div class="row">
//                 <span class="italic">${escapeHtml(e.role)}</span>
//                 <span class="italic right">${escapeHtml(e.duration)}</span>
//             </div>
//             <ul>
//                 ${e.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
//             </ul>
//         </div>
//     `).join("")

//     const projectsHtml = data.projects.map(p => `
//         <div class="entry">
//             <div class="row">
//                 <span><span class="bold">${escapeHtml(p.name)}</span>&nbsp; | &nbsp;<span class="italic">${escapeHtml(p.tech)}</span></span>
//             </div>
//             <ul>
//                 ${p.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
//             </ul>
//         </div>
//     `).join("")

//     const certificationsHtml = `<ul class="tight">${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`

//     const achievementsHtml = data.achievements.map(a => `
//         <div class="entry">
//             <div class="row">
//                 <span class="bold">${escapeHtml(a.title)}</span>
//                 <span class="right">${escapeHtml(a.dateRange)}</span>
//             </div>
//             <div>${escapeHtml(a.description)}</div>
//         </div>
//     `).join("")

//     const skillsHtml = `<ul class="skills tight">
//         ${data.skills.map(s => `<li><span class="bold">${escapeHtml(s.category)}:</span> ${escapeHtml(s.items.join(", "))}</li>`).join("")}
//     </ul>`

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <title>${escapeHtml(data.name)} - Resume</title>
// <style>
//     @page { margin: 0; }
//     * { box-sizing: border-box; }
//     body {
//         font-family: Georgia, 'Times New Roman', serif;
//         color: #111;
//         font-size: 10.3pt;
//         line-height: 1.42;
//         margin: 0;
//         padding: 10mm 12mm;
//     }
//     .header {
//         text-align: center;
//         margin-bottom: 4px;
//     }
//     .header .name {
//         font-size: 21pt;
//         letter-spacing: 0.5px;
//         margin: 0;
//     }
//     .header .contact {
//         font-size: 9.3pt;
//         margin-top: 3px;
//     }
//     .header .contact a { color: #111; text-decoration: underline; }

//     h2.section {
//         font-variant: small-caps;
//         font-size: 11.5pt;
//         letter-spacing: 0.6px;
//         border-bottom: 0.75px solid #333;
//         margin: 12px 0 5px 0;
//         padding-bottom: 2px;
//     }
//     .row {
//         display: flex;
//         justify-content: space-between;
//         align-items: baseline;
//         gap: 8px;
//     }
//     .right { text-align: right; white-space: nowrap; }
//     .bold { font-weight: bold; }
//     .italic { font-style: italic; }

//     .entry { margin-bottom: 7px; }
//     .entry:last-child { margin-bottom: 0; }

//     ul {
//         margin: 3px 0 0 0;
//         padding-left: 15px;
//     }
//     ul li { margin-bottom: 2px; }
//     ul.tight { margin-top: 0; }
//     ul.skills { padding-left: 0; list-style: none; }
//     ul.skills li { margin-bottom: 3px; }
// </style>
// </head>
// <body>
//     <div class="header">
//         <div class="name">${escapeHtml(data.name)}</div>
//         <div class="contact">${escapeHtml(data.phone)} &nbsp;|&nbsp; ${escapeHtml(data.email)} &nbsp;|&nbsp; ${linksHtml}</div>
//     </div>

//     <h2 class="section">Education</h2>
//     ${educationHtml}

//     <h2 class="section">Experience</h2>
//     ${experienceHtml}

//     <h2 class="section">Projects</h2>
//     ${projectsHtml}

//     <h2 class="section">Certifications</h2>
//     ${certificationsHtml}

//     <h2 class="section">Achievements</h2>
//     ${achievementsHtml}

//     <h2 class="section">Technical Skills</h2>
//     ${skillsHtml}
// </body>
// </html>`
// }

// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//         args: ["--no-sandbox", "--disable-setuid-sandbox"]
//     })
//     const page = await browser.newPage()
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4",
//         printBackground: true,
//         margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" }
//     })

//     await browser.close() // to free ram
//     return pdfBuffer
// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {
//     const prompt = `You are tailoring a candidate's resume content for a specific job, based on:
// Resume: ${resume}
// Self Description: ${selfDescription}
// Job Description: ${jobDescription}

// Extract and rewrite the candidate's resume CONTENT ONLY (do not generate HTML/CSS — that is handled separately).
// Rules:
// - Tailor wording, bullet emphasis, and skill ordering to match the job description.
// - Keep it factual to the original resume — do not invent employers, degrees, or dates.
// - Bullets should sound human-written, concise, and quantify impact where the source resume already implies numbers.
// - Keep total content compact enough to fit 1-2 A4 pages.
// - Order skills, projects, and experience by relevance to the job description.

// Return ONLY a valid JSON object matching the required schema exactly.`

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: GEMINI_RESUME_SCHEMA,
//         }
//     })

//     const parsed = JSON.parse(response.text)
//     const result = resumeContentSchema.safeParse(parsed)
//     if (!result.success) {
//         console.error("AI returned invalid resume structure:", JSON.stringify(result.error.issues, null, 2))
//         throw new Error("AI failed to generate a valid resume structure. Please try again.")
//     }

//     const html = buildResumeHtml(result.data)
//     const pdfBuffer = await generatePdfFromHtml(html)
//     return pdfBuffer
// }

// module.exports = { generateInterviewReport, generateResumePdf }








const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// ---------------------------------------------------------------------------
// INTERVIEW REPORT
// ---------------------------------------------------------------------------
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(5).describe("At least 5 technical questions along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(5).describe("At least 5 behavioral questions along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day")
    })).min(7).describe("A day-wise preparation plan, AT LEAST 7 days"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

// Explicit Gemini-format schema (same reasoning as the resume schema below):
// letting Gemini "guess" the JSON shape from prompt text alone causes it to
// occasionally drop fields (like skillGaps) or return the wrong shape.
// Passing responseSchema forces Gemini to always include every required field.
const GEMINI_INTERVIEW_SCHEMA = {
    type: "object",
    properties: {
        matchScore: { type: "number" },
        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    severity: { type: "string", enum: ["low", "medium", "high"] }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    focus: { type: "string" },
                    tasks: { type: "array", items: { type: "string" } }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: { type: "string" }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Requirements:
- "technicalQuestions" MUST contain AT LEAST 5 questions.
- "behavioralQuestions" MUST contain AT LEAST 5 questions.
- "skillGaps" MUST be included, even if it is an empty array when there are no notable gaps.
- "preparationPlan" MUST contain AT LEAST 7 entries, extended further if needed.

Return ONLY a valid JSON object matching the required structure, no extra text.`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: GEMINI_INTERVIEW_SCHEMA
        }
    })

    const parsed = JSON.parse(response.text)
    const result = interviewReportSchema.safeParse(parsed)
    if (!result.success) {
        console.error("AI returned invalid structure:", JSON.stringify(result.error.issues, null, 2))
        throw new Error("AI failed to generate a valid report structure. Please try again.")
    }
    return result.data
}

// ---------------------------------------------------------------------------
// RESUME PDF — FIXED to always produce the "resumefinal.pdf" style layout
// Instead of asking the AI for raw HTML (inconsistent), we ask it for
// structured CONTENT only, then render that content into a fixed, tested
// HTML/CSS template. This guarantees the same professional look every time.
// ---------------------------------------------------------------------------

const resumeContentSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    links: z.array(z.object({
        label: z.string().describe("e.g. LinkedIn, GitHub, LeetCode"),
        url: z.string()
    })).describe("Profile links, in the order they should appear"),
    education: z.array(z.object({
        institution: z.string(),
        location: z.string(),
        degree: z.string(),
        dateRange: z.string()
    })),
    experience: z.array(z.object({
        company: z.string(),
        location: z.string(),
        role: z.string(),
        duration: z.string(),
        bullets: z.array(z.string())
    })),
    projects: z.array(z.object({
        name: z.string(),
        tech: z.string().describe("Comma separated tech stack"),
        bullets: z.array(z.string())
    })),
    certifications: z.array(z.string()),
    achievements: z.array(z.object({
        title: z.string(),
        dateRange: z.string(),
        description: z.string()
    })),
    skills: z.array(z.object({
        category: z.string().describe("e.g. Languages, Frameworks, Developer Tools, Coursework"),
        items: z.array(z.string())
    }))
})

// IMPORTANT: Do NOT rely on zodToJsonSchema() for this — with nested
// arrays-of-objects it produces "$ref"/"anyOf" constructs that Gemini's
// responseSchema does not reliably honor, causing it to silently fall back
// to flat strings instead of nested objects (which is exactly the bug we
// hit). Writing the schema by hand, flat and explicit, is the reliable fix.
const GEMINI_RESUME_SCHEMA = {
    type: "object",
    properties: {
        name: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        links: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    label: { type: "string" },
                    url: { type: "string" }
                },
                required: ["label", "url"]
            }
        },
        education: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    institution: { type: "string" },
                    location: { type: "string" },
                    degree: { type: "string" },
                    dateRange: { type: "string" }
                },
                required: ["institution", "location", "degree", "dateRange"]
            }
        },
        experience: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    company: { type: "string" },
                    location: { type: "string" },
                    role: { type: "string" },
                    duration: { type: "string" },
                    bullets: { type: "array", items: { type: "string" } }
                },
                required: ["company", "location", "role", "duration", "bullets"]
            }
        },
        projects: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    tech: { type: "string" },
                    bullets: { type: "array", items: { type: "string" } }
                },
                required: ["name", "tech", "bullets"]
            }
        },
        certifications: { type: "array", items: { type: "string" } },
        achievements: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    dateRange: { type: "string" },
                    description: { type: "string" }
                },
                required: ["title", "dateRange", "description"]
            }
        },
        skills: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    category: { type: "string" },
                    items: { type: "array", items: { type: "string" } }
                },
                required: ["category", "items"]
            }
        }
    },
    required: ["name", "phone", "email", "links", "education", "experience", "projects", "certifications", "achievements", "skills"]
}

function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

// Builds HTML that mirrors the target resume's look:
// serif font, photo circle top-left, small-caps section headers with a rule
// underneath, consistent gaps between entries, two-column rows
// (title left / date-location right). Kept ATS-friendly: real selectable
// text throughout, no tables, no multi-column text flow, no text inside
// images — the photo is purely decorative (CSS circle with initials).
function buildResumeHtml(data) {
    const linksHtml = data.links
        .map(l => `<a href="${escapeHtml(l.url)}">${escapeHtml(l.label)}</a>`)
        .join(" &nbsp;|&nbsp; ")

    const educationHtml = data.education.map(e => `
        <div class="entry">
            <div class="row">
                <span class="bold">${escapeHtml(e.institution)}</span>
                <span class="right">${escapeHtml(e.location)}</span>
            </div>
            <div class="row">
                <span class="italic">${escapeHtml(e.degree)}</span>
                <span class="italic right">${escapeHtml(e.dateRange)}</span>
            </div>
        </div>
    `).join("")

    const experienceHtml = data.experience.map(e => `
        <div class="entry">
            <div class="row">
                <span class="bold">${escapeHtml(e.company)}</span>
                <span class="right">${escapeHtml(e.location)}</span>
            </div>
            <div class="row">
                <span class="italic">${escapeHtml(e.role)}</span>
                <span class="italic right">${escapeHtml(e.duration)}</span>
            </div>
            <ul>
                ${e.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
            </ul>
        </div>
    `).join("")

    const projectsHtml = data.projects.map(p => `
        <div class="entry">
            <div class="row">
                <span><span class="bold">${escapeHtml(p.name)}</span>&nbsp; | &nbsp;<span class="italic">${escapeHtml(p.tech)}</span></span>
            </div>
            <ul>
                ${p.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
            </ul>
        </div>
    `).join("")

    const certificationsHtml = `<ul class="tight">${data.certifications.map(c => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`

    const achievementsHtml = data.achievements.map(a => `
        <div class="entry">
            <div class="row">
                <span class="bold">${escapeHtml(a.title)}</span>
                <span class="right">${escapeHtml(a.dateRange)}</span>
            </div>
            <div>${escapeHtml(a.description)}</div>
        </div>
    `).join("")

    const skillsHtml = `<ul class="skills tight">
        ${data.skills.map(s => `<li><span class="bold">${escapeHtml(s.category)}:</span> ${escapeHtml(s.items.join(", "))}</li>`).join("")}
    </ul>`

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(data.name)} - Resume</title>
<style>
    @page { margin: 0; }
    * { box-sizing: border-box; }
    body {
        font-family: Georgia, 'Times New Roman', serif;
        color: #111;
        font-size: 10.3pt;
        line-height: 1.42;
        margin: 0;
        padding: 10mm 12mm;
    }
    .header {
        text-align: center;
        margin-bottom: 4px;
    }
    .header .name {
        font-size: 21pt;
        letter-spacing: 0.5px;
        margin: 0;
    }
    .header .contact {
        font-size: 9.3pt;
        margin-top: 3px;
    }
    .header .contact a { color: #111; text-decoration: underline; }

    h2.section {
        font-variant: small-caps;
        font-size: 11.5pt;
        letter-spacing: 0.6px;
        border-bottom: 0.75px solid #333;
        margin: 12px 0 5px 0;
        padding-bottom: 2px;
    }
    .row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
    }
    .right { text-align: right; white-space: nowrap; }
    .bold { font-weight: bold; }
    .italic { font-style: italic; }

    .entry { margin-bottom: 7px; }
    .entry:last-child { margin-bottom: 0; }

    ul {
        margin: 3px 0 0 0;
        padding-left: 15px;
    }
    ul li { margin-bottom: 2px; }
    ul.tight { margin-top: 0; }
    ul.skills { padding-left: 0; list-style: none; }
    ul.skills li { margin-bottom: 3px; }
</style>
</head>
<body>
    <div class="header">
        <div class="name">${escapeHtml(data.name)}</div>
        <div class="contact">${escapeHtml(data.phone)} &nbsp;|&nbsp; ${escapeHtml(data.email)} &nbsp;|&nbsp; ${linksHtml}</div>
    </div>

    <h2 class="section">Education</h2>
    ${educationHtml}

    <h2 class="section">Experience</h2>
    ${experienceHtml}

    <h2 class="section">Projects</h2>
    ${projectsHtml}

    <h2 class="section">Certifications</h2>
    ${certificationsHtml}

    <h2 class="section">Achievements</h2>
    ${achievementsHtml}

    <h2 class="section">Technical Skills</h2>
    ${skillsHtml}
</body>
</html>`
}

// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//         args: ["--no-sandbox", "--disable-setuid-sandbox"]
//     })

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    })
    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" }
    })

    await browser.close() // to free ram
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `You are tailoring a candidate's resume content for a specific job, based on:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Extract and rewrite the candidate's resume CONTENT ONLY (do not generate HTML/CSS — that is handled separately).
Rules:
- Tailor wording, bullet emphasis, and skill ordering to match the job description.
- Keep it factual to the original resume — do not invent employers, degrees, or dates.
- Bullets should sound human-written, concise, and quantify impact where the source resume already implies numbers.
- Keep total content compact enough to fit 1-2 A4 pages.
- Order skills, projects, and experience by relevance to the job description.

Return ONLY a valid JSON object matching the required schema exactly.`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: GEMINI_RESUME_SCHEMA,
        }
    })

    const parsed = JSON.parse(response.text)
    const result = resumeContentSchema.safeParse(parsed)
    if (!result.success) {
        console.error("AI returned invalid resume structure:", JSON.stringify(result.error.issues, null, 2))
        throw new Error("AI failed to generate a valid resume structure. Please try again.")
    }

    const html = buildResumeHtml(result.data)
    const pdfBuffer = await generatePdfFromHtml(html)
    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }
