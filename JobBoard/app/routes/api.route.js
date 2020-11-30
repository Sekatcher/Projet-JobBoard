module.exports = function(app) {
    const advertisements = require('../controllers/advertisements.controller.js');
	const jobApplication = require('../controllers/jobApplication.controller.js');
	const companies = require('../controllers/companies.controller.js')
    const people = require('../controllers/people.controller.js')
	
	app.get('/api/advertisements/allwcompany', advertisements.getAllwCompany);
	app.get('/api/advertisements/description', advertisements.getDescription);
	app.get('/api/advertisements/rows/:offset', advertisements.getRows);

	app.get('/api/advertisements/all', advertisements.getAll);
	app.get('/api/advertisements/all/:id', advertisements.getIt);
	app.post('/api/advertisements/post', advertisements.post)
	app.delete('/api/advertisements/delete', advertisements.delete)
	app.put('/api/advertisements/update', advertisements.update)


	app.get('/api/job_application/rows/:offset', jobApplication.getRows);
	app.post('/api/job_application/postJobApp', jobApplication.postJobApp);
	app.post('/api/job_application/postJobAppNewUser', jobApplication.postJobAppNewUser);


	app.get('/api/job_application/all', jobApplication.getAll);
	app.get('/api/job_application/all/:id', jobApplication.getIt);
	app.post('/api/job_application/post', jobApplication.post)
	app.delete('/api/job_application/delete', jobApplication.delete)
	app.put('/api/job_application/update', jobApplication.update)


	app.get('/api/companies/rows/:offset', companies.getRows);

	app.get('/api/companies/all', companies.getAll);
	app.get('/api/companies/all/:id', companies.getIt);
	app.post('/api/companies/post', companies.post)
	app.delete('/api/companies/delete', companies.delete)
	app.put('/api/companies/update', companies.update)


	app.get('/api/people/rows/:offset', people.getRows);
	
	app.get('/api/people/all', people.getAll);
	app.get('/api/people/all/:id', people.getIt);
	app.post('/api/people/post', people.post)
	app.delete('/api/people/delete', people.delete)
	app.put('/api/people/update', people.update)


}