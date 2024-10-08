export function personalBadge() {
    let badges = document.querySelectorAll('.badge-type, .badge-tech, .badge-framework');
    console.log(badges);
    badges.forEach(badge => {
        const content = badge.textContent.trim();

        switch (content) {
            case 'HTML':
                badge.classList.add('badge-html');
                break;
            case 'CSS':
                badge.classList.add('badge-css');
                break;
            case 'SASS':
                badge.classList.add('badge-sass');
                break;
            case 'JavaScript':
                badge.classList.add('badge-javascript');
                break;
            case 'PHP':
                badge.classList.add('badge-php');
                break;
            case 'Front End':
                badge.classList.add('badge-frontend');
                break;
            case 'Back End':
                badge.classList.add('badge-backend');
                break;
            case 'Full Stack':
                badge.classList.add('badge-fullstack');
                break;
            case 'Database':
                badge.classList.add('badge-database');
                break;
            case 'SQL':
                badge.classList.add('badge-sql');
                break;
            case 'VueJs':
                badge.classList.add('badges-vuejs');
                break;
            case 'Laravel':
                badge.classList.add('badges-laravel');
                break;
            case 'Bootstrap':
                badge.classList.add('badge-bootstrap');
                break;
            default:
                badge.classList.add('badge-no-class');
                break;
        }
        console.log(content);
    });
}
