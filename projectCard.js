class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'MISSING TITLE';
        const image = this.getAttribute('image') || 'MISSING IMAGE';
        const alt = this.getAttribute('alt') || 'MISSING ALT';
        const desc = this.getAttribute('desc') || 'MISSING DESC';
        const link = this.getAttribute('link') || 'MISSING LINK';
        const linkText = this.getAttribute('linkText') || 'MISSING LINK TEXT';

        this.innerHTML = `
            <span class='projectCard'>
                <h2>${title}</h2>
                <br>
                <img src='${image}' alt='${alt}' width="200" height="200">
                <br>
                <p>${desc}</p>
                <br>
                <a href='${link}'>${linkText}</a>
            </span>
        `;
    }
}

customElements.define('project-card', ProjectCard);