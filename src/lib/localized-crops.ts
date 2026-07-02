export const localizedCrops: Record<string, any> = {
  "en": [
    {
      "id": "wheat",
      "name": "Wheat",
      "emoji": "🌾",
      "category": "Cereal",
      "seasonality": {
        "sowingMonths": "October – November",
        "harvestMonths": "March – April",
        "duration": "120–150 days",
        "climate": "Cool & dry winters, mild summers"
      },
      "soil": {
        "type": "Well-drained loamy or clay-loam",
        "ph": "6.0 – 7.5",
        "organic": "Medium to high organic matter",
        "drainage": "Good drainage required"
      },
      "irrigation": {
        "frequency": "4–6 irrigations",
        "critical": "Crown root initiation, Tillering, Jointing, Grain filling",
        "requirement": "35–40 cm total water",
        "method": "Flood or drip irrigation"
      },
      "pests": [
        {
          "name": "Aphids",
          "severity": "High",
          "control": "Spray Chlorpyriphos 20 EC @ 1 L/ha"
        },
        {
          "name": "Stem Rust",
          "severity": "Medium",
          "control": "Apply Propiconazole 25 EC"
        },
        {
          "name": "Brown Rust",
          "severity": "Medium",
          "control": "Mancozeb 75 WP @ 2 kg/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "Basal (at planting)",
          "n": "60 kg/ha",
          "p": "60 kg/ha",
          "k": "40 kg/ha"
        },
        {
          "stage": "Tillering stage",
          "n": "40 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "Heading stage",
          "n": "20 kg/ha",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "Rice",
      "emoji": "🌾",
      "category": "Cereal",
      "seasonality": {
        "sowingMonths": "June – July (Kharif), Nov–Dec (Rabi)",
        "harvestMonths": "October – November / March",
        "duration": "90–120 days",
        "climate": "Hot humid; 25–35°C with heavy rainfall"
      },
      "soil": {
        "type": "Heavy clay or silty-loam",
        "ph": "5.5 – 7.0",
        "organic": "High water retention essential",
        "drainage": "Poor drainage / waterlogged"
      },
      "irrigation": {
        "frequency": "Continuous flooding or AWD",
        "critical": "Transplanting, Tillering, Panicle initiation, Flowering",
        "requirement": "100–200 cm water",
        "method": "Flood / Alternate Wetting & Drying (AWD)"
      },
      "pests": [
        {
          "name": "Brown Planthopper",
          "severity": "High",
          "control": "Imidacloprid 17.8 SL @ 125 ml/ha"
        },
        {
          "name": "Stem Borer",
          "severity": "High",
          "control": "Cartap Hydrochloride 4G @ 18 kg/ha"
        },
        {
          "name": "Blast Disease",
          "severity": "Medium",
          "control": "Tricyclazole 75 WP @ 500 g/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "Basal (transplanting)",
          "n": "40 kg/ha",
          "p": "30 kg/ha",
          "k": "30 kg/ha"
        },
        {
          "stage": "Active tillering (21 DAT)",
          "n": "40 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "Panicle initiation",
          "n": "20 kg/ha",
          "p": "—",
          "k": "20 kg/ha"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "Tomato",
      "emoji": "🍅",
      "category": "Vegetable",
      "seasonality": {
        "sowingMonths": "June–July / October–November",
        "harvestMonths": "September–November / January–March",
        "duration": "70–90 days from transplant",
        "climate": "21–27°C; moderate rainfall"
      },
      "soil": {
        "type": "Sandy loam to loamy",
        "ph": "6.0 – 7.0",
        "organic": "Rich in organic matter",
        "drainage": "Well-drained, deep soil"
      },
      "irrigation": {
        "frequency": "Every 5–7 days",
        "critical": "Transplanting, Flowering, Fruit set",
        "requirement": "40–60 cm total water",
        "method": "Drip irrigation preferred"
      },
      "pests": [
        {
          "name": "Tomato Leaf Curl Virus",
          "severity": "High",
          "control": "Control whitefly vector; Imidacloprid 200 SL"
        },
        {
          "name": "Early Blight",
          "severity": "High",
          "control": "Chlorothalonil 75 WP @ 2 kg/ha"
        },
        {
          "name": "Fruit Borer",
          "severity": "Medium",
          "control": "Spinosad 45 SC @ 150 ml/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "Basal",
          "n": "50 kg/ha",
          "p": "50 kg/ha",
          "k": "50 kg/ha"
        },
        {
          "stage": "30 days after transplant",
          "n": "30 kg/ha",
          "p": "—",
          "k": "25 kg/ha"
        },
        {
          "stage": "Fruit development",
          "n": "20 kg/ha",
          "p": "—",
          "k": "25 kg/ha"
        }
      ]
    },
    {
      "id": "corn",
      "name": "Corn (Maize)",
      "emoji": "🌽",
      "category": "Cereal",
      "seasonality": {
        "sowingMonths": "June – July (Kharif), Jan–Feb (Rabi)",
        "harvestMonths": "September – October / April–May",
        "duration": "90–110 days",
        "climate": "Warm climate; 20–30°C"
      },
      "soil": {
        "type": "Loam or sandy-loam",
        "ph": "5.8 – 7.0",
        "organic": "High organic matter",
        "drainage": "Well-drained"
      },
      "irrigation": {
        "frequency": "6–8 irrigations",
        "critical": "Germination, Knee-high, Tasseling, Grain fill",
        "requirement": "50–70 cm water",
        "method": "Furrow or drip"
      },
      "pests": [
        {
          "name": "Fall Armyworm",
          "severity": "High",
          "control": "Spinetoram 11.7 SC @ 500 ml/ha"
        },
        {
          "name": "Stem Borer",
          "severity": "High",
          "control": "Carbofuran 3G @ 20 kg/ha"
        },
        {
          "name": "Maize Streak Virus",
          "severity": "Medium",
          "control": "Control leafhopper; resistant varieties"
        }
      ],
      "fertilizer": [
        {
          "stage": "Basal",
          "n": "60 kg/ha",
          "p": "60 kg/ha",
          "k": "40 kg/ha"
        },
        {
          "stage": "Knee-high stage (V6)",
          "n": "60 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "Tasseling (V12)",
          "n": "30 kg/ha",
          "p": "—",
          "k": "20 kg/ha"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "Cotton",
      "emoji": "🌿",
      "category": "Cash Crop",
      "seasonality": {
        "sowingMonths": "April – June",
        "harvestMonths": "October – January",
        "duration": "150–180 days",
        "climate": "Hot & semi-arid; 25–35°C"
      },
      "soil": {
        "type": "Black cotton soil or loamy",
        "ph": "7.0 – 8.0",
        "organic": "Moderate organic content",
        "drainage": "Deep, well-drained"
      },
      "irrigation": {
        "frequency": "8–10 irrigations",
        "critical": "Germination, Squaring, Flowering, Boll formation",
        "requirement": "60–90 cm water",
        "method": "Furrow or drip irrigation"
      },
      "pests": [
        {
          "name": "Bollworm (Pink/American)",
          "severity": "High",
          "control": "Pyrethroid + organophosphate combo sprays"
        },
        {
          "name": "Whitefly",
          "severity": "High",
          "control": "Thiamethoxam 25 WG @ 100 g/ha"
        },
        {
          "name": "Aphid",
          "severity": "Medium",
          "control": "Dimethoate 30 EC @ 1 L/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "Basal",
          "n": "30 kg/ha",
          "p": "60 kg/ha",
          "k": "30 kg/ha"
        },
        {
          "stage": "Squaring (45 DAS)",
          "n": "30 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "Flowering (75 DAS)",
          "n": "30 kg/ha",
          "p": "—",
          "k": "30 kg/ha"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "Soybean",
      "emoji": "🫘",
      "category": "Pulse",
      "seasonality": {
        "sowingMonths": "June – July",
        "harvestMonths": "September – October",
        "duration": "90–100 days",
        "climate": "Warm humid; 20–30°C"
      },
      "soil": {
        "type": "Loam to clay-loam",
        "ph": "6.0 – 7.5",
        "organic": "High organic matter",
        "drainage": "Well-drained"
      },
      "irrigation": {
        "frequency": "3–4 critical irrigations",
        "critical": "Germination, Pod formation, Seed filling",
        "requirement": "30–45 cm water",
        "method": "Sprinkler or furrow"
      },
      "pests": [
        {
          "name": "Pod Borer",
          "severity": "High",
          "control": "Quinalphos 25 EC @ 2 L/ha"
        },
        {
          "name": "Yellow Mosaic Virus",
          "severity": "High",
          "control": "Control whitefly; resistant varieties"
        },
        {
          "name": "Stem Fly",
          "severity": "Medium",
          "control": "Carbosulfan seed treatment"
        }
      ],
      "fertilizer": [
        {
          "stage": "Basal (rhizobium inoculation)",
          "n": "20 kg/ha",
          "p": "60 kg/ha",
          "k": "40 kg/ha"
        },
        {
          "stage": "Flower initiation",
          "n": "—",
          "p": "20 kg/ha",
          "k": "20 kg/ha"
        }
      ]
    }
  ],
  "hi": [
    {
      "id": "wheat",
      "name": "गेहूं",
      "emoji": "🌾",
      "category": "अनाज",
      "seasonality": {
        "sowingMonths": "अक्टूबर - नवंबर",
        "harvestMonths": "मार्च - अप्रैल",
        "duration": "120-150 दिन",
        "climate": "ठंडी और शुष्क सर्दियाँ, हल्की गर्मियाँ"
      },
      "soil": {
        "type": "अच्छी जल निकासी वाली दोमट या मिट्टी-दोमट",
        "ph": "6.0 - 7.5",
        "organic": "मध्यम से उच्च कार्बनिक पदार्थ",
        "drainage": "अच्छी जल निकासी आवश्यक"
      },
      "irrigation": {
        "frequency": "4-6 सिंचाई",
        "critical": "क्राउन रूट दीक्षा, टिलरिंग, जॉइंटिंग, ग्रेन फिलिंग",
        "requirement": "35-40 सेमी कुल पानी",
        "method": "बाढ़ या ड्रिप सिंचाई"
      },
      "pests": [
        {
          "name": "एफिड्स",
          "severity": "High",
          "control": "क्लोरपायरीफॉस 20 ईसी @ 1 एल/हेक्टेयर का छिड़काव करें"
        },
        {
          "name": "स्टेम रस्ट",
          "severity": "Medium",
          "control": "प्रोपिकोनाज़ोल 25 ईसी लागू करें"
        },
        {
          "name": "ब्राउन रस्ट",
          "severity": "Medium",
          "control": "मैन्कोजेब 75 डब्ल्यूपी @ 2 किग्रा/हेक्टेयर"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल (रोपण पर)",
          "n": "60 किग्रा/हेक्टेयर",
          "p": "60 किग्रा/हेक्टेयर",
          "k": "40 किग्रा/हेक्टेयर"
        },
        {
          "stage": "टिलरिंग स्टेज",
          "n": "40 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "हेडिंग स्टेज",
          "n": "20 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "चावल",
      "emoji": "🌾",
      "category": "अनाज",
      "seasonality": {
        "sowingMonths": "जून - जुलाई (खरीफ), नवंबर-दिसंबर (रबी)",
        "harvestMonths": "अक्टूबर - नवंबर / मार्च",
        "duration": "90-120 दिन",
        "climate": "गर्म आर्द्र; भारी वर्षा के साथ 25-35°C"
      },
      "soil": {
        "type": "भारी मिट्टी या सिल्टी-दोमट",
        "ph": "5.5 - 7.0",
        "organic": "उच्च जल प्रतिधारण आवश्यक",
        "drainage": "खराब जल निकासी / जलभराव"
      },
      "irrigation": {
        "frequency": "निरंतर बाढ़ या एडब्ल्यूडी",
        "critical": "प्रत्यारोपण, टिलरिंग, पैनिक दीक्षा, फूल आना",
        "requirement": "100-200 सेमी पानी",
        "method": "बाढ़ / वैकल्पिक गीलापन और सुखाना (एडब्ल्यूडी)"
      },
      "pests": [
        {
          "name": "ब्राउन प्लांटहॉपर",
          "severity": "High",
          "control": "इमिडाक्लोप्रिड 17.8 एसएल @ 125 मिली/हेक्टेयर"
        },
        {
          "name": "स्टेम बोरर",
          "severity": "High",
          "control": "कारटैप हाइड्रोक्लोराइड 4जी @ 18 किग्रा/हेक्टेयर"
        },
        {
          "name": "ब्लास्ट रोग",
          "severity": "Medium",
          "control": "ट्राइसाइक्लोजोल 75 डब्ल्यूपी @ 500 ग्राम/हेक्टेयर"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल (प्रत्यारोपण)",
          "n": "40 किग्रा/हेक्टेयर",
          "p": "30 किग्रा/हेक्टेयर",
          "k": "30 किग्रा/हेक्टेयर"
        },
        {
          "stage": "सक्रिय टिलरिंग (21 DAT)",
          "n": "40 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "पैनिक दीक्षा",
          "n": "20 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "20 किग्रा/हेक्टेयर"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "टमाटर",
      "emoji": "🍅",
      "category": "सब्ज़ी",
      "seasonality": {
        "sowingMonths": "जून-जुलाई / अक्टूबर-नवंबर",
        "harvestMonths": "सितंबर-नवंबर / जनवरी-मार्च",
        "duration": "प्रत्यारोपण से 70-90 दिन",
        "climate": "21-27°C; मध्यम वर्षा"
      },
      "soil": {
        "type": "बलुई दोमट से दोमट",
        "ph": "6.0 - 7.0",
        "organic": "कार्बनिक पदार्थों से भरपूर",
        "drainage": "अच्छी जल निकासी वाली, गहरी मिट्टी"
      },
      "irrigation": {
        "frequency": "हर 5-7 दिन",
        "critical": "प्रत्यारोपण, फूल आना, फल लगना",
        "requirement": "40-60 सेमी कुल पानी",
        "method": "ड्रिप सिंचाई को प्राथमिकता"
      },
      "pests": [
        {
          "name": "टमाटर लीफ कर्ल वायरस",
          "severity": "High",
          "control": "सफेद मक्खी वेक्टर को नियंत्रित करें; इमिडाक्लोप्रिड 200 एसएल"
        },
        {
          "name": "प्रारंभिक ब्लाइट",
          "severity": "High",
          "control": "क्लोरोथालोनिल 75 डब्ल्यूपी @ 2 किग्रा/हेक्टेयर"
        },
        {
          "name": "फ्रूट बोरर",
          "severity": "Medium",
          "control": "स्पिनोसैड 45 एससी @ 150 मिली/हेक्टेयर"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल",
          "n": "50 किग्रा/हेक्टेयर",
          "p": "50 किग्रा/हेक्टेयर",
          "k": "50 किग्रा/हेक्टेयर"
        },
        {
          "stage": "प्रत्यारोपण के 30 दिन बाद",
          "n": "30 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "25 किग्रा/हेक्टेयर"
        },
        {
          "stage": "फलों का विकास",
          "n": "20 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "25 किग्रा/हेक्टेयर"
        }
      ]
    },
    {
      "id": "corn",
      "name": "मक्का",
      "emoji": "🌽",
      "category": "अनाज",
      "seasonality": {
        "sowingMonths": "जून - जुलाई (खरीफ), जनवरी-फरवरी (रबी)",
        "harvestMonths": "सितंबर - अक्टूबर / अप्रैल-मई",
        "duration": "90-110 दिन",
        "climate": "गर्म जलवायु; 20-30°C"
      },
      "soil": {
        "type": "दोमट या बलुई-दोमट",
        "ph": "5.8 - 7.0",
        "organic": "उच्च कार्बनिक पदार्थ",
        "drainage": "अच्छी जल निकासी"
      },
      "irrigation": {
        "frequency": "6-8 सिंचाई",
        "critical": "अंकुरण, घुटने की ऊंचाई, टैसलिंग, ग्रेन फिल",
        "requirement": "50-70 सेमी पानी",
        "method": "फरो या ड्रिप"
      },
      "pests": [
        {
          "name": "फॉल आर्मीवर्म",
          "severity": "High",
          "control": "स्पाइनेटोरम 11.7 एससी @ 500 मिली/हेक्टेयर"
        },
        {
          "name": "स्टेम बोरर",
          "severity": "High",
          "control": "कार्बोफ्यूरान 3जी @ 20 किग्रा/हेक्टेयर"
        },
        {
          "name": "मक्का स्ट्रीक वायरस",
          "severity": "Medium",
          "control": "लीफहॉपर को नियंत्रित करें; प्रतिरोधी किस्में"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल",
          "n": "60 किग्रा/हेक्टेयर",
          "p": "60 किग्रा/हेक्टेयर",
          "k": "40 किग्रा/हेक्टेयर"
        },
        {
          "stage": "घुटने की ऊंचाई का चरण (V6)",
          "n": "60 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "टैसलिंग (V12)",
          "n": "30 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "20 किग्रा/हेक्टेयर"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "कपास",
      "emoji": "🌿",
      "category": "नकदी फसल",
      "seasonality": {
        "sowingMonths": "अप्रैल - जून",
        "harvestMonths": "अक्टूबर - जनवरी",
        "duration": "150-180 दिन",
        "climate": "गर्म और अर्ध-शुष्क; 25-35°C"
      },
      "soil": {
        "type": "काली कपास मिट्टी या दोमट",
        "ph": "7.0 - 8.0",
        "organic": "मध्यम कार्बनिक सामग्री",
        "drainage": "गहरी, अच्छी जल निकासी"
      },
      "irrigation": {
        "frequency": "8-10 सिंचाई",
        "critical": "अंकुरण, स्क्वायरिंग, फूल आना, बोल का निर्माण",
        "requirement": "60-90 सेमी पानी",
        "method": "फरो या ड्रिप सिंचाई"
      },
      "pests": [
        {
          "name": "बोलवर्म (गुलाबी/अमेरिकी)",
          "severity": "High",
          "control": "पाइरेथ्रोइड + ऑर्गेनोफॉस्फेट कॉम्बो स्प्रे"
        },
        {
          "name": "सफेद मक्खी",
          "severity": "High",
          "control": "थियामेथोक्सम 25 डब्लूजी @ 100 ग्राम/हेक्टेयर"
        },
        {
          "name": "एफिड",
          "severity": "Medium",
          "control": "डाइमेथोएट 30 ईसी @ 1 एल/हेक्टेयर"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल",
          "n": "30 किग्रा/हेक्टेयर",
          "p": "60 किग्रा/हेक्टेयर",
          "k": "30 किग्रा/हेक्टेयर"
        },
        {
          "stage": "स्क्वायरिंग (45 DAS)",
          "n": "30 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "फूल आना (75 DAS)",
          "n": "30 किग्रा/हेक्टेयर",
          "p": "—",
          "k": "30 किग्रा/हेक्टेयर"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "सोयाबीन",
      "emoji": "🫘",
      "category": "दलहन",
      "seasonality": {
        "sowingMonths": "जून - जुलाई",
        "harvestMonths": "सितंबर - अक्टूबर",
        "duration": "90-100 दिन",
        "climate": "गर्म आर्द्र; 20-30°C"
      },
      "soil": {
        "type": "दोमट से मिट्टी-दोमट",
        "ph": "6.0 - 7.5",
        "organic": "उच्च कार्बनिक पदार्थ",
        "drainage": "अच्छी जल निकासी"
      },
      "irrigation": {
        "frequency": "3-4 महत्वपूर्ण सिंचाई",
        "critical": "अंकुरण, फली निर्माण, बीज भरना",
        "requirement": "30-45 सेमी पानी",
        "method": "स्प्रिंकलर या फरो"
      },
      "pests": [
        {
          "name": "पॉड बोरर",
          "severity": "High",
          "control": "क्लोरपायरीफॉस 25 ईसी @ 2 एल/हेक्टेयर"
        },
        {
          "name": "येलो मोज़ेक वायरस",
          "severity": "High",
          "control": "सफेद मक्खी को नियंत्रित करें; प्रतिरोधी किस्में"
        },
        {
          "name": "स्टेम फ्लाई",
          "severity": "Medium",
          "control": "कार्बोसल्फान बीज उपचार"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल (राइजोबियम टीकाकरण)",
          "n": "20 किग्रा/हेक्टेयर",
          "p": "60 किग्रा/हेक्टेयर",
          "k": "40 किग्रा/हेक्टेयर"
        },
        {
          "stage": "फूलों की शुरुआत",
          "n": "—",
          "p": "20 किग्रा/हेक्टेयर",
          "k": "20 किग्रा/हेक्टेयर"
        }
      ]
    }
  ],
  "ta": [
    {
      "id": "wheat",
      "name": "கோதுமை",
      "emoji": "🌾",
      "category": "தானியம்",
      "seasonality": {
        "sowingMonths": "அக்டோபர் - நவம்பர்",
        "harvestMonths": "மார்ச் - ஏப்ரல்",
        "duration": "120-150 நாட்கள்",
        "climate": "குளிர் & வறண்ட குளிர்காலம், மிதமான கோடைக்காலம்"
      },
      "soil": {
        "type": "நன்கு வடிகட்டப்பட்ட களிமண் அல்லது களிமண்",
        "ph": "6.0 - 7.5",
        "organic": "நடுத்தர முதல் அதிக கரிமப் பொருட்கள்",
        "drainage": "நல்ல வடிகால் தேவை"
      },
      "irrigation": {
        "frequency": "4-6 நீர்ப்பாசனம்",
        "critical": "க்ரவுன் ரூட் தொடக்கம், டில்லரிங், ஜாயிண்டிங், கிரெய்ன் ஃபில்லிங்",
        "requirement": "35-40 செ.மீ மொத்த தண்ணீர்",
        "method": "வெள்ளம் அல்லது சொட்டு நீர் பாசனம்"
      },
      "pests": [
        {
          "name": "அசுவினி",
          "severity": "High",
          "control": "குளோர்பைரிபாஸ் 20 EC @ 1 எல்/எக்டர் தெளிக்கவும்"
        },
        {
          "name": "தண்டு துரு",
          "severity": "Medium",
          "control": "ப்ரோபிகோனசோல் 25 EC பயன்படுத்தவும்"
        },
        {
          "name": "பழுப்பு துரு",
          "severity": "Medium",
          "control": "மான்கோசெப் 75 WP @ 2 கிலோ/எக்டர்"
        }
      ],
      "fertilizer": [
        {
          "stage": "பாசல் (நடும் போது)",
          "n": "60 கிலோ/எக்டர்",
          "p": "60 கிலோ/எக்டர்",
          "k": "40 கிலோ/எக்டர்"
        },
        {
          "stage": "டில்லரிங் நிலை",
          "n": "40 கிலோ/எக்டர்",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "தலைப்பு நிலை",
          "n": "20 கிலோ/எக்டர்",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "அரிசி",
      "emoji": "🌾",
      "category": "தானியம்",
      "seasonality": {
        "sowingMonths": "ஜூன் - ஜூலை (காரிஃப்), நவ-டிசம்பர் (ரபி)",
        "harvestMonths": "அக்டோபர் - நவம்பர் / மார்ச்",
        "duration": "90-120 நாட்கள்",
        "climate": "வெப்பமான ஈரப்பதம்; கனமழையுடன் 25-35°C"
      },
      "soil": {
        "type": "கனமான களிமண் அல்லது சில்டி-களிமண்",
        "ph": "5.5 - 7.0",
        "organic": "அதிக நீரைத் தக்கவைப்பது அவசியம்",
        "drainage": "மோசமான வடிகால் / நீர் தேங்கியது"
      },
      "irrigation": {
        "frequency": "தொடர்ச்சியான வெள்ளம் அல்லது AWD",
        "critical": "நாற்று நடுதல், உழுதல், கதிர் தொடக்கம், பூக்கும்",
        "requirement": "100-200 செ.மீ தண்ணீர்",
        "method": "வெள்ளம் / மாற்று ஈரமாக்குதல் & உலர்த்துதல் (AWD)"
      },
      "pests": [
        {
          "name": "பிரவுன் பிளாண்டாப்பர்",
          "severity": "High",
          "control": "இமிடாக்ளோபிரிட் 17.8 SL @ 125 மிலி/எக்டர்"
        },
        {
          "name": "தண்டு துளைப்பான்",
          "severity": "High",
          "control": "கார்டாப் ஹைட்ரோகுளோரைடு 4G @ 18 கிலோ/எக்டர்"
        },
        {
          "name": "குலை நோய்",
          "severity": "Medium",
          "control": "ட்ரைசைக்ளாசோல் 75 WP @ 500 கிராம்/எக்டர்"
        }
      ],
      "fertilizer": [
        {
          "stage": "பாசல் (மாற்று நடவு)",
          "n": "40 கிலோ/எக்டர்",
          "p": "30 கிலோ/எக்டர்",
          "k": "30 கிலோ/எக்டர்"
        },
        {
          "stage": "செயலில் உழுதல் (21 DAT)",
          "n": "40 கிலோ/எக்டர்",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "கதிர் தொடக்கம்",
          "n": "20 கிலோ/எக்டர்",
          "p": "—",
          "k": "20 கிலோ/எக்டர்"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "தக்காளி",
      "emoji": "🍅",
      "category": "காய்கறி",
      "seasonality": {
        "sowingMonths": "ஜூன்-ஜூலை / அக்டோபர்-நவம்பர்",
        "harvestMonths": "செப்டம்பர்-நவம்பர் / ஜனவரி-மார்ச்",
        "duration": "மாற்றுத்திறனிலிருந்து 70-90 நாட்கள்",
        "climate": "21-27°C; மிதமான மழைப்பொழிவு"
      },
      "soil": {
        "type": "மணல் களிமண் முதல் களிமண்",
        "ph": "6.0 - 7.0",
        "organic": "கரிமப் பொருட்கள் நிறைந்தது",
        "drainage": "நன்கு வடியும், ஆழமான மண்"
      },
      "irrigation": {
        "frequency": "ஒவ்வொரு 5-7 நாட்களுக்கும்",
        "critical": "மாற்று நடவு, பூக்கும், பழம் செட்",
        "requirement": "40-60 செ.மீ மொத்த தண்ணீர்",
        "method": "சொட்டு நீர் பாசனம் விரும்பத்தக்கது"
      },
      "pests": [
        {
          "name": "தக்காளி இலை சுருள் வைரஸ்",
          "severity": "High",
          "control": "வெள்ளை ஈ திசையன் கட்டுப்பாடு; இமிடாக்ளோபிரிட் 200 SL"
        },
        {
          "name": "முன்கூட்டியே ப்ளைட்",
          "severity": "High",
          "control": "குளோரோதலோனில் 75 WP @ 2 கிலோ/எக்டர்"
        },
        {
          "name": "பழம் துளைப்பான்",
          "severity": "Medium",
          "control": "ஸ்பினோசாட் 45 SC @ 150 மிலி/எக்டர்"
        }
      ],
      "fertilizer": [
        {
          "stage": "அடித்தளம்",
          "n": "50 கிலோ/எக்டர்",
          "p": "50 கிலோ/எக்டர்",
          "k": "50 கிலோ/எக்டர்"
        },
        {
          "stage": "மாற்றுத்திறனுக்கு 30 நாட்களுக்குப் பிறகு",
          "n": "30 கிலோ/எக்டர்",
          "p": "—",
          "k": "25 கிலோ/எக்டர்"
        },
        {
          "stage": "பழ வளர்ச்சி",
          "n": "20 கிலோ/எக்டர்",
          "p": "—",
          "k": "25 கிலோ/எக்டர்"
        }
      ]
    },
    {
      "id": "corn",
      "name": "சோளம் (மக்காச்சோளம்)",
      "emoji": "🌽",
      "category": "தானியம்",
      "seasonality": {
        "sowingMonths": "ஜூன் - ஜூலை (காரிஃப்), ஜன-பிப் (ரபி)",
        "harvestMonths": "செப்டம்பர் - அக்டோபர் / ஏப்ரல்-மே",
        "duration": "90-110 நாட்கள்",
        "climate": "வெப்பமான காலநிலை; 20-30°C"
      },
      "soil": {
        "type": "களிமண் அல்லது மணல்-களிமண்",
        "ph": "5.8 - 7.0",
        "organic": "அதிக கரிமப்பொருள்",
        "drainage": "நன்கு வடிகட்டப்பட்ட"
      },
      "irrigation": {
        "frequency": "6-8 நீர்ப்பாசனம்",
        "critical": "முளைத்தல், முழங்கால் அளவு, தசைநார், தானியம் நிரப்புதல்",
        "requirement": "50-70 செ.மீ தண்ணீர்",
        "method": "உரோமம் அல்லது சொட்டு"
      },
      "pests": [
        {
          "name": "படைப்புழு",
          "severity": "High",
          "control": "ஸ்பைனெட்டோராம் 11.7 SC @ 500 மிலி/எக்டர்"
        },
        {
          "name": "தண்டு துளைப்பான்",
          "severity": "High",
          "control": "கார்போஃபுரான் 3G @ 20 கிலோ/எக்டர்"
        },
        {
          "name": "மக்காச்சோளம் ஸ்ட்ரீக் வைரஸ்",
          "severity": "Medium",
          "control": "இலைப்பேன் கட்டுப்பாடு; எதிர்ப்பு ரகங்கள்"
        }
      ],
      "fertilizer": [
        {
          "stage": "அடித்தளம்",
          "n": "60 கிலோ/எக்டர்",
          "p": "60 கிலோ/எக்டர்",
          "k": "40 கிலோ/எக்டர்"
        },
        {
          "stage": "முழங்கால் அளவிலான நிலை (V6)",
          "n": "60 கிலோ/எக்டர்",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "டாசலிங் (V12)",
          "n": "30 கிலோ/எக்டர்",
          "p": "—",
          "k": "20 கிலோ/எக்டர்"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "பருத்தி",
      "emoji": "🌿",
      "category": "பணப்பயிர்",
      "seasonality": {
        "sowingMonths": "ஏப்ரல் - ஜூன்",
        "harvestMonths": "அக்டோபர் - ஜனவரி",
        "duration": "150-180 நாட்கள்",
        "climate": "வெப்பமான & அரை வறண்ட; 25-35°C"
      },
      "soil": {
        "type": "கருப்பு பருத்தி மண் அல்லது களிமண்",
        "ph": "7.0 - 8.0",
        "organic": "மிதமான கரிம உள்ளடக்கம்",
        "drainage": "ஆழமான, நன்கு வடியும்"
      },
      "irrigation": {
        "frequency": "8-10 நீர்ப்பாசனம்",
        "critical": "முளைத்தல், ஸ்கொயர் செய்தல், பூக்கும், காய் உருவாக்கம்",
        "requirement": "60-90 செ.மீ தண்ணீர்",
        "method": "உரோமம் அல்லது சொட்டு நீர் பாசனம்"
      },
      "pests": [
        {
          "name": "காய்ப்புழு",
          "severity": "High",
          "control": "பைரெத்ராய்டு + ஆர்கனோபாஸ்பேட் கலவை ஸ்ப்ரேக்கள்"
        },
        {
          "name": "வெள்ளை ஈ",
          "severity": "High",
          "control": "தியாமெதோக்சம் 25 WG @ 100 கிராம்/எக்டர்"
        },
        {
          "name": "அசுவினி",
          "severity": "Medium",
          "control": "டைமெத்தோயேட் 30 EC @ 1 எல்/எக்டர்"
        }
      ],
      "fertilizer": [
        {
          "stage": "அடித்தளம்",
          "n": "30 கிலோ/எக்டர்",
          "p": "60 கிலோ/எக்டர்",
          "k": "30 கிலோ/எக்டர்"
        },
        {
          "stage": "ஸ்கொயரிங் (45 DAS)",
          "n": "30 கிலோ/எக்டர்",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "பூக்கும் (75 DAS)",
          "n": "30 கிலோ/எக்டர்",
          "p": "—",
          "k": "30 கிலோ/எக்டர்"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "சோயாபீன்",
      "emoji": "🫘",
      "category": "பருப்பு",
      "seasonality": {
        "sowingMonths": "ஜூன் - ஜூலை",
        "harvestMonths": "செப்டம்பர் - அக்டோபர்",
        "duration": "90-100 நாட்கள்",
        "climate": "வெப்பமான ஈரப்பதம்; 20-30°C"
      },
      "soil": {
        "type": "களிமண் முதல் களிமண் வரை",
        "ph": "6.0 - 7.5",
        "organic": "அதிக கரிமப்பொருள்",
        "drainage": "நன்கு வடிகட்டப்பட்ட"
      },
      "irrigation": {
        "frequency": "3-4 முக்கியமான நீர்ப்பாசனம்",
        "critical": "முளைத்தல், நெற்று உருவாக்கம், விதை நிரப்புதல்",
        "requirement": "30-45 செ.மீ தண்ணீர்",
        "method": "தெளிப்பான் அல்லது உரோமம்"
      },
      "pests": [
        {
          "name": "நெற்று துளைப்பான்",
          "severity": "High",
          "control": "குயினல்பாஸ் 25 EC @ 2 எல்/எக்டர்"
        },
        {
          "name": "மஞ்சள் மொசைக் வைரஸ்",
          "severity": "High",
          "control": "வெள்ளை ஈ கட்டுப்பாடு; எதிர்ப்பு ரகங்கள்"
        },
        {
          "name": "தண்டு ஈ",
          "severity": "Medium",
          "control": "கார்போசல்ஃபான் விதை நேர்த்தி"
        }
      ],
      "fertilizer": [
        {
          "stage": "பாசல் (ரைசோபியம் தடுப்பூசி)",
          "n": "20 கிலோ/எக்டர்",
          "p": "60 கிலோ/எக்டர்",
          "k": "40 கிலோ/எக்டர்"
        },
        {
          "stage": "பூ தொடக்கம்",
          "n": "—",
          "p": "20 கிலோ/எக்டர்",
          "k": "20 கிலோ/எக்டர்"
        }
      ]
    }
  ],
  "te": [
    {
      "id": "wheat",
      "name": "గోధుమ",
      "emoji": "🌾",
      "category": "తృణధాన్యం",
      "seasonality": {
        "sowingMonths": "అక్టోబర్ - నవంబర్",
        "harvestMonths": "మార్చి - ఏప్రిల్",
        "duration": "120-150 రోజులు",
        "climate": "చల్లని & పొడి శీతాకాలాలు, తేలికపాటి వేసవి"
      },
      "soil": {
        "type": "బాగా ఎండిపోయిన లోమీ లేదా బంకమట్టి",
        "ph": "6.0 - 7.5",
        "organic": "మధ్యస్థం నుండి అధిక సేంద్రియ పదార్థం",
        "drainage": "మంచి పారుదల అవసరం"
      },
      "irrigation": {
        "frequency": "4-6 నీటిపారుదల",
        "critical": "క్రౌన్ రూట్ ప్రారంభం, టిల్లరింగ్, జాయింటింగ్, గింజ నింపడం",
        "requirement": "35-40 సెం.మీ మొత్తం నీరు",
        "method": "వరద లేదా బిందు సేద్యం"
      },
      "pests": [
        {
          "name": "అఫిడ్స్",
          "severity": "High",
          "control": "క్లోర్‌పైరిఫాస్ 20 ఇసి @ 1 లీ/హెక్టార్‌కు పిచికారీ చేయాలి"
        },
        {
          "name": "కాండం తుప్పు",
          "severity": "Medium",
          "control": "ప్రొపికోనజోల్ 25 ఇసి వర్తించు"
        },
        {
          "name": "బ్రౌన్ రస్ట్",
          "severity": "Medium",
          "control": "మాంకోజెబ్ 75 డబ్ల్యుపి @ 2 కిలోలు/హెక్టార్"
        }
      ],
      "fertilizer": [
        {
          "stage": "బేసల్ (నాటే సమయంలో)",
          "n": "60 కిలోలు/హెక్టార్",
          "p": "60 కిలోలు/హెక్టార్",
          "k": "40 కిలోలు/హెక్టార్"
        },
        {
          "stage": "టిల్లరింగ్ దశ",
          "n": "40 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "హెడింగ్ దశ",
          "n": "20 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "వరి",
      "emoji": "🌾",
      "category": "తృణధాన్యం",
      "seasonality": {
        "sowingMonths": "జూన్ - జూలై (ఖరీఫ్), నవంబర్-డిసెంబర్ (రబీ)",
        "harvestMonths": "అక్టోబర్ - నవంబర్ / మార్చి",
        "duration": "90-120 రోజులు",
        "climate": "వేడి తేమ; భారీ వర్షపాతంతో 25-35°C"
      },
      "soil": {
        "type": "భారీ బంకమట్టి లేదా సిల్టీ-లోమ్",
        "ph": "5.5 - 7.0",
        "organic": "అధిక నీటి నిలుపుదల అవసరం",
        "drainage": "పేద పారుదల / నీటితో నిండిన"
      },
      "irrigation": {
        "frequency": "నిరంతర వరదలు లేదా AWD",
        "critical": "నాటడం, టిల్లరింగ్, పానికిల్ ప్రారంభం, పుష్పించే",
        "requirement": "100-200 సెం.మీ నీరు",
        "method": "వరద / ప్రత్యామ్నాయ తడి & ఎండబెట్టడం (AWD)"
      },
      "pests": [
        {
          "name": "బ్రౌన్ ప్లాంట్‌హాపర్",
          "severity": "High",
          "control": "ఇమిడాక్లోప్రిడ్ 17.8 SL @ 125 ml/ha"
        },
        {
          "name": "కాండం తొలుచు పురుగు",
          "severity": "High",
          "control": "కార్టాప్ హైడ్రోక్లోరైడ్ 4G @ 18 kg/ha"
        },
        {
          "name": "అగ్గి తెగులు",
          "severity": "Medium",
          "control": "ట్రైసైక్లాజోల్ 75 WP @ 500 గ్రా/హెక్టార్"
        }
      ],
      "fertilizer": [
        {
          "stage": "బేసల్ (నాటడం)",
          "n": "40 కిలోలు/హెక్టార్",
          "p": "30 కిలోలు/హెక్టార్",
          "k": "30 కిలోలు/హెక్టార్"
        },
        {
          "stage": "యాక్టివ్ టిల్లరింగ్ (21 DAT)",
          "n": "40 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "పానికిల్ దీక్ష",
          "n": "20 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "20 కిలోలు/హెక్టార్"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "టమోటా",
      "emoji": "🍅",
      "category": "కూరగాయ",
      "seasonality": {
        "sowingMonths": "జూన్-జూలై / అక్టోబర్-నవంబర్",
        "harvestMonths": "సెప్టెంబర్-నవంబర్ / జనవరి-మార్చి",
        "duration": "నాటిన 70-90 రోజులు",
        "climate": "21-27°C; మితమైన వర్షపాతం"
      },
      "soil": {
        "type": "ఇసుక లోమ్ నుండి లోమీ",
        "ph": "6.0 - 7.0",
        "organic": "సేంద్రియ పదార్థాలు అధికంగా ఉంటాయి",
        "drainage": "బాగా పారుదల, లోతైన నేల"
      },
      "irrigation": {
        "frequency": "ప్రతి 5-7 రోజులు",
        "critical": "నాటడం, పుష్పించే, పండ్ల సెట్",
        "requirement": "40-60 సెం.మీ మొత్తం నీరు",
        "method": "బిందు సేద్యం ప్రాధాన్యత"
      },
      "pests": [
        {
          "name": "టొమాటో లీఫ్ కర్ల్ వైరస్",
          "severity": "High",
          "control": "వైట్‌ఫ్లై వెక్టర్‌ను నియంత్రించండి; ఇమిడాక్లోప్రిడ్ 200 SL"
        },
        {
          "name": "ప్రారంభ ముడత",
          "severity": "High",
          "control": "క్లోరోథలోనిల్ 75 WP @ 2 kg/ha"
        },
        {
          "name": "పండు తొలుచు పురుగు",
          "severity": "Medium",
          "control": "స్పినోసాడ్ 45 SC @ 150 ml/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "బేసల్",
          "n": "50 కిలోలు/హెక్టార్",
          "p": "50 కిలోలు/హెక్టార్",
          "k": "50 కిలోలు/హెక్టార్"
        },
        {
          "stage": "నాటిన 30 రోజుల తర్వాత",
          "n": "30 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "25 కిలోలు/హెక్టార్"
        },
        {
          "stage": "పండ్ల అభివృద్ధి",
          "n": "20 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "25 కిలోలు/హెక్టార్"
        }
      ]
    },
    {
      "id": "corn",
      "name": "మొక్కజొన్న",
      "emoji": "🌽",
      "category": "తృణధాన్యం",
      "seasonality": {
        "sowingMonths": "జూన్ - జూలై (ఖరీఫ్), జనవరి-ఫిబ్రవరి (రబీ)",
        "harvestMonths": "సెప్టెంబర్ - అక్టోబర్ / ఏప్రిల్-మే",
        "duration": "90-110 రోజులు",
        "climate": "వెచ్చని వాతావరణం; 20-30°C"
      },
      "soil": {
        "type": "లోమ్ లేదా ఇసుక-లోమ్",
        "ph": "5.8 - 7.0",
        "organic": "అధిక సేంద్రియ పదార్థం",
        "drainage": "బాగా ఎండిపోయిన"
      },
      "irrigation": {
        "frequency": "6-8 నీటిపారుదల",
        "critical": "అంకురోత్పత్తి, మోకాలి ఎత్తు, టాసెలింగ్, గ్రెయిన్ ఫిల్",
        "requirement": "50-70 సెం.మీ నీరు",
        "method": "చాలు లేదా బిందు"
      },
      "pests": [
        {
          "name": "ఫాల్ ఆర్మీవార్మ్",
          "severity": "High",
          "control": "స్పినెటోరామ్ 11.7 SC @ 500 ml/ha"
        },
        {
          "name": "కాండం తొలుచు పురుగు",
          "severity": "High",
          "control": "కార్బోఫ్యూరాన్ 3G @ 20 kg/ha"
        },
        {
          "name": "మొక్కజొన్న స్ట్రీక్ వైరస్",
          "severity": "Medium",
          "control": "ఆకుపచ్చని నియంత్రణ; నిరోధక రకాలు"
        }
      ],
      "fertilizer": [
        {
          "stage": "బేసల్",
          "n": "60 కిలోలు/హెక్టార్",
          "p": "60 కిలోలు/హెక్టార్",
          "k": "40 కిలోలు/హెక్టార్"
        },
        {
          "stage": "మోకాలి ఎత్తు దశ (V6)",
          "n": "60 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "టాసెలింగ్ (V12)",
          "n": "30 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "20 కిలోలు/హెక్టార్"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "పత్తి",
      "emoji": "🌿",
      "category": "నగదు పంట",
      "seasonality": {
        "sowingMonths": "ఏప్రిల్ - జూన్",
        "harvestMonths": "అక్టోబర్ - జనవరి",
        "duration": "150-180 రోజులు",
        "climate": "వేడి & సెమీ శుష్క; 25-35°C"
      },
      "soil": {
        "type": "నల్ల పత్తి నేల లేదా లోమీ",
        "ph": "7.0 - 8.0",
        "organic": "మితమైన సేంద్రీయ కంటెంట్",
        "drainage": "లోతైన, బాగా పారుదల"
      },
      "irrigation": {
        "frequency": "8-10 నీటిపారుదల",
        "critical": "అంకురోత్పత్తి, స్క్వేరింగ్, పుష్పించే, బాల్ నిర్మాణం",
        "requirement": "60-90 సెం.మీ నీరు",
        "method": "చాలు లేదా బిందు సేద్యం"
      },
      "pests": [
        {
          "name": "కాయతొలుచు పురుగు",
          "severity": "High",
          "control": "పైరెథ్రాయిడ్ + ఆర్గానోఫాస్ఫేట్ కాంబో స్ప్రేలు"
        },
        {
          "name": "తెల్లదోమ",
          "severity": "High",
          "control": "థియామెథోక్సామ్ 25 WG @ 100 గ్రా/హెక్టార్"
        },
        {
          "name": "అఫిడ్",
          "severity": "Medium",
          "control": "డైమెథోయేట్ 30 EC @ 1 L/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "బేసల్",
          "n": "30 కిలోలు/హెక్టార్",
          "p": "60 కిలోలు/హెక్టార్",
          "k": "30 కిలోలు/హెక్టార్"
        },
        {
          "stage": "స్క్వేరింగ్ (45 DAS)",
          "n": "30 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "పుష్పించే (75 DAS)",
          "n": "30 కిలోలు/హెక్టార్",
          "p": "—",
          "k": "30 కిలోలు/హెక్టార్"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "సోయాబీన్",
      "emoji": "🫘",
      "category": "పప్పుధాన్యాలు",
      "seasonality": {
        "sowingMonths": "జూన్ - జూలై",
        "harvestMonths": "సెప్టెంబర్ - అక్టోబర్",
        "duration": "90-100 రోజులు",
        "climate": "వెచ్చని తేమ; 20-30°C"
      },
      "soil": {
        "type": "లోమ్ నుండి బంకమట్టి",
        "ph": "6.0 - 7.5",
        "organic": "అధిక సేంద్రియ పదార్థం",
        "drainage": "బాగా ఎండిపోయిన"
      },
      "irrigation": {
        "frequency": "3-4 క్లిష్టమైన నీటిపారుదల",
        "critical": "అంకురోత్పత్తి, పాడ్ నిర్మాణం, విత్తనం నింపడం",
        "requirement": "30-45 సెం.మీ నీరు",
        "method": "స్ప్రింక్లర్ లేదా ఫుర్రో"
      },
      "pests": [
        {
          "name": "పాడ్ బోరర్",
          "severity": "High",
          "control": "క్వినాల్ఫాస్ 25 ఇసి @ 2 లీ/హెక్టార్"
        },
        {
          "name": "ఎల్లో మొజాయిక్ వైరస్",
          "severity": "High",
          "control": "వైట్‌ఫ్లైని నియంత్రించండి; నిరోధక రకాలు"
        },
        {
          "name": "కాండం ఫ్లై",
          "severity": "Medium",
          "control": "కార్బోసల్ఫాన్ విత్తన చికిత్స"
        }
      ],
      "fertilizer": [
        {
          "stage": "బేసల్ (రైజోబియం ఇనాక్యులేషన్)",
          "n": "20 కిలోలు/హెక్టార్",
          "p": "60 కిలోలు/హెక్టార్",
          "k": "40 కిలోలు/హెక్టార్"
        },
        {
          "stage": "పూల ప్రారంభం",
          "n": "—",
          "p": "20 కిలోలు/హెక్టార్",
          "k": "20 కిలోలు/హెక్టార్"
        }
      ]
    }
  ],
  "kn": [
    {
      "id": "wheat",
      "name": "ಗೋಧಿ",
      "emoji": "🌾",
      "category": "ಧಾನ್ಯ",
      "seasonality": {
        "sowingMonths": "ಅಕ್ಟೋಬರ್ - ನವೆಂಬರ್",
        "harvestMonths": "ಮಾರ್ಚ್ - ಏಪ್ರಿಲ್",
        "duration": "120-150 ದಿನಗಳು",
        "climate": "ತಂಪಾದ ಮತ್ತು ಶುಷ್ಕ ಚಳಿಗಾಲ, ಸೌಮ್ಯ ಬೇಸಿಗೆ"
      },
      "soil": {
        "type": "ಚೆನ್ನಾಗಿ ಬರಿದಾದ ಲೋಮಿ ಅಥವಾ ಜೇಡಿಮಣ್ಣು",
        "ph": "6.0 - 7.5",
        "organic": "ಮಧ್ಯಮದಿಂದ ಹೆಚ್ಚಿನ ಸಾವಯವ ವಸ್ತು",
        "drainage": "ಉತ್ತಮ ಒಳಚರಂಡಿ ಅಗತ್ಯವಿದೆ"
      },
      "irrigation": {
        "frequency": "4-6 ನೀರಾವರಿ",
        "critical": "ಕಿರೀಟ ಬೇರಿನ ಪ್ರಾರಂಭ, ಟಿಲ್ಲರಿಂಗ್, ಜಂಟಿ, ಧಾನ್ಯ ತುಂಬುವಿಕೆ",
        "requirement": "35-40 ಸೆಂ ಒಟ್ಟು ನೀರು",
        "method": "ಪ್ರವಾಹ ಅಥವಾ ಹನಿ ನೀರಾವರಿ"
      },
      "pests": [
        {
          "name": "ಗಿಡಹೇನುಗಳು",
          "severity": "High",
          "control": "ಕ್ಲೋರ್‌ಪೈರಿಫಾಸ್ 20 ಇಸಿ @ 1 ಲೀ/ಹೆ ಸಿಂಪಡಿಸಿ"
        },
        {
          "name": "ಕಾಂಡದ ತುಕ್ಕು",
          "severity": "Medium",
          "control": "ಪ್ರೊಪಿಕೋನಜೋಲ್ 25 ಇಸಿ ಅನ್ವಯಿಸಿ"
        },
        {
          "name": "ಕಂದು ತುಕ್ಕು",
          "severity": "Medium",
          "control": "ಮ್ಯಾಂಕೋಜೆಬ್ 75 WP @ 2 ಕೆಜಿ/ಹೆ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ತಳದ (ನೆಡುವಾಗ)",
          "n": "60 kg/ha",
          "p": "60 kg/ha",
          "k": "40 kg/ha"
        },
        {
          "stage": "ಟಿಲ್ಲರಿಂಗ್ ಹಂತ",
          "n": "40 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ಶಿರೋನಾಮೆ ಹಂತ",
          "n": "20 kg/ha",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "ಅಕ್ಕಿ",
      "emoji": "🌾",
      "category": "ಧಾನ್ಯ",
      "seasonality": {
        "sowingMonths": "ಜೂನ್ - ಜುಲೈ (ಖಾರಿಫ್), ನವೆಂಬರ್-ಡಿಸೆಂಬರ್ (ರಬಿ)",
        "harvestMonths": "ಅಕ್ಟೋಬರ್ - ನವೆಂಬರ್ / ಮಾರ್ಚ್",
        "duration": "90-120 ದಿನಗಳು",
        "climate": "ಬಿಸಿ ಆರ್ದ್ರ; 25-35 ° C ಭಾರೀ ಮಳೆಯೊಂದಿಗೆ"
      },
      "soil": {
        "type": "ಭಾರೀ ಜೇಡಿಮಣ್ಣು ಅಥವಾ ಸಿಲ್ಟಿ-ಲೋಮ್",
        "ph": "5.5 - 7.0",
        "organic": "ಹೆಚ್ಚಿನ ನೀರಿನ ಧಾರಣ ಅತ್ಯಗತ್ಯ",
        "drainage": "ಕಳಪೆ ಒಳಚರಂಡಿ / ಜಲಾವೃತ"
      },
      "irrigation": {
        "frequency": "ನಿರಂತರ ಪ್ರವಾಹ ಅಥವಾ AWD",
        "critical": "ಕಸಿ, ಟಿಲ್ಲರಿಂಗ್, ಪ್ಯಾನಿಕಲ್ ದೀಕ್ಷೆ, ಹೂಬಿಡುವಿಕೆ",
        "requirement": "100-200 ಸೆಂ ನೀರು",
        "method": "ಪ್ರವಾಹ / ಪರ್ಯಾಯ ತೇವ ಮತ್ತು ಒಣಗಿಸುವಿಕೆ (AWD)"
      },
      "pests": [
        {
          "name": "ಬ್ರೌನ್ ಪ್ಲಾಂಟ್ ಹಾಪರ್",
          "severity": "High",
          "control": "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ 17.8 ಎಸ್‌ಎಲ್ @ 125 ಮಿಲಿ/ಹೆ"
        },
        {
          "name": "ಕಾಂಡ ಕೊರಕ",
          "severity": "High",
          "control": "ಕಾರ್ಟಾಪ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್ 4G @ 18 kg/ha"
        },
        {
          "name": "ಸ್ಫೋಟ ರೋಗ",
          "severity": "Medium",
          "control": "ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ 75 WP @ 500 ಗ್ರಾಂ/ಹೆ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ತಳದ (ಕಸಿ)",
          "n": "40 kg/ha",
          "p": "30 kg/ha",
          "k": "30 kg/ha"
        },
        {
          "stage": "ಸಕ್ರಿಯ ಟಿಲ್ಲರಿಂಗ್ (21 DAT)",
          "n": "40 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ಪ್ಯಾನಿಕಲ್ ದೀಕ್ಷೆ",
          "n": "20 kg/ha",
          "p": "—",
          "k": "20 kg/ha"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "ಟೊಮೆಟೊ",
      "emoji": "🍅",
      "category": "ತರಕಾರಿ",
      "seasonality": {
        "sowingMonths": "ಜೂನ್-ಜುಲೈ / ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್",
        "harvestMonths": "ಸೆಪ್ಟೆಂಬರ್-ನವೆಂಬರ್ / ಜನವರಿ-ಮಾರ್ಚ್",
        "duration": "ಕಸಿಯಿಂದ 70-90 ದಿನಗಳು",
        "climate": "21-27 ° C; ಸಾಧಾರಣ ಮಳೆ"
      },
      "soil": {
        "type": "ಮರಳು ಲೋಮ್ ನಿಂದ ಲೋಮಮಿ",
        "ph": "6.0 - 7.0",
        "organic": "ಸಾವಯವ ಪದಾರ್ಥಗಳಲ್ಲಿ ಸಮೃದ್ಧವಾಗಿದೆ",
        "drainage": "ಚೆನ್ನಾಗಿ ಬರಿದಾದ, ಆಳವಾದ ಮಣ್ಣು"
      },
      "irrigation": {
        "frequency": "ಪ್ರತಿ 5-7 ದಿನಗಳು",
        "critical": "ಕಸಿ, ಹೂಬಿಡುವಿಕೆ, ಹಣ್ಣಿನ ಸೆಟ್",
        "requirement": "40-60 ಸೆಂ ಒಟ್ಟು ನೀರು",
        "method": "ಹನಿ ನೀರಾವರಿಗೆ ಆದ್ಯತೆ"
      },
      "pests": [
        {
          "name": "ಟೊಮೆಟೊ ಲೀಫ್ ಕರ್ಲ್ ವೈರಸ್",
          "severity": "High",
          "control": "ಬಿಳಿ ನೊಣ ವೆಕ್ಟರ್ ಅನ್ನು ನಿಯಂತ್ರಿಸಿ; ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ 200 SL"
        },
        {
          "name": "ಆರಂಭಿಕ ರೋಗ",
          "severity": "High",
          "control": "ಕ್ಲೋರೊಥಾಲೋನಿಲ್ 75 WP @ 2 ಕೆಜಿ/ಹೆ"
        },
        {
          "name": "ಹಣ್ಣು ಕೊರಕ",
          "severity": "Medium",
          "control": "ಸ್ಪಿನೋಸಾಡ್ 45 SC @ 150 ಮಿಲಿ/ಹೆ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ತಳದ",
          "n": "50 kg/ha",
          "p": "50 kg/ha",
          "k": "50 kg/ha"
        },
        {
          "stage": "ಕಸಿ ಮಾಡಿದ 30 ದಿನಗಳ ನಂತರ",
          "n": "30 kg/ha",
          "p": "—",
          "k": "25 kg/ha"
        },
        {
          "stage": "ಹಣ್ಣಿನ ಬೆಳವಣಿಗೆ",
          "n": "20 kg/ha",
          "p": "—",
          "k": "25 kg/ha"
        }
      ]
    },
    {
      "id": "corn",
      "name": "ಮೆಕ್ಕೆಜೋಳ",
      "emoji": "🌽",
      "category": "ಧಾನ್ಯ",
      "seasonality": {
        "sowingMonths": "ಜೂನ್ - ಜುಲೈ (ಖಾರಿಫ್), ಜನವರಿ-ಫೆಬ್ರವರಿ (ರಬಿ)",
        "harvestMonths": "ಸೆಪ್ಟೆಂಬರ್ - ಅಕ್ಟೋಬರ್ / ಏಪ್ರಿಲ್-ಮೇ",
        "duration": "90-110 ದಿನಗಳು",
        "climate": "ಬೆಚ್ಚಗಿನ ಹವಾಮಾನ; 20-30°C"
      },
      "soil": {
        "type": "ಲೋಮ್ ಅಥವಾ ಮರಳು-ಲೋಮ್",
        "ph": "5.8 - 7.0",
        "organic": "ಹೆಚ್ಚಿನ ಸಾವಯವ ವಸ್ತು",
        "drainage": "ಚೆನ್ನಾಗಿ ಬರಿದಾದ"
      },
      "irrigation": {
        "frequency": "6-8 ನೀರಾವರಿ",
        "critical": "ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ, ಮೊಣಕಾಲು ಎತ್ತರ, ಟಸೆಲಿಂಗ್, ಧಾನ್ಯ ತುಂಬುವಿಕೆ",
        "requirement": "50-70 ಸೆಂ ನೀರು",
        "method": "ಉಬ್ಬು ಅಥವಾ ಹನಿ"
      },
      "pests": [
        {
          "name": "ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್",
          "severity": "High",
          "control": "ಸ್ಪಿನೆಟೋರಮ್ 11.7 SC @ 500 ಮಿಲಿ/ಹೆ"
        },
        {
          "name": "ಕಾಂಡ ಕೊರಕ",
          "severity": "High",
          "control": "ಕಾರ್ಬೋಫ್ಯುರಾನ್ 3G @ 20 kg/ha"
        },
        {
          "name": "ಮೆಕ್ಕೆಜೋಳದ ಸ್ಟ್ರೀಕ್ ವೈರಸ್",
          "severity": "Medium",
          "control": "ಎಲೆಹಾಪರ್ ಅನ್ನು ನಿಯಂತ್ರಿಸಿ; ನಿರೋಧಕ ಪ್ರಭೇದಗಳು"
        }
      ],
      "fertilizer": [
        {
          "stage": "ತಳದ",
          "n": "60 kg/ha",
          "p": "60 kg/ha",
          "k": "40 kg/ha"
        },
        {
          "stage": "ಮೊಣಕಾಲು-ಎತ್ತರದ ಹಂತ (V6)",
          "n": "60 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ಟಾಸೆಲಿಂಗ್ (V12)",
          "n": "30 kg/ha",
          "p": "—",
          "k": "20 kg/ha"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "ಹತ್ತಿ",
      "emoji": "🌿",
      "category": "ನಗದು ಬೆಳೆ",
      "seasonality": {
        "sowingMonths": "ಏಪ್ರಿಲ್ - ಜೂನ್",
        "harvestMonths": "ಅಕ್ಟೋಬರ್ - ಜನವರಿ",
        "duration": "150-180 ದಿನಗಳು",
        "climate": "ಬಿಸಿ ಮತ್ತು ಅರೆ ಶುಷ್ಕ; 25-35°C"
      },
      "soil": {
        "type": "ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು ಅಥವಾ ಲೋಮಮಿ",
        "ph": "7.0 - 8.0",
        "organic": "ಮಧ್ಯಮ ಸಾವಯವ ಅಂಶ",
        "drainage": "ಆಳವಾದ, ಚೆನ್ನಾಗಿ ಬರಿದಾದ"
      },
      "irrigation": {
        "frequency": "8-10 ನೀರಾವರಿ",
        "critical": "ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ, ಸ್ಕ್ವೇರಿಂಗ್, ಹೂಬಿಡುವಿಕೆ, ಬೋಲ್ ರಚನೆ",
        "requirement": "60-90 ಸೆಂ ನೀರು",
        "method": "ಉಬ್ಬು ಅಥವಾ ಹನಿ ನೀರಾವರಿ"
      },
      "pests": [
        {
          "name": "ಬೋಲ್ವರ್ಮ್ (ಗುಲಾಬಿ/ಅಮೇರಿಕನ್)",
          "severity": "High",
          "control": "ಪೈರೆಥ್ರಾಯ್ಡ್ + ಆರ್ಗನೋಫಾಸ್ಫೇಟ್ ಕಾಂಬೊ ದ್ರವೌಷಧಗಳು"
        },
        {
          "name": "ಬಿಳಿ ನೊಣ",
          "severity": "High",
          "control": "ಥಿಯಾಮೆಥೋಕ್ಸಮ್ 25 WG @ 100 ಗ್ರಾಂ/ಹೆ"
        },
        {
          "name": "ಗಿಡಹೇನು",
          "severity": "Medium",
          "control": "ಡೈಮೆಥೋಯೇಟ್ 30 ಇಸಿ @ 1 ಲೀ/ಹೆ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ತಳದ",
          "n": "30 kg/ha",
          "p": "60 kg/ha",
          "k": "30 kg/ha"
        },
        {
          "stage": "ಸ್ಕ್ವೇರಿಂಗ್ (45 DAS)",
          "n": "30 kg/ha",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ಹೂಬಿಡುವಿಕೆ (75 DAS)",
          "n": "30 kg/ha",
          "p": "—",
          "k": "30 kg/ha"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "ಸೋಯಾಬೀನ್",
      "emoji": "🫘",
      "category": "ನಾಡಿ",
      "seasonality": {
        "sowingMonths": "ಜೂನ್ - ಜುಲೈ",
        "harvestMonths": "ಸೆಪ್ಟೆಂಬರ್ - ಅಕ್ಟೋಬರ್",
        "duration": "90-100 ದಿನಗಳು",
        "climate": "ಬೆಚ್ಚಗಿನ ಆರ್ದ್ರತೆ; 20-30°C"
      },
      "soil": {
        "type": "ಲೋಮ್ ನಿಂದ ಜೇಡಿಮಣ್ಣಿನಿಂದ",
        "ph": "6.0 - 7.5",
        "organic": "ಹೆಚ್ಚಿನ ಸಾವಯವ ವಸ್ತು",
        "drainage": "ಚೆನ್ನಾಗಿ ಬರಿದಾದ"
      },
      "irrigation": {
        "frequency": "3-4 ನಿರ್ಣಾಯಕ ನೀರಾವರಿ",
        "critical": "ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ, ಪಾಡ್ ರಚನೆ, ಬೀಜ ತುಂಬುವಿಕೆ",
        "requirement": "30-45 ಸೆಂ ನೀರು",
        "method": "ಸ್ಪ್ರಿಂಕ್ಲರ್ ಅಥವಾ ಉಬ್ಬು"
      },
      "pests": [
        {
          "name": "ಪಾಡ್ ಬೋರರ್",
          "severity": "High",
          "control": "ಕ್ವಿನಾಲ್ಫಾಸ್ 25 ಇಸಿ @ 2 ಲೀ/ಹೆ"
        },
        {
          "name": "ಹಳದಿ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
          "severity": "High",
          "control": "ಬಿಳಿ ನೊಣವನ್ನು ನಿಯಂತ್ರಿಸಿ; ನಿರೋಧಕ ಪ್ರಭೇದಗಳು"
        },
        {
          "name": "ಕಾಂಡದ ನೊಣ",
          "severity": "Medium",
          "control": "ಕಾರ್ಬೋಸಲ್ಫಾನ್ ಬೀಜ ಸಂಸ್ಕರಣೆ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ತಳದ (ರೈಜೋಬಿಯಂ ಇನಾಕ್ಯುಲೇಷನ್)",
          "n": "20 kg/ha",
          "p": "60 kg/ha",
          "k": "40 kg/ha"
        },
        {
          "stage": "ಹೂವಿನ ದೀಕ್ಷೆ",
          "n": "—",
          "p": "20 kg/ha",
          "k": "20 kg/ha"
        }
      ]
    }
  ],
  "mr": [
    {
      "id": "wheat",
      "name": "गहू",
      "emoji": "🌾",
      "category": "तृणधान्य",
      "seasonality": {
        "sowingMonths": "ऑक्टोबर - नोव्हेंबर",
        "harvestMonths": "मार्च - एप्रिल",
        "duration": "१२०-१५० दिवस",
        "climate": "थंड आणि कोरडे हिवाळा, सौम्य उन्हाळा"
      },
      "soil": {
        "type": "चांगला निचरा होणारी चिकणमाती किंवा चिकणमाती",
        "ph": "६.० - ७.५",
        "organic": "मध्यम ते उच्च सेंद्रिय पदार्थ",
        "drainage": "चांगला निचरा आवश्यक"
      },
      "irrigation": {
        "frequency": "४-६ सिंचन",
        "critical": "क्राउन रूट दीक्षा, टिलरिंग, जॉइंटिंग, धान्य भरणे",
        "requirement": "३५-४० सेमी एकूण पाणी",
        "method": "पूर किंवा ठिबक सिंचन"
      },
      "pests": [
        {
          "name": "अॅफिड्स",
          "severity": "High",
          "control": "क्लोरपायरीफॉस 20 EC @ 1 L/ha फवारणी करा"
        },
        {
          "name": "स्टेम गंज",
          "severity": "Medium",
          "control": "Propiconazole 25 EC लागू करा"
        },
        {
          "name": "तपकिरी गंज",
          "severity": "Medium",
          "control": "मॅन्कोझेब 75 WP @ 2 kg/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "पायाभूत (लागवडीच्या वेळी)",
          "n": "६० किलो/हेक्टर",
          "p": "६० किलो/हेक्टर",
          "k": "४० किलो/हेक्टर"
        },
        {
          "stage": "टिलरिंग स्टेज",
          "n": "४० किलो/हेक्टर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "मथळा स्टेज",
          "n": "२० किलो/हेक्टर",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "तांदूळ",
      "emoji": "🌾",
      "category": "तृणधान्य",
      "seasonality": {
        "sowingMonths": "जून - जुलै (खरीप), नोव्हेंबर-डिसेंबर (रब्बी)",
        "harvestMonths": "ऑक्टोबर - नोव्हेंबर / मार्च",
        "duration": "९०-१२० दिवस",
        "climate": "गरम दमट; मुसळधार पावसासह 25-35°C"
      },
      "soil": {
        "type": "जड माती किंवा गाळ-लामोळी",
        "ph": "५.५ - ७.०",
        "organic": "जास्त पाणी राखून ठेवणे आवश्यक आहे",
        "drainage": "खराब ड्रेनेज / पाणी साचलेले"
      },
      "irrigation": {
        "frequency": "सतत पूर किंवा AWD",
        "critical": "प्रत्यारोपण, टिलरिंग, पॅनिक दीक्षा, फुलांच्या",
        "requirement": "100-200 सेमी पाणी",
        "method": "पूर / पर्यायी ओले आणि कोरडे (AWD)"
      },
      "pests": [
        {
          "name": "ब्राउन प्लॅन्ट हॉपर",
          "severity": "High",
          "control": "इमिडाक्लोप्रिड 17.8 SL @ 125 मिली/हे"
        },
        {
          "name": "स्टेम बोरर",
          "severity": "High",
          "control": "कार्टॅप हायड्रोक्लोराइड 4G @ 18 किलो/हेक्टर"
        },
        {
          "name": "स्फोट रोग",
          "severity": "Medium",
          "control": "Tricyclazole 75 WP @ 500 ग्रॅम/हे"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल (प्रत्यारोपण)",
          "n": "४० किलो/हेक्टर",
          "p": "३० किलो/हेक्टर",
          "k": "३० किलो/हेक्टर"
        },
        {
          "stage": "सक्रिय टिलरिंग (21 DAT)",
          "n": "४० किलो/हेक्टर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "पॅनिक दीक्षा",
          "n": "२० किलो/हेक्टर",
          "p": "—",
          "k": "२० किलो/हेक्टर"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "टोमॅटो",
      "emoji": "🍅",
      "category": "भाजी",
      "seasonality": {
        "sowingMonths": "जून-जुलै / ऑक्टोबर-नोव्हेंबर",
        "harvestMonths": "सप्टेंबर-नोव्हेंबर / जानेवारी-मार्च",
        "duration": "प्रत्यारोपणापासून 70-90 दिवस",
        "climate": "21-27°C; मध्यम पाऊस"
      },
      "soil": {
        "type": "वालुकामय चिकणमाती ते चिकणमाती",
        "ph": "६.० - ७.०",
        "organic": "सेंद्रिय पदार्थांनी समृद्ध",
        "drainage": "चांगला निचरा होणारी, खोल माती"
      },
      "irrigation": {
        "frequency": "दर ५-७ दिवसांनी",
        "critical": "प्रत्यारोपण, फ्लॉवरिंग, फ्रूट सेट",
        "requirement": "40-60 सेमी एकूण पाणी",
        "method": "ठिबक सिंचनाला प्राधान्य दिले जाते"
      },
      "pests": [
        {
          "name": "टोमॅटो लीफ कर्ल व्हायरस",
          "severity": "High",
          "control": "पांढरी माशी वेक्टर नियंत्रित करा; इमिडाक्लोप्रिड 200 एसएल"
        },
        {
          "name": "लवकर अनिष्ट परिणाम",
          "severity": "High",
          "control": "क्लोरोथालोनिल 75 WP @ 2 kg/ha"
        },
        {
          "name": "फळ पोखरणारी अळी",
          "severity": "Medium",
          "control": "Spinosad 45 SC @ 150 ml/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "पायाभूत",
          "n": "५० किलो/हेक्टर",
          "p": "५० किलो/हेक्टर",
          "k": "५० किलो/हेक्टर"
        },
        {
          "stage": "प्रत्यारोपणानंतर ३० दिवसांनी",
          "n": "३० किलो/हेक्टर",
          "p": "—",
          "k": "२५ किलो/हेक्टर"
        },
        {
          "stage": "फळांचा विकास",
          "n": "२० किलो/हेक्टर",
          "p": "—",
          "k": "२५ किलो/हेक्टर"
        }
      ]
    },
    {
      "id": "corn",
      "name": "मका (मका)",
      "emoji": "🌽",
      "category": "तृणधान्य",
      "seasonality": {
        "sowingMonths": "जून - जुलै (खरीप), जानेवारी-फेब्रुवारी (रब्बी)",
        "harvestMonths": "सप्टेंबर - ऑक्टोबर / एप्रिल-मे",
        "duration": "90-110 दिवस",
        "climate": "उबदार हवामान; 20-30°C"
      },
      "soil": {
        "type": "चिकणमाती किंवा वालुकामय-चिकणमाती",
        "ph": "५.८ - ७.०",
        "organic": "उच्च सेंद्रिय पदार्थ",
        "drainage": "चांगला निचरा"
      },
      "irrigation": {
        "frequency": "६-८ सिंचन",
        "critical": "उगवण, गुडघा-उंची, टॅसलिंग, धान्य भरणे",
        "requirement": "50-70 सेमी पाणी",
        "method": "फ्युरो किंवा ठिबक"
      },
      "pests": [
        {
          "name": "फॉल आर्मीवॉर्म",
          "severity": "High",
          "control": "Spinetoram 11.7 SC @ 500 ml/ha"
        },
        {
          "name": "स्टेम बोरर",
          "severity": "High",
          "control": "Carbofuran 3G @ 20 kg/ha"
        },
        {
          "name": "मका स्ट्रीक व्हायरस",
          "severity": "Medium",
          "control": "लीफहॉपर नियंत्रित करा; प्रतिरोधक जाती"
        }
      ],
      "fertilizer": [
        {
          "stage": "पायाभूत",
          "n": "६० किलो/हेक्टर",
          "p": "६० किलो/हेक्टर",
          "k": "४० किलो/हेक्टर"
        },
        {
          "stage": "गुडघा-उंच टप्पा (V6)",
          "n": "६० किलो/हेक्टर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "टॅसलिंग (V12)",
          "n": "३० किलो/हेक्टर",
          "p": "—",
          "k": "२० किलो/हेक्टर"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "कापूस",
      "emoji": "🌿",
      "category": "रोख पीक",
      "seasonality": {
        "sowingMonths": "एप्रिल - जून",
        "harvestMonths": "ऑक्टोबर - जानेवारी",
        "duration": "150-180 दिवस",
        "climate": "गरम आणि निम-शुष्क; 25-35°C"
      },
      "soil": {
        "type": "काळा कापूस माती किंवा चिकणमाती",
        "ph": "७.० - ८.०",
        "organic": "मध्यम सेंद्रिय सामग्री",
        "drainage": "खोल, चांगला निचरा"
      },
      "irrigation": {
        "frequency": "८-१० सिंचन",
        "critical": "उगवण, स्क्वेअरिंग, फ्लॉवरिंग, बोंड निर्मिती",
        "requirement": "60-90 सेमी पाणी",
        "method": "सच्छिद्र किंवा ठिबक सिंचन"
      },
      "pests": [
        {
          "name": "बोंडअळी (गुलाबी/अमेरिकन)",
          "severity": "High",
          "control": "पायरेथ्रॉइड + ऑर्गेनोफॉस्फेट कॉम्बो फवारण्या"
        },
        {
          "name": "पांढरी माशी",
          "severity": "High",
          "control": "Thiamethoxam 25 WG @ 100 ग्रॅम/हे"
        },
        {
          "name": "ऍफिड",
          "severity": "Medium",
          "control": "डायमेथोएट 30 EC @ 1 L/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "पायाभूत",
          "n": "३० किलो/हेक्टर",
          "p": "६० किलो/हेक्टर",
          "k": "३० किलो/हेक्टर"
        },
        {
          "stage": "स्क्वेअरिंग (45 DAS)",
          "n": "३० किलो/हेक्टर",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "फ्लॉवरिंग (75 DAS)",
          "n": "३० किलो/हेक्टर",
          "p": "—",
          "k": "३० किलो/हेक्टर"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "सोयाबीन",
      "emoji": "🫘",
      "category": "नाडी",
      "seasonality": {
        "sowingMonths": "जून - जुलै",
        "harvestMonths": "सप्टेंबर - ऑक्टोबर",
        "duration": "९०-१०० दिवस",
        "climate": "उबदार दमट; 20-30°C"
      },
      "soil": {
        "type": "चिकणमाती ते चिकणमाती",
        "ph": "६.० - ७.५",
        "organic": "उच्च सेंद्रिय पदार्थ",
        "drainage": "चांगला निचरा"
      },
      "irrigation": {
        "frequency": "3-4 गंभीर सिंचन",
        "critical": "उगवण, शेंगा निर्मिती, बिया भरणे",
        "requirement": "30-45 सेमी पाणी",
        "method": "स्प्रिंकलर किंवा फ्युरो"
      },
      "pests": [
        {
          "name": "पॉड बोरर",
          "severity": "High",
          "control": "क्विनालफॉस 25 ईसी @ 2 एल/हे"
        },
        {
          "name": "पिवळा मोझॅक व्हायरस",
          "severity": "High",
          "control": "पांढरी माशी नियंत्रित करा; प्रतिरोधक जाती"
        },
        {
          "name": "स्टेम फ्लाय",
          "severity": "Medium",
          "control": "कार्बोसल्फान बीजप्रक्रिया"
        }
      ],
      "fertilizer": [
        {
          "stage": "बेसल (रायझोबियम इनोक्युलेशन)",
          "n": "२० किलो/हेक्टर",
          "p": "६० किलो/हेक्टर",
          "k": "४० किलो/हेक्टर"
        },
        {
          "stage": "फ्लॉवर दीक्षा",
          "n": "—",
          "p": "२० किलो/हेक्टर",
          "k": "२० किलो/हेक्टर"
        }
      ]
    }
  ],
  "pa": [
    {
      "id": "wheat",
      "name": "ਕਣਕ",
      "emoji": "🌾",
      "category": "ਅਨਾਜ",
      "seasonality": {
        "sowingMonths": "ਅਕਤੂਬਰ - ਨਵੰਬਰ",
        "harvestMonths": "ਮਾਰਚ - ਅਪ੍ਰੈਲ",
        "duration": "120-150 ਦਿਨ",
        "climate": "ਠੰਡੀਆਂ ਅਤੇ ਖੁਸ਼ਕ ਸਰਦੀਆਂ, ਹਲਕੀ ਗਰਮੀਆਂ"
      },
      "soil": {
        "type": "ਚੰਗੀ ਨਿਕਾਸ ਵਾਲੀ ਦੋਮਟ ਜਾਂ ਮਿੱਟੀ-ਦੋਮਟ",
        "ph": "6.0 - 7.5",
        "organic": "ਦਰਮਿਆਨੇ ਤੋਂ ਉੱਚ ਜੈਵਿਕ ਪਦਾਰਥ",
        "drainage": "ਚੰਗੀ ਨਿਕਾਸ ਦੀ ਲੋੜ ਹੈ"
      },
      "irrigation": {
        "frequency": "4-6 ਸਿੰਚਾਈ",
        "critical": "ਕਰਾਊਨ ਰੂਟ ਦੀ ਸ਼ੁਰੂਆਤ, ਟਿਲਰਿੰਗ, ਜੋੜਨਾ, ਅਨਾਜ ਭਰਨਾ",
        "requirement": "35-40 ਸੈਂਟੀਮੀਟਰ ਕੁੱਲ ਪਾਣੀ",
        "method": "ਹੜ੍ਹ ਜਾਂ ਤੁਪਕਾ ਸਿੰਚਾਈ"
      },
      "pests": [
        {
          "name": "ਐਫੀਡਸ",
          "severity": "High",
          "control": "ਕਲੋਰਪਾਇਰੀਫੋਸ 20 ਈਸੀ @ 1 ਲੀਟਰ/ਹੈਕਟੇਅਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ"
        },
        {
          "name": "ਸਟੈਮ ਜੰਗਾਲ",
          "severity": "Medium",
          "control": "ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25 ਈ.ਸੀ"
        },
        {
          "name": "ਭੂਰਾ ਜੰਗਾਲ",
          "severity": "Medium",
          "control": "ਮੈਨਕੋਜ਼ੇਬ 75 ਡਬਲਯੂ ਪੀ @ 2 ਕਿਲੋਗ੍ਰਾਮ/ਹੈਕਟੇਅਰ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ਬੇਸਲ (ਪੌਦੇ ਲਗਾਉਣ ਵੇਲੇ)",
          "n": "60 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "60 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "k": "40 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        },
        {
          "stage": "ਟਿਲਰਿੰਗ ਪੜਾਅ",
          "n": "40 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ਸਿਰਲੇਖ ਪੜਾਅ",
          "n": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "ਚਾਵਲ",
      "emoji": "🌾",
      "category": "ਅਨਾਜ",
      "seasonality": {
        "sowingMonths": "ਜੂਨ - ਜੁਲਾਈ (ਖਰੀਫ), ਨਵੰਬਰ-ਦਸੰਬਰ (ਹਾੜੀ)",
        "harvestMonths": "ਅਕਤੂਬਰ - ਨਵੰਬਰ / ਮਾਰਚ",
        "duration": "90-120 ਦਿਨ",
        "climate": "ਗਰਮ ਨਮੀ ਵਾਲਾ; ਭਾਰੀ ਬਾਰਿਸ਼ ਦੇ ਨਾਲ 25-35°C"
      },
      "soil": {
        "type": "ਭਾਰੀ ਮਿੱਟੀ ਜਾਂ ਸਿਲਟੀ-ਲੋਮ",
        "ph": "5.5 - 7.0",
        "organic": "ਉੱਚ ਪਾਣੀ ਦੀ ਧਾਰਨ ਜ਼ਰੂਰੀ",
        "drainage": "ਮਾੜੀ ਨਿਕਾਸੀ / ਪਾਣੀ ਭਰਿਆ"
      },
      "irrigation": {
        "frequency": "ਨਿਰੰਤਰ ਹੜ੍ਹ ਜਾਂ ਏ.ਡਬਲਯੂ.ਡੀ",
        "critical": "ਟਰਾਂਸਪਲਾਂਟ ਕਰਨਾ, ਟਿਲਰਿੰਗ, ਪੈਨੀਕਲ ਦੀ ਸ਼ੁਰੂਆਤ, ਫੁੱਲ ਆਉਣਾ",
        "requirement": "100-200 ਸੈਮੀ ਪਾਣੀ",
        "method": "ਹੜ੍ਹ / ਬਦਲਵਾਂ ਗਿੱਲਾ ਅਤੇ ਸੁਕਾਉਣਾ (AWD)"
      },
      "pests": [
        {
          "name": "ਬਰਾਊਨ ਪਲਾਂਟ ਹੌਪਰ",
          "severity": "High",
          "control": "ਇਮੀਡਾਕਲੋਪ੍ਰਿਡ 17.8 SL @ 125 ਮਿਲੀਲੀਟਰ/ਹੈਕਟੇਅਰ"
        },
        {
          "name": "ਸਟੈਮ ਬੋਰਰ",
          "severity": "High",
          "control": "ਕਾਰਟੈਪ ਹਾਈਡ੍ਰੋਕਲੋਰਾਈਡ 4G @ 18 ਕਿਲੋਗ੍ਰਾਮ/ਹੈਕਟੇਅਰ"
        },
        {
          "name": "ਧਮਾਕੇ ਦੀ ਬਿਮਾਰੀ",
          "severity": "Medium",
          "control": "ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 75 ਡਬਲਯੂ ਪੀ @ 500 ਗ੍ਰਾਮ/ਹੈਕਟੇਅਰ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ਬੇਸਲ (ਟਰਾਂਸਪਲਾਂਟਿੰਗ)",
          "n": "40 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "k": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        },
        {
          "stage": "ਸਰਗਰਮ ਟਿਲਰਿੰਗ (21 DAT)",
          "n": "40 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ਪੈਨੀਕਲ ਦੀ ਸ਼ੁਰੂਆਤ",
          "n": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "ਟਮਾਟਰ",
      "emoji": "🍅",
      "category": "ਸਬਜ਼ੀ",
      "seasonality": {
        "sowingMonths": "ਜੂਨ-ਜੁਲਾਈ / ਅਕਤੂਬਰ-ਨਵੰਬਰ",
        "harvestMonths": "ਸਤੰਬਰ-ਨਵੰਬਰ / ਜਨਵਰੀ-ਮਾਰਚ",
        "duration": "ਟ੍ਰਾਂਸਪਲਾਂਟ ਤੋਂ 70-90 ਦਿਨ",
        "climate": "21-27°C; ਦਰਮਿਆਨੀ ਬਾਰਿਸ਼"
      },
      "soil": {
        "type": "ਰੇਤਲੀ ਦੋਮਟ ਤੋਂ ਦੋਮਟ",
        "ph": "6.0 - 7.0",
        "organic": "ਜੈਵਿਕ ਪਦਾਰਥਾਂ ਨਾਲ ਭਰਪੂਰ",
        "drainage": "ਚੰਗੀ ਤਰ੍ਹਾਂ ਨਿਕਾਸ ਵਾਲੀ, ਡੂੰਘੀ ਮਿੱਟੀ"
      },
      "irrigation": {
        "frequency": "ਹਰ 5-7 ਦਿਨ",
        "critical": "ਟਰਾਂਸਪਲਾਂਟਿੰਗ, ਫੁੱਲ ਆਉਣਾ, ਫਲ ਸੈੱਟ ਕਰਨਾ",
        "requirement": "40-60 ਸੈਂਟੀਮੀਟਰ ਕੁੱਲ ਪਾਣੀ",
        "method": "ਤੁਪਕਾ ਸਿੰਚਾਈ ਨੂੰ ਤਰਜੀਹ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ"
      },
      "pests": [
        {
          "name": "ਟਮਾਟਰ ਲੀਫ ਕਰਲ ਵਾਇਰਸ",
          "severity": "High",
          "control": "ਸਫੈਦ ਫਲਾਈ ਵੈਕਟਰ ਨੂੰ ਕੰਟਰੋਲ ਕਰੋ; Imidacloprid 200 SL"
        },
        {
          "name": "ਸ਼ੁਰੂਆਤੀ ਝੁਲਸ",
          "severity": "High",
          "control": "ਕਲੋਰੋਥਾਲੋਨਿਲ 75 ਡਬਲਯੂ ਪੀ @ 2 ਕਿਲੋਗ੍ਰਾਮ/ਹੈਕਟੇਅਰ"
        },
        {
          "name": "ਫਰੂਟ ਬੋਰਰ",
          "severity": "Medium",
          "control": "ਸਪਿਨੋਸੈਡ 45 ਐਸਸੀ @ 150 ਮਿਲੀਲੀਟਰ/ਹੈਕਟੇਅਰ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ਬੇਸਲ",
          "n": "50 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "50 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "k": "50 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        },
        {
          "stage": "ਟ੍ਰਾਂਸਪਲਾਂਟ ਤੋਂ 30 ਦਿਨ ਬਾਅਦ",
          "n": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "25 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        },
        {
          "stage": "ਫਲਾਂ ਦਾ ਵਿਕਾਸ",
          "n": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "25 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        }
      ]
    },
    {
      "id": "corn",
      "name": "ਮੱਕੀ (ਮੱਕੀ)",
      "emoji": "🌽",
      "category": "ਅਨਾਜ",
      "seasonality": {
        "sowingMonths": "ਜੂਨ - ਜੁਲਾਈ (ਖਰੀਫ), ਜਨਵਰੀ-ਫਰਵਰੀ (ਹਾੜੀ)",
        "harvestMonths": "ਸਤੰਬਰ - ਅਕਤੂਬਰ / ਅਪ੍ਰੈਲ-ਮਈ",
        "duration": "90-110 ਦਿਨ",
        "climate": "ਨਿੱਘਾ ਮਾਹੌਲ; 20-30°C"
      },
      "soil": {
        "type": "ਦੋਮਟ ਜਾਂ ਰੇਤਲੀ-ਦੋਮਟ",
        "ph": "5.8 - 7.0",
        "organic": "ਉੱਚ ਜੈਵਿਕ ਪਦਾਰਥ",
        "drainage": "ਚੰਗੀ ਤਰ੍ਹਾਂ ਨਿਕਾਸ"
      },
      "irrigation": {
        "frequency": "6-8 ਸਿੰਚਾਈ",
        "critical": "ਉਗਣਾ, ਗੋਡੇ-ਉੱਚਾ, ਟੈਸਲਿੰਗ, ਅਨਾਜ ਭਰਨਾ",
        "requirement": "50-70 ਸੈਮੀ ਪਾਣੀ",
        "method": "ਫਰੋ ਜਾਂ ਤੁਪਕਾ"
      },
      "pests": [
        {
          "name": "ਫਾਲ ਆਰਮੀਵਰਮ",
          "severity": "High",
          "control": "ਸਪਾਇਨੇਟੋਰਮ 11.7 ਐਸ.ਸੀ @ 500 ਮਿਲੀਲੀਟਰ/ਹੈਕਟੇਅਰ"
        },
        {
          "name": "ਸਟੈਮ ਬੋਰਰ",
          "severity": "High",
          "control": "ਕਾਰਬੋਫੁਰਨ 3ਜੀ @ 20 ਕਿਲੋਗ੍ਰਾਮ/ਹੈਕਟੇਅਰ"
        },
        {
          "name": "ਮੱਕੀ ਸਟ੍ਰੀਕ ਵਾਇਰਸ",
          "severity": "Medium",
          "control": "ਲੀਫਹੌਪਰ ਨੂੰ ਕੰਟਰੋਲ ਕਰੋ; ਰੋਧਕ ਕਿਸਮਾਂ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ਬੇਸਲ",
          "n": "60 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "60 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "k": "40 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        },
        {
          "stage": "ਗੋਡੇ-ਉੱਚਾ ਪੜਾਅ (V6)",
          "n": "60 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ਟੈਸਲਿੰਗ (V12)",
          "n": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "ਕਪਾਹ",
      "emoji": "🌿",
      "category": "ਨਕਦੀ ਫਸਲ",
      "seasonality": {
        "sowingMonths": "ਅਪ੍ਰੈਲ - ਜੂਨ",
        "harvestMonths": "ਅਕਤੂਬਰ - ਜਨਵਰੀ",
        "duration": "150-180 ਦਿਨ",
        "climate": "ਗਰਮ ਅਤੇ ਅਰਧ-ਸੁੱਕਾ; 25-35°C"
      },
      "soil": {
        "type": "ਕਾਲੀ ਕਪਾਹ ਦੀ ਮਿੱਟੀ ਜਾਂ ਦੋਮਟ",
        "ph": "7.0 - 8.0",
        "organic": "ਦਰਮਿਆਨੀ ਜੈਵਿਕ ਸਮੱਗਰੀ",
        "drainage": "ਡੂੰਘੀ, ਚੰਗੀ ਨਿਕਾਸ ਵਾਲੀ"
      },
      "irrigation": {
        "frequency": "8-10 ਸਿੰਚਾਈ",
        "critical": "ਉਗਣਾ, ਵਰਗ ਬਣਾਉਣਾ, ਫੁੱਲ ਆਉਣਾ, ਬੋਲ ਬਣਨਾ",
        "requirement": "60-90 ਸੈਮੀ ਪਾਣੀ",
        "method": "ਫਰੋ ਜਾਂ ਤੁਪਕਾ ਸਿੰਚਾਈ"
      },
      "pests": [
        {
          "name": "ਬੋਲਵਰਮ (ਗੁਲਾਬੀ/ਅਮਰੀਕੀ)",
          "severity": "High",
          "control": "Pyrethroid + organophosphate ਕੰਬੋ ਸਪਰੇਅ"
        },
        {
          "name": "ਸਫੈਦ ਮੱਖੀ",
          "severity": "High",
          "control": "ਥਿਆਮੇਥੋਕਸਮ 25 ਡਬਲਯੂ ਜੀ @ 100 ਗ੍ਰਾਮ/ਹੈਕਟੇਅਰ"
        },
        {
          "name": "ਐਫੀਡ",
          "severity": "Medium",
          "control": "ਡਾਇਮੇਥੋਏਟ 30 ਈਸੀ @ 1 ਲੀਟਰ/ਹੈਕਟੇਅਰ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ਬੇਸਲ",
          "n": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "60 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "k": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        },
        {
          "stage": "ਸਕੁਏਅਰਿੰਗ (45 DAS)",
          "n": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ਫੁੱਲ ਆਉਣਾ (75 DAS)",
          "n": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "—",
          "k": "30 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "ਸੋਇਆਬੀਨ",
      "emoji": "🫘",
      "category": "ਨਾੜੀ",
      "seasonality": {
        "sowingMonths": "ਜੂਨ - ਜੁਲਾਈ",
        "harvestMonths": "ਸਤੰਬਰ - ਅਕਤੂਬਰ",
        "duration": "90-100 ਦਿਨ",
        "climate": "ਗਰਮ ਨਮੀ ਵਾਲਾ; 20-30°C"
      },
      "soil": {
        "type": "ਮਿੱਟੀ-ਦੋਮਟ ਤੱਕ ਦੋਮਟ",
        "ph": "6.0 - 7.5",
        "organic": "ਉੱਚ ਜੈਵਿਕ ਪਦਾਰਥ",
        "drainage": "ਚੰਗੀ ਤਰ੍ਹਾਂ ਨਿਕਾਸ"
      },
      "irrigation": {
        "frequency": "3-4 ਨਾਜ਼ੁਕ ਸਿੰਚਾਈ",
        "critical": "ਉਗਣ, ਪੌਡ ਬਣਨਾ, ਬੀਜ ਭਰਨਾ",
        "requirement": "30-45 ਸੈਮੀ ਪਾਣੀ",
        "method": "ਸਪ੍ਰਿੰਕਲਰ ਜਾਂ ਫੁਰਰੋ"
      },
      "pests": [
        {
          "name": "ਪੋਡ ਬੋਰਰ",
          "severity": "High",
          "control": "ਕੁਇਨਲਫੋਸ 25 ਈਸੀ @ 2 ਲੀਟਰ/ਹੈਕਟੇਅਰ"
        },
        {
          "name": "ਯੈਲੋ ਮੋਜ਼ੇਕ ਵਾਇਰਸ",
          "severity": "High",
          "control": "ਚਿੱਟੀ ਮੱਖੀ ਨੂੰ ਕੰਟਰੋਲ ਕਰੋ; ਰੋਧਕ ਕਿਸਮਾਂ"
        },
        {
          "name": "ਸਟੈਮ ਫਲਾਈ",
          "severity": "Medium",
          "control": "ਕਾਰਬੋਸਲਫਾਨ ਬੀਜ ਦਾ ਇਲਾਜ"
        }
      ],
      "fertilizer": [
        {
          "stage": "ਬੇਸਲ (ਰਾਇਜ਼ੋਬੀਅਮ ਟੀਕਾਕਰਨ)",
          "n": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "p": "60 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "k": "40 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        },
        {
          "stage": "ਫੁੱਲ ਦੀ ਸ਼ੁਰੂਆਤ",
          "n": "—",
          "p": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ",
          "k": "20 ਕਿਲੋ/ਹੈਕਟੇਅਰ"
        }
      ]
    }
  ],
  "gu": [
    {
      "id": "wheat",
      "name": "ઘઉં",
      "emoji": "🌾",
      "category": "અનાજ",
      "seasonality": {
        "sowingMonths": "ઓક્ટોબર - નવેમ્બર",
        "harvestMonths": "માર્ચ - એપ્રિલ",
        "duration": "120-150 દિવસ",
        "climate": "ઠંડા અને શુષ્ક શિયાળો, હળવો ઉનાળો"
      },
      "soil": {
        "type": "સારી રીતે નિકાલવાળી લોમી અથવા માટી-લોમ",
        "ph": "6.0 - 7.5",
        "organic": "મધ્યમથી ઉચ્ચ કાર્બનિક પદાર્થો",
        "drainage": "સારી ડ્રેનેજ જરૂરી છે"
      },
      "irrigation": {
        "frequency": "4-6 સિંચાઈ",
        "critical": "તાજ મૂળની શરૂઆત, ટીલરિંગ, જોઇન્ટિંગ, અનાજ ભરવા",
        "requirement": "35-40 સેમી કુલ પાણી",
        "method": "પૂર અથવા ટપક સિંચાઈ"
      },
      "pests": [
        {
          "name": "એફિડ્સ",
          "severity": "High",
          "control": "ક્લોરપાયરિફોસ 20 ઇસી @ 1 એલ/હેક્ટરનો છંટકાવ કરો"
        },
        {
          "name": "સ્ટેમ રસ્ટ",
          "severity": "Medium",
          "control": "Propiconazole 25 EC લાગુ કરો"
        },
        {
          "name": "બ્રાઉન રસ્ટ",
          "severity": "Medium",
          "control": "મેન્કોઝેબ 75 ડબલ્યુપી @ 2 કિગ્રા/હે"
        }
      ],
      "fertilizer": [
        {
          "stage": "બેઝલ (વાવેતર સમયે)",
          "n": "60 કિગ્રા/હે",
          "p": "60 કિગ્રા/હે",
          "k": "40 કિગ્રા/હે"
        },
        {
          "stage": "ટીલરિંગ સ્ટેજ",
          "n": "40 કિગ્રા/હે",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "મથાળાનો તબક્કો",
          "n": "20 કિગ્રા/હે",
          "p": "—",
          "k": "—"
        }
      ]
    },
    {
      "id": "rice",
      "name": "ચોખા",
      "emoji": "🌾",
      "category": "અનાજ",
      "seasonality": {
        "sowingMonths": "જૂન - જુલાઈ (ખરીફ), નવે-ડિસે (રવી)",
        "harvestMonths": "ઓક્ટોબર - નવેમ્બર / માર્ચ",
        "duration": "90-120 દિવસ",
        "climate": "ગરમ ભેજવાળી; ભારે વરસાદ સાથે 25-35°C"
      },
      "soil": {
        "type": "ભારે માટી અથવા સિલ્ટી-લોમ",
        "ph": "5.5 - 7.0",
        "organic": "ઉચ્ચ પાણીની જાળવણી આવશ્યક છે",
        "drainage": "નબળી ડ્રેનેજ / પાણી ભરાઈ ગયેલું"
      },
      "irrigation": {
        "frequency": "સતત પૂર અથવા AWD",
        "critical": "ટ્રાન્સપ્લાન્ટિંગ, ટિલરિંગ, ગભરાટની શરૂઆત, ફૂલો",
        "requirement": "100-200 સેમી પાણી",
        "method": "પૂર / વૈકલ્પિક ભીનાશ અને સૂકવણી (AWD)"
      },
      "pests": [
        {
          "name": "બ્રાઉન પ્લાન્ટ હોપર",
          "severity": "High",
          "control": "ઇમિડાક્લોપ્રિડ 17.8 SL @ 125 મિલી/હે"
        },
        {
          "name": "સ્ટેમ બોરર",
          "severity": "High",
          "control": "કાર્ટેપ હાઇડ્રોક્લોરાઇડ 4G @ 18 કિગ્રા/હેક્ટર"
        },
        {
          "name": "બ્લાસ્ટ રોગ",
          "severity": "Medium",
          "control": "Tricyclazole 75 WP @ 500 g/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "બેસલ (ટ્રાન્સપ્લાન્ટિંગ)",
          "n": "40 કિગ્રા/હે",
          "p": "30 કિગ્રા/હે",
          "k": "30 કિગ્રા/હે"
        },
        {
          "stage": "સક્રિય ટિલરિંગ (21 DAT)",
          "n": "40 કિગ્રા/હે",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ગભરાટની શરૂઆત",
          "n": "20 કિગ્રા/હે",
          "p": "—",
          "k": "20 કિગ્રા/હે"
        }
      ]
    },
    {
      "id": "tomato",
      "name": "ટામેટા",
      "emoji": "🍅",
      "category": "શાકભાજી",
      "seasonality": {
        "sowingMonths": "જૂન-જુલાઈ / ઓક્ટોબર-નવેમ્બર",
        "harvestMonths": "સપ્ટેમ્બર-નવેમ્બર / જાન્યુઆરી-માર્ચ",
        "duration": "ટ્રાન્સપ્લાન્ટથી 70-90 દિવસ",
        "climate": "21-27°C; મધ્યમ વરસાદ"
      },
      "soil": {
        "type": "રેતાળ લોમ થી લોમી",
        "ph": "6.0 - 7.0",
        "organic": "કાર્બનિક પદાર્થોથી સમૃદ્ધ",
        "drainage": "સારી રીતે નિકાલવાળી, ઊંડી માટી"
      },
      "irrigation": {
        "frequency": "દર 5-7 દિવસ",
        "critical": "ટ્રાન્સપ્લાન્ટિંગ, ફ્લાવરિંગ, ફ્રુટ સેટ",
        "requirement": "40-60 સેમી કુલ પાણી",
        "method": "ટપક સિંચાઈને પ્રાધાન્ય આપવામાં આવે છે"
      },
      "pests": [
        {
          "name": "ટોમેટો લીફ કર્લ વાયરસ",
          "severity": "High",
          "control": "વ્હાઇટફ્લાય વેક્ટરને નિયંત્રિત કરો; ઇમિડાક્લોપ્રિડ 200 SL"
        },
        {
          "name": "પ્રારંભિક બ્લાઇટ",
          "severity": "High",
          "control": "ક્લોરોથલોનિલ 75 ડબલ્યુપી @ 2 કિગ્રા/હે"
        },
        {
          "name": "ફ્રુટ બોરર",
          "severity": "Medium",
          "control": "Spinosad 45 SC @ 150 ml/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "બેઝલ",
          "n": "50 કિગ્રા/હે",
          "p": "50 કિગ્રા/હે",
          "k": "50 કિગ્રા/હે"
        },
        {
          "stage": "ટ્રાન્સપ્લાન્ટ કર્યાના 30 દિવસ પછી",
          "n": "30 કિગ્રા/હે",
          "p": "—",
          "k": "25 કિગ્રા/હે"
        },
        {
          "stage": "ફળનો વિકાસ",
          "n": "20 કિગ્રા/હે",
          "p": "—",
          "k": "25 કિગ્રા/હે"
        }
      ]
    },
    {
      "id": "corn",
      "name": "મકાઈ (મકાઈ)",
      "emoji": "🌽",
      "category": "અનાજ",
      "seasonality": {
        "sowingMonths": "જૂન - જુલાઈ (ખરીફ), જાન્યુઆરી-ફેબ્રુઆરી (રવી)",
        "harvestMonths": "સપ્ટેમ્બર - ઓક્ટોબર / એપ્રિલ-મે",
        "duration": "90-110 દિવસ",
        "climate": "ગરમ વાતાવરણ; 20-30°C"
      },
      "soil": {
        "type": "લોમ અથવા રેતાળ-લોમ",
        "ph": "5.8 - 7.0",
        "organic": "ઉચ્ચ કાર્બનિક પદાર્થો",
        "drainage": "સારી રીતે ડ્રેઇન કરેલું"
      },
      "irrigation": {
        "frequency": "6-8 સિંચાઈ",
        "critical": "અંકુરણ, ઘૂંટણ-ઉચ્ચ, ટેસેલિંગ, અનાજ ભરવા",
        "requirement": "50-70 સેમી પાણી",
        "method": "ફ્યુરો અથવા ડ્રોપ"
      },
      "pests": [
        {
          "name": "ફોલ આર્મીવોર્મ",
          "severity": "High",
          "control": "સ્પાઇનેટોરમ 11.7 SC @ 500 મિલી/હે"
        },
        {
          "name": "સ્ટેમ બોરર",
          "severity": "High",
          "control": "કાર્બોફ્યુરાન 3G @ 20 કિગ્રા/હેક્ટર"
        },
        {
          "name": "મેઇઝ સ્ટ્રીક વાયરસ",
          "severity": "Medium",
          "control": "લીફહોપરને નિયંત્રિત કરો; પ્રતિકારક જાતો"
        }
      ],
      "fertilizer": [
        {
          "stage": "બેઝલ",
          "n": "60 કિગ્રા/હે",
          "p": "60 કિગ્રા/હે",
          "k": "40 કિગ્રા/હે"
        },
        {
          "stage": "ઘૂંટણની ઊંચી અવસ્થા (V6)",
          "n": "60 કિગ્રા/હે",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ટેસેલિંગ (V12)",
          "n": "30 કિગ્રા/હે",
          "p": "—",
          "k": "20 કિગ્રા/હે"
        }
      ]
    },
    {
      "id": "cotton",
      "name": "કપાસ",
      "emoji": "🌿",
      "category": "રોકડિયા પાક",
      "seasonality": {
        "sowingMonths": "એપ્રિલ - જૂન",
        "harvestMonths": "ઓક્ટોબર - જાન્યુઆરી",
        "duration": "150-180 દિવસ",
        "climate": "ગરમ અને અર્ધ શુષ્ક; 25-35°C"
      },
      "soil": {
        "type": "કાળી કપાસની માટી અથવા લોમી",
        "ph": "7.0 - 8.0",
        "organic": "મધ્યમ ઓર્ગેનિક સામગ્રી",
        "drainage": "ડીપ, સારી રીતે પાણી ભરાયેલું"
      },
      "irrigation": {
        "frequency": "8-10 સિંચાઈ",
        "critical": "અંકુરણ, સ્ક્વેરિંગ, ફ્લાવરિંગ, બોલ રચના",
        "requirement": "60-90 સેમી પાણી",
        "method": "ફ્યુરો અથવા ટપક સિંચાઈ"
      },
      "pests": [
        {
          "name": "બોલવોર્મ (ગુલાબી/અમેરિકન)",
          "severity": "High",
          "control": "પાયરેથ્રોઇડ + ઓર્ગેનોફોસ્ફેટ કોમ્બો સ્પ્રે"
        },
        {
          "name": "વ્હાઇટફ્લાય",
          "severity": "High",
          "control": "થિયામેથોક્સમ 25 WG @ 100 ગ્રામ/હેક્ટર"
        },
        {
          "name": "એફિડ",
          "severity": "Medium",
          "control": "ડાયમેથોએટ 30 EC @ 1 L/ha"
        }
      ],
      "fertilizer": [
        {
          "stage": "બેઝલ",
          "n": "30 કિગ્રા/હે",
          "p": "60 કિગ્રા/હે",
          "k": "30 કિગ્રા/હે"
        },
        {
          "stage": "સ્ક્વેરિંગ (45 DAS)",
          "n": "30 કિગ્રા/હે",
          "p": "—",
          "k": "—"
        },
        {
          "stage": "ફ્લાવરિંગ (75 DAS)",
          "n": "30 કિગ્રા/હે",
          "p": "—",
          "k": "30 કિગ્રા/હે"
        }
      ]
    },
    {
      "id": "soybean",
      "name": "સોયાબીન",
      "emoji": "🫘",
      "category": "નાડી",
      "seasonality": {
        "sowingMonths": "જૂન - જુલાઈ",
        "harvestMonths": "સપ્ટેમ્બર - ઓક્ટોબર",
        "duration": "90-100 દિવસ",
        "climate": "ગરમ ભેજવાળી; 20-30°C"
      },
      "soil": {
        "type": "લોમથી માટી-લોમ",
        "ph": "6.0 - 7.5",
        "organic": "ઉચ્ચ કાર્બનિક પદાર્થો",
        "drainage": "સારી રીતે ડ્રેઇન કરેલું"
      },
      "irrigation": {
        "frequency": "3-4 જટિલ સિંચાઈ",
        "critical": "અંકુરણ, પોડ રચના, બીજ ભરવા",
        "requirement": "30-45 સેમી પાણી",
        "method": "સ્પ્રિંકલર અથવા ફ્યુરો"
      },
      "pests": [
        {
          "name": "પોડ બોરર",
          "severity": "High",
          "control": "ક્વિનાલફોસ 25 ઇસી @ 2 એલ/હેક્ટર"
        },
        {
          "name": "યલો મોઝેક વાયરસ",
          "severity": "High",
          "control": "વ્હાઇટફ્લાયને નિયંત્રિત કરો; પ્રતિકારક જાતો"
        },
        {
          "name": "સ્ટેમ ફ્લાય",
          "severity": "Medium",
          "control": "કાર્બોસલ્ફાન બીજ પ્રક્રિયા"
        }
      ],
      "fertilizer": [
        {
          "stage": "બેઝલ (રાઇઝોબિયમ રસીકરણ)",
          "n": "20 કિગ્રા/હે",
          "p": "60 કિગ્રા/હે",
          "k": "40 કિગ્રા/હે"
        },
        {
          "stage": "ફ્લાવર દીક્ષા",
          "n": "—",
          "p": "20 કિગ્રા/હે",
          "k": "20 કિગ્રા/હે"
        }
      ]
    }
  ]
};