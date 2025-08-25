/**
 * Interactive Infographics System for Yotam's Parable
 * Provides interactive visualizations for educational content
 */

class YotamInfographics {
    constructor() {
        this.currentVisualization = null;
        this.treeData = this.initializeTreeData();
        this.commentaryData = this.initializeCommentaryData();
        this.geographyData = this.initializeGeographyData();
        
        this.init();
    }

    /**
     * Initialize the infographics system
     */
    init() {
        this.setupEventListeners();
        this.createTreeVisualization();
        this.createCommentaryTimeline();
        this.createGeographyMap();
        this.createComparisonCharts();
    }

    /**
     * Initialize tree data with detailed information
     */
    initializeTreeData() {
        return {
            olive: {
                id: 'olive',
                name: 'עץ הזית',
                hebrewName: 'זית',
                botanicalName: 'Olea europaea',
                symbolism: 'שמן, אור, כבוד, שלום',
                economicValue: 'שמן לאור ולמאכל, עץ בעל ערך כלכלי גבוה',
                biblicalSignificance: 'סמל השלום והברכה, השמן המקודש למשחה',
                commentary: {
                    rashi: 'עתניאל בן קנז - השופט הראשון',
                    radak: 'גדעון עצמו - האב המנהיג',
                    abarbanel: 'המיוחסים - בעלי ייחוס נכבד',
                    malbim: 'החכמים - אור התורה והחכמה'
                },
                characteristics: [
                    'עץ ירוק עד - סמל לקיימות',
                    'פרי עשיר בשמן - תועלת כלכלית',
                    'עמיד בפני בצורת - חוזק ויציבות',
                    'גדל לאט אך חי זמן רב - תבונה וסבלנות'
                ],
                modernRelevance: 'מנהיג שמשרת את הציבור מתוך ערכים עמוקים',
                color: '#228B22',
                position: { x: 100, y: 150 }
            },
            fig: {
                id: 'fig',
                name: 'עץ התאנה',
                hebrewName: 'תאנה',
                botanicalName: 'Ficus carica',
                symbolism: 'מתיקות, פוריות, שגשוג',
                economicValue: 'פרי מתוק ומזין, מקור סוכר ואנרגיה',
                biblicalSignificance: 'אחד משבעת המינים, סמל הפוריות והשגשוג',
                commentary: {
                    rashi: 'דבורה הנביאה - השופטת החכמה',
                    radak: 'בנו של גדעון - הדור השני',
                    abarbanel: 'העשירים - בעלי ממון ומשאבים',
                    malbim: 'בעלי התענוגות - המתוקים והנעימים'
                },
                characteristics: [
                    'פרי מתוק במיוחד - נעימות וחמלה',
                    'פריחה מוקדמת - חדשנות ויזמה',
                    'צורך בטיפוח רב - דרישת תשומת לב',
                    'רב-גזעי ופורה - יכולת הנהגה רחבה'
                ],
                modernRelevance: 'מנהיג אמפתי שדואג לרווחת הציבור',
                color: '#8B4513',
                position: { x: 300, y: 150 }
            },
            grape: {
                id: 'grape',
                name: 'הגפן',
                hebrewName: 'גפן',
                botanicalName: 'Vitis vinifera',
                symbolism: 'שמחה, חגיגיות, רוחניות',
                economicValue: 'יין לשמחה ולטקסים דתיים',
                biblicalSignificance: 'יין הנסכים, משמח אלוהים ואנשים',
                commentary: {
                    rashi: 'גדעון אביו של יותם - המנהיג הצנוע',
                    radak: 'בן בנו של גדעון - הדור השלישי',
                    abarbanel: 'החכמים - בעלי תבונה וחכמה',
                    malbim: 'בעלי התושייה - האסטרטגים'
                },
                characteristics: [
                    'משמח לב אנוש - יכולת לעודד ולהרים מורל',
                    'צורך בתמיכה (עמודים) - מנהיגות שיתופית',
                    'תהליך הבשלה ארוך - פיתוח מתמשך של כישורים',
                    'איכות משתנה עם הזמן - התבגרות וניסיון'
                ],
                modernRelevance: 'מנהיג המעורר השראה ושמחה',
                color: '#800080',
                position: { x: 500, y: 150 }
            },
            bramble: {
                id: 'bramble',
                name: 'האטד',
                hebrewName: 'אטד',
                botanicalName: 'Lycium europaeum',
                symbolism: 'קוצים, סכנה, הרס',
                economicValue: 'ללא ערך כלכלי, לעיתים מזיק',
                biblicalSignificance: 'סמל העריצות והמנהיגות הרסנית',
                commentary: {
                    rashi: 'אבימלך בן הפילגש - המנהיג הרע',
                    radak: 'מי שאינו ראוי למלוכה',
                    abarbanel: 'בן פילגש עני ורע מעללים',
                    malbim: 'ההמון הפחות - קטני האישיות'
                },
                characteristics: [
                    'קוצני ומזיק - פוגע במי שמתקרב אליו',
                    'צל מועט - לא מספק הגנה אמיתית',
                    'מתלקח במהירות - מביא הרס ואש',
                    'צומח בכל מקום - לא דורש כישורים מיוחדים'
                ],
                modernRelevance: 'דמגוג או עריץ שמבטיח הרבה ומוביל להרס',
                color: '#8B0000',
                position: { x: 700, y: 150 }
            }
        };
    }

    /**
     * Initialize commentary timeline data
     */
    initializeCommentaryData() {
        return [
            {
                period: 'תקופת החכמים',
                years: '100-500 לספירה',
                commentators: ['תרגום יונתן', 'מדרש תנחומא', 'תלמוד בבלי'],
                mainThemes: ['זיהוי העצים עם שופטי ישראל', 'מסר על מלוכה ומנהיגות'],
                color: '#FFD700'
            },
            {
                period: 'פרשנים ראשונים',
                years: '1000-1200',
                commentators: ['רש"י', 'רד"ק', 'רלב"ג'],
                mainThemes: ['פירוש פשוט והיסטורי', 'זיהוי דמויות מפורש'],
                color: '#32CD32'
            },
            {
                period: 'פרשנים אחרונים',
                years: '1400-1600',
                commentators: ['אברבנאל', 'מצודת דוד', 'מלבי"ם'],
                mainThemes: ['ביקורת מערכתית', 'פרשנות סוציולוגית'],
                color: '#4169E1'
            },
            {
                period: 'פרשנות מודרנית',
                years: '1800-היום',
                commentators: ['מלבי"ם', 'הרב קוק', 'פרופ\' יהודה אליצור'],
                mainThemes: ['רלוונטיות עכשווית', 'פסיכולוגיה של מנהיגות'],
                color: '#FF69B4'
            }
        ];
    }

    /**
     * Initialize biblical geography data
     */
    initializeGeographyData() {
        return {
            locations: [
                {
                    name: 'הר גריזים',
                    coordinates: { x: 400, y: 200 },
                    description: 'המקום שבו נשא יותם את משלו',
                    significance: 'הר הברכה, מקום נשיאת המשל',
                    modernLocation: 'נבלס, שומרון'
                },
                {
                    name: 'שכם',
                    coordinates: { x: 380, y: 250 },
                    description: 'העיר שבה המליכו את אבימלך',
                    significance: 'מרכז פוליטי חשוב בתקופת השופטים',
                    modernLocation: 'נבלס העתיקה'
                },
                {
                    name: 'עפרה',
                    coordinates: { x: 350, y: 180 },
                    description: 'בית גדעון אבי יותם',
                    significance: 'מקום מגורי משפחת גדעון',
                    modernLocation: 'אזור שומרון הדרומי'
                },
                {
                    name: 'מגדל שכם',
                    coordinates: { x: 370, y: 240 },
                    description: 'המבצר שנשרף על ידי אבימלך',
                    significance: 'סוף עלילת המשל - הרס עצמי',
                    modernLocation: 'עיר שכם העתיקה'
                }
            ],
            routes: [
                {
                    from: 'עפרה',
                    to: 'הר גריזים',
                    description: 'נתיב בריחת יותם ונשיאת המשל'
                },
                {
                    from: 'שכם',
                    to: 'מגדל שכם',
                    description: 'מסע ההרס של אבימלך'
                }
            ]
        };
    }

    /**
     * Create interactive tree visualization
     */
    createTreeVisualization() {
        const container = document.getElementById('tree-visualization');
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Create SVG container
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 800 400');
        svg.setAttribute('class', 'tree-viz-svg');

        // Add background
        const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        background.setAttribute('width', '100%');
        background.setAttribute('height', '100%');
        background.setAttribute('fill', 'linear-gradient(135deg, #f5f5dc 0%, #e6ddd4 100%)');
        svg.appendChild(background);

        // Create trees
        Object.values(this.treeData).forEach(tree => {
            const treeGroup = this.createTreeElement(tree);
            svg.appendChild(treeGroup);
        });

        // Add crown illustration
        const crown = this.createCrownElement();
        svg.appendChild(crown);

        // Add title
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', '400');
        title.setAttribute('y', '50');
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('class', 'tree-viz-title');
        title.textContent = '"הלכו העצים למשח עליהם מלך"';
        svg.appendChild(title);

        container.appendChild(svg);

        // Add interaction handlers
        this.setupTreeInteractions();
    }

    /**
     * Create individual tree element
     */
    createTreeElement(tree) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', `tree-element tree-${tree.id}`);
        group.setAttribute('data-tree', tree.id);

        // Tree trunk
        const trunk = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        trunk.setAttribute('x', tree.position.x - 10);
        trunk.setAttribute('y', tree.position.y + 50);
        trunk.setAttribute('width', '20');
        trunk.setAttribute('height', '60');
        trunk.setAttribute('fill', '#8B4513');
        trunk.setAttribute('rx', '3');

        // Tree crown
        const crown = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        crown.setAttribute('cx', tree.position.x);
        crown.setAttribute('cy', tree.position.y);
        crown.setAttribute('r', '40');
        crown.setAttribute('fill', tree.color);
        crown.setAttribute('class', 'tree-crown');

        // Tree icon/symbol
        const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        symbol.setAttribute('x', tree.position.x);
        symbol.setAttribute('y', tree.position.y + 5);
        symbol.setAttribute('text-anchor', 'middle');
        symbol.setAttribute('class', 'tree-symbol');
        symbol.textContent = this.getTreeEmoji(tree.id);

        // Tree name
        const name = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        name.setAttribute('x', tree.position.x);
        name.setAttribute('y', tree.position.y + 80);
        name.setAttribute('text-anchor', 'middle');
        name.setAttribute('class', 'tree-name');
        name.textContent = tree.name;

        group.appendChild(trunk);
        group.appendChild(crown);
        group.appendChild(symbol);
        group.appendChild(name);

        return group;
    }

    /**
     * Get emoji representation for each tree
     */
    getTreeEmoji(treeId) {
        const emojis = {
            olive: '🫒',
            fig: '🍯',
            grape: '🍇',
            bramble: '🌿'
        };
        return emojis[treeId] || '🌳';
    }

    /**
     * Create crown element for the parable
     */
    createCrownElement() {
        const crownGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        crownGroup.setAttribute('class', 'crown-element');
        
        const crown = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        crown.setAttribute('x', '400');
        crown.setAttribute('y', '100');
        crown.setAttribute('text-anchor', 'middle');
        crown.setAttribute('class', 'crown-symbol');
        crown.setAttribute('font-size', '48');
        crown.textContent = '👑';

        crownGroup.appendChild(crown);
        return crownGroup;
    }

    /**
     * Setup tree click interactions
     */
    setupTreeInteractions() {
        const treeElements = document.querySelectorAll('.tree-element');
        
        treeElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const treeId = element.dataset.tree;
                this.showTreeDetails(treeId);
            });

            element.addEventListener('mouseenter', (e) => {
                element.style.transform = 'scale(1.1)';
                element.style.transformOrigin = 'center';
                element.style.transition = 'transform 0.3s ease';
                element.style.cursor = 'pointer';
            });

            element.addEventListener('mouseleave', (e) => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * Show detailed information about a specific tree
     */
    showTreeDetails(treeId) {
        const tree = this.treeData[treeId];
        if (!tree) return;

        // Create modal content
        const modalContent = `
            <div class="tree-modal-header">
                <h2>${tree.name} (${tree.hebrewName})</h2>
                <span class="tree-emoji">${this.getTreeEmoji(treeId)}</span>
            </div>
            
            <div class="tree-modal-body">
                <div class="tree-info-grid">
                    <div class="tree-info-section">
                        <h3>מידע בוטני</h3>
                        <p><strong>שם מדעי:</strong> ${tree.botanicalName}</p>
                        <p><strong>סמליות:</strong> ${tree.symbolism}</p>
                        <p><strong>ערך כלכלי:</strong> ${tree.economicValue}</p>
                    </div>
                    
                    <div class="tree-info-section">
                        <h3>משמעות מקראית</h3>
                        <p>${tree.biblicalSignificance}</p>
                    </div>
                    
                    <div class="tree-info-section">
                        <h3>תכונות מיוחדות</h3>
                        <ul>
                            ${tree.characteristics.map(char => `<li>${char}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="tree-info-section">
                        <h3>פרשנויות מרכזיות</h3>
                        <div class="commentary-grid">
                            ${Object.entries(tree.commentary).map(([commentator, interpretation]) => `
                                <div class="commentary-item">
                                    <strong>${this.getCommentatorName(commentator)}:</strong>
                                    <span>${interpretation}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="tree-info-section">
                        <h3>רלוונטיות מודרנית</h3>
                        <p class="modern-relevance">${tree.modernRelevance}</p>
                    </div>
                </div>
            </div>
            
            <div class="tree-modal-footer">
                <button class="btn btn-primary" onclick="yotamInfographics.closeTreeModal()">
                    <i class="fas fa-times"></i> סגור
                </button>
                <button class="btn btn-secondary" onclick="yotamInfographics.shareTreeInfo('${treeId}')">
                    <i class="fas fa-share"></i> שתף
                </button>
            </div>
        `;

        this.showModal('tree-details-modal', modalContent);
    }

    /**
     * Get Hebrew name for commentator
     */
    getCommentatorName(commentator) {
        const names = {
            rashi: 'רש"י',
            radak: 'רד"ק',
            abarbanel: 'אברבנאל',
            malbim: 'מלבי"ם'
        };
        return names[commentator] || commentator;
    }

    /**
     * Create commentary timeline visualization
     */
    createCommentaryTimeline() {
        const container = document.getElementById('commentary-timeline');
        if (!container) return;

        container.innerHTML = '';

        // Create timeline container
        const timeline = document.createElement('div');
        timeline.className = 'timeline-container';

        // Add timeline title
        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.textContent = 'התפתחות הפרשנות לאורך הדורות';
        timeline.appendChild(title);

        // Create timeline line
        const timelineLine = document.createElement('div');
        timelineLine.className = 'timeline-line';
        timeline.appendChild(timelineLine);

        // Add timeline periods
        this.commentaryData.forEach((period, index) => {
            const periodElement = this.createTimelinePeriod(period, index);
            timeline.appendChild(periodElement);
        });

        container.appendChild(timeline);

        // Setup timeline interactions
        this.setupTimelineInteractions();
    }

    /**
     * Create individual timeline period
     */
    createTimelinePeriod(period, index) {
        const periodDiv = document.createElement('div');
        periodDiv.className = 'timeline-period';
        periodDiv.setAttribute('data-period', index);
        periodDiv.style.left = `${(index / (this.commentaryData.length - 1)) * 90 + 5}%`;

        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.style.backgroundColor = period.color;

        const content = document.createElement('div');
        content.className = 'timeline-content';
        content.innerHTML = `
            <h4>${period.period}</h4>
            <span class="timeline-years">${period.years}</span>
            <div class="timeline-preview">
                ${period.commentators.slice(0, 2).join(', ')}
                ${period.commentators.length > 2 ? '...' : ''}
            </div>
        `;

        periodDiv.appendChild(dot);
        periodDiv.appendChild(content);

        return periodDiv;
    }

    /**
     * Setup timeline click interactions
     */
    setupTimelineInteractions() {
        const periods = document.querySelectorAll('.timeline-period');
        
        periods.forEach(period => {
            period.addEventListener('click', (e) => {
                const periodIndex = period.dataset.period;
                this.showTimelineDetails(periodIndex);
            });

            period.addEventListener('mouseenter', (e) => {
                period.style.transform = 'translateY(-10px)';
                period.style.transition = 'transform 0.3s ease';
                period.style.cursor = 'pointer';
            });

            period.addEventListener('mouseleave', (e) => {
                period.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Show detailed timeline period information
     */
    showTimelineDetails(periodIndex) {
        const period = this.commentaryData[periodIndex];
        if (!period) return;

        const modalContent = `
            <div class="timeline-modal-header">
                <h2>${period.period}</h2>
                <span class="timeline-period-years">${period.years}</span>
            </div>
            
            <div class="timeline-modal-body">
                <div class="commentators-section">
                    <h3>פרשנים מרכזיים</h3>
                    <div class="commentators-grid">
                        ${period.commentators.map(commentator => `
                            <div class="commentator-card">
                                <h4>${commentator}</h4>
                                <p>תרומה מיוחדת לפרשנות המשל</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="themes-section">
                    <h3>נושאים מרכזיים</h3>
                    <ul class="themes-list">
                        ${period.mainThemes.map(theme => `<li>${theme}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="timeline-modal-footer">
                <button class="btn btn-primary" onclick="yotamInfographics.closeModal()">
                    <i class="fas fa-times"></i> סגור
                </button>
            </div>
        `;

        this.showModal('timeline-details-modal', modalContent);
    }

    /**
     * Create biblical geography map
     */
    createGeographyMap() {
        const container = document.getElementById('geography-map');
        if (!container) return;

        container.innerHTML = '';

        // Create SVG map container
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 800 500');
        svg.setAttribute('class', 'geography-map-svg');

        // Add map background
        const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        background.setAttribute('width', '100%');
        background.setAttribute('height', '100%');
        background.setAttribute('fill', 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #DEB887 100%)');
        svg.appendChild(background);

        // Add locations
        this.geographyData.locations.forEach(location => {
            const locationGroup = this.createLocationElement(location);
            svg.appendChild(locationGroup);
        });

        // Add routes
        this.geographyData.routes.forEach(route => {
            const routeLine = this.createRouteElement(route);
            svg.appendChild(routeLine);
        });

        // Add map title
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', '400');
        title.setAttribute('y', '30');
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('class', 'map-title');
        title.textContent = 'מפת אזור שכם והר גריזים בתקופת השופטים';
        svg.appendChild(title);

        container.appendChild(svg);

        // Setup map interactions
        this.setupMapInteractions();
    }

    /**
     * Create location element on map
     */
    createLocationElement(location) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'map-location');
        group.setAttribute('data-location', location.name);

        // Location marker
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marker.setAttribute('cx', location.coordinates.x);
        marker.setAttribute('cy', location.coordinates.y);
        marker.setAttribute('r', '8');
        marker.setAttribute('fill', '#FF4500');
        marker.setAttribute('stroke', '#FFFFFF');
        marker.setAttribute('stroke-width', '2');

        // Location label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', location.coordinates.x);
        label.setAttribute('y', location.coordinates.y - 15);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('class', 'location-label');
        label.textContent = location.name;

        group.appendChild(marker);
        group.appendChild(label);

        return group;
    }

    /**
     * Create route line between locations
     */
    createRouteElement(route) {
        const fromLocation = this.geographyData.locations.find(loc => loc.name === route.from);
        const toLocation = this.geographyData.locations.find(loc => loc.name === route.to);
        
        if (!fromLocation || !toLocation) return null;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromLocation.coordinates.x);
        line.setAttribute('y1', fromLocation.coordinates.y);
        line.setAttribute('x2', toLocation.coordinates.x);
        line.setAttribute('y2', toLocation.coordinates.y);
        line.setAttribute('stroke', '#8B4513');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('stroke-dasharray', '10,5');
        line.setAttribute('class', 'route-line');

        return line;
    }

    /**
     * Setup map click interactions
     */
    setupMapInteractions() {
        const locations = document.querySelectorAll('.map-location');
        
        locations.forEach(location => {
            location.addEventListener('click', (e) => {
                const locationName = location.dataset.location;
                this.showLocationDetails(locationName);
            });

            location.addEventListener('mouseenter', (e) => {
                location.style.transform = 'scale(1.5)';
                location.style.transformOrigin = 'center';
                location.style.transition = 'transform 0.3s ease';
                location.style.cursor = 'pointer';
            });

            location.addEventListener('mouseleave', (e) => {
                location.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * Show location details
     */
    showLocationDetails(locationName) {
        const location = this.geographyData.locations.find(loc => loc.name === locationName);
        if (!location) return;

        const modalContent = `
            <div class="location-modal-header">
                <h2>${location.name}</h2>
                <span class="location-icon">📍</span>
            </div>
            
            <div class="location-modal-body">
                <div class="location-description">
                    <h3>תיאור</h3>
                    <p>${location.description}</p>
                </div>
                
                <div class="location-significance">
                    <h3>משמעות במשל</h3>
                    <p>${location.significance}</p>
                </div>
                
                <div class="location-modern">
                    <h3>מיקום כיום</h3>
                    <p>${location.modernLocation}</p>
                </div>
            </div>
            
            <div class="location-modal-footer">
                <button class="btn btn-primary" onclick="yotamInfographics.closeModal()">
                    <i class="fas fa-times"></i> סגור
                </button>
            </div>
        `;

        this.showModal('location-details-modal', modalContent);
    }

    /**
     * Create comparison charts
     */
    createComparisonCharts() {
        const container = document.getElementById('comparison-charts');
        if (!container) return;

        container.innerHTML = `
            <div class="charts-header">
                <h3>השוואת פרשנויות</h3>
                <div class="chart-controls">
                    <button class="btn btn-sm chart-btn active" data-chart="trees">עצים</button>
                    <button class="btn btn-sm chart-btn" data-chart="commentators">פרשנים</button>
                    <button class="btn btn-sm chart-btn" data-chart="themes">נושאים</button>
                </div>
            </div>
            <div class="charts-container">
                <div id="trees-chart" class="chart-panel active">
                    ${this.createTreesComparisonChart()}
                </div>
                <div id="commentators-chart" class="chart-panel">
                    ${this.createCommentatorsChart()}
                </div>
                <div id="themes-chart" class="chart-panel">
                    ${this.createThemesChart()}
                </div>
            </div>
        `;

        this.setupChartControls();
    }

    /**
     * Create trees comparison chart
     */
    createTreesComparisonChart() {
        return `
            <div class="comparison-table">
                <table class="trees-comparison">
                    <thead>
                        <tr>
                            <th>עץ</th>
                            <th>רש"י</th>
                            <th>רד"ק</th>
                            <th>אברבנאל</th>
                            <th>מלבי"ם</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.values(this.treeData).map(tree => `
                            <tr>
                                <td class="tree-name-cell">
                                    <span class="tree-emoji">${this.getTreeEmoji(tree.id)}</span>
                                    ${tree.name}
                                </td>
                                <td>${tree.commentary.rashi}</td>
                                <td>${tree.commentary.radak}</td>
                                <td>${tree.commentary.abarbanel}</td>
                                <td>${tree.commentary.malbim}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * Create commentators chart
     */
    createCommentatorsChart() {
        return `
            <div class="commentators-timeline">
                ${this.commentaryData.map(period => `
                    <div class="commentator-period">
                        <div class="period-header">
                            <h4>${period.period}</h4>
                            <span>${period.years}</span>
                        </div>
                        <div class="period-commentators">
                            ${period.commentators.map(commentator => `
                                <div class="commentator-badge" style="background-color: ${period.color}">
                                    ${commentator}
                                </div>
                            `).join('')}
                        </div>
                        <div class="period-themes">
                            ${period.mainThemes.join(' • ')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Create themes chart
     */
    createThemesChart() {
        const themes = [
            { name: 'מנהיגות וענווה', frequency: 95, color: '#228B22' },
            { name: 'סכנות פופוליזם', frequency: 85, color: '#FF4500' },
            { name: 'אחריות ציבור', frequency: 75, color: '#4169E1' },
            { name: 'כפיות טובה', frequency: 70, color: '#800080' },
            { name: 'הרס עצמי', frequency: 60, color: '#8B0000' }
        ];

        return `
            <div class="themes-chart">
                <h4>נושאים מרכזיים בפרשנות המשל</h4>
                <div class="themes-bars">
                    ${themes.map(theme => `
                        <div class="theme-bar-container">
                            <div class="theme-label">${theme.name}</div>
                            <div class="theme-bar">
                                <div class="theme-bar-fill" 
                                     style="width: ${theme.frequency}%; background-color: ${theme.color}">
                                    <span class="theme-percentage">${theme.frequency}%</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Setup chart control buttons
     */
    setupChartControls() {
        const chartButtons = document.querySelectorAll('.chart-btn');
        const chartPanels = document.querySelectorAll('.chart-panel');

        chartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const chartType = button.dataset.chart;
                
                // Update button states
                chartButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update panel visibility
                chartPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(`${chartType}-chart`).classList.add('active');
            });
        });
    }

    /**
     * Generic modal display function
     */
    showModal(modalId, content) {
        // Remove existing modal
        const existingModal = document.getElementById('infographics-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'infographics-modal';
        modal.className = 'infographics-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="yotamInfographics.closeModal()"></div>
            <div class="modal-content">
                ${content}
            </div>
        `;

        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('infographics-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    }

    /**
     * Close tree modal specifically
     */
    closeTreeModal() {
        this.closeModal();
    }

    /**
     * Share tree information
     */
    shareTreeInfo(treeId) {
        const tree = this.treeData[treeId];
        const shareText = `למדתי על ${tree.name} במשל יותם: ${tree.modernRelevance}`;
        
        if (navigator.share) {
            navigator.share({
                title: `${tree.name} - משל יותם`,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('הטקסט הועתק ללוח הגזירים!');
            });
        }
    }

    /**
     * Setup event listeners for the infographics system
     */
    setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Resize handler for responsive updates
        window.addEventListener('resize', () => {
            // Update visualizations if needed
            this.updateVisualizationsSize();
        });
    }

    /**
     * Update visualizations on window resize
     */
    updateVisualizationsSize() {
        // Refresh SVG viewboxes and responsive elements
        const svgElements = document.querySelectorAll('.tree-viz-svg, .geography-map-svg');
        svgElements.forEach(svg => {
            // Trigger re-calculation of sizes
            svg.style.height = 'auto';
        });
    }
}

// Initialize the infographics system
const yotamInfographics = new YotamInfographics();

// Make it available globally
window.yotamInfographics = yotamInfographics;
