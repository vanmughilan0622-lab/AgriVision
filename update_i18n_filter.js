const fs = require('fs');
const file = 'src/lib/i18n.ts';
let content = fs.readFileSync(file, 'utf8');
const replacement = `    "dash.allSectors": { en: "All Sectors", hi: "सभी सेक्टर", ta: "அனைத்து பிரிவுகளும்", te: "అన్ని రంగాలు", kn: "ಎಲ್ಲಾ ವಲಯಗಳು", mr: "सर्व विभाग", pa: "ਸਾਰੇ ਸੈਕਟਰ", gu: "તમામ વિભાગો" },
    "dash.criticalStatus": { en: "Critical Status", hi: "गंभीर स्थिति", ta: "சிக்கலான நிலை", te: "క్లిష్టమైన స్థితి", kn: "ನಿರ್ಣಾಯಕ ಸ್ಥಿತಿ", mr: "गंभीर स्थिती", pa: "ਨਾਜ਼ੁਕ ਸਥਿਤੀ", gu: "ગંભીર સ્થિતિ" },
    "dash.attentionStatus": { en: "Attention Status", hi: "ध्यान देने की स्थिति", ta: "கவனிக்க வேண்டிய நிலை", te: "శ్రద్ధ వహించాల్సిన స్థితి", kn: "ಗಮನ ಹರಿಸುವ ಸ್ಥಿತಿ", mr: "लक्ष देण्याची स्थिती", pa: "ਧਿਆਨ ਦੇਣ ਦੀ ਸਥਿਤੀ", gu: "ધ્યાન આપવાની સ્થિતિ" },
    "dash.filterBy": { en: "Filter By", hi: "द्वारा फ़िल्टर करें", ta: "வடிகட்டுக", te: "ఫిల్టర్ చేయండి", kn: "ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ", mr: "फिल्टर करा", pa: "ਫਿਲਟਰ ਕਰੋ", gu: "દ્વારા ફિલ્ટર કરો" },

    /* ── Disease Detection ── */`;
content = content.replace('    /* ── Disease Detection ── */', replacement);
fs.writeFileSync(file, content);
console.log('done filter');
