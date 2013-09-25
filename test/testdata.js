/**
 * Test data
 */

exports.outputs = {};
exports.outputs["SELECT * FROM User"] = {
	rs : {
		rowCount : 3,
		row : [ {
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
