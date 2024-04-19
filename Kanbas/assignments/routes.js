import Database from "../Database/index.js"

function AssignmentRoutes(app) {

    app.get("/api/assignments", (req, res) => {
		const assignments = Database.assignments
		res.send(assignments)
	})


	app.post("/api/assignments/:courseId", (req, res) => {
        const {courseId} = req.params;
		const assignment = { ...req.body, course:courseId, _id: new Date().getTime().toString() }
        Database.assignments.push(assignment);
		res.send(assignment);
	})


	app.delete("/api/assignments/:id", (req, res) => {
		const { id } = req.params
		Database.assignments = Database.assignments.filter((c) => c._id !== id)
		res.sendStatus(204)
	})


	app.put("/api/assignments/:id", (req, res) => {
		const { id } = req.params
		const assignment = req.body
		Database.assignments = Database.assignments.map((c) =>
			c._id === id ? { ...assignment } : c
		)
        res.send(assignment)
	})

    app.get("/api/assignments/:courseId", (req, res) => {
		const { courseId } = req.params
		const assignments = Database.assignments.filter((c) => c.course === courseId)
		res.send(assignments)
	})
	
}

export default AssignmentRoutes