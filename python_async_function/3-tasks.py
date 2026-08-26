#!/usr/bin/env python3
"""
Module for task_wait_random function.
"""
import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int = 10) -> asyncio.Task:
    """
    Takes an integer max_delay and returns an asyncio.Task.
    """
    return asyncio.create_task(wait_random(max_delay))
