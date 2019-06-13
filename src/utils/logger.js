/* eslint-disable import/no-mutable-exports, class-methods-use-this */
class Logger {
  constructor() {
    this.levels = ['log', 'info', 'warn', 'error'];
    this.level = process.env.LOG_LEVEL || 'error';
  }

  getLogger() {
    let levelFound = false;
    const logger = {};

    this.levels.forEach(currentLevel => {
      if (currentLevel === this.level || levelFound) {
        levelFound = true;
        logger[currentLevel] = console[currentLevel]; //eslint-disable-line
      } else {
        logger[currentLevel] = () => {};
      }
    });
    return logger;
  }
}

const logger = new Logger();

module.exports = logger.getLogger();
