const fs = require('fs');
let content = fs.readFileSync('src/lib/i18n.ts', 'utf8');

const newSuggestSubtitle = `"suggest.subtitle": { en: "Tell us your situation and we will suggest the best crops.", hi: "अपनी स्थिति बताएं और हम सबसे अच्छी फसलें सुझाएंगे।", ta: "உங்கள் நிலையை கூறுங்கள், நாங்கள் சிறந்த பயிர்களை பரிந்துரைப்போம்.", te: "మీ పరిస్థితి చెప్పండి మరియు మేము ఉత్తమ పంటలను సూచిస్తాము.", kn: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಯನ್ನು ತಿಳಿಸಿ ಮತ್ತು ನಾವು ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳನ್ನು ಸೂಚಿಸುತ್ತೇವೆ.", mr: "तुमची परिस्थिती सांगा आणि आम्ही सर्वोत्तम पिके सुचवू.", pa: "ਆਪਣੀ ਸਥਿਤੀ ਦੱਸੋ ਅਤੇ ਅਸੀਂ ਸਭ ਤੋਂ ਵਧੀਆ ਫਸਲਾਂ ਸੁਝਾਵਾਂਗੇ।", gu: "તમારી સ્થિતિ જણાવો અને અમે શ્રેષ્ઠ પાકો સૂચવીશું." },`;

const lines = content.split('\n');
const fix1 = lines.map(line => {
    if (line.includes('"suggest.subtitle"')) {
        return "    " + newSuggestSubtitle;
    }
    return line;
});

const newSettingsMuted = `"settings.muted": { en: "Muted", hi: "म्यूट", ta: "முடக்கப்பட்டது", te: "మ్యూట్ చేయబడింది", kn: "ಮ್ಯೂಟ್ ಮಾಡಲಾಗಿದೆ", mr: "म्यूट", pa: "ਮਿਊਟ", gu: "મ્યૂટ" },`;

const newAdvisorAskAbout = `"advisor.askAbout": { en: "Ask about your crops, soil, pests, or market prices.", hi: "अपनी फसलों, मिट्टी, कीटों या बाजार की कीमतों के बारे में पूछें।", ta: "உங்கள் பயிர்கள், மண், பூச்சிகள் அல்லது சந்தை விலைகள் பற்றி கேளுங்கள்.", te: "మీ పంటలు, నేల, తెగుళ్లు లేదా మార్కెట్ ధరల గురించి అడగండి.", kn: "ನಿಮ್ಮ ಬೆಳೆಗಳು, ಮಣ್ಣು, ಕೀಟಗಳು ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.", mr: "आपले पीक, माती, कीड किंवा बाजारातील किमतीबद्दल विचारा.", pa: "ਆਪਣੀਆਂ ਫਸਲਾਂ, ਮਿੱਟੀ, ਕੀੜਿਆਂ ਜਾਂ ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਬਾਰੇ ਪੁੱਛੋ।", gu: "તમારા પાક, જમીન, જંતુઓ અથવા બજારના ભાવ વિશે પૂછો." },`;

const newAiLang = `"settings.aiLang": { en: "AI Advisor Response Language", hi: "AI सलाहकार प्रतिक्रिया भाषा", ta: "AI ஆலோசகர் பதில் மொழி", te: "AI సలహాదారు ప్రతిస్పందన భాష", kn: "AI ಸಲಹೆಗಾರ ಪ್ರತಿಕ್ರಿಯೆ ಭಾಷೆ", mr: "AI सल्लागार प्रतिसाद भाषा", pa: "AI ਸਲਾਹਕਾਰ ਜਵਾਬ ਭਾਸ਼ਾ", gu: "AI સલાહકાર પ્રતિસાદ ભાષા" },`;

const fix2 = fix1.map(line => {
    if (line.includes('"settings.muted"') && line.includes('"advisor.askAbout"')) {
        return "    " + newSettingsMuted + "\n    " + newAdvisorAskAbout + "\n    " + newAiLang;
    }
    return line;
});

fs.writeFileSync('src/lib/i18n.ts', fix2.join('\n'));
console.log('Fixed file');
