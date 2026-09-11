from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ai import generate_quiz


app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Quiz Generator Backend is running"
    }


@app.post("/generate-quiz")
def generate_quiz_api(data: dict):

    try:
        topic = data.get("topic")

        difficulty = data.get(
            "difficulty",
            "medium"
        )

        number_of_questions = data.get(
            "number_of_questions",
            2
        )

        if not topic:
            return {
                "error": "Topic is required"
            }

        quiz = generate_quiz(
            topic,
            difficulty,
            number_of_questions
        )

        return {
            "topic": topic,
            "difficulty": difficulty,
            "number_of_questions": number_of_questions,
            "questions": quiz["questions"]
        }

    except Exception as e:

        print("ERROR:", repr(e))

        return {
            "error": str(e),
            "error_type": type(e).__name__
        }
