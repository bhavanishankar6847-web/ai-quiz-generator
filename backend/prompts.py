def create_quiz_prompt(topic, difficulty, number_of_questions):
    return f"""
Generate {number_of_questions} multiple-choice quiz questions.

Topic:
{topic}

Difficulty:
{difficulty}

Requirements:

1. Generate exactly {number_of_questions} questions.
2. Each question must have exactly 4 options.
3. Only one option must be correct.
4. Questions must be educational and accurate.
5. Cover different concepts within the topic.
6. Avoid duplicate questions.
7. Provide a short explanation for every question.
8. The explanation must be approximately 2 sentences.
9. The explanation should help the student understand why the correct answer is correct.
10. Return ONLY valid JSON.
11. Do not use Markdown.
12. The "answer" must exactly match one of the four options.

Return JSON in exactly this format:

{{
    "questions": [
        {{
            "question": "Question text",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "answer": "Correct option",
            "explanation": "First sentence explaining the correct answer. Second sentence providing additional learning context."
        }}
    ]
}}
"""
