// Middleware centralizado para tratamento de erros
const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Se houver um status definido é utilizado, senão 500
    const status = err.status || 500;

    // Mensagem padrão
    const message = err.publicMessage || 'Ocorreu um erro no servidor';

    res.status(status).json({ message });
};

module.exports = errorHandler;