// Digital Wellbeing Quiz
class DigitalWellbeingQuiz {
    constructor() {
        this.questions = [
            {
                question: "📱 How many hours do you spend on your phone daily?",
                subtitle: "Be honest - check your screen time stats if needed",
                options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "More than 6 hours"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "🌅 Do you check your phone within 5 minutes of waking up?",
                subtitle: "Before getting out of bed or brushing your teeth",
                options: ["Never", "Rarely (1-2 times/week)", "Often (3-5 times/week)", "Always (daily)"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "😰 How often do you feel anxious without your phone?",
                subtitle: "When you can't find it or battery dies",
                options: ["Never - I'm fine without it", "Rarely - Only in emergencies", "Sometimes - I get uncomfortable", "Frequently - I panic"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "🍽️ Do you use your phone during meals?",
                subtitle: "Including scrolling social media or watching videos",
                options: ["Never", "Rarely", "Sometimes", "Almost always"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "😴 When do you stop using your phone before bed?",
                subtitle: "Your last screen time before trying to sleep",
                options: ["1+ hour before bed", "30-60 minutes before", "Within 30 minutes", "I use it until I fall asleep"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "👥 Do you check your phone during conversations?",
                subtitle: "When talking face-to-face with others",
                options: ["Never - that's rude", "Only for emergencies", "Sometimes when bored", "Frequently - I multitask"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "🚗 Have you used your phone while driving?",
                subtitle: "Texting, scrolling, or checking notifications",
                options: ["Never", "Only at red lights", "Sometimes briefly", "Yes, regularly"],
                scores: [0, 3, 5, 7]
            },
            {
                question: "📵 How long can you go without checking your phone?",
                subtitle: "During waking hours, without feeling the urge",
                options: ["4+ hours easily", "2-3 hours", "1 hour max", "Less than 30 minutes"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "🎯 Does phone use interfere with your productivity?",
                subtitle: "Work, studies, or important tasks",
                options: ["Never - I'm focused", "Rarely", "Sometimes - I get distracted", "Frequently - major problem"],
                scores: [0, 2, 4, 6]
            },
            {
                question: "💤 Has screen time affected your sleep quality?",
                subtitle: "Trouble falling asleep or feeling tired",
                options: ["No, I sleep well", "Occasionally", "Sometimes", "Yes, regularly"],
                scores: [0, 2, 4, 6]
            }
        ];
        this.currentQuestion = 0;
        this.score = 0;
        this.quizContainer = null;
        this.resultsContainer = null;
        this.quizForm = null;
    }

    init() {
        this.quizContainer = document.getElementById('digital-wellbeing-quiz');
        this.resultsContainer = document.getElementById('quiz-results');
        this.quizForm = document.getElementById('quiz-form');
        
        if (!this.quizContainer) return;
        
        this.displayQuestion();
        this.setupEventListeners();
    }

    displayQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            this.trackQuizCompletion();
            return;
        }

        const question = this.questions[this.currentQuestion];
        let optionsHTML = '';
        
        question.options.forEach((option, index) => {
            optionsHTML += `
                <div class="quiz-option">
                    <input type="radio" id="q${this.currentQuestion}-${index}" name="q${this.currentQuestion}" value="${index}" required>
                    <label for="q${this.currentQuestion}-${index}">${option}</label>
                </div>`;
        });

        const progress = Math.round(((this.currentQuestion) / this.questions.length) * 100);
        
        this.quizContainer.innerHTML = `
            <div class="quiz-progress">
                <div class="progress-bar" style="width: ${progress}%"></div>
                <span class="progress-text">${progress}% Complete</span>
            </div>
            <div class="quiz-question-header">
                <span class="question-number">Question ${this.currentQuestion + 1} of ${this.questions.length}</span>
                <h3 class="quiz-question">${question.question}</h3>
                ${question.subtitle ? `<p class="quiz-subtitle">${question.subtitle}</p>` : ''}
            </div>
            <div class="quiz-options">
                ${optionsHTML}
            </div>
            <div class="quiz-navigation">
                ${this.currentQuestion > 0 ? '<button type="button" class="quiz-prev">← Previous</button>' : ''}
                <button type="submit" class="quiz-next">${this.currentQuestion === this.questions.length - 1 ? '🎯 See My Results' : 'Next →'}</button>
            </div>`;
    }

    setupEventListeners() {
        this.quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNext();
        });

        // Event delegation for previous button
        this.quizContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-prev')) {
                this.currentQuestion--;
                this.displayQuestion();
            }
        });
    }

    handleNext() {
        const selectedOption = document.querySelector(`input[name="q${this.currentQuestion}"]:checked`);
        if (!selectedOption) return;

        const scoreIndex = parseInt(selectedOption.value);
        this.score += this.questions[this.currentQuestion].scores[scoreIndex];
        this.currentQuestion++;
        this.displayQuestion();
    }

    trackQuizCompletion() {
        // In a real implementation, you would send this data to your analytics platform
        console.log('Quiz completed with score:', this.score);
        // Example: sendToAnalytics({ event: 'quiz_completed', score: this.score });
    }

    showResults() {
        const maxScore = 60; // 10 questions × 6 max points
        const percentage = Math.round((this.score / maxScore) * 100);
        let result = {};
        let shareText = '';
        let emoji = '';
        let color = '';
        const shareUrl = 'https://virtue-digital-detox.in?ref=quiz';
        
        // Set result based on score with more nuanced categories
        if (this.score <= 12) {
            emoji = '🌟';
            color = '#2ecc71';
            result = {
                title: "Digital Zen Master",
                subtitle: "Excellent digital wellbeing!",
                description: "Congratulations! You have an exceptionally healthy relationship with technology. You're mindful of your digital habits and maintain strong boundaries with your devices. You're in the top 15% of users.",
                strengths: [
                    "Strong self-control with device usage",
                    "Healthy sleep hygiene",
                    "Present in real-world interactions",
                    "Balanced work-life-tech integration"
                ],
                tips: [
                    "Share your strategies with friends and family",
                    "Consider mentoring others struggling with digital habits",
                    "Use Virtue to maintain and track your healthy patterns",
                    "Set an example by continuing your mindful tech use"
                ],
                nextSteps: "You're doing great! Focus on maintaining these habits and helping others."
            };
            shareText = `🌟 I'm a Digital Zen Master! I scored ${this.score}/${maxScore} (${percentage}%) on the Digital Wellbeing Quiz. Take the quiz: ${shareUrl}`;
        } else if (this.score <= 24) {
            emoji = '✅';
            color = '#27ae60';
            result = {
                title: "Mindful User",
                subtitle: "Good digital habits with room to grow",
                description: "You're doing well! You have awareness of your digital habits and generally maintain healthy boundaries. With some small adjustments, you can achieve even better balance.",
                strengths: [
                    "Awareness of screen time impact",
                    "Some healthy boundaries in place",
                    "Occasional digital breaks"
                ],
                tips: [
                    "Create phone-free zones (bedroom, dining table)",
                    "Set specific times for checking social media",
                    "Turn off non-essential notifications",
                    "Try a 30-day digital detox challenge with Virtue",
                    "Practice the 20-20-20 rule for eye health"
                ],
                nextSteps: "Focus on creating consistent routines and boundaries."
            };
            shareText = `✅ I'm a Mindful User! I scored ${this.score}/${maxScore} (${percentage}%) on the Digital Wellbeing Quiz. Take the quiz: ${shareUrl}`;
        } else if (this.score <= 36) {
            emoji = '⚠️';
            color = '#f39c12';
            result = {
                title: "Digitally Distracted",
                subtitle: "Your habits need attention",
                description: "Your digital habits are starting to impact your wellbeing. You're not alone - 60% of people struggle with similar patterns. The good news? Small changes can make a big difference.",
                concerns: [
                    "Frequent phone checking disrupts focus",
                    "Screen time may affect sleep quality",
                    "Digital distractions impact productivity",
                    "Reduced presence in real-world moments"
                ],
                tips: [
                    "Start with ONE habit: no phones 1 hour before bed",
                    "Use Virtue's app blocking during work/study hours",
                    "Delete your most distracting app for one week",
                    "Set a daily screen time limit and stick to it",
                    "Practice mindful phone use - ask 'why?' before unlocking",
                    "Join a digital detox challenge for accountability"
                ],
                nextSteps: "Take action now. Start with the easiest tip and build from there."
            };
            shareText = `⚠️ I'm Digitally Distracted! I scored ${this.score}/${maxScore} (${percentage}%) on the Digital Wellbeing Quiz. Time for change! ${shareUrl}`;
        } else if (this.score <= 48) {
            emoji = '🚨';
            color = '#e74c3c';
            result = {
                title: "Digitally Dependent",
                subtitle: "Urgent action needed",
                description: "Your digital habits are significantly impacting your wellbeing, relationships, and productivity. You're experiencing symptoms of digital addiction. But there's hope - thousands have successfully transformed their relationship with technology.",
                concerns: [
                    "Severe phone dependency affecting daily life",
                    "Sleep disruption from excessive screen time",
                    "Damaged relationships and productivity",
                    "Anxiety when separated from devices",
                    "Difficulty focusing without digital stimulation"
                ],
                tips: [
                    "🎯 PRIORITY: Use Virtue's money commitment feature for accountability",
                    "Start a 7-day strict digital detox (essential apps only)",
                    "Remove ALL social media apps from your phone for 1 week",
                    "Get an alarm clock - keep phone out of bedroom",
                    "Tell friends/family you're doing a detox - get support",
                    "Replace phone time with physical activities",
                    "Consider professional help if anxiety is severe"
                ],
                nextSteps: "This is serious. Download Virtue NOW and commit to change today."
            };
            shareText = `🚨 I'm Digitally Dependent! I scored ${this.score}/${maxScore} (${percentage}%) on the Digital Wellbeing Quiz. Time to take control! ${shareUrl}`;
        } else {
            emoji = '🆘';
            color = '#c0392b';
            result = {
                title: "Digital Addiction Crisis",
                subtitle: "Immediate intervention required",
                description: "Your digital habits have reached crisis levels and are severely impacting your life. This requires immediate action. You're not alone - professional help and structured programs can help you regain control.",
                concerns: [
                    "Severe digital addiction affecting all life areas",
                    "Critical impact on mental and physical health",
                    "Relationships and career at risk",
                    "Inability to function without devices",
                    "Possible depression or anxiety disorders"
                ],
                tips: [
                    "🆘 URGENT: Download Virtue and enable strict mode immediately",
                    "Consider professional counseling for digital addiction",
                    "Join a support group (online or in-person)",
                    "Use Virtue's maximum commitment level",
                    "Tell someone you trust about your struggle",
                    "Create a 30-day recovery plan with accountability",
                    "Replace devices with a basic phone temporarily",
                    "Seek medical help if experiencing severe anxiety/depression"
                ],
                nextSteps: "Act NOW. Your wellbeing depends on it. We're here to help."
            };
            shareText = `🆘 I scored ${this.score}/${maxScore} (${percentage}%) on the Digital Wellbeing Quiz. I'm taking action to change! ${shareUrl}`;
        }
        
        const tipsHTML = result.tips.map(tip => `<li>${tip}</li>`).join('');
        const strengthsHTML = result.strengths ? `
            <div class="result-section strengths">
                <h5>💪 Your Strengths:</h5>
                <ul>${result.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>` : '';
        const concernsHTML = result.concerns ? `
            <div class="result-section concerns">
                <h5>⚠️ Areas of Concern:</h5>
                <ul>${result.concerns.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>` : '';
        
        this.quizContainer.style.display = 'none';
        this.resultsContainer.innerHTML = `
            <div class="quiz-result">
                <div class="result-header" style="border-color: ${color};">
                    <div class="result-emoji">${emoji}</div>
                    <div class="result-score">
                        <div class="score-circle" style="background: conic-gradient(${color} ${percentage * 3.6}deg, #e0e0e0 0deg);">
                            <div class="score-inner">
                                <span class="score-number">${this.score}</span>
                                <span class="score-max">/${maxScore}</span>
                            </div>
                        </div>
                        <p class="score-percentage">${percentage}%</p>
                    </div>
                    <h3 class="result-title">${result.title}</h3>
                    <p class="result-subtitle">${result.subtitle}</p>
                </div>
                
                <div class="result-description">
                    <p>${result.description}</p>
                </div>
                
                ${strengthsHTML}
                ${concernsHTML}
                
                <div class="result-section action-tips">
                    <h5>🎯 Action Plan:</h5>
                    <ul>${tipsHTML}</ul>
                </div>
                
                <div class="result-next-steps">
                    <p><strong>Next Steps:</strong> ${result.nextSteps}</p>
                </div>
                
                <!-- CTA Section -->
                <div class="result-cta">
                    <h4>Ready to Transform Your Digital Habits?</h4>
                    <p>Join thousands who've taken control of their screen time with Virtue</p>
                    <div class="cta-buttons">
                        <a href="https://play.google.com/store" class="cta-button primary">📱 Download Virtue Free</a>
                        <button id="retake-quiz" class="cta-button secondary">🔄 Retake Quiz</button>
                    </div>
                </div>
                
                <!-- Share Buttons -->
                <div class="quiz-share">
                    <p>Share your results and challenge friends:</p>
                    <div class="share-buttons">
                        <button class="share-btn twitter" data-share-text="${encodeURIComponent(shareText)}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            Share on Twitter
                        </button>
                        <button class="share-btn facebook" data-share-url="${encodeURIComponent(shareUrl)}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                            Share on Facebook
                        </button>
                        <button class="share-btn linkedin" data-share-text="${encodeURIComponent(shareText)}" data-share-url="${encodeURIComponent(shareUrl)}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                            Share on LinkedIn
                        </button>
                    </div>
                </div>
                
                <!-- Recommended Reading -->
                <div class="recommended-reading">
                    <h5>📚 Recommended for You:</h5>
                    <div class="reading-list">
                        <a href="/blog/complete-guide-digital-detox.html" class="reading-item">
                            <span class="reading-icon">📖</span>
                            <div>
                                <h6>The Complete Guide to Digital Detox in 2025</h6>
                                <p>Everything you need to start your journey</p>
                            </div>
                        </a>
                        <a href="/blog/overcome-phone-addiction.html" class="reading-item">
                            <span class="reading-icon">🔓</span>
                            <div>
                                <h6>7 Proven Strategies to Overcome Phone Addiction</h6>
                                <p>Practical steps that actually work</p>
                            </div>
                        </a>
                        <a href="/blog/improve-sleep-reduce-screen-time.html" class="reading-item">
                            <span class="reading-icon">😴</span>
                            <div>
                                <h6>How Reducing Screen Time Transforms Your Sleep</h6>
                                <p>The science behind better rest</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>`;
        
        // Initialize share buttons and newsletter form
        this.setupShareButtons();
        this.setupNewsletterForm();
        
        // Add event listener for retake button
        document.getElementById('retake-quiz').addEventListener('click', () => {
            this.currentQuestion = 0;
            this.score = 0;
            this.quizContainer.style.display = 'block';
            this.resultsContainer.style.display = 'none';
            this.displayQuestion();
        });
        
        this.resultsContainer.style.display = 'block';
    }

    setupShareButtons() {
        // Twitter sharing
        const twitterButtons = document.querySelectorAll('.share-btn.twitter');
        twitterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const text = button.getAttribute('data-share-text') || '';
                window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=550,height=420');
            });
        });

        // Facebook sharing
        const facebookButtons = document.querySelectorAll('.share-btn.facebook');
        facebookButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const url = button.getAttribute('data-share-url') || '';
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420');
            });
        });

        // LinkedIn sharing
        const linkedinButtons = document.querySelectorAll('.share-btn.linkedin');
        linkedinButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const text = button.getAttribute('data-share-text') || '';
                const url = button.getAttribute('data-share-url') || '';
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=550,height=570');
            });
        });
    }

    setupNewsletterForm() {
        const form = document.getElementById('quiz-newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value.trim();
            if (!email) return;
            
            // In a real implementation, you would send this to your email service
            console.log('Subscribing email:', email);
            // Example: subscribeEmail(email);
            
            // Show success message
            form.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <p>Thanks for subscribing! Check your email for your first tip.</p>
                </div>`;
        });
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load Font Awesome for social icons if not already loaded
    if (!document.querySelector('.fa-twitter')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }
    
    const quiz = new DigitalWellbeingQuiz();
    quiz.init();
});
