import logging
from datetime import datetime
import os

def determine_log_level(message):
    if "debug" in message.lower():
        return logging.DEBUG
    elif "info" in message.lower():
        return logging.INFO
    elif "warn" in message.lower():
        return logging.WARNING
    elif "error" in message.lower():
        return logging.ERROR
    elif "critical" in message.lower():
        return logging.CRITICAL
    else:
        return logging.ERROR

def write_log(message):
    log_dir = os.getenv('LOG_DIR', 'logs')
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    logger = logging.getLogger(__name__)

    log_file = os.path.join(log_dir, f'{datetime.today().strftime("%d-%m-%Y")}.log')

    handle = logging.FileHandler(log_file, mode='a')
    format = logging.Formatter("%(name)s %(asctime)s %(levelname)s %(message)s")
    handle.setFormatter(format)

    if not logger.hasHandlers():
        logger.addHandler(handle)

    level = determine_log_level(message)

    if level == logging.DEBUG:
        logger.debug(message)
    elif level == logging.INFO:
        logger.info(message)
    elif level == logging.WARNING:
        logger.warning(message)
    elif level == logging.ERROR:
        logger.error(message)
    elif level == logging.CRITICAL:
        logger.critical(message)
    else:
        logger.log(level, message)

    logger.removeHandler(handle) 
