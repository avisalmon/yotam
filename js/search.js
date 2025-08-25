/**
 * Advanced Search System for Yotam's Parable Website
 * Handles Hebrew text search with nikud normalization
 */

class YotamSearch {
    constructor() {
        this.searchIndex = [];
        this.searchResults = [];
        this.currentQuery = '';
        this.filters = {
            category: 'all',
            type: 'all'
        };
        
        this.init();
    }

    /**
     * Initialize the search system
     */
    async init() {
        await this.buildSearchIndex();
        this.setupEventListeners();
        this.setupSearchInterface();
    }

    /**
     * Build comprehensive search index from all content
     */
    async buildSearchIndex() {
        const pages = [
            {
                url: 'index.html',
                title: 'עמוד הבית - משל יותם',
                category: 'home',
                type: 'main'
            },
            {
                url: 'blog.html',
                title: 'בלוג - מאמרים ופוסטים',
                category: 'blog',
                type: 'articles'
            },
            {
                url: 'resources/lesson-plans.html',
                title: 'מערכי שיעור',
                category: 'education',
                type: 'lessons'
            },
            {
                url: 'resources/activities.html',
                title: 'פעילויות יצירתיות',
                category: 'education',
                type: 'activities'
            },
            {
                url: 'resources/assessment.html',
                title: 'כלי הערכה',
                category: 'education',
                type: 'assessment'
            }
        ];

        // Add biblical content entries
        this.addBiblicalContent();
        
        // Add commentary entries
        this.addCommentaryContent();
        
        // Add modern relevance entries
        this.addModernRelevanceContent();
        
        // Process pages and extract content
        for (const page of pages) {
            try {
                const content = await this.extractPageContent(page.url);
                this.searchIndex.push({
                    ...page,
                    content: this.normalizeHebrewText(content),
                    searchableText: this.createSearchableText(content),
                    keywords: this.extractKeywords(content)
                });
            } catch (error) {
                console.warn(`Could not index ${page.url}:`, error);
            }
        }

        console.log(`Search index built with ${this.searchIndex.length} entries`);
    }

    /**
     * Add biblical content to search index
     */
    addBiblicalContent() {
        const biblicalEntries = [
            {
                url: 'index.html#biblical-text',
                title: 'הטקסט המקראי - שופטים ט',
                category: 'biblical',
                type: 'text',
                content: 'הלכו העצים למשח עליהם מלך ויאמרו לזית מלכה עלינו ויאמר להם הזית החדלתי את דשני אשר בי יכבדו אלהים ואנשים והלכתי לנוע על העצים',
                keywords: ['זית', 'תאנה', 'גפן', 'אטד', 'מלך', 'שופטים', 'יותם', 'גדעון']
            },
            {
                url: 'index.html#parable-analysis',
                title: 'ניתוח המשל - הסמלים והמשמעות',
                category: 'analysis',
                type: 'interpretation',
                content: 'עץ הזית מסמל מנהיג ראוי עם ערכים, התאנה מייצגת מתיקות וטוב לב, הגפן משמעה שמחה ויין טוב',
                keywords: ['סמלים', 'משמעות', 'פרשנות', 'עצים', 'מנהיגות']
            }
        ];

        this.searchIndex.push(...biblicalEntries);
    }

    /**
     * Add commentary content to search index
     */
    addCommentaryContent() {
        const commentaryEntries = [
            {
                url: 'index.html#commentary-rashi',
                title: 'פירוש רש"י למשל',
                category: 'commentary',
                type: 'classical',
                content: 'רש"י מפרש: הזית הוא עתניאל בן קנז, התאנה דבורה הנביאה, הגפן גדעון אביו של יותם',
                keywords: ['רש"י', 'עתניאל', 'דבורה', 'פרשנות קלאסית']
            },
            {
                url: 'index.html#commentary-radak',
                title: 'פירוש רד"ק למשל',
                category: 'commentary', 
                type: 'classical',
                content: 'רד"ק רואה בעצים את שלושת הדורות: גדעון, בנו ונכדו שיכלו למלוך',
                keywords: ['רד"ק', 'דורות', 'גדעון', 'מלוכה']
            },
            {
                url: 'index.html#commentary-abarbanel',
                title: 'פירוש אברבנאל למשל',
                category: 'commentary',
                type: 'classical',
                content: 'אברבנאל מדגיש ביקורת על סדר בחירת המנהיגות וחשיבות המועמדים הראויים',
                keywords: ['אברבנאל', 'ביקורת', 'מנהיגות', 'בחירה']
            }
        ];

        this.searchIndex.push(...commentaryEntries);
    }

    /**
     * Add modern relevance content to search index
     */
    addModernRelevanceContent() {
        const modernEntries = [
            {
                url: 'index.html#modern-leadership',
                title: 'מנהיגות במאה ה-21',
                category: 'modern',
                type: 'relevance',
                content: 'המשל רלוונטי לדמוקרטיה מודרנית: סכנות פופוליזם, חשיבות מנהיגים ערכיים, אחריות הציבור',
                keywords: ['דמוקרטיה', 'פופוליזם', 'מנהיגים ערכיים', 'אחריות ציבורית']
            },
            {
                url: 'index.html#contemporary-politics',
                title: 'פוליטיקה עכשווית',
                category: 'modern',
                type: 'politics',
                content: 'דוגמאות מהפוליטיקה הישראלית והעולמית למשל יותם: עליית מנהיגים לא ראויים כשהטובים נמנעים',
                keywords: ['פוליטיקה', 'ישראל', 'עולם', 'מנהיגים לא ראויים']
            }
        ];

        this.searchIndex.push(...modernEntries);
    }

    /**
     * Extract content from a page (simulate for now)
     */
    async extractPageContent(url) {
        // In a real implementation, this would fetch and parse the actual page content
        // For now, return placeholder content based on URL
        const contentMap = {
            'index.html': 'עמוד הבית של משל יותם עם כל התכנים החינוכיים והאינטראקטיביים',
            'blog.html': 'בלוג עם מאמרים על המשל ורלוונטיות לימינו',
            'resources/lesson-plans.html': 'מערכי שיעור לכל הגילאים על המשל המקראי',
            'resources/activities.html': 'פעילויות יצירתיות ואינטראקטיביות למשל יותם',
            'resources/assessment.html': 'כלי הערכה ובחינה להבנת המשל'
        };

        return contentMap[url] || 'תוכן עמוד';
    }

    /**
     * Normalize Hebrew text for better search matching
     */
    normalizeHebrewText(text) {
        if (!text) return '';
        
        // Remove nikud (Hebrew diacritics)
        let normalized = text.replace(/[\u0591-\u05C7]/g, '');
        
        // Normalize final letters
        const finalLetters = {
            'ך': 'כ',
            'ם': 'מ', 
            'ן': 'נ',
            'ף': 'פ',
            'ץ': 'צ'
        };
        
        for (const [final, regular] of Object.entries(finalLetters)) {
            normalized = normalized.replace(new RegExp(final, 'g'), regular);
        }
        
        // Remove extra whitespace
        normalized = normalized.replace(/\s+/g, ' ').trim();
        
        return normalized;
    }

    /**
     * Create searchable text with both Hebrew and English terms
     */
    createSearchableText(content) {
        const normalized = this.normalizeHebrewText(content);
        
        // Add common English equivalents for Hebrew terms
        const translations = {
            'יותם': 'jotham yotam',
            'משל': 'parable mashal',
            'זית': 'olive zayit',
            'תאנה': 'fig teena',
            'גפן': 'vine gefen',
            'אטד': 'bramble atad',
            'מלך': 'king melech',
            'מנהיגות': 'leadership manhigut',
            'שופטים': 'judges shoftim'
        };
        
        let searchable = normalized;
        for (const [hebrew, english] of Object.entries(translations)) {
            if (normalized.includes(hebrew)) {
                searchable += ' ' + english;
            }
        }
        
        return searchable.toLowerCase();
    }

    /**
     * Extract keywords from content
     */
    extractKeywords(content) {
        const normalized = this.normalizeHebrewText(content);
        const commonWords = ['של', 'את', 'על', 'אל', 'בה', 'לו', 'מה', 'זה', 'היא', 'הוא'];
        
        const words = normalized.split(/\s+/)
            .filter(word => word.length > 2)
            .filter(word => !commonWords.includes(word))
            .slice(0, 10); // Take top 10 keywords
            
        return words;
    }

    /**
     * Perform search with query and filters
     */
    search(query, filters = {}) {
        this.currentQuery = query.trim();
        this.filters = { ...this.filters, ...filters };
        
        if (!this.currentQuery) {
            this.searchResults = [];
            return [];
        }

        const normalizedQuery = this.normalizeHebrewText(query).toLowerCase();
        const queryTerms = normalizedQuery.split(/\s+/);
        
        const results = this.searchIndex
            .map(item => ({
                ...item,
                relevance: this.calculateRelevance(item, queryTerms, normalizedQuery)
            }))
            .filter(item => item.relevance > 0)
            .filter(item => this.matchesFilters(item))
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 20); // Limit to top 20 results
        
        this.searchResults = results;
        return results;
    }

    /**
     * Calculate relevance score for search result
     */
    calculateRelevance(item, queryTerms, normalizedQuery) {
        let score = 0;
        const searchText = item.searchableText || '';
        
        // Exact phrase match (highest score)
        if (searchText.includes(normalizedQuery)) {
            score += 100;
        }
        
        // Title matches (high score)
        const normalizedTitle = this.normalizeHebrewText(item.title).toLowerCase();
        if (normalizedTitle.includes(normalizedQuery)) {
            score += 50;
        }
        
        // Individual term matches
        queryTerms.forEach(term => {
            if (term.length > 1) {
                // Title term match
                if (normalizedTitle.includes(term)) {
                    score += 20;
                }
                // Content term match
                if (searchText.includes(term)) {
                    score += 10;
                }
                // Keyword match
                if (item.keywords && item.keywords.some(keyword => 
                    this.normalizeHebrewText(keyword).toLowerCase().includes(term))) {
                    score += 15;
                }
            }
        });
        
        // Category boost for exact category matches
        if (this.filters.category !== 'all' && item.category === this.filters.category) {
            score += 5;
        }
        
        return score;
    }

    /**
     * Check if item matches current filters
     */
    matchesFilters(item) {
        if (this.filters.category !== 'all' && item.category !== this.filters.category) {
            return false;
        }
        
        if (this.filters.type !== 'all' && item.type !== this.filters.type) {
            return false;
        }
        
        return true;
    }

    /**
     * Setup search interface and event listeners
     */
    setupSearchInterface() {
        // Create search interface if it doesn't exist
        if (!document.getElementById('search-container')) {
            this.createSearchInterface();
        }
        
        // Setup search suggestions
        this.setupSearchSuggestions();
    }

    /**
     * Create search interface elements
     */
    createSearchInterface() {
        const header = document.querySelector('header') || document.querySelector('nav');
        if (!header) return;
        
        const searchContainer = document.createElement('div');
        searchContainer.id = 'search-container';
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="search-input" placeholder="חפש במשל יותם..." autocomplete="off">
                <button type="button" id="search-button" aria-label="חיפוש">
                    <span class="search-icon">🔍</span>
                </button>
                <div id="search-suggestions" class="search-suggestions hidden"></div>
            </div>
            <div id="search-results" class="search-results hidden"></div>
        `;
        
        // Insert after the main navigation
        const nav = header.querySelector('nav') || header;
        nav.appendChild(searchContainer);
    }

    /**
     * Setup event listeners for search functionality
     */
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('search-input');
            const searchButton = document.getElementById('search-button');
            
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.handleSearchInput(e.target.value);
                });
                
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.performSearch(e.target.value);
                    }
                });
                
                searchInput.addEventListener('focus', () => {
                    this.showSearchSuggestions();
                });
            }
            
            if (searchButton) {
                searchButton.addEventListener('click', () => {
                    const query = searchInput ? searchInput.value : '';
                    this.performSearch(query);
                });
            }
            
            // Close suggestions when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideSearchSuggestions();
                    this.hideSearchResults();
                }
            });
        });
    }

    /**
     * Setup search suggestions system
     */
    setupSearchSuggestions() {
        this.suggestions = [
            'משל יותם', 'זית תאנה גפן', 'אטד קוצני', 'מנהיגות',
            'רש"י', 'אברבנאל', 'פרשנות', 'שופטים', 'גדעון',
            'דמוקרטיה', 'פוליטיקה', 'אקטואליה', 'חינוך'
        ];
    }

    /**
     * Handle search input with debouncing
     */
    handleSearchInput(query) {
        clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            if (query.length >= 2) {
                this.showSearchSuggestions(query);
            } else {
                this.hideSearchSuggestions();
            }
        }, 300);
    }

    /**
     * Show search suggestions
     */
    showSearchSuggestions(query = '') {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (!suggestionsContainer) return;
        
        let matchingSuggestions = this.suggestions;
        
        if (query) {
            const normalizedQuery = this.normalizeHebrewText(query).toLowerCase();
            matchingSuggestions = this.suggestions.filter(suggestion =>
                this.normalizeHebrewText(suggestion).toLowerCase().includes(normalizedQuery)
            );
        }
        
        if (matchingSuggestions.length === 0) {
            this.hideSearchSuggestions();
            return;
        }
        
        const suggestionsHTML = matchingSuggestions
            .slice(0, 5)
            .map(suggestion => `
                <div class="search-suggestion" data-suggestion="${suggestion}">
                    ${this.highlightMatch(suggestion, query)}
                </div>
            `).join('');
        
        suggestionsContainer.innerHTML = suggestionsHTML;
        suggestionsContainer.classList.remove('hidden');
        
        // Add click listeners to suggestions
        suggestionsContainer.querySelectorAll('.search-suggestion').forEach(el => {
            el.addEventListener('click', () => {
                this.performSearch(el.dataset.suggestion);
                this.hideSearchSuggestions();
            });
        });
    }

    /**
     * Hide search suggestions
     */
    hideSearchSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.add('hidden');
        }
    }

    /**
     * Perform search and display results
     */
    performSearch(query) {
        if (!query.trim()) return;
        
        const results = this.search(query);
        this.displaySearchResults(results, query);
        
        // Update search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = query;
        }
        
        this.hideSearchSuggestions();
        
        // Track search for analytics (placeholder)
        this.trackSearch(query, results.length);
    }

    /**
     * Display search results
     */
    displaySearchResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <h3>לא נמצאו תוצאות עבור "${query}"</h3>
                    <p>נסה לחפש עם מילות מפתח אחרות או ביטוי קצר יותר.</p>
                    <div class="search-suggestions-help">
                        <strong>הצעות לחיפוש:</strong>
                        <span class="suggestion-tags">
                            <span class="tag" onclick="yotamSearch.performSearch('משל יותם')">משל יותם</span>
                            <span class="tag" onclick="yotamSearch.performSearch('מנהיגות')">מנהיגות</span>
                            <span class="tag" onclick="yotamSearch.performSearch('זית תאנה')">זית תאנה</span>
                        </span>
                    </div>
                </div>
            `;
        } else {
            const resultsHTML = `
                <div class="search-results-header">
                    <h3>נמצאו ${results.length} תוצאות עבור "${query}"</h3>
                </div>
                <div class="search-results-list">
                    ${results.map(result => this.formatSearchResult(result, query)).join('')}
                </div>
            `;
            resultsContainer.innerHTML = resultsHTML;
        }
        
        resultsContainer.classList.remove('hidden');
        
        // Scroll results into view
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Format individual search result
     */
    formatSearchResult(result, query) {
        const snippet = this.createResultSnippet(result, query);
        const categoryLabel = this.getCategoryLabel(result.category);
        
        return `
            <div class="search-result-item" data-relevance="${result.relevance}">
                <div class="result-header">
                    <a href="${result.url}" class="result-title">
                        ${this.highlightMatch(result.title, query)}
                    </a>
                    <span class="result-category">${categoryLabel}</span>
                </div>
                <div class="result-snippet">${snippet}</div>
                <div class="result-meta">
                    <span class="result-url">${result.url}</span>
                </div>
            </div>
        `;
    }

    /**
     * Create result snippet with context
     */
    createResultSnippet(result, query) {
        const content = result.content || result.searchableText || '';
        const normalizedQuery = this.normalizeHebrewText(query).toLowerCase();
        const normalizedContent = this.normalizeHebrewText(content).toLowerCase();
        
        const index = normalizedContent.indexOf(normalizedQuery);
        if (index === -1) {
            return content.substring(0, 150) + '...';
        }
        
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + normalizedQuery.length + 50);
        
        let snippet = content.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';
        
        return this.highlightMatch(snippet, query);
    }

    /**
     * Highlight matching terms in text
     */
    highlightMatch(text, query) {
        if (!query) return text;
        
        const normalizedQuery = this.normalizeHebrewText(query);
        const terms = normalizedQuery.split(/\s+/).filter(term => term.length > 1);
        
        let highlighted = text;
        terms.forEach(term => {
            const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark class="search-highlight">$1</mark>');
        });
        
        return highlighted;
    }

    /**
     * Escape special regex characters
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Get category label in Hebrew
     */
    getCategoryLabel(category) {
        const labels = {
            'home': 'עמוד הבית',
            'biblical': 'טקסט מקראי',
            'commentary': 'פרשנות',
            'analysis': 'ניתוח',
            'modern': 'אקטואליה',
            'education': 'חינוך',
            'blog': 'בלוג',
            'activities': 'פעילויות',
            'lessons': 'שיעורים',
            'assessment': 'הערכה'
        };
        
        return labels[category] || 'כללי';
    }

    /**
     * Hide search results
     */
    hideSearchResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.classList.add('hidden');
        }
    }

    /**
     * Track search for analytics
     */
    trackSearch(query, resultCount) {
        // In a real implementation, this would send data to analytics service
        console.log(`Search: "${query}" - ${resultCount} results`);
        
        // Store in localStorage for basic analytics
        const searches = JSON.parse(localStorage.getItem('yotam_searches') || '[]');
        searches.push({
            query,
            resultCount,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 searches
        if (searches.length > 100) {
            searches.splice(0, searches.length - 100);
        }
        
        localStorage.setItem('yotam_searches', JSON.stringify(searches));
    }
}

// Initialize search system
const yotamSearch = new YotamSearch();

// Make search available globally
window.yotamSearch = yotamSearch;
