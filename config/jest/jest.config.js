module.exports = {
  testEnvironment: 'jsdom',
  rootDir: '../../',
  setupFiles: ['<rootDir>/config/jest/jest.setup.js'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/out/'],
  testMatch: ['<rootDir>/src/**/*.test.js'],
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileTransform.js',
    '\\.(css|scss|less)$': '<rootDir>/__mocks__/cssTransform.js',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/reports/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.js',
    '<rootDir>/src/containers/**/*.js',
    '<rootDir>/src/global/**/*.js',
    '<rootDir>/src/utils/**/*.js',
    '!<rootDir>/src/components/**/*.mock.js',
    '!<rootDir>/src/**/types/*.js',
    '!<rootDir>/src/components/**/*.story.js',
    '!<rootDir>/src/components/**/*.style.js',
    '!<rootDir>/src/components/**/*.test.js',
    '!<rootDir>/src/styles/**/*.js',
    '!<rootDir>/node_modules/**',
  ],
  coverageReporters: ['lcov', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testMatch: ['<rootDir>/src/**/*.test.js'],
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};
