document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página ao enviar o formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/profile', {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Informa que estamos enviando JSON
            },
            body: JSON.stringify({ email, password }) // Dados que estamos enviando
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        document.getElementById('result').innerText = `Bem-vindo, ${data.name}!`; // Mostra o resultado na página
    } catch (error) {
        document.getElementById('result').innerText = 'Erro ao fazer login. Tente novamente.';
        console.error('Erro:', error);
    }
});
