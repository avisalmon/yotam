// ===== TRANSLATION COMPARISON SYSTEM =====

class TranslationSystem {
    constructor() {
        this.currentVerse = '9:8';
        this.selectedTranslations = ['hebrew-masoretic', 'hebrew-modern'];
        this.currentView = 'parallel';
        this.showVowels = true;
        this.showCantillation = false;
        this.highlightDifferences = true;
        this.analysisPanel = null;
        
        this.translations = {};
        this.analysisData = {};
        
        this.init();
    }
    
    init() {
        this.loadTranslationData();
        this.setupEventListeners();
        this.loadCurrentVerse();
        this.setupAnalysisPanel();
    }
    
    // Load translation data
    loadTranslationData() {
        this.translations = {
            'hebrew-masoretic': {
                name: 'עברית מסורתית',
                language: 'hebrew',
                direction: 'rtl',
                font: 'var(--font-heading)',
                verses: {
                    '9:7': 'וַיַּגִּ֣דוּ לְיוֹתָ֗ם וַיֵּ֙לֶךְ֙ וַֽיַּעֲמֹד֙ בְּרֹ֣אשׁ הַר־גְּרִזִ֔ים וַיִּשָּׂ֥א קוֹל֖וֹ וַיִּקְרָ֑א וַיֹּ֣אמֶר לָהֶ֗ם שִׁמְע֤וּ אֵלַי֙ בַּעֲלֵ֣י שְׁכֶ֔ם וְיִשְׁמַ֥ע אֲלֵיכֶ֖ם אֱלֹהִֽים׃',
                    '9:8': 'הָל֤וֹךְ הָֽלְכוּ֙ הָעֵצִ֔ים לִמְשֹׁ֥חַ עֲלֵיהֶ֖ם מֶ֑לֶךְ וַיֹּאמְר֣וּ לַזַּ֔יִת מלוכה [מָלְכָ֖ה] עָלֵֽינוּ׃',
                    '9:9': 'וַיֹּ֤אמֶר לָהֶם֙ הַזַּ֔יִת הֶחֳדַ֙לְתִּי֙ אֶת־דִּשְׁנִ֔י אֲשֶׁר־בִּ֛י יְכַבְּד֥וּ אֱלֹהִ֖ים וַאֲנָשִׁ֑ים וְהָ֣לַכְתִּ֔י לָנ֖וּעַ עַל־הָעֵצִֽים׃',
                    '9:10': 'וַיֹּאמְר֥וּ הָעֵצִ֖ים לַתְּאֵנָ֑ה לְכִי־אַ֖תְּ מלְכי [מָלְכִ֥י] עָלֵֽינוּ׃',
                    '9:11': 'וַתֹּ֤אמֶר לָהֶם֙ הַתְּאֵנָ֔ה הֶחֳדַ֙לְתִּי֙ אֶת־מְתָקִ֔י וְאֶת־תְּנוּבָתִ֖י הַטּוֹבָ֑ה וְהָ֣לַכְתִּ֔י לָנ֖וּעַ עַל־הָעֵצִֽים׃',
                    '9:12': 'וַיֹּאמְר֥וּ הָעֵצִ֖ים לַגָּ֑פֶן לְכִי־אַ֖תְּ מלכי [מָלְכִ֥י] עָלֵֽינוּ׃',
                    '9:13': 'וַתֹּ֤אמֶר לָהֶם֙ הַגֶּ֔פֶן הֶחֳדַ֙לְתִּי֙ אֶת־תִּירוֹשִׁ֔י הַֽמְשַׂמֵּ֥חַ אֱלֹהִ֖ים וַאֲנָשִׁ֑ים וְהָ֣לַכְתִּ֔י לָנ֖וּעַ עַל־הָעֵצִֽים׃',
                    '9:14': 'וַיֹּאמְר֥וּ כָל־הָעֵצִ֖ים אֶל־הָאָטָ֑ד לֵ֥ךְ אַתָּ֖ה מְלָךְ־עָלֵֽינוּ׃',
                    '9:15': 'וַיֹּ֣אמֶר הָאָטָד֮ אֶל־הָעֵצִים֒ אִ֡ם בֶּאֱמֶת֩ אַתֶּ֨ם מֹשְׁחִ֤ים אֹתִי֙ לְמֶ֣לֶךְ עֲלֵיכֶ֔ם בֹּ֖אוּ חֲס֣וּ בְצִלִּ֑י וְאִם־אַ֕יִן תֵּצֵ֤א אֵשׁ֙ מִן־הָ֣אָטָ֔ד וְתֹאכַ֖ל אֶת־אַרְזֵ֥י הַלְּבָנֽוֹן׃'
                }
            },
            'hebrew-modern': {
                name: 'עברית מודרנית',
                language: 'hebrew',
                direction: 'rtl',
                font: 'var(--font-primary)',
                verses: {
                    '9:7': 'והגידו ליותם, והלך ועמד בראש הר גריזים, ונשא קולו וקרא, ואמר להם: שמעו אלי, בעלי שכם, וישמע אליכם אלוהים.',
                    '9:8': 'הלוך הלכו העצים למשוח עליהם מלך, ואמרו לזית: מלוך עלינו.',
                    '9:9': 'ואמר להם הזית: החדלתי את דשני, אשר בי יכבדו אלוהים ואנשים, והלכתי לנוע על העצים?',
                    '9:10': 'ואמרו העצים לתאנה: לכי את, מלכי עלינו.',
                    '9:11': 'ותאמר להם התאנה: החדלתי את מתקי ואת תנובתי הטובה, והלכתי לנוע על העצים?',
                    '9:12': 'ואמרו העצים לגפן: לכי את, מלכי עלינו.',
                    '9:13': 'ותאמר להם הגפן: החדלתי את תירושי המשמח אלוהים ואנשים, והלכתי לנוע על העצים?',
                    '9:14': 'ואמרו כל העצים אל האטד: לך אתה, מלך עלינו.',
                    '9:15': 'ויאמר האטד אל העצים: אם באמת אתם משחים אותי למלך עליכם, בואו חסו בצלי; ואם אין, תצא אש מן האטד ותאכל את ארזי הלבנון.'
                }
            },
            'english-kjv': {
                name: 'King James Version',
                language: 'english',
                direction: 'ltr',
                font: '"Crimson Text", serif',
                verses: {
                    '9:7': 'And when they told it to Jotham, he went and stood in the top of mount Gerizim, and lifted up his voice, and cried, and said unto them, Hearken unto me, ye men of Shechem, that God may hearken unto you.',
                    '9:8': 'The trees went forth on a time to anoint a king over them; and they said unto the olive tree, Reign thou over us.',
                    '9:9': 'But the olive tree said unto them, Should I leave my fatness, wherewith by me they honour God and man, and go to be promoted over the trees?',
                    '9:10': 'And the trees said to the fig tree, Come thou, and reign over us.',
                    '9:11': 'But the fig tree said unto them, Should I forsake my sweetness, and my good fruit, and go to be promoted over the trees?',
                    '9:12': 'Then said the trees unto the vine, Come thou, and reign over us.',
                    '9:13': 'And the vine said unto them, Should I leave my wine, which cheereth God and man, and go to be promoted over the trees?',
                    '9:14': 'Then said all the trees unto the bramble, Come thou, and reign over us.',
                    '9:15': 'And the bramble said unto the trees, If in truth ye anoint me king over you, then come and put your trust in my shadow: and if not, let fire come out of the bramble, and devour the cedars of Lebanon.'
                }
            },
            'english-niv': {
                name: 'New International Version',
                language: 'english',
                direction: 'ltr',
                font: '"Crimson Text", serif',
                verses: {
                    '9:7': 'When Jotham was told about this, he climbed up on the top of Mount Gerizim and shouted to them, "Listen to me, citizens of Shechem, so that God may listen to you.',
                    '9:8': 'One day the trees went out to anoint a king for themselves. They said to the olive tree, \'Be our king.\'',
                    '9:9': 'But the olive tree answered, \'Should I give up my oil, by which both gods and humans are honored, to hold sway over the trees?\'',
                    '9:10': 'Next, the trees said to the fig tree, \'Come and be our king.\'',
                    '9:11': 'But the fig tree replied, \'Should I give up my fruit, so good and sweet, to hold sway over the trees?\'',
                    '9:12': 'Then the trees said to the vine, \'Come and be our king.\'',
                    '9:13': 'But the vine answered, \'Should I give up my wine, which cheers both gods and humans, to hold sway over the trees?\'',
                    '9:14': 'Finally all the trees said to the thornbush, \'Come and be our king.\'',
                    '9:15': 'The thornbush said to the trees, \'If you really want to anoint me king over you, come and take refuge in my shade; but if not, then let fire come out of the thornbush and consume the cedars of Lebanon!\''
                }
            },
            'aramaic-targum': {
                name: 'תרגום אונקלוס',
                language: 'aramaic',
                direction: 'rtl',
                font: '"Noto Sans", serif',
                verses: {
                    '9:8': 'מהלכין הלכו אילניא למשח עלוהון מלכא ואמרו לזיתא מלוך עלנא',
                    '9:9': 'ואמר להון זיתא הדא שבקית ית תרבותי די בי מיקרין קדם יי ואנשא ואזיל לאתנענעא על אילניא',
                    '9:10': 'ואמרו אילניא לתתא תעי את מלכי עלנא',
                    '9:11': 'ואמרת להון תתא הדא שבקית ית חלותי ואת עיבדי טבא ואזיל לאתנענעא על אילניא',
                    '9:12': 'ואמרו אילניא לגופנא תעי את מלכי עלנא',
                    '9:13': 'ואמרת להון גופנא הדא שבקית ית חמרי דמחדי קדם יי ואנשא ואזיל לאתנענעא על אילניא'
                }
            },
            'arabic-saadia': {
                name: 'תרגום סעדיה גאון',
                language: 'arabic',
                direction: 'rtl',
                font: '"Noto Sans", Arial',
                verses: {
                    '9:8': 'ذهبت الأشجار لتمسح عليها ملكًا، فقالت للزيتونة: املكي علينا',
                    '9:9': 'فقالت لها الزيتونة: أأترك دهني الذي به يكرم الله والناس، وأذهب لأترنح على الأشجار؟',
                    '9:10': 'فقالت الأشجار للتينة: تعالي أنت املكي علينا',
                    '9:11': 'فقالت لها التينة: أأترك حلاوتي وثمري الطيب، وأذهب لأترنح على الأشجار؟',
                    '9:12': 'فقالت الأشجار للكرمة: تعالي أنت املكي علينا',
                    '9:13': 'فقالت لها الكرمة: أأترك خمري الذي يفرح الله والناس، وأذهب لأترنح على الأشجار؟'
                }
            },
            'greek-lxx': {
                name: 'Septuagint',
                language: 'greek',
                direction: 'ltr',
                font: '"Noto Sans", serif',
                verses: {
                    '9:8': 'πορευόμενα ἐπορεύθησαν τὰ ξύλα τοῦ χρῖσαι ἐφ᾽ ἑαυτὰ βασιλέα καὶ εἶπαν τῇ ἐλαίᾳ βασίλευσον ἐφ᾽ ἡμῶν',
                    '9:9': 'καὶ εἶπεν αὐτοῖς ἡ ἐλαία μὴ ἀφεῖσα τὴν πιότητά μου ἣ ἐν ἐμοὶ δοξάζουσι τὸν θεὸν καὶ ἀνθρώπους πορεύομαι κινεῖσθαι ἐπὶ τῶν ξύλων',
                    '9:10': 'καὶ εἶπαν τὰ ξύλα τῇ συκῇ δεῦρο βασίλευσον ἐφ᾽ ἡμῶν',
                    '9:11': 'καὶ εἶπεν αὐτοῖς ἡ συκῆ μὴ ἀφεῖσα τὴν γλυκύτητά μου καὶ τὰ γενήματά μου τὰ ἀγαθὰ πορεύομαι κινεῖσθαι ἐπὶ τῶν ξύλων',
                    '9:12': 'καὶ εἶπαν τὰ ξύλα πρὸς τὴν ἄμπελον δεῦρο βασίλευσον ἐφ᾽ ἡμῶν',
                    '9:13': 'καὶ εἶπεν αὐτοῖς ἡ ἄμπελος μὴ ἀφεῖσα τὸν οἶνόν μου τὸν εὐφραίνοντα θεὸν καὶ ἀνθρώπους πορεύομαι κινεῖσθαι ἐπὶ τῶν ξύλων'
                }
            },
            'latin-vulgate': {
                name: 'Vulgate',
                language: 'latin',
                direction: 'ltr',
                font: '"Crimson Text", serif',
                verses: {
                    '9:8': 'ierunt ligna ut unguerent super se regem dixeruntque olivae impera nobis',
                    '9:9': 'quae respondit numquid possum deserere pinguedinem meam qua et dii utuntur et homines et venire ut inter ligna promovear',
                    '9:10': 'dixeruntque ligna ad ficum veni et super nos regna',
                    '9:11': 'quae respondit eis numquid possum deserere dulcedinem meam fructusque suavissimos et ire ut inter cetera ligna promovear',
                    '9:12': 'locuta sunt quoque ligna ad vitem veni et impera nobis',
                    '9:13': 'quae respondit eis numquid possum deserere vinum meum quod laetificat Deum et homines et inter ligna cetera promoveri'
                }
            }
        };
        
        this.analysisData = {
            '9:8': {
                keywords: ['הלוך הלכו', 'העצים', 'למשוח', 'מלך', 'זית'],
                themes: ['מנהיגות', 'בחירה דמוקרטית', 'אחריות'],
                difficulties: [
                    {
                        word: 'הלוך הלכו',
                        explanation: 'צורת הפעל המדגישה את החזרה וההתמדה בפעולה',
                        translations: {
                            'english-kjv': 'went forth',
                            'english-niv': 'went out',
                            'greek-lxx': 'πορευόμενα ἐπορεύθησαν'
                        }
                    },
                    {
                        word: 'למשוח',
                        explanation: 'לבחור ולהכתיר - פעולה רשמית של מינוי מלך',
                        translations: {
                            'english-kjv': 'to anoint',
                            'english-niv': 'to anoint',
                            'greek-lxx': 'τοῦ χρῖσαι'
                        }
                    }
                ]
            },
            '9:9': {
                keywords: ['החדלתי', 'דשני', 'יכבדו', 'לנוע'],
                themes: ['הקרבה אישית', 'תועלת ציבורית', 'דילמה מוסרית'],
                difficulties: [
                    {
                        word: 'דשני',
                        explanation: 'השמן שלי - מטאפורה לתרומה החיובית',
                        translations: {
                            'english-kjv': 'my fatness',
                            'english-niv': 'my oil',
                            'aramaic-targum': 'תרבותי'
                        }
                    }
                ]
            }
        };
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Language selection checkboxes
        document.querySelectorAll('.language-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.updateSelectedTranslations();
                this.renderComparison();
            });
        });
        
        // View mode buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentView = btn.dataset.view;
                this.renderComparison();
            });
        });
        
        // Text options
        document.getElementById('show-vowels')?.addEventListener('change', (e) => {
            this.showVowels = e.target.checked;
            this.renderComparison();
        });
        
        document.getElementById('show-cantillation')?.addEventListener('change', (e) => {
            this.showCantillation = e.target.checked;
            this.renderComparison();
        });
        
        document.getElementById('highlight-differences')?.addEventListener('change', (e) => {
            this.highlightDifferences = e.target.checked;
            this.renderComparison();
        });
        
        // Verse navigation
        document.getElementById('prevVerse')?.addEventListener('click', () => {
            this.navigateVerse(-1);
        });
        
        document.getElementById('nextVerse')?.addEventListener('click', () => {
            this.navigateVerse(1);
        });
        
        document.getElementById('verseSelect')?.addEventListener('change', (e) => {
            this.currentVerse = e.target.value;
            this.loadCurrentVerse();
        });
        
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            });
        });
    }
    
    // Update selected translations array
    updateSelectedTranslations() {
        this.selectedTranslations = [];
        document.querySelectorAll('.language-option input[type="checkbox"]:checked').forEach(checkbox => {
            this.selectedTranslations.push(checkbox.value);
        });
    }
    
    // Navigate between verses
    navigateVerse(direction) {
        const verses = ['9:7', '9:8', '9:9', '9:10', '9:11', '9:12', '9:13', '9:14', '9:15', '9:16', '9:17', '9:18', '9:19', '9:20', '9:21'];
        const currentIndex = verses.indexOf(this.currentVerse);
        const newIndex = currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < verses.length) {
            this.currentVerse = verses[newIndex];
            this.loadCurrentVerse();
        }
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }
    
    // Update navigation button states
    updateNavigationButtons() {
        const verses = ['9:7', '9:8', '9:9', '9:10', '9:11', '9:12', '9:13', '9:14', '9:15', '9:16', '9:17', '9:18', '9:19', '9:20', '9:21'];
        const currentIndex = verses.indexOf(this.currentVerse);
        
        const prevBtn = document.getElementById('prevVerse');
        const nextBtn = document.getElementById('nextVerse');
        
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === verses.length - 1;
    }
    
    // Load current verse
    loadCurrentVerse() {
        document.getElementById('currentVerse').textContent = `שופטים ${this.currentVerse.replace(':', ', ')}`;
        document.getElementById('verseSelect').value = this.currentVerse;
        this.renderComparison();
        this.loadAnalysis();
        this.updateNavigationButtons();
    }
    
    // Render comparison based on current view
    renderComparison() {
        const container = document.getElementById('comparisonContainer');
        if (!container) return;
        
        container.className = `comparison-container comparison-${this.currentView}`;
        
        switch (this.currentView) {
            case 'parallel':
                this.renderParallelView(container);
                break;
            case 'interlinear':
                this.renderInterlinearView(container);
                break;
            case 'verse-by-verse':
                this.renderVerseByVerseView(container);
                break;
        }
        
        if (this.highlightDifferences) {
            this.highlightTextDifferences();
        }
    }
    
    // Render parallel view
    renderParallelView(container) {
        const cols = Math.min(this.selectedTranslations.length, 4);
        container.className += ` ${this.getColumnClass(cols)}`;
        
        let html = '';
        
        this.selectedTranslations.forEach(translationId => {
            const translation = this.translations[translationId];
            if (!translation || !translation.verses[this.currentVerse]) return;
            
            const text = this.formatText(translation.verses[this.currentVerse], translation.language);
            
            html += `
                <div class="translation-card" data-translation="${translationId}">
                    <div class="translation-header">
                        <div class="translation-title">
                            <i class="${this.getLanguageIcon(translation.language)}"></i>
                            ${translation.name}
                        </div>
                        <div class="translation-meta">${translation.language}</div>
                    </div>
                    <div class="translation-text ${translation.language}-text" 
                         style="font-family: ${translation.font}; direction: ${translation.direction};">
                        ${text}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    // Render interlinear view
    renderInterlinearView(container) {
        if (!this.selectedTranslations.includes('hebrew-masoretic')) {
            container.innerHTML = '<div class="no-interlinear">תצוגה בין השורות זמינה רק עם הטקסט העברי המסורתי</div>';
            return;
        }
        
        const hebrewText = this.translations['hebrew-masoretic'].verses[this.currentVerse];
        const words = hebrewText.split(' ');
        
        // Get first non-Hebrew translation for interlinear
        const secondTranslation = this.selectedTranslations.find(t => 
            t !== 'hebrew-masoretic' && this.translations[t].verses[this.currentVerse]
        );
        
        if (!secondTranslation) {
            container.innerHTML = '<div class="no-interlinear">בחר תרגום נוסף לתצוגה בין השורות</div>';
            return;
        }
        
        const translationText = this.translations[secondTranslation].verses[this.currentVerse];
        const translationWords = translationText.split(' ');
        
        let html = '<div class="comparison-interlinear"><div class="interlinear-verse">';
        
        words.forEach((word, index) => {
            const cleanWord = word.replace(/[׃.,;:!?]/g, '');
            const translationWord = translationWords[Math.floor(index * translationWords.length / words.length)] || '';
            
            html += `
                <div class="interlinear-word">
                    <span class="word-original">${cleanWord}</span>
                    <span class="word-translation">${translationWord}</span>
                </div>
            `;
        });
        
        html += '</div></div>';
        container.innerHTML = html;
    }
    
    // Render verse-by-verse view
    renderVerseByVerseView(container) {
        const verses = ['9:7', '9:8', '9:9', '9:10', '9:11', '9:12', '9:13', '9:14', '9:15'];
        let html = '<div class="comparison-verse-by-verse">';
        
        verses.forEach(verse => {
            const hasTranslations = this.selectedTranslations.some(t => 
                this.translations[t].verses[verse]
            );
            
            if (!hasTranslations) return;
            
            html += `
                <div class="verse-comparison-group">
                    <div class="verse-number">פסוק ${verse.replace('9:', '')}</div>
                    <div class="verse-translations">
            `;
            
            this.selectedTranslations.forEach(translationId => {
                const translation = this.translations[translationId];
                if (!translation || !translation.verses[verse]) return;
                
                const text = this.formatText(translation.verses[verse], translation.language);
                
                html += `
                    <div class="verse-translation" data-translation="${translationId}">
                        <strong>${translation.name}:</strong><br>
                        <span class="${translation.language}-text" 
                              style="font-family: ${translation.font}; direction: ${translation.direction};">
                            ${text}
                        </span>
                    </div>
                `;
            });
            
            html += '</div></div>';
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    // Get column class for grid
    getColumnClass(cols) {
        switch (cols) {
            case 1: return 'one-col';
            case 2: return 'two-cols';
            case 3: return 'three-cols';
            default: return 'four-cols';
        }
    }
    
    // Get language icon
    getLanguageIcon(language) {
        const icons = {
            'hebrew': 'fas fa-scroll',
            'english': 'fas fa-book',
            'aramaic': 'fas fa-synagogue',
            'arabic': 'fas fa-moon',
            'greek': 'fas fa-columns',
            'latin': 'fas fa-cross'
        };
        return icons[language] || 'fas fa-language';
    }
    
    // Format text based on options
    formatText(text, language) {
        let formattedText = text;
        
        if (language === 'hebrew') {
            if (!this.showVowels) {
                formattedText = this.removeVowels(formattedText);
            }
            if (!this.showCantillation) {
                formattedText = this.removeCantillation(formattedText);
            }
        }
        
        return formattedText;
    }
    
    // Remove Hebrew vowels
    removeVowels(text) {
        return text.replace(/[\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/g, '');
    }
    
    // Remove cantillation marks
    removeCantillation(text) {
        return text.replace(/[\u0591-\u05AF\u05BD\u05BF\u05C0\u05C3\u05C6]/g, '');
    }
    
    // Highlight differences between translations
    highlightTextDifferences() {
        if (!this.highlightDifferences || this.selectedTranslations.length < 2) return;
        
        // Implementation for highlighting would go here
        // This is a simplified version
        const cards = document.querySelectorAll('.translation-card');
        cards.forEach(card => {
            card.classList.add('highlight-differences');
        });
    }
    
    // Load analysis for current verse
    loadAnalysis() {
        const analysisContent = document.getElementById('analysisContent');
        if (!analysisContent) return;
        
        const analysis = this.analysisData[this.currentVerse];
        if (!analysis) {
            analysisContent.innerHTML = '<p>אין ניתוח זמין לפסוק זה כרגע.</p>';
            return;
        }
        
        let html = `
            <div class="analysis-section">
                <h4><i class="fas fa-key"></i> מילות מפתח</h4>
                <div class="keywords">
                    ${analysis.keywords.map(keyword => 
                        `<span class="keyword-tag">${keyword}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="analysis-section">
                <h4><i class="fas fa-lightbulb"></i> נושאים מרכזיים</h4>
                <div class="themes">
                    ${analysis.themes.map(theme => 
                        `<span class="theme-tag">${theme}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        if (analysis.difficulties) {
            html += `
                <div class="analysis-section">
                    <h4><i class="fas fa-question-circle"></i> קשיים תרגומיים</h4>
                    <div class="difficulties">
            `;
            
            analysis.difficulties.forEach(difficulty => {
                html += `
                    <div class="difficulty-item">
                        <strong class="difficulty-word">${difficulty.word}</strong>
                        <p class="difficulty-explanation">${difficulty.explanation}</p>
                        <div class="translation-variants">
                `;
                
                Object.entries(difficulty.translations).forEach(([lang, trans]) => {
                    const langName = this.translations[lang]?.name || lang;
                    html += `<span class="variant"><strong>${langName}:</strong> ${trans}</span>`;
                });
                
                html += '</div></div>';
            });
            
            html += '</div></div>';
        }
        
        analysisContent.innerHTML = html;
        this.loadTranslationNotes();
    }
    
    // Load translation notes
    loadTranslationNotes() {
        const notesContainer = document.getElementById('translationNotes');
        if (notesContainer) {
            notesContainer.innerHTML = `
                <p>פסוק זה מכיל דוגמאות מעניינות לקשיים תרגומיים:</p>
                <ul>
                    <li>המילה "הלוך הלכו" מבטאת פעולה חוזרת ונמשכת</li>
                    <li>המושג "למשוח" מתייחס למינוי רשמי של מלך</li>
                    <li>השאלות הרטוריות מבטאות דילמה מוסרית</li>
                </ul>
            `;
        }
        
        const contextContainer = document.getElementById('historicalContext');
        if (contextContainer) {
            contextContainer.innerHTML = `
                <p>המשל נאמר על ידי יותם בן גדעון לאחר שאבימלך אחיו התמנה למלך על שכם.</p>
                <p>המשל מבקר את הרצון של העם למנות מלך ומזהיר מפני הסכנות הטמונות במנהיגות רודנית.</p>
            `;
        }
        
        const linguisticContainer = document.getElementById('linguisticDifferences');
        if (linguisticContainer) {
            linguisticContainer.innerHTML = `
                <p>הבדלים עיקריים בין התרגומים:</p>
                <ul>
                    <li><strong>עברית:</strong> שימוש באינפיניטיב אבסולוט לחיזוק</li>
                    <li><strong>אנגלית:</strong> תרגום פשוט יותר של הצורות הדקדוקיות</li>
                    <li><strong>ארמית:</strong> שימוש במילים נרדפות</li>
                </ul>
            `;
        }
    }
    
    // Setup analysis panel
    setupAnalysisPanel() {
        this.analysisPanel = document.getElementById('analysisPanel');
    }
    
    // Toggle analysis panel
    toggleAnalysisPanel() {
        if (this.analysisPanel) {
            this.analysisPanel.classList.toggle('collapsed');
        }
    }
    
    // Load translation preset
    loadPreset(preset) {
        const presets = {
            'classic': ['hebrew-masoretic', 'english-kjv'],
            'modern': ['hebrew-modern', 'english-niv'],
            'scholarly': ['hebrew-masoretic', 'aramaic-targum', 'greek-lxx'],
            'multilingual': ['hebrew-masoretic', 'english-niv', 'arabic-saadia']
        };
        
        if (!presets[preset]) return;
        
        // Uncheck all checkboxes
        document.querySelectorAll('.language-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Check preset translations
        presets[preset].forEach(translationId => {
            const checkbox = document.querySelector(`input[value="${translationId}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        this.updateSelectedTranslations();
        this.renderComparison();
    }
    
    // Export comparison
    exportComparison(format) {
        const data = this.prepareExportData();
        
        switch (format) {
            case 'pdf':
                this.exportToPDF(data);
                break;
            case 'docx':
                this.exportToWord(data);
                break;
            case 'csv':
                this.exportToCSV(data);
                break;
        }
    }
    
    // Prepare export data
    prepareExportData() {
        const data = {
            verse: this.currentVerse,
            translations: []
        };
        
        this.selectedTranslations.forEach(translationId => {
            const translation = this.translations[translationId];
            if (translation && translation.verses[this.currentVerse]) {
                data.translations.push({
                    name: translation.name,
                    language: translation.language,
                    text: translation.verses[this.currentVerse]
                });
            }
        });
        
        return data;
    }
    
    // Export to PDF
    exportToPDF(data) {
        // This would require a PDF library like jsPDF
        alert('ייצוא ל-PDF יתווסף בעתיד');
    }
    
    // Export to Word
    exportToWord(data) {
        // This would require a Word export library
        alert('ייצוא ל-Word יתווסף בעתיד');
    }
    
    // Export to CSV
    exportToCSV(data) {
        let csv = 'Translation,Language,Text\n';
        
        data.translations.forEach(trans => {
            csv += `"${trans.name}","${trans.language}","${trans.text.replace(/"/g, '""')}"\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jotham-parable-${data.verse}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    
    // Print comparison
    printComparison() {
        window.print();
    }
    
    // Share comparison
    shareComparison() {
        const url = `${window.location.origin}${window.location.pathname}?verse=${this.currentVerse}&translations=${this.selectedTranslations.join(',')}`;
        
        if (navigator.share) {
            navigator.share({
                title: `השוואת תרגומים - שופטים ${this.currentVerse}`,
                text: 'השוואת תרגומים למשל יותם',
                url: url
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                alert('הקישור הועתק ללוח!');
            }).catch(() => {
                prompt('העתק קישור:', url);
            });
        }
    }
    
    // Save bookmark
    saveBookmark() {
        const bookmark = {
            verse: this.currentVerse,
            translations: this.selectedTranslations,
            view: this.currentView,
            timestamp: new Date().toISOString()
        };
        
        const bookmarks = JSON.parse(localStorage.getItem('translation-bookmarks') || '[]');
        bookmarks.push(bookmark);
        localStorage.setItem('translation-bookmarks', JSON.stringify(bookmarks));
        
        alert('סימניה נשמרה בהצלחה!');
    }
}

// Initialize translation system
document.addEventListener('DOMContentLoaded', () => {
    window.translationSystem = new TranslationSystem();
});

// Analytics integration
function trackTranslationEvent(eventType, data) {
    if (window.learningAnalytics) {
        window.learningAnalytics.trackEvent('translation', eventType, {
            ...data,
            timestamp: new Date().toISOString()
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationSystem;
}
