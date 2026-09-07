#!/usr/bin/env python3
"""List schools having a specific topic."""


def schools_by_topic(mongo_collection, topic):
    """Return schools that have the given topic."""
    return list(mongo_collection.find({"topics": topic}))
