const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
	region: process.env.AWS_DEFAULT_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "xmen";

async function getCharacters() {
	const params = {
		TableName: TABLE_NAME,
	};
	const characters = await dynamoClient.scan(params).promise();
	return characters;
}

async function getCharacterById(id) {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
	};
	return await dynamoClient.get(params).promise();
}

async function addOrUpdateCharacter(character) {
	const params = {
		TableName: TABLE_NAME,
		Item: character,
	};
	return await dynamoClient.put(params).promise();
}

async function deleteCharacter(id) {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
	};
	return await dynamoClient.delete(params).promise();
}

module.exports = {
	dynamoClient,
	getCharacters,
	getCharacterById,
	addOrUpdateCharacter,
	deleteCharacter,
};
