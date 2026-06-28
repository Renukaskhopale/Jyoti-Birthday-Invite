// Page Management
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

let selectedYear = null;
let isCorrectYear = false;

// Get all year options
const yearOptions = document.querySelectorAll('.year-option');
const openBtn = document.getElementById('openBtn');

// Year options click handler
yearOptions.forEach(option => {
    option.addEventListener('click', function() {
        const year = this.getAttribute('data-year');
        selectedYear = year;
        
        // Remove active class from all options
        yearOptions.forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to selected option
        this.classList.add('active');
        
        // Check if correct year is selected
        if (year === '1956') {
            isCorrectYear = true;
            this.querySelector('.year-number').style.background = '#d4a574';
            this.querySelector('.year-number').style.color = '#fff';
        } else {
            isCorrectYear = false;
        }
    });
});

// Open button click handler
openBtn.addEventListener('click', function() {
    if (selectedYear === null) {
        alert('Please select a birth year!');
        return;
    }
    
    if (!isCorrectYear) {
        alert('Incorrect year! Please try again.');
        // Reset selection
        yearOptions.forEach(opt => {
            opt.classList.remove('active');
            opt.querySelector('.year-number').style.background = 'transparent';
            opt.querySelector('.year-number').style.color = '#8b7355';
        });
        selectedYear = null;
        return;
    }
    
    // Correct year selected - proceed
    navigateToPage(2);
});

// Navigation function
function navigateToPage(pageNumber) {
    // Hide all pages
    page1.style.display = 'none';
    page2.style.display = 'none';
    page3.style.display = 'none';
    
    // Show selected page
    if (pageNumber === 1) {
        page1.style.display = 'flex';
    } else if (pageNumber === 2) {
        page2.style.display = 'flex';
        // Auto navigate to page 3 after 8 seconds
        setTimeout(() => {
            navigateToPage(3);
        }, 240000);
    } else if (pageNumber === 3) {
        page3.style.display = 'flex';
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (page1.style.display !== 'none') {
            openBtn.click();
        }
    }
    if (event.key === 'ArrowRight') {
        // Next page
        if (page2.style.display !== 'none') {
            navigateToPage(3);
        }
    }
    if (event.key === 'ArrowLeft') {
        // Previous page
        if (page3.style.display !== 'none') {
            navigateToPage(2);
        } else if (page2.style.display !== 'none') {
            navigateToPage(1);
        }
    }
});

// Optional: Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        // Swiped left - next page
        if (page2.style.display !== 'none') {
            navigateToPage(3);
        }
    }
    if (touchEndX - touchStartX > 50) {
        // Swiped right - previous page
        if (page3.style.display !== 'none') {
            navigateToPage(2);
        } else if (page2.style.display !== 'none') {
            navigateToPage(1);
        }
    }
}

// Add CSS for active state
const style = document.createElement('style');
style.textContent = `
    .year-option.active .year-number {
        background: #d4a574;
        color: #fff;
        box-shadow: 0 10px 30px rgba(212, 165, 116, 0.3);
    }
`;
document.head.appendChild(style);

// Initialize - start on page 1
navigateToPage(1);
