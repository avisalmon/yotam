// Advanced Learning Analytics System - משל יותם
// Tracks user progress, generates insights, and provides personalized learning recommendations

class YotamLearningAnalytics {
    constructor() {
        this.userId = this.generateUserId();
        this.sessionData = {
            startTime: Date.now(),
            sections: {},
            interactions: [],
            assessments: {},
            timeSpent: {},
            achievements: []
        };
        
        this.learningMetrics = {
            comprehension: 0,
            engagement: 0,
            progressSpeed: 0,
            consistencyScore: 0
        };
        
        this.achievements = [
            { id: 'first_visit', name: 'ביקור ראשון', description: 'ברוכים הבאים למשל יותם!', icon: '👋' },
            { id: 'text_reader', name: 'קורא הטקסט', description: 'קרא את הטקסט המקראי המלא', icon: '📖' },
            { id: 'tree_explorer', name: 'חוקר העצים', description: 'חקר את כל ארבעת העצים במשל', icon: '🌳' },
            { id: 'quiz_master', name: 'מומחה החידונים', description: 'עבר חידון עם ציון מעל 80%', icon: '🏆' },
            { id: 'commentary_scholar', name: 'לומד הפרשנות', description: 'חקר פרשנויות מכל התקופות', icon: '📚' },
            { id: 'infographics_navigator', name: 'נווט התרשימים', description: 'השתמש בכל התרשימים האינטראקטיביים', icon: '📊' },
            { id: 'contemporary_thinker', name: 'חושב עכשווי', description: 'חקר את הרלוונטיות המודרנית', icon: '💭' },
            { id: 'education_enthusiast', name: 'חובב חינוך', description: 'צפה בכל המשאבים החינוכיים', icon: '🎓' }
        ];
        
        this.personalizedRecommendations = [];
        this.progressGoals = this.initializeProgressGoals();
        
        this.init();
    }
    
    init() {
        this.loadStoredData();
        this.setupEventTracking();
        this.startSessionTracking();
        this.createAnalyticsInterface();
        this.scheduleDataSync();
        
        console.log('📊 מערכת אנליטיקת למידה הופעלה');
        this.recordEvent('system_init', { timestamp: Date.now() });
    }
    
    generateUserId() {
        let userId = localStorage.getItem('yotam_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('yotam_user_id', userId);
        }
        return userId;
    }
    
    loadStoredData() {
        const stored = localStorage.getItem(`yotam_analytics_${this.userId}`);
        if (stored) {
            const parsedData = JSON.parse(stored);
            this.sessionData = { ...this.sessionData, ...parsedData };
            this.calculateLearningMetrics();
        }
    }
    
    saveData() {
        const dataToSave = {
            ...this.sessionData,
            lastUpdate: Date.now()
        };
        localStorage.setItem(`yotam_analytics_${this.userId}`, JSON.stringify(dataToSave));
    }
    
    setupEventTracking() {
        // Section visits
        this.trackSectionVisits();
        
        // Content interactions
        this.trackContentInteractions();
        
        // Quiz interactions
        this.trackQuizInteractions();
        
        // Search usage
        this.trackSearchUsage();
        
        // Time tracking
        this.setupTimeTracking();
        
        // Achievement detection
        this.setupAchievementDetection();
    }
    
    trackSectionVisits() {
        const sections = ['biblical-text', 'analysis', 'infographics', 'commentary', 'contemporary', 'education'];
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id;
                    this.recordSectionVisit(sectionId);
                }
            });
        }, { threshold: 0.5, rootMargin: '-50px' });
        
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });
    }
    
    recordSectionVisit(sectionId) {
        if (!this.sessionData.sections[sectionId]) {
            this.sessionData.sections[sectionId] = {
                visits: 0,
                totalTime: 0,
                firstVisit: Date.now(),
                lastVisit: Date.now(),
                interactions: 0
            };
        }
        
        this.sessionData.sections[sectionId].visits++;
        this.sessionData.sections[sectionId].lastVisit = Date.now();
        
        this.recordEvent('section_visit', {
            section: sectionId,
            timestamp: Date.now()
        });
        
        this.saveData();
        this.checkAchievements();
    }
    
    trackContentInteractions() {
        // Tree interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tree-card, .tree-element')) {
                this.recordInteraction('tree_click', {
                    tree: e.target.closest('[data-tree]')?.dataset.tree || 'unknown'
                });
            }
            
            // Audio player interactions
            if (e.target.closest('#playAudio, .audio-control')) {
                this.recordInteraction('audio_play', {
                    section: this.getCurrentSection()
                });
            }
            
            // Modal interactions
            if (e.target.closest('[data-modal-trigger]')) {
                this.recordInteraction('modal_open', {
                    modalType: e.target.dataset.modalTrigger
                });
            }
            
            // Navigation clicks
            if (e.target.closest('.nav-link')) {
                this.recordInteraction('navigation', {
                    target: e.target.getAttribute('href')
                });
            }
        });
    }
    
    trackQuizInteractions() {
        // Listen for quiz events
        document.addEventListener('quiz-started', () => {
            this.recordEvent('quiz_start', { timestamp: Date.now() });
        });
        
        document.addEventListener('quiz-completed', (e) => {
            const score = e.detail.score;
            const totalQuestions = e.detail.totalQuestions;
            const percentage = Math.round((score / totalQuestions) * 100);
            
            this.sessionData.assessments.quiz = {
                score: score,
                total: totalQuestions,
                percentage: percentage,
                timestamp: Date.now(),
                attempts: (this.sessionData.assessments.quiz?.attempts || 0) + 1
            };
            
            this.recordEvent('quiz_complete', {
                score: score,
                percentage: percentage,
                timestamp: Date.now()
            });
            
            this.saveData();
            this.checkAchievements();
        });
    }
    
    trackSearchUsage() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    if (e.target.value.trim().length > 2) {
                        this.recordInteraction('search', {
                            query: e.target.value,
                            timestamp: Date.now()
                        });
                    }
                }, 1000);
            });
        }
    }
    
    setupTimeTracking() {
        let lastActiveTime = Date.now();
        let currentSection = this.getCurrentSection();
        
        // Update active time every 30 seconds
        setInterval(() => {
            const now = Date.now();
            const timeDiff = now - lastActiveTime;
            
            if (timeDiff < 60000) { // Less than 1 minute since last activity
                const section = this.getCurrentSection();
                if (!this.sessionData.timeSpent[section]) {
                    this.sessionData.timeSpent[section] = 0;
                }
                this.sessionData.timeSpent[section] += 30; // 30 seconds
                
                if (section !== currentSection) {
                    currentSection = section;
                    this.recordSectionVisit(section);
                }
            }
            
            lastActiveTime = now;
        }, 30000);
        
        // Track user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                lastActiveTime = Date.now();
            });
        });
    }
    
    getCurrentSection() {
        const sections = ['biblical-text', 'analysis', 'infographics', 'commentary', 'contemporary', 'education'];
        
        for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    return sectionId;
                }
            }
        }
        
        return 'home';
    }
    
    recordInteraction(type, data = {}) {
        this.sessionData.interactions.push({
            type: type,
            data: data,
            timestamp: Date.now()
        });
        
        // Update section interaction count
        const currentSection = this.getCurrentSection();
        if (this.sessionData.sections[currentSection]) {
            this.sessionData.sections[currentSection].interactions++;
        }
        
        this.saveData();
    }
    
    recordEvent(type, data = {}) {
        this.recordInteraction(type, data);
        this.calculateLearningMetrics();
        this.generateRecommendations();
    }
    
    calculateLearningMetrics() {
        const totalSections = Object.keys(this.sessionData.sections).length;
        const totalTime = Object.values(this.sessionData.timeSpent).reduce((sum, time) => sum + time, 0);
        const totalInteractions = this.sessionData.interactions.length;
        
        // Comprehension score (based on quiz performance and section coverage)
        const quizScore = this.sessionData.assessments.quiz?.percentage || 0;
        const sectionCoverage = Math.min(totalSections / 6, 1) * 100; // 6 main sections
        this.learningMetrics.comprehension = Math.round((quizScore * 0.7) + (sectionCoverage * 0.3));
        
        // Engagement score (based on interactions and time spent)
        const interactionScore = Math.min(totalInteractions / 20, 1) * 100; // Normalize to 20 interactions
        const timeScore = Math.min(totalTime / 1800, 1) * 100; // Normalize to 30 minutes
        this.learningMetrics.engagement = Math.round((interactionScore * 0.6) + (timeScore * 0.4));
        
        // Progress speed (sections per minute)
        if (totalTime > 0) {
            this.learningMetrics.progressSpeed = Math.round((totalSections / (totalTime / 60)) * 10) / 10;
        }
        
        // Consistency score (return visits)
        const totalVisits = Object.values(this.sessionData.sections)
            .reduce((sum, section) => sum + section.visits, 0);
        this.learningMetrics.consistencyScore = Math.min(totalVisits / totalSections, 5) * 20; // Max 5 visits per section
    }
    
    setupAchievementDetection() {
        setInterval(() => {
            this.checkAchievements();
        }, 10000); // Check every 10 seconds
    }
    
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.sessionData.achievements.includes(achievement.id)) {
                if (this.hasEarnedAchievement(achievement.id)) {
                    this.awardAchievement(achievement);
                }
            }
        });
    }
    
    hasEarnedAchievement(achievementId) {
        switch (achievementId) {
            case 'first_visit':
                return true; // Always award on first run
                
            case 'text_reader':
                return this.sessionData.sections['biblical-text']?.visits >= 1;
                
            case 'tree_explorer':
                const treeInteractions = this.sessionData.interactions.filter(
                    interaction => interaction.type === 'tree_click'
                ).length;
                return treeInteractions >= 4; // All 4 trees
                
            case 'quiz_master':
                return this.sessionData.assessments.quiz?.percentage >= 80;
                
            case 'commentary_scholar':
                return this.sessionData.sections['commentary']?.visits >= 3;
                
            case 'infographics_navigator':
                const infographicsTime = this.sessionData.timeSpent['infographics'] || 0;
                return infographicsTime >= 120; // 2 minutes
                
            case 'contemporary_thinker':
                return this.sessionData.sections['contemporary']?.visits >= 2;
                
            case 'education_enthusiast':
                return this.sessionData.sections['education']?.visits >= 1;
                
            default:
                return false;
        }
    }
    
    awardAchievement(achievement) {
        this.sessionData.achievements.push(achievement.id);
        this.showAchievementNotification(achievement);
        this.saveData();
        
        // Trigger achievement event for other systems
        document.dispatchEvent(new CustomEvent('achievement-earned', {
            detail: achievement
        }));
    }
    
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>הישג חדש!</h4>
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    initializeProgressGoals() {
        return [
            { id: 'complete_reading', name: 'קריאת הטקסט', target: 1, current: 0, type: 'section_visit' },
            { id: 'explore_trees', name: 'חקירת העצים', target: 4, current: 0, type: 'tree_interactions' },
            { id: 'pass_quiz', name: 'עבר חידון', target: 80, current: 0, type: 'quiz_score' },
            { id: 'study_commentary', name: 'לימוד פרשנות', target: 300, current: 0, type: 'time_spent' },
            { id: 'explore_infographics', name: 'תרשימים אינטראקטיביים', target: 5, current: 0, type: 'interactions' }
        ];
    }
    
    updateProgressGoals() {
        this.progressGoals.forEach(goal => {
            switch (goal.type) {
                case 'section_visit':
                    goal.current = this.sessionData.sections['biblical-text']?.visits || 0;
                    break;
                case 'tree_interactions':
                    goal.current = this.sessionData.interactions.filter(
                        i => i.type === 'tree_click'
                    ).length;
                    break;
                case 'quiz_score':
                    goal.current = this.sessionData.assessments.quiz?.percentage || 0;
                    break;
                case 'time_spent':
                    goal.current = this.sessionData.timeSpent['commentary'] || 0;
                    break;
                case 'interactions':
                    goal.current = this.sessionData.interactions.filter(
                        i => i.type === 'infographics_interaction'
                    ).length;
                    break;
            }
        });
    }
    
    generateRecommendations() {
        this.personalizedRecommendations = [];
        
        // Based on learning metrics
        if (this.learningMetrics.comprehension < 50) {
            this.personalizedRecommendations.push({
                type: 'study',
                title: 'חזק את ההבנה',
                description: 'מומלץ לחזור על הטקסט המקראי ולקרוא פרשנויות בסיסיות',
                action: 'עבור לקטע הפרשנות',
                target: '#commentary'
            });
        }
        
        if (this.learningMetrics.engagement < 40) {
            this.personalizedRecommendations.push({
                type: 'engagement',
                title: 'חקור יותר',
                description: 'נסה להשתמש בתרשימים האינטראקטיביים ובמשאבי המולטימדיה',
                action: 'עבור לתרשימים',
                target: '#infographics'
            });
        }
        
        // Based on section coverage
        const uncoveredSections = ['biblical-text', 'analysis', 'commentary', 'contemporary', 'education']
            .filter(section => !this.sessionData.sections[section]);
            
        if (uncoveredSections.length > 0) {
            this.personalizedRecommendations.push({
                type: 'exploration',
                title: 'גלה תכנים נוספים',
                description: `עדיין לא ביקרת ב-${uncoveredSections.length} קטעים נוספים`,
                action: 'המשך חקירה',
                target: `#${uncoveredSections[0]}`
            });
        }
        
        // Based on quiz performance
        if (!this.sessionData.assessments.quiz) {
            this.personalizedRecommendations.push({
                type: 'assessment',
                title: 'בדוק את הידע שלך',
                description: 'נסה את החידון לבדיקת ההבנה שלך',
                action: 'התחל חידון',
                target: 'quiz'
            });
        }
    }
    
    createAnalyticsInterface() {
        // Create analytics button
        const analyticsBtn = document.createElement('button');
        analyticsBtn.className = 'analytics-toggle-btn';
        analyticsBtn.innerHTML = `
            <i class="fas fa-chart-line"></i>
            <span>ההתקדמות שלי</span>
        `;
        analyticsBtn.onclick = () => this.toggleAnalyticsPanel();
        
        // Add to navigation or create floating button
        const nav = document.querySelector('.navbar .container');
        if (nav) {
            nav.appendChild(analyticsBtn);
        }
        
        // Create analytics panel
        this.createAnalyticsPanel();
    }
    
    createAnalyticsPanel() {
        const panel = document.createElement('div');
        panel.className = 'analytics-panel hidden';
        panel.innerHTML = `
            <div class="analytics-header">
                <h3><i class="fas fa-chart-line"></i> ההתקדמות שלי</h3>
                <button class="close-analytics-btn" onclick="yotamAnalytics.toggleAnalyticsPanel()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="analytics-content">
                <!-- Learning Metrics -->
                <div class="metrics-section">
                    <h4>מדדי למידה</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-icon"><i class="fas fa-brain"></i></div>
                            <div class="metric-data">
                                <span class="metric-value">${this.learningMetrics.comprehension}%</span>
                                <span class="metric-label">הבנה</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon"><i class="fas fa-heart"></i></div>
                            <div class="metric-data">
                                <span class="metric-value">${this.learningMetrics.engagement}%</span>
                                <span class="metric-label">מעורבות</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon"><i class="fas fa-rocket"></i></div>
                            <div class="metric-data">
                                <span class="metric-value">${this.learningMetrics.progressSpeed}</span>
                                <span class="metric-label">מהירות</span>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon"><i class="fas fa-sync"></i></div>
                            <div class="metric-data">
                                <span class="metric-value">${Math.round(this.learningMetrics.consistencyScore)}%</span>
                                <span class="metric-label">עקביות</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Progress Goals -->
                <div class="goals-section">
                    <h4>יעדי התקדמות</h4>
                    <div id="progress-goals" class="goals-list"></div>
                </div>
                
                <!-- Achievements -->
                <div class="achievements-section">
                    <h4>הישגים (${this.sessionData.achievements.length}/${this.achievements.length})</h4>
                    <div id="achievements-display" class="achievements-grid"></div>
                </div>
                
                <!-- Recommendations -->
                <div class="recommendations-section">
                    <h4>המלצות אישיות</h4>
                    <div id="recommendations-display" class="recommendations-list"></div>
                </div>
                
                <!-- Study Time -->
                <div class="time-section">
                    <h4>זמן למידה</h4>
                    <div id="time-breakdown" class="time-chart"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.analyticsPanel = panel;
    }
    
    toggleAnalyticsPanel() {
        if (!this.analyticsPanel) return;
        
        this.analyticsPanel.classList.toggle('hidden');
        
        if (!this.analyticsPanel.classList.contains('hidden')) {
            this.updateAnalyticsDisplay();
        }
    }
    
    updateAnalyticsDisplay() {
        this.calculateLearningMetrics();
        this.updateProgressGoals();
        this.generateRecommendations();
        
        // Update metrics display
        this.updateMetricsDisplay();
        
        // Update progress goals
        this.updateGoalsDisplay();
        
        // Update achievements display
        this.updateAchievementsDisplay();
        
        // Update recommendations
        this.updateRecommendationsDisplay();
        
        // Update time breakdown
        this.updateTimeDisplay();
    }
    
    updateMetricsDisplay() {
        const metricsCards = this.analyticsPanel.querySelectorAll('.metric-value');
        if (metricsCards.length >= 4) {
            metricsCards[0].textContent = `${this.learningMetrics.comprehension}%`;
            metricsCards[1].textContent = `${this.learningMetrics.engagement}%`;
            metricsCards[2].textContent = this.learningMetrics.progressSpeed.toString();
            metricsCards[3].textContent = `${Math.round(this.learningMetrics.consistencyScore)}%`;
        }
    }
    
    updateGoalsDisplay() {
        const goalsContainer = this.analyticsPanel.querySelector('#progress-goals');
        if (!goalsContainer) return;
        
        goalsContainer.innerHTML = this.progressGoals.map(goal => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100);
            const isCompleted = percentage >= 100;
            
            return `
                <div class="goal-item ${isCompleted ? 'completed' : ''}">
                    <div class="goal-header">
                        <span class="goal-name">${goal.name}</span>
                        <span class="goal-progress">${goal.current}/${goal.target}</span>
                    </div>
                    <div class="goal-progress-bar">
                        <div class="goal-progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    ${isCompleted ? '<i class="fas fa-check goal-check"></i>' : ''}
                </div>
            `;
        }).join('');
    }
    
    updateAchievementsDisplay() {
        const achievementsContainer = this.analyticsPanel.querySelector('#achievements-display');
        if (!achievementsContainer) return;
        
        achievementsContainer.innerHTML = this.achievements.map(achievement => {
            const isEarned = this.sessionData.achievements.includes(achievement.id);
            
            return `
                <div class="achievement-badge ${isEarned ? 'earned' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-name">${achievement.name}</div>
                    ${isEarned ? '' : '<div class="achievement-lock"><i class="fas fa-lock"></i></div>'}
                </div>
            `;
        }).join('');
    }
    
    updateRecommendationsDisplay() {
        const recommendationsContainer = this.analyticsPanel.querySelector('#recommendations-display');
        if (!recommendationsContainer) return;
        
        if (this.personalizedRecommendations.length === 0) {
            recommendationsContainer.innerHTML = `
                <div class="no-recommendations">
                    <i class="fas fa-star"></i>
                    <p>כל הכבוד! אתה מתקדם מצוין!</p>
                </div>
            `;
            return;
        }
        
        recommendationsContainer.innerHTML = this.personalizedRecommendations.map(rec => `
            <div class="recommendation-card recommendation-${rec.type}">
                <div class="recommendation-content">
                    <h5>${rec.title}</h5>
                    <p>${rec.description}</p>
                </div>
                <button class="recommendation-action" onclick="yotamAnalytics.followRecommendation('${rec.target}')">
                    ${rec.action}
                </button>
            </div>
        `).join('');
    }
    
    updateTimeDisplay() {
        const timeContainer = this.analyticsPanel.querySelector('#time-breakdown');
        if (!timeContainer) return;
        
        const totalTime = Object.values(this.sessionData.timeSpent).reduce((sum, time) => sum + time, 0);
        
        if (totalTime === 0) {
            timeContainer.innerHTML = '<p>טרם נרשם זמן למידה</p>';
            return;
        }
        
        const timeData = Object.entries(this.sessionData.timeSpent)
            .filter(([_, time]) => time > 0)
            .map(([section, time]) => ({
                section: this.getSectionName(section),
                time: Math.round(time / 60), // Convert to minutes
                percentage: (time / totalTime) * 100
            }))
            .sort((a, b) => b.time - a.time);
        
        timeContainer.innerHTML = `
            <div class="total-time">
                <strong>זמן כולל: ${Math.round(totalTime / 60)} דקות</strong>
            </div>
            <div class="time-breakdown-list">
                ${timeData.map(item => `
                    <div class="time-item">
                        <div class="time-label">${item.section}</div>
                        <div class="time-bar">
                            <div class="time-fill" style="width: ${item.percentage}%"></div>
                        </div>
                        <div class="time-value">${item.time} דק'</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    getSectionName(sectionId) {
        const names = {
            'home': 'עמוד הבית',
            'biblical-text': 'הטקסט המקראי',
            'analysis': 'פירוש ואנליזה',
            'infographics': 'תרשימים אינטראקטיביים',
            'commentary': 'פרשנויות',
            'contemporary': 'אקטואליה',
            'education': 'לימוד והוראה'
        };
        return names[sectionId] || sectionId;
    }
    
    followRecommendation(target) {
        if (target === 'quiz') {
            if (typeof startQuiz === 'function') {
                startQuiz();
            }
        } else {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                this.toggleAnalyticsPanel(); // Close panel
            }
        }
        
        this.recordEvent('recommendation_followed', { target: target });
    }
    
    scheduleDataSync() {
        // Save data every 30 seconds
        setInterval(() => {
            this.saveData();
        }, 30000);
        
        // Save before page unload
        window.addEventListener('beforeunload', () => {
            this.saveData();
        });
    }
    
    exportData() {
        const exportData = {
            userId: this.userId,
            sessionData: this.sessionData,
            learningMetrics: this.learningMetrics,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yotam-learning-data-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    resetProgress() {
        if (confirm('האם אתה בטוח שברצונך לאפס את כל נתוני ההתקדמות?')) {
            localStorage.removeItem(`yotam_analytics_${this.userId}`);
            location.reload();
        }
    }
}

// Initialize analytics system
document.addEventListener('DOMContentLoaded', function() {
    window.yotamAnalytics = new YotamLearningAnalytics();
    console.log('🎯 מערכת אנליטיקת למידה מתקדמת הופעלה');
});

// Export class
window.YotamLearningAnalytics = YotamLearningAnalytics;
