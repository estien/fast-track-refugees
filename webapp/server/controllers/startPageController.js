
function salesPitch(feature, program, fastTrackProgram) {
	return { feature, program, fastTrackProgram };
}

const salesPitches = [

	salesPitch('Decide where to get settled', 'No', 'Yes'),
	salesPitch('Financial support from government', 'Yes', 'No'),
	salesPitch('Covered Norwegian language course', 'Yes', 'Yes'),
	salesPitch('Time to settlement', 'Regular time frame', 'Faster time frame')
];


module.exports = {

	index(req, res, next) {

		res.view('start', { salesPitches });

	}

}