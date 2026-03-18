<div align="center">

<img src="https://img.shields.io/badge/-%F0%9F%A4%96%20HAMCHAT-4f46e5?style=for-the-badge&labelColor=6366f1&color=4f46e5" alt="HamChat" height="40"/>

# HamChat — Domain-Specific AI Chatbot

**Fine-tune a T5 model. Ask it anything. Get domain-aware answers in real-time.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Web-4f46e5?style=for-the-badge)](https://hamchat.netlify.app/)
[![HuggingFace](https://img.shields.io/badge/🤗%20Model-HuggingFace-6366f1?style=for-the-badge)](https://huggingface.co/MuhammadHamzaOwais/hamchat-t5)
[![GitHub](https://img.shields.io/badge/⭐%20Star%20this%20Repo-GitHub-1e40af?style=for-the-badge)](https://github.com/MuhammadHamzaOwais/HamChat)

![Python](https://img.shields.io/badge/Python-3.10-4f46e5?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Latest-6366f1?style=flat-square&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-18-818cf8?style=flat-square&logo=react&logoColor=white)
![T5](https://img.shields.io/badge/T5--Small-HuggingFace-4f46e5?style=flat-square)
![PyTorch](https://img.shields.io/badge/PyTorch-Latest-6366f1?style=flat-square&logo=pytorch&logoColor=white)
![Transformers](https://img.shields.io/badge/Transformers-4.x-818cf8?style=flat-square)
![Deployed](https://img.shields.io/badge/Status-Live-22c55e?style=flat-square)

</div>

---

## 📸 Screenshots

| Landing Page | Chat Interface |
|:------------:|:--------------:|
| ![Landing](https://github.com/user-attachments/assets/REPLACE_WITH_LANDING_SCREENSHOT) | ![Chat](https://github.com/user-attachments/assets/REPLACE_WITH_CHAT_SCREENSHOT) |

---

<div align="center">

## 🔷 How It Works

</div>

```
 ┌──────────────┐     ┌─────────────────────┐     ┌──────────────────────┐
 │  User Query  │ ──▶ │   Custom Rule Check  │ ──▶ │  Domain Keyword Check │
 │  (typed text)│     │  (identity/greetings)│     │  (healthcare/finance) │
 └──────────────┘     └─────────────────────┘     └──────────────────────┘
                                                              │
 ┌──────────────┐     ┌─────────────────────┐                ▼
 │  React UI    │ ◀── │   Flask REST API     │ ◀── ┌──────────────────────┐
 │  HamChat     │     │   JSON Response      │     │  Fine-tuned T5 Model  │
 └──────────────┘     └─────────────────────┘     │  Beam Search (n=5)    │
                                                   └──────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **Fine-tuned T5** | T5-small fine-tuned on 3,000 Healthcare & Finance Q&A pairs |
| 💊 **Healthcare Domain** | Appointments, medications, flu symptoms, vaccine side effects |
| 💳 **Finance Domain** | Account balance, loans, credit cards, interest rates |
| 🧠 **Custom Rules Layer** | Identity, greetings and creator questions handled before the model runs |
| 🚫 **Smart Fallback** | Out-of-scope questions get a helpful redirect instead of wrong answers |
| 🎨 **Two-Page UI** | Professional landing page + dedicated chat interface |
| ⚡ **Suggested Questions** | Clickable chips so users always know what to ask |
| 🔄 **Reset Chat** | One-click clear to start a fresh conversation |
| 📱 **Fully Responsive** | Works on desktop, tablet, and mobile screens |

---

## 🏗️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:-----:|:----------:|:-------:|
| **Frontend** | React 18 + CSS Modules | UI Dashboard |
| **Backend** | Flask + Python 3.10 | REST API Server |
| **ML Model** | T5-Small (Hugging Face) | Text Generation |
| **Training** | Hugging Face Trainer API | Fine-Tuning Pipeline |
| **Framework** | PyTorch | Deep Learning Backend |
| **Tokenizer** | T5Tokenizer (SentencePiece) | Text Preprocessing |
| **Frontend Host** | Netlify | Auto-deploy from GitHub |
| **Backend Host** | Render.com | Flask API Hosting |
| **Model Host** | Hugging Face Hub | Model Storage & Download |

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.9 or higher
- **Node.js** 18 or higher
- **pip** and **npm**

---

### ⚙️ Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/MuhammadHamzaOwais/HamChat.git
cd HamChat/backend

# 2. Install Python dependencies
pip install flask flask-cors transformers torch sentencepiece

# 3. Start the backend server
python app.py
```

✅ Backend live at `http://localhost:5000`  
📡 Health check at `http://localhost:5000/health`

---

### 🖥️ Frontend Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

✅ Frontend live at `http://localhost:3000`

> **Note:** Make sure backend is running on port 5000 before starting the frontend.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `POST` | `/chat` | Send a query — returns model response + source tag |
| `GET` | `/health` | Check if the model is loaded and API is alive |
| `GET` | `/suggestions` | Get sample questions by domain |

### Example Request

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What are the symptoms of flu?"}'
```

### Example Response

```json
{
  "response": "Flu symptoms include fever, cough, sore throat, runny nose, body aches, and fatigue.",
  "source": "model"
}
```

---

## 🧠 Model Training Details

| Parameter | Value |
|-----------|-------|
| Base Model | `t5-small` |
| Dataset Size | 3,000 samples |
| Domains | Healthcare, Finance |
| Unique Intents | 10 |
| Train / Val Split | 80% / 20% |
| Epochs | 10 |
| Batch Size | 8 |
| Max Length | 250 tokens |
| Optimizer | AdamW |
| Warmup Steps | 500 |
| Final Train Loss | ~0.001 |

---

## 📁 Project Structure

```
HamChat/
│
├── backend/
│   ├── app.py                  # Flask API — inference + custom rules + fallback
│   ├── requirements.txt        # Python dependencies
│   └── chatbot_model/          # Fine-tuned T5 model (NOT in GitHub)
│                               # → Hosted on HuggingFace Hub
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Router — switches between Home and Chat
│   │   ├── Home.jsx            # Landing page component
│   │   ├── Home.css            # Landing page styles
│   │   ├── Chat.jsx            # Chat interface component
│   │   ├── Chat.css            # Chat interface styles
│   │   ├── index.css           # Global CSS variables + reset
│   │   └── index.js            # React entry point
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🌐 Deployment Architecture

```
 GitHub Repo
      │
      ├──── Netlify ────────────▶  frontend (React)
      │     Auto-deploy on push     https://hamchat.netlify.app
      │
      ├──── Render.com ─────────▶  backend (Flask API)
      │     Auto-deploy on push     https://hamchat-api.onrender.com
      │
      └──── HuggingFace Hub ───▶  T5 model weights
            Manual push             https://huggingface.co/MuhammadHamzaOwais/hamchat-t5
```

> ⚠️ **Note:** Render free tier may take **20–30 seconds to wake up** if idle.  
> First request after sleep triggers a cold start — subsequent requests are instant.

---

## 📚 Academic Context

This project was built as part of the **Generative AI** course and demonstrates:

- Fine-tuning pre-trained transformer models on domain-specific data
- Building a custom NLP inference pipeline with fallback handling
- REST API design for serving ML models
- Full-stack deployment of AI-powered web applications

---

<div align="center">

## 👨‍💻 Author

**Muhammad Hamza Owais**  
Computer Science Student · Reg ID: 23266

[![GitHub](https://img.shields.io/badge/GitHub-MuhammadHamzaOwais-4f46e5?style=flat-square&logo=github)](https://github.com/MuhammadHamzaOwais)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-6366f1?style=flat-square&logo=linkedin)](https://linkedin.com/in/muhammad-hamza-owais)

---

*Made with ❤️ by Hamza — Generative AI Project*

![visitors](https://visitor-badge.laobi.icu/badge?page_id=MuhammadHamzaOwais.HamChat&style=flat-square&color=4f46e5)

</div>
