const axios = require("axios");
const { addOrUpdateCharacter } = require("./dynamo");

async function seedData() {
	const url = "https://xmenapiheroku.herokuapp.com/api/characters";
	try {
		//axios.get retorna um obj complexo e pegamos o data
		//renomeamos data para characters, mais fácil para entender
		const { data: characters } = await axios.get(url);

		//cria um array de promisses para fazermos os diversos
		//requests para inserção de personagens
		const characterPromises = characters.results.map((character, i) => {
			const id = i.toString();
			//passa o objeto e ID
			addOrUpdateCharacter({ ...character, id });
		});

		//executa os request de forma independente
		//e espera por todos
		await Promise.all(characterPromises);
	} catch (err) {
		console.error(err);
	}
}
seedData();
