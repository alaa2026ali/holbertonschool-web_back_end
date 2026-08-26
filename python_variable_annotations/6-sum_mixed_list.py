#!/usr/bin/env python3
"""Module for summing a mixed list."""

from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """Return the sum of integers and floats in a list."""
    return float(sum(mxd_lst))
