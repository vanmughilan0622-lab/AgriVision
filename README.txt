# 🌾 AgriVision (AgroTech Resilience)

> **Cultivating Resilience through AI & Accessible Agronomy**

AgriVision is a cutting-edge, AI-powered agricultural web application designed to empower modern farmers. It brings state-of-the-art agronomy directly to the farmer, featuring an intuitive, premium glassmorphism interface and native multi-lingual support, ensuring technology is accessible regardless of language barriers.

## 🚀 Key Features

*   **🌍 Multi-Lingual Accessibility:** Fully functional in 8 Indian languages (English, Hindi, Tamil, Telugu, Kannada, Marathi, Punjabi, Gujarati) with instant switching.
*   **🩺 AI Disease Detection:** Upload a photo of a sick crop and let advanced Hugging Face vision models instantly diagnose the issue, providing confidence scores and treatment protocols.
*   **🤖 Conversational AI Advisor:** A smart, conversational chatbot powered by OpenAI/Hugging Face that gives personalized, real-time farming advice in your native language.
*   **🌱 Smart Crop Suggestion:** Automated crop matching based on local soil parameters, projected investment, and expected profit margins.
*   **📈 Live Mandi Rates & Financials:** Pulls live APMC market prices across Indian states, alongside a 7-day price trend analysis to ensure fair compensation.
*   **🌤️ Environment & Vitals Hub:** Real-time dashboard providing weather, atmospheric telemetry, and proactive agronomic alerts.
*   **🤝 Community & Transportation:** Built-in hubs for knowledge sharing among farmers and logistics coordination.

## 💻 Tech Stack

*   **Frontend Core:** Next.js 16 (App Router), React 19
*   **Styling & UI:** Tailwind CSS v4, Framer Motion (for fluid, glassmorphism animations), Lucide React
*   **AI Integration:**
    *   Hugging Face Inference API (for Disease Detection and open-source conversational models)
    *   OpenAI API (GPT-4o-mini for the AI Advisor)
    *   Google GenAI SDK (Alternative intelligence routing)
*   **Localization (i18n):** Custom-built language context engine

## ⚙️ How to Run Locally

### Prerequisites
*   Node.js 18.x or higher
*   npm, yarn, pnpm, or bun installed

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/neuralfield.git
    cd neuralfield
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    OPENAI_API_KEY="your_openai_api_key_here"
    HUGGINGFACE_API_KEY="your_huggingface_api_key_here"
    ```

4.  **Fix Turbopack Warning (If Applicable on Windows):**
    If you encounter a Turbopack access error on Windows, add the following line to `next.config.ts`:
    ```typescript
    experimental: {
      turbo: { root: __dirname }
    }
    ```

5.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

6.  **Open the Application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

## 📐 Architecture Flow

1.  **Client Interface:** React-based UI handles real-time context switching for languages and GPS locations.
2.  **Server Actions (`src/app/actions`):** Securely process AI prompts, formatting data cleanly before sending it to inference models without exposing API keys.
3.  **Intelligence Engines:** Dynamically routes between Hugging Face and OpenAI to provide the fastest, most accurate responses based on the request type.

## 🤝 Contributing
Contributions are always welcome! Feel free to open an issue or submit a Pull Request.

---
*Built with ❤️ for a more resilient agricultural future.*
