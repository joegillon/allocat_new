# import functools


def log_exception(logger):

    def decorator(func):
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception:
                err = 'Exception in %s' % (func.__name__, )
                logger.exception(err)
                raise
        return wrapper
    return decorator


def log_info(logger):
    def decorator(func):
        def wrapper(*args, **kwargs):
            logger.info('Function %s called by user %s' % (func.__name__, 'Joe'))
            return func(*args, **kwargs)
        return wrapper
    return decorator
