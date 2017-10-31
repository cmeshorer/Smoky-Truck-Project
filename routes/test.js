
router.post('/modifier/:id(\\d+)',upload.single('image'), function(req, res){
	console.log(req.body);
	console.log(req.file);
	if (req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg')) {
		fs.rename(req.file.path,'public/images/'+req.file.originalname);
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement')
	}

	connection.query('UPDATE products SET name = ?, description = ?, ingredients = ?, category = ? WHERE id = ?',
		[req.body.product_name, req.body.product_description, req.body.ingredients, req.body.category, req.query.idProduit],
		function(error){
			if (error) {
				console.log(error);
			}
		});
	console.log();
	if (req.file.size > 0){
		connection.query('UPDATE products SET picture = ? WHERE id = ?',
			[req.file.originalname, req.query.idProduit],
			function(error){
				if (error) {
					console.log(error);
				}
			});
	}
	res.redirect('/admin');
});