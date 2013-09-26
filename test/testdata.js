/**
 * Test data
 */

exports.outputs = {};
exports.outputs["SELECT * FROM User"] = {
	rs : {
		rowCount : 3,
		rows : [ {
			id : 1,
			name : "Alice"
		}, {
			id : 2,
			name : "Bob"
		}, {
			id : 3,
			name : "Charlie"
		} ]
	},
	err : null
};

exports.outputs["SELECT * FROM Xxx"] = {
	rs : null,
	err : {
		name : "foo",
		message : "bar"
	}
};

exports.outputs["CREATE TABLE a (id INTEGER)"] = {
	rs : {
		rowCount : null,
		command : "CREATE",
		rows : []
	},
	err : null
};

exports.outputs["INSERT INTO a (id) VALUES (1)"] = {
	rs : {
		rowCount : 1,
		command : "INSERT",
		rows : []
	},
	err : null
};
