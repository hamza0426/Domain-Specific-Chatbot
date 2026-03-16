"""
╔══════════════════════════════════════════════════════════╗
║         HamChat - Domain AI Chatbot Backend              ║
║         Fine-tuned T5 | Healthcare & Finance             ║
║         Author: Muhammad Hamza Owais                     ║
╚══════════════════════════════════════════════════════════╝

Run: python app.py
Requirements: pip install flask flask-cors transformers torch sentencepiece
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import T5Tokenizer, T5ForConditionalGeneration
import re
import torch
import random

app = Flask(__name__)
CORS(app)

# ─── Load Model ──────────────────────────────────────────────
print("🚀 Starting HamChat Backend...")
print("📦 Loading T5 model...")

MODEL_PATH = "./chatbot_model"  # ← Your saved model folder path

try:
    tokenizer = T5Tokenizer.from_pretrained(MODEL_PATH)
    model = T5ForConditionalGeneration.from_pretrained(MODEL_PATH)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    model.eval()
    print(f"✅ Model loaded successfully on: {device}")
except Exception as e:
    print(f"❌ Model load failed: {e}")
    tokenizer = None
    model = None
    device = "cpu"


# ─── Text Cleaning (same as training) ────────────────────────
def clean_text(text):
    text = re.sub(r'\r\n', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'<.*?>', '', text)
    text = text.strip().lower()
    return text


# ─── Custom Identity & Fallback Rules ─────────────────────────
# These are matched BEFORE the model runs — override with custom answers

CUSTOM_RULES = {
    # Identity / Creator questions
    "who are you": "I'm HamChat, an AI assistant built and fine-tuned by Muhammad Hamza Owais. I specialize in Healthcare and Finance queries.",
    "who made you": "I was created and fine-tuned by Muhammad Hamza Owais as part of a Generative AI project. I'm powered by a T5 model trained on domain-specific data.",
    "who created you": "Muhammad Hamza Owais created and fine-tuned me! I'm a T5-based chatbot specialized in Healthcare and Finance domains.",
    "who built you": "I was built by Muhammad Hamza Owais using the T5 transformer model, fine-tuned on a custom Healthcare and Finance dataset.",
    "what is your name": "My name is HamChat! I'm a domain-specific AI assistant fine-tuned by Muhammad Hamza Owais.",
    "what are you": "I'm HamChat — a fine-tuned T5 language model specialized in answering Healthcare and Finance questions. I was built by Muhammad Hamza Owais.",
    "tell me about yourself": "I'm HamChat, an AI chatbot fine-tuned by Muhammad Hamza Owais using the T5 transformer. I'm trained on a custom dataset covering Healthcare and Finance domains to give accurate, domain-specific answers.",
    "hamza": "Yes, Muhammad Hamza Owais is my creator! He fine-tuned me as part of his Generative AI project.",
    "your creator": "Muhammad Hamza Owais is my creator. He fine-tuned me using Hugging Face Transformers on a custom domain-specific dataset.",

    # Greetings
    "hello": "Hello! I'm HamChat 👋 I can answer questions about Healthcare and Finance. What would you like to know?",
    "hi": "Hi there! I'm HamChat, your domain-specific AI assistant. Ask me anything about Healthcare or Finance!",
    "hey": "Hey! Welcome to HamChat. I'm here to help with Healthcare and Finance queries. What's your question?",
    "good morning": "Good morning! I'm HamChat, ready to assist you with Healthcare and Finance questions. How can I help today?",
    "good evening": "Good evening! HamChat is here for you. Ask me anything about Healthcare or Finance!",
    "how are you": "I'm running great! Ready to assist you with Healthcare and Finance questions. What would you like to know?",

    # Thanks
    "thank you": "You're welcome! Feel free to ask more Healthcare or Finance questions anytime. 😊",
    "thanks": "Happy to help! Let me know if you have more questions about Healthcare or Finance.",
    "that's helpful": "Glad I could help! For more detailed assistance, visit our website or contact support.",

    # About the project
    "how were you trained": "I was fine-tuned using Hugging Face Transformers on a custom dataset of 3,000 Healthcare and Finance query-response pairs. The base model is T5-small, trained for 10 epochs.",
    "what model are you": "I'm powered by T5-small (Text-to-Text Transfer Transformer) fine-tuned by Muhammad Hamza Owais on domain-specific Healthcare and Finance data.",
    "what can you do": "I can answer questions about: 💊 Healthcare (appointments, medications, symptoms, vaccines) and 💰 Finance (account balance, loans, credit cards, interest rates). Try asking me something!",
    "what topics": "I'm trained on two domains: Healthcare (appointments, medications, flu symptoms, vaccine side effects) and Finance (account balance, loans, credit cards, contact updates). Ask away!",
}

# ─── Confidence Threshold Keywords ────────────────────────────
# If query contains NONE of these domain keywords, likely out-of-scope
DOMAIN_KEYWORDS = [
    # Healthcare
    "doctor", "appointment", "medication", "dose", "vaccine", "symptom",
    "flu", "fever", "cough", "healthcare", "medical", "clinic", "hospital",
    "health", "sick", "treatment", "prescription", "covid", "injection",
    # Finance
    "account", "balance", "loan", "credit", "bank", "interest", "rate",
    "payment", "finance", "money", "card", "lost card", "student loan",
    "repayment", "transfer", "transaction", "contact", "update", "details",
]

FALLBACK_RESPONSES = [
    "I'm not sure about that, but I specialize in Healthcare and Finance questions. For more information, please visit our website or contact our support team. Can I help you with a Healthcare or Finance query instead?",
    "That question is outside my current expertise. I'm trained specifically on Healthcare and Finance topics. For detailed help, please visit our website. Try asking me about appointments, medications, loans, or account balance!",
    "I don't have a confident answer for that. I work best with Healthcare and Finance questions. For more assistance, feel free to visit our support website. What can I help you with in those areas?",
    "I specialize in Healthcare and Finance, so I may not answer that well. For anything else, please visit our website for more information. Try asking me about symptoms, vaccines, loans, or account queries!",
]

def get_fallback():
    return random.choice(FALLBACK_RESPONSES)


# ─── Custom Rule Matcher ──────────────────────────────────────
def match_custom_rule(query_clean):
    for keyword, answer in CUSTOM_RULES.items():
        if keyword in query_clean:
            return answer
    return None


# ─── Domain Keyword Check ─────────────────────────────────────
def is_in_domain(query_clean):
    for keyword in DOMAIN_KEYWORDS:
        if keyword in query_clean:
            return True
    return False


# ─── Main Inference ───────────────────────────────────────────
def run_model(query_clean):
    input_ids = tokenizer(
        query_clean,
        return_tensors="pt",
        max_length=250,
        truncation=True,
        padding=False
    ).to(device)

    with torch.no_grad():
        outputs = model.generate(
            input_ids["input_ids"],
            max_length=250,
            num_beams=5,
            early_stopping=True
        )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)


# ─── Chat Endpoint ────────────────────────────────────────────
@app.route("/chat", methods=["POST"])
def chat():
    if model is None:
        return jsonify({
            "response": "⚠️ Model not loaded. Please check the server. Make sure chatbot_model folder is present.",
            "source": "error"
        }), 500

    data = request.get_json()
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"response": "Please provide a question.", "source": "validation"}), 400

    query_clean = clean_text(query)

    # 1️⃣ Check custom rules first (identity, greetings, etc.)
    custom_answer = match_custom_rule(query_clean)
    if custom_answer:
        return jsonify({"response": custom_answer, "source": "custom"})

    # 2️⃣ Check if query is in domain
    if not is_in_domain(query_clean):
        return jsonify({"response": get_fallback(), "source": "fallback"})

    # 3️⃣ Run the T5 model
    try:
        response = run_model(query_clean)

        # Safety: if model returns empty or repeats the query, use fallback
        if not response or response.strip() == query_clean.strip():
            return jsonify({"response": get_fallback(), "source": "fallback"})

        return jsonify({"response": response, "source": "model"})

    except Exception as e:
        return jsonify({
            "response": "An error occurred. Please try again or visit our website for support.",
            "source": "error"
        }), 500


# ─── Health Check ─────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "app": "HamChat",
        "author": "Muhammad Hamza Owais",
        "model_loaded": model is not None,
        "device": str(device)
    })


# ─── Suggested Questions Endpoint ────────────────────────────
@app.route("/suggestions", methods=["GET"])
def suggestions():
    return jsonify({
        "healthcare": [
            "What are the side effects of the COVID-19 vaccine?",
            "How can I schedule an appointment with my doctor?",
            "What should I do if I miss a dose of my medication?",
            "What are the symptoms of flu?",
        ],
        "finance": [
            "How can I check my account balance?",
            "What is the interest rate for a personal loan?",
            "I lost my credit card, what should I do?",
            "How do I apply for a student loan?",
            "Can I make changes to my loan repayment schedule?",
        ]
    })


if __name__ == "__main__":
    print("🌐 HamChat API running at: http://localhost:5000")
    print("💡 Test it: http://localhost:5000/health")
    app.run(debug=True, port=5000)