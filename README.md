<div align="center">

<img src="https://img.shields.io/badge/-%F0%9F%A4%96%20HAMCHAT-4f46e5?style=for-the-badge&labelColor=6366f1&color=4f46e5" alt="HamChat" height="40"/>

# HamChat — Domain-Specific AI Chatbot

**Fine-tune a T5 model. Ask it anything. Get domain-aware answers in real-time.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Web-4f46e5?style=for-the-badge)]
(https://domain-specific-chatbot-hamza.vercel.app/)
[![HuggingFace](https://img.shields.io/badge/🤗%20Model-HuggingFace-6366f1?style=for-the-badge)](https://huggingface.co/hamza0426/Chatbot_Backend)
[![GitHub](https://img.shields.io/badge/⭐%20Star%20this%20Repo-GitHub-1e40af?style=for-the-badge)](https://github.com/hamza0426/Domain-Specific-Chatbot)

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
| (<img width="1854" height="844" alt="Image" src="https://github.com/user-attachments/assets/cdf40663-c577-4140-ab58-b46ef0673e40" />

<img width="1822" height="851" alt="Image" src="https://github.com/user-attachments/assets/e20c2180-d139-43ec-8449-814b0c8e12c2" />

<img width="1799" height="790" alt="Image" src="https://github.com/user-attachments/assets/18b2bbd8-8498-4483-bcc9-4b220f66a9c7" />

<img width="1731" height="315" alt="Image" src="https://github.com/user-attachments/assets/75978041-86a5-4321-bfdb-55b6569b57d6" />) | (<img width="1178" height="849" alt="Image" src="https://github.com/user-attachments/assets/d4a31570-38d2-417a-bcfb-0c0d7403ab75" />

<img width="1183" height="845" alt="Image" src="https://github.com/user-attachments/assets/c5e4c7da-28e8-4ee2-b691-cd02392baf99" />

<img width="1153" height="845" alt="Image" src="https://github.com/user-attachments/assets/c565c281-dc01-4399-9658-f390ab702eef" />

<img width="1167" height="840" alt="Image" src="https://github.com/user-attachments/assets/f8785462-6609-4467-9442-2f671825d8ea" />) |

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
| **Frontend Host** | Render.com | Auto-deploy from GitHub |
| **Backend Host** | HuggingFace | Flask API Hosting |
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

<div align="center">

## 👨‍💻 Author

**Muhammad Hamza Owais**  
Computer Science Graduate

[![GitHub](https://img.shields.io/badge/GitHub-MuhammadHamzaOwais-4f46e5?style=flat-square&logo=github)](https://github.com/hamza0426)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-6366f1?style=flat-square&logo=linkedin)](https://linkedin.com/in/muhammad-hamza-owais)

---

*Made with ❤️ by Hamza — Domain Specific Chatbot*

![visitors](https://visitor-badge.laobi.icu/badge?page_id=MuhammadHamzaOwais.HamChat&style=flat-square&color=4f46e5)

</div>
