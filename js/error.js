function getErrorHandling(err, req, res) {

if (err.status == 404) {
    console.log("error 403 is run");
    res.render('403', { url: req.url });
}
else if (err == "linkError") {
    res.render('index', { message: 'Make sure your link is a full Strava URL route', authMessage: ''})
}
else if (err == "locationError") {
    res.render('index', { message: 'This website is sadly exclusive to routes in the UK only', authMessage: ''})
}
else if (err == "countryCodeErr") {
    res.render('index', { message: 'Unfortunately there was an error with the link. Please ensure the route is within the UK', authMessage: ''})
}
else if (err == "badRequest") {
    res.render('index', {title: 'Hey', message: 'Bad Request - Try re-authenticating again', authMessage: ''}); 
}

}

module.exports = { getErrorHandling };