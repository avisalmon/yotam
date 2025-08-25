// Audio Player JavaScript - משל יותם
// Audio functionality for biblical text and educational content

class YotamAudioPlayer {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.currentVerse = 0;
        this.verses = [];
        this.playbackSpeed = 1;
        this.highlightInterval = null;
        
        this.init();
    }
    
    init() {
        this.verses = document.querySelectorAll('.verse-container');
        this.setupAudioControls();
        this.setupKeyboardShortcuts();
        console.log('נגן השמע הופעל');
    }
    
    setupAudioControls() {
        const playButton = document.getElementById('playAudio');
        if (playButton) {
            playButton.addEventListener('click', () => this.togglePlayback());
        }
        
        // Create audio control panel
        this.createAudioControlPanel();
    }
    
    createAudioControlPanel() {
        const controlPanel = document.createElement('div');
        controlPanel.className = 'audio-control-panel';
        controlPanel.innerHTML = `
            <div class="audio-controls">
                <button class="audio-btn" id="prevVerse" title="פסוק קודם">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="audio-btn" id="playPause" title="השמע/עצור">
                    <i class="fas fa-play"></i>
                </button>
                <button class="audio-btn" id="nextVerse" title="פסוק הבא">
                    <i class="fas fa-step-forward"></i>
                </button>
                <div class="speed-control">
                    <label for="speedSlider">מהירות:</label>
                    <input type="range" id="speedSlider" min="0.5" max="2" step="0.1" value="1">
                    <span id="speedValue">1x</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                    <div class="progress-handle"></div>
                </div>
            </div>
        `;
        
        const styles = `
            .audio-control-panel {
                background: var(--pure-white);
                border-radius: var(--border-radius-lg);
                padding: var(--spacing-md);
                box-shadow: var(--shadow-lg);
                margin: var(--spacing-md) 0;
                border: 2px solid var(--olive-green);
            }
            
            .audio-controls {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .audio-btn {
                background: var(--olive-green);
                color: var(--pure-white);
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: var(--font-size-lg);
            }
            
            .audio-btn:hover {
                background: var(--earth-brown);
                transform: scale(1.1);
                box-shadow: var(--shadow-md);
            }
            
            .audio-btn:active {
                transform: scale(0.95);
            }
            
            .speed-control {
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);
                background: var(--light-beige);
                padding: var(--spacing-xs) var(--spacing-sm);
                border-radius: var(--border-radius);
            }
            
            .speed-control label {
                font-weight: 600;
                color: var(--olive-green);
                font-size: var(--font-size-sm);
            }
            
            #speedSlider {
                width: 80px;
                height: 4px;
                background: var(--olive-green);
                outline: none;
                border-radius: var(--border-radius-full);
            }
            
            #speedValue {
                font-weight: 600;
                color: var(--earth-brown);
                min-width: 30px;
                text-align: center;
            }
            
            .progress-bar {
                flex: 1;
                height: 6px;
                background: var(--light-beige);
                border-radius: var(--border-radius-full);
                position: relative;
                margin: 0 var(--spacing-md);
                cursor: pointer;
                min-width: 200px;
            }
            
            .progress-fill {
                height: 100%;
                background: var(--hero-gradient);
                border-radius: var(--border-radius-full);
                width: 0%;
                transition: width 0.1s ease;
            }
            
            .progress-handle {
                position: absolute;
                top: 50%;
                right: 0%;
                transform: translate(50%, -50%);
                width: 16px;
                height: 16px;
                background: var(--golden-yellow);
                border-radius: 50%;
                box-shadow: var(--shadow-sm);
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .progress-bar:hover .progress-handle {
                opacity: 1;
            }
            
            @media (max-width: 768px) {
                .audio-controls {
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                
                .progress-bar {
                    width: 100%;
                    margin: 0;
                }
                
                .speed-control {
                    order: -1;
                }
            }
        `;
        
        // Inject styles
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        // Insert control panel after biblical passage
        const biblicalPassage = document.querySelector('.biblical-passage');
        if (biblicalPassage) {
            biblicalPassage.parentNode.insertBefore(controlPanel, biblicalPassage.nextSibling);
        }
        
        // Setup control event listeners
        this.setupControlEventListeners(controlPanel);
    }
    
    setupControlEventListeners(controlPanel) {
        const playPauseBtn = controlPanel.querySelector('#playPause');
        const prevBtn = controlPanel.querySelector('#prevVerse');
        const nextBtn = controlPanel.querySelector('#nextVerse');
        const speedSlider = controlPanel.querySelector('#speedSlider');
        const speedValue = controlPanel.querySelector('#speedValue');
        const progressBar = controlPanel.querySelector('.progress-bar');
        
        playPauseBtn.addEventListener('click', () => this.togglePlayback());
        prevBtn.addEventListener('click', () => this.previousVerse());
        nextBtn.addEventListener('click', () => this.nextVerse());
        
        speedSlider.addEventListener('input', (e) => {
            this.playbackSpeed = parseFloat(e.target.value);
            speedValue.textContent = this.playbackSpeed + 'x';
            this.updatePlaybackSpeed();
        });
        
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const progressPercent = clickX / rect.width;
            this.seekTo(progressPercent);
        });
    }
    
    async togglePlayback() {
        if (this.isPlaying) {
            this.pause();
        } else {
            await this.play();
        }
    }
    
    async play() {
        try {
            // In a real implementation, you would load actual audio files
            // For this demo, we'll simulate audio playback with verse highlighting
            
            this.isPlaying = true;
            this.updatePlayPauseButton();
            
            // Start verse highlighting simulation
            this.startVerseHighlighting();
            
            console.log('השמעה החלה');
            
        } catch (error) {
            console.error('שגיאה בהשמעה:', error);
            this.showAudioError('שגיאה בטעינת קובץ השמע');
        }
    }
    
    pause() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
        this.stopVerseHighlighting();
        
        console.log('השמעה נעצרה');
    }
    
    stop() {
        this.pause();
        this.currentVerse = 0;
        this.updateProgress(0);
        this.clearVerseHighlights();
    }
    
    previousVerse() {
        if (this.currentVerse > 0) {
            this.currentVerse--;
            this.highlightCurrentVerse();
            this.updateProgress(this.currentVerse / this.verses.length);
        }
    }
    
    nextVerse() {
        if (this.currentVerse < this.verses.length - 1) {
            this.currentVerse++;
            this.highlightCurrentVerse();
            this.updateProgress(this.currentVerse / this.verses.length);
        } else {
            // End of verses
            this.stop();
        }
    }
    
    seekTo(progressPercent) {
        const targetVerse = Math.floor(progressPercent * this.verses.length);
        this.currentVerse = Math.min(targetVerse, this.verses.length - 1);
        this.highlightCurrentVerse();
        this.updateProgress(progressPercent);
    }
    
    updatePlaybackSpeed() {
        // In a real implementation, you would adjust the audio playback rate
        console.log('מהירות השמעה:', this.playbackSpeed);
    }
    
    startVerseHighlighting() {
        this.clearVerseHighlights();
        
        const baseDelay = 2000; // 2 seconds per verse
        const adjustedDelay = baseDelay / this.playbackSpeed;
        
        this.highlightInterval = setInterval(() => {
            this.highlightCurrentVerse();
            this.updateProgress((this.currentVerse + 1) / this.verses.length);
            
            this.currentVerse++;
            if (this.currentVerse >= this.verses.length) {
                this.stop();
            }
        }, adjustedDelay);
    }
    
    stopVerseHighlighting() {
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
            this.highlightInterval = null;
        }
    }
    
    highlightCurrentVerse() {
        this.clearVerseHighlights();
        
        if (this.verses[this.currentVerse]) {
            const currentVerseElement = this.verses[this.currentVerse];
            currentVerseElement.classList.add('verse-active');
            
            // Animate highlighting
            currentVerseElement.style.background = 'linear-gradient(90deg, var(--golden-yellow), transparent)';
            currentVerseElement.style.borderRadius = 'var(--border-radius)';
            currentVerseElement.style.transition = 'all 0.3s ease';
            currentVerseElement.style.transform = 'translateX(-5px)';
            currentVerseElement.style.boxShadow = 'var(--shadow-md)';
            
            // Scroll verse into view
            currentVerseElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    clearVerseHighlights() {
        this.verses.forEach(verse => {
            verse.classList.remove('verse-active');
            verse.style.background = '';
            verse.style.transform = '';
            verse.style.boxShadow = '';
        });
    }
    
    updateProgress(percent) {
        const progressFill = document.querySelector('.progress-fill');
        const progressHandle = document.querySelector('.progress-handle');
        
        if (progressFill) {
            progressFill.style.width = (percent * 100) + '%';
        }
        
        if (progressHandle) {
            progressHandle.style.right = (100 - percent * 100) + '%';
        }
    }
    
    updatePlayPauseButton() {
        const playPauseBtn = document.querySelector('#playPause');
        const mainPlayBtn = document.getElementById('playAudio');
        
        const icon = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        const text = this.isPlaying ? 'עצור' : 'האזנה';
        
        if (playPauseBtn) {
            playPauseBtn.innerHTML = `<i class="${icon}"></i>`;
        }
        
        if (mainPlayBtn) {
            mainPlayBtn.innerHTML = `<i class="${icon}"></i> ${text}`;
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only activate shortcuts if audio control panel is visible
            if (!document.querySelector('.audio-control-panel')) return;
            
            switch (e.key) {
                case ' ': // Spacebar
                    e.preventDefault();
                    this.togglePlayback();
                    break;
                    
                case 'ArrowLeft':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.previousVerse();
                    }
                    break;
                    
                case 'ArrowRight':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.nextVerse();
                    }
                    break;
                    
                case 'ArrowUp':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.adjustSpeed(0.1);
                    }
                    break;
                    
                case 'ArrowDown':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.adjustSpeed(-0.1);
                    }
                    break;
                    
                case 'Escape':
                    this.stop();
                    break;
            }
        });
    }
    
    adjustSpeed(delta) {
        const newSpeed = Math.max(0.5, Math.min(2, this.playbackSpeed + delta));
        this.playbackSpeed = newSpeed;
        
        const speedSlider = document.querySelector('#speedSlider');
        const speedValue = document.querySelector('#speedValue');
        
        if (speedSlider) speedSlider.value = newSpeed;
        if (speedValue) speedValue.textContent = newSpeed.toFixed(1) + 'x';
        
        this.updatePlaybackSpeed();
    }
    
    showAudioError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'audio-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button class="btn btn-sm" onclick="this.parentNode.parentNode.remove()">סגור</button>
            </div>
        `;
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--deep-red);
            color: var(--pure-white);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            direction: rtl;
            text-align: center;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Method to load actual audio files (for future implementation)
    async loadAudioFile(url) {
        try {
            const audio = new Audio(url);
            audio.preload = 'metadata';
            
            return new Promise((resolve, reject) => {
                audio.addEventListener('loadedmetadata', () => resolve(audio));
                audio.addEventListener('error', reject);
            });
        } catch (error) {
            console.error('שגיאה בטעינת קובץ שמע:', error);
            throw error;
        }
    }
    
    // Method to add custom audio tracks
    addCustomTrack(title, url, verses = []) {
        // This would be used to add different audio tracks
        // For example: Hebrew cantillation, modern reading, etc.
        console.log('הוספת רצועת שמע:', title, url);
    }
    
    destroy() {
        this.stop();
        this.clearVerseHighlights();
        
        const controlPanel = document.querySelector('.audio-control-panel');
        if (controlPanel) {
            controlPanel.remove();
        }
        
        console.log('נגן השמע הושמד');
    }
}

// Create global audio player instance
let yotamAudioPlayer;

document.addEventListener('DOMContentLoaded', function() {
    yotamAudioPlayer = new YotamAudioPlayer();
});

// Export for use in other scripts
window.YotamAudioPlayer = YotamAudioPlayer;

// Legacy support for main.js functions
window.playBiblicalText = function() {
    if (yotamAudioPlayer) {
        yotamAudioPlayer.play();
    }
};

window.stopBiblicalText = function() {
    if (yotamAudioPlayer) {
        yotamAudioPlayer.stop();
    }
};

console.log('נגן השמע נטען בהצלחה');
