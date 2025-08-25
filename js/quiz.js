// Quiz JavaScript - משל יותם
// Interactive quiz functionality for testing knowledge

class YotamQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 0;
        this.questions = [];
        this.userAnswers = [];
        this.quizContainer = null;
        
        this.initializeQuestions();
    }
    
    initializeQuestions() {
        this.questions = [
            {
                question: "איזה עץ סירב ראשון למלוך על העצים?",
                options: [
                    "התאנה",
                    "הזית",
                    "הגפן",
                    "האטד"
                ],
                correct: 1,
                explanation: "הזית היה העץ הראשון שאליו פנו העצים, והוא סירב באמרו 'החדלתי את דשני אשר בי יכבדו אלהים ואנשים'."
            },
            {
                question: "מה סימלה הגפן במשל?",
                options: [
                    "שמן זית לאור",
                    "יין המשמח לב",
                    "פרי מתוק",
                    "צל מקרר"
                ],
                correct: 1,
                explanation: "הגפן סימלה את היין המשמח - 'החדלתי את תירושי המשמח אלהים ואנשים'."
            },
            {
                question: "איזה עץ הסכים למלוך על העצים?",
                options: [
                    "הזית",
                    "התאנה", 
                    "הגפן",
                    "האטד"
                ],
                correct: 3,
                explanation: "האטד (השיח הקוצני) היה היחיד שהסכים למלוך, ואף איים באש אם לא יכבדוהו."
            },
            {
                question: "על איזה הר עמד יותם כשאמר את המשל?",
                options: [
                    "הר סיני",
                    "הר גריזים",
                    "הר הזיתים",
                    "הר תבור"
                ],
                correct: 1,
                explanation: "יותם עמד על הר גריזים כשקרא את משלו לבני שכם."
            },
            {
                question: "לפי פרשנות חז\"ל, את מי סימל עץ הזית?",
                options: [
                    "גדעון",
                    "דבורה",
                    "עתניאל בן קנז",
                    "אבימלך"
                ],
                correct: 2,
                explanation: "לפי חז\"ל, הזית סימל את עתניאל בן קנז, השופט הראשון אחרי יהושע."
            },
            {
                question: "מה איים האטד שיקרה אם לא ימליכו אותו?",
                options: [
                    "ייבש מן הארץ",
                    "יצא אש ותאכל את ארזי הלבנון",
                    "יברח למדבר",
                    "ישרוף את העיר שכם"
                ],
                correct: 1,
                explanation: "האטד איים: 'ואם אין תצא אש מן האטד ותאכל את ארזי הלבנון'."
            },
            {
                question: "איזו תכונה לא הייתה לאטד?",
                options: [
                    "קוצים",
                    "יכולת להתלקח מהר",
                    "צל נעים ורחב",
                    "עמידות בתנאים קשים"
                ],
                correct: 2,
                explanation: "לאטד לא היה צל ממשי - זו הייתה הבטחה שווא שהציע לעצים."
            },
            {
                question: "מי היה אבי יותם?",
                options: [
                    "שמשון",
                    "גדעון (ירובעל)",
                    "דוד",
                    "שאול"
                ],
                correct: 1,
                explanation: "יותם היה בנו של גדעון (הנקרא גם ירובעל), היחיד שניצל מרצח אבימלך."
            },
            {
                question: "איזה מסר מרכזי עולה מהמשל?",
                options: [
                    "עצים לא יכולים לדבר",
                    "הטובים שמונעים מלהוביל מאפשרים לרעים לשלוט",
                    "המלוכה רעה בעקרון",
                    "יותם היה נביא"
                ],
                correct: 1,
                explanation: "המסר המרכזי הוא שכאשר האנשים הטובים מסרבים לקחת אחריות מנהיגותית, הרעים יכולים להשתלט."
            },
            {
                question: "איזו מעלה ייחודית הייתה לכל עץ ממלא חוץ מהאטד?",
                options: [
                    "כולם היו גבוהים",
                    "כולם נתנו צל",
                    "כולם תרמו משהו מועיל לחברה",
                    "כולם צמחו מהר"
                ],
                correct: 2,
                explanation: "הזית נתן שמן, התאנה פרי מתוק, והגפן יין משמח - כולם תרמו למען הכלל, בניגוד לאטד."
            }
        ];
        
        this.totalQuestions = this.questions.length;
    }
    
    createQuizInterface() {
        this.quizContainer = document.createElement('div');
        this.quizContainer.className = 'quiz-container';
        this.quizContainer.innerHTML = `
            <div class="quiz-modal">
                <div class="quiz-header">
                    <h3><i class="fas fa-question-circle"></i> חידון משל יותם</h3>
                    <button class="close-quiz" onclick="yotamQuiz.closeQuiz()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="quiz-content">
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <div class="question-counter">
                            <span class="current-q">1</span> מתוך <span class="total-q">${this.totalQuestions}</span>
                        </div>
                    </div>
                    <div class="question-container">
                        <!-- Question content will be inserted here -->
                    </div>
                    <div class="quiz-navigation">
                        <button class="quiz-btn" id="nextBtn" onclick="yotamQuiz.nextQuestion()" disabled>
                            <i class="fas fa-arrow-left"></i>
                            הבא
                        </button>
                    </div>
                </div>
                <div class="quiz-results hidden">
                    <!-- Results will be shown here -->
                </div>
            </div>
        `;
        
        document.body.appendChild(this.quizContainer);
        this.addQuizStyles();
        this.showQuestion();
        
        // Send analytics event for quiz start
        if (window.yotamAnalytics) {
            document.dispatchEvent(new CustomEvent('quiz-started', {
                detail: {
                    totalQuestions: this.totalQuestions,
                    timestamp: Date.now()
                }
            }));
        }
    }
    
    addQuizStyles() {
        const styles = `
            .quiz-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
                box-sizing: border-box;
                direction: rtl;
            }
            
            .quiz-modal {
                background: var(--pure-white);
                border-radius: var(--border-radius-lg);
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-xl);
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    transform: scale(0.8) translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
            
            .quiz-header {
                background: var(--hero-gradient);
                color: var(--pure-white);
                padding: var(--spacing-md);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
            }
            
            .quiz-header h3 {
                margin: 0;
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
            
            .close-quiz {
                background: none;
                border: none;
                color: var(--pure-white);
                font-size: var(--font-size-xl);
                cursor: pointer;
                padding: var(--spacing-xs);
                border-radius: var(--border-radius);
                transition: background 0.3s ease;
            }
            
            .close-quiz:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .quiz-content {
                padding: var(--spacing-lg);
            }
            
            .quiz-progress {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--spacing-lg);
            }
            
            .progress-bar {
                flex: 1;
                height: 8px;
                background: var(--light-beige);
                border-radius: var(--border-radius-full);
                margin-left: var(--spacing-md);
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: var(--hero-gradient);
                border-radius: var(--border-radius-full);
                transition: width 0.3s ease;
            }
            
            .question-counter {
                font-weight: 600;
                color: var(--olive-green);
                white-space: nowrap;
            }
            
            .question-container {
                margin-bottom: var(--spacing-lg);
            }
            
            .question-text {
                font-size: var(--font-size-lg);
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: var(--spacing-lg);
                line-height: 1.6;
            }
            
            .options-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .option-item {
                margin-bottom: var(--spacing-sm);
            }
            
            .option-button {
                width: 100%;
                text-align: right;
                padding: var(--spacing-md);
                background: var(--light-beige);
                border: 2px solid transparent;
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: var(--font-size-base);
                position: relative;
                overflow: hidden;
            }
            
            .option-button:hover {
                background: var(--pure-white);
                border-color: var(--olive-green);
                transform: translateX(-5px);
                box-shadow: var(--shadow-sm);
            }
            
            .option-button.selected {
                background: var(--olive-green);
                color: var(--pure-white);
                border-color: var(--earth-brown);
            }
            
            .option-button.correct {
                background: var(--forest-green);
                color: var(--pure-white);
                border-color: #1a5d1a;
            }
            
            .option-button.incorrect {
                background: var(--deep-red);
                color: var(--pure-white);
                border-color: #a04444;
            }
            
            .option-button.disabled {
                cursor: not-allowed;
                opacity: 0.7;
            }
            
            .explanation {
                background: var(--light-beige);
                padding: var(--spacing-md);
                border-radius: var(--border-radius);
                margin-top: var(--spacing-md);
                border-right: 4px solid var(--golden-yellow);
                font-style: italic;
                color: var(--text-primary);
                line-height: 1.6;
            }
            
            .quiz-navigation {
                display: flex;
                justify-content: center;
                gap: var(--spacing-md);
                margin-top: var(--spacing-lg);
                padding-top: var(--spacing-lg);
                border-top: 1px solid var(--light-beige);
            }
            
            .quiz-btn {
                background: var(--olive-green);
                color: var(--pure-white);
                border: none;
                padding: var(--spacing-sm) var(--spacing-lg);
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);
                transition: all 0.3s ease;
            }
            
            .quiz-btn:hover:not(:disabled) {
                background: var(--earth-brown);
                transform: translateY(-2px);
                box-shadow: var(--shadow-md);
            }
            
            .quiz-btn:disabled {
                background: var(--text-light);
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }
            
            .quiz-results {
                padding: var(--spacing-lg);
                text-align: center;
            }
            
            .score-display {
                background: var(--hero-gradient);
                color: var(--pure-white);
                padding: var(--spacing-lg);
                border-radius: var(--border-radius-lg);
                margin-bottom: var(--spacing-lg);
            }
            
            .score-number {
                font-size: var(--font-size-4xl);
                font-weight: 800;
                margin-bottom: var(--spacing-sm);
            }
            
            .score-text {
                font-size: var(--font-size-lg);
                opacity: 0.9;
            }
            
            .performance-message {
                background: var(--light-beige);
                padding: var(--spacing-md);
                border-radius: var(--border-radius);
                margin-bottom: var(--spacing-lg);
                font-size: var(--font-size-lg);
                line-height: 1.6;
            }
            
            .results-actions {
                display: flex;
                gap: var(--spacing-md);
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .hidden {
                display: none !important;
            }
            
            @media (max-width: 768px) {
                .quiz-container {
                    padding: 10px;
                }
                
                .quiz-modal {
                    max-height: 95vh;
                }
                
                .quiz-content {
                    padding: var(--spacing-md);
                }
                
                .quiz-progress {
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                
                .progress-bar {
                    margin: 0;
                }
                
                .results-actions {
                    flex-direction: column;
                    align-items: center;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    showQuestion() {
        if (this.currentQuestion >= this.totalQuestions) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestion];
        const questionContainer = document.querySelector('.question-container');
        const progressFill = document.querySelector('.progress-fill');
        const currentQ = document.querySelector('.current-q');
        const nextBtn = document.getElementById('nextBtn');
        
        // Update progress
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        progressFill.style.width = progress + '%';
        currentQ.textContent = this.currentQuestion + 1;
        
        // Reset next button
        nextBtn.disabled = true;
        nextBtn.innerHTML = '<i class="fas fa-arrow-left"></i> הבא';
        
        // Show question
        questionContainer.innerHTML = `
            <div class="question-text">${question.question}</div>
            <ul class="options-list">
                ${question.options.map((option, index) => `
                    <li class="option-item">
                        <button class="option-button" data-option="${index}" onclick="yotamQuiz.selectOption(${index})">
                            ${option}
                        </button>
                    </li>
                `).join('')}
            </ul>
            <div class="explanation hidden"></div>
        `;
    }
    
    selectOption(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.option-button');
        const explanation = document.querySelector('.explanation');
        const nextBtn = document.getElementById('nextBtn');
        
        // Disable all options
        options.forEach((option, index) => {
            option.classList.add('disabled');
            option.onclick = null;
            
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                option.classList.add('incorrect');
            }
        });
        
        // Show explanation
        explanation.textContent = question.explanation;
        explanation.classList.remove('hidden');
        
        // Record answer
        this.userAnswers[this.currentQuestion] = selectedIndex;
        if (selectedIndex === question.correct) {
            this.score++;
        }
        
        // Enable next button
        nextBtn.disabled = false;
        
        // Change button text for last question
        if (this.currentQuestion === this.totalQuestions - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> סיים חידון';
        }
    }
    
    nextQuestion() {
        this.currentQuestion++;
        this.showQuestion();
    }
    
    showResults() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        let performanceMessage = '';
        let performanceClass = '';
        
        if (percentage >= 90) {
            performanceMessage = 'מצוין! אתה מכיר את משל יותם בצורה מעמיקה. כל הכבוד!';
            performanceClass = 'excellent';
        } else if (percentage >= 70) {
            performanceMessage = 'יפה מאוד! יש לך הבנה טובה של המשל ומשמעותו.';
            performanceClass = 'good';
        } else if (percentage >= 50) {
            performanceMessage = 'לא רע! כדאי לחזור ולקרוא את המשל ופרשנויותיו.';
            performanceClass = 'average';
        } else {
            performanceMessage = 'כדאי ללמוד עוד על המשל ומשמעותו. תחזור על החומר ונסה שוב!';
            performanceClass = 'needs-improvement';
        }
        
        const quizContent = document.querySelector('.quiz-content');
        const quizResults = document.querySelector('.quiz-results');
        
        quizContent.classList.add('hidden');
        quizResults.classList.remove('hidden');
        
        quizResults.innerHTML = `
            <div class="score-display ${performanceClass}">
                <div class="score-number">${this.score}/${this.totalQuestions}</div>
                <div class="score-text">${percentage}% נכון</div>
            </div>
            
            <div class="performance-message">
                ${performanceMessage}
            </div>
            
            <div class="results-actions">
                <button class="quiz-btn" onclick="yotamQuiz.restartQuiz()">
                    <i class="fas fa-redo"></i>
                    נסה שוב
                </button>
                <button class="quiz-btn" onclick="yotamQuiz.reviewAnswers()">
                    <i class="fas fa-eye"></i>
                    סקור תשובות
                </button>
                <button class="quiz-btn" onclick="yotamQuiz.closeQuiz()">
                    <i class="fas fa-times"></i>
                    סגור
                </button>
            </div>
        `;
        
        // Update progress to 100%
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = '100%';
        
        // Send analytics data if available
        if (window.yotamAnalytics) {
            // Dispatch custom event for analytics
            document.dispatchEvent(new CustomEvent('quiz-completed', {
                detail: {
                    score: this.score,
                    totalQuestions: this.totalQuestions,
                    percentage: percentage,
                    userAnswers: this.userAnswers,
                    timestamp: Date.now()
                }
            }));
        }
    }
    
    reviewAnswers() {
        const quizResults = document.querySelector('.quiz-results');
        
        let reviewHTML = `
            <h3><i class="fas fa-clipboard-list"></i> סקירת תשובות</h3>
            <div class="answers-review">
        `;
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            reviewHTML += `
                <div class="answer-review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-question">
                        <strong>שאלה ${index + 1}:</strong> ${question.question}
                    </div>
                    <div class="review-answer">
                        <div class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                            <strong>התשובה שלך:</strong> ${question.options[userAnswer] || 'לא נענה'}
                            <i class="fas fa-${isCorrect ? 'check' : 'times'}"></i>
                        </div>
                        ${!isCorrect ? `
                            <div class="correct-answer">
                                <strong>התשובה הנכונה:</strong> ${question.options[question.correct]}
                            </div>
                        ` : ''}
                        <div class="answer-explanation">
                            <strong>הסבר:</strong> ${question.explanation}
                        </div>
                    </div>
                </div>
            `;
        });
        
        reviewHTML += `
            </div>
            <div class="results-actions">
                <button class="quiz-btn" onclick="yotamQuiz.restartQuiz()">
                    <i class="fas fa-redo"></i>
                    נסה שוב
                </button>
                <button class="quiz-btn" onclick="yotamQuiz.closeQuiz()">
                    <i class="fas fa-times"></i>
                    סגור
                </button>
            </div>
        `;
        
        quizResults.innerHTML = reviewHTML;
        
        // Add styles for review
        const reviewStyles = `
            .answers-review {
                text-align: right;
                margin: var(--spacing-lg) 0;
            }
            
            .answer-review-item {
                border: 2px solid var(--light-beige);
                border-radius: var(--border-radius);
                padding: var(--spacing-md);
                margin-bottom: var(--spacing-md);
            }
            
            .answer-review-item.correct {
                border-color: var(--forest-green);
                background: rgba(34, 139, 34, 0.1);
            }
            
            .answer-review-item.incorrect {
                border-color: var(--deep-red);
                background: rgba(205, 92, 92, 0.1);
            }
            
            .review-question {
                margin-bottom: var(--spacing-sm);
                color: var(--text-primary);
            }
            
            .user-answer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--spacing-xs);
                border-radius: var(--border-radius);
                margin-bottom: var(--spacing-xs);
            }
            
            .user-answer.correct {
                background: rgba(34, 139, 34, 0.2);
                color: var(--forest-green);
            }
            
            .user-answer.incorrect {
                background: rgba(205, 92, 92, 0.2);
                color: var(--deep-red);
            }
            
            .correct-answer {
                background: rgba(34, 139, 34, 0.1);
                color: var(--forest-green);
                padding: var(--spacing-xs);
                border-radius: var(--border-radius);
                margin-bottom: var(--spacing-xs);
            }
            
            .answer-explanation {
                background: var(--light-beige);
                padding: var(--spacing-xs);
                border-radius: var(--border-radius);
                font-style: italic;
                color: var(--text-secondary);
                line-height: 1.5;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = reviewStyles;
        document.head.appendChild(styleElement);
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        const quizContent = document.querySelector('.quiz-content');
        const quizResults = document.querySelector('.quiz-results');
        
        quizResults.classList.add('hidden');
        quizContent.classList.remove('hidden');
        
        this.showQuestion();
    }
    
    closeQuiz() {
        if (this.quizContainer) {
            this.quizContainer.remove();
            this.quizContainer = null;
        }
    }
    
    // Method to start quiz from external button
    static startQuiz() {
        if (!window.yotamQuiz) {
            window.yotamQuiz = new YotamQuiz();
        }
        window.yotamQuiz.createQuizInterface();
    }
}

// Initialize quiz functionality
document.addEventListener('DOMContentLoaded', function() {
    window.yotamQuiz = new YotamQuiz();
    console.log('מערכת החידונים הופעלה');
});

// Global function for starting quiz
window.startQuiz = function() {
    YotamQuiz.startQuiz();
};

// Export class
window.YotamQuiz = YotamQuiz;
