// src/shared/config/index.ts

const env = process.env.NODE_ENV || "development";

let config;

switch (env) {
	case "production":
		config = require("./production").default;
		break;
	case "staging":
		config = require("./staging").default;
		break;
	default:
		config = require("./development").default;
		break;
}

export default config;
