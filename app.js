const templates = [
    { id: 'modelo_1', title: 'Modelo 1' },
    { id: 'modelo_2', title: 'Modelo 2' },
    { id: 'modelo_3', title: 'Modelo 3' },
    { id: 'modelo_4', title: 'Modelo 4' },
    { id: 'modelo_5', title: 'Modelo 5' },
    { id: 'modelo_6', title: 'Modelo 6' },
    { id: 'modelo_7', title: 'Modelo 7' },
    { id: 'modelo_8', title: 'Modelo 8' },
    { id: 'modelo_9', title: 'Modelo 9' },
    { id: 'modelo_10', title: 'Modelo 10' },
    { id: 'modelo_11', title: 'Modelo 11' },
    { id: 'modelo_12', title: 'Modelo 12' }
];

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const dashboardView = document.getElementById('dashboard');
    const viewerView = document.getElementById('viewer');
    const backButton = document.getElementById('back-button');
    const viewerTitle = document.getElementById('viewer-title');
    const templateIframe = document.getElementById('template-iframe');
    const externalLink = document.getElementById('external-link');
    const iframeContainer = document.getElementById('iframe-container');
    const deviceBtns = document.querySelectorAll('.device-btn');

    // Populate grid
    templates.forEach((template, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${template.id}/screen.png" alt="${template.title}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\'%3E%3Crect width=\\'100%\\' height=\\'100%\\' fill=\\'%231e1e1e\\'%3E%3C/rect%3E%3Ctext x=\\'50%\\' y=\\'50%\\' font-family=\\'sans-serif\\' font-size=\\'14\\' fill=\\'%23666\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'%3EImagem não encontrada%3C/text%3E%3C/svg%3E'">
                <div class="card-overlay">
                    <button class="btn-primary" aria-label="Visualizar ${template.title}">
                        <span class="material-symbols-outlined">visibility</span>
                        Visualizar
                    </button>
                </div>
            </div>
            <div class="card-content">
                <h3>${template.title}</h3>
                <p>Modelo de interface</p>
            </div>
        `;

        card.addEventListener('click', () => openViewer(template));
        gridContainer.appendChild(card);
    });

    // View Navigation
    function openViewer(template) {
        const url = `${template.id}/index.html`;
        
        viewerTitle.textContent = template.title;
        templateIframe.src = url;
        externalLink.href = url;
        
        dashboardView.classList.remove('active');
        dashboardView.classList.add('fade-out');
        
        setTimeout(() => {
            viewerView.classList.add('active');
            viewerView.classList.remove('fade-out');
        }, 300);
    }

    function closeViewer() {
        viewerView.classList.remove('active');
        viewerView.classList.add('fade-out');
        
        setTimeout(() => {
            templateIframe.src = '';
            dashboardView.classList.add('active');
            dashboardView.classList.remove('fade-out');
        }, 300);
    }

    backButton.addEventListener('click', closeViewer);

    // Device toggles
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            deviceBtns.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            
            const device = target.dataset.device;
            iframeContainer.className = `iframe-container ${device}`;
        });
    });
});
