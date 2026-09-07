#!/usr/bin/env python3
"""Insert a document into a MongoDB collection."""


def insert_school(mongo_collection, **kwargs):
    """Insert a new document and return its ID."""
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
