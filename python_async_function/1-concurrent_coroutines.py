#!/usr/bin/env python3
"""
Module for concurrent coroutines.
"""
import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> list:
    """
    Spawns wait_random n times with the specified max_delay.
    Returns the delays in ascending order based on completion time.
    """
    tasks = []

    for _ in range(n):
        tasks.append(asyncio.create_task(wait_random(max_delay)))

    delays = []

    for task in asyncio.as_completed(tasks):
        delays.append(await task)

    return delays
