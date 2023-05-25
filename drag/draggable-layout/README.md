## querySelectorAll 和 getElementsByClassName

单从 API 执行效率上，getElementsByClassName 要比 querySelectorAll 快。但是我们使用上差异微乎其微，具体选用哪个 API 要看我们的使用场景，动态的结果就用 getElementsByClassName，这样不用重复执行该 API 来获取最新的结果，一次就够。想要静态的结果，就用 querySelectorAll。
