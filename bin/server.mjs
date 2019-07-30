import app from '../app';

const server = app.listen(app.get('port'), app.get('host'), (err) => {
    if (err) {
      return console.log('Something bad happened', err);
    }

    
    console.log(`${app.locals.title} Version: ${app.locals.version} started at http://${app.get('host')}:${server.address().port}`);

});
