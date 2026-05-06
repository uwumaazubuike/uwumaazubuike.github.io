const sections = document.querySelectorAll('section');
const achievements = document.querySelectorAll('.achievement');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));
achievements.forEach(item => observer.observe(item));
