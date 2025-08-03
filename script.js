document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('proxy-form');
    const urlInput = document.getElementById('url');
    const passwordInput = document.getElementById('password');
    const output = document.getElementById('output');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const url = urlInput.value;
        const password = passwordInput.value;

        fetch('/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to access the URL. Please check your password and URL.');
            }
            return response.text();
        })
        .then(data => {
            output.innerHTML = data;
        })
        .catch(error => {
            output.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
    });
});