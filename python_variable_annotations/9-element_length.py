#!/usr/bin/env python3
"""Module for measuring element lengths."""

from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """Return each element and its length."""
    return [(i, len(i)) for i in lst]
