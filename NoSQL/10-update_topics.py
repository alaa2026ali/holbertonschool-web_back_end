#!/usr/bin/env python3
"""Update the topics of a school."""


def update_topics(mongo_collection, name, topics):
    """Change all topics of a school based on its name."""
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
