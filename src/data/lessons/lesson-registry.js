/**
 * Add reviewed runtime candidates or published lessons here. Keeping each lesson behind an import function means
 * the browser downloads lesson content only when a learner opens that day.
 *
 * Example:
 * [1, () => import("./candidates/day-001.js")],
 *
 * Each lesson module default-exports a lesson created with defineLesson(). The
 * stable model is { title, summary, steps: [{ id, type, title, body, ... }] }.
 * Step ids are persisted, so never reuse or casually rename a published id.
 */
export const lessonRegistry = new Map();
