import os
import json

from dotenv import load_dotenv
from openai import OpenAI

from prompts import create_quiz_prompt


# Load backend/.env
load_dotenv()

# Read API key
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError(
        "OPENAI_API_KEY is missing. Check backend/.env"
    )

# Create OpenAI client
client = OpenAI(api_key=api_key)


def generate_quiz(topic, difficulty, number_of_questions):

    prompt = create_quiz_prompt(
        topic,
        difficulty,
        number_of_questions
    )

    response = client.responses.create(
        model="gpt-5.6-luna",
        input=prompt
    )

    result = response.output_text

    print("AI RESPONSE:")
    print(result)

    return json.loads(result)
