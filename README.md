
# EduAI Web Platform - README

## Problem Statement

### Main Problem: Lack of Personalized Attention

Modern education faces a significant challenge: **students do not receive enough personalized attention** from teachers due to limited time and resources. Additionally, individuals have **different learning patterns and habits**, and conventional teaching methods do not always cater to every student’s needs. The result is an **inconvenient and ineffective learning experience** for many students, as not everything works for everyone.

## Solution

### EduAI Web Platform (Running Locally!)

Our solution is a **web platform** that enhances personalized learning, supporting various study strategies and providing intelligent feedback based on student performance.

Key Features:
- **Support for Different Study Strategies:** Flashcards, audio learning, and quizzes.
- **Self-Evaluation Quizzes:** Multiple choice tests, open-ended questions, and one-correct-answer questions.
- **Adaptive Quizzes:** If a student answers incorrectly, the next iteration of the quiz will include more questions on the problematic topics, encouraging the student to focus on specific areas.
- **Personalized Study Suggestions:** The system provides tailored study recommendations based on the student’s performance.
- **Teacher Dashboard:** Teachers can monitor overall student performance to identify learning gaps and focus on problematic areas.

## Figma Demos

1. **Teacher's Viewpoint:**
   [Figma Demo (Teacher's View)](https://www.figma.com/proto/f4WNBYTFg3jRXi2fjNzeDw/EduAI?node-id=22-993&node-type=canvas&t=ftvFokFM77JBCq9K-1&scaling=min-zoom&content-scaling=fixed&page-id=22%3A992&starting-point-node-id=22%3A993&show-proto-sidebar=1)

2. **Student's Viewpoint:**
   [Figma Demo (Student's View)](https://www.figma.com/proto/f4WNBYTFg3jRXi2fjNzeDw/EduAI?node-id=73-33698&node-type=canvas&t=CxXBMDsTknsMASBm-1&scaling=min-zoom&content-scaling=fixed&page-id=73%3A28600&starting-point-node-id=73%3A33698&show-proto-sidebar=1)  
   This demo includes the entire onboarding flow and a self-evaluation quiz experience for students.

## Project Status & Goals

### What's Done So Far
As of **Sunday morning (06.10)**, we have successfully integrated our web platform with **Llama 3.2 70b**, which enables:
- **Teacher Upload:** Teachers can upload study materials in PDF format.
- **Automatic Quiz Generation:** The platform automatically generates self-evaluation quizzes for students.
- **Personalized Feedback:** Students receive tailored feedback after completing quizzes. If a student gets a question wrong, the language model generates more questions on that topic to help identify and close the knowledge gap. 
- **Study Suggestions:** Personalized study recommendations are provided to assist students in their learning journey.

### Goal of the Project
This project is designed to be used alongside traditional classroom teaching. It serves as a **professional extension for teachers**, helping them deliver **individualized feedback** to students more efficiently, saving time, and enhancing the learning experience.
