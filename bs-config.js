module.exports = {
    server: 'src',
    files: [
      'src/**'
    ],
    middleware: function(req,res,next) {
        if (req.url === '/test') {
            req.url = '/login.html';
        }
        return next();
    }
  };