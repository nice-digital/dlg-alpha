const config = require("config"),
	glob = require("glob"),
	withNodeConfig = require("next-plugin-node-config"),
	withTranspiledModules = require("next-transpile-modules");

/**
 * A list of paths to node modules that should allow transpilation.
 * Most of our Design System components (and Global Nav) import SCSS.
 *
 * Avoids the error "CSS Modules cannot be imported from within node_modules."
 */
const niceDigitalModulesToTranspile = glob.sync(
	"@nice-digital/{*,*/node_modules/@nice-digital/*}",
	{
		cwd: "node_modules",
	}
);

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

const finalConfig = withNodeConfig(
	withTranspiledModules(niceDigitalModulesToTranspile)(nextConfig)
);

module.exports = finalConfig;
