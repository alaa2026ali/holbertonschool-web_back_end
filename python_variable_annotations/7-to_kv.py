#!/usr/bin/env python3
"""Module for creating a key-value tuple."""

from typing import Tuple, Union


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a tuple containing the key and the square of the value."""
    return (k, v ** 2)
