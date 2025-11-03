<?php
// footer.php
$buyCoffeeUrl = "https://coff.ee/mrhaseeb";
?>

<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-column">
                <a href="/freefintools" class="logo">
                    <i class="fas fa-calculator"></i>
                    <span>FreeFinTools</span>
                </a>
                <p>Your one-stop destination for free financial calculators and tools. Making complex financial decisions simple.</p>
                
                <div class="footer-credits">
                    <p>Made with <i class="fas fa-heart" style="color: #ef4444;"></i> by <a href="https://mrhaseeb.com" target="_blank">MrHaseeb</a></p>
                </div>
            </div>
            
            <div class="footer-column">
                <h3>Popular Tools</h3>
                <ul class="footer-links">
                    <li><a href="/free-loan-calculator"><i class="fas fa-arrow-right"></i> Loan Calculator</a></li>
                    <li><a href="#"><i class="fas fa-arrow-right"></i> Compound Interest Calculator</a></li>
                    <li><a href="#"><i class="fas fa-arrow-right"></i> Retirement Planner</a></li>
                    <li><a href="#"><i class="fas fa-arrow-right"></i> Currency Converter</a></li>
                    <li><a href="#"><i class="fas fa-arrow-right"></i> Budget Planner</a></li>
                </ul>
            </div>
            
            <div class="footer-column support-column">
                <div class="coffee-card">
                    <div class="coffee-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 3H18V8H19C20.6569 8 22 9.34315 22 11V13C22 14.6569 20.6569 16 19 16H18V17C18 18.6569 16.6569 20 15 20H9C7.34315 20 6 18.6569 6 17V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 8H3V16H2C2 17.6569 3.34315 19 5 19V5C3.34315 5 2 6.34315 2 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18 8H19C19.3506 8 19.6872 8.06015 20 8.17071V12.8293C19.6872 12.9398 19.3506 13 19 13H18V8Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h3>Support FreeFinTools</h3>
                    <p>Enjoying our free tools? Help keep them ad-free and support future development!</p>
                    <a href="<?php echo $buyCoffeeUrl; ?>" target="_blank" class="coffee-btn">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3V19M12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13M12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 16C5.79086 16 4 17.7909 4 20H20C20 17.7909 18.2091 16 16 16H8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        </svg>
                        Buy me a coffee
                    </a>
                    <div class="supporters">
                        <div class="avatars">
                            <div class="avatar" style="background: linear-gradient(45deg, #4361ee, #3a56d4);">JH</div>
                            <div class="avatar" style="background: linear-gradient(45deg, #06d6a0, #05b88a);">MK</div>
                            <div class="avatar" style="background: linear-gradient(45deg, #FF813F, #f06595);">SR</div>
                            <div class="avatar">+68</div>
                        </div>
                        <span>Supporters this month</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="copyright">
            <p>&copy; 2025 FreeFinTools. All rights reserved. This site provides financial tools for educational purposes only.</p>
        </div>
    </div>
    
    <!-- Animated floating elements -->
    <div class="footer-dots">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
        <div class="dot dot-4"></div>
    </div>
    
    <!-- Back to top button -->
    <div class="back-to-top" id="backToTop">
        <i class="fas fa-arrow-up"></i>
    </div>
</footer>

<style>
/* Footer */
footer {
    background-color: var(--dark);
    color: white;
    padding: 80px 0 30px;
    position: relative;
    overflow: hidden;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
    position: relative;
    z-index: 10;
}

.footer-column {
    margin-bottom: 30px;
}

.footer-column .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    margin-bottom: 20px;
}

.footer-column .logo i {
    color: var(--secondary);
}

.footer-column .logo span {
    color: white;
}

.footer-column p {
    color: #cbd5e1;
    margin-bottom: 25px;
    line-height: 1.7;
}

.footer-credits {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-credits p {
    margin-bottom: 0;
    color: #94a3b8;
    font-size: 0.95rem;
}

.footer-credits a {
    color: var(--secondary);
    text-decoration: none;
    transition: all 0.3s;
}

.footer-credits a:hover {
    text-decoration: underline;
}

.footer-column h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: var(--secondary);
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 12px;
    transition: all 0.3s;
}

.footer-links li:hover {
    transform: translateX(5px);
}

.footer-links a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
}

.footer-links a:hover {
    color: var(--secondary);
}

.footer-links i {
    font-size: 0.8rem;
    transition: transform 0.3s;
}

.footer-links a:hover i {
    transform: translateX(3px);
}

.copyright {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid #334155;
    color: #94a3b8;
    font-size: 0.9rem;
    position: relative;
    z-index: 10;
}

/* Support Card Styles */
.support-column {
    position: relative;
}

.coffee-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    height: 100%;
}

.coffee-card:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF813F, #F06595, #4361ee);
    z-index: 2;
}

.coffee-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.08);
}

.coffee-icon {
    width: 60px;
    height: 60px;
    background: rgba(255, 130, 63, 0.1);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.coffee-icon svg {
    width: 32px;
    height: 32px;
    color: #FF813F;
}

.coffee-card h3 {
    font-size: 1.4rem;
    margin-bottom: 12px;
    color: white;
    font-weight: 600;
}

.coffee-card p {
    font-size: 1rem;
    color: #cbd5e1;
    margin-bottom: 20px;
    line-height: 1.6;
}

.coffee-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: linear-gradient(135deg, #FF813F, #F06595);
    color: white;
    border: none;
    padding: 14px 25px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    width: 100%;
    box-shadow: 0 5px 15px rgba(255, 130, 63, 0.3);
    margin-bottom: 20px;
}

.coffee-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 130, 63, 0.4);
    background: linear-gradient(135deg, #F06595, #FF813F);
}

.coffee-btn svg {
    width: 20px;
    height: 20px;
}

.supporters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.avatars {
    display: flex;
    align-items: center;
}

.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    margin-left: -10px;
    border: 2px solid var(--dark);
    position: relative;
    background: #3a56d4;
}

.avatar:first-child {
    margin-left: 0;
}

.avatar:nth-child(4) {
    background: #64748b;
    color: white;
    font-weight: 700;
}

.supporters span {
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 500;
}

/* Animated background elements */
.footer-dots {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
}

.dot {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    animation: float 15s infinite linear;
}

.dot-1 {
    width: 300px;
    height: 300px;
    background: #4361ee;
    top: -100px;
    right: -100px;
    animation-duration: 20s;
}

.dot-2 {
    width: 200px;
    height: 200px;
    background: #06d6a0;
    bottom: -50px;
    left: 10%;
    animation-duration: 25s;
    animation-delay: -5s;
}

.dot-3 {
    width: 150px;
    height: 150px;
    background: #FF813F;
    top: 30%;
    left: -50px;
    animation-duration: 18s;
    animation-delay: -8s;
}

.dot-4 {
    width: 100px;
    height: 100px;
    background: #F06595;
    bottom: 20%;
    right: 20%;
    animation-duration: 22s;
    animation-delay: -12s;
}

@keyframes float {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(20px, 30px) rotate(90deg);
    }
    50% {
        transform: translate(40px, 0) rotate(180deg);
    }
    75% {
        transform: translate(20px, -30px) rotate(270deg);
    }
    100% {
        transform: translate(0, 0) rotate(360deg);
    }
}

@media (max-width: 992px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .support-column {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .support-column {
        grid-column: auto;
    }
    
    .footer-column {
        margin-bottom: 0;
    }
    
    .footer-column .logo {
        font-size: 1.4rem;
    }
    
    .coffee-card {
        padding: 25px;
    }
}

@media (max-width: 480px) {
    .coffee-btn {
        padding: 12px 20px;
        font-size: 0.95rem;
    }
    
    .avatar {
        width: 32px;
        height: 32px;
        font-size: 0.7rem;
    }
    
    .supporters span {
        font-size: 0.85rem;
    }
}

 /* Back to top button */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s;
            z-index: 99;
            box-shadow: 0 8px 25px rgba(67, 97, 238, 0.4);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 12px 30px rgba(67, 97, 238, 0.5);
        }

</style>

<script>

// Back to top functionality
        const backToTopBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
// Add subtle hover animations to footer elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to coffee card
    const coffeeCard = document.querySelector('.coffee-card');
    if (coffeeCard) {
        coffeeCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        });
        
        coffeeCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
        });
    }
    
    // Add hover effect to coffee button
    const coffeeBtn = document.querySelector('.coffee-btn');
    if (coffeeBtn) {
        coffeeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        coffeeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    }
});
</script>