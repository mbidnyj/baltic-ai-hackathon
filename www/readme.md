# Backend Setup Instructions

## To Start Backend:

1. Navigate to the `www` folder
2. Run the command: `node index.js`
3. The development server will be started on `http://localhost:8080/`

## API Endpoints Description:

### GET: `http://localhost:8080/api/user`

**Response Example:**

```json
{
    "user_id": "1",
    "username": "maksym-bidnyi",
    "password": "password",
    "name": "Maksym",
    "surname": "Bidnyi",
    "email": "maksym-bidnyi@gmail.com",
    "role": "student"
}
```

### GET / POST: `http://localhost:8080/api/module`

**Response Example:**

```json
{
    "quiz": [
        {
            "question_id": "1",
            "question": "multiple choice",
            "options": ["option1", "option2", "option3", "option4"],
            "correct_answer": "option2",
            "hint": "Probably answer 2 is correct :)"
        },
        {
            "question_id": "2",
            "question": "multiple choice",
            "options": ["option1", "option2", "option3", "option4"],
            "correct_answer": "option3",
            "hint": "Probably answer 3 is correct :)"
        },
        {
            "question_id": "3",
            "question": "multiple choice",
            "options": ["option1", "option2", "option3", "option4"],
            "correct_answer": "option4",
            "hint": "Probably answer 3 is correct :)"
        }
    ]
}
```

### GET: `http://localhost:8080/api/recommendation` (Recommendation for teacher)

**Response Example:**

```json
{
    "personalized_studying_materials": "NEW PERSONALIZED MATERIAL",
    "personalized_quiz": [
        {
            "question_id": "1",
            "question": "multiple choice",
            "options": ["option1", "option2", "option3", "option4"],
            "correct_answer": "option2",
            "hint": "Probably answer 2 is correct :)"
        },
        {
            "question_id": "2",
            "question": "multiple choice",
            "options": ["option1", "option2", "option3", "option4"],
            "correct_answer": "option3",
            "hint": "Probably answer 3 is correct :)"
        },
        {
            "question_id": "3",
            "question": "multiple choice",
            "options": ["option1", "option2", "option3", "option4"],
            "correct_answer": "option4",
            "hint": "Probably answer 4 is correct :)"
        }
    ]
}
```

### GET: `http://localhost:8080/api/recommendation?userId=1` (Recommendation for student)

**Example Response:**

```json
{
    "personalized_text_rec": "PERSONALIZED TEXT RECOMMENDATION",
    "personalized_flashcard_rec": {
        "back": "PERSONALIZED FLASHCARD BACK",
        "front": "PERSONALIZED FLASHCARD FRONT"
    }
}
```
