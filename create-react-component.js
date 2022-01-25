import { mkdir, writeFile } from "fs/promises";
//import { argv } from "process";
import path from "path";
import process from "node:process";

const jsxTemplate = (componentName) => `import React from "react";

const ${componentName} = ({children, ...rest}) => {
	return <div {...rest}>{children}</div>
}

export default ${componentName};
`;

const readmeTemplate = (componentName) => `# ${componentName}

## How to use this component

`;

const storiesTemplate = (componentName) => `import React from "react";

import ${componentName} from "./";

export default {
	title: "${componentName}",
	component: ${componentName},
};

export const Default = () => <${componentName}>${componentName}</${componentName}>;
`;

const testTemplate = (componentName) => `
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ${componentName} from "./";

describe("${componentName} component", () => {
	it("should render", () => {
		const text = "Click me";
		render(<${componentName}>{text}</${componentName}>);
		expect(screen.getByText(text)).toBeInTheDocument();
	});
});
`;

// node create-react-component.js
// npx create-react-app

// API
// node create-react-component.js directory componentName
// node create-react-component.js atoms Button
// ->
// * out/atoms/Button/index.jsx
// * out/atoms/Button/README.md

const outFolder = "out";

const createReactComponent = async (directoryName, componentName) => {
	const directory = path.join(outFolder, directoryName, componentName);
	const jsxFilename = path.join(directory, "index.jsx");
	const readmeFilename = path.join(directory, "README.md");
	const storiesFilename = path.join(
		directory,
		`${componentName}.stories.jsx`
	);
	const testFilename = path.join(directory, `${componentName}.test.jsx`);

	// we can use await since this is an async function
	// CLI `mkdir -p`
	await mkdir(directory, { recursive: true });
	writeFile(jsxFilename, jsxTemplate(componentName))
		.then(() => {
			console.log(`created file: ${jsxFilename}`);
		})
		.catch((error_) => {
			console.error(error_);
		});
	writeFile(readmeFilename, readmeTemplate(componentName))
		.then(() => {
			console.log(`created file: ${readmeFilename}`);
		})
		.catch((error_) => {
			console.error(error_);
		});
	writeFile(storiesFilename, storiesTemplate(componentName))
		.then(() => {
			console.log(`created file: ${storiesFilename}`);
		})
		.catch((error_) => {
			console.error(error_);
		});
	writeFile(testFilename, testTemplate(componentName))
		.then(() => {
			console.log(`created file: ${testFilename}`);
		})
		.catch((error_) => {
			console.error(error_);
		});
};

// Read arguments from CLI
const [directoryName, componentName] = process.argv.slice(2);

// Add arguments to the create function
void createReactComponent(directoryName, componentName);
