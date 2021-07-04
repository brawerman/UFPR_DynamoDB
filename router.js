const express = require("express");
const router = express.Router();
const dynamoWrappler = require("./dynamo");

router.get("/characters", async (req, res) => {
	try {
		const characters = await dynamoWrappler.getCharacters();
		if (characters) res.json(characters);
		else
			res
				.status(404)
				.json({ msg: "Não foi possível fazer consulta no servidor." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Erro interno no servidor." });
	}
});

router.get("/characters/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const character = await dynamoWrappler.getCharacterById(id);
		if (character) res.json(character);
		else
			res
				.status(404)
				.json({ msg: "Não foi possível fazer consulta no servidor." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Erro interno no servidor." });
	}
});

router.post("/characters", async (req, res) => {
	const character = req.body;
	try {
		const newCharacter = await dynamoWrappler.addOrUpdateCharacter(character);
		if (newCharacter) res.json(newCharacter);
		else
			res.status(404).json({ msg: "Não foi possível cadastrar o personagem." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Erro interno no servidor." });
	}
});

router.put("/characters/:id", async (req, res) => {
	const character = req.body;
	const { id } = req.params;
	character.id = id;
	try {
		const newCharacter = await dynamoWrappler.addOrUpdateCharacter(character);
		if (newCharacter) res.json(newCharacter);
		else
			res.status(404).json({ msg: "Não foi possível cadastrar o personagem." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Erro interno no servidor." });
	}
});

router.delete("/characters/:id", async (req, res) => {
	const { id } = req.params;
	try {
		res.json(await dynamoWrappler.deleteCharacter(id));
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Erro interno no servidor." });
	}
});

module.exports = router;
