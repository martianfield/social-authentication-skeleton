'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
	// TODO: do something sensible here
	res.send("nothing to be seen here");
});
router.use('/facebook', require(__dirname + "/auth/facebook"));

module.exports = router;