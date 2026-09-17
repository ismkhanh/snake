// Signs Android release builds with the local upload key.
//
// The keystore and its passwords live outside the repo in a .properties file
// (storeFile, keyAlias, storePassword, keyPassword) whose absolute path must be
// set in the SNAKE_KEYSTORE_PROPERTIES environment variable. Release builds
// fail if it is unset or the file is missing; debug builds don't need it.
const { withAppBuildGradle } = require('expo/config-plugins');

const MARKER = '// @generated withReleaseSigning';

const KEYSTORE_PROPS = `${MARKER}
def keystorePropertiesPath = System.getenv('SNAKE_KEYSTORE_PROPERTIES')
def keystorePropertiesFile = keystorePropertiesPath ? file(keystorePropertiesPath) : null
def keystoreProperties = new Properties()
if (keystorePropertiesFile?.exists()) {
    keystorePropertiesFile.withInputStream { keystoreProperties.load(it) }
} else if (gradle.startParameter.taskNames.any { it.toLowerCase().contains('release') }) {
    throw new GradleException(keystorePropertiesPath
        ? "Release signing properties not found: \${keystorePropertiesPath}"
        : "SNAKE_KEYSTORE_PROPERTIES is not set. Point it at the release keystore .properties file.")
}

android {`;

const RELEASE_SIGNING_CONFIG = `        release {
            if (keystorePropertiesFile?.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
    buildTypes {`;

function applyReleaseSigning(buildGradle) {
  if (buildGradle.includes(MARKER)) return buildGradle;

  let result = buildGradle.replace(/^android \{/m, KEYSTORE_PROPS);
  result = result.replace(/    \}\n    buildTypes \{/, RELEASE_SIGNING_CONFIG);
  result = result.replace(
    /(release \{\n(?:\s*\/\/.*\n)*\s*)signingConfig signingConfigs\.debug/,
    '$1signingConfig signingConfigs.release'
  );

  if (!result.includes('signingConfig signingConfigs.release')) {
    throw new Error('withReleaseSigning: could not patch android/app/build.gradle');
  }
  return result;
}

module.exports = function withReleaseSigning(config) {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = applyReleaseSigning(config.modResults.contents);
    return config;
  });
};
