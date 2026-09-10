import os
import json
from openai import OpenAI
from dotenv import load_dotenv

from prompts import create_quiz_prompt

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


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

    return json.loads(result)
