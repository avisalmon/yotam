// ===== MULTIMEDIA GALLERY JAVASCRIPT =====

class MultimediaGallery {
    constructor() {
        this.currentFilter = 'all';
        this.currentModal = null;
        this.galleryItems = [];
        this.loadedItems = 12;
        this.itemsPerPage = 12;
        
        this.init();
    }
    
    init() {
        this.initializeGalleryItems();
        this.setupFilterButtons();
        this.setupModalSystem();
        this.setupLoadMore();
        this.setupKeyboardNavigation();
        this.setupSearchIntegration();
        this.preloadImages();
    }
    
    // Initialize gallery items data
    initializeGalleryItems() {
        this.galleryItems = [
            {
                id: 1,
                type: 'video',
                title: 'משל הזורע - הסבר אינטראקטיבי',
                description: 'סרטון הסבר מפורט על משל הזורע עם אנימציות ואיורים',
                category: 'videos',
                thumbnail: 'assets/thumbnails/sower-video.jpg',
                videoUrl: 'assets/videos/sower-parable.mp4',
                duration: '5:32',
                views: 1250,
                date: '2024-01-15'
            },
            {
                id: 2,
                type: 'image',
                title: 'איור משל בנה הבית על הסלע',
                description: 'איור מפורט המתאר את משל בנה הבית על הסלע מול הבנייה על החול',
                category: 'illustrations',
                thumbnail: 'assets/thumbnails/house-rock-illustration.jpg',
                fullImage: 'assets/images/house-rock-full.jpg',
                artist: 'צוות האיורים',
                date: '2024-01-10'
            },
            {
                id: 3,
                type: 'map',
                title: 'מפת ארץ ישראל בתקופת המשלים',
                description: 'מפה אינטראקטיבית המציגה את המקומות בהם נאמרו המשלים',
                category: 'maps',
                thumbnail: 'assets/thumbnails/israel-map.jpg',
                mapData: 'assets/maps/israel-parables.json',
                interactive: true,
                date: '2024-01-08'
            },
            {
                id: 4,
                type: 'audio',
                title: 'קריאת משל הרועה הטוב',
                description: 'הקלטה איכותית של קריאת משל הרועה הטוב בביצוע מקצועי',
                category: 'audio',
                audioUrl: 'assets/audio/good-shepherd.mp3',
                duration: '3:45',
                narrator: 'דוד כהן',
                date: '2024-01-05'
            },
            {
                id: 5,
                type: 'image',
                title: 'פסיפס עתיק - משל הכרם',
                description: 'תמונה של פסיפס עתיק המתאר את משל הכרם שנמצא בחפירות',
                category: 'historical',
                thumbnail: 'assets/thumbnails/vineyard-mosaic.jpg',
                fullImage: 'assets/images/vineyard-mosaic-full.jpg',
                location: 'כנסיית הלחם והדגים, טבריה',
                period: 'מאה 5-6 לספירה',
                date: '2024-01-03'
            },
            {
                id: 6,
                type: 'video',
                title: 'משל הדגים - סיור וירטואלי בכנרת',
                description: 'סיור וירטואלי בכנרת עם הסבר על משלי הדייגים והדגים',
                category: 'videos',
                thumbnail: 'assets/thumbnails/sea-galilee-tour.jpg',
                videoUrl: 'assets/videos/galilee-fishing.mp4',
                duration: '8:15',
                views: 890,
                date: '2024-01-01'
            },
            {
                id: 7,
                type: 'interactive',
                title: 'בנה את המקדש - משחק אינטראקטיבי',
                description: 'משחק אינטראקטיבי לילדים על בניית המקדש ומשמעותו',
                category: 'interactive',
                thumbnail: 'assets/thumbnails/temple-game.jpg',
                gameUrl: 'interactive/temple-builder.html',
                difficulty: 'קל-בינוני',
                ageRange: '8-14',
                date: '2023-12-28'
            },
            {
                id: 8,
                type: 'audio',
                title: 'משל הזורע - גרסת ילדים',
                description: 'הקלטה מיוחדת לילדים עם קולות ואפקטים קוליים',
                category: 'audio',
                audioUrl: 'assets/audio/sower-children.mp3',
                duration: '4:20',
                narrator: 'רחל לוי',
                targetAge: '4-8',
                date: '2023-12-25'
            },
            {
                id: 9,
                type: 'map',
                title: 'מסלולי הליכה בעקבות המשלים',
                description: 'מפת מסלולי טיול בארץ ישראל העוברים במקומות המשלים',
                category: 'maps',
                thumbnail: 'assets/thumbnails/walking-trails.jpg',
                mapData: 'assets/maps/parable-trails.json',
                interactive: true,
                trailLength: '25 ק"מ',
                difficulty: 'בינוני',
                date: '2023-12-22'
            },
            {
                id: 10,
                type: 'image',
                title: 'כלי עבודה מהתקופה המקראית',
                description: 'תמונות של כלי עבודה חקלאיים מהתקופה המקראית הקשורים למשלים',
                category: 'historical',
                thumbnail: 'assets/thumbnails/ancient-tools.jpg',
                fullImage: 'assets/images/ancient-tools-full.jpg',
                museum: 'המוזיאון לארכיאולוגיה, ירושלים',
                period: 'תקופה ביזנטית',
                date: '2023-12-20'
            },
            {
                id: 11,
                type: 'video',
                title: 'מסורת יהודית ומשלי חכמים',
                description: 'הרצאה על הקשר בין המשלים למסורת היהודית העתיקה',
                category: 'educational',
                thumbnail: 'assets/thumbnails/jewish-tradition.jpg',
                videoUrl: 'assets/videos/jewish-tradition-parables.mp4',
                duration: '12:30',
                lecturer: 'פרופ\' משה רוזן',
                views: 2150,
                date: '2023-12-18'
            },
            {
                id: 12,
                type: 'interactive',
                title: 'חידון משלים אינטראקטיבי',
                description: 'חידון מקיף על המשלים עם שאלות ברמות שונות',
                category: 'interactive',
                thumbnail: 'assets/thumbnails/parables-quiz.jpg',
                gameUrl: 'interactive/parables-quiz.html',
                questions: 50,
                difficulty: 'מתחילים עד מתקדמים',
                date: '2023-12-15'
            }
        ];
        
        this.renderGallery();
    }
    
    // Setup filter functionality
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                this.currentFilter = button.dataset.filter || 'all';
                
                // Filter gallery
                this.filterGallery();
                
                // Reset load more counter
                this.loadedItems = 12;
                this.updateLoadMoreButton();
            });
        });
    }
    
    // Filter gallery items
    filterGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            const itemCategory = item.dataset.category;
            const itemType = item.dataset.type;
            
            let shouldShow = false;
            
            if (this.currentFilter === 'all') {
                shouldShow = true;
            } else if (this.currentFilter === 'videos' && itemType === 'video') {
                shouldShow = true;
            } else if (this.currentFilter === 'images' && (itemType === 'image' || itemType === 'illustration')) {
                shouldShow = true;
            } else if (this.currentFilter === 'audio' && itemType === 'audio') {
                shouldShow = true;
            } else if (this.currentFilter === 'maps' && itemType === 'map') {
                shouldShow = true;
            } else if (this.currentFilter === 'interactive' && itemType === 'interactive') {
                shouldShow = true;
            } else if (this.currentFilter === 'historical' && itemCategory === 'historical') {
                shouldShow = true;
            } else if (this.currentFilter === 'educational' && itemCategory === 'educational') {
                shouldShow = true;
            }
            
            if (shouldShow) {
                item.classList.remove('hide');
                item.classList.add('show');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Render gallery items
    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        
        this.galleryItems.slice(0, this.loadedItems).forEach((item, index) => {
            const itemElement = this.createGalleryItem(item, index);
            galleryGrid.appendChild(itemElement);
        });
        
        this.updateLoadMoreButton();
    }
    
    // Create gallery item element
    createGalleryItem(item, index) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item show';
        itemDiv.dataset.category = item.category;
        itemDiv.dataset.type = item.type;
        itemDiv.dataset.id = item.id;
        itemDiv.style.animationDelay = `${index * 0.1}s`;
        
        let cardContent = '';
        let mediaPreview = '';
        let mediaInfo = '';
        
        if (item.type === 'video') {
            mediaPreview = `
                <div class="media-preview">
                    <img src="${item.thumbnail}" alt="${item.title}" />
                    <div class="media-overlay">
                        <button class="view-btn play-btn" onclick="multimediaGallery.openModal(${item.id})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
            `;
            
            mediaInfo = `
                <div class="media-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="video-meta">
                        <span><i class="fas fa-clock"></i> ${item.duration}</span>
                        <span><i class="fas fa-eye"></i> ${item.views.toLocaleString('he-IL')}</span>
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(item.date)}</span>
                    </div>
                </div>
            `;
        } else if (item.type === 'audio') {
            mediaPreview = `
                <div class="audio-preview">
                    <div class="audio-visual">
                        <i class="fas fa-music"></i>
                        <div class="sound-waves">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="media-overlay">
                        <button class="view-btn play-btn" onclick="multimediaGallery.openModal(${item.id})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
            `;
            
            mediaInfo = `
                <div class="media-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="audio-meta">
                        <span><i class="fas fa-clock"></i> ${item.duration}</span>
                        <span><i class="fas fa-microphone"></i> ${item.narrator}</span>
                        ${item.targetAge ? `<span><i class="fas fa-child"></i> גיל ${item.targetAge}</span>` : ''}
                    </div>
                </div>
            `;
        } else if (item.type === 'interactive') {
            mediaPreview = `
                <div class="media-preview">
                    <img src="${item.thumbnail}" alt="${item.title}" />
                    <div class="interactive-badge">
                        <i class="fas fa-gamepad"></i>
                        אינטראקטיבי
                    </div>
                    <div class="media-overlay">
                        <button class="view-btn" onclick="multimediaGallery.openInteractive('${item.gameUrl}')">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
            `;
            
            mediaInfo = `
                <div class="media-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <span class="media-category">אינטראקטיבי</span>
                    <div class="video-meta">
                        ${item.difficulty ? `<span><i class="fas fa-signal"></i> ${item.difficulty}</span>` : ''}
                        ${item.ageRange ? `<span><i class="fas fa-child"></i> גיל ${item.ageRange}</span>` : ''}
                        ${item.questions ? `<span><i class="fas fa-question-circle"></i> ${item.questions} שאלות</span>` : ''}
                    </div>
                </div>
            `;
        } else if (item.type === 'map') {
            mediaPreview = `
                <div class="media-preview">
                    <img src="${item.thumbnail}" alt="${item.title}" />
                    ${item.interactive ? '<div class="interactive-badge"><i class="fas fa-mouse-pointer"></i> אינטראקטיבי</div>' : ''}
                    <div class="media-overlay">
                        <button class="view-btn" onclick="multimediaGallery.openModal(${item.id})">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            `;
            
            mediaInfo = `
                <div class="media-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <span class="media-category">מפות</span>
                    <div class="video-meta">
                        ${item.trailLength ? `<span><i class="fas fa-route"></i> ${item.trailLength}</span>` : ''}
                        ${item.difficulty ? `<span><i class="fas fa-signal"></i> ${item.difficulty}</span>` : ''}
                    </div>
                </div>
            `;
        } else { // image
            mediaPreview = `
                <div class="media-preview">
                    <img src="${item.thumbnail}" alt="${item.title}" />
                    <div class="media-overlay">
                        <button class="view-btn" onclick="multimediaGallery.openModal(${item.id})">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            `;
            
            mediaInfo = `
                <div class="media-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <span class="media-category">${this.getCategoryName(item.category)}</span>
                    <div class="video-meta">
                        ${item.artist ? `<span><i class="fas fa-palette"></i> ${item.artist}</span>` : ''}
                        ${item.location ? `<span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>` : ''}
                        ${item.museum ? `<span><i class="fas fa-university"></i> ${item.museum}</span>` : ''}
                        ${item.period ? `<span><i class="fas fa-history"></i> ${item.period}</span>` : ''}
                    </div>
                </div>
            `;
        }
        
        cardContent = `
            <div class="media-card ${item.type}-card">
                ${mediaPreview}
                ${mediaInfo}
            </div>
        `;
        
        itemDiv.innerHTML = cardContent;
        return itemDiv;
    }
    
    // Get category display name
    getCategoryName(category) {
        const names = {
            'illustrations': 'איורים',
            'historical': 'היסטורי',
            'educational': 'חינוכי',
            'videos': 'סרטונים',
            'audio': 'אודיו',
            'maps': 'מפות',
            'interactive': 'אינטראקטיבי'
        };
        return names[category] || category;
    }
    
    // Setup modal system
    setupModalSystem() {
        // Create modal HTML if not exists
        if (!document.getElementById('media-modal')) {
            const modalHTML = `
                <div id="media-modal" class="media-modal">
                    <div class="modal-backdrop" onclick="multimediaGallery.closeModal()"></div>
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 id="modal-title"></h3>
                            <button class="modal-close" onclick="multimediaGallery.closeModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-content" id="modal-content">
                            <!-- Content will be loaded here -->
                        </div>
                        <div class="modal-footer">
                            <div class="modal-info" id="modal-info">
                                <!-- Info will be loaded here -->
                            </div>
                            <div class="modal-actions" id="modal-actions">
                                <!-- Actions will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }
    
    // Open modal
    openModal(itemId) {
        const item = this.galleryItems.find(item => item.id === itemId);
        if (!item) return;
        
        const modal = document.getElementById('media-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const modalInfo = document.getElementById('modal-info');
        const modalActions = document.getElementById('modal-actions');
        
        modalTitle.textContent = item.title;
        modalInfo.innerHTML = `<p>${item.description}</p>`;
        
        let content = '';
        let actions = '';
        
        if (item.type === 'video') {
            content = `
                <video controls width="100%" style="max-width: 800px;">
                    <source src="${item.videoUrl}" type="video/mp4">
                    הדפדפן שלך לא תומך בהפעלת וידאו.
                </video>
            `;
            
            actions = `
                <button class="modal-btn" onclick="multimediaGallery.downloadMedia('${item.videoUrl}', '${item.title}')">
                    <i class="fas fa-download"></i>
                    הורד סרטון
                </button>
                <button class="modal-btn" onclick="multimediaGallery.shareMedia(${item.id})">
                    <i class="fas fa-share"></i>
                    שתף
                </button>
            `;
        } else if (item.type === 'audio') {
            content = `
                <div style="text-align: center; padding: 2rem;">
                    <div class="audio-visual" style="margin-bottom: 2rem; color: var(--olive-green);">
                        <i class="fas fa-music" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                        <div class="sound-waves">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>
                    <audio controls style="width: 100%; max-width: 500px;">
                        <source src="${item.audioUrl}" type="audio/mpeg">
                        הדפדפן שלך לא תומך בהפעלת אודיו.
                    </audio>
                </div>
            `;
            
            actions = `
                <button class="modal-btn" onclick="multimediaGallery.downloadMedia('${item.audioUrl}', '${item.title}')">
                    <i class="fas fa-download"></i>
                    הורד קובץ
                </button>
                <button class="modal-btn" onclick="multimediaGallery.shareMedia(${item.id})">
                    <i class="fas fa-share"></i>
                    שתף
                </button>
            `;
        } else if (item.type === 'map') {
            content = `
                <img src="${item.thumbnail.replace('thumbnails', 'images').replace('.jpg', '-full.jpg')}" 
                     alt="${item.title}" style="max-width: 100%; border-radius: 10px;" />
                ${item.interactive ? '<p style="margin-top: 1rem; color: var(--golden-yellow); font-weight: 600;"><i class="fas fa-info-circle"></i> מפה אינטראקטיבית - לחץ על נקודות העניין</p>' : ''}
            `;
            
            actions = `
                <button class="modal-btn" onclick="multimediaGallery.openInteractive('interactive/map-viewer.html?map=${item.mapData}')">
                    <i class="fas fa-expand-arrows-alt"></i>
                    פתח מפה מלאה
                </button>
                <button class="modal-btn" onclick="multimediaGallery.shareMedia(${item.id})">
                    <i class="fas fa-share"></i>
                    שתף
                </button>
            `;
        } else { // image
            content = `
                <img src="${item.fullImage || item.thumbnail}" alt="${item.title}" 
                     style="max-width: 100%; border-radius: 10px;" />
            `;
            
            actions = `
                <button class="modal-btn" onclick="multimediaGallery.downloadMedia('${item.fullImage || item.thumbnail}', '${item.title}')">
                    <i class="fas fa-download"></i>
                    הורד תמונה
                </button>
                <button class="modal-btn" onclick="multimediaGallery.shareMedia(${item.id})">
                    <i class="fas fa-share"></i>
                    שתף
                </button>
            `;
        }
        
        modalContent.innerHTML = content;
        modalActions.innerHTML = actions;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        this.currentModal = itemId;
    }
    
    // Close modal
    closeModal() {
        const modal = document.getElementById('media-modal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Stop any playing media
        const videos = modal.querySelectorAll('video');
        const audios = modal.querySelectorAll('audio');
        
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
        
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        this.currentModal = null;
    }
    
    // Open interactive content
    openInteractive(url) {
        window.open(url, '_blank');
    }
    
    // Download media
    downloadMedia(url, title) {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title}.${url.split('.').pop()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Share media
    shareMedia(itemId) {
        const item = this.galleryItems.find(item => item.id === itemId);
        if (!item) return;
        
        const shareData = {
            title: item.title,
            text: item.description,
            url: window.location.href + '#item-' + itemId
        };
        
        if (navigator.share) {
            navigator.share(shareData).catch(err => {
                console.log('Error sharing:', err);
                this.copyToClipboard(shareData.url);
            });
        } else {
            this.copyToClipboard(shareData.url);
        }
    }
    
    // Copy to clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('הקישור הועתק ללוח!');
        }).catch(() => {
            // Fallback method
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('הקישור הועתק ללוח!');
        });
    }
    
    // Setup load more functionality
    setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreItems();
            });
        }
    }
    
    // Load more items
    loadMoreItems() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        const originalText = loadMoreBtn.innerHTML;
        
        // Show loading state
        loadMoreBtn.innerHTML = '<span class="loading-spinner"></span> טוען...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            this.loadedItems += this.itemsPerPage;
            this.renderGallery();
            
            loadMoreBtn.innerHTML = originalText;
            loadMoreBtn.disabled = false;
            
            this.updateLoadMoreButton();
        }, 1000);
    }
    
    // Update load more button visibility
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;
        
        const filteredItems = this.getFilteredItems();
        
        if (this.loadedItems >= filteredItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    // Get filtered items
    getFilteredItems() {
        if (this.currentFilter === 'all') {
            return this.galleryItems;
        }
        
        return this.galleryItems.filter(item => {
            if (this.currentFilter === 'videos' && item.type === 'video') return true;
            if (this.currentFilter === 'images' && (item.type === 'image' || item.type === 'illustration')) return true;
            if (this.currentFilter === 'audio' && item.type === 'audio') return true;
            if (this.currentFilter === 'maps' && item.type === 'map') return true;
            if (this.currentFilter === 'interactive' && item.type === 'interactive') return true;
            if (this.currentFilter === 'historical' && item.category === 'historical') return true;
            if (this.currentFilter === 'educational' && item.category === 'educational') return true;
            return false;
        });
    }
    
    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.currentModal !== null) {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    this.navigateModal('next');
                } else if (e.key === 'ArrowRight') {
                    this.navigateModal('prev');
                }
            }
        });
    }
    
    // Navigate modal (next/prev item)
    navigateModal(direction) {
        const filteredItems = this.getFilteredItems();
        const currentIndex = filteredItems.findIndex(item => item.id === this.currentModal);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % filteredItems.length;
        } else {
            nextIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        }
        
        const nextItem = filteredItems[nextIndex];
        this.openModal(nextItem.id);
    }
    
    // Setup search integration
    setupSearchIntegration() {
        // Listen for search events from main search system
        window.addEventListener('multimedia-search', (event) => {
            const searchTerm = event.detail.term;
            this.searchMultimedia(searchTerm);
        });
    }
    
    // Search multimedia items
    searchMultimedia(searchTerm) {
        if (!searchTerm || searchTerm.length < 2) {
            this.renderGallery();
            return;
        }
        
        const searchResults = this.galleryItems.filter(item => {
            return item.title.includes(searchTerm) || 
                   item.description.includes(searchTerm) ||
                   (item.narrator && item.narrator.includes(searchTerm)) ||
                   (item.artist && item.artist.includes(searchTerm)) ||
                   (item.location && item.location.includes(searchTerm));
        });
        
        this.renderSearchResults(searchResults);
    }
    
    // Render search results
    renderSearchResults(results) {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        
        if (results.length === 0) {
            galleryGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-tertiary); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">לא נמצאו תוצאות</h3>
                    <p style="color: var(--text-tertiary);">נסה חיפוש אחר או השתמש במסננים</p>
                </div>
            `;
            return;
        }
        
        results.forEach((item, index) => {
            const itemElement = this.createGalleryItem(item, index);
            galleryGrid.appendChild(itemElement);
        });
        
        // Hide load more button during search
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Preload images
    preloadImages() {
        this.galleryItems.slice(0, 6).forEach(item => {
            if (item.thumbnail) {
                const img = new Image();
                img.src = item.thumbnail;
            }
        });
    }
    
    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize multimedia gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.multimediaGallery = new MultimediaGallery();
});

// Analytics integration
function trackMultimediaEvent(eventType, itemId, itemTitle) {
    if (window.learningAnalytics) {
        window.learningAnalytics.trackEvent('multimedia', eventType, {
            itemId: itemId,
            itemTitle: itemTitle,
            timestamp: new Date().toISOString()
        });
    }
}

// Featured video player integration
document.addEventListener('DOMContentLoaded', () => {
    const featuredVideos = document.querySelectorAll('.video-placeholder');
    
    featuredVideos.forEach((placeholder) => {
        placeholder.addEventListener('click', () => {
            const videoId = placeholder.dataset.videoId;
            if (videoId && window.multimediaGallery) {
                window.multimediaGallery.openModal(parseInt(videoId));
            }
        });
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultimediaGallery;
}
